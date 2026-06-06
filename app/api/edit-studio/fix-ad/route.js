import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { makeRouteLogger } from '../../../../lib/edit-studio/apiLogger.js'

// Allow up to 20 seconds — GPT-4o targeted rewrite call
export const maxDuration = 20

const OPENAI_CHAT_URL = 'https://api.openai.com/v1/chat/completions'
const MODEL           = 'gpt-4o'

// ─── Allowed dimensions ───────────────────────────────────────────────────────

const ALLOWED_DIMENSIONS = [
  'hook_strength',
  'cta_strength',
  'clarity',
  'offer_strength',
  'brand_product_relevance',
]

// fix_type per dimension — drives UI rendering
const DIMENSION_FIX_TYPE = {
  hook_strength:           'rewrite',
  cta_strength:            'options',
  clarity:                 'rewrite',
  offer_strength:          'rewrite',
  brand_product_relevance: 'dual',
}

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

function makeAdminClient() {
  return createAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

// ─── System prompt (shared across all dimensions) ────────────────────────────

const SYSTEM_PROMPT =
  `You are a direct-response copywriter fixing a specific weakness in an ad script. Be specific to the product. Write exactly what should replace the weak element. No explanation — just the improved copy.`

// ─── Build targeted fix prompt per dimension ─────────────────────────────────

function buildFixPrompt(dimension, ad, project) {
  const understanding   = project.understanding_data || {}
  const productName     = understanding.detected_products?.[0] || understanding.product_name || 'the product'
  const businessDesc    = understanding.business_description || understanding.key_messages?.[0] || ''
  const keyMessages     = understanding.key_messages || []
  const detectedProducts= understanding.detected_products || []
  const script30s       = ad.script_30s || {}
  const qualityScores   = ad.quality_scores || {}
  const dims            = qualityScores.dimensions || {}

  // Helper: get weakness reason or fallback to "unscored"
  const weaknessReason = (dim) => dims[dim]?.reason || null

  switch (dimension) {

    case 'hook_strength': {
      const reason = weaknessReason('hook_strength')
      const weaknessLine = reason
        ? `Weakness: ${reason}\n\n`
        : ''
      return `Product: ${productName}
Ad type: ${ad.ad_type || 'unknown'}
Current hook: "${ad.hook_text || script30s.hook || ''}"
${weaknessLine}Write a stronger hook for this ad type and product. Rules:
- Under 15 words
- Must include the product name
- Must match the ${ad.hook_type || 'problem'} archetype
- Write for spoken TTS — short sentences

Return JSON: { "fix": "the new hook line", "explanation": "one sentence on why this is stronger" }`
    }

    case 'cta_strength': {
      const reason = weaknessReason('cta_strength')
      const weaknessLine = reason
        ? `Weakness: ${reason}\n\n`
        : ''
      return `Product: ${productName}
Current CTA: "${script30s.cta || ''}"
${weaknessLine}Write 3 stronger CTAs. Specific, spoken naturally, includes URL or action.

Return JSON: { "options": ["cta 1", "cta 2", "cta 3"], "recommended": 0, "explanation": "one sentence" }`
    }

    case 'clarity': {
      const reason = weaknessReason('clarity')
      const weaknessLine = reason
        ? `Weakness: ${reason}\n\n`
        : ''
      return `Product: ${productName}
Current body: "${script30s.body || ''}"
${weaknessLine}Rewrite this body section for maximum clarity. One idea per sentence. Max 10 words per sentence.

Return JSON: { "fix": "the rewritten body text", "explanation": "one sentence on what changed" }`
    }

    case 'offer_strength': {
      const reason = weaknessReason('offer_strength')
      const weaknessLine = reason
        ? `Weakness: ${reason}\n\n`
        : ''
      const keyMsgLine = keyMessages.length
        ? `Key messages: ${keyMessages.join(', ')}\n`
        : ''
      return `Product: ${productName}. It ${businessDesc}.
${keyMsgLine}Current body: "${script30s.body || ''}"
${weaknessLine}Rewrite the body to make the value proposition more specific. Name what the user gains. Name what they avoid paying or doing.

Return JSON: { "fix": "the rewritten body text", "explanation": "one sentence on what changed" }`
    }

    case 'brand_product_relevance': {
      const reason = weaknessReason('brand_product_relevance')
      const weaknessLine = reason
        ? `Weakness: ${reason}\n\n`
        : ''
      const featuresLine = detectedProducts.length
        ? `Products/features: ${detectedProducts.join(', ')}\n`
        : ''
      return `Product: ${productName} — ${businessDesc}
${featuresLine}Current hook: "${ad.hook_text || script30s.hook || ''}"
Current body: "${script30s.body || ''}"
${weaknessLine}Rewrite the hook + body to reference the specific product features detected in the video. Name at least one specific feature.

Return JSON: { "hook_fix": "new hook", "body_fix": "new body", "explanation": "one sentence" }`
    }

    default:
      return null
  }
}

// ─── Mock fallbacks — PromptCEO-specific, per dimension ──────────────────────

function buildMockFix(dimension, ad, project) {
  const understanding = project.understanding_data || {}
  const productName   = understanding.detected_products?.[0] || understanding.product_name || 'PromptCEO'
  const script30s     = ad.script_30s || {}

  switch (dimension) {

    case 'hook_strength':
      return {
        fix:         `${productName} builds your entire ad campaign in under 60 seconds.`,
        explanation: 'Opens with the product name and a concrete time-bound outcome — stops the scroll before the audience can swipe.',
      }

    case 'cta_strength':
      return {
        options: [
          `Try ${productName} free at promptceo.com — your first campaign is on us.`,
          `Go to promptceo.com right now and build your first ad in under 60 seconds.`,
          `Sign up at promptceo.com — no credit card, no agency, no brief required.`,
        ],
        recommended:  0,
        explanation: 'Each CTA names the product, gives a specific URL, and removes a barrier to action.',
      }

    case 'clarity':
      return {
        fix:         `${productName} writes your hook. It selects your angle. It builds your campaign. You approve. Done.`,
        explanation: 'Each sentence is a single action — eliminates the cognitive load that makes audiences tune out at the body copy.',
      }

    case 'offer_strength':
      return {
        fix:         `${productName} replaces your entire creative brief — no agency, no waiting, no $3,000 retainer. You get five campaign-ready ads in one session.`,
        explanation: 'Names what the user gains (5 ads, one session) and what they avoid (agency cost, retainer) — both required for a strong offer.',
      }

    case 'brand_product_relevance':
      return {
        hook_fix:    `${productName}'s AI Director just analyzed your footage and wrote your campaign.`,
        body_fix:    `Every line you hear was built from your product features — not a template. ${productName} reads your video, identifies your strongest selling points, and writes ad copy that actually matches what you're selling.`,
        explanation: 'Hook and body now both name the specific capability (AI Director, feature detection) rather than generic AI claims.',
      }

    default:
      return { fix: 'Mock fix unavailable for this dimension.', explanation: 'Unknown dimension.' }
  }
}

// ─── Route ────────────────────────────────────────────────────────────────────
// POST /api/edit-studio/fix-ad
// Body: { adId, dimension }

export async function POST(req) {
  const log = makeRouteLogger('fix-ad')

  try {
    const body = await req.json()
    const { adId, dimension } = body

    // ── Validate input ────────────────────────────────────────────────────────
    if (!adId || !dimension) {
      return NextResponse.json(
        { status: 'error', ok: false, message: 'adId and dimension are required.' },
        { status: 400 }
      )
    }

    if (!ALLOWED_DIMENSIONS.includes(dimension)) {
      return NextResponse.json(
        {
          status:  'error',
          ok:      false,
          message: `Invalid dimension "${dimension}". Allowed: ${ALLOWED_DIMENSIONS.join(', ')}.`,
        },
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

    const supabaseAdmin = makeAdminClient()

    // ── Fetch ad row ──────────────────────────────────────────────────────────
    const { data: ad, error: adErr } = await supabaseAdmin
      .from('edit_ads')
      .select('id, user_id, project_id, ad_type, hook_type, hook_text, script_30s, quality_scores')
      .eq('id', adId)
      .single()

    if (adErr || !ad) {
      return NextResponse.json(
        { status: 'error', ok: false, message: `Ad not found: ${adErr?.message ?? 'unknown error'}` },
        { status: 404 }
      )
    }

    // Security: verify ownership
    if (ad.user_id !== user.id) {
      return NextResponse.json(
        { status: 'error', ok: false, message: 'Ad not found.' },
        { status: 404 }
      )
    }

    // ── Fetch parent project (for understanding_data) ─────────────────────────
    const { data: project, error: projectErr } = await supabaseAdmin
      .from('edit_projects')
      .select('id, user_id, understanding_data')
      .eq('id', ad.project_id)
      .single()

    if (projectErr || !project) {
      return NextResponse.json(
        { status: 'error', ok: false, message: `Project not found: ${projectErr?.message ?? 'unknown error'}` },
        { status: 404 }
      )
    }

    // ── Build fix prompt ──────────────────────────────────────────────────────
    const userPrompt = buildFixPrompt(dimension, ad, project)
    const fixType    = DIMENSION_FIX_TYPE[dimension]

    log.info(`Generating fix for ad ${adId} — dimension: ${dimension}`)

    // ── Call GPT-4o or fall back to mock ──────────────────────────────────────
    const apiKey = process.env.OPENAI_API_KEY
    let fix
    let fallback = false
    let fallbackReason = null

    if (!apiKey) {
      fix            = buildMockFix(dimension, ad, project)
      fallback       = true
      fallbackReason = 'No OPENAI_API_KEY — returning PromptCEO mock fix.'
    } else {
      try {
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
              { role: 'user',   content: userPrompt },
            ],
            response_format: { type: 'json_object' },
            max_tokens:      600,
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

        fix = JSON.parse(content)
      } catch (err) {
        // Non-fatal: fall back to mock so UI always gets a usable result
        fix            = buildMockFix(dimension, ad, project)
        fallback       = true
        fallbackReason = `GPT-4o unavailable: ${err.message}`
      }
    }

    // ── Return proposed fix — do NOT write to edit_ads ────────────────────────
    log.success({
      projectId: ad.project_id,
      extra: {
        adId,
        dimension,
        fix_type: fixType,
        fallback,
      },
    })

    return NextResponse.json({
      status:    'success',
      ok:        true,
      adId,
      dimension,
      fix,
      fix_type:  fixType,
      ...(fallback ? { fallback: true, fallback_reason: fallbackReason } : {}),
    })
  } catch (err) {
    log.failure({ errorCode: 'FIX_AD_FATAL', message: err.message })
    return NextResponse.json(
      { status: 'error', ok: false, message: err.message },
      { status: 500 }
    )
  }
}
