-- Cleanup: 0003's verification test saved a fake placeholder Anthropic key
-- ("sk-ant-placeholder-not-a-real-key") to jeff's real account to prove the
-- save/encrypt/decrypt round trip works end-to-end. Clearing it so the
-- account isn't left with garbage in place of a real key.

delete from user_api_keys
using profiles
where user_api_keys.user_id = profiles.id
and profiles.username = 'jeff';
