import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { makeRouteLogger } from '../../../../lib/edit-studio/apiLogger.js'

// Allow up to 30 seconds — GPT-4o JSON generation can be slow
export const maxDuration = 30

const OPENAI_CHAT_URL = 'https://api.openai.com/v1/chat/completions'
const MODEL           = 'gpt-4o'

// ─── Supabase helpers ─────────────────────────────────────────────────────────

async function makeSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
      },
    }
  )
}

// ─── System prompt ────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a senior performance marketing strategist. You have reviewed thousands of SaaS and DTC ads and know exactly what converts. You make specific, opinionated decisions — never hedge, never say "it depends", never give generic advice. Every recommendation must be tied to the specific product in the video analysis provided. You are writing a creative brief, not a description.`

// ─── User prompt ──────────────────────────────────────────────────────────────

function buildUserPrompt(understandingData) {
  const sources = understandingData?.input_sources || [understandingData?.input_type || 'video']
  const sourceLabel = sources.length > 1
    ? `combined analysis from: ${sources.join(' + ')}`
    : `${sources[0]} analysis`

  return `Here is the ${sourceLabel} for this product:

${JSON.stringify(understandingData, null, 2)}

Produce a complete marketing strategy and ad concept set for this specific product.
Note: the understanding above may combine signals from video (what was said/shown), image (visual aesthetic, product appearance), and a written product description. Use all available signals — do not default to video-only thinking.

Return JSON with exactly this schema:
{
  "strategy": {
    "positioning": "founder_authority|product_demo|transformation|problem_solution|social_proof",
    "positioning_rationale": "specific reason tied to this product",
    "target_audience": "specific — not 'marketers' but 'SaaS founders spending 5k+/mo on creative agencies'",
    "primary_platform": "tiktok|instagram|linkedin|youtube|meta",
    "platform_rationale": "why this platform fits",
    "ad_format": "ugc|talking_head|screen_demo|montage|testimonial",
    "recommended_duration": "15s|30s|60s",
    "duration_rationale": "why",
    "primary_message": "the single most important thing the ad must communicate",
    "supporting_messages": ["2-3 secondary points"],
    "cta": "specific CTA referencing the actual product name",
    "hook_strategy": "curiosity|problem|authority|transformation|contrarian",
    "hook_strategy_rationale": "why this hook type stops the scroll for this audience",
    "opening_hook_example": "concrete first line of the ad — must reference the actual product name",
    "avoid": ["specific things to avoid"]
  },
  "ad_concepts": [
    {
      "type": "founder|demo|saas|linkedin|tiktok|ugc|launch|retargeting",
      "title": "short name",
      "logline": "one sentence: what this ad does and why it works",
      "hook": "specific opening line or visual for this concept",
      "recommended": true
    }
  ],
  "primary_concept": "the type value of the single best concept"
}

Rules:
- Do not be generic. Every recommendation must name the specific product and features detected. No filler. No hedging. Pick one answer for each field.
- For SaaS products: bias toward product_demo or founder_authority positioning, and linkedin or tiktok as primary platform.
- ad_concepts must contain 3 to 5 items. Exactly one must have recommended: true.
- primary_concept must match the type of the recommended concept.`
}

// ─── Mock fallback ────────────────────────────────────────────────────────────
// PromptCEO-specific mock — not generic placeholder text.

function buildMockStrategy(understandingData) {
  const productName = understandingData?.detected_products?.[0] || 'PromptCEO'
  return {
    strategy: {
      positioning: 'product_demo',
      positioning_rationale: `${productName} solves a concrete, expensive problem — showing it in action is more persuasive than talking about it`,
      target_audience: 'SaaS founders and marketing leads spending $3k–$10k/month on creative agencies or freelancers',
      primary_platform: 'linkedin',
      platform_rationale: 'Decision-makers with creative budgets live on LinkedIn; product demos perform exceptionally well in the feed',
      ad_format: 'screen_demo',
      recommended_duration: '30s',
      duration_rationale: '30s is long enough to show two key features but short enough to hold attention in a feed',
      primary_message: `${productName} replaces your creative agency with an AI that knows your brand`,
      supporting_messages: [
        'Every campaign remembers your Brand DNA',
        'Hooks, scripts, and captions generated in under 60 seconds',
      ],
      cta: `Start free at ${productName.toLowerCase()}.io`,
      hook_strategy: 'problem',
      hook_strategy_rationale: 'Marketing teams feel the pain of slow, expensive creative — naming it immediately creates recognition',
      opening_hook_example: `Still paying your agency $5,000 to write ad copy? ${productName} does it in 30 seconds.`,
      avoid: [
        'Generic AI claims without showing the product',
        'Long intros before showing the actual tool',
        'Listing features without showing the time/money saved',
      ],
    },
    ad_concepts: [
      {
        type: 'demo',
        title: 'The 30-Second Agency',
        logline: 'Show the full campaign creation flow from upload to finished ad — the speed is the story',
        hook: `Watch ${productName} build a full ad campaign in under 30 seconds`,
        recommended: true,
      },
      {
        type: 'founder',
        title: 'Why I Built This',
        logline: 'Founder explains the problem they were solving — resonates with other founders who feel the same pain',
        hook: 'I was spending $8,000 a month on an agency that took two weeks to deliver one ad',
        recommended: false,
      },
      {
        type: 'saas',
        title: 'Before vs After',
        logline: 'Side-by-side of the old creative workflow vs the new one — makes the value visceral',
        hook: 'Old way: brief, agency, revisions, 2 weeks. New way: upload, 60 seconds, done.',
        recommended: false,
      },
    ],
    primary_concept: 'demo',
  }
}

