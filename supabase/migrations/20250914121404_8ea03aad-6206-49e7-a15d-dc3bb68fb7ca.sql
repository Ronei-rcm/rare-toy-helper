-- Harden pix_payments RLS to prevent public access
-- 1) Helper function to check if current user owns the related order
CREATE OR REPLACE FUNCTION public.has_order_access(_order_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.orders o
    WHERE o.id = _order_id
      AND o.user_id = auth.uid()
  );
$$;

-- 2) Ensure RLS is enabled
ALTER TABLE public.pix_payments ENABLE ROW LEVEL SECURITY;

-- 3) Remove overly permissive policy
DROP POLICY IF EXISTS "Users can view pix payments" ON public.pix_payments;

-- 4) Restrictive, owner-based policies
CREATE POLICY "Users can view their own pix payments"
ON public.pix_payments
FOR SELECT
TO authenticated
USING (public.has_order_access(order_id));

CREATE POLICY "Users can create their own pix payments"
ON public.pix_payments
FOR INSERT
TO authenticated
WITH CHECK (public.has_order_access(order_id));

CREATE POLICY "Users can update their own pix payments"
ON public.pix_payments
FOR UPDATE
TO authenticated
USING (public.has_order_access(order_id));

CREATE POLICY "Users can delete their own pix payments"
ON public.pix_payments
FOR DELETE
TO authenticated
USING (public.has_order_access(order_id));