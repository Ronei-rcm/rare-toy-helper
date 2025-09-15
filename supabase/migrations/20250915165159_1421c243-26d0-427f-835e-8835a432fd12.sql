-- CRITICAL SECURITY FIX: Remove customer data exposure
-- Fix the orders table RLS policy to prevent anonymous access to sensitive customer data

-- Drop the existing insecure policy
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;

-- Create secure policy that only allows authenticated users to view their own orders
CREATE POLICY "Users can view their own orders"
ON public.orders
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create separate policy for guest orders (requires proper session validation)
-- This should only be used with proper session tokens, not for anonymous access
CREATE POLICY "Guest orders access"
ON public.orders
FOR SELECT
TO anon
USING (false); -- Disable anonymous access completely for now

-- Fix the orders insert policy to be more restrictive
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;

-- Allow authenticated users to create orders
CREATE POLICY "Authenticated users can create orders"
ON public.orders
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow system to create guest orders with proper validation
CREATE POLICY "System can create guest orders"
ON public.orders
FOR INSERT
TO anon
WITH CHECK (user_id IS NULL AND customer_email IS NOT NULL AND customer_name IS NOT NULL);