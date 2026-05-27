// Orchestration intelligence layer — maps type + goal + style to full engine parameters.
// Bridge to Life Campaign Orchestration Engine™ via lifeEngineWorldId.

// Maps Instant world slugs → Life Engine world IDs
const WORLD_BRIDGE = {
  minimal_studio:   'urban_apartment',
  lifestyle_home:   'coastal_house',
  urban_street:     'urban_apartment',
  urban_coffee:     'urban_apartment',
  urban_office:     'london_penthouse',
  outdoor_nature:   'countryside_estate',
  gym:              'urban_apartment',
  luxury_hotel:     'luxury_penthouse',
  penthouse:        'luxury_penthouse',
  yacht:            'monaco',
}

const TYPE_PROFILES = {
  product: {
    worlds: ['minimal_studio', 'lifestyle_home'],
    brandVoice: 'professional', hookType: 'pain',
    contextHint: 'physical product or consumer good',
  },
  ecommerce: {
    worlds: ['minimal_studio', 'lifestyle_home', 'urban_street'],
    brandVoice: 'direct', hookType: 'desire',
    contextHint: 'ecommerce store or online retail brand',
  },
  personal_brand: {
    worlds: ['urban_coffee', 'outdoor_nature', 'lifestyle_home'],
    brandVoice: 'authentic', hookType: 'curiosity',
    contextHint: 'personal brand or thought leader',
  },
  fitness: {
    worlds: ['gym', 'outdoor_nature'],
    brandVoice: 'motivational', hookType: 'transformation',
    contextHint: 'fitness brand, trainer, or wellness product',
  },
  coaching: {
    worlds: ['luxury_hotel', 'urban_office', 'lifestyle_home'],
    brandVoice: 'authoritative', hookType: 'curiosity',
    contextHint: 'coaching or consulting service',
  },
  creator: {
    worlds: ['urban_coffee', 'lifestyle_home', 'outdoor_nature'],
    brandVoice: 'authentic', hookType: 'viral',
    contextHint: 'content creator or influencer',
  },
  fashion: {
    worlds: ['luxury_hotel', 'urban_street', 'penthouse'],
    brandVoice: 'aspirational', hookType: 'desire',
    contextHint: 'fashion brand or clothing line',
  },
  saas: {
    worlds: ['urban_office', 'minimal_studio'],
    brandVoice: 'authoritative', hookType: 'pain',
    contextHint: 'software product or SaaS tool',
  },
  luxury: {
    worlds: ['penthouse', 'luxury_hotel', 'yacht'],
    brandVoice: 'premium', hookType: 'desire',
    contextHint: 'luxury brand or premium product',
  },
  agency: {
    worlds: ['urban_office', 'luxury_hotel'],
    brandVoice: 'authoritative', hookType: 'pain',
    contextHint: 'agency or professional services business',
  },
  local_business: {
    worlds: ['urban_street', 'lifestyle_home'],
    brandVoice: 'friendly', hookType: 'pain',
    contextHint: 'local business serving a community',
  },
  subscription: {
    worlds: ['lifestyle_home', 'minimal_studio'],
    brandVoice: 'friendly', hookType: 'desire',
    contextHint: 'subscription service or membership product',
  },
  app: {
    worlds: ['urban_street', 'minimal_studio'],
    brandVoice: 'innovative', hookType: 'curiosity',
    contextHint: 'mobile app or software application',
  },
}

const GOAL_PROFILES = {
  sales: {
    platform: 'instagram', platformGoal: 'sales', pricePoint: 'mid-ticket',
    hookEmphasis: 'pain and desire hooks, direct CTA, urgency framing',
  },
  leads: {
    platform: 'meta', platformGoal: 'leads', pricePoint: 'mid-ticket',
    hookEmphasis: 'curiosity hooks, soft CTA, lead magnet framing',
  },
  followers: {
    platform: 'tiktok', platformGoal: 'engagement', pricePoint: 'free',
    hookEmphasis: 'viral hooks, relatable moments, community CTA',
  },
  brand_awareness: {
    platform: 'instagram', platformGoal: 'awareness', pricePoint: 'premium',
    hookEmphasis: 'emotional storytelling, aspirational brand narrative',
  },
  app_installs: {
    platform: 'meta', platformGoal: 'app_installs', pricePoint: 'free',
    hookEmphasis: 'curiosity hooks, social proof, instant value demonstration',
  },
  creator_growth: {
    platform: 'tiktok', platformGoal: 'engagement', pricePoint: 'free',
    hookEmphasis: 'viral personality-first hooks, relatable content',
  },
  high_ticket: {
    platform: 'instagram', platformGoal: 'leads', pricePoint: 'high-ticket',
    hookEmphasis: 'desire and exclusivity hooks, aspiration-driven narrative',
  },
  viral_reach: {
    platform: 'tiktok', platformGoal: 'engagement', pricePoint: 'free',
    hookEmphasis: 'pattern interrupt, shock value, shareable emotional hooks',
  },
  premium_positioning: {
    platform: 'instagram', platformGoal: 'awareness', pricePoint: 'premium',
    hookEmphasis: 'desire and status hooks, exclusivity and elevation narrative',
  },
}

