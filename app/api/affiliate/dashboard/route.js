import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// GET /api/affiliate/dashboard

export async function GET() {
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

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    // Find affiliate by user_id or email
    const { data: affiliate } = await admin
      .from('affiliates')
      .select('*')
      .or(`user_id.eq.${user.id},email.eq.${user.email}`)
      .single()

    if (!affiliate) return NextResponse.json({ status: 'not_found' })

    // Treat 'active' same as 'approved'
    if (affiliate.status === 'active' && !affiliate.approved_at) {
      await admin.from('affiliates').update({ status: 'approved', approved_at: new Date().toISOString() }).eq('id', affiliate.id)
      affiliate.status = 'approved'
    }

    // Link user_id if not already linked
    if (!affiliate.user_id) {
      await admin.from('affiliates').update({ user_id: user.id }).eq('id', affiliate.id)
    }

    // Get recent commissions
    const { data: commissions } = await admin
      .from('affiliate_commissions')
      .select('*')
      .eq('affiliate_id', affiliate.id)
      .order('created_at', { ascending: false })
      .limit(20)

    // Pending payout
    const pending = (commissions || [])
      .filter(c => c.status === 'approved')
      .reduce((sum, c) => sum + Number(c.commission_amount), 0)

    const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://promptceo.io'

    return NextResponse.json({
      status: 'success',
      affiliate: {
        id:              affiliate.id,
        name:            affiliate.full_name,
        email:           affiliate.email,
        referralCode:    affiliate.affiliate_code,
        referralLink:    affiliate.referral_link || `${origin}?ref=${affiliate.affiliate_code}`,
        affiliateStatus: affiliate.status,
        tier:            affiliate.tier || 'partner',
        commissionRate:  affiliate.commission_percent || 30,
        totalClicks:     affiliate.total_clicks || 0,
        totalSignups:    affiliate.total_signups || 0,
        totalActive:     affiliate.total_active || 0,
        totalEarned:     affiliate.total_earned || 0,
        totalPaid:       affiliate.total_paid || 0,
        pendingPayout:   pending.toFixed(2),
      },
      commissions: commissions || [],
    })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
