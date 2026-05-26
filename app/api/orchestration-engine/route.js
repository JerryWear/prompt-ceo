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

function admin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

// ── Orchestration profiles (mirrors instant/orchestration.js) ────────────────
const TYPE_HOOK = {
  product: 'pain', ecommerce: 'desire', personal_brand: 'curiosity',
  fitness: 'transformation', coaching: 'curiosity', creator: 'viral',
  fashion: 'desire', saas: 'pain', luxury: 'desire', agency: 'pain',
  local_business: 'pain', subscription: 'desire', app: 'curiosity',
}

const TYPE_WORLDS = {
  product: ['minimal_studio', 'lifestyle_home'],
  ecommerce: ['minimal_studio', 'lifestyle_home', 'urban_street'],
  personal_brand: ['urban_coffee', 'outdoor_nature', 'lifestyle_home'],
  fitness: ['gym', 'outdoor_nature'],
  coaching: ['luxury_hotel', 'urban_office', 'lifestyle_home'],
  creator: ['urban_coffee', 'lifestyle_home', 'outdoor_nature'],
  fashion: ['luxury_hotel', 'urban_street', 'penthouse'],
  saas: ['urban_office', 'minimal_studio'],
  luxury: ['penthouse', 'luxury_hotel', 'yacht'],
  agency: ['urban_office', 'luxury_hotel'],
  local_business: ['urban_street', 'lifestyle_home'],
  subscription: ['lifestyle_home', 'minimal_studio'],
  app: ['urban_street', 'minimal_studio'],
}

const GOAL_PLATFORM = {
  sales: 'instagram', leads: 'meta', followers: 'tiktok',
  brand_awareness: 'instagram', app_installs: 'meta', creator_growth: 'tiktok',
  high_ticket: 'instagram', viral_reach: 'tiktok', premium_positioning: 'instagram',
}

// Style → brand voice affinity (for scoring against brand_profiles.voice)
const STYLE_VOICE = {
  luxury: ['premium', 'aspirational', 'luxury'],
  cinematic: ['cinematic', 'editorial', 'artistic'],
  ugc: ['authentic', 'friendly', 'relatable'],
  emotional: ['emotional', 'warm', 'human'],
  viral: ['viral', 'bold', 'energetic'],
  dark_luxury: ['premium', 'dark', 'luxury', 'high-fashion'],
  high_energy: ['motivational', 'energetic', 'bold'],
  soft_feminine: ['soft', 'feminine', 'gentle', 'authentic'],
  corporate_authority: ['authoritative', 'professional', 'corporate'],
  fitness_motivation: ['motivational', 'athletic', 'transformative'],
  high_status: ['premium', 'status', 'aspirational'],
  aspirational_lifestyle: ['aspirational', 'lifestyle', 'freedom'],
}

// Canonical goal combos per type (sensible defaults)
const TYPE_GOAL_AFFINITY = {
  product:        ['sales', 'brand_awareness'],
  ecommerce:      ['sales', 'leads'],
  personal_brand: ['followers', 'high_ticket'],
  fitness:        ['followers', 'sales'],
  coaching:       ['high_ticket', 'leads'],
  creator:        ['creator_growth', 'viral_reach'],
  fashion:        ['brand_awareness', 'premium_positioning'],
  saas:           ['leads', 'app_installs'],
  luxury:         ['premium_positioning', 'brand_awareness'],
  agency:         ['high_ticket', 'leads'],
  local_business: ['sales', 'followers'],
  subscription:   ['sales', 'leads'],
  app:            ['app_installs', 'viral_reach'],
}

