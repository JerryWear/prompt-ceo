import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { postGeneration, saveGenerationOutput, GENERATOR_TYPES } from '../../../lib/server/postGeneration.js'

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

// ── Inline moment + world data (avoids cross-directory import issues) ──────────
const DAY_MOMENTS = [
  { id: 'waking_up',       time: '06:00', label: 'Waking Up',           sceneBase: 'Bedroom. First light through windows. Creator stirs in bed.', mood: 'soft, still, intimate', lighting: 'golden morning glow, diffused', creatorEnergy: 'natural, unguarded, real', defaultHook: 'The morning belongs to no one but you.', videoInstruction: 'Slow push-in from window. Creator stirs. Ambient morning sound only.' },
  { id: 'morning_routine', time: '07:00', label: 'Morning Routine',      sceneBase: 'Bathroom. Mirror. Skincare ritual. Water.', mood: 'intentional, calm, premium', lighting: 'warm bathroom light, steam diffusion', creatorEnergy: 'slow, deliberate, confident', defaultHook: 'The ritual that sets everything else.', videoInstruction: 'Close-ups in sequence. Hands on face. Water drops. Mirror eye contact.' },
  { id: 'breakfast',       time: '08:00', label: 'Breakfast',            sceneBase: 'Kitchen or terrace. Coffee or tea. Fresh food. Looking outward.', mood: 'peaceful, nourishing, present', lighting: 'soft natural morning light', creatorEnergy: 'present, slow, satisfied', defaultHook: 'This is what a slow morning actually looks like.', videoInstruction: 'Steam rising from cup. Creator looking out. Soft ambient sound.' },
  { id: 'work_planning',   time: '09:00', label: 'Work / Planning',      sceneBase: 'Desk, laptop, notebook. Focused and purposeful.', mood: 'focused, purposeful, intelligent', lighting: 'clean natural light, window light on work surface', creatorEnergy: 'sharp, determined, calm authority', defaultHook: 'This is where the work gets done.', videoInstruction: 'Focus pull from notebook to laptop to face. Deep work.' },
  { id: 'outdoor_walk',    time: '11:00', label: 'Walk / Outdoor',       sceneBase: 'Street, park, coastal path, or garden. Movement and air.', mood: 'free, alive, exploratory', lighting: 'midday natural, warm, motion', creatorEnergy: 'light, open, energetic', defaultHook: 'Movement is the answer.', videoInstruction: 'Walking shot from behind, then from front. Environment in motion.' },
  { id: 'lunch',           time: '13:00', label: 'Lunch',                sceneBase: 'Restaurant, rooftop table, or home kitchen.', mood: 'social or quiet indulgence, reward', lighting: 'bright midday or warm restaurant interior', creatorEnergy: 'relaxed, present, enjoying', defaultHook: 'A meal that actually deserves a moment.', videoInstruction: 'Food arriving. Creator first bite or sip. Satisfaction.' },
  { id: 'gym_fitness',     time: '15:00', label: 'Gym / Fitness',        sceneBase: 'Gym floor, outdoor training, yoga studio, or pool.', mood: 'disciplined, physical, transformative', lighting: 'harsh gym overhead or bright outdoor, contrast-heavy', creatorEnergy: 'driven, focused, powerful', defaultHook: 'The version of you that shows up anyway.', videoInstruction: 'Motion during rep or set. Quick cut pace. Sweat real.' },
  { id: 'home_transition', time: '17:00', label: 'Home / Transition',    sceneBase: 'Returning home. Changing. Decompressing.', mood: 'shift from external to internal, release', lighting: 'late afternoon warm, golden hour', creatorEnergy: 'soft, returning to self', defaultHook: 'The part nobody shows.', videoInstruction: 'Keys on table. Shoes off. Public energy dissolving.' },
  { id: 'cooking',         time: '19:00', label: 'Cooking / Preparing',  sceneBase: 'Kitchen. Cooking with intention. Preparing for next day.', mood: 'grounded, ritual, domestic luxury', lighting: 'warm evening kitchen light', creatorEnergy: 'calm, creative, nourishing', defaultHook: 'This is how you actually invest in tomorrow.', videoInstruction: 'Hands chopping, stirring. Steam. Color. Kitchen alive.' },
  { id: 'evening_rest',    time: '20:30', label: 'Movies / Evening',     sceneBase: 'Living room, sofa, screen, candles, or reading.', mood: 'ease, reward, indulgent rest', lighting: 'low warm interior light, candle or lamp', creatorEnergy: 'fully off, human, restful', defaultHook: 'The evening you actually earned.', videoInstruction: 'Creator settled into sofa. Warm light. Nothing performative.' },
  { id: 'shower_winddown', time: '21:30', label: 'Shower / Wind Down',   sceneBase: 'Bathroom. Shower or bath. End-of-day ritual.', mood: 'cleansing, closing, transitional', lighting: 'soft steamy bathroom, warm, slightly dim', creatorEnergy: 'letting go, transitional', defaultHook: 'Wash off the day. Reset for tomorrow.', videoInstruction: 'Steam. Water sounds. Close-up product textures.' },
  { id: 'bed_preparation', time: '22:30', label: 'Getting Ready for Bed', sceneBase: 'Bedroom. Skincare. Journal. Single lamp.', mood: 'complete, still, at peace', lighting: 'single warm lamp, very low, outside dark', creatorEnergy: 'closed, rested, satisfied', defaultHook: 'A full day. A full life.', videoInstruction: 'Lamp glow. Hand on journal. Creator settling. Fade.' },
]

