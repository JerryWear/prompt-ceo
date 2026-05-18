// ─────────────────────────────────────────────────────────────
// Competitor Style Engine — "Inspired Style Direction"
// Applies a brand's creative DNA to your ad output.
// Does not copy — it translates the visual and tonal
// principles of reference brands into your own product context.
// ─────────────────────────────────────────────────────────────

export const INSPIRED_STYLE_PROFILES = {
  apple: {
    id: 'apple',
    label: 'Apple',
    tagline: 'Minimal. Pure. Revolutionary.',
    tone: 'clean, minimalist, product-as-art, one powerful claim',
    camera: 'white void or pure environment, macro product detail, extreme close-up',
    lighting: 'clean studio white, no harsh shadows, product glows from within',
    captionStyle: 'one line. lowercase optional. the product speaks. no adjectives.',
    visualPacing: 'very slow — one frame, one idea',
    ctaStrength: 'whisper — "buy", "learn more". Trust is the CTA.',
    colorPalette: 'white, silver, black, one accent color from the product',
    avoidList: ['clutter', 'too many words', 'busy backgrounds', 'emotion-first copy', 'discounts'],
    promptModifier: 'Apply an Apple-inspired aesthetic: ultra-clean white or neutral studio environment, extreme product precision, minimal composition, no human emotion visible unless it is the product being used in perfect hands. Every element intentional.',
  },

  nike: {
    id: 'nike',
    label: 'Nike',
    tagline: 'Motivational. Bold. Action.',
    tone: 'powerful, motivational, action-first, imperative verbs',
    camera: 'low angle upward tilt, athlete in motion, environmental grandeur',
    lighting: 'high contrast, dramatic natural or stadium light, golden hour or dark drama',
    captionStyle: 'short. powerful. one verb. "Just do it" energy.',
    visualPacing: 'fast cuts in video, single defining image in static',
    ctaStrength: 'very strong — "Do it", "Get moving", "Start now"',
    colorPalette: 'bold black, white, and one vibrant color — no pastels',
    avoidList: ['weakness language', 'soft aesthetics', 'passive voice', 'long explanations'],
    promptModifier: 'Apply Nike creative energy: dramatic low-angle shot, human in peak physical action or determination, high-contrast dramatic lighting, environment feels epic and vast, the subject conquers the frame.',
  },

  gymshark: {
    id: 'gymshark',
    label: 'Gymshark',
    tagline: 'Fitness community. Real bodies. Aspirational.',
    tone: 'inclusive, motivational, community-driven, real not perfect',
    camera: 'gym or outdoor training, body-forward angles, natural movement',
    lighting: 'gym lighting or outdoor natural, not overly polished',
    captionStyle: 'community-first, aspirational but relatable, "we not they"',
    visualPacing: 'medium — rhythm-driven, synced to music energy',
    ctaStrength: 'medium — "Join us", "Shop the drop", "Train with us"',
    colorPalette: 'dark navy, charcoal, bold accent colors, clean contrast',
    avoidList: ['unattainable perfection', 'isolation', 'corporate fitness language', 'exclusivity'],
    promptModifier: 'Apply Gymshark energy: real athletic body in motion inside a gym or outdoor training environment, natural movement not posed, authentic lighting, clothes visible and functional, the subject is in their element.',
  },

  dior: {
    id: 'dior',
    label: 'Dior',
    tagline: 'Fashion luxury. Heritage. Feminine power.',
    tone: 'one word, one feeling — luxury speaks through silence',
    camera: 'architectural, editorial, subject often small in grand space',
    lighting: 'controlled Parisian daylight or dramatic studio, always perfect',
    captionStyle: 'one word. one line. brand name is the close.',
    visualPacing: 'extremely slow — a single held image earns its place',
    ctaStrength: 'none — the image is the invitation',
    colorPalette: 'cream, black, gold, dusty rose, architectural neutral',
    avoidList: ['urgency', 'price mention', 'crowds', 'casual language', 'anything mass-market'],
    promptModifier: 'Apply Dior editorial aesthetic: haute couture fashion photography, subject positioned in an architectural or classical French environment, dramatic controlled lighting, perfect styling, the image is art — the product is heritage.',
  },

  skims: {
    id: 'skims',
    label: 'Skims',
    tagline: 'Body confidence. Inclusive. Clean luxury.',
    tone: 'body-positive, honest, direct, quietly empowering',
    camera: 'studio white or neutral, body-forward framing, clean and unfiltered',
    lighting: 'even, flattering, skin-tone accurate, soft fill no harsh shadows',
    captionStyle: 'body-positive, direct, no-filter honest, "every body" language',
    visualPacing: 'calm and confident, still or slow movement',
    ctaStrength: 'medium — "Shop", "Find your fit", "Yours now"',
    colorPalette: 'clay, nude, warm white, earthy tones, skin-matching palette',
    avoidList: ['perfection language', 'exclusivity', 'harsh lighting', 'unrealistic bodies', 'fast cuts'],
    promptModifier: 'Apply Skims visual language: clean white or nude-toned studio environment, body-forward composition, completely even and flattering lighting, model presented authentically and confidently, product visible and beautifully fitted.',
  },

  alo: {
    id: 'alo',
    label: 'Alo Yoga',
    tagline: 'Wellness luxury. Spiritual. Clean living.',
    tone: 'aspirational, mindful, elevated wellness, feminine spirituality',
    camera: 'natural light, studio or outdoor nature, yoga or movement poses',
    lighting: 'soft diffused natural, golden hour, no hard shadows',
    captionStyle: 'aspirational, mindful, one breath per line',
    visualPacing: 'slow and breathable — the frame should feel like an exhale',
    ctaStrength: 'soft — "Explore", "Begin", "Find yours"',
    colorPalette: 'white, sage, cream, sky blue, blush pink',
    avoidList: ['aggression', 'hard sell', 'cluttered environments', 'urban grit', 'urgency language'],
    promptModifier: 'Apply Alo Yoga aesthetic: beautiful woman in flowing activewear in a serene natural or studio environment, soft golden or diffused natural light, minimal composition, the scene feels like a meditation — peaceful, aspirational, breathable.',
  },

  redbull: {
    id: 'redbull',
    label: 'Red Bull',
    tagline: 'Extreme energy. Adrenaline. Action sports.',
    tone: 'adrenaline, extreme sport, limitless human performance',
    camera: 'action POV, wide environmental with tiny human in vast landscape, fisheye for extreme sports',
    lighting: 'dramatic natural — blue hour, sunset, storm light, stadium night',
    captionStyle: 'short. punchy. claim. "Red Bull gives you wings" energy.',
    visualPacing: 'extremely fast — every second a new angle',
    ctaStrength: 'very strong — the energy itself is the CTA',
    colorPalette: 'red, silver, deep blue, neon accents, night contrast',
    avoidList: ['calm', 'slow', 'domestic settings', 'safety messaging', 'soft language'],
    promptModifier: 'Apply Red Bull energy: extreme athlete at the peak of impossibility — cliff edge, summit, halfpipe, sky — dramatic environmental scale, the human is tiny against a vast and dangerous landscape, the light is dramatic and cinematic.',
  },

  tesla: {
    id: 'tesla',
    label: 'Tesla',
    tagline: 'Futuristic. Innovation. Quiet superiority.',
    tone: 'product specification as poetry, innovation as aspiration',
    camera: 'clean environment, architectural precision, car or product alone in landscape',
    lighting: 'sleek, reflective surfaces, gradient sky, artificial drama',
    captionStyle: 'technical beauty — "0-60 in 2.9 seconds." Period.',
    visualPacing: 'slow and precise — each shot is engineering art',
    ctaStrength: 'none — the product sells itself',
    colorPalette: 'black, white, gunmetal, dark gradient sky, clean chrome',
    avoidList: ['humans using product messily', 'clutter', 'emotion-first', 'price mention', 'discount'],
    promptModifier: 'Apply Tesla visual language: the product alone in a vast, clean, futuristic environment — empty road, dramatic sky, precise architectural reflection — no clutter, no people unless in perfect controlled context, the product is the future.',
  },
}

