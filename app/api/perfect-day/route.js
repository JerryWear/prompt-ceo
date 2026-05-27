import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { DAY_MOMENTS, getMomentsByIds, getFullDay } from '../../day-system/moments.js'
import { DAY_WORLDS, getWorldById, getSceneForMoment } from '../../day-system/worlds.js'

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
          content: 'You are a world-class cinematic content director and lifestyle brand strategist. Respond with ONLY raw valid JSON — no markdown, no code fences, no explanation. Your entire response must start with [ or { and end with ] or }.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.85,
    }),
  })
  const data = await res.json()
  return data?.choices?.[0]?.message?.content?.trim() || '{}'
}

function tryJSON(text, fallback = {}) {
  try {
    const stripped = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim()
    const match = stripped.match(/[\[{][\s\S]*[\]}]/)
    return match ? JSON.parse(match[0]) : fallback
  } catch { return fallback }
}

function buildIdentityContext(creatorProfile, brandProfile) {
  const parts = []
  if (creatorProfile?.name) parts.push(`Creator: ${creatorProfile.name}`)
  if (creatorProfile?.creator_type) parts.push(`Type: ${creatorProfile.creator_type}`)
  if (creatorProfile?.style_signature) parts.push(`Style: ${creatorProfile.style_signature}`)
  if (creatorProfile?.physical_traits) {
    const traits = creatorProfile.physical_traits
    const traitStr = Object.entries(traits).filter(([,v]) => v).map(([k,v]) => `${k}: ${v}`).join(', ')
    if (traitStr) parts.push(`Appearance: ${traitStr}`)
  }
  if (brandProfile?.name) parts.push(`Brand: ${brandProfile.name}`)
  if (brandProfile?.voice) parts.push(`Brand Voice: ${brandProfile.voice}`)
  if (brandProfile?.target_audience) parts.push(`Audience: ${brandProfile.target_audience}`)
  return parts.length ? parts.join('\n') : ''
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
    const { canGenerateText } = await import('../../../../lib/subscription.js')
    if (!canGenerateText(userRow)) {
      return NextResponse.json({ error: 'Subscription required', upgradeRequired: true }, { status: 402 })
    }

    const body = await req.json()
    const {
      worldId = 'luxury_penthouse',
      creatorProfile = null,
      brandProfile = null,
      style = 'aspirational_lifestyle',
      platform = 'instagram',
      outputMode = 'both', // 'images' | 'video_scripts' | 'both'
      momentIds = null,    // null = all 12, or array of moment ids
      projectId = null,
    } = body

    const world = getWorldById(worldId) || DAY_WORLDS.luxury_penthouse
    const selectedMomentIds = momentIds || getFullDay()
    const moments = getMomentsByIds(selectedMomentIds)

    if (!moments.length) {
      return NextResponse.json({ error: 'No valid moments selected' }, { status: 400 })
    }

    const identityContext = buildIdentityContext(creatorProfile, brandProfile)
    const worldContext = `World: ${world.name}\nEnvironment: ${world.environment}\nPalette: ${world.palette}\nLighting: ${world.lighting}\nMood: ${world.mood}`
    const styleContext = `Visual Style: ${style.replace(/_/g, ' ')}\nPlatform: ${platform}`

    const baseContext = [identityContext, worldContext, styleContext].filter(Boolean).join('\n\n')

    // Build all moment prompts in parallel
    const momentPromises = moments.map(async (moment) => {
      const sceneSpecific = getSceneForMoment(worldId, moment.id) || moment.sceneBase
      const momentContext = `${baseContext}\n\nMoment: ${moment.time} — ${moment.label}\nScene: ${sceneSpecific}\nMood: ${moment.mood}\nLighting: ${moment.lighting}\nCreator Energy: ${moment.creatorEnergy}`

      const contentPromise = ask(xaiApiKey, `
Generate content for this cinematic lifestyle moment.

${momentContext}

Return a JSON object with these exact keys:
{
  "imagePrompt": "detailed cinematic image generation prompt, 2-3 sentences, specific framing and lighting and mood",
  "videoPrompt": "video direction note, 1-2 sentences, camera movement and atmosphere",
  "hook": "single scroll-stopping hook line, under 12 words, no selling",
  "caption": "platform caption for ${platform}, 3-5 sentences, personal and sensory, ends with soft engagement question or statement",
  "altHook": "alternative hook variation, under 12 words"
}
`, 800)

      return contentPromise.then(raw => {
        const content = tryJSON(raw, {})
        return {
          id: moment.id,
          time: moment.time,
          label: moment.label,
          scene: sceneSpecific,
          mood: moment.mood,
          lighting: moment.lighting,
          creatorEnergy: moment.creatorEnergy,
          contentType: moment.contentType,
          imagePrompt: content.imagePrompt || `Cinematic ${moment.mood} scene. ${sceneSpecific}. ${world.lighting}. ${style.replace(/_/g, ' ')} aesthetic.`,
          videoPrompt: content.videoPrompt || moment.videoInstruction,
          hook: content.hook || moment.defaultHook,
          altHook: content.altHook || '',
          caption: content.caption || '',
          brandLink: moment.brandLink,
        }
      })
    })

    const generatedMoments = await Promise.all(momentPromises)

    // Generate day-level content: title, series hook, posting schedule
    const dayMetaRaw = await ask(xaiApiKey, `
Generate meta content for this Perfect Day campaign.

${baseContext}

The day has ${generatedMoments.length} moments from ${moments[0]?.time || '06:00'} to ${moments[moments.length - 1]?.time || '22:30'}.
Moments: ${generatedMoments.map(m => m.label).join(', ')}

Return a JSON object:
{
  "dayTitle": "cinematic campaign title for this day, evocative not literal, under 8 words",
  "seriesHook": "one-line series description for Stories or Reels, under 15 words",
  "openingNarration": "2-3 sentence cinematic narration for the opening of the day content",
  "closingNarration": "2-3 sentence cinematic narration for the end of the day content",
  "hashtagSuggestions": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}
`, 600)
    const dayMeta = tryJSON(dayMetaRaw, {})

    // Build posting schedule
    const postingSchedule = generatedMoments.map((m, i) => ({
      moment: m.id,
      label: m.label,
      time: m.time,
      postTime: i === 0 ? '07:00' : i === 1 ? '08:30' : i === 2 ? '10:00' : `${10 + i}:00`,
      platform,
      contentType: m.contentType,
      hook: m.hook,
    }))

    // Auto-save project
    let savedProjectId = projectId
    try {
      if (!savedProjectId) {
        const { data: project } = await admin.from('projects').insert({
          user_id: user.id,
          name: dayMeta.dayTitle || `Perfect Day — ${world.name}`,
          type: 'creator',
        }).select().single()
        savedProjectId = project?.id || null
      }
    } catch {}

    // Save perfect_day_session
    try {
      await admin.from('perfect_day_sessions').insert({
        user_id: user.id,
        project_id: savedProjectId,
        world: worldId,
        style,
        platform,
        moments: generatedMoments,
        day_title: dayMeta.dayTitle || null,
        series_hook: dayMeta.seriesHook || null,
        posting_schedule: postingSchedule,
      })
    } catch {}

    // Log generation
    try {
      await admin.from('generation_logs').insert({
        user_id: user.id,
        project_id: savedProjectId,
        type: 'perfect_day',
        input: { worldId, style, platform, momentIds: selectedMomentIds, creatorProfile: creatorProfile?.id, brandProfile: brandProfile?.id },
        output: { momentCount: generatedMoments.length, dayTitle: dayMeta.dayTitle },
      })
    } catch {}

    // Track world memory
    try {
      const existing = await admin.from('world_memory').select('id, use_count').eq('user_id', user.id).eq('world_id', worldId).single()
      if (existing.data) {
        await admin.from('world_memory').update({ use_count: existing.data.use_count + 1, last_used_at: new Date().toISOString() }).eq('id', existing.data.id)
      } else {
        await admin.from('world_memory').insert({ user_id: user.id, world_id: worldId, world_name: world.name, use_count: 1, last_used_at: new Date().toISOString() })
      }
    } catch {}

    return NextResponse.json({
      moments: generatedMoments,
      dayTitle: dayMeta.dayTitle || `A Day in ${world.name}`,
      seriesHook: dayMeta.seriesHook || '12 moments. One world.',
      openingNarration: dayMeta.openingNarration || '',
      closingNarration: dayMeta.closingNarration || '',
      hashtagSuggestions: dayMeta.hashtagSuggestions || [],
      postingSchedule,
      world: { id: world.id, name: world.name, palette: world.palette, mood: world.mood },
      projectId: savedProjectId,
    })
  } catch (err) {
    console.error('perfect-day error:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
