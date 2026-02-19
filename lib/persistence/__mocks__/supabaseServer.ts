import { SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient | null = null

export function getSupabaseServer() {
  if (!supabaseInstance) {
    supabaseInstance = {
      from: () => ({
        insert: () => ({
          select: () => ({
            single: () => ({
              data: { id: '123e4567-e89b-12d3-a456-426614174000' },
              error: null
            })
          })
        })
      })
    } as unknown as SupabaseClient
  }
  return supabaseInstance
}