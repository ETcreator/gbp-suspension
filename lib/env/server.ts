import { z } from 'zod'

const envSchema = z.object({
  SUPABASE_URL: z.string().url().regex(/^https:\/\/[a-z0-9-]+\.supabase\.co$/),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1)
})

const parsed = envSchema.safeParse({
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
})

if (!parsed.success) {
  console.error(
    'Invalid server environment variables:',
    parsed.error.flatten().fieldErrors
  )
  throw new Error('Invalid server environment variables')
}

export const envServer = parsed.data