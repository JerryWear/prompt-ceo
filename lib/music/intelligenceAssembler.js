// lib/music/intelligenceAssembler.js
// Pure functions for assembling AI Music Director intelligence from user signals.
// No imports from Next.js, Supabase, or React. All functions are stateless and side-effect-free.

// ─── Goal → music profile ─────────────────────────────────────────────────────

const GOAL_MUSIC_MAP = {
  founder:     { mood: 'luxury,professional,confident', energy: 'medium',       bpmRange: '85–110',  label: 'Founder Update'   },
  demo:        { mood: 'professional',                  energy: 'medium',       bpmRange: '90–120',  label: 'Product Demo'     },
  tutorial:    { mood: 'calm,focused',                  energy: 'low',          bpmRange: '70–100',  label: 'Tutorial'         },
  launch:      { mood: 'energetic,motivational,bold',   energy: 'high',         bpmRange: '120–150', label: 'Launch Ad'        },
  ugc:         { mood: 'energetic,upbeat,trendy',       energy: 'high',         bpmRange: '120–145', label: 'UGC Ad'           },
  edu:         { mood: 'calm,friendly,warm',            energy: 'low',          bpmRange: '70–95',   label: 'Educational'      },
  sales:       { mood: 'bold,energetic,powerful',       energy: 'high',         bpmRange: '115–145', label: 'Sales'            },
  awareness:   { mood: 'aspirational,inspirational',    energy: 'medium',       bpmRange: '90–120',  label: 'Awareness'        },
  leads:       { mood: 'warm,friendly,emotional',       energy: 'medium',       bpmRange: '85–110',  label: 'Lead Gen'         },
  retargeting: { mood: 'calm,emotional,warm',           energy: 'low',          bpmRange: '75–105',  label: 'Retargeting'      },
}

const STYLE_BRAND_VOICE_MAP = {
  lifestyle: 'aspirational', editorial: 'luxury', cinematic: 'cinematic',
  minimal:   'clean',        ugc:       'friendly', creator:  'warm',
  premium:   'luxury',       bold:      'bold',
}

const GOAL_COLLECTION_MAP = {
  founder:     { collectionId: 'founder_authority',   collectionLabel: 'Founder Authority'   },
  demo:        { collectionId: 'product_launch',      collectionLabel: 'Product Launch'      },
  tutorial:    { collectionId: 'educational_content', collectionLabel: 'Educational Content' },
  launch:      { collectionId: 'product_launch',      collectionLabel: 'Product Launch'      },
  ugc:         { collectionId: 'ugc_ads',             collectionLabel: 'UGC Ads'             },
  edu:         { collectionId: 'educational_content', collectionLabel: 'Educational Content' },
  sales:       { collectionId: 'product_launch',      collectionLabel: 'Product Launch'      },
  awareness:   { collectionId: 'founder_authority',   collectionLabel: 'Founder Authority'   },
  leads:       { collectionId: 'founder_authority',   collectionLabel: 'Founder Authority'   },
  retargeting: { collectionId: 'luxury_brand',        collectionLabel: 'Luxury Brand'        },
}

export const PLATFORM_LABELS = {
  linkedin: 'LinkedIn', instagram: 'Instagram', tiktok: 'TikTok',
  youtube: 'YouTube', meta: 'Meta', facebook: 'Facebook',
  youtube_shorts: 'YouTube Shorts', shopify: 'Shopify',
}

// ─── Collection definitions ───────────────────────────────────────────────────

