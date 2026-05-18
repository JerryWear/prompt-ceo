// ─────────────────────────────────────────────────────────────
// Ad Psychology Engine
// Defines the 10 core psychological angles used across all
// ad generation: hooks, captions, image prompts, video prompts,
// UGC scripts, and campaign builders.
// ─────────────────────────────────────────────────────────────

export const AD_PSYCHOLOGY_ANGLES = {
  transformation: {
    label: 'Transformation',
    focus: 'before and after, identity shift, becoming better',
    hookVerbs: ['went from', 'changed everything', 'finally became', 'stopped being'],
    emotionalCore: 'hope and identity desire',
    bestFor: ['beauty', 'fitness', 'education', 'coaching', 'supplements'],
  },

  painRelief: {
    label: 'Pain Relief',
    focus: 'frustration, problem, discomfort, urgency',
    hookVerbs: ['tired of', 'stop struggling with', 'the real reason', 'sick of'],
    emotionalCore: 'frustration and desperation',
    bestFor: ['health', 'finance', 'productivity', 'sleep', 'relationships'],
  },

  aspiration: {
    label: 'Aspiration',
    focus: 'dream lifestyle, confidence, status, beauty, freedom',
    hookVerbs: ['imagine', 'what if', 'picture yourself', 'this is what'],
    emotionalCore: 'desire and identity elevation',
    bestFor: ['fashion', 'travel', 'luxury', 'lifestyle', 'fitness'],
  },

  authority: {
    label: 'Authority',
    focus: 'expertise, trust, proof, credibility',
    hookVerbs: ['after 10 years', 'the secret most', 'what nobody tells you', 'the truth about'],
    emotionalCore: 'trust and certainty',
    bestFor: ['coaching', 'finance', 'education', 'health', 'tech'],
  },

  socialProof: {
    label: 'Social Proof',
    focus: 'others are using it, reviews, popularity, results',
    hookVerbs: ['over 50,000 people', 'everyone is switching to', 'why women are', 'the reason'],
    emotionalCore: 'belonging and validation',
    bestFor: ['ecommerce', 'apps', 'food', 'beauty', 'supplements'],
  },

  urgency: {
    label: 'Urgency',
    focus: 'limited time, do not wait, act now',
    hookVerbs: ['last chance', 'only until', 'ending soon', 'do not miss'],
    emotionalCore: 'fear of missing out',
    bestFor: ['ecommerce', 'events', 'launches', 'offers', 'courses'],
  },

  emotional: {
    label: 'Emotional',
    focus: 'deep personal connection, belief, desire, identity',
    hookVerbs: ['this is for', 'if you have ever', 'you deserve', 'the woman who'],
    emotionalCore: 'deep personal resonance',
    bestFor: ['beauty', 'wellness', 'coaching', 'fashion', 'gifting'],
  },

  luxuryStatus: {
    label: 'Luxury Status',
    focus: 'premium, high-end, exclusive, elevated lifestyle',
    hookVerbs: ['for the woman who', 'not for everyone', 'reserved for', 'the difference between'],
    emotionalCore: 'status and exclusivity',
    bestFor: ['luxury goods', 'premium beauty', 'fashion', 'travel', 'fine dining'],
  },

  simplicity: {
    label: 'Simplicity',
    focus: 'easy, fast, effortless, clear solution',
    hookVerbs: ['in 60 seconds', 'one step', 'no more', 'the easiest way to'],
    emotionalCore: 'relief and ease',
    bestFor: ['tech', 'productivity', 'food', 'cleaning', 'parenting'],
  },

  discipline: {
    label: 'Discipline',
    focus: 'consistency, action, self-respect, no excuses',
    hookVerbs: ['you already know', 'stop waiting', 'the only thing', 'real results require'],
    emotionalCore: 'self-respect and ambition',
    bestFor: ['fitness', 'supplements', 'coaching', 'finance', 'men'],
  },
}

// ─────────────────────────────────────────────────────────────
// Brand Voice Options
// ─────────────────────────────────────────────────────────────

export const BRAND_VOICE_OPTIONS = [
  { value: 'luxury',      label: 'Luxury',      desc: 'Premium, exclusive, elevated' },
  { value: 'bold',        label: 'Bold',         desc: 'Direct, confident, high energy' },
  { value: 'emotional',   label: 'Emotional',    desc: 'Deep, personal, heartfelt' },
  { value: 'clean',       label: 'Clean',        desc: 'Minimal, clear, modern' },
  { value: 'aggressive',  label: 'Aggressive',   desc: 'Urgent, direct, no-nonsense' },
  { value: 'feminine',    label: 'Feminine',     desc: 'Soft, aspirational, beautiful' },
  { value: 'premium',     label: 'Premium',      desc: 'Refined, quality-first, selective' },
  { value: 'friendly',    label: 'Friendly',     desc: 'Warm, relatable, community feel' },
]

