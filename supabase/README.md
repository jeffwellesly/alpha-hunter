# Supabase setup

**Status: live.** Project `alpha-hunter` (ref `pvrmqyobzarmzxpbsksr`, org "Jeff's Org",
region us-east-1) was created via the Supabase CLI, which was already
authenticated on this machine. Done automatically:

- Schema + RLS applied (`migrations/0001_init.sql`)
- `ENCRYPTION_SECRET` generated and set as an Edge Function secret
- Both Edge Functions deployed (`save-api-keys`, `get-my-keys`) - verified
  live, both correctly return 401 without an auth token
- `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` set in Vercel (Production)
  and in `.env.local` for local dev (git-ignored, not committed)
- Email/password auth confirmed enabled by default
  (`disable_signup: false`, `mailer_autoconfirm: false`)
- End-to-end signup flow verified against the real project: got real,
  distinct validation responses back (invalid-domain rejection, then the
  project's free-tier email-send rate limit) - proof the client, Auth API,
  and project config are correctly wired without needing to spend the full
  email quota on throwaway accounts

**Remaining manual steps** (need your input, not code):

1. **Google OAuth** - not enabled (`google: false` in current auth
   settings). Needs a Google Cloud OAuth client (client ID + secret) from
   *your* Google Cloud Console - nothing in this repo can create that for
   you. Email/password sign-up works today without it; add Google later in
   Authentication → Providers if you want it.
2. **Promote your own account to admin.** Sign up for a real account
   through the live app (use a real, deliverable email - Supabase's
   validation rejects `example.com`/similar and rate-limits repeated
   throwaway signups), then run once in the Supabase SQL editor:
   ```sql
   update profiles set is_admin = true where username = 'your-username';
   ```
   Only after this does your account's analyses auto-count toward the
   public landing page when you explicitly publish them (`setAnalysisPublic`
   in `lib/analysesApi.js`), and only your account's `cli/analyze.js` runs
   (via `ADMIN_USER_ID`) publish automatically.
3. To run the admin CLI in Supabase mode, add to `.env.cli` (git-ignored):
   ```
   SUPABASE_URL=https://pvrmqyobzarmzxpbsksr.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=<service_role key from `supabase projects api-keys`>
   ENCRYPTION_SECRET=<same value set as the Edge Function secret above>
   ADMIN_USER_ID=<your auth.users id, once promoted>
   ```
   Until this exists, `cli/analyze.js` runs in standalone mode (plain
   `ANTHROPIC_KEY` env var, writes to `cli/output/` locally).
