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

    const systemPrompt = `You are a world-class cinematic video director and production designer. You create full-day video production plans that feel like premium editorial films.

World: ${worldData.name} — ${worldData.env}
Lighting signature: ${worldData.light}
Vibe: ${worldData.vibe}
Day type: ${dayTypeData.label} — ${dayTypeData.description}
Visual style: ${style.replace(/_/g, ' ')}
Platform: ${platform}

The Life Engine has pre-structured the day into ${engineScenes.length} scenes. Your job is to direct each one cinematically.

PRE-STRUCTURED SCENES:
${sceneList}

For each scene, add cinematic direction: exact camera move, dialogue hint, transition, clip length, video prompt, short-form clip cut, and caption hook. Keep the structure the Life Engine gave you — enhance it with director-level detail.

Respond ONLY with raw valid JSON:
{
  "productionTitle": "short cinematic title",
  "directorStatement": "2-sentence vision for this day",
  "lightingArc": "how lighting progresses morning to night",
  "wardrobeArc": "how wardrobe evolves across the day",
  "scenes": [
    {
      "id": "scene_01",
      "time": "06:30",
      "title": "scene title",
      "setting": "exact location within the world",
      "action": "what the subject is doing — specific and visual",
      "cameraMove": "exact camera movement",
      "lensType": "lens choice and reason",
      "lightingNote": "specific lighting for this scene",
      "wardrobe": "exact outfit",
      "emotion": "dominant emotion and energy",
      "hook": "social hook line for this scene",
      "caption": "full caption for this scene",
      "dialogueHint": "spoken line or sound, or null",
      "transitionTo": "transition to next scene",
      "clipLength": "e.g. 8-12 seconds",
      "videoPrompt": "full AI video generation prompt, 3-5 sentences",
      "imagePrompt": "full AI image generation prompt, 2-3 sentences",
      "shortFormClip": "how to cut this into a 3-5 second viral clip",
      "captionLine": "one hook-style caption line"
    }
  ],
  "postingStrategy": {
    "fullCut": "description of the full-day edit",
    "highlights": ["scene_01", "scene_05"],
    "shortFormCuts": "description of viral short clips",
    "reelOrder": "recommended posting order"
  }
}`

    const res = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${xaiApiKey}` },
      body: JSON.stringify({
        model:       'grok-3-fast',
        max_tokens:  6000,
        temperature: 0.75,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user',   content: `Direct the full ${dayTypeData.label} in ${worldData.name}. Every scene must feel cinematic. Lighting must progress naturally. Wardrobe must evolve. Emotion must build.` },
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
