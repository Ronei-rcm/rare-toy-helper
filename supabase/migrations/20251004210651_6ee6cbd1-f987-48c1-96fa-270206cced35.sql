-- Harden guest order creation and add secure guest access token columns

-- 1) Remove permissive guest order INSERT policy
DROP POLICY IF EXISTS "System can create guest orders" ON public.orders;

-- 2) Add columns for secure guest access via token (used only through Edge Function)
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS guest_access_token text,
  ADD COLUMN IF NOT EXISTS guest_token_expires_at timestamptz;

-- 3) Add unique index for fast token lookup
CREATE UNIQUE INDEX IF NOT EXISTS orders_guest_access_token_idx
  ON public.orders(guest_access_token);

-- Note: Guest order creation and retrieval will be performed exclusively via a Supabase Edge Function
-- using the service role key with full validation and rate limiting. No direct anonymous INSERTs
-- into public.orders are permitted anymore.
