// Admin CLI: runs the exact same analysis pipeline as the web app
// (shared/runAnalysis.js) from the terminal.
//
//   node cli/analyze.js MU
//
// Two modes, auto-selected by which env vars are set - never both:
//
//   Supabase mode (once supabase/README.md's setup is done): reads
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ENCRYPTION_SECRET, ADMIN_USER_ID
//   from .env.cli (git-ignored, never committed). Decrypts the admin's own
//   stored Anthropic key directly via the get_decrypted_api_key RPC using
//   the service role - a trusted local script has no reason to round-trip
//   through its own get-my-keys Edge Function. Saves the result to the
//   `analyses` table with is_public = true, so it appears on the public
//   landing page immediately.
//
//   Standalone mode (today, before Supabase exists): reads ANTHROPIC_KEY
//   (and optional CLAUDE_MODEL) directly and just writes the result JSON to
//   ./cli/output/<TICKER>-<date>.json - still useful on its own.

import { writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { runFullAnalysis } from '../src/shared/runAnalysis.js'

const ticker = process.argv[2]
if (!ticker) {
  console.error('Usage: node cli/analyze.js <TICKER>')
  process.exit(1)
}

const supabaseUrl = process.env.SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const encryptionSecret = process.env.ENCRYPTION_SECRET
const adminUserId = process.env.ADMIN_USER_ID
const supabaseMode = Boolean(supabaseUrl && serviceRoleKey && encryptionSecret && adminUserId)

async function resolveKeys() {
  if (!supabaseMode) {
    const anthropicKey = process.env.ANTHROPIC_KEY
    if (!anthropicKey) {
      console.error('Set ANTHROPIC_KEY (standalone mode), or SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY/ENCRYPTION_SECRET/ADMIN_USER_ID (Supabase mode).')
      process.exit(1)
    }
    return { anthropicKey, model: process.env.CLAUDE_MODEL || 'claude-sonnet-5' }
  }

  const { createClient } = await import('@supabase/supabase-js')
  const admin = createClient(supabaseUrl, serviceRoleKey)
  const { data, error } = await admin.rpc('get_decrypted_api_key', {
    p_user_id: adminUserId,
    p_secret: encryptionSecret,
  })
  if (error) throw error
  const row = data?.[0]
  if (!row?.anthropic_key) throw new Error('No Anthropic key stored for ADMIN_USER_ID yet - add one via the app first.')
  return { anthropicKey: row.anthropic_key, model: row.model || 'claude-sonnet-5' }
}

async function saveResult(result) {
  if (!supabaseMode) {
    const dir = path.join(process.cwd(), 'cli', 'output')
    await mkdir(dir, { recursive: true })
    const file = path.join(dir, `${result.ticker}-${result.asOfDate}.json`)
    await writeFile(file, JSON.stringify(result, null, 2))
    console.log(`\nSaved locally: ${file}`)
    console.log('(Standalone mode - set up Supabase per supabase/README.md to publish this to the public landing page automatically.)')
    return
  }

  const { createClient } = await import('@supabase/supabase-js')
  const admin = createClient(supabaseUrl, serviceRoleKey)
  const { error } = await admin.from('analyses').insert({
    user_id: adminUserId,
    ticker: result.ticker,
    company_name: result.companyName,
    status: result.meta.errors ? 'partial' : 'complete',
    is_public: true,
    results_json: result,
  })
  if (error) throw error
  console.log(`\nSaved to Supabase and published to the public landing page (ticker: ${result.ticker}).`)
}

const { anthropicKey, model } = await resolveKeys()

console.log(`Analyzing ${ticker.toUpperCase()} (${supabaseMode ? 'Supabase' : 'standalone'} mode, model: ${model})...\n`)

const result = await runFullAnalysis({
  ticker,
  anthropicKey,
  model,
  onProgress: (step, message) => console.log(`[${step}] ${message}`),
})

console.log('\n--- Summary ---')
console.log('Verdict:', result.valuationSummary.verdict, `(${(result.valuationSummary.upside * 100).toFixed(1)}% upside)`)
console.log('Factor score:', result.factorScore.score)
if (result.meta.errors) console.log('Errors during run:', result.meta.errors)

await saveResult(result)
