-- User asked for a specific admin username/password rather than the ones
-- generated during bootstrap - same account (already is_admin = true,
-- migrations/0002), just renamed. Password was set separately via the
-- Auth Admin API (not something SQL can do - passwords are hashed by
-- GoTrue, not stored as a plain column).

update profiles set username = 'Taswells' where username = 'jeff';