// ─────────────────────────────────────────────────────────────
// Price Point Options
// ─────────────────────────────────────────────────────────────

export const PRICE_POINT_OPTIONS = [
  { value: 'low-ticket',  label: 'Low Ticket',  desc: 'Under $50 — impulse buy' },
  { value: 'mid-ticket',  label: 'Mid Ticket',  desc: '$50–$300 — considered buy' },
  { value: 'premium',     label: 'Premium',     desc: '$300–$1000 — aspirational buy' },
  { value: 'luxury',      label: 'Luxury',      desc: '$1000+ — status buy' },
]

// ─────────────────────────────────────────────────────────────
// Platform Goal Options
// ─────────────────────────────────────────────────────────────

export const PLATFORM_GOAL_OPTIONS = [
  { value: 'awareness',    label: 'Awareness',    desc: 'Reach new audiences' },
  { value: 'traffic',      label: 'Traffic',      desc: 'Drive to website or link' },
  { value: 'leads',        label: 'Leads',        desc: 'Collect emails or DMs' },
  { value: 'sales',        label: 'Sales',        desc: 'Direct conversion' },
  { value: 'retargeting',  label: 'Retargeting',  desc: 'Re-engage warm audiences' },
]

// ─────────────────────────────────────────────────────────────
// Competitor / Inspired Style Engine
// ─────────────────────────────────────────────────────────────

export const INSPIRED_STYLES = {
  apple: {
    label: 'Apple',
    tone: 'minimal, pure, revolutionary',
    camera: 'white void, product hero, macro detail',
    lighting: 'clean studio white, no shadows',
    captionStyle: 'one line. no fluff. product name.',
    ctaStrength: 'soft',
    visualPacing: 'slow and deliberate',
  },
  nike: {
    label: 'Nike',
    tone: 'motivational, bold, action-forward',
    camera: 'low angle, movement blur, athlete in environment',
    lighting: 'high contrast, dramatic, natural outdoor',
    captionStyle: 'short. powerful. imperative.',
    ctaStrength: 'strong',
    visualPacing: 'fast and energetic',
  },
  gymshark: {
    label: 'Gymshark',
    tone: 'fitness community, real bodies, aspirational',
    camera: 'gym environment, lifestyle movement, body-forward',
    lighting: 'gym lighting, harsh but flattering',
    captionStyle: 'community-first, inclusive, motivating',
    ctaStrength: 'medium',
    visualPacing: 'medium, rhythm-driven',
  },
  alo: {
    label: 'Alo Yoga',
    tone: 'wellness luxury, spiritual, clean living',
    camera: 'natural light, studio or outdoor, body-aware',
    lighting: 'soft diffused natural, golden hour',
    captionStyle: 'aspirational, mindful, elevated',
    ctaStrength: 'soft',
    visualPacing: 'slow and breathable',
  },
  dior: {
    label: 'Dior',
    tone: 'fashion luxury, heritage, feminine power',
    camera: 'editorial, architectural, high-fashion framing',
    lighting: 'controlled studio, Parisian daylight',
    captionStyle: 'one word. one feeling. brand name.',
    ctaStrength: 'none — the image is the message',
    visualPacing: 'very slow, cinematic',
  },
  skims: {
    label: 'Skims',
    tone: 'body confidence, inclusive, clean luxury',
    camera: 'studio white or neutral, body-forward, clean',
    lighting: 'even, flattering, skin-accurate',
    captionStyle: 'body-positive, direct, no-filter honest',
    ctaStrength: 'medium',
    visualPacing: 'calm and confident',
  },
  redbull: {
    label: 'Red Bull',
    tone: 'extreme energy, action sports, adrenaline',
    camera: 'action POV, wide environmental, extreme sport',
    lighting: 'natural dramatic, blue hour, high contrast',
    captionStyle: 'short. punchy. claim-based.',
    ctaStrength: 'very strong',
    visualPacing: 'extremely fast',
  },
  tesla: {
    label: 'Tesla',
    tone: 'futuristic, innovation, quiet superiority',
    camera: 'clean environment, product-forward, minimal people',
    lighting: 'sleek, controlled, reflective surfaces',
    captionStyle: 'product spec as poetry. technical beauty.',
    ctaStrength: 'none — product sells itself',
    visualPacing: 'slow and precise',
  },
}