export const COLLECTION_DEFINITIONS = [
  {
    id: 'founder_authority', label: 'Founder Authority', emoji: '👤',
    description: 'Professional · Confident · LinkedIn authority',
    platforms: ['LinkedIn', 'YouTube'],
    filterMood: null, filterEnergy: null,
    match: t => (t.campaign_fit || []).some(f => ['founder','awareness','leads'].includes(f)) || ['Professional','Confident','Motivational'].includes(t.mood),
  },
  {
    id: 'product_launch', label: 'Product Launch', emoji: '🚀',
    description: 'Energetic · High impact · Reveal moments',
    platforms: ['Meta', 'Instagram', 'TikTok'],
    filterMood: null, filterEnergy: null,
    match: t => (t.campaign_fit || []).some(f => ['sales','launch','traffic'].includes(f)) || (t.drop_strength || 0) >= 7,
  },
  {
    id: 'luxury_brand', label: 'Luxury Brand', emoji: '✦',
    description: 'Cinematic · Premium · High perceived value',
    platforms: ['Instagram', 'YouTube'],
    filterMood: 'Cinematic', filterEnergy: null,
    match: t => (t.luxury_score || 0) >= 6 || t.mood === 'Cinematic',
  },
  {
    id: 'ugc_ads', label: 'UGC Ads', emoji: '🎥',
    description: 'High energy · Fast BPM · Creator-native',
    platforms: ['TikTok', 'Instagram', 'Meta'],
    filterMood: null, filterEnergy: 'high',
    match: t => (t.energy || '').toLowerCase() === 'high' && (t.bpm || 0) >= 120,
  },
  {
    id: 'fitness_domination', label: 'Fitness Content', emoji: '💪',
    description: 'Powerful · 125+ BPM · High drive',
    platforms: ['TikTok', 'Instagram'],
    filterMood: null, filterEnergy: 'medium-high',
    match: t => ['high','medium-high'].includes((t.energy || '').toLowerCase()) && (t.bpm || 0) >= 125,
  },
  {
    id: 'educational_content', label: 'Educational', emoji: '🎓',
    description: 'Focused · Low energy · Non-distracting',
    platforms: ['YouTube', 'LinkedIn'],
    filterMood: 'Focused', filterEnergy: null,
    match: t => (t.campaign_fit || []).includes('awareness') || t.mood === 'Focused' || (t.energy || '').toLowerCase() === 'low',
  },
  {
    id: 'podcast_content', label: 'Podcast', emoji: '🎙',
    description: 'Calm · Understated · Background-safe',
    platforms: ['YouTube', 'LinkedIn'],
    filterMood: null, filterEnergy: 'low',
    match: t => (t.energy || '').toLowerCase() === 'low' && (t.bpm || 0) < 100,
  },
  {
    id: 'viral_short_form', label: 'Viral Short Form', emoji: '⚡',
    description: '128+ BPM · Strong hook · Maximum energy',
    platforms: ['TikTok', 'Instagram Reels'],
    filterMood: null, filterEnergy: 'high',
    match: t => (t.bpm || 0) >= 128 && (t.energy || '').toLowerCase() === 'high' && (t.hook_strength || 0) >= 7,
  },
]

// ─── Core exports ─────────────────────────────────────────────────────────────

export function deriveUserProfile(campaignMemory, performanceInsights, usageLogs) {
  const topGoals     = campaignMemory?.topGoals     || []
  const topPlatforms = campaignMemory?.topPlatforms || []
  const topStyles    = campaignMemory?.topStyles    || []
  const patternTotal = campaignMemory?.total        || 0

  const perfPlatforms = performanceInsights?.ready ? (performanceInsights?.topPlatforms || []) : []
  const primaryPlatformRaw =
    perfPlatforms[0]?.key ||
    topPlatforms[0]?.id  ||
    null

  const primaryPlatform = (primaryPlatformRaw && primaryPlatformRaw !== 'null')
    ? primaryPlatformRaw.replace('youtube_shorts', 'youtube')
    : null
  const primaryGoal     = topGoals[0]?.id  || null
  const primaryStyle    = topStyles[0]?.id || null

  const moodCounts = {}
  ;(usageLogs || []).forEach(log => {
    const mood = log.music_tracks?.mood
    if (mood) moodCounts[mood] = (moodCounts[mood] || 0) + 1
  })
  const mostUsedMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || null

  let confidence, confidenceLabel
  if (patternTotal === 0) {
    confidence = 0.50; confidenceLabel = 'Getting to know you'
  } else if (patternTotal <= 5) {
    confidence = 0.65; confidenceLabel = 'Building your profile'
  } else if (patternTotal <= 20) {
    confidence = 0.82; confidenceLabel = 'Strong match'
  } else {
    confidence = 0.94; confidenceLabel = 'Highly personalised'
  }

  return {
    primaryPlatform,
    primaryGoal,
    primaryStyle,
    mostUsedMood,
    confidence,
    confidenceLabel,
    derivedFrom: patternTotal > 0
      ? `${patternTotal} campaign pattern${patternTotal === 1 ? '' : 's'}`
      : 'recent activity',
    hasEnoughData: patternTotal > 0 || (usageLogs?.length || 0) > 0,
  }
}

export function buildAdConfig(userProfile) {
  const goal    = userProfile.primaryGoal  || 'awareness'
  const style   = userProfile.primaryStyle || 'lifestyle'
  const profile = GOAL_MUSIC_MAP[goal]     || GOAL_MUSIC_MAP.awareness

  return {
    platform:     userProfile.primaryPlatform || 'instagram',
    platformGoal: goal,
    adStyle:      style,
    targetMood:   profile.mood,
    brandVoice:   STYLE_BRAND_VOICE_MAP[style] || 'aspirational',
    productName:  '',
  }
}

