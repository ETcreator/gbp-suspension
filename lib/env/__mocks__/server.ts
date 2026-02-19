import { z } from 'zod'

const envSchema = z.object({
  SUPABASE_URL: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string()
})

export const envServer = envSchema.parse({
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
})