import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { sendSubscriptionEmail } from '../../../lib/email.js'

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
        const status = sub.status

        if (!userId) {
          // Try lookup by customer ID
          const user = await getUserByCustomer(sub.customer)
          if (user) {
            await setSubscription(user.id, tier, status, sub.id, sub.current_period_end)
          }
          break
        }

        await setSubscription(userId, tier, status, sub.id, sub.current_period_end)

        // Send subscription confirmation email on new active subscription
        if (status === 'active' && event.type === 'customer.subscription.created') {
          try {
            const { data: authUser } = await stripe.customers.retrieve(sub.customer)
            const email = authUser?.email
            if (email) {
              const TIER_LABELS = { creator: 'Creator', studio_pro: 'Studio Pro', pro: 'Pro', agency: 'Agency', music_addon: 'Music Add-on' }
              sendSubscriptionEmail(email, tier, TIER_LABELS[tier] || tier).catch(() => {})
            }
          } catch {}
        }

        // Handle music addon separately
        if (tier === 'music_addon') {
          await supabase.from('app_users').update({ music_addon: status === 'active' }).eq('id', userId)
        }

        // Link referral affiliate if refCode provided
        const refCode = sub.metadata?.refCode
        if (userId && refCode && status === 'active') {
          const { data: aff } = await supabase
            .from('affiliates')
            .select('id')
            .eq('affiliate_code', refCode)
            .eq('status', 'approved')
            .single()

          if (aff) {
            const { data: uRow } = await supabase.from('app_users').select('referred_by_affiliate_id').eq('id', userId).single()
            if (!uRow?.referred_by_affiliate_id) {
              await supabase.from('app_users').update({
                referred_by_code:         refCode,
                referred_by_affiliate_id: aff.id,
              }).eq('id', userId)
            }
          }
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

      // ── Invoice paid — reset monthly usage + calculate commission ─
      case 'invoice.paid': {
        const invoice = event.data.object
        if (invoice.subscription) {
          const sub    = await stripe.subscriptions.retrieve(invoice.subscription)
          const userId = sub.metadata?.userId
          const resolvedUserId = userId || (await getUserByCustomer(sub.customer))?.id

          if (resolvedUserId) {
            await resetUsage(resolvedUserId)
            await supabase.from('app_users').update({
              subscription_status:     'active',
              subscription_period_end: new Date(sub.current_period_end * 1000).toISOString(),
            }).eq('id', resolvedUserId)

            // ── Affiliate commission ──────────────────────────────
            const { data: userRow } = await supabase
              .from('app_users')
              .select('referred_by_affiliate_id')
              .eq('id', resolvedUserId)
              .single()

            if (userRow?.referred_by_affiliate_id) {
              const { data: affiliate } = await supabase
                .from('affiliates')
                .select('id, commission_percent, total_earned, total_active')
                .eq('id', userRow.referred_by_affiliate_id)
                .single()

              if (affiliate) {
                const amountCharged  = (invoice.amount_paid || 0) / 100
                const commissionAmt  = (amountCharged * ((affiliate.commission_percent || 30) / 100))

                // Avoid duplicate commission for same invoice
                const { data: existing } = await supabase
                  .from('affiliate_commissions')
                  .select('id')
                  .eq('stripe_invoice_id', invoice.id)
                  .single()

                if (!existing) {
                  await supabase.from('affiliate_commissions').insert({
                    affiliate_id:      affiliate.id,
                    referred_user_id:  resolvedUserId,
                    stripe_invoice_id: invoice.id,
                    amount_charged:    amountCharged,
                    commission_rate:   affiliate.commission_percent || 30,
                    commission_amount: commissionAmt,
                    status:            'approved',
                    period_start:      new Date(sub.current_period_start * 1000).toISOString(),
                    period_end:        new Date(sub.current_period_end * 1000).toISOString(),
                  })

                  // Update affiliate totals
                  await supabase.from('affiliates').update({
                    total_earned: (Number(affiliate.total_earned) + commissionAmt).toFixed(2),
                  }).eq('id', affiliate.id)

                  // Auto-upgrade commission tier
                  const { count: activeCount } = await supabase
                    .from('affiliate_commissions')
                    .select('referred_user_id', { count: 'exact', head: true })
                    .eq('affiliate_id', affiliate.id)
                    .eq('status', 'approved')

                  const newTier = activeCount >= 50 ? 'elite_partner'
                    : activeCount >= 10 ? 'pro_partner'
                    : 'partner'

                  const newRate = newTier === 'elite_partner' ? 40
                    : newTier === 'pro_partner' ? 35
                    : 30

                  await supabase.from('affiliates').update({
                    tier:            newTier,
                    commission_rate: newRate,
                    total_active:    activeCount || 0,
                  }).eq('id', affiliate.id)
                }
              }
            }
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

      // ── Refund — reverse affiliate commission and credits ─────
      case 'charge.refunded': {
        const charge = event.data.object
        // Only act on full refunds (amount_refunded === amount)
        if (charge.amount_refunded < charge.amount) break

        const customerId = charge.customer
        if (!customerId) break

        const user = await getUserByCustomer(customerId)
        if (!user) break

        // Void any affiliate commission tied to the invoice for this charge
        const invoiceId = charge.invoice
        if (invoiceId) {
          await supabase
            .from('affiliate_commissions')
            .update({ status: 'refunded' })
            .eq('stripe_invoice_id', invoiceId)
        }

        // If this was a legacy credit purchase, reverse the credits
        const creditsAdded = Number(charge.metadata?.credits || 0)
        if (creditsAdded > 0) {
          const current = await supabase
            .from('app_users')
            .select('credits')
            .eq('id', user.id)
            .single()
          const newCredits = Math.max(0, (current.data?.credits || 0) - creditsAdded)
          await supabase.from('app_users').update({ credits: newCredits }).eq('id', user.id)
        }
        break
      }

      // ── Dispute — flag account, void commission ────────────────
      case 'charge.dispute.created': {
        const dispute = event.data.object
        const customerId = dispute.customer || dispute.charge

        // Retrieve the customer to find the user
        let resolvedUserId = null
        if (dispute.customer) {
          const user = await getUserByCustomer(dispute.customer)
          resolvedUserId = user?.id
        }

        if (resolvedUserId) {
          // Flag the account for manual review
          await supabase
            .from('app_users')
            .update({ dispute_flag: true })
            .eq('id', resolvedUserId)
        }

        // Void the commission for the disputed invoice
        const chargeObj = await stripe.charges.retrieve(dispute.charge)
        if (chargeObj?.invoice) {
          await supabase
            .from('affiliate_commissions')
            .update({ status: 'disputed' })
            .eq('stripe_invoice_id', chargeObj.invoice)
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
