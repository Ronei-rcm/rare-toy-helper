-- Fix order_items security vulnerability - clean approach
-- 1) Create helper function to check if user owns the order containing the order item
CREATE OR REPLACE FUNCTION public.has_order_item_access(_order_id uuid)
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
      AND (o.user_id = auth.uid() OR o.user_id IS NULL)
  );
$$;

-- 2) Drop ALL existing policies on order_items
DROP POLICY IF EXISTS "Users can view order items" ON public.order_items;
DROP POLICY IF EXISTS "Users can view their own order items" ON public.order_items;
DROP POLICY IF EXISTS "System can create order items" ON public.order_items;
DROP POLICY IF EXISTS "Users can update their own order items" ON public.order_items;
DROP POLICY IF EXISTS "Users can delete their own order items" ON public.order_items;

-- 3) Create secure RLS policies for order_items
CREATE POLICY "Users can view their own order items"
ON public.order_items
FOR SELECT
TO authenticated
USING (public.has_order_item_access(order_id));

CREATE POLICY "System can create order items"
ON public.order_items
FOR INSERT
TO authenticated
WITH CHECK (public.has_order_item_access(order_id));

CREATE POLICY "Users can update their own order items"
ON public.order_items
FOR UPDATE
TO authenticated
USING (public.has_order_item_access(order_id));

CREATE POLICY "Users can delete their own order items"
ON public.order_items
FOR DELETE
TO authenticated
USING (public.has_order_item_access(order_id));