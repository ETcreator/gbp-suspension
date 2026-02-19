import { vi } from 'vitest'

vi.mock('../supabaseServer', () => {
  const mockData = { id: '123e4567-e89b-12d3-a456-426614174000' }
  return {
    getSupabaseServer: () => ({
      from: () => ({
        insert: () => ({
          select: () => ({
            single: () => ({
              data: mockData,
              error: null
            })
          })
        })
      })
    })
  }
})