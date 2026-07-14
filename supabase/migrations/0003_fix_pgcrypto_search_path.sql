-- Bug fix: pgp_sym_encrypt/pgp_sym_decrypt live in the "extensions" schema
-- on this project (Supabase's default location for pgcrypto), but
-- upsert_encrypted_api_key/get_decrypted_api_key set search_path = public
-- only, so the functions couldn't find pgp_sym_encrypt/decrypt at all -
-- every save-api-keys call was silently failing. Found via a real end-to-
-- end signup/save/reload test, not just a schema read.

alter function upsert_encrypted_api_key set search_path = public, extensions;
alter function get_decrypted_api_key set search_path = public, extensions;
