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

// ── System knowledge base ────────────────────────────────────────────────────
const PROMPTCEO_SYSTEMS = {
  perfect_day: {
    label: 'Perfect Day™',
    engine: '/api/perfect-day',
    bestFor: 'Cinematic full-day content — 12 moments, image prompts, hooks, captions. Best for lifestyle creators wanting a narrative arc.',
    whenToRecommend: 'User wants lifestyle content, a day-in-the-life story, cinematic world-building, or aspirational imagery.',
    requires: ['world', 'style'],
  },
  full_day_video: {
    label: 'Full Day Video™',
    engine: '/api/full-day-generate',
    bestFor: 'Complete cinematic video production plan — scenes, camera moves, lighting direction, wardrobe arc.',
    whenToRecommend: 'User is creating video content, wants a shot list, needs a production plan, or wants cinematic video direction.',
    requires: ['world', 'dayType', 'style'],
  },
  full_campaign: {
    label: 'Full Ad Campaign™',
    engine: '/api/full-ad-campaign',
    bestFor: '30-day strategic ad campaign with 5 phases, 30+ hooks, angles, captions, image prompts, and posting schedule.',
    whenToRecommend: 'User wants a complete sustained campaign, multi-phase strategy, or 30-day posting plan.',
    requires: ['productName', 'goal', 'style', 'platform'],
  },
  instant_campaign: {
    label: 'Instant Campaign™',
    engine: '/api/instant-campaign',
    bestFor: 'Full campaign in under 30 seconds — hooks, angles, captions, image and video prompts.',
    whenToRecommend: 'User wants speed, is testing a concept, needs quick results, or explicitly asks for something fast.',
    requires: ['productName', 'type', 'goal'],
  },
  studio_image: {
    label: 'Studio™',
    engine: 'studio',
    bestFor: 'AI image generation with brand identity, visual anchors, custom worlds, photographer briefs.',
    whenToRecommend: 'User wants to generate a specific image, create visual content, or build lifestyle imagery.',
    requires: ['imagePrompt'],
  },
  ad_studio: {
    label: 'Ad Studio™',
    engine: 'ad_studio',
    bestFor: 'Manual control over every ad parameter — mood, world, CTA, audience, pacing, emotional direction, visual atmosphere.',
    whenToRecommend: 'User is dissatisfied with AI output and wants full creative control, or wants to build ads step-by-step with direct parameter control.',
  },
}

