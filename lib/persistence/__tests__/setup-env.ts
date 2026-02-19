// Set environment variables
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test-project.supabase.co'
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key'
process.env.SUPABASE_URL = 'https://test-project.supabase.co'
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-key'

// Mock Supabase client
const mockData = { id: '123e4567-e89b-12d3-a456-426614174000' }

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

// Mock environment module
jest.mock('../../env/server', () => ({
  envServer: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
  }
}))