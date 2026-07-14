# Supabase setup

**Concept, as of 2026-07-15**: AlphaHunter is a single-publisher content
site. Jeff runs analyses via `cli/analyze.js` (no web login involved) and
publishes them; visitors just browse and read - no accounts, no login, no
self-serve analysis trigger in the web UI. The frontend has zero auth code
left in it.

**What's actually used by the live site today:**
- `analyses` table, `is_public = true` rows only, read via the anon key
  (`lib/analysesApi.js`: `listPublicAnalyses`, `getAnalysis`).
- Nothing else. `profiles`, `user_api_keys`, `portfolios`, `portfolio_runs`,
  and both Edge Functions (`save-api-keys`, `get-my-keys`) are deployed and
  functioning but currently unused by any code path - left in place rather
  than torn down since removing live infra that isn't causing harm is a
  worse trade than a bit of unused surface area. If a future feature needs
  them (bringing back self-serve analysis, say), they're already there and
  already verified working.

**Publishing a new analysis** (the only thing that still needs Supabase
credentials, and only for Jeff, via the CLI - not the web app):
```
SUPABASE_URL=https://pvrmqyobzarmzxpbsksr.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service_role key from `supabase projects api-keys`>
ENCRYPTION_SECRET=<value set as the Edge Function secret - only needed if pulling the stored Anthropic key from the DB>
ADMIN_USER_ID=82702adf-a2d1-43c1-9968-cf50bf070cb6
```
in `.env.cli` (git-ignored), then:
```
node cli/analyze.js MU
```
Without those env vars, the CLI falls back to standalone mode: reads a
plain `ANTHROPIC_KEY` env var and just writes the result to
`cli/output/<ticker>-<date>.json` locally instead of publishing.

**The `Taswells` account** (`jeffwellesly4work@gmail.com`, `is_admin = true`)
still exists and still works for sign-in if the auth UI ever comes back,
but nothing in the current frontend surfaces a way to use it.
