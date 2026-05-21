import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

// POST /api/billing-portal
// Redirects the user to the Stripe customer portal to manage their subscription

export async function POST(req) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' })

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

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data: userRow } = await admin
      .from('app_users')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single()

    if (!userRow?.stripe_customer_id) {
      return NextResponse.json({ error: 'No billing account found' }, { status: 404 })
    }

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'https://promptceo.io'

    const session = await stripe.billingPortal.sessions.create({
      customer:   userRow.stripe_customer_id,
      return_url: `${origin}/account`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
