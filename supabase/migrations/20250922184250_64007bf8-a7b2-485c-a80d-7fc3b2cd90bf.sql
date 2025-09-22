-- Add client and admin users to Supabase auth
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES 
-- Client user
(
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'user@muhlstore.com',
  crypt('user123', gen_salt('bf')),
  now(),
  '{"role": "user"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
),
-- Admin user
(
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@muhlstore.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  '{"role": "admin"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
) ON CONFLICT (email) DO NOTHING;