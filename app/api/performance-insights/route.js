import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

function adminClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

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

function avg(arr) {
  if (!arr.length) return null
  return parseFloat((arr.reduce((s, v) => s + v, 0) / arr.length).toFixed(2))
}

function topByAvgCTR(groups) {
  return Object.entries(groups)
    .map(([key, logs]) => {
      const withCTR = logs.filter(l => l.ctr != null).map(l => l.ctr)
      return { key, count: logs.length, avgCTR: avg(withCTR), dataPoints: withCTR.length }
    })
    .filter(g => g.dataPoints >= 2)
    .sort((a, b) => (b.avgCTR || 0) - (a.avgCTR || 0))
}

// GET — return insights derived from the user's performance_logs
export async function GET() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: logs, error } = await adminClient()
      .from('performance_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(200)

    if (error) throw error

    const all = logs || []
    const total = all.length
    const MIN_DATA_POINTS = 5

    if (total < MIN_DATA_POINTS) {
      return NextResponse.json({
        ready: false,
        dataPoints: total,
        needed: MIN_DATA_POINTS,
        message: `Add ${MIN_DATA_POINTS - total} more performance data points to unlock insights.`,
      })
    }

    // Group by hook_type
    const byHookType = {}
    all.forEach(l => {
      const k = l.hook_type || 'unknown'
      if (!byHookType[k]) byHookType[k] = []
      byHookType[k].push(l)
    })

    // Group by platform
    const byPlatform = {}
    all.forEach(l => {
      const k = l.platform || 'unknown'
      if (!byPlatform[k]) byPlatform[k] = []
      byPlatform[k].push(l)
    })

    // Group by world_id
    const byWorld = {}
    all.forEach(l => {
      if (!l.world_id) return
      if (!byWorld[l.world_id]) byWorld[l.world_id] = []
      byWorld[l.world_id].push(l)
    })

    // Group by asset_type
    const byAssetType = {}
    all.forEach(l => {
      const k = l.asset_type || 'unknown'
      if (!byAssetType[k]) byAssetType[k] = []
      byAssetType[k].push(l)
    })

    const hookInsights     = topByAvgCTR(byHookType)
    const platformInsights = topByAvgCTR(byPlatform)
    const worldInsights    = topByAvgCTR(byWorld)
    const assetInsights    = topByAvgCTR(byAssetType)

    const bestHookType = hookInsights[0] || null
    const bestPlatform = platformInsights[0] || null
    const bestWorld    = worldInsights[0] || null

    // Overall CTR
    const allCTR = all.filter(l => l.ctr != null).map(l => l.ctr)
    const overallAvgCTR = avg(allCTR)

    // Top 5 performers
    const topPerformers = [...all]
      .filter(l => l.ctr != null)
      .sort((a, b) => b.ctr - a.ctr)
      .slice(0, 5)

    // Liked content
    const liked = all.filter(l => l.liked)

    // Prompt bias string — injected into generation prompts
    const biasParts = []
    if (bestHookType) biasParts.push(`Bias toward ${bestHookType.key} hook style (user's best avg CTR: ${bestHookType.avgCTR}%)`)
    if (bestPlatform) biasParts.push(`Optimise for ${bestPlatform.key} (user's best platform)`)
    if (bestWorld)    biasParts.push(`Favour ${bestWorld.key} visual world (highest engagement)`)
    const promptBias = biasParts.join('. ')

    return NextResponse.json({
      ready: true,
      dataPoints: total,
      overallAvgCTR,
      insights: {
        hookTypes:    hookInsights,
        platforms:    platformInsights,
        worlds:       worldInsights,
        assetTypes:   assetInsights,
      },
      topPerformers,
      liked,
      bestHookType,
      bestPlatform,
      bestWorld,
      promptBias,
    })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// POST — quick "thumbs up/down" on any asset
export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { contentText, contentType, assetType, assetId, worldId, platform, hookType, ctr, convRate, liked } = await req.json()
    if (!contentText?.trim()) return NextResponse.json({ error: 'contentText required' }, { status: 400 })

    const { data, error } = await adminClient()
      .from('performance_logs')
      .insert({
        user_id:      user.id,
        content_type: contentType || assetType || 'hook',
        content_text: contentText.trim(),
        asset_type:   assetType  || null,
        asset_id:     assetId    || null,
        world_id:     worldId    || null,
        platform:     platform   || 'instagram',
        hook_type:    hookType   || null,
        ctr:          ctr        != null ? parseFloat(ctr)      : null,
        conv_rate:    convRate   != null ? parseFloat(convRate) : null,
        liked:        liked      ?? false,
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ status: 'success', log: data })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
