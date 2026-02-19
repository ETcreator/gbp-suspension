import { vi } from 'vitest'

// Mock environment module
vi.mock('../../env/server', () => {
  return {
    envServer: {
      SUPABASE_URL: 'https://test-project.supabase.co',
      SUPABASE_SERVICE_ROLE_KEY: 'test-key'
    }
  }
})

// Mock Supabase client
vi.mock('../supabaseServer', () => {
  const mockData = { id: '123e4567-e89b-12d3-a456-426614174000' }
  return {
    supabaseServer: {
      from: () => ({
        insert: () => ({
          select: () => ({
            single: () => ({
              abortSignal: () => Promise.resolve({ data: mockData, error: null })
            })
          })
        })
      })
    }
  }
})