import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { envServer } from '../env/server'
import { createTimeoutFetch } from './fetch'

let supabaseInstance: SupabaseClient | null = null

export function getSupabaseServer(): SupabaseClient {
  if (supabaseInstance) return supabaseInstance

  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url) {
    throw new Error('Missing SUPABASE_URL environment variable')
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
  }

  supabaseInstance = createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    db: {
      schema: 'public'
    },
    global: {
      headers: { 'x-client-info': 'wizard-form' },
      fetch: createTimeoutFetch()
    }
  })

  return supabaseInstance
}