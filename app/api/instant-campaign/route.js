import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { orchestrate } from '../../instant/orchestration.js'
import { sequenceDay } from '../../life-engine/lifeSequencer.js'

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

function adminClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

async function ask(apiKey, prompt, maxTokens = 2000) {
  const res = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'grok-3-fast',
      max_tokens: maxTokens,
      messages: [
        {
          role: 'system',
          content: 'You are a world-class advertising strategist and direct-response copywriter. Respond with ONLY raw valid JSON — no markdown, no code fences, no explanation. Your entire response must start with [ or { and end with ] or }.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.85,
    }),
  })
  const data = await res.json()
  return data?.choices?.[0]?.message?.content?.trim() || '[]'
}

function tryJSON(text, fallback = []) {
  try {
    const stripped = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim()
    const match = stripped.match(/[\[{][\s\S]*[\]}]/)
    return match ? JSON.parse(match[0]) : fallback
  } catch { return fallback }
}

export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const xaiApiKey = String(process.env.XAI_API_KEY || '')
      .replace(/^Bearer\s+/i, '').replace(/^"+|"+$/g, '').trim()
    if (!xaiApiKey) return NextResponse.json({ error: 'Missing XAI_API_KEY' }, { status: 500 })

    const admin = adminClient()
    const { data: userRow } = await admin
      .from('app_users')
      .select('subscription_status, subscription_tier')
      .eq('id', user.id)
      .single()
    const { canGenerateText } = await import('../../../lib/subscription.js')
    if (!canGenerateText(userRow)) {
      return NextResponse.json({ error: 'Subscription required', upgradeRequired: true }, { status: 402 })
    }

    const body = await req.json()
    const { type, goal, style, productName, brandProfile = null } = body
    if (!productName?.trim()) return NextResponse.json({ error: 'productName is required' }, { status: 400 })
    if (!type || !goal || !style) return NextResponse.json({ error: 'type, goal, and style are required' }, { status: 400 })

    const orch = orchestrate(type, goal, style, productName.trim())

    // Life Engine builds the world-specific scene skeleton
    const engineScenes = sequenceDay({
      worldId:  orch.lifeEngineWorldId,
      dayType:  orch.lifeEngineDayType,
      style,
      platform: orch.platform,
      creatorProfile: body.creatorProfile || null,
      brandProfile:   brandProfile || null,
      mode:    orch.lifeEngineDayType === 'ad_campaign_day' ? 'campaign' : 'life',
      product: productName.trim(),
    })

    // Engine image + video prompts (identity-aware, world-specific)
    const engineImagePrompts = engineScenes.map(s => s.imagePrompt)
    const engineVideoPrompts = engineScenes.map(s => s.videoPrompt)
    const engineHooks        = engineScenes.map(s => s.hook)

    let ctx = orch.context
    if (brandProfile) {
      const brandLines = []
      if (brandProfile.name)            brandLines.push(`Brand Name: ${brandProfile.name}`)
      if (brandProfile.voice)           brandLines.push(`Brand Voice: ${brandProfile.voice}`)
      if (brandProfile.target_audience) brandLines.push(`Target Audience: ${brandProfile.target_audience}`)
      if (brandProfile.style)           brandLines.push(`Brand Style: ${brandProfile.style}`)
      if (brandLines.length) ctx += '\n' + brandLines.join('\n')
    }

    // Step 1 — parallel: hooks + angles (image prompts come from Life Engine)
    const [hooksRaw, anglesRaw] = await Promise.all([
      ask(xaiApiKey,
        `Generate 10 scroll-stopping ${orch.hookType} hooks for:\n${ctx}\n\nMake them powerful, specific, and platform-optimized for ${orch.platform}. Under 20 words each.\n\nReturn a JSON array of 10 strings.`),
      ask(xaiApiKey,
        `Generate 5 distinct marketing angles for:\n${ctx}\n\nEach angle is one compelling sentence describing a unique positioning strategy.\n\nReturn a JSON array of 5 strings.`),
    ])

    const hooks  = tryJSON(hooksRaw,  [])
    const angles = tryJSON(anglesRaw, [])
    // Life Engine provides world-specific, identity-aware prompts; supplement with AI
    const imagePrompts = [...engineImagePrompts, ...engineVideoPrompts.slice(0, 1)]

    // Step 2 — captions using top hook + angle context
    const captionsRaw = await ask(xaiApiKey,
      `Generate 10 captions for ${orch.platform} for:\n${ctx}\n\nBest hook: ${hooks[0] || ''}\nBest angle: ${angles[0] || ''}\n\nVary length and tone. Include a CTA in each. Optimized for ${orch.platform}.\n\nReturn a JSON array of 10 strings.`,
      3000)
    const captions = tryJSON(captionsRaw, [])

    // Step 3 — 30-day schedule
    const scheduleRaw = await ask(xaiApiKey,
      `Create a 30-day ${orch.platform} posting schedule for:\n${ctx}\n\nReturn a JSON array of 30 objects: [{"day":1,"time":"09:00","content_type":"image","theme":"brief theme"},...]\n\nOptimize posting times for ${orch.platform} engagement.`,
      2000)
    const schedule = tryJSON(scheduleRaw, [])

    // Step 4 — auto-save as project
    let projectId = null
    try {
      const { data: project } = await admin.from('projects').insert({
        user_id: user.id,
        name: `${productName} — ${style.replace(/_/g, ' ')} ${goal.replace(/_/g, ' ')}`,
        type: 'campaign',
      }).select().single()
      projectId = project?.id || null
    } catch {}

    try {
      await admin.from('generation_logs').insert({
        user_id:    user.id,
        project_id: projectId,
        type:       'instant_campaign',
        input:      { type, goal, style, productName },
        output:     { hooks, angles, imagePrompts, captions, schedule },
      })
    } catch {}

    // Step 5 — write campaign_memory (Build 5)
    try {
      await admin.from('campaign_memory').insert({
        user_id:              user.id,
        project_id:           projectId,
        top_hook_types:       [orch.hookType].filter(Boolean),
        top_platforms:        [orch.platform].filter(Boolean),
        top_angles:           angles.slice(0, 3),
        successful_patterns:  { style, goal, type, topHooks: hooks.slice(0, 3), world: orch.suggestedWorld },
      })
    } catch {}

    // Step 6 — track world memory (Build 5)
    try {
      if (orch.suggestedWorld) {
        const existing = await admin.from('world_memory').select('id, use_count').eq('user_id', user.id).eq('world_id', orch.suggestedWorld).single()
        if (existing.data) {
          await admin.from('world_memory').update({ use_count: existing.data.use_count + 1, last_used_at: new Date().toISOString() }).eq('id', existing.data.id)
        } else {
          await admin.from('world_memory').insert({ user_id: user.id, world_id: orch.suggestedWorld, world_name: orch.suggestedWorld.replace(/_/g, ' '), use_count: 1, last_used_at: new Date().toISOString() })
        }
      }
    } catch {}

    // Step 7 — update project_brain
    try {
      if (projectId) {
        const { data: currentBrain } = await admin
          .from('project_brain')
          .select('total_generations, fatigue_score, best_hook_types, best_worlds, best_styles, best_platform')
          .eq('project_id', projectId)
          .single()

        const prevTotal   = currentBrain?.total_generations || 0
        const prevFatigue = currentBrain?.fatigue_score || 0
        const newFatigue  = Math.min(100, prevFatigue >= 50 ? prevFatigue - 2 + 8 : prevFatigue + 8)

        const mergeArr = (existing = [], newVal) => {
          if (!newVal) return existing
          return [newVal, ...(existing || []).filter(v => v !== newVal)].slice(0, 5)
        }

        await admin.from('project_brain').upsert({
          project_id:        projectId,
          user_id:           user.id,
          total_generations: prevTotal + 1,
          fatigue_score:     newFatigue,
          best_hook_types:   mergeArr(currentBrain?.best_hook_types, orch.hookType),
          best_worlds:       mergeArr(currentBrain?.best_worlds, orch.suggestedWorld),
          best_styles:       mergeArr(currentBrain?.best_styles, style),
          best_platform:     orch.platform,
          last_updated_at:   new Date().toISOString(),
        }, { onConflict: 'project_id' })
      }
    } catch {}

    return NextResponse.json({
      hooks,
      angles,
      imagePrompts,
      captions,
      schedule,
      projectId,
      // Life Engine data — scene-level prompts with world + identity context
      engine: {
        worldId:    orch.lifeEngineWorldId,
        dayType:    orch.lifeEngineDayType,
        scenes:     engineScenes,
        hooksByScene: engineHooks,
      },
      orchestration: {
        type, goal, style,
        platform:       orch.platform,
        hookType:       orch.hookType,
        suggestedWorld: orch.suggestedWorld,
        lifeEngineWorldId: orch.lifeEngineWorldId,
        summary:        orch.summary,
        adConfig:       orch.adConfig,
      },
    })
  } catch (err) {
    console.error('instant-campaign error:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
