import { type WizardInput } from '@/lib/types/domain'

export type HypothesisTemplate = {
  title: string
  why_it_matched: string[]
  recommended_actions: string[]
  appeal_snippet: string
}

export type TemplateData = {
  input: WizardInput
  matched_signals: string[]
}

const templates: Record<string, (data: TemplateData) => HypothesisTemplate> = {
  H1_VIRTUAL_OFFICE: (data) => ({
    title: 'Virtuelle Büro-Adresse erkannt',
    why_it_matched: [
      data.input.uses_virtual_office ? 'Nutzung eines Geschäftsservice bestätigt' : 'Anzeichen für Nutzung eines Geschäftsservice',
      !data.input.has_storefront_signage && 'Keine eigene Geschäftsbeschilderung nachgewiesen',
      !data.input.has_interior_photos && 'Keine Fotos der Geschäftsräume vorhanden'
    ].filter((item): item is string => typeof item === 'string'),
    recommended_actions: [
      'Physische Geschäftsadresse nachweisen',
      'Fotos der Geschäftsräume bereitstellen',
      'Vor-Ort-Besichtigung anbieten'
    ],
    appeal_snippet: 'Unser Unternehmen nutzt zwar einen Geschäftsservice an dieser Adresse, ist aber ein reales Unternehmen mit echten Geschäftsaktivitäten.'
  }),

  H2_WEBSITE_MISMATCH: (data) => ({
    title: 'Unstimmigkeiten bei der Website',
    why_it_matched: [
      data.input.website_nap_match === 'mismatch' && 'Kontaktdaten stimmen nicht mit Geschäftsprofil überein',
      data.input.recent_profile_changes && 'Kürzliche Änderungen am Geschäftsprofil'
    ].filter((item): item is string => typeof item === 'string'),
    recommended_actions: [
      'Website aktualisieren und vervollständigen',
      'Korrekte Geschäftsinformationen einpflegen',
      'Impressum und Datenschutzerklärung prüfen'
    ],
    appeal_snippet: 'Die bemängelten Unstimmigkeiten auf unserer Website wurden bereits korrigiert. Alle Angaben sind nun aktuell und vollständig.'
  }),

  H3_MULTIPLE_LISTINGS: (data) => ({
    title: 'Mehrere abweichende Geschäftseinträge',
    why_it_matched: [
      data.input.multiple_listings_exist && 'Mehrere unterschiedliche Geschäftseinträge gefunden',
      data.input.website_nap_match === 'mismatch' && 'Abweichende Kontaktinformationen'
    ].filter((item): item is string => typeof item === 'string'),
    recommended_actions: [
      'Geschäftseinträge vereinheitlichen',
      'Veraltete Einträge entfernen lassen',
      'Konsistente Firmendaten sicherstellen'
    ],
    appeal_snippet: 'Wir haben alle unsere Geschäftseinträge überprüft und vereinheitlicht. Die gefundenen Abweichungen sind nun bereinigt.'
  }),

  H4_SUSPICIOUS_KEYWORDS: (data) => ({
    title: 'Auffällige Geschäftsbeschreibung',
    why_it_matched: [
      data.input.business_name_contains_keywords && 'Auffällige Begriffe in der Geschäftsbezeichnung',
      !data.input.has_business_registration && 'Fehlender Handelsregisterauszug'
    ].filter((item): item is string => typeof item === 'string'),
    recommended_actions: [
      'Geschäftsbeschreibung präzisieren',
      'Konkrete Dienstleistungen aufführen',
      'Referenzen oder Zertifizierungen nennen'
    ],
    appeal_snippet: 'Unsere Geschäftsbeschreibung wurde überarbeitet und enthält nun präzise Informationen zu unseren Tätigkeiten und Qualifikationen.'
  }),

  H5_HARD_SUSPENSION: (data) => ({
    title: 'Schwerwiegende Kontoeinschränkung',
    why_it_matched: [
      data.input.suspension_type === 'hard' && 'Vollständige Kontoeinschränkung aktiv',
      !data.input.has_business_registration && 'Geschäftsregistrierung nicht nachgewiesen'
    ].filter((item): item is string => typeof item === 'string'),
    recommended_actions: [
      'Umfassende Geschäftsunterlagen einreichen',
      'Detaillierte Tätigkeitsnachweise vorlegen',
      'Persönliches Gespräch anbieten'
    ],
    appeal_snippet: 'Wir nehmen die Einschränkung sehr ernst und haben umfangreiche Nachweise zu unserer Geschäftstätigkeit zusammengestellt.'
  }),

  H6_INSUFFICIENT_EVIDENCE: (data) => ({
    title: 'Unzureichende Geschäftsnachweise',
    why_it_matched: [
      !data.input.has_business_registration && 'Keine Geschäftsregistrierung vorhanden',
      !data.input.has_utility_bill && 'Keine Betriebskostenabrechnung eingereicht',
      !data.input.has_interior_photos && 'Keine Fotos der Geschäftsräume'
    ].filter((item): item is string => typeof item === 'string'),
    recommended_actions: [
      'Geschäftsunterlagen bereitstellen',
      'Online-Präsenz ausbauen',
      'Referenzen dokumentieren'
    ],
    appeal_snippet: 'Wir haben zusätzliche Nachweise unserer Geschäftstätigkeit zusammengestellt, die unsere Seriosität belegen.'
  }),

  H7_COUNTRY_NOT_DE: (data) => ({
    title: 'Standort außerhalb Deutschlands',
    why_it_matched: [
      data.input.country !== 'DE' && 'Geschäftssitz außerhalb Deutschlands angegeben',
      !data.input.has_utility_bill && 'Keine deutsche Betriebskostenabrechnung'
    ].filter((item): item is string => typeof item === 'string'),
    recommended_actions: [
      'Deutsche Geschäftspräsenz nachweisen',
      'Lokale Kontaktmöglichkeiten angeben',
      'Standortbezogene Dokumente vorlegen'
    ],
    appeal_snippet: 'Trotz internationaler Verbindungen haben wir eine aktive Geschäftspräsenz in Deutschland, die wir gerne nachweisen.'
  }),

  H8_COUNTRY_IN_DACH: (data) => ({
    title: 'DACH-Region: Besondere Anforderungen',
    why_it_matched: [
      ['AT', 'CH'].includes(data.input.country) && `Geschäftssitz in ${data.input.country}`,
      !data.input.has_business_registration && 'Lokale Geschäftsregistrierung fehlt'
    ].filter((item): item is string => typeof item === 'string'),
    recommended_actions: [
      'Lokale Geschäftsregistrierung prüfen',
      'Regionale Vorschriften beachten',
      'Standortspezifische Dokumente einreichen'
    ],
    appeal_snippet: 'Als Unternehmen im DACH-Raum erfüllen wir alle regionalen Anforderungen und können dies entsprechend nachweisen.'
  }),

  H9_CATEGORY_CONTAINS: (data) => ({
    title: 'Branchenspezifische Prüfung',
    why_it_matched: [
      `Geschäftsbereich: ${data.input.business_category}`,
      !data.input.has_business_registration && 'Branchenspezifische Registrierung fehlt'
    ].filter((item): item is string => typeof item === 'string'),
    recommended_actions: [
      'Branchenspezifische Nachweise vorlegen',
      'Qualifikationen dokumentieren',
      'Zertifizierungen einreichen'
    ],
    appeal_snippet: 'Wir erfüllen alle branchenspezifischen Anforderungen und können entsprechende Nachweise vorlegen.'
  })
}

// Fallback template for unknown hypothesis IDs
const fallbackTemplate = (data: TemplateData): HypothesisTemplate => ({
  title: 'Weitere Prüfung erforderlich',
  why_it_matched: [
    'Zusätzlicher Überprüfungsbedarf festgestellt',
    'Weitere Nachweise erforderlich'
  ],
  recommended_actions: [
    'Geschäftsunterlagen einreichen',
    'Tätigkeitsnachweise vorlegen',
    'Kontaktinformationen aktualisieren'
  ],
  appeal_snippet: 'Wir stellen gerne alle erforderlichen Nachweise zur Verfügung, um die Prüfung zu unterstützen.'
})

export function getTemplate(hypothesisId: string, data: TemplateData): HypothesisTemplate {
  return templates[hypothesisId]?.(data) ?? fallbackTemplate(data)
}