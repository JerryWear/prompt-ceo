/**
 * PromptCEO Life Engine™ — World Day Adapters
 * Turns the universal 14-block skeleton into a specific world + day type experience
 */

import { DAY_SKELETON, LIGHT_PHASES, WARDROBE_ARCS, getWardrobePhase, buildIdentityContext } from './dailyTimeline.js'

// ── World definitions ────────────────────────────────────────────────────────

export const WORLDS = {
  luxury_penthouse:   { name: 'Luxury Penthouse',     env: 'floor-to-ceiling glass, marble, city panorama far below', light: 'city golden hour, dramatic sunset through glass walls', vibe: 'ultra-premium urban luxury' },
  maldives_villa:     { name: 'Maldives Villa',        env: 'overwater bungalow, turquoise lagoon, white sand steps into water', light: 'tropical equatorial sun, crystal water reflections, endless horizon', vibe: 'paradise island escape' },
  bali_villa:         { name: 'Bali Villa',            env: 'jungle infinity pool, stone temple, rice terrace views, tropical flora', light: 'dappled jungle canopy light, warm Balinese sun, afternoon monsoon drama', vibe: 'spiritual luxury retreat' },
  dubai_highrise:     { name: 'Dubai High-Rise',       env: 'glass towers, desert horizon, rooftop pools, desert sand glow', light: 'desert gold light, blue-hour city skyline, neon night', vibe: 'modern wealth power' },
  paris_apartment:    { name: 'Paris Apartment',       env: 'Haussmann moldings, iron balcony, Eiffel Tower view, parquet floors', light: 'soft Parisian morning grey, romantic golden café light, city evening glow', vibe: 'european elegance' },
  greek_islands:      { name: 'Greek Islands',         env: 'white-washed walls, cobalt blue domes, Aegean sea cliffs, bougainvillea', light: 'Mediterranean bright sun, electric blue contrast, warm evening glow on white stone', vibe: 'sun-drenched mediterranean dream' },
  miami_penthouse:    { name: 'Miami Penthouse',       env: 'art deco architecture, rooftop pool, ocean horizon, pastel cityscape', light: 'Miami electric blue sky, golden beach light, neon pink sunset', vibe: 'tropical glamour' },
  coastal_house:      { name: 'Coastal House',         env: 'ocean cliff view, driftwood, sunbleached linen, sea glass', light: 'Atlantic golden hour, moody coastal fog morning, dramatic cliff light', vibe: 'natural coastal luxury' },
  ski_chalet:         { name: 'Ski Chalet',            env: 'alpine panorama, floor fireplace, fur throws, snow-covered mountain', light: 'crisp blue-white winter snow light, firelight warmth inside, blue dusk on slopes', vibe: 'cozy alpine luxury' },
  urban_apartment:    { name: 'Urban Apartment',       env: 'exposed concrete, industrial steel, city street below, floor plants', light: 'city ambient glow through industrial windows, cool urban tones, street light night', vibe: 'modern urban minimalism' },
  tokyo_apartment:    { name: 'Tokyo Apartment',       env: 'minimalist Japanese interior, cherry blossom view, paper screens, city neon', light: 'soft diffuse morning light, neon city night reflections, cherry blossom pink', vibe: 'zen meets neon luxury' },
  countryside_estate: { name: 'Countryside Estate',   env: 'rolling green hills, stone manor, rose garden, horses in paddock', light: 'English golden hour morning mist, pastoral midday warmth, dramatic storm afternoon light', vibe: 'old money countryside' },
  monaco:             { name: 'Monaco',                env: 'harbour full of superyachts, grand hotel terrace, casino square, cliff-side pool', light: 'Mediterranean luxury sun, harbour reflections, warm cliff-top evening', vibe: 'old world high status' },
  amalfi:             { name: 'Amalfi Coast',          env: 'clifftop lemon terrace, Mediterranean sea drop, pastel village below', light: 'Italian coastal golden sun, lemon grove dappled light, warm terrace evening', vibe: 'la dolce vita luxury' },
  london_penthouse:   { name: 'London Penthouse',      env: 'Thames view, modern glass, The Shard visible, grey city energy', light: 'moody London morning light, glass city reflections, dramatic grey-gold evening', vibe: 'british power wealth' },
}

