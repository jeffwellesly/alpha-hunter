-- Fixes a real bug found while bootstrapping the first admin account: with
-- email confirmation required (the project default), auth.signUp() returns
-- a user but no active session, so the client-side "insert into profiles"
-- that used to run right after signup hit RLS (auth.uid() had nothing to
-- match against yet) and failed for every single real signup, not just
-- this one. The fix is the standard Supabase pattern - a trigger on
-- auth.users that creates the matching profiles row server-side,
-- regardless of whether the session exists yet.

create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'username', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Bootstrap the admin account: the very first real signup (jeff,
-- jeffwellesly4work@gmail.com) was created via the app before this trigger
-- existed, so it has an auth.users row but no profiles row yet. Backfill it
-- here rather than asking for a second signup attempt, confirm the email
-- server-side (the confirmation link would do the same thing - this just
-- avoids the round trip), and promote to admin per spec Section 4 ("do not
-- build an admin-signup flow" - this one-time manual SQL step is that flow).
do $$
declare
  v_user_id uuid;
begin
  select id into v_user_id from auth.users where email = 'jeffwellesly4work@gmail.com';
  if v_user_id is not null then
    update auth.users set email_confirmed_at = coalesce(email_confirmed_at, now()) where id = v_user_id;
    insert into public.profiles (id, username, is_admin)
    values (v_user_id, 'jeff', true)
    on conflict (id) do update set is_admin = true;
  end if;
end $$;
