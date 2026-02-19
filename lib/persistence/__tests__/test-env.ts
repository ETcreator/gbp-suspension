// Set environment variables
process.env.SUPABASE_URL = 'https://test-project.supabase.co'
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-key'

// Mock Supabase client
export const mockData = { id: '123e4567-e89b-12d3-a456-426614174000' }

export const mockSupabase = {
  from: () => ({
    insert: () => ({
      select: () => ({
        single: () => ({
          abortSignal: () => Promise.resolve({ data: mockData, error: null })
        })
      })
    })
  })
} as any