const DAY_WORLDS = {
  luxury_penthouse:   { id: 'luxury_penthouse',   name: 'Luxury Penthouse',    environment: 'top-floor city apartment, floor-to-ceiling glass, city skyline', palette: 'charcoal, warm gold, crisp white', lighting: 'city light, clean daylight through glass', mood: 'high-status urban luxury, achievement', sceneVariations: { waking_up: 'king bed facing floor-to-ceiling city view, white linen, morning city light', work_planning: 'minimal desk against glass wall, city behind', evening_rest: 'sectional sofa with city lights behind, low lamp' } },
  maldives_villa:     { id: 'maldives_villa',     name: 'Maldives Villa',       environment: 'overwater bungalow, crystal turquoise water, infinity pool, private deck', palette: 'turquoise, white, sand, pale coral', lighting: 'tropical natural light, ocean reflection, golden hour over water', mood: 'aspirational escape, total luxury, untouched paradise', sceneVariations: { waking_up: 'overwater bungalow bedroom, glass floor, water visible below, morning light', breakfast: 'outdoor deck table over water, fresh tropical fruit, ocean horizon', outdoor_walk: 'walking on the dock above crystal water, barefoot' } },
  coastal_house:      { id: 'coastal_house',      name: 'Coastal House',        environment: 'cliffside home, ocean view, natural materials, outdoor terraces', palette: 'white, terracotta, sea blue, sage green', lighting: 'Mediterranean natural light, warm and direct, sea glitter', mood: 'organic luxury, grounded freedom', sceneVariations: { waking_up: 'white bedroom, open window, sea visible, gauze curtain moving', breakfast: 'stone terrace table, fruit, bread, coffee, sea in background', outdoor_walk: 'cliff path overlooking sea, wild plants, natural freedom' } },
  urban_apartment:    { id: 'urban_apartment',    name: 'Urban Apartment',      environment: 'city loft, industrial chic, rooftop access, large windows, brick or concrete', palette: 'grey, warm black, wood tones', lighting: 'urban daylight, city glow at night, industrial pendant lights', mood: 'creative urban energy, authentic city life', sceneVariations: { morning_routine: 'industrial bathroom, exposed pipe, city window', work_planning: 'large wooden desk, city window, multiple screens', outdoor_walk: 'city street level, moving through crowds' } },
  countryside_estate: { id: 'countryside_estate', name: 'Countryside Estate',   environment: 'rolling hills, stone manor, formal gardens, orchards', palette: 'deep green, cream, rich brown, slate grey', lighting: 'European countryside light, soft diffused, mist, golden afternoon', mood: 'old money quiet, landed luxury, intellectual calm', sceneVariations: { waking_up: 'manor bedroom, heavy curtains, mist on hills, old timber bed', breakfast: 'stone kitchen table, eggs, bread, garden window', outdoor_walk: 'through formal gardens or fields, unhurried, owner energy' } },
  dubai_highrise:     { id: 'dubai_highrise',     name: 'Dubai High-Rise',      environment: 'ultra-luxury tower, desert skyline, pool terrace', palette: 'gold, white, desert amber, night black', lighting: 'intense desert sun, dramatic artificial light at night, gold everywhere', mood: 'extreme wealth display, global power, ambition fulfilled', sceneVariations: { waking_up: 'ultra-luxury bedroom, city of Dubai below, gold accents, silk sheets', work_planning: 'glass desk against panoramic Dubai skyline', gym_fitness: 'private gym overlooking city or pool terrace' } },
  tokyo_apartment:    { id: 'tokyo_apartment',    name: 'Tokyo Apartment',      environment: 'modern Japanese minimal apartment, city grid view, clean lines, bonsai', palette: 'white, grey, pale wood, moss green', lighting: 'diffused Japanese light, soft and even, dawn and dusk', mood: 'disciplined calm, aesthetic precision, intelligent minimalism', sceneVariations: { morning_routine: 'minimal bathroom, single plant, precise ritual, no clutter', breakfast: 'low table, matcha or coffee, single beautiful cup, window to city', cooking: 'minimal kitchen, precise chopping, steam rising, few beautiful ingredients' } },
  paris_apartment:    { id: 'paris_apartment',    name: 'Paris Apartment',      environment: 'Haussmann-era apartment, balcony overlooking roofline, high ceilings, art', palette: 'cream, warm gold, dark wood, dusty rose, sage', lighting: 'Parisian grey-white diffused light, warm lamp interior', mood: 'old world elegance, effortless taste, intellectual romance', sceneVariations: { breakfast: 'balcony table, croissant, coffee, Parisian rooflines', outdoor_walk: 'Haussmann boulevard, cafe terraces, natural urban elegance', evening_rest: 'tall windows at dusk, lamps warming the room' } },
  bali_villa:         { id: 'bali_villa',         name: 'Bali Villa',           environment: 'jungle villa, private pool, rice terraces, open-air pavilion, tropical garden', palette: 'deep green, warm wood, stone, lotus white', lighting: 'tropical diffused, jungle shadow, golden hour sacred', mood: 'spiritual luxury, conscious living, tropical escape', sceneVariations: { waking_up: 'open-air bedroom, jungle view, canopy bed, morning light through leaves', breakfast: 'pool pavilion, tropical fruit, lotus flowers, open to jungle', outdoor_walk: 'rice terraces path, barefoot, spiritual and free' } },
  greek_islands:      { id: 'greek_islands',      name: 'Greek Islands',        environment: 'Santorini or Mykonos villa, infinity pool, Aegean sea, whitewashed walls', palette: 'brilliant white, cobalt blue, terracotta, golden light', lighting: 'Mediterranean sun, dazzling white reflection, deep blue contrast', mood: 'sun-drenched freedom, aesthetic perfection, timeless beauty', sceneVariations: { waking_up: 'whitewashed bedroom, blue dome view, sea breeze through curtains', breakfast: 'terrace overlooking caldera, Greek coffee, white table', outdoor_walk: 'cobblestone village path, brilliant white walls, Aegean below' } },
  ski_chalet:         { id: 'ski_chalet',         name: 'Ski Chalet',           environment: 'luxury alpine chalet, mountain views, fireplace, snow outside, wood and stone', palette: 'rich wood, cream wool, forest green, fire amber', lighting: 'firelight, mountain snow glow, golden interior warmth', mood: 'cosy power, alpine luxury, earned warmth', sceneVariations: { waking_up: 'wood-panelled bedroom, snow view, thick duvet, firelight', breakfast: 'chalet kitchen, mountain panorama, eggs and coffee, snow outside', evening_rest: 'fireplace with mountain view, blanket, warm drink, complete peace' } },
  miami_penthouse:    { id: 'miami_penthouse',    name: 'Miami Penthouse',      environment: 'South Beach penthouse, ocean view, rooftop pool, Art Deco details, eternal sun', palette: 'white, ocean blue, coral, chrome', lighting: 'intense Florida sun, pool reflection, sunset fire', mood: 'hedonistic luxury, beach power, vibrant and free', sceneVariations: { waking_up: 'bright white bedroom, ocean panorama, sun flooding in', outdoor_walk: 'beach boardwalk, ocean beside, confident stride', gym_fitness: 'rooftop terrace workout, Miami skyline, ocean below' } },
}

