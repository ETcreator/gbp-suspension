import { register } from 'node:module'
import { pathToFileURL } from 'node:url'

// Set environment variables
process.env.SUPABASE_URL = 'https://test-project.supabase.co'
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-key'

// Register loader
register('./mock-loader.mjs', pathToFileURL('./'))