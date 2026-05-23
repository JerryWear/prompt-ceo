import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { sendAffiliateApprovedEmail, sendAffiliateRejectedEmail } from '../../../../lib/email.js'

// GET  /api/admin/affiliates — list all affiliates
// POST /api/admin/affiliates — approve or reject

async function getAdmin(req) {
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
  const { data: { user }, error } = await supabase.auth.getUser()
  if (!user || error) return null

  const db = createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  const { data: userRow } = await db.from('app_users').select('is_admin').eq('id', user.id).single()
  if (!userRow?.is_admin) return null

  return db
}

export async function GET() {
  try {
    const db = await getAdmin()
    if (!db) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { data: affiliates } = await db
      .from('affiliates')
      .select('id, full_name, email, platform, audience_size, message, affiliate_code, referral_link, status, tier, commission_percent, total_clicks, total_signups, total_active, total_earned, created_at')
      .order('created_at', { ascending: false })

    return NextResponse.json({ status: 'success', affiliates: affiliates || [] })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const db = await getAdmin()
    if (!db) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { id, action, commissionRate } = await req.json()
    if (!id || !action) return NextResponse.json({ error: 'id and action required' }, { status: 400 })

    const { data: affiliate } = await db.from('affiliates').select('*').eq('id', id).single()
    if (!affiliate) return NextResponse.json({ error: 'Affiliate not found' }, { status: 404 })

    const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://promptceo.io'

    if (action === 'approve') {
      const rate = commissionRate || 30
      const link = `${origin}?ref=${affiliate.affiliate_code}`

      await db.from('affiliates').update({
        status:             'approved',
        commission_percent: rate,
        referral_link:      link,
        approved_at:        new Date().toISOString(),
      }).eq('id', id)

      await sendAffiliateApprovedEmail(affiliate.email, affiliate.full_name, link, rate)

      return NextResponse.json({ status: 'success', message: `${affiliate.full_name} approved and email sent` })
    }

    if (action === 'reject') {
      await db.from('affiliates').update({ status: 'rejected' }).eq('id', id)
      await sendAffiliateRejectedEmail(affiliate.email, affiliate.full_name)
      return NextResponse.json({ status: 'success', message: `${affiliate.full_name} rejected` })
    }

    if (action === 'mark_paid') {
      // Move all approved commissions to paid, add to total_paid
      const { data: approved } = await db
        .from('affiliate_commissions')
        .select('id, commission_amount')
        .eq('affiliate_id', id)
        .eq('status', 'approved')

      const paidAmount = (approved || []).reduce((sum, c) => sum + Number(c.commission_amount), 0)

      if (approved?.length > 0) {
        await db.from('affiliate_commissions')
          .update({ status: 'paid', paid_at: new Date().toISOString() })
          .eq('affiliate_id', id)
          .eq('status', 'approved')

        await db.from('affiliates')
          .update({ total_paid: Number(affiliate.total_paid || 0) + paidAmount })
          .eq('id', id)
      }

      return NextResponse.json({ status: 'success', message: `Marked $${paidAmount.toFixed(2)} as paid for ${affiliate.full_name}`, paidAmount })
    }

    if (action === 'set_rate') {
      const rate = Number(commissionRate)
      if (!rate || rate < 1 || rate > 60) return NextResponse.json({ error: 'Invalid rate' }, { status: 400 })
      await db.from('affiliates').update({ commission_percent: rate }).eq('id', id)
      return NextResponse.json({ status: 'success', message: `Commission rate updated to ${rate}%` })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
