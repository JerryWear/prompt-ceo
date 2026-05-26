import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { get: (n) => cookieStore.get(n)?.value, set() {}, remove() {} } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

function admin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

export async function GET() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const db = admin()

    const [
      { count: totalGenerations },
      { data: worldMem },
      { data: campMem },
      { data: perfLogs },
      { data: brandProfiles },
      { data: creatorProfiles },
    ] = await Promise.all([
      db.from('generation_logs').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
      db.from('world_memory').select('*').eq('user_id', user.id).order('use_count', { ascending: false }).limit(10),
      db.from('campaign_memory').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(30),
      db.from('performance_logs').select('hook_type, platform, liked, ctr').eq('user_id', user.id).limit(200),
      db.from('brand_profiles').select('id, name').eq('user_id', user.id),
      db.from('creator_profiles').select('id, name').eq('user_id', user.id),
    ])

    // Top world
    const topWorld = (worldMem || [])[0] || null

    // Top hook type from performance_logs (liked = true bias)
    const hookCount = {}
    ;(perfLogs || []).forEach(l => {
      if (!l.hook_type) return
      const weight = l.liked ? 2 : 1
      hookCount[l.hook_type] = (hookCount[l.hook_type] || 0) + weight
    })
    const topHookType = Object.entries(hookCount).sort((a, b) => b[1] - a[1])[0]?.[0] || null

    // Top platform from performance_logs
    const platCount = {}
    ;(perfLogs || []).forEach(l => {
      if (!l.platform) return
      platCount[l.platform] = (platCount[l.platform] || 0) + 1
    })
    const topPlatform = Object.entries(platCount).sort((a, b) => b[1] - a[1])[0]?.[0] || null

    // Top style from campaign_memory
    const styleCount = {}
    ;(campMem || []).forEach(c => {
      const style = c.successful_patterns?.style
      if (style) styleCount[style] = (styleCount[style] || 0) + 1
    })
    const topStyle = Object.entries(styleCount).sort((a, b) => b[1] - a[1])[0]?.[0] || null

    // Top goal from campaign_memory
    const goalCount = {}
    ;(campMem || []).forEach(c => {
      const goal = c.successful_patterns?.goal
      if (goal) goalCount[goal] = (goalCount[goal] || 0) + 1
    })
    const topGoal = Object.entries(goalCount).sort((a, b) => b[1] - a[1])[0]?.[0] || null

    // Total campaigns
    const totalCampaigns = (campMem || []).length

    // Recent campaigns (last 3)
    const recentCampaigns = (campMem || []).slice(0, 3).map(c => ({
      style:    c.successful_patterns?.style?.replace(/_/g, ' ') || '—',
      goal:     c.successful_patterns?.goal?.replace(/_/g, ' ')  || '—',
      platform: (c.top_platforms || [])[0] || '—',
      hookType: (c.top_hook_types || [])[0] || '—',
      createdAt: c.created_at,
    }))

    // World usage (top 5)
    const worldsUsed = (worldMem || []).slice(0, 5).map(w => ({
      worldId:  w.world_id,
      name:     w.world_name || w.world_id,
      useCount: w.use_count,
      likeCount: w.like_count || 0,
    }))

    return NextResponse.json({
      totalGenerations: totalGenerations || 0,
      totalCampaigns,
      topWorld:         topWorld ? { worldId: topWorld.world_id, name: topWorld.world_name || topWorld.world_id, useCount: topWorld.use_count } : null,
      topHookType,
      topPlatform,
      topStyle:         topStyle?.replace(/_/g, ' ') || null,
      topGoal:          topGoal?.replace(/_/g, ' ') || null,
      recentCampaigns,
      worldsUsed,
      brandProfiles:    (brandProfiles || []).length,
      creatorProfiles:  (creatorProfiles || []).length,
      perfDataPoints:   (perfLogs || []).length,
    })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
