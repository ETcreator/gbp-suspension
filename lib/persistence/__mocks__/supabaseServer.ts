import { createClient } from '@supabase/supabase-js'

// Mock Supabase client for testing
export const supabaseServer = {
  from: () => ({
    insert: () => ({
      select: () => ({
        single: () => ({
          abortSignal: () => ({
            data: { id: '123e4567-e89b-12d3-a456-426614174000' },
            error: null
          })
        })
      })
    })
  })
}