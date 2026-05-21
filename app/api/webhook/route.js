import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function getUserByCustomer(customerId) {
  const { data } = await supabase
    .from('app_users')
    .select('id, credits, subscription_tier')
    .eq('stripe_customer_id', customerId)
    .single()
  return data
}

async function setSubscription(userId, tier, status, subscriptionId, periodEnd) {
  await supabase.from('app_users').update({
    subscription_tier:       tier,
    subscription_status:     status,
    stripe_subscription_id:  subscriptionId,
    subscription_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
  }).eq('id', userId)
}

async function resetUsage(userId) {
  await supabase.from('app_users').update({
    images_used_this_period:          0,
    music_licenses_used_this_period:  0,
  }).eq('id', userId)
}

export async function POST(req) {
  const body = await req.text()
  const sig  = req.headers.get('stripe-signature')

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature error:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {

      // ── Subscription created or updated ───────────────────────
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const sub    = event.data.object
        const userId = sub.metadata?.userId
        const tier   = sub.metadata?.tier || 'creator'
        const status = sub.status // 'active' | 'trialing' | 'past_due' | 'canceled' etc.

        if (!userId) {
          // Try lookup by customer ID
          const user = await getUserByCustomer(sub.customer)
          if (user) {
            await setSubscription(user.id, tier, status, sub.id, sub.current_period_end)
          }
          break
        }

        await setSubscription(userId, tier, status, sub.id, sub.current_period_end)

        // Handle music addon separately
        if (tier === 'music_addon') {
          await supabase.from('app_users').update({ music_addon: status === 'active' }).eq('id', userId)
        }
        break
      }

      // ── Subscription canceled ─────────────────────────────────
      case 'customer.subscription.deleted': {
        const sub    = event.data.object
        const userId = sub.metadata?.userId

        if (userId) {
          await supabase.from('app_users').update({
            subscription_tier:       'free',
            subscription_status:     'inactive',
            stripe_subscription_id:  null,
            subscription_period_end: null,
            music_addon:             false,
          }).eq('id', userId)
        } else {
          const user = await getUserByCustomer(sub.customer)
          if (user) {
            await supabase.from('app_users').update({
              subscription_tier:       'free',
              subscription_status:     'inactive',
              stripe_subscription_id:  null,
              subscription_period_end: null,
              music_addon:             false,
            }).eq('id', user.id)
          }
        }
        break
      }

      // ── Invoice paid — reset monthly usage ────────────────────
      case 'invoice.paid': {
        const invoice = event.data.object
        // Only reset on subscription invoices (not one-off)
        if (invoice.subscription) {
          const sub    = await stripe.subscriptions.retrieve(invoice.subscription)
          const userId = sub.metadata?.userId
          if (userId) {
            await resetUsage(userId)
            // Also update period end
            await supabase.from('app_users').update({
              subscription_status:     'active',
              subscription_period_end: new Date(sub.current_period_end * 1000).toISOString(),
            }).eq('id', userId)
          } else {
            const user = await getUserByCustomer(sub.customer)
            if (user) await resetUsage(user.id)
          }
        }
        break
      }

      // ── Payment failed ────────────────────────────────────────
      case 'invoice.payment_failed': {
        const invoice = event.data.object
        if (invoice.subscription) {
          const sub    = await stripe.subscriptions.retrieve(invoice.subscription)
          const userId = sub.metadata?.userId
          if (userId) {
            await supabase.from('app_users').update({ subscription_status: 'past_due' }).eq('id', userId)
          }
        }
        break
      }

      // ── Legacy: one-time credit purchase ─────────────────────
      case 'checkout.session.completed': {
        const session = event.data.object
        // Only handle if it's a legacy credit purchase (not a subscription)
        if (session.mode === 'payment') {
          const userId       = session.metadata?.userId
          const creditsToAdd = Number(session.metadata?.credits || 0)
          if (userId && creditsToAdd > 0) {
            const { data: existing } = await supabase.from('app_users').select('credits').eq('id', userId).single()
            const newCredits = (existing?.credits || 0) + creditsToAdd
            await supabase.from('app_users').upsert({ id: userId, credits: newCredits, plan: 'trial', daily_limit: 20 })
            console.log(`Added ${creditsToAdd} legacy credits to ${userId}`)
          }
        }
        break
      }

      default:
        break
    }
  } catch (err) {
    console.error('Webhook handler error:', err)
  }

  return NextResponse.json({ received: true })
}
