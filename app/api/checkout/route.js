import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { TIER_PRICES, TIER_DISPLAY } from '../../../lib/subscription.js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return null
  return new Stripe(key, { apiVersion: '2024-06-20' })
}

export async function POST(req) {
  const stripe = getStripe()
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }

  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name)              { return cookieStore.get(name)?.value },
          set(name, value, opts) { cookieStore.set({ name, value, ...opts }) },
          remove(name, opts)     { cookieStore.set({ name, value: '', ...opts }) },
        },
      }
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (!user || authError) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const body = await req.json()
    const tier = body?.tier // 'creator' | 'pro' | 'agency' | 'music_addon'
    const priceId = TIER_PRICES[tier]

    if (!tier || !priceId) {
      return NextResponse.json({ error: `Invalid tier: ${tier}` }, { status: 400 })
    }

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    // Get or create Stripe customer
    let { data: userRow } = await admin.from('app_users').select('stripe_customer_id, subscription_tier').eq('id', user.id).single()

    let customerId = userRow?.stripe_customer_id
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { userId: user.id },
      })
      customerId = customer.id
      await admin.from('app_users').upsert({ id: user.id, stripe_customer_id: customerId })
    }

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/prompt-engine-v3?subscribed=${tier}`,
      cancel_url:  `${origin}/prompt-engine-v3?canceled=true`,
      metadata: {
        userId: user.id,
        tier,
        type: tier === 'music_addon' ? 'music_addon' : 'subscription',
      },
      subscription_data: {
        metadata: { userId: user.id, tier },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export function GET() {
  return new Response('Checkout route alive', { status: 200 })
}
