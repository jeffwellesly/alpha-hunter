// Reads/writes for the `analyses` and `portfolios` tables. Safe to call even
// when Supabase isn't configured yet - throws a clear error rather than a
// null-dereference; callers should treat that as "feature not available yet"
// rather than a hard failure.

import { supabase, supabaseConfigured } from './supabaseClient'

function assertConfigured() {
  if (!supabaseConfigured) throw new Error('Accounts are not set up yet on this deployment.')
}

/** Saves a completed analysis under the given user. Private by default - see spec Section 5/2. */
export async function saveAnalysis({ userId, ticker, companyName, status, resultsJson }) {
  assertConfigured()
  const { data, error } = await supabase
    .from('analyses')
    .insert({ user_id: userId, ticker, company_name: companyName, status, results_json: resultsJson })
    .select('id')
    .single()
  if (error) throw error
  return data
}

/** The signed-in user's own saved analyses, most recent first. */
export async function listMyAnalyses(userId) {
  assertConfigured()
  const { data, error } = await supabase
    .from('analyses')
    .select('id, ticker, company_name, status, is_public, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

/** Full saved payload for one analysis - used to render a saved run read-only. */
export async function getAnalysis(id) {
  assertConfigured()
  const { data, error } = await supabase.from('analyses').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

/** Marks one of the caller's own analyses public (or private again). */
export async function setAnalysisPublic(id, isPublic) {
  assertConfigured()
  const { error } = await supabase.from('analyses').update({ is_public: isPublic }).eq('id', id)
  if (error) throw error
}

/** Public landing page: the admin's published analyses. RLS already scopes
 * this to is_public rows for anyone querying without owning them. */
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

/** Public landing page: the admin's tracked portfolio. RLS's
 * "admin portfolio is publicly readable" policy scopes this automatically -
 * a non-admin caller querying portfolios only ever sees the admin's rows. */
export async function listAdminPortfolio() {
  assertConfigured()
  const { data, error } = await supabase.from('portfolios').select('ticker, added_at').order('added_at', { ascending: false })
  if (error) throw error
  return data
}

export async function addPortfolioTicker(userId, ticker) {
  assertConfigured()
  const { error } = await supabase.from('portfolios').insert({ user_id: userId, ticker: ticker.toUpperCase() })
  if (error) throw error
}

export async function removePortfolioTicker(userId, ticker) {
  assertConfigured()
  const { error } = await supabase.from('portfolios').delete().eq('user_id', userId).eq('ticker', ticker.toUpperCase())
  if (error) throw error
}

export async function listMyPortfolio(userId) {
  assertConfigured()
  const { data, error } = await supabase.from('portfolios').select('ticker, added_at').eq('user_id', userId).order('added_at', { ascending: false })
  if (error) throw error
  return data
}
