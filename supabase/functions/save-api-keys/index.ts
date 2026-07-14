// Encrypts and stores the caller's Anthropic API key + model preference.
// Called once from the client with the key entered in plaintext over HTTPS;
// this function is the only place that ever touches the encryption secret.
// The encrypted value is meaningless without ENCRYPTION_SECRET, which lives
// only as an Edge Function secret (`supabase secrets set`), never in the
// database and never in this repo.

import { corsHeaders } from '../_shared/cors.ts'
import { requireUserId, adminClient } from '../_shared/authUser.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const userId = await requireUserId(req)
    const { anthropicKey, model } = await req.json()
    if (typeof anthropicKey !== 'string' || !anthropicKey) {
      return new Response(JSON.stringify({ error: 'anthropicKey is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const secret = Deno.env.get('ENCRYPTION_SECRET')
    if (!secret) throw new Error('ENCRYPTION_SECRET is not configured')

    const admin = adminClient()
    const { error } = await admin.rpc('upsert_encrypted_api_key', {
      p_user_id: userId,
      p_anthropic_key: anthropicKey,
      p_model: model || 'claude-sonnet-5',
      p_secret: secret,
    })
    if (error) throw error

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    const message = (err && typeof err === 'object' && 'message' in err && err.message) || String(err) || 'Unknown error'
    const status = message.includes('Authorization') || message.includes('session') ? 401 : 500
    console.error('save-api-keys error:', message)
    return new Response(JSON.stringify({ error: message }), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
