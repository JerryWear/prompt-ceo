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

// Intent definitions — what each engine needs
const INTENTS = {
  perfect_day: {
    label: 'Perfect Day',
    engine: '/api/perfect-day',
    description: 'A cinematic full-day story with 12 moments, image prompts, hooks, and captions',
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
    description: 'A full cinematic video production plan — scenes, camera moves, lighting, wardrobe arc',
    required: ['world', 'dayType', 'style'],
    questions: {
      world: {
        text: 'Where should this video day take place?',
        options: [
          { value: 'maldives_villa',     label: 'Maldives Villa' },
          { value: 'bali_villa',         label: 'Bali Villa' },
          { value: 'luxury_penthouse',   label: 'Luxury Penthouse' },
          { value: 'dubai_highrise',     label: 'Dubai High-Rise' },
          { value: 'greek_islands',      label: 'Greek Islands' },
          { value: 'paris_apartment',    label: 'Paris Apartment' },
          { value: 'miami_penthouse',    label: 'Miami Penthouse' },
          { value: 'coastal_house',      label: 'Coastal House' },
          { value: 'tokyo_apartment',    label: 'Tokyo Apartment' },
          { value: 'ski_chalet',         label: 'Ski Chalet' },
        ],
      },
      dayType: {
        text: 'What type of day should this be?',
        options: [
          { value: 'luxury_creator_day',    label: 'Luxury creator lifestyle day' },
          { value: 'beach_creator_day',     label: 'Beach & ocean creator day' },
          { value: 'wellness_retreat_day',  label: 'Wellness & spa retreat' },
          { value: 'romantic_travel_day',   label: 'Romantic travel day' },
          { value: 'fitness_lifestyle_day', label: 'Fitness & body transformation' },
          { value: 'business_power_day',    label: 'Business & success day' },
          { value: 'fashion_content_day',   label: 'Fashion & style creation day' },
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
    description: 'A 30-day ad campaign with 5 phases, hooks, angles, captions, image prompts, and schedule',
    required: ['productName', 'goal', 'style', 'platform'],
    questions: {
      productName: {
        text: 'What product or brand is this campaign for?',
        freeText: true,
        placeholder: 'e.g. My women\'s hoodie, PromptCEO, luxury skincare',
      },
      goal: {
        text: 'What is the main goal of this campaign?',
        options: [
          { value: 'sales',                label: 'Direct sales' },
          { value: 'followers',            label: 'Grow followers' },
          { value: 'brand_awareness',      label: 'Brand awareness' },
          { value: 'leads',                label: 'Collect leads' },
          { value: 'high_ticket',          label: 'High-ticket clients' },
          { value: 'viral_reach',          label: 'Go viral' },
          { value: 'premium_positioning',  label: 'Premium positioning' },
        ],
      },
      style: {
        text: 'What content style fits your brand?',
        options: [
          { value: 'cinematic',              label: 'Cinematic & premium' },
          { value: 'ugc',                    label: 'UGC & authentic' },
          { value: 'luxury',                 label: 'Luxury & aspirational' },
          { value: 'emotional',              label: 'Emotional & story-driven' },
          { value: 'viral',                  label: 'Viral & entertaining' },
          { value: 'fitness_motivation',     label: 'Fitness & motivation' },
          { value: 'corporate_authority',    label: 'Corporate & authority' },
          { value: 'dark_luxury',            label: 'Dark & exclusive' },
        ],
      },
      platform: {
        text: 'Which platform is the primary target?',
        options: [
          { value: 'instagram',  label: 'Instagram' },
          { value: 'tiktok',     label: 'TikTok' },
          { value: 'meta_ads',   label: 'Meta Ads' },
          { value: 'youtube',    label: 'YouTube' },
          { value: 'linkedin',   label: 'LinkedIn' },
        ],
      },
    },
  },

  instant_campaign: {
    label: 'Instant Campaign',
    engine: '/api/instant-campaign',
    description: 'A quick full campaign — hooks, angles, captions, image and video prompts in under 30 seconds',
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
    description: 'Generate a specific image in Studio',
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

// Grok call for intent + param extraction from conversation
async function analyzeConversation(apiKey, history, collectedParams, memory, appState) {
  const historyText = history.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n')

  const memoryCtx = memory?.campaignCount > 0
    ? `\nUser history: ${memory.campaignCount} campaign(s) generated. Best hook type: ${memory.bestHookType || 'none'}. Top world: ${memory.topWorld || 'none'}. Best platform: ${memory.bestPlatform || 'none'}. Recent style: ${memory.recentStyle || 'none'}.`
    : ''
  const appStateCtx = appState
    ? `\nApp context: currently on "${appState.view || 'unknown'}" view. Has existing campaign: ${appState.hasCampaign}. Has Perfect Day: ${appState.hasPerfectDay}. Has Full Day Video: ${appState.hasFullDayVideo}. Ad platform: ${appState.adPlatform || 'none'}. Ad style: ${appState.adStyle || 'none'}.`
    : ''

  const res = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'grok-3-fast',
      max_tokens: 600,
      temperature: 0.2,
      messages: [
        {
          role: 'system',
          content: `You are PromptCEO's AI Conversation Director. Your job is to understand what creative output the user wants and extract parameters from their messages.

Available intents:
- perfect_day: A cinematic full-day lifestyle story (12 moments, image prompts, hooks, captions)
- full_day_video: A full cinematic video production plan with scenes, camera moves, lighting arc
- full_campaign: A 30-day strategic ad campaign with 5 phases
- instant_campaign: A quick ad campaign for rapid deployment
- studio_image: Generate a specific single image

Available worlds: maldives_villa, luxury_penthouse, bali_villa, dubai_highrise, paris_apartment, greek_islands, miami_penthouse, coastal_house, ski_chalet, urban_apartment, tokyo_apartment, countryside_estate
Available styles: luxury, aspirational_lifestyle, cinematic, soft_feminine, dark_luxury, ugc, emotional, high_status, fitness_motivation, viral, high_energy, corporate_authority, dark_luxury
Available goals: sales, followers, brand_awareness, leads, high_ticket, viral_reach, premium_positioning
Available platforms: instagram, tiktok, meta_ads, youtube, linkedin
Available dayTypes: luxury_creator_day, beach_creator_day, wellness_retreat_day, romantic_travel_day, fitness_lifestyle_day, business_power_day, fashion_content_day, foodie_luxury_day
Available types: product, personal_brand, creator, ecommerce, coaching, saas, fashion, luxury

Already collected params: ${JSON.stringify(collectedParams)}${memoryCtx}${appStateCtx}

Respond with ONLY raw valid JSON — no markdown, no explanation.`,
        },
        {
          role: 'user',
          content: `Conversation so far:
${historyText}

Extract:
{
  "intent": "perfect_day" | "full_day_video" | "full_campaign" | "instant_campaign" | "studio_image" | null,
  "understood": "short confirmation under 12 words",
  "params": {
    "productName": "...",
    "world": "...",
    "style": "...",
    "goal": "...",
    "platform": "...",
    "dayType": "...",
    "type": "...",
    "imagePrompt": "..."
  }
}

Only include params that are clearly stated. Use null for anything uncertain.`,
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

    const body = await req.json()
    const {
      message,           // latest user message
      history = [],      // full conversation history [{role, content}]
      collectedParams = {},
      identity = null,   // { hasImage, imageDataUrl, identityName, traits }
      brandProfile = null,
      creatorProfile = null,
      projectId = null,
      memory = null,     // { campaignCount, bestHookType, topWorld, bestPlatform, recentStyle, topAngles }
      appState = null,   // { view, hasCampaign, hasPerfectDay, hasFullDayVideo, adPlatform, adStyle, adGoal }
    } = body

    if (!message?.trim()) {
      return NextResponse.json({ error: 'message is required' }, { status: 400 })
    }

    // Add latest message to history
    const fullHistory = [...history, { role: 'user', content: message.trim() }]

    // Analyze conversation to extract intent + params
    const analysis = await analyzeConversation(xaiApiKey, fullHistory, collectedParams, memory, appState)

    const intent = analysis.intent || null
    // 1. collectedParams wins over AI extraction — user-confirmed answers always take priority
    const extractedParams = {
      ...(analysis.params || {}),  // AI-extracted context — lowest priority
      ...collectedParams,           // User-confirmed answers always override AI extraction
    }
    // Strip nulls from AI extraction (collectedParams values are never null)
    Object.keys(extractedParams).forEach(k => { if (extractedParams[k] === null) delete extractedParams[k] })

    // ── Resolution priority 2–5: fill before asking any question ────────────
    // 2. Active brand profile — overrides AI-extracted placeholder values,
    //    but never overrides a param the user explicitly confirmed (collectedParams)
    if (identity?.identityName && !extractedParams.creatorName) {
      extractedParams.creatorName = identity.identityName
    }
    if (brandProfile?.name && !collectedParams.productName) {
      extractedParams.productName = brandProfile.name
    }
    if (brandProfile?.style && !collectedParams.style) {
      extractedParams.style = brandProfile.style
    }
    // 3. App state — current ad studio settings
    if (appState?.adPlatform && !extractedParams.platform) extractedParams.platform = appState.adPlatform
    if (appState?.adStyle && !extractedParams.style) extractedParams.style = appState.adStyle
    // 4. Director memory — historical patterns
    if (memory?.recentStyle && !extractedParams.style) extractedParams.style = memory.recentStyle
    if (memory?.bestPlatform && !extractedParams.platform) extractedParams.platform = memory.bestPlatform
    if (memory?.topWorld && !extractedParams.world) extractedParams.world = memory.topWorld
    // 5. Inferred defaults — final fallback before asking
    //    productName and imagePrompt intentionally omitted — genuinely unknown, must ask
    if (!extractedParams.goal)     extractedParams.goal     = 'brand_awareness'
    if (!extractedParams.type)     extractedParams.type     = 'personal_brand'
    if (!extractedParams.style)    extractedParams.style    = 'cinematic'
    if (!extractedParams.platform) extractedParams.platform = 'instagram'
    if (!extractedParams.world)    extractedParams.world    = 'luxury_penthouse'
    if (!extractedParams.dayType)  extractedParams.dayType  = 'luxury_creator_day'

    // If no intent yet, respond with a clarifying opener
    if (!intent) {
      return NextResponse.json({
        phase: 'clarify',
        understood: analysis.understood || "Tell me what you'd like to create",
        question: "What would you like to build today?",
        options: [
          { value: 'perfect_day',    label: '☀ Perfect Day — cinematic full-day story' },
          { value: 'full_day_video', label: '🎬 Full Day Video — cinematic video production plan' },
          { value: 'full_campaign',  label: '◈ Full Ad Campaign — 30-day strategic campaign' },
          { value: 'instant_campaign', label: '⚡ Instant Campaign — quick campaign, ready in seconds' },
          { value: 'studio_image',   label: '◧ Studio Image — generate a specific image' },
        ],
        intent: null,
        collectedParams: extractedParams,
        history: fullHistory,
      })
    }

    const intentDef = INTENTS[intent]
    if (!intentDef) {
      return NextResponse.json({ error: `Unknown intent: ${intent}` }, { status: 400 })
    }

    // Find the first missing required param
    const missingParam = intentDef.required.find(p => !extractedParams[p])

    if (missingParam) {
      const q = intentDef.questions[missingParam]
      return NextResponse.json({
        phase: 'clarify',
        understood: analysis.understood || `Building your ${intentDef.label}`,
        question: q.text,
        options: q.options || null,
        freeText: q.freeText || false,
        placeholder: q.placeholder || null,
        paramKey: missingParam,
        intent,
        collectedParams: extractedParams,
        history: fullHistory,
      })
    }

    // All params collected — ready to execute
    const finalParams = {
      ...extractedParams,
      creatorProfile: creatorProfile || null,
      brandProfile:   brandProfile || null,
      projectId:      projectId || null,
    }

    // For identity-aware engines, merge identity traits
    if (identity?.traits) {
      finalParams.creatorProfile = {
        ...(finalParams.creatorProfile || {}),
        physical_traits: identity.traits?.subjectA || null,
        name: identity.identityName || finalParams.creatorProfile?.name,
      }
    }

    return NextResponse.json({
      phase: 'ready',
      understood: `Ready — building your ${intentDef.label}`,
      intent,
      engine: intentDef.engine,
      params: finalParams,
      history: fullHistory,
    })

  } catch (err) {
    console.error('ai-director error:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
