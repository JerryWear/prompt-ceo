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

function adminClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

const WORLDS = {
  maldives_villa:    { name: 'Maldives Villa',         palette: 'turquoise water, white sand, overwater bungalow, coral reef', light: 'tropical equatorial sun, crystal water reflections' },
  luxury_penthouse:  { name: 'Luxury Penthouse',        palette: 'floor-to-ceiling glass, city panorama, marble, gold fixtures', light: 'golden hour cityscape, dramatic sunset glow' },
  bali_villa:        { name: 'Bali Villa',              palette: 'tropical jungle, infinity pool, stone temple, rice terraces', light: 'dappled jungle light, warm Balinese sun' },
  dubai_highrise:    { name: 'Dubai High-Rise',          palette: 'glass towers, desert horizon, rooftop pools, neon night skyline', light: 'desert gold light, blue-hour city glow' },
  paris_apartment:   { name: 'Paris Apartment',          palette: 'Haussmann moldings, iron balcony, Eiffel view, parquet floors', light: 'soft Parisian grey, romantic golden café light' },
  greek_islands:     { name: 'Greek Islands',            palette: 'white-washed walls, cobalt blue domes, Aegean sea, bougainvillea', light: 'Mediterranean bright sun, electric blue contrast' },
  miami_penthouse:   { name: 'Miami Penthouse',          palette: 'art deco, rooftop pool, beach horizon, pastel architecture', light: 'Miami electric blue sky, golden beach light' },
  coastal_house:     { name: 'Coastal House',            palette: 'ocean cliff, driftwood, sunbleached linen, sea glass', light: 'Atlantic gold hour, moody coastal fog' },
  ski_chalet:        { name: 'Ski Chalet',               palette: 'alpine snow, floor fire, fur throws, mountain panorama', light: 'crisp blue-white winter snow light, firelight warmth' },
  urban_apartment:   { name: 'Urban Apartment',          palette: 'exposed concrete, industrial steel, city lights below', light: 'city ambient glow, cool urban tones' },
  tokyo_apartment:   { name: 'Tokyo Apartment',          palette: 'minimalist Japanese, cherry blossom view, paper screens, neon glow', light: 'soft diffuse Japanese light, neon city reflections' },
  countryside_estate:{ name: 'Countryside Estate',       palette: 'rolling green hills, stone manor, rose garden, horses', light: 'English golden hour, misty morning pastoral light' },
}

const DAY_TYPES = {
  luxury_creator_day:    { label: 'Luxury Creator Day',      arc: 'lazy luxury morning → creative content session → pool/social → evening dining → golden hour content → night' },
  beach_creator_day:     { label: 'Beach Creator Day',       arc: 'sunrise beach walk → beach content shoot → ocean swim → café work session → sunset surf/sail → beach dinner' },
  wellness_retreat_day:  { label: 'Wellness Retreat Day',    arc: 'meditation/sunrise → spa morning → healthy breakfast → yoga → massage → healthy lunch → nature walk → evening wellness ritual' },
  romantic_travel_day:   { label: 'Romantic Travel Day',     arc: 'slow morning in bed → romantic breakfast → sightseeing → fine dining lunch → afternoon explore → sunset drinks → intimate dinner' },
  fitness_lifestyle_day: { label: 'Fitness Lifestyle Day',   arc: 'pre-dawn workout → protein breakfast → active training → meal prep → afternoon cardio/sport → evening recovery → night ritual' },
  business_power_day:    { label: 'Business Power Day',      arc: 'early rise → strategy session → premium coffee meeting → midday networking → afternoon deals → power dinner → night reflection' },
  fashion_content_day:   { label: 'Fashion Content Day',     arc: 'styling morning → first outfit shoot → location change → second look → lunch break → third look golden hour → evening editorial' },
  foodie_luxury_day:     { label: 'Gourmet & Luxury Day',    arc: 'farmers market morning → chef kitchen → gourmet brunch → wine tasting → fine dining experience → dessert bar night' },
}

