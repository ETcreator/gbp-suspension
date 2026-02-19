import { z } from 'zod'

export const wizardInputSchema = z.object({
  suspension_type: z.enum(['Sanfte Sperrung (Profil noch sichtbar)', 'Harte Sperrung (Nicht mehr sichtbar)', 'Nicht sicher']),
  business_category: z.enum(['Handwerk', 'Gesundheit', 'Handel', 'Gastronomie', 'Sonstiges']),
  country: z.enum(['DE', 'AT', 'CH']),
  recent_profile_changes: z.boolean(),
  uses_virtual_office: z.boolean(),
  business_name_contains_keywords: z.boolean(),
  multiple_listings_exist: z.boolean(),
  website_nap_match: z.enum(['Ja, alles identisch', 'Nein, es gibt kleine Unterschiede', 'Ich bin mir nicht sicher']),
  has_business_registration: z.boolean(),
  has_storefront_signage: z.boolean(),
  has_interior_photos: z.boolean(),
  has_utility_bill: z.boolean()
}).strict()

export type WizardInputSchema = z.infer<typeof wizardInputSchema>