// Canonical style combos per type
const TYPE_STYLE_AFFINITY = {
  product:        ['cinematic', 'ugc', 'aspirational_lifestyle'],
  ecommerce:      ['ugc', 'viral', 'cinematic'],
  personal_brand: ['ugc', 'aspirational_lifestyle', 'cinematic'],
  fitness:        ['fitness_motivation', 'high_energy', 'ugc'],
  coaching:       ['corporate_authority', 'cinematic', 'high_status'],
  creator:        ['ugc', 'viral', 'aspirational_lifestyle'],
  fashion:        ['luxury', 'dark_luxury', 'cinematic'],
  saas:           ['corporate_authority', 'cinematic', 'high_energy'],
  luxury:         ['luxury', 'dark_luxury', 'high_status'],
  agency:         ['corporate_authority', 'high_status', 'cinematic'],
  local_business: ['ugc', 'emotional', 'aspirational_lifestyle'],
  subscription:   ['ugc', 'cinematic', 'aspirational_lifestyle'],
  app:            ['viral', 'high_energy', 'ugc'],
}

function scoreCombo(type, goal, style, { perfHooks, perfWorlds, brandVoice, worldMemory }) {
  let score = 0

  // Base affinity score
  if (TYPE_GOAL_AFFINITY[type]?.[0] === goal) score += 30
  else if (TYPE_GOAL_AFFINITY[type]?.[1] === goal) score += 20
  if (TYPE_STYLE_AFFINITY[type]?.[0] === style) score += 30
  else if (TYPE_STYLE_AFFINITY[type]?.[1] === style) score += 20
  else if (TYPE_STYLE_AFFINITY[type]?.[2] === style) score += 10

  // Performance bias: if user's top hook type matches this type's natural hook
  const naturalHook = TYPE_HOOK[type]
  if (perfHooks?.includes(naturalHook)) score += 25

  // World memory: if user uses the type's worlds heavily
  const typeWorlds = TYPE_WORLDS[type] || []
  typeWorlds.forEach(w => {
    const mem = worldMemory?.find(m => m.world_id === w)
    if (mem) score += Math.min(mem.use_count * 3, 15)
  })

  // Brand voice affinity
  if (brandVoice) {
    const voiceTerms = brandVoice.toLowerCase().split(/[\s,]+/)
    const styleVoices = STYLE_VOICE[style] || []
    const match = styleVoices.some(v => voiceTerms.some(t => v.includes(t) || t.includes(v)))
    if (match) score += 20
  }

  // Performance world match
  if (perfWorlds?.length) {
    const worldMatch = typeWorlds.some(w => perfWorlds.includes(w))
    if (worldMatch) score += 15
  }

  return score
}

function buildReason(type, goal, style, score, { brandVoice, perfHooks, perfWorlds }) {
  const parts = []
  const naturalHook = TYPE_HOOK[type]
  if (perfHooks?.includes(naturalHook)) parts.push(`${naturalHook} hooks perform well for you`)
  if (brandVoice) {
    const voiceTerms = brandVoice.toLowerCase().split(/[\s,]+/)
    const styleVoices = STYLE_VOICE[style] || []
    if (styleVoices.some(v => voiceTerms.some(t => v.includes(t) || t.includes(v)))) {
      parts.push(`matches your brand voice`)
    }
  }
  if (perfWorlds?.length && (TYPE_WORLDS[type] || []).some(w => perfWorlds.includes(w))) {
    parts.push(`familiar world environment in your top performers`)
  }
  if (parts.length === 0) {
    parts.push(`strong affinity for ${type.replace(/_/g, ' ')} brands`)
  }
  return parts.join(' · ')
}

const GOAL_LABELS = {
  sales: 'Sales', leads: 'Lead Gen', followers: 'Followers', brand_awareness: 'Brand Awareness',
  app_installs: 'App Installs', creator_growth: 'Creator Growth', high_ticket: 'High Ticket',
  viral_reach: 'Viral Reach', premium_positioning: 'Premium Positioning',
}
const STYLE_LABELS = {
  luxury: 'Luxury', cinematic: 'Cinematic', ugc: 'UGC', emotional: 'Emotional', viral: 'Viral',
  dark_luxury: 'Dark Luxury', high_energy: 'High Energy', soft_feminine: 'Soft Feminine',
  corporate_authority: 'Authority', fitness_motivation: 'Fitness', high_status: 'High Status',
  aspirational_lifestyle: 'Aspirational',
}

