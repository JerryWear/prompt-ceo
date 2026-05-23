import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// GET /api/admin/stats
// Returns business overview — admin only

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
    if (!user || authError) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    // Verify admin
    const { data: userRow } = await admin.from('app_users').select('is_admin').eq('id', user.id).single()
    if (!userRow?.is_admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    // Total users
    const { count: totalUsers } = await admin
      .from('app_users')
      .select('*', { count: 'exact', head: true })

    // Active subscribers by tier
    const { data: subscribers } = await admin
      .from('app_users')
      .select('subscription_tier, subscription_status')
      .eq('subscription_status', 'active')

    const tierCounts = { creator: 0, studio_pro: 0, pro: 0, agency: 0 }
    const tierRevenue = { creator: 29, studio_pro: 49, pro: 79, agency: 179 }
    let monthlyRevenue = 0

    ;(subscribers || []).forEach(s => {
      if (tierCounts[s.subscription_tier] !== undefined) {
        tierCounts[s.subscription_tier]++
        monthlyRevenue += tierRevenue[s.subscription_tier] || 0
      }
    })

    const totalActive = Object.values(tierCounts).reduce((a, b) => a + b, 0)

    // Music addon count
    const { count: musicAddonCount } = await admin
      .from('app_users')
      .select('*', { count: 'exact', head: true })
      .eq('music_addon', true)

    monthlyRevenue += (musicAddonCount || 0) * 9

    // Affiliate stats
    const { count: pendingAffiliates } = await admin
      .from('affiliates')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending')

    const { count: activeAffiliates } = await admin
      .from('affiliates')
      .select('*', { count: 'exact', head: true })
      .in('status', ['approved', 'active'])

    const { data: commissionsData } = await admin
      .from('affiliate_commissions')
      .select('commission_amount, status')

    const totalCommissions = (commissionsData || []).reduce((sum, c) => sum + Number(c.commission_amount), 0)
    const paidCommissions  = (commissionsData || []).filter(c => c.status === 'paid').reduce((sum, c) => sum + Number(c.commission_amount), 0)

    // Recent signups — get from auth.users (ordered by created_at)
    const { data: authList } = await admin.auth.admin.listUsers({ page: 1, perPage: 8 })
    const recentAuthUsers = (authList?.users || [])
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 8)

    const recentUserIds = recentAuthUsers.map(u => u.id)
    const { data: recentAppRows } = recentUserIds.length > 0
      ? await admin.from('app_users').select('id, subscription_tier, subscription_status').in('id', recentUserIds)
      : { data: [] }
    const appRowMap = Object.fromEntries((recentAppRows || []).map(r => [r.id, r]))

    const recentWithEmails = recentAuthUsers.map(u => ({
      id: u.id,
      email: u.email || '—',
      created_at: u.created_at,
      subscription_tier:   appRowMap[u.id]?.subscription_tier   || 'free',
      subscription_status: appRowMap[u.id]?.subscription_status || 'inactive',
    }))

    return NextResponse.json({
      status: 'success',
      stats: {
        totalUsers:       totalUsers || 0,
        totalActive,
        monthlyRevenue,
        musicAddonCount:  musicAddonCount || 0,
        tiers:            tierCounts,
        affiliates: {
          pending: pendingAffiliates || 0,
          active:  activeAffiliates  || 0,
          totalCommissions: totalCommissions.toFixed(2),
          paidCommissions:  paidCommissions.toFixed(2),
        },
        recentUsers: recentWithEmails,
      },
    })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
