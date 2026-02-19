import { z } from 'zod'

// Pack metadata schema
export const packMetaSchema = z.object({
  pack_version: z.literal('1.0.0'),
  locale: z.literal('de'),
  run_id: z.string().uuid(),
  evaluation_hash: z.string().regex(/^[a-f0-9]{64}$/),
  spec_version: z.string(),
  rules_version: z.string(),
  generated_at: z.string().datetime().optional()
})

// Content structure schemas
export const hypothesisSchema = z.object({
  hypothesis_id: z.string(),
  title: z.string(),
  why_it_matched: z.array(z.string()),
  recommended_actions: z.array(z.string())
})

export const checklistItemSchema = z.object({
  text: z.string(),
  priority: z.enum(['high', 'medium', 'low'])
})

export const checklistSectionSchema = z.object({
  section_id: z.string(),
  title: z.string(),
  items: z.array(checklistItemSchema)
})

export const appealSchema = z.object({
  subject: z.string(),
  body_de: z.string()
})

export const contentSchema = z.object({
  executive_summary: z.object({
    headline: z.string(),
    bullets: z.array(z.string())
  }),
  hypotheses: z.array(hypothesisSchema),
  checklist: z.array(checklistSectionSchema),
  appeal: appealSchema
})

// Preview configuration schema
export const previewConfigSchema = z.object({
  executive_summary_bullets_max: z.number().int().positive(),
  checklist_items_max_total: z.number().int().positive(),
  appeal_chars_max: z.number().int().positive()
})

// Complete pack schema
export const packSchema = z.object({
  meta: packMetaSchema,
  access: z.object({
    mode: z.enum(['preview', 'full'])
  }),
  preview: previewConfigSchema,
  content: contentSchema,
  content_preview: contentSchema.optional()
})

// Export types
export type PackMeta = z.infer<typeof packMetaSchema>
export type Hypothesis = z.infer<typeof hypothesisSchema>
export type ChecklistItem = z.infer<typeof checklistItemSchema>
export type ChecklistSection = z.infer<typeof checklistSectionSchema>
export type Appeal = z.infer<typeof appealSchema>
export type Content = z.infer<typeof contentSchema>
export type PreviewConfig = z.infer<typeof previewConfigSchema>
export type Pack = z.infer<typeof packSchema>

// Export default preview configuration
export const DEFAULT_PREVIEW_CONFIG: PreviewConfig = {
  executive_summary_bullets_max: 3,
  checklist_items_max_total: 5,
  appeal_chars_max: 400
}