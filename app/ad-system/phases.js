// 5-phase campaign structure for Full Ad Campaign™

export const CAMPAIGN_PHASES = [
  {
    id: 'attention',
    label: 'Attention',
    number: 1,
    goal: 'Stop the scroll. Create curiosity. No selling.',
    audienceState: 'cold — they do not know you yet',
    ctaType: 'none or ultra-soft',
    hookArchetypes: ['pattern_break', 'curiosity_gap', 'bold_claim', 'visual_hook', 'emotional_open'],
    visualStyle: 'high contrast, unexpected, movement, arresting composition',
    pacing: 'fast_cut',
    postingDays: [1, 2, 3, 4, 5, 6, 7, 8],
    contentCount: {
      hooks: 5,
      imagePrompts: 3,
      videoScripts: 1,
      captions: 2,
    },
    hookInstructions: {
      pattern_break: 'Opens with something the viewer does not expect. Challenges assumption or shows something unusual.',
      curiosity_gap: 'Creates an information gap. Viewer must keep watching to close it.',
      bold_claim: 'States something confident and specific. No hedging. Bold and ownable.',
      visual_hook: 'The visual itself is the hook. No text needed to stop them.',
      emotional_open: 'Opens on an emotion the viewer recognizes instantly. Vulnerability or truth.',
    },
    promptInstruction: 'Write 5 attention hooks. No selling. No product pitch. Pure scroll-stopping power. Under 15 words each. One per archetype: pattern_break, curiosity_gap, bold_claim, visual_hook, emotional_open.',
    imagePromptInstruction: 'Generate 3 image prompts for attention phase. High contrast composition, unexpected framing, visually arresting. Must stop scrolling without reading. Varied environments.',
  },
  {
    id: 'emotional_connection',
    label: 'Emotional Connection',
    number: 2,
    goal: 'Build trust. Tell the story. Make them feel something.',
    audienceState: 'warming — they have seen you, now they need to feel you',
    ctaType: 'soft social — follow, save, share',
    hookArchetypes: ['transformation_story', 'day_in_life', 'origin_story'],
    visualStyle: 'lifestyle, warm tones, real moments, authentic not polished',
    pacing: 'story_driven',
    postingDays: [9, 10, 11, 12, 13, 14],
    contentCount: {
      hooks: 3,
      imagePrompts: 3,
      videoScripts: 1,
      captions: 2,
    },
    hookInstructions: {
      transformation_story: 'Before and after narrative. Not before/after body — before/after life, mindset, circumstance.',
      day_in_life: 'A real day in their world. The moments that build the brand without stating it.',
      origin_story: 'Why this brand, product, or person exists. The moment it started. The truth.',
    },
    promptInstruction: 'Write 3 emotional connection narratives — one each: transformation arc (before/after life), day-in-life moment, and origin story. First person, specific details, no marketing language. 3–5 sentences each.',
    imagePromptInstruction: 'Generate 3 image prompts for emotional connection phase. Warm lifestyle scenes, real-feeling moments, creator present and authentic. No product push. Mood is the message.',
  },
  {
    id: 'desire_escalation',
    label: 'Desire Escalation',
    number: 3,
    goal: 'Make them want the life, not just the product. Aspiration and transformation.',
    audienceState: 'interested — they like you, now they want what you have',
    ctaType: 'desire-driven — "imagine", "picture this", "what if"',
    hookArchetypes: ['aspiration', 'transformation_visual', 'luxury_life', 'identity_shift'],
    visualStyle: 'elevated, aspirational, luxury or transformation, cinematic quality',
    pacing: 'cinematic',
    postingDays: [15, 16, 17, 18, 19, 20],
    contentCount: {
      hooks: 4,
      imagePrompts: 5,
      videoScripts: 1,
      captions: 2,
    },
    hookInstructions: {
      aspiration: 'Paints the life they want. Specific, sensory, desirable. No product yet.',
      transformation_visual: 'Shows the after. Not told — shown. The version of them that has this.',
      luxury_life: 'The elevated environment. The world this product belongs to. Premium by association.',
      identity_shift: 'This product belongs to a certain type of person. They want to be that person.',
    },
    promptInstruction: 'Write 4 desire escalation hooks. Build aspiration. Show the life. Identity-first framing. Under 20 words each. Escalate emotion without hard selling.',
    imagePromptInstruction: 'Generate 5 image prompts for desire phase: (1) luxury lifestyle scene aspirational, (2) close-up product beauty shot, (3) creator using product naturally, (4) world-elevated lifestyle scene with product context, (5) before/after transformation visual — cinematic and elevated.',
  },
  {
    id: 'conversion',
    label: 'Conversion',
    number: 4,
    goal: 'Convert. Direct offer. Clear CTA. Remove friction.',
    audienceState: 'hot — they want it, now remove every reason not to buy',
    ctaType: 'hard CTA — "shop now", "get yours", "link in bio", "limited"',
    hookArchetypes: ['direct_offer', 'urgency', 'social_proof', 'guarantee'],
    visualStyle: 'clean, direct, product-forward, no clutter, CTA clear',
    pacing: 'fast',
    postingDays: [21, 22, 23, 24, 25, 26],
    contentCount: {
      hooks: 3,
      imagePrompts: 2,
      videoScripts: 1,
      captions: 2,
    },
    hookInstructions: {
      direct_offer: 'States the offer clearly and immediately. Price, value, what they get.',
      urgency: 'Scarcity or time-sensitive framing. Real not fake. Limited units, closing date, seasonal.',
      social_proof: 'Real results from real people. Numbers, testimonials, outcomes.',
      guarantee: 'Removes risk. Reduces hesitation. They cannot lose.',
    },
    promptInstruction: 'Write 3 conversion ads. One each: direct offer with price/value, urgency with real scarcity frame, social proof with outcome numbers. Under 30 words. CTA at end of each.',
    imagePromptInstruction: 'Generate 2 image prompts for conversion phase: (1) product clean beauty shot with pricing context, (2) customer/creator with product showing real use and satisfaction. Direct, clear, no distraction.',
  },
  {
    id: 'retargeting',
    label: 'Retargeting',
    number: 5,
    goal: 'Win back the ones who almost bought. Reinforce, remind, reassure.',
    audienceState: 'post-click — they were interested, something stopped them',
    ctaType: 'reminder + reassurance — "still thinking about it?", "here is what others say"',
    hookArchetypes: ['soft_reminder', 'testimonial', 'objection_handle', 'final_push'],
    visualStyle: 'familiar, warm, honest, not pushy — like a friend reminding',
    pacing: 'slow',
    postingDays: [27, 28, 29, 30],
    contentCount: {
      hooks: 3,
      imagePrompts: 2,
      videoScripts: 1,
      captions: 2,
    },
    hookInstructions: {
      soft_reminder: 'Gentle acknowledgment they were interested. No pressure. Just here when ready.',
      testimonial: 'Real customer result. Specific and human. What changed for them.',
      objection_handle: 'Addresses the most common reason not to buy. Directly and honestly.',
      final_push: 'One last reason. The most compelling. Everything on the table.',
    },
    promptInstruction: 'Write 3 retargeting ads. One each: soft reminder (no pressure, here when ready), customer testimonial (specific outcome), objection handle (addresses top reason people hesitate). Human and honest tone.',
    imagePromptInstruction: 'Generate 2 image prompts for retargeting: (1) warm lifestyle scene with product naturally present — familiar feeling, (2) real customer using or holding product — honest and approachable.',
  },
]

