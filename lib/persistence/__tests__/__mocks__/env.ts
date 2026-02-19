import { z } from 'zod'

const envSchema = z.object({
  SUPABASE_URL: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string()
})

export const envServer = envSchema.parse({
  SUPABASE_URL: 'https://test-project.supabase.co',
  SUPABASE_SERVICE_ROLE_KEY: 'test-key'
})