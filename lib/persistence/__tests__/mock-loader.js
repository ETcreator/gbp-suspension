export async function resolve(specifier, context, nextResolve) {
  if (specifier === '../../env/server') {
    return {
      shortCircuit: true,
      url: 'data:text/javascript,export const envServer = { SUPABASE_URL: "https://test-project.supabase.co", SUPABASE_SERVICE_ROLE_KEY: "test-key" };'
    }
  }
  return nextResolve(specifier)
}