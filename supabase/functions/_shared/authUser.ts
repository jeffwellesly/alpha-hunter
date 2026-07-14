import { createClient } from 'jsr:@supabase/supabase-js@2'

/**
 * Verifies the caller's Supabase Auth JWT (passed as the standard
 * Authorization: Bearer header from the client SDK) and returns their user
 * id. Throws if the token is missing/invalid - callers should catch and
 * return 401.
 */
export async function requireUserId(req: Request): Promise<string> {
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) throw new Error('Missing Authorization header')

  const anonClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } }
  )
  const {
    data: { user },
    error,
  } = await anonClient.auth.getUser()
  if (error || !user) throw new Error('Invalid or expired session')
  return user.id
}

/** Service-role client - bypasses RLS. Only ever used server-side here. */
export function adminClient() {
  return createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
}