function buildIdentityContext(creatorProfile) {
  if (!creatorProfile?.physical_traits) return ''
  const t = creatorProfile.physical_traits
  const parts = []
  if (t.ethnicity) parts.push(t.ethnicity)
  if (t.hairColor) parts.push(`${t.hairColor} hair`)
  if (t.bodyType) parts.push(t.bodyType)
  if (t.age) parts.push(`approximately ${t.age}`)
  if (t.features) parts.push(t.features)
  return parts.length ? `Creator appearance: ${parts.join(', ')}. Include these physical traits in all video scene descriptions.` : ''
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
      world       = 'luxury_penthouse',
      dayType     = 'luxury_creator_day',
      style       = 'cinematic',
      platform    = 'instagram',
      creatorProfile = null,
      brandProfile   = null,
      projectId      = null,
    } = body

    const worldData = WORLDS[world] || WORLDS.luxury_penthouse
    const dayTypeData = DAY_TYPES[dayType] || DAY_TYPES.luxury_creator_day
    const identityCtx = buildIdentityContext(creatorProfile)

    const brandCtx = brandProfile
      ? `Brand: ${brandProfile.name || ''}${brandProfile.voice ? `, voice: ${brandProfile.voice}` : ''}${brandProfile.target_audience ? `, audience: ${brandProfile.target_audience}` : ''}.`
      : ''

    const systemPrompt = `You are a world-class cinematic video director and production designer. You create full-day video production plans that feel like $2M feature films.

You are directing a ${dayTypeData.label} in ${worldData.name}.
World: ${worldData.palette}
Lighting signature: ${worldData.light}
Day arc: ${dayTypeData.arc}
Visual style: ${style.replace(/_/g, ' ')}
Platform: ${platform}
${identityCtx}
${brandCtx}

Generate a complete cinematic day — exactly 12 scenes. Each scene must feel like a film frame, not a social media post.

Respond ONLY with raw valid JSON in this exact structure:
{
  "productionTitle": "short cinematic title",
  "directorStatement": "2-sentence vision for this day",
  "lightingArc": "how lighting changes from morning to night",
  "wardrobeArc": "how wardrobe evolves across the day",
  "scenes": [
    {
      "id": "scene_01",
      "time": "06:30",
      "title": "scene title",
      "setting": "exact location within the world",
      "action": "what the subject is doing — specific and visual",
      "cameraMove": "exact camera movement (e.g. slow push in, overhead crane, handheld follow)",
      "lensType": "e.g. 85mm portrait, 24mm wide, 50mm natural, 135mm telephoto",
      "lightingNote": "specific lighting description for this scene",
      "wardrobe": "exact outfit description",
      "emotion": "the dominant emotion and energy",
      "dialogueHint": "optional spoken line or sound, or null",
      "transitionTo": "how this scene transitions to the next (e.g. cut on action, slow dissolve, match cut)",
      "clipLength": "e.g. 8-12 seconds",
      "videoPrompt": "full AI video generation prompt for this scene, 3-5 sentences, cinematic language",
      "shortFormClip": "how to cut this scene into a 3-5 second viral clip",
      "captionLine": "one hook-style caption line for this scene"
    }
  ],
  "postingStrategy": {
    "fullCut": "description of the full-day edit (2-3 mins)",
    "highlights": ["scene_01", "scene_05", "scene_09"],
    "shortFormCuts": "description of the 3-4 viral short clips",
    "reelOrder": "recommended posting order across the week"
  }
}`

    const res = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${xaiApiKey}` },
      body: JSON.stringify({
        model: 'grok-3-fast',
        max_tokens: 6000,
        temperature: 0.75,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Direct the full ${dayTypeData.label} in ${worldData.name}. Make every scene feel cinematic and real. The lighting must progress naturally from morning to night. The wardrobe must evolve. The emotion must build across the day.` },
        ],
      }),
    })

    const data = await res.json()
    const raw = data?.choices?.[0]?.message?.content?.trim() || ''
    let result = null
    try {
      const stripped = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim()
      const match = stripped.match(/\{[\s\S]*\}/)
      result = match ? JSON.parse(match[0]) : null
    } catch {}

    if (!result) {
      return NextResponse.json({ error: 'Failed to parse video day result' }, { status: 500 })
    }

    // Attach metadata
    result.world = world
    result.worldName = worldData.name
    result.dayType = dayType
    result.dayTypeLabel = dayTypeData.label
    result.style = style
    result.platform = platform

    // Log
    try {
      await admin.from('generation_logs').insert({
        user_id:    user.id,
        project_id: projectId || null,
        type:       'full_day_video',
        input:      { world, dayType, style, platform },
        output:     { productionTitle: result.productionTitle, sceneCount: result.scenes?.length },
      })
    } catch {}

    return NextResponse.json(result)
  } catch (err) {
    console.error('full-day-generate error:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
