import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// GET /api/admin/members?filter=all|free|paying|creator|pro|agency&search=email&page=0

async function getAdminDb(cookieStore) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { get(n) { return cookieStore.get(n)?.value }, set() {}, remove() {} } }
  )
  const { data: { user }, error } = await supabase.auth.getUser()
  if (!user || error) return null
  const db = createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  const { data: row } = await db.from('app_users').select('is_admin').eq('id', user.id).single()
  if (!row?.is_admin) return null
  return db
}

export async function GET(req) {
  try {
    const cookieStore = await cookies()
    const db = await getAdminDb(cookieStore)
    if (!db) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { searchParams } = new URL(req.url)
    const filter = searchParams.get('filter') || 'all'
    const page   = parseInt(searchParams.get('page') || '0', 10)
    const limit  = 50
    const offset = page * limit

    // Build query
    let query = db.from('app_users')
      .select('id, subscription_tier, subscription_status, music_addon, created_at, referred_by_affiliate_id, referred_by_code', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (filter === 'free')    query = query.neq('subscription_status', 'active')
    if (filter === 'paying')  query = query.eq('subscription_status', 'active')
    if (['creator', 'studio_pro', 'pro', 'agency'].includes(filter)) {
      query = query.eq('subscription_tier', filter).eq('subscription_status', 'active')
    }

    const { data: members, count, error: qErr } = await query
    if (qErr) throw qErr

    // Get emails from auth
    const withEmails = await Promise.all(
      (members || []).map(async (m) => {
        const { data: authUser } = await db.auth.admin.getUserById(m.id)
        return { ...m, email: authUser?.user?.email || '—' }
      })
    )

    // Get affiliate names for referred members
    const affIds = [...new Set(withEmails.map(m => m.referred_by_affiliate_id).filter(Boolean))]
    let affMap = {}
    if (affIds.length > 0) {
      const { data: affs } = await db.from('affiliates').select('id, full_name, affiliate_code').in('id', affIds)
      ;(affs || []).forEach(a => { affMap[a.id] = a })
    }

    const enriched = withEmails.map(m => ({
      ...m,
      referred_by_name: m.referred_by_affiliate_id ? (affMap[m.referred_by_affiliate_id]?.full_name || m.referred_by_code || null) : null,
    }))

    // Summary breakdown
    const { data: allSubs } = await db.from('app_users').select('subscription_tier, subscription_status')
    const breakdown = { free: 0, creator: 0, studio_pro: 0, pro: 0, agency: 0 }
    ;(allSubs || []).forEach(s => {
      if (s.subscription_status === 'active' && breakdown[s.subscription_tier] !== undefined) {
        breakdown[s.subscription_tier]++
      } else if (s.subscription_status !== 'active') {
        breakdown.free++
      }
    })

    return NextResponse.json({ status: 'success', members: enriched, total: count || 0, page, breakdown })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
