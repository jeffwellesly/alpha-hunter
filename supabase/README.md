# Supabase setup (one-time, ~5 minutes)

This is the one step that needs a human: creating the project itself
requires signing in to supabase.com (free tier - no card required). Nothing
else in this repo can create that account.

1. Create a free project at https://supabase.com/dashboard.
2. In the SQL editor, run `migrations/0001_init.sql`.
3. Install the Supabase CLI and link the project:
   ```
   npm install -g supabase
   supabase login
   supabase link --project-ref <your-project-ref>
   ```
4. Set the Edge Function secret (a random string you generate once and never
   reuse elsewhere - this is what encrypts stored Anthropic keys at rest):
   ```
   supabase secrets set ENCRYPTION_SECRET=<a long random string>
   ```
5. Deploy the two Edge Functions:
   ```
   supabase functions deploy save-api-keys
   supabase functions deploy get-my-keys
   ```
6. In Authentication settings, enable Email and Google providers.
7. Copy the project URL and anon key (Project Settings -> API) into
   `.env.local` (see `.env.example`) for local dev, and into the Vercel
   project's environment variables for production.
8. After creating your own account through the app's normal sign-up flow,
   promote it to admin once, by hand, in the SQL editor:
   ```sql
   update profiles set is_admin = true where username = 'your-username';
   ```

Until steps 1-7 are done, the app behaves exactly as it does today -
localStorage-only Anthropic key, no login, no persistence. Accounts are
additive: nothing about the current demo/live flow changes or breaks by
these files existing unconfigured.
