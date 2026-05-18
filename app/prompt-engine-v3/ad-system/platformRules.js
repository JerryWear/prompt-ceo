// ─────────────────────────────────────────────────────────────
// Platform Rules Engine
// Defines how each platform changes ad output — tone, length,
// pacing, visual style, CTA strength, caption format.
// Applied automatically to all generation prompts.
// ─────────────────────────────────────────────────────────────

export const PLATFORM_RULES = {
  instagram: {
    label: 'Instagram',
    icon: '📷',
    tone: 'aspirational, aesthetic, lifestyle-forward',
    captionLength: 'short to medium — 1-5 lines for feed, 1-2 lines for Stories',
    hookEnergy: 'visually led — the image hooks, caption reinforces',
    ctaStrength: 'soft to medium — "discover", "explore", "shop the look"',
    visualStyle: 'clean, beautiful, editorial, warm or moody palette',
    pacing: 'slow and deliberate — each frame is a mood',
    formatNotes: 'Feed: 1:1 or 4:5. Stories: 9:16. Reels: 9:16 with strong first frame.',
    avoidList: ['hard sell', 'price-first', 'cluttered layouts', 'corporate tone', 'generic stock'],
    copyModifier: 'Make this feel like organic content, not an ad. Beauty and aspiration lead.',
  },

  tiktok: {
    label: 'TikTok',
    icon: '🎵',
    tone: 'direct, real, fast, pattern-interrupt, authentic',
    captionLength: 'very short — 1-2 lines max. Hook is everything.',
    hookEnergy: 'spoken or visual hook must land in the first 2 seconds — no warm-up',
    ctaStrength: 'strong and natural — "link in bio", "try it", "grab yours now"',
    visualStyle: 'raw, real, UGC feel, natural light, handheld, authentic environments',
    pacing: 'fast — cut every 2-4 seconds or use continuous movement',
    formatNotes: '9:16 only. Bold text overlays expected. Music is part of the ad.',
    avoidList: ['slow intros', 'polished studio', 'generic models', 'corporate language', 'long captions'],
    copyModifier: 'Make this sound like a real person discovered something. Fast, direct, no fluff.',
  },

  facebook: {
    label: 'Facebook',
    icon: '👥',
    tone: 'trustworthy, clear, problem-solution, proof-based',
    captionLength: 'medium to long — 3-8 lines. Can support longer story copy.',
    hookEnergy: 'problem-first or curiosity. Facebook users pause to read — give them a reason.',
    ctaStrength: 'strong and direct — "Shop now", "Learn more", "Get yours today"',
    visualStyle: 'clean, product-clear, lifestyle or testimonial. Less editorial, more real.',
    pacing: 'medium — 5-8 second scenes. Story arc over speed.',
    formatNotes: '1:1 or 4:5 for feed. 9:16 for Stories. Always include caption text.',
    avoidList: ['vague hooks', 'pure lifestyle with no product', 'no CTA', 'aesthetic-only copy'],
    copyModifier: 'Lead with the problem. Build trust before the sell. Always close with a direct CTA.',
  },

  youtube_shorts: {
    label: 'YouTube Shorts',
    icon: '▶️',
    tone: 'value-first, educational or entertainment, then product',
    captionLength: 'almost no caption — the video does the work',
    hookEnergy: 'value hook — "watch this before you buy", "this changed everything about X"',
    ctaStrength: 'medium — end screen CTA. Subscribe or link.',
    visualStyle: 'slightly more produced than TikTok. Clear subject. Good audio.',
    pacing: 'fast with rhythm — 2-3 second cuts',
    formatNotes: '9:16. Under 60 seconds. Strong first 3 seconds or YouTube promotes away.',
    avoidList: ['talking heads with no value', 'too long', 'soft hooks', 'low audio quality'],
    copyModifier: 'Lead with a value proposition or surprising claim. Make them feel they learned something.',
  },

  shopify: {
    label: 'Shopify / DTC',
    icon: '🛍',
    tone: 'product-hero, conversion-focused, benefit-clear',
    captionLength: 'short, benefit-stacked — 2-4 lines of punchy copy',
    hookEnergy: 'product-led — image or video shows the product first, always',
    ctaStrength: 'very strong — "Add to cart", "Shop now", "Get X% off today"',
    visualStyle: 'clean studio, white or minimal background, product sharp and clear',
    pacing: 'static or very slow — product photography energy',
    formatNotes: 'Square 1:1 preferred. Product always fully visible. No clutter.',
    avoidList: ['lifestyle-only without product', 'vague benefit', 'no price indication', 'dark moody'],
    copyModifier: 'Product is the hero. Every word must serve the conversion. Price and benefit first.',
  },

  email: {
    label: 'Email',
    icon: '📧',
    tone: 'personal, direct, one-to-one feeling',
    captionLength: 'longer is fine — email supports narrative and full copy',
    hookEnergy: 'subject line is the hook. Body builds story then drives to link.',
    ctaStrength: 'very strong button — one primary CTA, repeated once',
    visualStyle: 'header image, clean layout, single product or message',
    pacing: 'readable — short paragraphs, white space, scannable',
    formatNotes: 'Mobile-first layout. Subject line under 50 characters. Preview text matters.',
    avoidList: ['multiple CTAs', 'image-only emails', 'long walls of text', 'vague subject lines'],
    copyModifier: 'Write like one person talking to another. Subject line must create open. Body closes.',
  },

  general: {
    label: 'Universal',
    icon: '🌐',
    tone: 'adaptable, clear, broadly effective',
    captionLength: 'medium — works across platforms',
    hookEnergy: 'strong enough to work anywhere',
    ctaStrength: 'medium — "Shop now" or "Learn more"',
    visualStyle: 'clean and aspirational — broadly appealing',
    pacing: 'medium',
    formatNotes: '1:1 or 4:5 as default. Adapt as needed.',
    avoidList: ['platform-specific language', 'assuming context the viewer does not have'],
    copyModifier: 'Keep it universally clear and compelling. No platform-specific slang.',
  },
}

// ─────────────────────────────────────────────────────────────
// buildPlatformInstruction
// Returns a concise instruction block to prepend to any prompt
// so the AI knows how to adapt output for the target platform.
// ─────────────────────────────────────────────────────────────

export function buildPlatformInstruction(platform = 'general') {
  const rules = PLATFORM_RULES[platform] || PLATFORM_RULES.general

  return `PLATFORM: ${rules.label}
Tone: ${rules.tone}
Caption length: ${rules.captionLength}
Hook energy: ${rules.hookEnergy}
CTA strength: ${rules.ctaStrength}
Visual style: ${rules.visualStyle}
Avoid: ${rules.avoidList.join(', ')}
Key instruction: ${rules.copyModifier}`
}