// ─── Route ────────────────────────────────────────────────────────────────────
// POST /api/edit-studio/creative-director
// Body: { projectId, understandingData }

export async function POST(req) {
  const log = makeRouteLogger('creative-director')

  try {
    const body = await req.json()
    const { projectId, understandingData } = body

    // ── Validate inputs ───────────────────────────────────────────────────────
    if (!projectId) {
      return NextResponse.json(
        { status: 'error', ok: false, message: 'projectId is required.' },
        { status: 400 }
      )
    }
    if (!understandingData) {
      return NextResponse.json(
        { status: 'error', ok: false, message: 'understandingData is required.' },
        { status: 400 }
      )
    }

    // ── Auth ──────────────────────────────────────────────────────────────────
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { status: 'error', ok: false, message: 'Authentication required.' },
        { status: 401 }
      )
    }

    // ── Call GPT-4o ───────────────────────────────────────────────────────────
    let result
    let fallback       = false
    let fallbackReason = ''

    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      fallback       = true
      fallbackReason = 'OPENAI_API_KEY not configured'
      result         = buildMockStrategy(understandingData)
    } else {
      try {
        log.info('Calling GPT-4o for marketing strategy')
        const gptRes = await fetch(OPENAI_CHAT_URL, {
          method:  'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type':  'application/json',
          },
          body: JSON.stringify({
            model:    MODEL,
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              { role: 'user',   content: buildUserPrompt(understandingData) },
            ],
            response_format: { type: 'json_object' },
            max_tokens:      2000,
          }),
        })

        if (!gptRes.ok) {
          const errText = await gptRes.text().catch(() => gptRes.statusText)
          throw new Error(`OpenAI ${gptRes.status}: ${errText}`)
        }

        const gptData = await gptRes.json()
        const content = gptData.choices?.[0]?.message?.content
        if (!content) {
          throw new Error(`GPT-4o returned empty content (finish_reason: ${gptData.choices?.[0]?.finish_reason ?? 'unknown'})`)
        }
        result = JSON.parse(content)

        // Ensure primary_concept matches a real concept type
        const recommendedConcept = result.ad_concepts?.find(c => c.recommended)
        if (result.primary_concept && result.ad_concepts?.length) {
          const valid = result.ad_concepts.some(c => c.type === result.primary_concept)
          if (!valid) result.primary_concept = recommendedConcept?.type ?? result.ad_concepts[0]?.type
        }
      } catch (err) {
        fallback       = true
        fallbackReason = `Marketing strategy unavailable: ${err.message}`
        result         = buildMockStrategy(understandingData)
      }
    }

    // ── Persist to Supabase (non-fatal) ───────────────────────────────────────
    try {
      await supabase
        .from('edit_projects')
        .update({ creative_strategy: result })
        .eq('id', projectId)
        .eq('user_id', user.id)
    } catch {
      // Non-fatal — client still receives the strategy
    }

    log.success({
      projectId,
      fallback,
      extra: {
        positioning:     result.strategy?.positioning,
        primary_platform: result.strategy?.primary_platform,
        concepts:        result.ad_concepts?.length,
        primary_concept: result.primary_concept,
      },
    })

    return NextResponse.json({
      status:          'success',
      ok:              true,
      fallback,
      fallback_reason: fallback ? fallbackReason : undefined,
      strategy:        result.strategy,
      ad_concepts:     result.ad_concepts,
      primary_concept: result.primary_concept,
    })
  } catch (err) {
    log.failure({ errorCode: 'CREATIVE_DIRECTOR_FATAL', message: err.message })
    return NextResponse.json(
      { status: 'error', ok: false, message: err.message },
      { status: 500 }
    )
  }
}
