import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting for guest order lookups
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  
  if (!limit || now > limit.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60000 }); // 1 minute window
    return true;
  }
  
  if (limit.count >= 10) { // Max 10 lookups per minute per IP
    return false;
  }
  
  limit.count++;
  return true;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting check
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(clientIP)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const url = new URL(req.url);
    const guestAccessToken = url.searchParams.get('token');
    const orderNumber = url.searchParams.get('order_number');
    const customerEmail = url.searchParams.get('email');

    if (!guestAccessToken && (!orderNumber || !customerEmail)) {
      return new Response(
        JSON.stringify({ error: 'Either token or order_number + email required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    let query = supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (
            id,
            name,
            image_url,
            price
          )
        )
      `);

    // Token-based lookup (from order confirmation email/page)
    if (guestAccessToken) {
      query = query.eq('guest_access_token', guestAccessToken);
    } 
    // Email + order number lookup (for tracking page)
    else {
      query = query
        .eq('order_number', orderNumber)
        .eq('customer_email', customerEmail);
    }

    const { data: order, error } = await query
      .is('user_id', null) // Only guest orders
      .single();

    if (error || !order) {
      console.log('Order not found or error:', error);
      return new Response(
        JSON.stringify({ error: 'Order not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if token has expired
    if (order.guest_token_expires_at && new Date(order.guest_token_expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ error: 'Order access token has expired' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Remove sensitive token from response
    const { guest_access_token, ...orderData } = order;

    console.log(`Guest order accessed: ${order.order_number}`);

    return new Response(
      JSON.stringify(orderData),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in get-guest-order function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
