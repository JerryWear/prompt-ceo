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

function groupAvg(logs, keyFn) {
  const map = {}
  logs.forEach(l => {
    const k = keyFn(l)
    if (!k) return
    if (!map[k]) map[k] = []
    if (l.ctr != null) map[k].push(l.ctr)
  })
  return Object.entries(map)
    .map(([key, ctrs]) => ({ key, dataPoints: ctrs.length, avgCTR: avg(ctrs) }))
    .filter(g => g.dataPoints >= 2)
    .sort((a, b) => (b.avgCTR || 0) - (a.avgCTR || 0))
}

export async function GET() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: logs, error } = await adminClient()
      .from('performance_logs')
      .select('hook_type, platform, world_id, asset_type, ctr, liked, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(200)

    if (error) throw error

    const all = logs || []
    const MIN = 5

    if (all.length < MIN) {
      return NextResponse.json({
        ready: false,
        dataPoints: all.length,
        needed: MIN,
        message: `Log ${MIN - all.length} more performance results to unlock Creative Intelligence.`,
      })
    }

    const byHook     = groupAvg(all, l => l.hook_type)
    const byPlatform = groupAvg(all, l => l.platform)
    const byWorld    = groupAvg(all, l => l.world_id)
    const byAsset    = groupAvg(all, l => l.asset_type)
    const likeRate   = all.length ? parseFloat(((all.filter(l => l.liked).length / all.length) * 100).toFixed(1)) : 0

    const summary = {
      totalLogs: all.length,
      likeRate,
      topHooks:     byHook.slice(0, 3),
      worstHooks:   byHook.slice(-2).reverse(),
      topPlatforms: byPlatform.slice(0, 2),
      topWorlds:    byWorld.slice(0, 3),
      topAssets:    byAsset.slice(0, 2),
    }

    const xaiKey = String(process.env.XAI_API_KEY || '').replace(/^Bearer\s+/i, '')
    if (!xaiKey) {
      return NextResponse.json({ ready: false, error: 'AI not configured' }, { status: 500 })
    }

    const systemPrompt = `You are a creative performance analyst. Given aggregated ad performance data, return exactly 5 plain-English insights in JSON. Each insight must be specific, actionable, and reference actual numbers from the data. Be direct — no fluff. CRITICAL: respond ONLY with a JSON array, no markdown.`
    const userPrompt = `Performance data:\n${JSON.stringify(summary, null, 2)}\n\nReturn a JSON array of exactly 5 objects with shape:\n[{"text": "one sentence insight", "confidence": 0.0–1.0, "dimension": "hooks|platforms|worlds|assets|overall"}]`

    const res = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${xaiKey}` },
      body: JSON.stringify({
        model: 'grok-3-fast',
        messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userPrompt }],
        temperature: 0.3,
      }),
    })

    const json = await res.json()
    const raw  = json.choices?.[0]?.message?.content || '[]'

    let insights = []
    try {
      const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim())
      insights = Array.isArray(parsed) ? parsed.slice(0, 5) : []
    } catch {
      insights = []
    }

    if (!insights.length) {
      if (byHook[0])     insights.push({ text: `${byHook[0].key} hooks drive your highest CTR (${byHook[0].avgCTR}%) across ${byHook[0].dataPoints} ads.`, confidence: 0.9, dimension: 'hooks' })
      if (byPlatform[0]) insights.push({ text: `${byPlatform[0].key} is your best-performing platform with ${byPlatform[0].avgCTR}% avg CTR.`, confidence: 0.85, dimension: 'platforms' })
      if (byWorld[0])    insights.push({ text: `${byWorld[0].key} visual world generates your strongest engagement.`, confidence: 0.8, dimension: 'worlds' })
      if (byHook.at(-1) && byHook.length > 1) insights.push({ text: `${byHook.at(-1).key} hooks underperform — consider phasing them out.`, confidence: 0.75, dimension: 'hooks' })
      insights.push({ text: `Your audience likes ${likeRate}% of your content — ${likeRate > 30 ? 'strong resonance' : 'room to improve quality'}.`, confidence: 0.7, dimension: 'overall' })
    }

    const biasParts = []
    if (byHook[0])     biasParts.push(`Bias toward "${byHook[0].key}" hook style (user's top performer: ${byHook[0].avgCTR}% CTR)`)
    if (byPlatform[0]) biasParts.push(`Optimise copy for ${byPlatform[0].key}`)
    if (byWorld[0])    biasParts.push(`Favour "${byWorld[0].key}" visual world (highest engagement)`)
    const promptBias = biasParts.join('. ')

    return NextResponse.json({ ready: true, dataPoints: all.length, insights, promptBias, summary })
  } catch (err) {
    console.error('[performance-reasoning]', err)
    return NextResponse.json({ error: 'Failed to generate performance insights' }, { status: 500 })
  }
}