export function selectHeroCollection(userProfile) {
  const goal       = userProfile.primaryGoal
  const mapped     = goal ? GOAL_COLLECTION_MAP[goal] : null
  const confidence = Math.round(userProfile.confidence * 100)

  if (!mapped) {
    return {
      collectionId:    'founder_authority',
      collectionLabel: 'Founder Authority',
      reason:          'A strong starting point for professional content creators.',
      confidence,
    }
  }

  const platformLabel = userProfile.primaryPlatform
    ? (PLATFORM_LABELS[userProfile.primaryPlatform] || userProfile.primaryPlatform)
    : null
  const goalLabel = GOAL_MUSIC_MAP[goal]?.label || goal
  const reason    = platformLabel
    ? `Your recent campaigns focus on ${goalLabel.toLowerCase()} content for ${platformLabel}.`
    : `Your recent campaigns focus on ${goalLabel.toLowerCase()} content.`

  return { collectionId: mapped.collectionId, collectionLabel: mapped.collectionLabel, reason, confidence }
}

export function computeCollectionStats(tracks) {
  return COLLECTION_DEFINITIONS.map(col => {
    const matching = (tracks || []).filter(col.match)
    const moods    = [...new Set(matching.map(t => t.mood).filter(Boolean))].slice(0, 3)
    return {
      id:          col.id,
      label:       col.label,
      emoji:       col.emoji,
      description: col.description,
      platforms:   col.platforms,
      filterMood:  col.filterMood,
      filterEnergy:col.filterEnergy,
      trackCount:  matching.length,
      moodProfile: moods,
    }
  })
}

export function computeMetrics(tracks, usageLogs, userProfile, topRecommendedTrack) {
  const totalTracks    = (tracks || []).length
  const licensedIds    = new Set((usageLogs || []).filter(l => l.action === 'licensed').map(l => l.track_id))
  const licensedByUser = licensedIds.size

  const moodCounts = {}
  ;(usageLogs || []).forEach(log => {
    const mood = log.music_tracks?.mood
    if (mood) moodCounts[mood] = (moodCounts[mood] || 0) + 1
  })
  const mostUsedMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || null

  const topPlatform = userProfile?.primaryPlatform
    ? (PLATFORM_LABELS[userProfile.primaryPlatform] || userProfile.primaryPlatform)
    : null

  const usedTrackIds = new Set((usageLogs || []).map(l => l.track_id))
  const usedTracks   = (tracks || []).filter(t => usedTrackIds.has(t.id))
  let bestBpmRange = null
  if (usedTracks.length >= 2) {
    const bpms = usedTracks.map(t => t.bpm || 0).filter(b => b > 0).sort((a, b) => a - b)
    bestBpmRange = `${bpms[0]}–${bpms[bpms.length - 1]} BPM`
  } else if (userProfile?.primaryGoal && GOAL_MUSIC_MAP[userProfile.primaryGoal]) {
    bestBpmRange = GOAL_MUSIC_MAP[userProfile.primaryGoal].bpmRange + ' BPM'
  }

  return {
    totalTracks,
    licensedByUser,
    mostUsedMood,
    topPlatform,
    bestBpmRange,
    mostRecommendedTrack: topRecommendedTrack?.title || null,
  }
}

export function buildReasoningChain(campaignMemory, userProfile, topTrack) {
  const chain = []
  const total = campaignMemory?.total || 0

  if (total > 0) {
    chain.push(
      `Campaign memory: ${total} pattern${total === 1 ? '' : 's'}, ` +
      `primary goal = ${userProfile.primaryGoal || 'unknown'}, ` +
      `primary platform = ${userProfile.primaryPlatform || 'unknown'}`
    )
  } else {
    chain.push('No campaign history yet — using default profile for recommendations')
  }

  if (userProfile.primaryGoal && GOAL_MUSIC_MAP[userProfile.primaryGoal]) {
    const p = GOAL_MUSIC_MAP[userProfile.primaryGoal]
    chain.push(`Derived music profile: ${p.mood} mood, ${p.energy} energy, ${p.bpmRange} BPM`)
  }

  if (topTrack) {
    chain.push(`Top track scored ${topTrack.matchScore}/100: ${topTrack.whyFits || 'good general match'}`)
  }

  return chain
}
