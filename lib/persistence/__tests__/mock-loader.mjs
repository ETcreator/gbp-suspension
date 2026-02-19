export async function resolve(specifier, context, nextResolve) {
  if (specifier === '../../env/server') {
    return {
      url: 'data:text/javascript,export const envServer = { SUPABASE_URL: process.env.SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY };',
      shortCircuit: true
    }
  }
  return nextResolve(specifier)
}