// ── Day type definitions ─────────────────────────────────────────────────────

export const DAY_TYPES = {
  perfect_day: {
    label: 'Perfect Day',
    description: 'A believable full-day lifestyle story — emotional connection and aspirational realism',
    blockOverrides: {
      wake_up:         { action: 'wakes slowly, still half in dream, soft sheets',      mood: 'calm intimacy' },
      morning_routine: { action: 'skincare, coffee, light stretch, phone morning check', mood: 'gentle ritual' },
      breakfast:       { action: 'healthy breakfast, supplements, morning light',        mood: 'self-care warmth' },
      planning:        { action: 'journaling, planning the day, setting intentions',     mood: 'mental clarity' },
      work:            { action: 'focused deep work, laptop, creating, building',        mood: 'productive flow' },
      movement:        { action: 'walking outside, fresh air, city or nature',          mood: 'free energy' },
      lunch:           { action: 'lunch at a café or light home meal',                  mood: 'lifestyle pleasure' },
      afternoon:       { action: 'personal task, filming content, or creative project', mood: 'discovery' },
      wellness:        { action: 'gym session, yoga, or run',                           mood: 'physical power' },
      reset:           { action: 'shower, skincare, outfit change for evening',         mood: 'renewal transition' },
      dinner:          { action: 'cooking or dining out, wine, conversation',           mood: 'lifestyle reward' },
      evening:         { action: 'movie, music, reading, or calm evening',              mood: 'emotional payoff' },
      night_routine:   { action: 'skincare, journaling, preparing tomorrow',            mood: 'peaceful reflection' },
      bedtime:         { action: 'gets into bed, soft close to the day',               mood: 'contentment' },
    },
  },

  travel_world: {
    label: 'Travel World Day',
    description: 'A cinematic luxury travel day — aspirational destination content',
    blockOverrides: {
      wake_up:         { action: 'wakes in luxury hotel or villa suite',                         mood: 'dream awakening' },
      morning_routine: { action: 'balcony coffee with ocean or city panorama',                   mood: 'privileged morning' },
      breakfast:       { action: 'breakfast by window or hotel terrace, local food',             mood: 'travel pleasure' },
      planning:        { action: 'planning the day, itinerary on laptop, travel journal',        mood: 'explorer anticipation' },
      work:            { action: 'remote work from luxury location, laptop by pool or café',     mood: 'digital nomad power' },
      movement:        { action: 'walking through famous location, discovering the city or coast', mood: 'exploration joy' },
      lunch:           { action: 'lunch at a high-end local restaurant, tasting the destination', mood: 'cultural pleasure' },
      afternoon:       { action: 'private car, yacht, boat, sightseeing, or beach afternoon',    mood: 'luxury freedom' },
      wellness:        { action: 'hotel spa, rooftop pool, or outdoor fitness with a view',      mood: 'elevated wellbeing' },
      reset:           { action: 'shower, evening glam, outgoing outfit in the suite mirror',    mood: 'evening transformation' },
      dinner:          { action: 'fine dining restaurant with cinematic atmosphere',              mood: 'luxury lifestyle peak' },
      evening:         { action: 'rooftop bar, night walk, or private terrace night scene',      mood: 'magical night' },
      night_routine:   { action: 'hotel room wind-down, skincare, reflect on the day',           mood: 'fulfilled calm' },
      bedtime:         { action: 'luxury hotel bed, white linens, soft close',                   mood: 'travel bliss' },
    },
  },

  creator_day: {
    label: 'Creator Day',
    description: 'A full creator lifestyle day — content creation, audience connection, brand building',
    blockOverrides: {
      wake_up:         { action: 'wakes naturally, phone immediately in hand, first check',      mood: 'creator energy' },
      morning_routine: { action: 'phone check, messages, DMs, morning skincare for camera',      mood: 'connected ritual' },
      breakfast:       { action: 'coffee and casual morning vlog content, natural setting',       mood: 'authentic morning' },
      planning:        { action: 'content planning, ideas board, filming schedule, DM strategy', mood: 'strategic creativity' },
      work:            { action: 'filming first content block, editing, posting',                 mood: 'deep creation' },
      movement:        { action: 'outdoor lifestyle content — walk, drive, street movement',     mood: 'dynamic lifestyle' },
      lunch:           { action: 'café lunch with casual social content, tagged location',        mood: 'social lifestyle proof' },
      afternoon:       { action: 'editing, posting, replying to comments, brand emails',         mood: 'output and engagement' },
      wellness:        { action: 'gym or beauty content, transformation moment',                  mood: 'aspirational lifestyle' },
      reset:           { action: 'shower, GRWM content, outfit change for evening',              mood: 'transformation story' },
      dinner:          { action: 'evening content shoot or restaurant vlog',                      mood: 'lifestyle reward' },
      evening:         { action: 'emotional story post, reflection, or movie night content',     mood: 'connection and authenticity' },
      night_routine:   { action: 'planning tomorrow\'s content, skincare routine video',         mood: 'creator discipline' },
      bedtime:         { action: 'soft close, goodnight message, intimate creator moment',       mood: 'personal connection' },
    },
  },

  fitness_day: {
    label: 'Fitness Day',
    description: 'A transformation-focused day — body, discipline, results, lifestyle proof',
    blockOverrides: {
      wake_up:         { action: 'up before alarm, intentional morning, body check-in',          mood: 'discipline and purpose' },
      morning_routine: { action: 'hydration, supplements, pre-workout ritual',                   mood: 'performance preparation' },
      breakfast:       { action: 'high-protein breakfast, meal prep, nutrition first',           mood: 'fueled and focused' },
      planning:        { action: 'goals check-in, body measurements, progress tracking',        mood: 'data-driven clarity' },
      work:            { action: 'daily responsibilities, business or work tasks',               mood: 'balanced discipline' },
      movement:        { action: 'morning walk, steps, active recovery movement',               mood: 'consistent momentum' },
      lunch:           { action: 'clean lunch — macro-balanced, meal prep from fridge',         mood: 'nutrition discipline' },
      afternoon:       { action: 'mindset work, stretching, or active lifestyle moment',        mood: 'mental strength' },
      wellness:        { action: 'main training session — lifting, running, HIIT, sport',       mood: 'peak performance' },
      reset:           { action: 'post-workout meal, protein shake, shower and recovery',       mood: 'earned recovery' },
      dinner:          { action: 'cooking clean meal for tomorrow, meal prep, kitchen scene',   mood: 'sustainable lifestyle' },
      evening:         { action: 'stretching, foam rolling, progress photo, reflection',        mood: 'results acknowledgement' },
      night_routine:   { action: 'prepare gym bag, plan tomorrow\'s training, supplements',    mood: 'system discipline' },
      bedtime:         { action: 'sleep as recovery — the final performance tool',             mood: 'recovery and reset' },
    },
  },

  ad_campaign_day: {
    label: 'Ad Campaign Day',
    description: 'A product story told through a believable day — problem → product → transformation',
    blockOverrides: {
      wake_up:         { action: 'wakes with the problem visible — tired, stressed, wanting change', mood: 'relatable pain point' },
      morning_routine: { action: 'morning struggle or routine without the solution',                  mood: 'problem acknowledgment' },
      breakfast:       { action: 'product introduced naturally — first soft mention',                 mood: 'discovery moment' },
      planning:        { action: 'product used during planning — first emotional shift felt',         mood: 'early benefit' },
      work:            { action: 'product supports work or daily output — proving its value',        mood: 'trust building' },
      movement:        { action: 'lifestyle proof — product fits into normal active life',           mood: 'social validation' },
      lunch:           { action: 'natural product integration during social lifestyle moment',        mood: 'peer context' },
      afternoon:       { action: 'deeper product use — the story builds',                           mood: 'growing conviction' },
      wellness:        { action: 'transformation moment — the result becomes visible',               mood: 'peak transformation' },
      reset:           { action: 'evening confidence — the person looks or feels different',        mood: 'visible change' },
      dinner:          { action: 'lifestyle reward — the better version of their life',             mood: 'aspirational payoff' },
      evening:         { action: 'emotional payoff — deeper benefit: confidence, freedom, peace',   mood: 'desire trigger' },
      night_routine:   { action: 'product becomes part of the night ritual — habit formed',        mood: 'loyalty and habit' },
      bedtime:         { action: 'CTA moment — the viewer sees the final result and wants it',     mood: 'conversion' },
    },
  },
}

