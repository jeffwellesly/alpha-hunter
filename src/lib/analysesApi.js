// Public reads for the `analyses` table - this is a single-publisher site
// (Jeff publishes via cli/analyze.js, no web login for anyone), so the only
// thing the frontend ever needs is "list what's published" and "load one
// full analysis." Safe to call even when Supabase isn't configured yet -
// throws a clear error rather than a null-dereference.

import { supabase, supabaseConfigured } from './supabaseClient'

function assertConfigured() {
  if (!supabaseConfigured) throw new Error('Publishing isn\'t set up yet on this deployment.')
}

/** Published analyses, most recent first. */
export async function listPublicAnalyses(limit = 20) {
  assertConfigured()
  const { data, error } = await supabase
    .from('analyses')
    .select('id, ticker, company_name, created_at')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data
}

/** Full saved payload for one analysis - used to render it read-only. */
export async function getAnalysis(id) {
  assertConfigured()
  const { data, error } = await supabase.from('analyses').select('*').eq('id', id).single()
  if (error) throw error
  return data
}
