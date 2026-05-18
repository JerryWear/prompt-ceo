// ─────────────────────────────────────────────────────────────
// AI Music Recommendation Engine v2
// Weighted multi-dimensional scoring across 5 inputs:
// product type, target mood, visual style, platform, campaign goal
// ─────────────────────────────────────────────────────────────

// Product keyword → product_fit tag mapping
const PRODUCT_TYPE_MAP = {
  fitness:     ['fitness','sport','supplement','gym'],
  gym:         ['fitness','sport','gym'],
  supplement:  ['fitness','supplement','sport'],
  beauty:      ['beauty','skincare','fashion','jewellery'],
  skincare:    ['beauty','skincare'],
  fashion:     ['fashion','lifestyle','beauty'],
  coaching:    ['coaching','wellness','lifestyle'],
  wellness:    ['wellness','coaching','beauty'],
  tech:        ['tech'],
  app:         ['tech'],
  lifestyle:   ['lifestyle','wellness','coaching'],
  luxury:      ['fashion','jewellery','lifestyle'],
  jewellery:   ['jewellery','beauty','fashion'],
  sport:       ['fitness','sport','supplement'],
}

// Mood word → mood_fit tag mapping
const MOOD_EXPAND = {
  luxury:       ['luxury','soft','calm','cinematic','elegant','warm'],
  premium:      ['luxury','soft','calm','premium','elegant'],
  bold:         ['bold','powerful','aggressive','energetic','determination'],
  emotional:    ['emotional','warm','inspirational','romantic','love'],
  clean:        ['calm','soft','minimal','warm'],
  aggressive:   ['aggressive','powerful','explosive','bold','determination'],
  feminine:     ['feminine','soft','romantic','warm','love'],
  friendly:     ['warm','inspirational','upbeat','positive'],
  warm:         ['warm','romantic','inspirational','upbeat','positive'],
  cinematic:    ['cinematic','powerful','emotional','dramatic'],
  sexy:         ['confident','luxury','romantic','feminine'],
  powerful:     ['powerful','energetic','bold','explosive','determination'],
  calm:         ['calm','soft','slow','warm'],
  aspirational: ['inspirational','upbeat','motivational','confident'],
  motivational: ['motivational','inspirational','energetic','upbeat'],
  dark:         ['cinematic','powerful','aggressive','explosive'],
  energetic:    ['energetic','upbeat','fast','motivational'],
}

// Visual style → visual_style_fit mapping
const VISUAL_STYLE_MAP = {
  lifestyle:  ['lifestyle'],
  minimal:    ['minimal'],
  editorial:  ['editorial'],
  cinematic:  ['cinematic'],
  ugc:        ['creator'],
  creator:    ['creator'],
}

// Platform → platform_fit mapping
const PLATFORM_MAP = {
  instagram:      ['instagram'],
  tiktok:         ['tiktok'],
  facebook:       ['facebook'],
  youtube_shorts: ['youtube_shorts'],
  shopify:        ['shopify'],
  general:        ['instagram','tiktok'],
}

// Campaign goal → campaign_fit mapping
const GOAL_MAP = {
  awareness:   ['awareness'],
  traffic:     ['traffic'],
  leads:       ['leads'],
  sales:       ['sales'],
  retargeting: ['retargeting'],
  luxury:      ['luxury'],
}

// ─────────────────────────────────────────────────────────────
// matchArray — core scoring primitive
// Checks how many inputArray items exist in trackArray
// ─────────────────────────────────────────────────────────────
function matchArray(trackArray = [], inputArray = [], weight = 1) {
  const trackSet = new Set((trackArray || []).map(x => String(x).toLowerCase()))
  return (inputArray || []).reduce((score, item) => {
    return trackSet.has(String(item).toLowerCase()) ? score + weight : score
  }, 0)
}

// ─────────────────────────────────────────────────────────────
// buildMatchReasons — generates "Why this fits" explanation
// ─────────────────────────────────────────────────────────────
function buildMatchReasons(track, dimensions) {
  const reasons = []
  if (dimensions.product  > 0) reasons.push(`Matches your product type`)
  if (dimensions.mood     > 0) reasons.push(`Strong mood alignment (${track.mood || ''})`)
  if (dimensions.style    > 0) reasons.push(`Built for ${track.visual_style_fit?.[0] || 'this'} visual style`)
  if (dimensions.platform > 0) reasons.push(`Optimised for ${(track.platform_fit || []).slice(0,2).join(' & ')}`)
  if (dimensions.goal     > 0) reasons.push(`Designed for ${(track.campaign_fit || []).slice(0,2).join(' & ')} campaigns`)
  if (track.luxury_score  >= 8) reasons.push(`High luxury score — premium feel`)
  if (track.hook_strength >= 8) reasons.push(`Strong opening hook`)
  if (track.drop_strength >= 8) reasons.push(`Powerful drop moment for reveals`)
  return reasons.slice(0, 3).join('. ') || 'Good general match for this ad.'
}

