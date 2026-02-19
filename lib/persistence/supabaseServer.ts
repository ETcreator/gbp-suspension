import { createClient } from '@supabase/supabase-js'
import { envServer } from '../env/server'
import { createTimeoutFetch } from './fetch'

// Export as a mutable object for testing
export let supabaseServer = createClient(
  envServer.SUPABASE_URL,
  envServer.SUPABASE_SERVICE_ROLE_KEY,
  {
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
  }
)