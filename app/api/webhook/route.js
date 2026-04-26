import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(req) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('❌ Webhook signature error:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // ✅ HANDLE SUCCESSFUL PAYMENT
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    const userId = session.metadata?.userId
    const creditsToAdd = Number(session.metadata?.credits || 0)

    if (!userId || creditsToAdd <= 0) {
      console.error('❌ Missing metadata:', session.metadata)
      return NextResponse.json({ received: true })
    }

// 👉 SAFE CREDIT UPSERT (handles new + existing users)

const { data: existingUser } = await supabase
  .from('app_users')
  .select('credits')
  .eq('id', userId)
  .single()

const currentCredits = existingUser?.credits || 0
const newCredits = currentCredits + creditsToAdd

const { error: upsertError } = await supabase
  .from('app_users')
  .upsert({
    id: userId,
    email: session.metadata?.email || '',
    credits: newCredits,
    plan: 'trial',
    daily_limit: 20,
  })

if (upsertError) {
  console.error('❌ Credit upsert error:', upsertError)
} else {
  console.log(`✅ Added ${creditsToAdd} credits to user ${userId}`)
}
}

  return NextResponse.json({ received: true })
}