// ─────────────────────────────────────────────────────────────
// recommendMusicForAd — main export
// Returns top 5 tracks with matchScore (0–100) and reasons
// ─────────────────────────────────────────────────────────────
export function recommendMusicForAd(adConfig = {}, tracks = []) {
  const productName  = String(adConfig.productName    || '').toLowerCase()
  const targetMood   = String(adConfig.targetMood     || '').toLowerCase()
  const visualStyle  = String(adConfig.adStyle        || '').toLowerCase()
  const platform     = String(adConfig.adPlatform     || adConfig.platform || '').toLowerCase()
  const campaignGoal = String(adConfig.platformGoal   || '').toLowerCase()
  const brandVoice   = String(adConfig.brandVoice     || '').toLowerCase()

  // Resolve product type tags from product name
  const productTags = []
  Object.entries(PRODUCT_TYPE_MAP).forEach(([keyword, tags]) => {
    if (productName.includes(keyword)) tags.forEach(t => productTags.push(t))
  })

  // Resolve mood tags — expand each mood word
  const moodWords = targetMood.split(/[,/\s]+/).filter(Boolean)
  const moodTags  = []
  moodWords.forEach(word => {
    const expanded = MOOD_EXPAND[word.trim()]
    if (expanded) expanded.forEach(t => moodTags.push(t))
    else moodTags.push(word.trim())
  })
  // Also expand brand voice
  const voiceExpanded = MOOD_EXPAND[brandVoice]
  if (voiceExpanded) voiceExpanded.forEach(t => moodTags.push(t))

  // Resolve style, platform, goal tags
  const styleTags    = VISUAL_STYLE_MAP[visualStyle] || [visualStyle]
  const platformTags = PLATFORM_MAP[platform]        || [platform]
  const goalTags     = GOAL_MAP[campaignGoal]        || [campaignGoal]

  return tracks
    .map(track => {
      const d = {
        product:  matchArray(track.product_fit,      productTags,  20),
        mood:     Math.min(matchArray(track.mood_fit, moodTags,    12), 36), // cap at 3 mood matches
        style:    matchArray(track.visual_style_fit,  styleTags,    12),
        platform: matchArray(track.platform_fit,      platformTags, 10),
        goal:     matchArray(track.campaign_fit,      goalTags,     10),
      }

      let score = d.product + d.mood + d.style + d.platform + d.goal

      // Quality scores contribute less than contextual matching
      score += Math.round(Number(track.commercial_score || 0) * 0.6)
      score += Math.round(Number(track.hook_strength    || 0) * 0.4)

      // Goal-specific bonuses
      if (campaignGoal === 'sales')     score += Number(track.drop_strength   || 0)
      if (campaignGoal === 'luxury')    score += Number(track.luxury_score    || 0)
      if (campaignGoal === 'leads')     score += Number(track.emotional_depth || 0)
      if (campaignGoal === 'retargeting') score += Number(track.emotional_depth || 0)

      // Mood-specific bonuses
      if (moodTags.includes('luxury'))  score += Number(track.luxury_score    || 0)
      if (moodTags.includes('emotional')) score += Number(track.emotional_depth || 0)

      const matchScore = Math.min(100, Math.round(score))
      const whyFits    = buildMatchReasons(track, d)

      return { ...track, matchScore, whyFits, _dimensions: d }
    })
    .filter(t => t.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5)
}

// ─────────────────────────────────────────────────────────────
// formatTime — mm:ss display helper
// ─────────────────────────────────────────────────────────────
export function formatTime(seconds) {
  if (seconds == null) return '—'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

// ─────────────────────────────────────────────────────────────
// getMatchGrade — letter grade from match score
// ─────────────────────────────────────────────────────────────
export function getMatchGrade(score) {
  if (score >= 85) return { grade: 'Perfect Match',  color: '#4a9a6a' }
  if (score >= 65) return { grade: 'Strong Match',   color: '#c8a84b' }
  if (score >= 40) return { grade: 'Good Match',     color: '#c8843a' }
  return               { grade: 'Possible Match', color: '#8a8680' }
}
