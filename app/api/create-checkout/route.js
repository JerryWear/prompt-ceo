import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

function clean(value) {
  return String(value || '').trim()
}

const CREDIT_PRODUCTS = {
  '50': {
    priceId: process.env.STRIPE_PRICE_50,
    credits: 50,
  },
  '100': {
    priceId: process.env.STRIPE_PRICE_100,
    credits: 100,
  },
  '250': {
    priceId: process.env.STRIPE_PRICE_250,
    credits: 250,
  },
  '500': {
    priceId: process.env.STRIPE_PRICE_500,
    credits: 500,
  },
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}))
    const product = clean(body?.product) || '100'

    const selectedProduct = CREDIT_PRODUCTS[product]

    if (!selectedProduct) {
      return NextResponse.json(
        { status: 'error', message: 'Invalid credit product' },
        { status: 400 }
      )
    }

    const priceId = clean(selectedProduct.priceId)
    const baseUrl =
      clean(process.env.NEXT_PUBLIC_BASE_URL) || 'http://localhost:3000'

    if (!priceId) {
      return NextResponse.json(
        { status: 'error', message: 'Missing Stripe price ID' },
        { status: 500 }
      )
    }

    // 🔐 REAL SUPABASE AUTH USER
    const cookieStore = await cookies()

    const supabaseAuth = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
cookies: {
  get(name) {
    return cookieStore.get(name)?.value
  },
  set(name, value, options) {
    cookieStore.set({ name, value, ...options })
  },
  remove(name, options) {
    cookieStore.set({ name, value: '', ...options })
  },
},
      }
    )

    const {
      data: { user },
      error: authError,
    } = await supabaseAuth.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { status: 'error', message: 'Not authenticated' },
        { status: 401 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],

      metadata: {
        userId: user.id,
        email: user.email || '',
        product,
        credits: String(selectedProduct.credits),
      },

      success_url: `${baseUrl}/prompt-v2?credits=success`,
      cancel_url: `${baseUrl}/prompt-v2`,
    })

    return NextResponse.json({
      status: 'success',
      url: session.url,
    })
  } catch (err) {
    return NextResponse.json(
      {
        status: 'error',
        message: clean(err?.message) || 'Could not create checkout session',
      },
      { status: 500 }
    )
  }
}