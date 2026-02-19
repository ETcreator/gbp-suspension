import { register } from 'node:module'
import { pathToFileURL } from 'node:url'

register('./mock-loader.js', pathToFileURL('./'))

process.env.SUPABASE_URL = 'https://test-project.supabase.co'
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-key'