function getWorldById(id) { return DAY_WORLDS[id] || DAY_WORLDS.luxury_penthouse }
function getMomentsByIds(ids) { return ids.map(id => DAY_MOMENTS.find(m => m.id === id)).filter(Boolean) }
function getFullDay() { return DAY_MOMENTS.map(m => m.id) }
function getSceneForMoment(worldId, momentId) {
  const world = DAY_WORLDS[worldId]
  return world?.sceneVariations?.[momentId] || null
}

// ──────────────────────────────────────────────────────────────────────────────

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
    const { canGenerateText } = await import('../../../lib/subscription.js')
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

      // Build character directive — only injected when character traits are present
      const traits = creatorProfile?.physical_traits || {}
      const traitValues = Object.entries(traits).filter(([,v]) => v && v !== 'Pick from library...')
      const characterDirective = traitValues.length > 0
        ? `CHARACTER REQUIREMENT: This scene MUST feature a specific person with these exact traits: ${traitValues.map(([k,v]) => `${k}: ${v}`).join(', ')}. Include their physical description in the imagePrompt.`
        : creatorProfile?.name
          ? `CHARACTER: A person named ${creatorProfile.name} appears in this scene.`
          : ''

      const contentPromise = ask(xaiApiKey, `
Generate content for this cinematic lifestyle moment.

${momentContext}
${characterDirective ? `\n${characterDirective}` : ''}

Return a JSON object with these exact keys:
{
  "imagePrompt": "${characterDirective ? `Cinematic scene featuring the specified character — include their physical appearance in the description. ` : ''}Detailed image generation prompt, 2-3 sentences, specific framing, lighting and mood.",
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

    // Log generation (central pipeline)
    const logId = await postGeneration(admin, {
      userId:   user.id,
      projectId: savedProjectId,
      prompt:   `Perfect Day — ${world.name} — ${platform}`,
      worldId,
      campaignPhase: 'attention',
    })

    // Track world memory
    try {
      const existing = await admin.from('world_memory').select('id, use_count').eq('user_id', user.id).eq('world_id', worldId).single()
      if (existing.data) {
        await admin.from('world_memory').update({ use_count: existing.data.use_count + 1, last_used_at: new Date().toISOString() }).eq('id', existing.data.id)
      } else {
        await admin.from('world_memory').insert({ user_id: user.id, world_id: worldId, world_name: world.name, use_count: 1, last_used_at: new Date().toISOString() })
      }
    } catch {}

    const result = {
      moments: generatedMoments,
      dayTitle: dayMeta.dayTitle || `A Day in ${world.name}`,
      seriesHook: dayMeta.seriesHook || '12 moments. One world.',
      openingNarration: dayMeta.openingNarration || '',
      closingNarration: dayMeta.closingNarration || '',
      hashtagSuggestions: dayMeta.hashtagSuggestions || [],
      postingSchedule,
      world: { id: world.id, name: world.name, palette: world.palette, mood: world.mood },
      projectId: savedProjectId,
    }

    await saveGenerationOutput(admin, {
      logId, projectId: savedProjectId, userId: user.id,
      generatorType: GENERATOR_TYPES.PERFECT_DAY,
      payload: result,
    })

    return NextResponse.json(result)
  } catch (err) {
    console.error('perfect-day error:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