// ─────────────────────────────────────────────────────────────
// buildStyleInstruction
// Returns the style modifier to inject into any generation prompt
// ─────────────────────────────────────────────────────────────

export function buildStyleInstruction(styleId) {
  const profile = INSPIRED_STYLE_PROFILES[styleId]
  if (!profile) return ''

  return `INSPIRED STYLE DIRECTION — ${profile.label.toUpperCase()} (${profile.tagline})
Apply these creative principles (do not copy — translate to this product):
Tone: ${profile.tone}
Camera: ${profile.camera}
Lighting: ${profile.lighting}
Caption style: ${profile.captionStyle}
Visual pacing: ${profile.visualPacing}
Color palette: ${profile.colorPalette}
Avoid: ${profile.avoidList.join(', ')}
Creative direction: ${profile.promptModifier}`
}

// ─────────────────────────────────────────────────────────────
// buildStyledGenerationPrompt
// Wraps any existing prompt with a style direction layer
// ─────────────────────────────────────────────────────────────

export function buildStyledGenerationPrompt(basePrompt, styleId, adConfig) {
  if (!styleId || styleId === 'none') return basePrompt

  const styleInstruction = buildStyleInstruction(styleId)
  const { productName = '' } = adConfig

  return `${basePrompt}

─────────────────────────────────────
ADDITIONAL CREATIVE DIRECTION:
${styleInstruction}

Important: Apply the above style principles to ${productName}. Do not imitate the reference brand directly — translate their creative DNA into this product's specific context.`
}
