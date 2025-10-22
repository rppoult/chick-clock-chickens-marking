import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client with service role for guest checkout
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // For guest checkout, we don't need to get the user

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id } = await req.json()

    // Get Razorpay secret
    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET')
    if (!razorpayKeySecret) {
      return new Response(
        JSON.stringify({ error: 'Razorpay credentials not configured' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(razorpayKeySecret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    )
    
    const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(body))
    const expectedSignature = Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    if (expectedSignature !== razorpay_signature) {
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Update order in database (works for both authenticated and guest users)
    const { data: updatedOrder, error: updateError } = await supabaseClient
      .from('orders')
      .update({
        payment_status: 'paid',
        status: 'confirmed',
        razorpay_payment_id: razorpay_payment_id,
      })
      .eq('id', order_id)
      // Remove user_id constraint to allow guest orders
      .select()
      .single()

    if (updateError) {
      throw new Error(`Database error: ${updateError.message}`)
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Payment verified successfully',
        order: updatedOrder,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Error verifying payment:', error)
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})