const STYLE_PROFILES = {
  luxury: {
    adStyle: 'luxury', targetMood: 'aspirational', toneOverride: 'premium',
    visualDirection: 'cinematic luxury environments, soft golden light, exclusive settings',
  },
  cinematic: {
    adStyle: 'cinematic', targetMood: 'cinematic', toneOverride: null,
    visualDirection: 'editorial photography, dramatic lighting, story-driven composition',
  },
  ugc: {
    adStyle: 'ugc', targetMood: 'authentic', toneOverride: 'authentic',
    visualDirection: 'handheld natural light, real-life settings, creator-style authenticity',
  },
  emotional: {
    adStyle: 'emotional', targetMood: 'emotional', toneOverride: null,
    visualDirection: 'warm intimate tones, human connection, quiet powerful moments',
  },
  viral: {
    adStyle: 'viral', targetMood: 'high_energy', toneOverride: null,
    visualDirection: 'fast cuts, bold text overlays, pattern interrupts, meme-aware energy',
  },
  dark_luxury: {
    adStyle: 'dark_luxury', targetMood: 'dark', toneOverride: 'premium',
    visualDirection: 'deep shadows, moody contrast, high-fashion editorial, dark opulent settings',
  },
  high_energy: {
    adStyle: 'high_energy', targetMood: 'high_energy', toneOverride: 'motivational',
    visualDirection: 'dynamic angles, high contrast, movement and kinetic energy',
  },
  soft_feminine: {
    adStyle: 'soft_feminine', targetMood: 'soft', toneOverride: 'authentic',
    visualDirection: 'pastel tones, soft diffused light, feminine aesthetic, organic textures',
  },
  corporate_authority: {
    adStyle: 'corporate', targetMood: 'authoritative', toneOverride: 'authoritative',
    visualDirection: 'clean professional settings, confident composition, authority framing',
  },
  fitness_motivation: {
    adStyle: 'fitness', targetMood: 'high_energy', toneOverride: 'motivational',
    visualDirection: 'athletic environments, sweat and effort, transformation energy',
  },
  high_status: {
    adStyle: 'high_status', targetMood: 'aspirational', toneOverride: 'premium',
    visualDirection: 'premium environments, status symbols, exclusive curated settings',
  },
  aspirational_lifestyle: {
    adStyle: 'aspirational', targetMood: 'aspirational', toneOverride: null,
    visualDirection: 'dream lifestyle imagery, travel, freedom, success and abundance',
  },
}

export function orchestrate(type, goal, style, productName) {
  const typeProfile  = TYPE_PROFILES[type]   || TYPE_PROFILES.product
  const goalProfile  = GOAL_PROFILES[goal]   || GOAL_PROFILES.sales
  const styleProfile = STYLE_PROFILES[style] || STYLE_PROFILES.cinematic

  const brandVoice = styleProfile.toneOverride || typeProfile.brandVoice

  const contextLines = [
    `Product/Creator: ${productName}`,
    `Type: ${typeProfile.contextHint}`,
    `Campaign Goal: ${goal.replace(/_/g, ' ')} — ${goalProfile.hookEmphasis}`,
    `Visual Style: ${style.replace(/_/g, ' ')} — ${styleProfile.visualDirection}`,
    `Platform: ${goalProfile.platform}`,
    `Brand Tone: ${brandVoice}`,
    `Hook Style: ${typeProfile.hookType}`,
    `Suggested World: ${typeProfile.worlds[0]}`,
  ]

  const suggestedWorld = typeProfile.worlds[0]
  const lifeEngineWorldId = WORLD_BRIDGE[suggestedWorld] || 'luxury_penthouse'
  const lifeEngineDayType = type === 'fitness' ? 'fitness_day'
    : type === 'creator' || type === 'personal_brand' ? 'creator_day'
    : goal === 'brand_awareness' || goal === 'premium_positioning' ? 'travel_world'
    : 'ad_campaign_day'

  return {
    context: contextLines.join('\n'),
    platform: goalProfile.platform,
    hookType: typeProfile.hookType,
    suggestedWorld,
    lifeEngineWorldId,
    lifeEngineDayType,
    summary: `${style.replace(/_/g, ' ')} ${type.replace(/_/g, ' ')} campaign — ${goal.replace(/_/g, ' ')} — ${goalProfile.platform}`,
    adConfig: {
      productName,
      platform:     goalProfile.platform,
      platformGoal: goalProfile.platformGoal,
      brandVoice,
      adStyle:      styleProfile.adStyle,
      targetMood:   styleProfile.targetMood,
      pricePoint:   goalProfile.pricePoint,
      hookType:     typeProfile.hookType,
      visualStyle:  styleProfile.visualDirection,
      suggestedWorld: typeProfile.worlds[0],
      instantMode:  true,
      instantType:  type,
      instantGoal:  goal,
      instantStyle: style,
    },
  }
}
