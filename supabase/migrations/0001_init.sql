-- AlphaHunter V2 schema. See AlphaHunter_V2_ClaudeCode_BuildSpec.md Section 2
-- for the original spec; a few RLS details below deliberately go further
-- than the spec's literal wording (agreed with the user before building):
--
--   * user_api_keys has NO direct client policies at all (not even
--     owner-read). The stored values are encrypted bytea, useless to a
--     client without the server-held encryption secret, so an owner-read
--     policy has no purpose and is just extra attack surface. All access
--     goes through the save-api-keys / get-my-keys Edge Functions using the
--     service role key, which bypasses RLS entirely.
--   * analyses.is_public defaults to false for EVERYONE, including the
--     admin - "admin's analyses are automatically public" was replaced with
--     an explicit publish action (a normal UPDATE by the owner), so test
--     runs on the admin's own account don't leak onto the public landing
--     page by accident.
--
-- pgcrypto is used for encrypting FMP... no, Anthropic-only now: encrypting
-- the Anthropic API key at rest. The encryption key itself lives only as an
-- Edge Function secret (never in the database, never in this repo).

create extension if not exists pgcrypto;

-- profiles ------------------------------------------------------------

create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text unique not null,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "profiles are readable by anyone"
  on profiles for select
  using (true);

create policy "users can insert their own profile"
  on profiles for insert
  with check (auth.uid() = id);

create policy "users can update their own profile"
  on profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- user_api_keys ---------------------------------------------------------
-- No RLS policies at all beyond enabling RLS. This is deliberate (see file
-- header) - reads/writes only ever happen via Edge Functions using the
-- service role key, which bypasses RLS. Authenticated clients get zero
-- direct access, not even to their own row.

create table user_api_keys (
  user_id uuid primary key references profiles (id) on delete cascade,
  anthropic_key_encrypted bytea,
  claude_model_pref text default 'claude-sonnet-5',
  updated_at timestamptz not null default now()
);

alter table user_api_keys enable row level security;

-- analyses ----------------------------------------------------------------

create table analyses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles (id) on delete cascade,
  ticker text not null,
  company_name text,
  status text not null default 'in_progress' check (status in ('in_progress', 'complete', 'partial')),
  is_public boolean not null default false,
  results_json jsonb,
  created_at timestamptz not null default now()
);

create index analyses_user_id_idx on analyses (user_id, created_at desc);
create index analyses_public_idx on analyses (is_public, created_at desc) where is_public;
create index analyses_ticker_idx on analyses (ticker);

alter table analyses enable row level security;

create policy "owners can read their own analyses"
  on analyses for select
  using (auth.uid() = user_id);

create policy "anyone can read public analyses"
  on analyses for select
  using (is_public = true);

create policy "owners can insert their own analyses"
  on analyses for insert
  with check (auth.uid() = user_id);

create policy "owners can update their own analyses"
  on analyses for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- portfolios ----------------------------------------------------------------

create table portfolios (
  user_id uuid not null references profiles (id) on delete cascade,
  ticker text not null,
  added_at timestamptz not null default now(),
  primary key (user_id, ticker)
);

alter table portfolios enable row level security;

create policy "owners can read their own portfolio"
  on portfolios for select
  using (auth.uid() = user_id);

-- The admin's portfolio is publicly readable (spec Section 3: "Admin's
-- portfolio... visible to all visitors"). Implemented as a profiles.is_admin
-- join rather than a redundant per-row is_public flag, since it's a single
-- account-level property, not a per-ticker decision.
create policy "admin portfolio is publicly readable"
  on portfolios for select
  using (
    exists (
      select 1 from profiles
      where profiles.id = portfolios.user_id
      and profiles.is_admin = true
    )
  );

create policy "owners can manage their own portfolio"
  on portfolios for insert
  with check (auth.uid() = user_id);

create policy "owners can delete their own portfolio rows"
  on portfolios for delete
  using (auth.uid() = user_id);

-- portfolio_runs --------------------------------------------------------

create table portfolio_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles (id) on delete cascade,
  run_date date not null default current_date,
  ticker_list text[] not null,
  status text not null default 'in_progress' check (status in ('in_progress', 'complete', 'partial'))
);

create index portfolio_runs_user_id_idx on portfolio_runs (user_id, run_date desc);

alter table portfolio_runs enable row level security;

create policy "owners can read their own portfolio runs"
  on portfolio_runs for select
  using (auth.uid() = user_id);

create policy "owners can insert their own portfolio runs"
  on portfolio_runs for insert
  with check (auth.uid() = user_id);

create policy "owners can update their own portfolio runs"
  on portfolio_runs for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Setting an account as admin is manual and one-time (spec Section 4 - "do
-- not build an admin-signup flow"). After creating Jeff's account through
-- normal sign-up, run once by hand in the Supabase SQL editor:
--   update profiles set is_admin = true where username = 'jeff';

-- Encrypted key read/write functions ---------------------------------------
-- security definer so they can write/read user_api_keys despite that table
-- having no client-facing RLS policies at all - only the save-api-keys /
-- get-my-keys Edge Functions call these, using the service role client, and
-- the encryption secret is passed in per-call from an Edge Function secret,
-- never stored in the database.

create or replace function upsert_encrypted_api_key(
  p_user_id uuid,
  p_anthropic_key text,
  p_model text,
  p_secret text
) returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into user_api_keys (user_id, anthropic_key_encrypted, claude_model_pref, updated_at)
  values (p_user_id, pgp_sym_encrypt(p_anthropic_key, p_secret), p_model, now())
  on conflict (user_id) do update
    set anthropic_key_encrypted = excluded.anthropic_key_encrypted,
        claude_model_pref = excluded.claude_model_pref,
        updated_at = now();
end;
$$;

create or replace function get_decrypted_api_key(
  p_user_id uuid,
  p_secret text
) returns table (anthropic_key text, model text)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
    select pgp_sym_decrypt(anthropic_key_encrypted, p_secret), claude_model_pref
    from user_api_keys
    where user_id = p_user_id;
end;
$$;

revoke all on function upsert_encrypted_api_key from public, anon, authenticated;
revoke all on function get_decrypted_api_key from public, anon, authenticated;
grant execute on function upsert_encrypted_api_key to service_role;
grant execute on function get_decrypted_api_key to service_role;