export const PHASE_MAP = Object.fromEntries(CAMPAIGN_PHASES.map(p => [p.id, p]))

export function getPhaseById(id) {
  return PHASE_MAP[id] || null
}

export function getPhaseScheduleDays() {
  return CAMPAIGN_PHASES.reduce((acc, phase) => {
    phase.postingDays.forEach(day => {
      acc[day] = phase.id
    })
    return acc
  }, {})
}

export function getTotalContentCount() {
  return CAMPAIGN_PHASES.reduce((totals, phase) => {
    Object.entries(phase.contentCount).forEach(([key, val]) => {
      totals[key] = (totals[key] || 0) + val
    })
    return totals
  }, {})
}

// Maps campaign_stage from project_brain → phase id
export const STAGE_TO_PHASE = {
  attention:            'attention',
  emotional_connection: 'emotional_connection',
  desire_escalation:    'desire_escalation',
  conversion:           'conversion',
  retargeting:          'retargeting',
}

// Platform-specific adaptations per phase
export const PHASE_PLATFORM_RULES = {
  tiktok: {
    attention:            { maxLength: 8, format: '9:16', hookPosition: 'first_1s', captionLength: 'short' },
    emotional_connection: { maxLength: 15, format: '9:16', hookPosition: 'first_2s', captionLength: 'medium' },
    desire_escalation:    { maxLength: 12, format: '9:16', hookPosition: 'first_1s', captionLength: 'short' },
    conversion:           { maxLength: 10, format: '9:16', hookPosition: 'first_1s', captionLength: 'short' },
    retargeting:          { maxLength: 15, format: '9:16', hookPosition: 'first_2s', captionLength: 'medium' },
  },
  instagram: {
    attention:            { maxLength: 15, format: '1:1', hookPosition: 'caption_line1', captionLength: 'medium' },
    emotional_connection: { maxLength: 30, format: '1:1', hookPosition: 'caption_line1', captionLength: 'long' },
    desire_escalation:    { maxLength: 20, format: '1:1', hookPosition: 'caption_line1', captionLength: 'medium' },
    conversion:           { maxLength: 10, format: '1:1', hookPosition: 'caption_line1', captionLength: 'short' },
    retargeting:          { maxLength: 20, format: '1:1', hookPosition: 'caption_line1', captionLength: 'medium' },
  },
  meta_ads: {
    attention:            { maxLength: 5, format: '1:1', hookPosition: 'headline', captionLength: 'very_short' },
    emotional_connection: { maxLength: 10, format: '1:1', hookPosition: 'headline', captionLength: 'short' },
    desire_escalation:    { maxLength: 8, format: '1:1', hookPosition: 'headline', captionLength: 'short' },
    conversion:           { maxLength: 5, format: '1:1', hookPosition: 'headline', captionLength: 'very_short' },
    retargeting:          { maxLength: 8, format: '1:1', hookPosition: 'headline', captionLength: 'short' },
  },
}
