import { type WizardInput, type EvaluationResult } from '@/lib/types/domain'
import { getTemplate } from './templates_de_v1'
import {
  type Pack,
  type Content,
  DEFAULT_PREVIEW_CONFIG,
  packSchema
} from './packSchema'

type GeneratePackParams = {
  meta: {
    run_id: string
    evaluation_hash: string
    spec_version: string
    rules_version: string
    generated_at?: string
  }
  accessMode: 'preview' | 'full'
  input: WizardInput
  evaluation: EvaluationResult
}

function generateContent(params: GeneratePackParams): Content {
  const { input, evaluation } = params

  // Generate hypotheses content from matched hypotheses
  const hypotheses = evaluation.matched.map((match: { hypothesis_id: string, signals?: string[] }) => {
    const template = getTemplate(match.hypothesis_id, {
      input,
      matched_signals: match.signals ?? []
    })

    return {
      hypothesis_id: match.hypothesis_id,
      title: template.title,
      why_it_matched: template.why_it_matched,
      recommended_actions: template.recommended_actions
    }
  })

  // Generate checklist sections
  const checklist = [
    {
      section_id: 'evidence',
      title: 'Nachweise bereitstellen',
      items: hypotheses.flatMap((h: { recommended_actions: string[] }) => 
        h.recommended_actions.map((action: string) => ({
          text: action,
          priority: 'high' as const
        }))
      )
    },
    {
      section_id: 'profile_fixes',
      title: 'Profil optimieren',
      items: [
        {
          text: 'Geschäftsprofil vervollständigen',
          priority: 'medium' as const
        },
        {
          text: 'Kontaktinformationen aktualisieren',
          priority: 'medium' as const
        }
      ]
    }
  ]

  // Generate appeal text
  const appealSnippets = hypotheses.map((h: { hypothesis_id: string }) => 
    getTemplate(h.hypothesis_id, { input, matched_signals: [] }).appeal_snippet
  )

  const appeal = {
    subject: 'Antrag auf Überprüfung der Kontoeinschränkung',
    body_de: [
      'Sehr geehrte Damen und Herren,',
      '',
      'wir beantragen hiermit die Überprüfung der Einschränkung unseres Geschäftskontos.',
      '',
      ...appealSnippets,
      '',
      'Wir stehen für Rückfragen jederzeit zur Verfügung.',
      '',
      'Mit freundlichen Grüßen'
    ].join('\n')
  }

  // Generate executive summary
  const executiveSummary = {
    headline: 'Handlungsempfehlungen zur Aufhebung der Kontoeinschränkung',
    bullets: [
      'Geschäftliche Nachweise einreichen und Profil vervollständigen',
      'Kontaktinformationen aktualisieren und verifizieren',
      ...hypotheses.map((h: { recommended_actions: string[] }) => h.recommended_actions[0]).filter(Boolean)
    ]
  }

  return {
    executive_summary: executiveSummary,
    hypotheses,
    checklist,
    appeal
  }
}

function createPreviewContent(content: Content): Content {
  // Create truncated executive summary
  const executiveSummary = {
    headline: content.executive_summary.headline,
    bullets: content.executive_summary.bullets
      .slice(0, DEFAULT_PREVIEW_CONFIG.executive_summary_bullets_max)
  }

  // Collect all checklist items in section order with stable section_id
  const allItems = content.checklist.flatMap(section => 
    section.items.map(item => ({
      ...item,
      originalSection: {
        id: section.section_id,
        title: section.title
      }
    }))
  )

  // Take first N items
  const previewItems = allItems
    .slice(0, DEFAULT_PREVIEW_CONFIG.checklist_items_max_total)

  // Group back into sections using stable section_id
  const sectionMap = new Map<string, {
    title: string,
    items: Array<{ text: string, priority: 'high' | 'medium' | 'low' }>
  }>()

  for (const item of previewItems) {
    const { originalSection, ...itemData } = item
    const section = sectionMap.get(originalSection.id) || {
      title: originalSection.title,
      items: []
    }
    section.items.push(itemData)
    sectionMap.set(originalSection.id, section)
  }

  // Reconstruct checklist preserving original section order
  const checklist = content.checklist
    .map(section => {
      const previewSection = sectionMap.get(section.section_id)
      if (!previewSection?.items.length) return null

      return {
        section_id: section.section_id,
        title: section.title,
        items: previewSection.items
      }
    })
    .filter((section): section is NonNullable<typeof section> => section !== null)

  // Create truncated appeal
  const appeal = {
    subject: content.appeal.subject,
    body_de: content.appeal.body_de.slice(0, DEFAULT_PREVIEW_CONFIG.appeal_chars_max) + '…'
  }

  return {
    executive_summary: executiveSummary,
    hypotheses: content.hypotheses,
    checklist,
    appeal
  }
}

export function generatePack(params: GeneratePackParams): Pack {
  // Generate full content first
  const content = generateContent(params)

  // Create pack with appropriate access mode and preview
  const pack: Pack = {
    meta: {
      pack_version: '1.0.0',
      locale: 'de',
      ...params.meta
    },
    access: {
      mode: params.accessMode
    },
    preview: DEFAULT_PREVIEW_CONFIG,
    content,
    content_preview: createPreviewContent(content) // Always create truncated preview
  }

  // Validate pack against schema
  return packSchema.parse(pack)
}