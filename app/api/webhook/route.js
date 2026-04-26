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

  // ✅ PAYMENT SUCCESS
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    const userId = session.metadata.userId
    const product = session.metadata.product

    let creditsToAdd = 0

    // 👉 MAP YOUR PRODUCTS HERE
    if (product === '100') creditsToAdd = 100
    if (product === '250') creditsToAdd = 250
    if (product === '600') creditsToAdd = 600

    if (!userId || creditsToAdd === 0) {
      console.error('Missing user or credits mapping')
      return NextResponse.json({ received: true })
    }

    // 👉 GET CURRENT CREDITS
    const { data: user, error: fetchError } = await supabase
      .from('app_users')
      .select('credits')
      .eq('id', userId)
      .single()

    if (fetchError) {
      console.error('Fetch error:', fetchError)
      return NextResponse.json({ received: true })
    }

    const newCredits = (user.credits || 0) + creditsToAdd

    // 👉 UPDATE CREDITS
    const { error: updateError } = await supabase
      .from('app_users')
      .update({ credits: newCredits })
      .eq('id', userId)

    if (updateError) {
      console.error('Update error:', updateError)
    } else {
      console.log(`✅ Added ${creditsToAdd} credits to user ${userId}`)
    }
  }

  return NextResponse.json({ received: true })
}