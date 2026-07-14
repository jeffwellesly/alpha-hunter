// Supabase client for auth + persistence only - never a proxy for FMP...
// well, Anthropic calls now (see shared/runAnalysis.js). Returns null until
// VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY are configured, so the app keeps
// working exactly as it does today (localStorage-only key, no login) until
// a real Supabase project exists and those env vars are set in Vercel.

import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseConfigured = Boolean(url && anonKey)

export const supabase = supabaseConfigured ? createClient(url, anonKey) : null