// ── Core adapter function ────────────────────────────────────────────────────

/**
 * Adapt the universal day skeleton for a specific world + day type
 * Returns array of adapted blocks ready for API prompt building
 */
export function adaptDay({ worldId, dayType, style, platform, creatorProfile, brandProfile }) {
  const world   = WORLDS[worldId] || WORLDS.luxury_penthouse
  const dayDef  = DAY_TYPES[dayType] || DAY_TYPES.perfect_day
  const wardrobeStyle = style?.includes('fitness') ? 'fitness'
    : style?.includes('creator') || dayType === 'creator_day' ? 'creator'
    : style?.includes('luxury') || style?.includes('cinematic') ? 'luxury'
    : 'cinematic'
  const wardrobeArc = WARDROBE_ARCS[wardrobeStyle] || WARDROBE_ARCS.luxury
  const identityCtx = buildIdentityContext(creatorProfile)
  const brandCtx = brandProfile
    ? `Brand: ${brandProfile.name || ''}${brandProfile.voice ? `, voice: ${brandProfile.voice}` : ''}${brandProfile.target_audience ? `, audience: ${brandProfile.target_audience}` : ''}.`
    : ''

  return DAY_SKELETON.map(block => {
    const override    = dayDef.blockOverrides[block.id] || {}
    const lightPhase  = LIGHT_PHASES[block.lightPhase] || ''
    const wPhase      = getWardrobePhase(block.id)
    const wardrobe    = wardrobeArc.find(w => w.phase === wPhase) || wardrobeArc[0]

    return {
      id:       block.id,
      time:     block.time,
      label:    block.label,
      purpose:  block.purpose,
      emotion:  override.mood || block.emotionalArc,
      action:   override.action || `${block.label.toLowerCase()} moment`,
      lightPhase: lightPhase,
      wardrobe: wardrobe.outfit,
      world:    world.name,
      worldEnv: world.env,
      worldVibe: world.vibe,
      style,
      platform,
      identityCtx,
      brandCtx,
    }
  })
}

/**
 * Build a scene-level image prompt from an adapted block
 */
export function buildImagePrompt(block) {
  const identity = block.identityCtx
    ? `${block.identityCtx} `
    : ''
  return `${identity}${block.time} — ${block.action}. Setting: ${block.worldEnv}. Lighting: ${block.lightPhase}. Wardrobe: ${block.wardrobe}. Mood: ${block.emotion}. Style: ${block.style?.replace(/_/g, ' ')} photography, cinematic composition, ${block.worldVibe}.`
}

/**
 * Build a scene-level video prompt from an adapted block
 */
export function buildVideoPrompt(block) {
  const identity = block.identityCtx
    ? `Subject: ${block.identityCtx} `
    : ''
  return `${identity}${block.time} scene: ${block.action}. Location: ${block.worldEnv}. Camera: slow push-in or tracking shot. Lighting: ${block.lightPhase}. Wardrobe: ${block.wardrobe}. Emotional tone: ${block.emotion}. Visual style: ${block.style?.replace(/_/g, ' ')} cinematic. Platform: ${block.platform}. Clip length: 8-15 seconds.`
}

export { buildIdentityContext }
