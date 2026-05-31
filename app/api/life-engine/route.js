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

async function ask(apiKey, prompt, maxTokens = 800) {
  const res = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'grok-3-fast',
      max_tokens: maxTokens,
      messages: [
        { role: 'system', content: 'You are a world-class cinematic content director. Respond with ONLY raw valid JSON — no markdown, no code fences. Your entire response must start with {.' },
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

// ── MODE DATA ─────────────────────────────────────────────────────────────────

const MODES = {

  travel_day: {
    label: 'Travel Day',
    directive: 'You are directing a cinematic travel day campaign. Every moment captures the emotion, discovery, and beauty of exploring a destination.',
    moments: [
      { id: 'pre_departure',   time: '06:00', label: 'Pre-Departure',      scene: 'Hotel room. Final pack. Anticipation building. City outside still sleeping.',               mood: 'focused anticipation, calm excitement',    hook: 'Before every great journey, there\'s this moment.' },
      { id: 'departure',       time: '08:00', label: 'Departure',           scene: 'Terminal or train station. Moving through the world with intention.',                       mood: 'momentum, controlled energy, adventure',   hook: 'The world gets smaller when you keep moving.' },
      { id: 'in_transit',      time: '10:00', label: 'In Transit',          scene: 'Window seat. Landscape below or passing. Thoughts and travel snacks.',                      mood: 'reflective, between worlds, free',         hook: 'The journey is the first destination.' },
      { id: 'arrival',         time: '12:00', label: 'Arrival',             scene: 'First step into the destination. Street level. New air, new sounds.',                       mood: 'discovery, wonder, arrival energy',        hook: 'You can always tell when you\'ve arrived somewhere real.' },
      { id: 'first_explore',   time: '14:00', label: 'First Exploration',   scene: 'Walking the streets. Discovering texture, architecture, locals, markets.',                  mood: 'curious, alive, explorer',                 hook: 'No map. Just movement.' },
      { id: 'local_lunch',     time: '15:30', label: 'Local Lunch',         scene: 'Authentic local restaurant. Something ordered by pointing. First bite of real local food.',  mood: 'sensory, present, cultural immersion',     hook: 'Every city tastes different.' },
      { id: 'hidden_spot',     time: '17:00', label: 'Hidden Gem',          scene: 'Off-the-beaten-path place. Local secret. Away from the crowds.',                            mood: 'discovery, intimate, earned',              hook: 'The places nobody posts about.' },
      { id: 'golden_hour',     time: '18:30', label: 'Golden Hour',         scene: 'The destination at magic hour. Light hitting the iconic elements perfectly.',                mood: 'cinematic, peak beauty, emotional',        hook: 'This light only happens here.' },
      { id: 'sunset_drinks',   time: '19:30', label: 'Sunset Drinks',       scene: 'Rooftop, terrace, or local bar. Drink in hand. City or landscape at dusk.',                 mood: 'celebration, earned rest, social',         hook: 'To the days that remind you why you travel.' },
      { id: 'evening_dinner',  time: '21:00', label: 'Evening Dinner',      scene: 'Full dinner experience. Local cuisine, atmosphere, candlelight.',                            mood: 'indulgence, cultural connection, present', hook: 'The meal you\'ll still talk about in five years.' },
      { id: 'night_walk',      time: '22:30', label: 'Night Walk',          scene: 'City or village at night. Lights, quiet streets, reflection while walking.',                 mood: 'contemplative, alive, intimate',           hook: 'Every city becomes something else at night.' },
      { id: 'hotel_winddown',  time: '23:30', label: 'Wind Down',           scene: 'Hotel room. Shoes off. Recapping the day. Window view. Journal or phone.',                  mood: 'complete, satisfied, reflective',          hook: 'Full day. Full life.' },
    ],
    worlds: {
      paris:        { name: 'Paris',          environment: 'Haussmann boulevards, café terraces, Seine bridges, rooftop views', palette: 'cream, gold, dusty rose, grey-blue', lighting: 'Parisian grey-white diffused light, warm café glow' },
      tokyo:        { name: 'Tokyo',          environment: 'neon-lit streets, temple gardens, ramen shops, bullet train', palette: 'electric colour, white, neon, deep black', lighting: 'neon glow at night, soft temple morning, rain reflection' },
      maldives:     { name: 'Maldives',       environment: 'overwater bungalow, crystal water, white sand beaches, tropical jungle', palette: 'turquoise, white, sand, coral', lighting: 'tropical sun, water reflection, island golden hour' },
      santorini:    { name: 'Santorini',      environment: 'whitewashed villages, caldera views, blue domes, clifftop paths', palette: 'brilliant white, cobalt blue, terracotta', lighting: 'Mediterranean sun, dazzling reflection, Aegean sunset' },
      bali:         { name: 'Bali',           environment: 'rice terraces, jungle temples, volcanic mountains, beach clubs', palette: 'deep green, warm wood, stone, volcanic black', lighting: 'tropical diffused, jungle shadow, sacred golden hour' },
      new_york:     { name: 'New York',       environment: 'Manhattan skyline, subway, rooftop bars, Central Park, delis', palette: 'concrete grey, yellow, steel blue, night black', lighting: 'urban glass and steel, Times Square glow, park morning' },
      amalfi:       { name: 'Amalfi Coast',   environment: 'cliffside villages, lemon groves, turquoise coves, fishing boats', palette: 'terracotta, lemon yellow, deep blue, white', lighting: 'Italian coastal sun, warm stone, blue water reflection' },
      marrakech:    { name: 'Marrakech',      environment: 'medina souks, riad courtyards, Atlas Mountains, desert edge', palette: 'burnt orange, deep red, gold, teal tile', lighting: 'harsh afternoon sun, riad shade, lantern evening warmth' },
    },
  },

  fitness_day: {
    label: 'Fitness Day',
    directive: 'You are directing a cinematic fitness and performance lifestyle campaign. Every moment captures discipline, transformation, and the beauty of a body pushed to its best.',
    moments: [
      { id: 'pre_workout',     time: '05:00', label: 'Pre-Workout',         scene: 'Waking before the world. Dark outside. Intentional preparation. Pre-workout ritual.',      mood: 'disciplined, quiet power, focused',        hook: 'The alarm goes off. Some people sleep. You don\'t.' },
      { id: 'activation',      time: '05:30', label: 'Morning Activation',  scene: 'Dynamic warm-up. Stretching. Getting blood moving. Body waking up.',                       mood: 'building momentum, physical awakening',    hook: 'Warm-up is where most people cheat.' },
      { id: 'main_session',    time: '06:00', label: 'Main Training',       scene: 'Full intensity training session. Weights, sprints, or discipline-specific movement.',       mood: 'peak effort, driven, powerful',            hook: 'This is the work that doesn\'t show on the feed.' },
      { id: 'post_workout',    time: '07:30', label: 'Post-Workout',        scene: 'Session complete. Sweat real. Achievement sitting on skin. Cool down.',                     mood: 'earned satisfaction, physical pride',      hook: 'You can\'t fake what this feels like.' },
      { id: 'recovery_fuel',   time: '08:00', label: 'Recovery Nutrition',  scene: 'Protein shake, meal prep, or deliberate recovery meal. Fuelling the result.',               mood: 'clinical precision, intentional nourishment', hook: 'The meal after is part of the work.' },
      { id: 'cold_therapy',    time: '09:00', label: 'Cold Therapy',        scene: 'Ice bath, cold shower, or contrast therapy. The hard recovery.',                            mood: 'extreme discipline, mental fortitude',     hook: 'Nobody wants to. That\'s the point.' },
      { id: 'mindset',         time: '10:00', label: 'Mindset Work',        scene: 'Reading, journaling, or meditation. The mental side of performance.',                       mood: 'growth, quiet intelligence, depth',        hook: 'The body follows where the mind leads.' },
      { id: 'performance_lunch', time: '12:00', label: 'Performance Lunch', scene: 'Clean, deliberate, high-quality lunch. Every macro placed with intention.',                 mood: 'discipline meets pleasure, nourishment',   hook: 'This is what discipline actually looks like.' },
      { id: 'afternoon_session', time: '15:00', label: 'Afternoon Session', scene: 'Second training block. Skill work, technique, or conditioning.',                            mood: 'second wind, commitment, relentless',      hook: 'One session was never going to be enough.' },
      { id: 'active_recovery', time: '17:00', label: 'Active Recovery',    scene: 'Walk, swim, sauna, or yoga. Moving to recover.',                                             mood: 'intelligent rest, earned ease',            hook: 'Recovery is training.' },
      { id: 'evening_fuel',    time: '19:00', label: 'Evening Nutrition',   scene: 'Clean dinner. No compromise. Fuelling for tomorrow.',                                       mood: 'consistency, no excuses',                  hook: 'Every meal is a vote for the version of you you\'re building.' },
      { id: 'sleep_protocol',  time: '22:00', label: 'Sleep Protocol',      scene: 'Wind-down ritual. Supplements, darkness, temperature control. Optimising recovery.',        mood: 'complete, ready, disciplined to the end',  hook: 'Sleep is where the body becomes what you built today.' },
    ],
    worlds: {
      luxury_gym:     { name: 'Luxury Gym',        environment: 'high-end private gym, polished concrete, mirrors, premium equipment', palette: 'dark grey, chrome, black, white', lighting: 'overhead industrial, mirror reflection, focused' },
      outdoor_track:  { name: 'Outdoor Track',     environment: 'running track, stadium, early morning, no crowd', palette: 'red track, white lines, blue sky, green field', lighting: 'early morning natural, harsh midday' },
      mountain_trail: { name: 'Mountain Trail',    environment: 'mountain paths, elevation, forest, open sky above', palette: 'forest green, granite grey, sky blue, earth brown', lighting: 'mountain natural, mist at dawn, clear afternoon' },
      home_setup:     { name: 'Performance Home',  environment: 'clean home gym, garage conversion, open space, functional equipment', palette: 'white, raw wood, black equipment, natural light', lighting: 'open door light, clean overhead' },
      boxing_gym:     { name: 'Boxing Gym',        environment: 'classic boxing gym, heavy bags, ring, worn leather, grit', palette: 'leather brown, red, aged yellow, deep black', lighting: 'industrial overhead, raw and unfiltered' },
      beachfront:     { name: 'Beachfront',        environment: 'sand, ocean, outdoor fitness, sunrise or sunset', palette: 'sand, ocean blue, warm sunrise gold', lighting: 'golden hour over water, natural beachfront' },
      rooftop:        { name: 'Urban Rooftop',     environment: 'city rooftop, skyline behind, open air, elevated perspective', palette: 'concrete, steel, city glow, blue sky', lighting: 'urban open sky, city lights at dusk' },
    },
  },

  product_day: {
    label: 'Product Day',
    directive: 'You are directing a cinematic product campaign told as a full day. Every moment shows the product naturally integrated into a desirable lifestyle — never forced, always earned.',
    moments: [
      { id: 'discovery',       time: '07:00', label: 'First Discovery',     scene: 'Product arrives or is seen for the first time. Unboxing or first encounter.',               mood: 'anticipation, curiosity, first impression', hook: 'The moment before you know it\'s going to be different.' },
      { id: 'unboxing',        time: '08:00', label: 'Unboxing',            scene: 'Opening packaging. First tactile contact. Material quality. Design details.',               mood: 'sensory, quality reveal, premium',         hook: 'Everything about how it\'s packaged tells you something.' },
      { id: 'morning_use',     time: '09:00', label: 'Morning Integration', scene: 'Product used as part of morning routine. Natural, effortless, becoming habit.',             mood: 'seamless, aspirational habit, routine',    hook: 'This is what a good product does — it just fits.' },
      { id: 'core_use',        time: '11:00', label: 'Core Use Case',       scene: 'The main function of the product demonstrated in real context.',                            mood: 'performance, function, clear value',       hook: 'It does exactly what it promises.' },
      { id: 'real_test',       time: '13:00', label: 'Real-World Test',     scene: 'Product tested under real conditions. Not a studio. Real life.',                            mood: 'authentic, functional proof, honest',      hook: 'The real test is never in perfect conditions.' },
      { id: 'unexpected',      time: '15:00', label: 'Unexpected Use',      scene: 'A use case nobody expected. Creative or non-obvious application.',                          mood: 'surprise, versatility, creative',          hook: 'You\'ll find uses they didn\'t even design for.' },
      { id: 'share_moment',    time: '16:30', label: 'The Share Moment',    scene: 'Showing the product to someone else. The reaction. The conversation starter.',              mood: 'social proof, community, desirability',    hook: 'The best products become conversation pieces.' },
      { id: 'aesthetic',       time: '18:00', label: 'Aesthetic Moment',    scene: 'Product photographed in beautiful light. Object as art. Design as identity.',               mood: 'beautiful, editorial, desire',             hook: 'Some objects just deserve better light.' },
      { id: 'lifestyle_fit',   time: '19:30', label: 'Lifestyle Integration', scene: 'Product fully embedded in the lifestyle. Not a tool. Part of an identity.',             mood: 'identity, belonging, aspirational',        hook: 'The things we choose say who we are.' },
      { id: 'verdict',         time: '21:00', label: 'End-of-Day Verdict',  scene: 'Honest, personal reflection on the product. Real. Not scripted.',                          mood: 'authentic, considered, trustworthy',       hook: 'Here\'s what I actually think after a full day.' },
      { id: 'collection',      time: '22:00', label: 'Collection Moment',   scene: 'Product alongside other curated favourites. It belongs here.',                              mood: 'curation, taste, completion',              hook: 'It made the shelf.' },
      { id: 'tomorrow',        time: '23:00', label: 'Already Reaching',    scene: 'Reaching for it again without thinking. Habit formed. Product integrated.',                 mood: 'habit formed, effortless preference',      hook: 'When you stop thinking about it and just reach — that\'s the test.' },
    ],
    worlds: {
      home_studio:    { name: 'Home Studio',       environment: 'clean, curated home environment, considered interior design, natural light', palette: 'neutral tones, warm white, natural textures', lighting: 'window light, soft diffused, warm tones' },
      outdoor:        { name: 'Outdoor Lifestyle', environment: 'parks, streets, natural settings, real-world use', palette: 'natural green, concrete grey, sky blue', lighting: 'natural outdoor light, varied conditions' },
      urban_cafe:     { name: 'Urban Café',        environment: 'coffee shop, creative workspace, city environment', palette: 'warm wood, coffee tones, city grey', lighting: 'café ambient, window natural light' },
      travel_ready:   { name: 'Travel Setting',    environment: 'airport, hotel room, suitcase open, departure anticipation', palette: 'clean neutral, travel premium', lighting: 'hotel light, terminal bright, morning travel' },
      kitchen:        { name: 'Kitchen & Home',    environment: 'luxury kitchen, prep surfaces, morning breakfast setting', palette: 'marble white, warm copper, fresh green', lighting: 'morning kitchen natural, overhead warm' },
      luxury_setting: { name: 'Luxury Setting',    environment: 'high-end interior, aspirational home, editorial-quality space', palette: 'deep tones, premium materials, gold accent', lighting: 'considered interior lighting, editorial quality' },
    },
  },

  campaign_day: {
    label: 'Campaign Day',
    directive: 'You are directing a cinematic marketing campaign told as a full day. Each moment represents a different phase of audience psychology — from attention to conversion.',
    moments: [
      { id: 'pattern_break',   time: '06:00', label: 'Pattern Interrupt',   scene: 'The hook. Something that stops the scroll cold. Unexpected, bold, impossible to ignore.',   mood: 'disruptive, bold, unmissable',             hook: 'Stop. This is different.' },
      { id: 'pain_point',      time: '07:30', label: 'The Problem',         scene: 'Naming the pain your audience feels. Making them feel seen.',                               mood: 'empathetic, direct, resonant',             hook: 'If you\'ve ever felt this — keep reading.' },
      { id: 'curiosity',       time: '09:00', label: 'Curiosity Gap',       scene: 'The question that demands an answer. Incomplete information that pulls people forward.',     mood: 'intriguing, magnetic, unresolved',         hook: 'What most people never figure out is...' },
      { id: 'proof',           time: '11:00', label: 'Social Proof',        scene: 'The result or credential. Someone who achieved what the audience wants.',                    mood: 'credible, inspiring, trust-building',      hook: 'This is what it actually looks like.' },
      { id: 'desire',          time: '13:00', label: 'Desire Trigger',      scene: 'Showing the transformation. The before/after. The life that becomes possible.',             mood: 'aspirational, emotional, coveted',         hook: 'Imagine waking up and this is just your life.' },
      { id: 'objection',       time: '14:30', label: 'Objection Handling',  scene: 'Addressing the doubt directly. The reason they\'re hesitating, answered.',                  mood: 'reassuring, direct, confident',            hook: 'I know what you\'re thinking. And here\'s why you\'re wrong.' },
      { id: 'scarcity',        time: '16:00', label: 'Scarcity Signal',     scene: 'The limited element. What makes this moment the right moment to act.',                      mood: 'urgent, exclusive, now-or-never',          hook: 'This is not always available.' },
      { id: 'hero_moment',     time: '17:30', label: 'Hero Moment',         scene: 'Peak emotional desire. The singular best image of what the audience wants.',                mood: 'peak desire, cinematic, emotional climax', hook: 'This is what you\'re actually after.' },
      { id: 'community',       time: '19:00', label: 'Identity & Belonging', scene: 'The tribe. People who have what the audience wants. Making them feel they belong.',        mood: 'tribal, belonging, identity',              hook: 'These are the people who made the decision.' },
      { id: 'value_stack',     time: '20:30', label: 'Value Stack',         scene: 'Everything they get, laid out clearly. The full picture of what they\'re saying yes to.',   mood: 'clear, generous, confident',               hook: 'Here\'s everything you\'re getting.' },
      { id: 'soft_cta',        time: '22:00', label: 'Final Nudge',         scene: 'The soft close. Invitation over demand. Permission-based final push.',                      mood: 'warm, inviting, decisive without pressure', hook: 'When you\'re ready — the door is open.' },
      { id: 'retarget_seed',   time: '23:30', label: 'The Callback',        scene: 'Planting the seed for tomorrow. The hook that keeps them thinking about you.',              mood: 'lingering, curious, memorable',            hook: 'Tomorrow, you\'re going to remember this.' },
    ],
    worlds: {
      luxury_penthouse:  { name: 'Luxury Penthouse',  environment: 'top-floor city apartment, floor-to-ceiling glass, skyline backdrop', palette: 'charcoal, gold, crisp white', lighting: 'city light, clean daylight through glass' },
      maldives_villa:    { name: 'Maldives Villa',    environment: 'overwater bungalow, turquoise water, infinite horizon', palette: 'turquoise, white, sand, coral', lighting: 'tropical natural, golden hour over water' },
      coastal_house:     { name: 'Coastal House',     environment: 'cliffside home, ocean views, natural materials', palette: 'white, terracotta, sea blue', lighting: 'Mediterranean sun, sea glitter' },
      urban_apartment:   { name: 'Urban Loft',        environment: 'city loft, industrial chic, rooftop access', palette: 'grey, warm black, wood', lighting: 'urban daylight, city glow at night' },
      bali_villa:        { name: 'Bali Villa',         environment: 'jungle villa, private pool, rice terraces, open-air pavilion', palette: 'deep green, warm wood, stone', lighting: 'tropical diffused, golden hour sacred' },
      paris_apartment:   { name: 'Paris Apartment',   environment: 'Haussmann-era apartment, balcony, high ceilings, art', palette: 'cream, warm gold, dark wood', lighting: 'Parisian diffused light, warm lamp interior' },
    },
  },
}

function buildIdentityContext(creatorProfile, brandProfile) {
  const parts = []
  if (creatorProfile?.name)            parts.push(`Creator: ${creatorProfile.name}`)
  if (creatorProfile?.creator_type)    parts.push(`Type: ${creatorProfile.creator_type}`)
  if (creatorProfile?.style_signature) parts.push(`Style: ${creatorProfile.style_signature}`)
  if (brandProfile?.name)              parts.push(`Brand: ${brandProfile.name}`)
  if (brandProfile?.voice)             parts.push(`Brand Voice: ${brandProfile.voice}`)
  if (brandProfile?.target_audience)   parts.push(`Audience: ${brandProfile.target_audience}`)
  return parts.join('\n')
}

export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const xaiApiKey = String(process.env.XAI_API_KEY || '').replace(/^Bearer\s+/i, '').replace(/^"+|"+$/g, '').trim()
    if (!xaiApiKey) return NextResponse.json({ error: 'Missing XAI_API_KEY' }, { status: 500 })

    const admin = adminClient()
    const { data: userRow } = await admin.from('app_users').select('subscription_status, subscription_tier').eq('id', user.id).single()
    const { canGenerateText } = await import('../../../lib/subscription.js')
    if (!canGenerateText(userRow)) return NextResponse.json({ error: 'Subscription required', upgradeRequired: true }, { status: 402 })

    const { mode = 'travel_day', worldId, style = 'cinematic', platform = 'instagram', creatorProfile = null, brandProfile = null, projectId = null } = await req.json()

    const modeData = MODES[mode]
    if (!modeData) return NextResponse.json({ error: 'Unknown mode' }, { status: 400 })

    const worlds   = modeData.worlds
    const worldKey = worldId && worlds[worldId] ? worldId : Object.keys(worlds)[0]
    const world    = worlds[worldKey]
    const moments  = modeData.moments

    const identityCtx = buildIdentityContext(creatorProfile, brandProfile)
    const worldCtx    = `World: ${world.name}\nEnvironment: ${world.environment}\nPalette: ${world.palette}\nLighting: ${world.lighting}`
    const baseCtx     = [modeData.directive, identityCtx, worldCtx, `Style: ${style.replace(/_/g,' ')}\nPlatform: ${platform}`].filter(Boolean).join('\n\n')

    // Build character directive — only when specific traits are provided
    const charTraits = creatorProfile?.physical_traits || {}
    const charTraitValues = Object.entries(charTraits).filter(([,v]) => v && v !== 'Pick from library...')
    const characterDirective = charTraitValues.length > 0
      ? `CHARACTER REQUIREMENT: Every scene MUST feature a person with these exact traits: ${charTraitValues.map(([k,v]) => `${k}: ${v}`).join(', ')}. Include their physical description in the imagePrompt.`
      : creatorProfile?.name ? `CHARACTER: ${creatorProfile.name} appears in this scene.` : ''

    const generateMoment = async (moment) => {
      const raw = await ask(xaiApiKey, `Generate content for this cinematic ${modeData.label} moment.

${baseCtx}
${characterDirective ? `\n${characterDirective}` : ''}

Moment: ${moment.time} — ${moment.label}
Scene: ${moment.scene}
Mood: ${moment.mood}

Return JSON only:
{"imagePrompt":"${characterDirective ? 'Cinematic scene featuring the specified character with their physical description included. ' : ''}Image prompt 2-3 sentences","hook":"hook line under 12 words","caption":"${platform} caption 3-4 sentences personal and sensory","altHook":"alternative hook under 12 words"}`)
      const content = tryJSON(raw, {})
      return {
        id:          moment.id,
        time:        moment.time,
        label:       moment.label,
        scene:       moment.scene,
        imagePrompt: content.imagePrompt || `${world.name} — ${moment.scene} ${world.palette} palette, ${world.lighting}.`,
        hook:        content.hook        || moment.hook,
        caption:     content.caption    || `${moment.scene} ${world.mood || ''}`.trim(),
        altHook:     content.altHook    || '',
      }
    }

    // Batch into groups of 4 to avoid rate limits
    const momentResults = []
    for (let i = 0; i < moments.length; i += 4) {
      const batch = await Promise.all(moments.slice(i, i + 4).map(generateMoment))
      momentResults.push(...batch)
      if (i + 4 < moments.length) await new Promise(r => setTimeout(r, 300))
    }

    const logId = await postGeneration(admin, {
      userId:   user.id,
      projectId,
      prompt:   `${modeData.label} — ${world.name} — ${platform}`,
      worldId:  worldKey,
      campaignPhase: 'attention',
    })

    const modeToType = {
      travel_day:   GENERATOR_TYPES.LIFE_ENGINE_TRAVEL,
      fitness_day:  GENERATOR_TYPES.LIFE_ENGINE_FITNESS,
      product_day:  GENERATOR_TYPES.LIFE_ENGINE_PRODUCT,
      campaign_day: GENERATOR_TYPES.LIFE_ENGINE_CAMPAIGN,
    }

    const result = { mode, modeLabel: modeData.label, world: { id: worldKey, ...world }, platform, style, moments: momentResults }

    await saveGenerationOutput(admin, {
      logId, projectId, userId: user.id,
      generatorType: modeToType[mode] || `life_engine_${mode}`,
      payload: result,
    })

    return NextResponse.json(result)
  } catch (err) {
    console.error('[life-engine]', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