// Intent param definitions
const INTENTS = {
  perfect_day: {
    label: 'Perfect Day',
    engine: '/api/perfect-day',
    required: ['world', 'style'],
    questions: {
      world: {
        text: 'Which world should this day take place in?',
        options: [
          { value: 'maldives_villa',     label: 'Maldives Villa' },
          { value: 'luxury_penthouse',   label: 'Luxury Penthouse' },
          { value: 'bali_villa',         label: 'Bali Villa' },
          { value: 'dubai_highrise',     label: 'Dubai High-Rise' },
          { value: 'paris_apartment',    label: 'Paris Apartment' },
          { value: 'greek_islands',      label: 'Greek Islands' },
          { value: 'miami_penthouse',    label: 'Miami Penthouse' },
          { value: 'coastal_house',      label: 'Coastal House' },
          { value: 'ski_chalet',         label: 'Ski Chalet' },
          { value: 'urban_apartment',    label: 'Urban Apartment' },
          { value: 'tokyo_apartment',    label: 'Tokyo Apartment' },
          { value: 'countryside_estate', label: 'Countryside Estate' },
        ],
      },
      style: {
        text: 'What feeling should this day have?',
        options: [
          { value: 'luxury',                 label: 'Luxury & high-status' },
          { value: 'aspirational_lifestyle', label: 'Aspirational lifestyle' },
          { value: 'cinematic',              label: 'Cinematic & film-quality' },
          { value: 'soft_feminine',          label: 'Soft & feminine' },
          { value: 'dark_luxury',            label: 'Dark luxury' },
          { value: 'ugc',                    label: 'Authentic UGC' },
          { value: 'emotional',              label: 'Emotional & story-driven' },
          { value: 'high_status',            label: 'High-status power' },
        ],
      },
    },
  },
  full_day_video: {
    label: 'Full Day Video',
    engine: '/api/full-day-generate',
    required: ['world', 'dayType', 'style'],
    questions: {
      world: {
        text: 'Where should this video day take place?',
        options: [
          { value: 'maldives_villa',   label: 'Maldives Villa' },
          { value: 'bali_villa',       label: 'Bali Villa' },
          { value: 'luxury_penthouse', label: 'Luxury Penthouse' },
          { value: 'dubai_highrise',   label: 'Dubai High-Rise' },
          { value: 'greek_islands',    label: 'Greek Islands' },
          { value: 'paris_apartment',  label: 'Paris Apartment' },
          { value: 'miami_penthouse',  label: 'Miami Penthouse' },
          { value: 'coastal_house',    label: 'Coastal House' },
          { value: 'tokyo_apartment',  label: 'Tokyo Apartment' },
          { value: 'ski_chalet',       label: 'Ski Chalet' },
        ],
      },
      dayType: {
        text: 'What type of day should this be?',
        options: [
          { value: 'luxury_creator_day',    label: 'Luxury creator lifestyle' },
          { value: 'beach_creator_day',     label: 'Beach & ocean creator' },
          { value: 'wellness_retreat_day',  label: 'Wellness & spa retreat' },
          { value: 'romantic_travel_day',   label: 'Romantic travel day' },
          { value: 'fitness_lifestyle_day', label: 'Fitness & body transformation' },
          { value: 'business_power_day',    label: 'Business & success day' },
          { value: 'fashion_content_day',   label: 'Fashion & style creation' },
          { value: 'foodie_luxury_day',     label: 'Gourmet food & luxury dining' },
        ],
      },
      style: {
        text: 'What visual style should the video have?',
        options: [
          { value: 'cinematic',     label: 'Cinematic & film-quality' },
          { value: 'luxury',        label: 'Luxury & aspirational' },
          { value: 'dark_luxury',   label: 'Dark & moody luxury' },
          { value: 'soft_feminine', label: 'Soft & romantic' },
          { value: 'high_energy',   label: 'High-energy & dynamic' },
          { value: 'ugc',           label: 'Real & authentic UGC' },
        ],
      },
    },
  },
  full_campaign: {
    label: 'Full Ad Campaign',
    engine: '/api/full-ad-campaign',
    required: ['productName', 'goal', 'style', 'platform'],
    questions: {
      productName: {
        text: 'What product or brand is this campaign for?',
        freeText: true,
        placeholder: "e.g. My women's hoodie, PromptCEO, luxury skincare",
      },
      goal: {
        text: 'What is the main goal of this campaign?',
        options: [
          { value: 'sales',               label: 'Direct sales' },
          { value: 'followers',           label: 'Grow followers' },
          { value: 'brand_awareness',     label: 'Brand awareness' },
          { value: 'leads',               label: 'Collect leads' },
          { value: 'high_ticket',         label: 'High-ticket clients' },
          { value: 'viral_reach',         label: 'Go viral' },
          { value: 'premium_positioning', label: 'Premium positioning' },
        ],
      },
      style: {
        text: 'What content style fits your brand?',
        options: [
          { value: 'cinematic',           label: 'Cinematic & premium' },
          { value: 'ugc',                 label: 'UGC & authentic' },
          { value: 'luxury',              label: 'Luxury & aspirational' },
          { value: 'emotional',           label: 'Emotional & story-driven' },
          { value: 'viral',               label: 'Viral & entertaining' },
          { value: 'fitness_motivation',  label: 'Fitness & motivation' },
          { value: 'corporate_authority', label: 'Corporate & authority' },
          { value: 'dark_luxury',         label: 'Dark & exclusive' },
        ],
      },
      platform: {
        text: 'Which platform is the primary target?',
        options: [
          { value: 'instagram', label: 'Instagram' },
          { value: 'tiktok',    label: 'TikTok' },
          { value: 'meta_ads',  label: 'Meta Ads' },
          { value: 'youtube',   label: 'YouTube' },
          { value: 'linkedin',  label: 'LinkedIn' },
        ],
      },
    },
  },
  instant_campaign: {
    label: 'Instant Campaign',
    engine: '/api/instant-campaign',
    required: ['productName', 'type', 'goal'],
    questions: {
      productName: {
        text: 'What product or brand is this for?',
        freeText: true,
        placeholder: 'e.g. fitness app, luxury watch, personal brand',
      },
      type: {
        text: 'What type of campaign do you need?',
        options: [
          { value: 'product',        label: 'Product launch' },
          { value: 'personal_brand', label: 'Personal brand' },
          { value: 'creator',        label: 'Creator content' },
          { value: 'ecommerce',      label: 'E-commerce store' },
          { value: 'coaching',       label: 'Coaching / service' },
          { value: 'saas',           label: 'SaaS / app' },
          { value: 'fashion',        label: 'Fashion / apparel' },
          { value: 'luxury',         label: 'Luxury brand' },
        ],
      },
      goal: {
        text: 'What should this campaign achieve?',
        options: [
          { value: 'sales',           label: 'Drive sales' },
          { value: 'followers',       label: 'Grow audience' },
          { value: 'brand_awareness', label: 'Build awareness' },
          { value: 'leads',           label: 'Generate leads' },
          { value: 'viral_reach',     label: 'Go viral' },
        ],
      },
    },
  },
  studio_image: {
    label: 'Studio Image',
    engine: 'studio',
    required: ['imagePrompt'],
    questions: {
      imagePrompt: {
        text: 'Describe the image you want to create.',
        freeText: true,
        placeholder: 'e.g. A woman in a luxury penthouse at golden hour, cinematic lighting',
      },
    },
  },
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const WORLD_DISPLAY_NAMES = {
  luxury_penthouse:   'Luxury Penthouse',
  maldives_villa:     'Maldives Villa',
  bali_villa:         'Bali Villa',
  dubai_highrise:     'Dubai High-Rise',
  paris_apartment:    'Paris Apartment',
  greek_islands:      'Greek Islands',
  miami_penthouse:    'Miami Penthouse',
  coastal_house:      'Coastal House',
  ski_chalet:         'Ski Chalet',
  urban_apartment:    'Urban Apartment',
  tokyo_apartment:    'Tokyo Apartment',
  countryside_estate: 'Countryside Estate',
  monaco:             'Monaco',
  amalfi:             'Amalfi Coast',
  london_penthouse:   'London Penthouse',
}

// Map freeform discovery question IDs to actual param keys
const DISCOVERY_PARAM_MAP = {
  product:       'productName',
  brand:         'productName',
  productname:   'productName',
  platform:      'platform',
  style:         'style',
  feel:          'style',
  campaignfeel:  'style',
  goal:          'goal',
  world:         'world',
  location:      'world',
  type:          'type',
  day:           'dayType',
  daytype:       'dayType',
  imageprompt:   'imagePrompt',
}

function buildCapabilities(userRow) {
  const tier     = userRow?.subscription_tier || 'free'
  const isActive = ['active', 'trialing'].includes(userRow?.subscription_status)
  return {
    canUseFullCampaigns:   isActive,
    canUseDirectorMemory:  isActive,
    canUseAdvancedWorlds:  isActive,
    canUseVideoGeneration: isActive,
    canUseAdStudio:        isActive,
    maxCampaignDepth:      tier === 'agency' ? 10 : tier === 'pro' ? 5 : 2,
    tier:     tier || 'free',
    isActive,
  }
}

function buildDirectorSuggestions(memory, brandProfile) {
  const s = {}
  if (memory?.topWorld)     s.world    = { value: memory.topWorld,     reason: `top world — used ${memory.topWorldUses || 'most'} times` }
  if (memory?.recentStyle)  s.style    = { value: memory.recentStyle,  reason: 'most recent style' }
  if (memory?.bestPlatform) s.platform = { value: memory.bestPlatform, reason: 'best-performing platform' }
  if (memory?.bestHookType) s.hookType = { value: memory.bestHookType, reason: 'highest-performing hook type' }
  if (brandProfile?.style && !s.style)  s.style = { value: brandProfile.style, reason: `${brandProfile.name} brand style` }
  return s
}

function buildReadyMessage(intentLabel, params) {
  const world    = WORLD_DISPLAY_NAMES[params.world] || (params.world || '').replace(/_/g, ' ')
  const style    = (params.style || 'cinematic').replace(/_/g, ' ')
  const platform = params.platform || 'instagram'
  const product  = params.productName || null
  switch (intentLabel) {
    case 'Perfect Day':      return `${world}, ${style} — building the full day now.`
    case 'Full Day Video':   return `${world}, ${style} video production plan — on it.`
    case 'Full Ad Campaign': return product ? `30-day campaign for ${product} — ${platform}, ${style} style. Building now.` : `30-day campaign — ${platform}, ${style} style. Building now.`
    case 'Instant Campaign': return product ? `Quick campaign for ${product}. Running now.` : 'Quick campaign — running now.'
    case 'Studio Image':     return 'Sending to Studio.'
    default:                 return `Building your ${intentLabel}.`
  }
}

// ── PromptCEO GPT Runtime ────────────────────────────────────────────────────
async function analyzeConversation(apiKey, history, collectedParams, memory, appState, identity, brandProfile, suggestions, capabilities) {
  const historyText = history.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n')

  const memoryCtx = memory?.campaignCount > 0
    ? `Campaign history: ${memory.campaignCount} campaign(s). Best hook: ${memory.bestHookType || 'none'}. Top world: ${memory.topWorld ? (WORLD_DISPLAY_NAMES[memory.topWorld] || memory.topWorld) : 'none'} (${memory.topWorldUses || 0} uses). Best platform: ${memory.bestPlatform || 'none'}. Recent style: ${memory.recentStyle || 'none'}.`
    : 'Campaign history: No campaigns yet — first session.'

  const brandCtx = brandProfile?.name
    ? `Active brand: "${brandProfile.name}". Voice: ${brandProfile.voice || 'not set'}. Audience: ${brandProfile.target_audience || 'not set'}. Style: ${brandProfile.style || 'not set'}.`
    : 'Active brand: none.'

  const identityCtx = identity?.identityName ? `Creator identity: "${identity.identityName}".` : ''

  const appStateLines = []
  if (appState?.view)            appStateLines.push(`Current view: ${appState.view.replace(/_/g, ' ')}.`)
  if (appState?.hasPerfectDay)   appStateLines.push('Existing Perfect Day result — campaign to match it is a logical next step.')
  if (appState?.hasFullDayVideo) appStateLines.push('Existing Full Day Video — could extend into ad content.')
  if (appState?.hasCampaign)     appStateLines.push('Existing campaign result visible.')
  const appCtx = appStateLines.join(' ')

  const capCtx = capabilities
    ? `User tier: ${capabilities.tier}. Full Campaigns: ${capabilities.canUseFullCampaigns}. Video: ${capabilities.canUseVideoGeneration}. Ad Studio: ${capabilities.canUseAdStudio}.`
    : ''

  const suggestionsCtx = Object.keys(suggestions).length > 0
    ? `Memory-derived defaults:\n${Object.entries(suggestions).map(([k, v]) => `- ${k}: ${v.value} (${v.reason})`).join('\n')}`
    : ''

  const systemsKnowledge = Object.entries(PROMPTCEO_SYSTEMS)
    .map(([k, v]) => `${k}: ${v.label} — ${v.bestFor} | Recommend when: ${v.whenToRecommend}`)
    .join('\n')

  const res = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'grok-3-fast',
      max_tokens: 1000,
      temperature: 0.3,
      messages: [
        {
          role: 'system',
          content: `You are PromptCEO GPT — the conversational operating system for PromptCEO. Not a chatbot. A strategic creative intelligence that directs campaign and content creation.

## Personality
- Strategic, calm, direct. You know what good campaigns look like.
- Reference history by specific name: "Maldives Villa" not "your top world".
- Recommend rather than ask blank questions.
- Never start with affirmations: no "Great!", "Sure!", "Absolutely!", "Got it!", "Perfect!".
- 2 sentences max per directorMessage. 3 only on the very first exchange when there is no campaign history.
- Sound like a creative director who has reviewed the user's work.

## RUNTIME MODES — pick exactly ONE

**discovery** — Use when the request is vague and needs context before routing. Generate 3-5 specific questions (product, emotional goal, platform, campaign feel, execution speed). NEVER execute a vague "create a campaign for my brand" request immediately.

**routing** — Use when intent is clear but one specific param is missing. Ask for that single param with options.

**execution** — Use when intent is clear, all required params exist, and the user has confirmed intent to proceed. Do NOT trigger on a vague first message.

**recommendation** — Use when user expresses dissatisfaction with output, asks what to do differently, or needs a specific system explained. Name the system and list what it enables.

**explanation** — User asks how a system or feature works. Explain clearly and briefly.

**workflow_suggestion** — You detect a logical next step from existing work. Suggest it with a specific reason.

**continuation** — Conversational back-and-forth not yet routing to execution.

## PromptCEO Systems
${systemsKnowledge}

## Execution rules
ONLY use mode=execution when:
1. Intent is completely clear (not vague)
2. All required params exist OR memory-derived defaults fully cover them
3. The user has said something confirming they want to proceed now (not just described an interest)

## Context
${memoryCtx}
${brandCtx}
${identityCtx ? identityCtx + '\n' : ''}${appCtx ? appCtx + '\n' : ''}${capCtx ? capCtx + '\n' : ''}${suggestionsCtx ? suggestionsCtx + '\n' : ''}Already collected: ${JSON.stringify(collectedParams)}

Available values —
worlds: luxury_penthouse, maldives_villa, bali_villa, dubai_highrise, paris_apartment, greek_islands, miami_penthouse, coastal_house, ski_chalet, urban_apartment, tokyo_apartment, countryside_estate, monaco, amalfi, london_penthouse
styles: luxury, aspirational_lifestyle, cinematic, soft_feminine, dark_luxury, ugc, emotional, high_status, fitness_motivation, viral, high_energy, corporate_authority
goals: sales, followers, brand_awareness, leads, high_ticket, viral_reach, premium_positioning
platforms: instagram, tiktok, meta_ads, youtube, linkedin
dayTypes: luxury_creator_day, beach_creator_day, wellness_retreat_day, romantic_travel_day, fitness_lifestyle_day, business_power_day, fashion_content_day, foodie_luxury_day
types: product, personal_brand, creator, ecommerce, coaching, saas, fashion, luxury

For discoveryQuestions: use IDs matching param names when possible (productName, platform, style, goal, world, dayType, type, imagePrompt). Use descriptive IDs for context questions (emotionalGoal, campaignFeel, executionSpeed).

Respond with ONLY raw valid JSON — no markdown, no explanation.`,
        },
        {
          role: 'user',
          content: `Conversation:
${historyText}

Return:
{
  "mode": "discovery" | "routing" | "execution" | "recommendation" | "explanation" | "workflow_suggestion" | "continuation",
  "directorMessage": "2-sentence Director voice response — direct, no affirmations, specific",
  "intent": "perfect_day" | "full_day_video" | "full_campaign" | "instant_campaign" | "studio_image" | null,
  "discoveryQuestions": [
    { "id": "paramKeyOrDescriptive", "question": "Question text", "freeText": true, "placeholder": "hint text", "options": null }
    OR
    { "id": "paramKey", "question": "Question text", "freeText": false, "placeholder": null, "options": [{"value":"v","label":"l"}] }
  ],
  "systemRecommendation": {
    "system": "system_key",
    "label": "Display Name",
    "reason": "Why this system addresses the issue",
    "capabilities": ["mood", "world", "CTA", "audience", "pacing", "emotional direction"]
  },
  "params": {
    "productName": null, "world": null, "style": null, "goal": null,
    "platform": null, "dayType": null, "type": null, "imagePrompt": null
  }
}

Include discoveryQuestions only when mode=discovery. Include systemRecommendation only when mode=recommendation. Only include params clearly stated or strongly inferable.`,
        },
      ],
    }),
  })
  const data = await res.json()
  const raw = data?.choices?.[0]?.message?.content?.trim() || '{}'
  try {
    const stripped = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim()
    const match = stripped.match(/\{[\s\S]*\}/)
    return match ? JSON.parse(match[0]) : {}
  } catch { return {} }
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

    const capabilities = buildCapabilities(userRow)

    const body = await req.json()
    const {
      message,
      history = [],
      collectedParams = {},
      identity = null,
      brandProfile = null,
      creatorProfile = null,
      projectId = null,
      memory = null,
      appState = null,
      discoveryAnswers = null,
    } = body

    if (!message?.trim() && !discoveryAnswers) {
      return NextResponse.json({ error: 'message is required' }, { status: 400 })
    }

    const userMessage = message?.trim() || Object.entries(discoveryAnswers || {})
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ')

    const fullHistory = [...history, { role: 'user', content: userMessage }]
    const suggestions = buildDirectorSuggestions(memory, brandProfile)
    const analysis   = await analyzeConversation(xaiApiKey, fullHistory, collectedParams, memory, appState, identity, brandProfile, suggestions, capabilities)

    const mode   = analysis.mode || 'continuation'
    const intent = analysis.intent || null

    // Build params — priority: collectedParams > AI extraction > discovery answers > memory/defaults
    const extractedParams = {
      ...(analysis.params || {}),
      ...collectedParams,
    }
    // Map discovery answers to param keys
    if (discoveryAnswers) {
      Object.entries(discoveryAnswers).forEach(([k, v]) => {
        if (!v) return
        const key = DISCOVERY_PARAM_MAP[k.toLowerCase()] || k
        if (!extractedParams[key]) extractedParams[key] = v
      })
    }
    Object.keys(extractedParams).forEach(k => { if (extractedParams[k] === null) delete extractedParams[k] })

    // Priority fills
    if (identity?.identityName && !extractedParams.creatorName)  extractedParams.creatorName  = identity.identityName
    if (brandProfile?.name     && !collectedParams.productName)  extractedParams.productName  = brandProfile.name
    if (brandProfile?.style    && !collectedParams.style)        extractedParams.style         = brandProfile.style
    if (appState?.adPlatform   && !extractedParams.platform)     extractedParams.platform      = appState.adPlatform
    if (appState?.adStyle      && !extractedParams.style)        extractedParams.style         = appState.adStyle
    if (memory?.recentStyle    && !extractedParams.style)        extractedParams.style         = memory.recentStyle
    if (memory?.bestPlatform   && !extractedParams.platform)     extractedParams.platform      = memory.bestPlatform
    if (memory?.topWorld       && !extractedParams.world)        extractedParams.world         = memory.topWorld
    if (!extractedParams.goal)     extractedParams.goal     = 'brand_awareness'
    if (!extractedParams.type)     extractedParams.type     = 'personal_brand'
    if (!extractedParams.style)    extractedParams.style    = 'cinematic'
    if (!extractedParams.platform) extractedParams.platform = 'instagram'
    if (!extractedParams.world)    extractedParams.world    = 'luxury_penthouse'
    if (!extractedParams.dayType)  extractedParams.dayType  = 'luxury_creator_day'

    // ── Mode routing ──────────────────────────────────────────────────────────

    if (mode === 'discovery') {
      return NextResponse.json({
        mode:               'discovery',
        phase:              'clarify',
        directorMessage:    analysis.directorMessage || 'Tell me more so I can route this correctly.',
        discoveryQuestions: analysis.discoveryQuestions || [],
        intent,
        collectedParams:    extractedParams,
        history:            fullHistory,
        capabilities,
      })
    }

    if (mode === 'recommendation') {
      const rec = analysis.systemRecommendation
      return NextResponse.json({
        mode:                 'recommendation',
        phase:                'clarify',
        directorMessage:      analysis.directorMessage || 'Let me suggest a better approach.',
        systemRecommendation: rec || null,
        options: rec ? [
          { value: rec.system,   label: `Take me to ${rec.label}` },
          { value: 'continue',   label: 'Try again with changes' },
        ] : null,
        intent,
        collectedParams: extractedParams,
        history:         fullHistory,
        capabilities,
      })
    }

    if (mode === 'explanation' || mode === 'continuation' || mode === 'workflow_suggestion') {
      return NextResponse.json({
        mode,
        phase:           'clarify',
        directorMessage: analysis.directorMessage || null,
        options:         mode === 'continuation' && !intent ? [
          { value: 'perfect_day',      label: '☀ Perfect Day' },
          { value: 'full_day_video',   label: '🎬 Full Day Video' },
          { value: 'full_campaign',    label: '◈ Full Ad Campaign' },
          { value: 'instant_campaign', label: '⚡ Instant Campaign' },
          { value: 'studio_image',     label: '◧ Studio Image' },
        ] : null,
        intent,
        collectedParams: extractedParams,
        history:         fullHistory,
        capabilities,
      })
    }

    // ── Routing / Execution ───────────────────────────────────────────────────
    if (!intent) {
      return NextResponse.json({
        mode:            'continuation',
        phase:           'clarify',
        directorMessage: analysis.directorMessage || 'What would you like to build?',
        options: [
          { value: 'perfect_day',      label: '☀ Perfect Day' },
          { value: 'full_day_video',   label: '🎬 Full Day Video' },
          { value: 'full_campaign',    label: '◈ Full Ad Campaign' },
          { value: 'instant_campaign', label: '⚡ Instant Campaign' },
          { value: 'studio_image',     label: '◧ Studio Image' },
        ],
        collectedParams: extractedParams,
        history:         fullHistory,
        capabilities,
      })
    }

    const intentDef = INTENTS[intent]
    if (!intentDef) return NextResponse.json({ error: `Unknown intent: ${intent}` }, { status: 400 })

    const missingParam = intentDef.required.find(p => !extractedParams[p])

    if (missingParam) {
      const q = intentDef.questions[missingParam]
      return NextResponse.json({
        mode:            'routing',
        phase:           'clarify',
        directorMessage: analysis.directorMessage || null,
        understood:      analysis.directorMessage || `Building your ${intentDef.label}`,
        question:        q.text,
        options:         q.options || null,
        freeText:        q.freeText || false,
        placeholder:     q.placeholder || null,
        paramKey:        missingParam,
        intent,
        collectedParams: extractedParams,
        history:         fullHistory,
        capabilities,
      })
    }

    // All params present — execute
    const finalParams = {
      ...extractedParams,
      creatorProfile: creatorProfile || null,
      brandProfile:   brandProfile   || null,
      projectId:      projectId      || null,
    }
    if (identity?.traits) {
      finalParams.creatorProfile = {
        ...(finalParams.creatorProfile || {}),
        physical_traits: identity.traits?.subjectA || null,
        name: identity.identityName || finalParams.creatorProfile?.name,
      }
    }

    const readyMsg = buildReadyMessage(intentDef.label, extractedParams)
    return NextResponse.json({
      mode:            'execution',
      phase:           'ready',
      directorMessage: readyMsg,
      understood:      readyMsg,
      intent,
      engine:          intentDef.engine,
      params:          finalParams,
      history:         fullHistory,
      capabilities,
    })

  } catch (err) {
    console.error('promptceo-gpt error:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
