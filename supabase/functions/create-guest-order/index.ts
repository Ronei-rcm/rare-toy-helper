import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple in-memory rate limiting (resets on function restart)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  
  if (!limit || now > limit.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60000 }); // 1 minute window
    return true;
  }
  
  if (limit.count >= 5) { // Max 5 orders per minute per IP
    return false;
  }
  
  limit.count++;
  return true;
}

function generateSecureToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

function validatePhone(phone: string): boolean {
  return phone.length <= 20;
}

function sanitizeString(str: string, maxLength: number): string {
  return str.trim().slice(0, maxLength);
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

    const { 
      customer_name, 
      customer_email, 
      customer_phone, 
      shipping_address,
      payment_method,
      cart_items,
      notes
    } = await req.json();

    // Validate required fields
    if (!customer_name || !customer_email || !shipping_address || !cart_items || cart_items.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    if (!validateEmail(customer_email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate phone if provided
    if (customer_phone && !validatePhone(customer_phone)) {
      return new Response(
        JSON.stringify({ error: 'Invalid phone number' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize inputs
    const sanitizedName = sanitizeString(customer_name, 100);
    const sanitizedEmail = sanitizeString(customer_email, 255);
    const sanitizedPhone = customer_phone ? sanitizeString(customer_phone, 20) : null;
    const sanitizedNotes = notes ? sanitizeString(notes, 1000) : null;

    // Create Supabase client with service role for bypassing RLS
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Calculate total amount from cart items
    let totalAmount = 0;
    for (const item of cart_items) {
      if (!item.product_id || !item.quantity || !item.price) {
        return new Response(
          JSON.stringify({ error: 'Invalid cart item data' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      totalAmount += item.price * item.quantity;
    }

    // Generate secure access token for guest order tracking
    const guestAccessToken = generateSecureToken();
    const tokenExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: null, // Guest order
        customer_name: sanitizedName,
        customer_email: sanitizedEmail,
        customer_phone: sanitizedPhone,
        total_amount: totalAmount,
        shipping_address: shipping_address,
        payment_method: payment_method || 'pix',
        payment_status: 'pending',
        status: 'pending',
        notes: sanitizedNotes,
        order_number: orderNumber,
        guest_access_token: guestAccessToken,
        guest_token_expires_at: tokenExpiresAt.toISOString(),
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return new Response(
        JSON.stringify({ error: 'Failed to create order' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create order items
    const orderItems = cart_items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.price,
      total_price: item.price * item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      // Rollback order creation
      await supabase.from('orders').delete().eq('id', order.id);
      return new Response(
        JSON.stringify({ error: 'Failed to create order items' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Guest order created: ${orderNumber} for ${sanitizedEmail}`);

    return new Response(
      JSON.stringify({ 
        order_id: order.id,
        order_number: orderNumber,
        guest_access_token: guestAccessToken,
        message: 'Order created successfully'
      }),
      { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in create-guest-order function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
