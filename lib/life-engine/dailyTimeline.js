/**
 * PromptCEO Life Engine™ — Universal Day Skeleton
 * 14 time blocks that power every day type:
 * Perfect Day, Travel World, Creator Day, Fitness Day, Ad Campaign Day
 */

export const DAY_SKELETON = [
  { id: 'wake_up',         time: '06:30', label: 'Wake Up',              purpose: 'soft_opening',      emotionalArc: 'calm_start',     lightPhase: 'dawn' },
  { id: 'morning_routine', time: '07:00', label: 'Morning Routine',       purpose: 'ritual',            emotionalArc: 'grounding',      lightPhase: 'early_morning' },
  { id: 'breakfast',       time: '07:45', label: 'Breakfast',             purpose: 'nourishment',       emotionalArc: 'warmth',         lightPhase: 'morning_soft' },
  { id: 'planning',        time: '08:30', label: 'Planning & Strategy',   purpose: 'intention',         emotionalArc: 'clarity',        lightPhase: 'morning_bright' },
  { id: 'work',            time: '10:00', label: 'Work & Creation',       purpose: 'output',            emotionalArc: 'focus',          lightPhase: 'midmorning' },
  { id: 'movement',        time: '11:30', label: 'Movement & City',       purpose: 'energy',            emotionalArc: 'freedom',        lightPhase: 'midday' },
  { id: 'lunch',           time: '12:30', label: 'Lunch',                 purpose: 'social_lifestyle',  emotionalArc: 'pleasure',       lightPhase: 'afternoon_bright' },
  { id: 'afternoon',       time: '14:00', label: 'Afternoon Activity',    purpose: 'lifestyle_proof',   emotionalArc: 'discovery',      lightPhase: 'afternoon' },
  { id: 'wellness',        time: '16:30', label: 'Gym & Wellness',        purpose: 'transformation',    emotionalArc: 'power',          lightPhase: 'late_afternoon' },
  { id: 'reset',           time: '18:30', label: 'Shower & Reset',        purpose: 'transition',        emotionalArc: 'renewal',        lightPhase: 'golden_hour' },
  { id: 'dinner',          time: '19:30', label: 'Dinner',                purpose: 'lifestyle_reward',  emotionalArc: 'satisfaction',   lightPhase: 'magic_hour' },
  { id: 'evening',         time: '21:00', label: 'Evening',               purpose: 'emotional_payoff',  emotionalArc: 'peak',           lightPhase: 'blue_hour' },
  { id: 'night_routine',   time: '22:30', label: 'Night Routine',         purpose: 'wind_down',         emotionalArc: 'reflection',     lightPhase: 'night_ambient' },
  { id: 'bedtime',         time: '23:00', label: 'Bedtime',               purpose: 'closure',           emotionalArc: 'peace',          lightPhase: 'night_dark' },
]

// Light descriptions per phase — used in image + video prompts
export const LIGHT_PHASES = {
  dawn:             'soft pre-dawn blue light, barely-there glow, atmospheric haze',
  early_morning:    'cool morning light through windows, soft shadows, intimate warmth',
  morning_soft:     'soft warm morning light, golden tones beginning, relaxed atmosphere',
  morning_bright:   'clear morning light, sharp shadows, fresh and clean atmosphere',
  midmorning:       'bright even light, productive energy, clean lines',
  midday:           'full midday sun, high contrast, rich colors, energetic',
  afternoon_bright: 'warm afternoon sun, rich golden tones, lively atmosphere',
  afternoon:        'soft afternoon light, slightly warm, comfortable and open',
  late_afternoon:   'warm low afternoon sun, long shadows starting, peak energy',
  golden_hour:      'golden hour magic, warm orange-gold light flooding every surface',
  magic_hour:       'last light of day, deep warm tones, cinematic glow',
  blue_hour:        'blue hour after sunset, city lights emerging, atmospheric depth',
  night_ambient:    'soft indoor warm light, candles or lamp glow, intimate night',
  night_dark:       'minimal dark scene, soft bedroom light, quiet and still',
}

