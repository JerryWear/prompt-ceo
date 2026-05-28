import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { sequenceDay } from '../../life-engine/lifeSequencer.js'
import { WORLDS, DAY_TYPES } from '../../../lib/life-engine/worldDayAdapters.js'

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

function tryJSON(text, fallback = null) {
  try {
    const stripped = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim()
    const match = stripped.match(/\{[\s\S]*\}/)
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
    const {
      worldId        = 'luxury_penthouse',
      // legacy alias
      world          = null,
      dayType        = 'creator_day',
      style          = 'cinematic',
      platform       = 'instagram',
      creatorProfile = null,
      brandProfile   = null,
      projectId      = null,
    } = body

    const resolvedWorldId = worldId || world || 'luxury_penthouse'
    const worldData   = WORLDS[resolvedWorldId]   || WORLDS.luxury_penthouse
    const dayTypeData = DAY_TYPES[dayType]         || DAY_TYPES.creator_day

    // Life Engine builds the complete scene skeleton
    const engineScenes = sequenceDay({
      worldId:  resolvedWorldId,
      dayType,
      style,
      platform,
      creatorProfile,
      brandProfile,
      mode: 'life',
    })

    const sceneList = engineScenes.map((s, i) => (
      `Scene ${String(i + 1).padStart(2, '0')} | ${s.time} | ${s.label}\n` +
      `  Action:   ${s.action}\n` +
      `  Emotion:  ${s.emotion}\n` +
      `  Light:    ${s.lightPhase}\n` +
      `  Wardrobe: ${s.wardrobe}\n` +
      `  Camera:   ${s.camera} — ${s.lens}`
    )).join('\n\n')

    const systemPrompt = `You are a world-class cinematic director. Respond ONLY with raw valid JSON — no markdown, no explanation.

World: ${worldData.name} — ${worldData.env} — ${worldData.light}
Day type: ${dayTypeData.label}
Style: ${style.replace(/_/g, ' ')} | Platform: ${platform}

PRE-STRUCTURED SCENES (all ${engineScenes.length} must appear in output):
${sceneList}

Return JSON with EXACTLY ${engineScenes.length} scenes — one per pre-structured scene above. Be concise per field (1 sentence max each).

{
  "productionTitle": "short cinematic title",
  "directorStatement": "1-sentence vision",
  "lightingArc": "1-sentence lighting progression",
  "wardrobeArc": "1-sentence wardrobe evolution",
  "scenes": [
    {
      "id": "scene_01",
      "time": "06:30",
      "title": "scene title",
      "setting": "location (1 phrase)",
      "action": "what subject does (1 sentence)",
      "cameraMove": "camera move (1 phrase)",
      "lensType": "lens (1 phrase)",
      "lightingNote": "lighting (1 phrase)",
      "wardrobe": "outfit (1 phrase)",
      "emotion": "emotion (2-3 words)",
      "hook": "social hook line",
      "caption": "platform caption with CTA",
      "clipLength": "e.g. 8 seconds",
      "videoPrompt": "AI video prompt (2 sentences)",
      "imagePrompt": "AI image prompt (2 sentences)",
      "shortFormClip": "viral cut description (1 sentence)"
    }
  ],
  "postingStrategy": {
    "fullCut": "full edit description",
    "shortFormCuts": "short clips description",
    "reelOrder": "posting order"
  }
}`

    const res = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${xaiApiKey}` },
      body: JSON.stringify({
        model:       'grok-3-fast',
        max_tokens:  16000,
        temperature: 0.75,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user',   content: `Direct all ${engineScenes.length} scenes for ${dayTypeData.label} in ${worldData.name}. Output every scene. Do not stop early.` },
        ],
      }),
    })

    const data = await res.json()
    const raw  = data?.choices?.[0]?.message?.content?.trim() || ''
    const result = tryJSON(raw)

    if (!result) return NextResponse.json({ error: 'Failed to parse video day result' }, { status: 500 })

    // Merge engine scene data (hooks, captions, image/video prompts) as fallbacks
    if (Array.isArray(result.scenes)) {
      result.scenes = result.scenes.map((scene, i) => {
        const eng = engineScenes[i] || {}
        return {
          ...scene,
          hook:        scene.hook        || eng.hook,
          caption:     scene.caption     || eng.caption,
          imagePrompt: scene.imagePrompt || eng.imagePrompt,
          videoPrompt: scene.videoPrompt || eng.videoPrompt,
          cta:         eng.cta || null,
          camera:      scene.cameraMove  || eng.camera,
          lens:        scene.lensType    || eng.lens,
        }
      })
    }

    result.worldId       = resolvedWorldId
    result.worldName     = worldData.name
    result.dayType       = dayType
    result.dayTypeLabel  = dayTypeData.label
    result.style         = style
    result.platform      = platform
    result.engineScenes  = engineScenes

    try {
      await admin.from('generation_logs').insert({
        user_id:    user.id,
        project_id: projectId || null,
        type:       'full_day_video',
        input:      { worldId: resolvedWorldId, dayType, style, platform },
        output:     { productionTitle: result.productionTitle, sceneCount: result.scenes?.length },
      })
    } catch {}

    return NextResponse.json(result)
  } catch (err) {
    console.error('full-day-generate error:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