export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { type, goal: hintGoal, productName } = await req.json()
    if (!type) return NextResponse.json({ error: 'type is required' }, { status: 400 })

    const db = admin()

    // ── Load user intelligence ──────────────────────────────
    const [{ data: perfLogs }, { data: worldMem }, { data: brandProfiles }] = await Promise.all([
      db.from('performance_logs').select('hook_type, world_id, liked, ctr').eq('user_id', user.id).limit(100),
      db.from('world_memory').select('world_id, use_count, like_count').eq('user_id', user.id),
      db.from('brand_profiles').select('voice, style').eq('user_id', user.id).order('last_used_at', { ascending: false }).limit(1),
    ])

    // Derive signals
    const topHooks = (perfLogs || [])
      .filter(l => l.liked !== false && l.hook_type)
      .reduce((acc, l) => { acc[l.hook_type] = (acc[l.hook_type] || 0) + 1; return acc }, {})
    const perfHooks = Object.entries(topHooks).sort((a, b) => b[1] - a[1]).map(([k]) => k)

    const topWorldsMap = (perfLogs || []).filter(l => l.world_id)
      .reduce((acc, l) => { acc[l.world_id] = (acc[l.world_id] || 0) + 1; return acc }, {})
    const perfWorlds = Object.entries(topWorldsMap).sort((a, b) => b[1] - a[1]).map(([k]) => k)

    const brandVoice = brandProfiles?.[0]?.voice || brandProfiles?.[0]?.style || ''
    const worldMemory = worldMem || []

    // ── Score all goal × style combos for this type ─────────
    const GOALS = ['sales', 'leads', 'followers', 'brand_awareness', 'app_installs', 'creator_growth', 'high_ticket', 'viral_reach', 'premium_positioning']
    const STYLES = ['luxury', 'cinematic', 'ugc', 'emotional', 'viral', 'dark_luxury', 'high_energy', 'soft_feminine', 'corporate_authority', 'fitness_motivation', 'high_status', 'aspirational_lifestyle']

    const combos = []
    for (const goal of (hintGoal ? [hintGoal] : GOALS)) {
      for (const style of STYLES) {
        const score = scoreCombo(type, goal, style, { perfHooks, perfWorlds, brandVoice, worldMemory })
        combos.push({ type, goal, style, score })
      }
    }

    combos.sort((a, b) => b.score - a.score)

    // Top 3 distinct (ensure style variety)
    const seen = new Set()
    const top3 = []
    for (const c of combos) {
      if (top3.length >= 3) break
      const key = c.style
      if (!seen.has(key)) {
        seen.add(key)
        top3.push({
          type: c.type,
          goal: c.goal,
          style: c.style,
          platform: GOAL_PLATFORM[c.goal] || 'instagram',
          world: (TYPE_WORLDS[c.type] || ['minimal_studio'])[0],
          hookType: TYPE_HOOK[c.type] || 'pain',
          score: c.score,
          label: `${STYLE_LABELS[c.style]} ${GOAL_LABELS[c.goal]}`,
          reason: buildReason(c.type, c.goal, c.style, c.score, { brandVoice, perfHooks, perfWorlds }),
          confidence: c.score >= 60 ? 'high' : c.score >= 35 ? 'medium' : 'low',
          hasPersonalData: perfHooks.length > 0 || worldMemory.length > 0 || !!brandVoice,
        })
      }
    }

    return NextResponse.json({ recommendations: top3, hasPersonalData: perfHooks.length > 0 || worldMemory.length > 0 || !!brandVoice })
  } catch (err) {
    console.error('orchestration-engine error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
