// Decrypts and returns the caller's own Anthropic key + model preference
// for use client-side for the rest of that session. This is a retrieval
// step, not a proxy - the browser still calls Anthropic directly with the
// key it gets back here (see shared/runAnalysis.js's header comment on why
// that split matters for the existing security model).

import { corsHeaders } from '../_shared/cors.ts'
import { requireUserId, adminClient } from '../_shared/authUser.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const userId = await requireUserId(req)
    const secret = Deno.env.get('ENCRYPTION_SECRET')
    if (!secret) throw new Error('ENCRYPTION_SECRET is not configured')

    const admin = adminClient()
    const { data, error } = await admin.rpc('get_decrypted_api_key', {
      p_user_id: userId,
      p_secret: secret,
    })
    if (error) throw error

    const row = data?.[0]
    return new Response(
      JSON.stringify({
        anthropicKey: row?.anthropic_key ?? null,
        model: row?.model ?? null,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    const status = message.includes('Authorization') || message.includes('session') ? 401 : 500
    return new Response(JSON.stringify({ error: message }), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