// Wardrobe arc helper — how outfit progresses through day
export const WARDROBE_ARCS = {
  luxury: [
    { phase: 'morning',  outfit: 'silk or cashmere loungewear, minimal jewelry' },
    { phase: 'day',      outfit: 'elevated casual — linen, tailored trousers, quality basics' },
    { phase: 'active',   outfit: 'premium athleisure or sport — matching set, clean silhouettes' },
    { phase: 'evening',  outfit: 'elegant evening wear — structured, refined, statement piece' },
  ],
  creator: [
    { phase: 'morning',  outfit: 'relaxed comfortable — oversized tee, soft shorts or joggers' },
    { phase: 'day',      outfit: 'casual styled — trendy basics, sneakers, signature accessories' },
    { phase: 'active',   outfit: 'gym or sport set — fitted, logo-forward or minimalist' },
    { phase: 'evening',  outfit: 'going-out casual — elevated streetwear or chic simple look' },
  ],
  fitness: [
    { phase: 'morning',  outfit: 'sport briefs or shorts, fitted vest or sports bra' },
    { phase: 'day',      outfit: 'clean casual post-workout — fitted tee, quality shorts' },
    { phase: 'active',   outfit: 'performance training gear — compression, brand-forward' },
    { phase: 'evening',  outfit: 'clean casual evening — fresh, relaxed, healthy aesthetic' },
  ],
  cinematic: [
    { phase: 'morning',  outfit: 'understated luxury morning wear — neutral tones, quality fabric' },
    { phase: 'day',      outfit: 'character-defining outfit — tells their story visually' },
    { phase: 'active',   outfit: 'functional elevated — stylish even in movement' },
    { phase: 'evening',  outfit: 'cinematic evening look — dramatic, intentional, memorable' },
  ],
}

/**
 * Get the wardrobe phase for a given time block
 */
export function getWardrobePhase(blockId) {
  const morning = ['wake_up', 'morning_routine', 'breakfast']
  const active  = ['wellness']
  const evening = ['reset', 'dinner', 'evening', 'night_routine', 'bedtime']
  if (morning.includes(blockId)) return 'morning'
  if (active.includes(blockId))  return 'active'
  if (evening.includes(blockId)) return 'evening'
  return 'day'
}

/**
 * Build identity context string for image/video prompts
 */
export function buildIdentityContext(creatorProfile) {
  const t = creatorProfile?.physical_traits
  if (!t) return ''
  const parts = []
  if (t.ethnicity)  parts.push(t.ethnicity)
  if (t.hairColor)  parts.push(`${t.hairColor} hair`)
  if (t.hair)       parts.push(`${t.hair} hair`)
  if (t.body_shape) parts.push(t.body_shape)
  if (t.bodyType)   parts.push(t.bodyType)
  if (t.age)        parts.push(`approximately ${t.age} years old`)
  if (t.eye_color)  parts.push(`${t.eye_color} eyes`)
  if (t.build)      parts.push(t.build)
  if (t.features)   parts.push(t.features)
  const name = creatorProfile?.name
  return parts.length
    ? `IDENTITY: ${name ? `${name} — ` : ''}${parts.join(', ')}. This person must appear consistently in every scene.`
    : ''
}

/**
 * Get skeleton blocks filtered/ordered for a specific day type
 * Some day types emphasize different blocks
 */
export function getSkeletonForDayType(dayType) {
  // All day types use the full 14-block skeleton
  // but can have different block emphases
  const emphases = {
    perfect_day:      { wellness: 1, breakfast: 1, evening: 1 },
    travel_world:     { movement: 2, lunch: 2, afternoon: 2, evening: 2 },
    creator_day:      { work: 2, afternoon: 2, evening: 2, morning_routine: 2 },
    fitness_day:      { wellness: 3, breakfast: 2, work: 1, morning_routine: 2 },
    ad_campaign_day:  { wake_up: 2, breakfast: 2, wellness: 2, evening: 2, bedtime: 2 },
  }
  return DAY_SKELETON.map(block => ({
    ...block,
    emphasis: (emphases[dayType] || {})[block.id] || 1,
  }))
}
