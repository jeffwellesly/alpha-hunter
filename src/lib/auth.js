// Thin wrapper around Supabase Auth + the save-api-keys/get-my-keys Edge
// Functions. All functions are safe to call even when Supabase isn't
// configured yet (supabaseConfigured === false) - they throw a clear error
// instead of a confusing null-dereference, so calling UI can show a real
// message rather than crash.

import { supabase, supabaseConfigured } from './supabaseClient'

function assertConfigured() {
  if (!supabaseConfigured) throw new Error('Accounts are not set up yet on this deployment.')
}

export async function signUpWithEmail({ email, password, username }) {
  assertConfigured()
  // Don't insert into profiles from here - with email confirmation required
  // (the default), signUp() returns a user but no active session, so a
  // client-side insert right after this hits RLS ("auth.uid() = id" has
  // nothing to match against yet) and fails. The profiles row is created
  // server-side by a trigger on auth.users insert (migrations/0002), reading
  // username out of raw_user_meta_data below - works the same whether or
  // not confirmation is required.
  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { username } } })
  if (error) throw error
  return data
}

export async function signInWithEmail({ email, password }) {
  assertConfigured()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signInWithGoogle() {
  assertConfigured()
  const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
  if (error) throw error
  return data
}

export async function signOut() {
  assertConfigured()
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getSession() {
  assertConfigured()
  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  return data.session
}

export function onAuthStateChange(callback) {
  assertConfigured()
  const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session))
  return () => data.subscription.unsubscribe()
}

/** Saves (encrypted, server-side) the caller's Anthropic key + model pref. */
export async function saveApiKeys({ anthropicKey, model }) {
  assertConfigured()
  const { data, error } = await supabase.functions.invoke('save-api-keys', {
    body: { anthropicKey, model },
  })
  if (error) throw error
  return data
}

/** Fetches the caller's decrypted Anthropic key + model pref for this session. */
export async function getMyKeys() {
  assertConfigured()
  const { data, error } = await supabase.functions.invoke('get-my-keys')
  if (error) throw error
  return data
}
