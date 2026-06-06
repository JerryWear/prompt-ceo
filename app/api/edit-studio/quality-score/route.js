import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { makeRouteLogger } from '../../../../lib/edit-studio/apiLogger.js'

// Allow up to 30 seconds — GPT-4o JSON scoring call
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

function makeAdminClient() {
  return createAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

// ─── Voice persona labels ─────────────────────────────────────────────────────

const VOICE_LABELS = {
  founder_male:        { label: 'Founder Male',        desc: 'deep, authoritative — best for authority and credibility plays' },
  professional_male:   { label: 'Professional Male',   desc: 'clear, trustworthy — best for LinkedIn and SaaS demos' },
  professional_female: { label: 'Professional Female', desc: 'warm, confident — best for problem/solution and launches' },
  ugc_creator:         { label: 'UGC Creator',         desc: 'casual, authentic — best for TikTok and social proof' },
  energetic_creator:   { label: 'Energetic Creator',   desc: 'high energy, punchy — best for TikTok hooks and viral formats' },
}

// Derive voice persona from ad_type (mirrors auto-render mapping)
const AD_TYPE_VOICE = {
  founder:            'founder_male',
  saas_demo:          'professional_female',
  problem_solution:   'professional_female',
  linkedin_authority: 'professional_male',
  tiktok_hook:        'energetic_creator',
}

// ─── Caption style labels ─────────────────────────────────────────────────────

const CAPTION_STYLE_LABELS = {
  bold:               'bold centered — high emphasis, large text, all caps',
  clean:              'clean minimal — small text, lower thirds, readable',
  minimal:            'minimal professional — subtle, suited for LinkedIn',
  pop:                'pop style — jumpy, colored text, maximum energy',
  cinematic:          'cinematic — large text, dramatic pacing',
  // v2 styles
  tiktok_ugc:         'TikTok UGC — 2–3 word punchy chunks, all caps',
  founder:            'Founder style — 3–4 word chunks, bold, centered',
  linkedin_authority: 'LinkedIn style — 5–7 word lines, minimal, professional',
  saas_demo:          'SaaS Demo — 3–4 word chunks, clean, crisp',
  high_energy:        'High Energy — 1–2 word bursts, caps, maximum punch',
}

// Derive caption style from ad_type (mirrors auto-render mapping)
const AD_TYPE_CAPTION_STYLE = {
  founder:            'founder',
  saas_demo:          'saas_demo',
  problem_solution:   'founder',
  linkedin_authority: 'linkedin_authority',
  tiktok_hook:        'tiktok_ugc',
}

// ─── Platform mapping ─────────────────────────────────────────────────────────

const AD_TYPE_PLATFORM = {
  founder:            'instagram / tiktok',
  saas_demo:          'linkedin / youtube',
  problem_solution:   'instagram / facebook',
  linkedin_authority: 'linkedin',
  tiktok_hook:        'tiktok',
}

// ─── Scoring system prompt ────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a senior performance marketing analyst specializing in short-form video ads and direct-response copy. You score ad concepts rigorously and specifically — no generic feedback. Every weakness must name the specific word or line that is the problem. Every suggestion must be actionable in one sentence.`

// ─── Build user scoring prompt ────────────────────────────────────────────────

function buildScoringPrompt(ad, project) {
  const understanding = project.understanding_data || {}
  const strategy      = project.creative_strategy?.strategy || {}

  const productName        = understanding.detected_products?.[0] || understanding.product_name || 'the product'
  const businessDescription= understanding.business_description   || understanding.key_messages?.[0] || 'SaaS platform'
  const platform           = AD_TYPE_PLATFORM[ad.ad_type]         || 'social media'

  const voiceKey           = ad.voiceover_voice || AD_TYPE_VOICE[ad.ad_type] || 'professional_female'
  const voicePersona       = VOICE_LABELS[voiceKey] || { label: voiceKey, desc: '' }

  const captionStyleKey    = AD_TYPE_CAPTION_STYLE[ad.ad_type] || 'founder'
  const captionStyle       = CAPTION_STYLE_LABELS[captionStyleKey] || captionStyleKey

  const script30s          = ad.script_30s || {}
  const captionCount       = Array.isArray(ad.caption_timeline) ? ad.caption_timeline.length : 0

  const targetAudience  = strategy.target_audience  || 'SaaS founders and marketers'
  const coreMessage     = strategy.primary_message  || understanding.key_messages?.[0] || 'Not specified'
  const hookText        = ad.hook_text || script30s.hook || '(no hook text recorded)'

  return `Score this ad concept for ${productName} (${businessDescription}).

TARGET AUDIENCE: ${targetAudience}
CORE MESSAGE: ${coreMessage}
AD TYPE: ${ad.ad_type} → ${platform}
HOOK ARCHETYPE: ${ad.hook_type || 'problem'}

HOOK LINE:
${hookText}

30s SCRIPT:
Hook: ${script30s.hook || '(none)'}
Body: ${script30s.body || '(none)'}
CTA:  ${script30s.cta  || '(none)'}

VOICE PERSONA: ${voicePersona.label} — ${voicePersona.desc}
CAPTION STYLE: ${captionStyle}
CAPTION COUNT: ${captionCount} chunks
DURATION: ${ad.selected_duration || '30s'}

Score each dimension 1–10. Be ruthlessly specific to this product and this copy.
Weak = below 6. Strong = 8+.

Return JSON:
{
  "dimensions": {
    "hook_strength":           { "score": 0, "reason": "specific sentence about this exact hook" },
    "clarity":                 { "score": 0, "reason": "specific sentence" },
    "offer_strength":          { "score": 0, "reason": "specific sentence" },
    "cta_strength":            { "score": 0, "reason": "specific sentence" },
    "platform_fit":            { "score": 0, "reason": "specific sentence" },
    "voiceover_fit":           { "score": 0, "reason": "specific sentence" },
    "caption_fit":             { "score": 0, "reason": "specific sentence" },
    "conversion_potential":    { "score": 0, "reason": "specific sentence" },
    "brand_product_relevance": { "score": 0, "reason": "specific sentence" }
  },
  "overall_score": 0,
  "grade": "A|B|C|D|F",
  "strengths": ["specific strength naming exact line or element"],
  "weaknesses": ["specific weakness naming exact word or line causing the problem"],
  "suggestions": [
    { "dimension": "hook_strength", "fix": "specific one-sentence rewrite or change" }
  ],
  "fix_targets": ["dimension_keys_with_score_below_6"]
}

Computation rules:
- overall_score = average of all 9 dimension scores, rounded to 1 decimal
- grade: A = 8.5+, B = 7.0–8.4, C = 5.5–6.9, D = 4.0–5.4, F = below 4.0
- fix_targets = array of dimension keys where score < 6
- strengths = max 3 items
- weaknesses = max 3 items
- suggestions = one per fix_target, max 3`
}

// ─── Compute grade from score ─────────────────────────────────────────────────

function computeGrade(score) {
  if (score >= 8.5) return 'A'
  if (score >= 7.0) return 'B'
  if (score >= 5.5) return 'C'
  if (score >= 4.0) return 'D'
  return 'F'
}

// ─── Post-process GPT output — enforce computation rules ─────────────────────

function enforceRules(raw) {
  const dims = raw.dimensions || {}
  const dimensionKeys = [
    'hook_strength', 'clarity', 'offer_strength', 'cta_strength',
    'platform_fit', 'voiceover_fit', 'caption_fit',
    'conversion_potential', 'brand_product_relevance',
  ]

  const clamp  = v => Math.min(10, Math.max(0, Number(v) || 0))
  const scores = dimensionKeys.map(k => clamp(dims[k]?.score))
  const avg    = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
  const overall = Math.round(avg * 10) / 10

  const fixTargets = dimensionKeys.filter(k => clamp(dims[k]?.score) < 6)

  return {
    dimensions:      dims,
    overall_score:   overall,
    grade:           computeGrade(overall),
    strengths:       (raw.strengths  || []).slice(0, 3),
    weaknesses:      (raw.weaknesses || []).slice(0, 3),
    suggestions:     (raw.suggestions || []).filter(s => fixTargets.includes(s.dimension)).slice(0, 3),
    fix_targets:     fixTargets,
  }
}

// ─── Mock fallback — PromptCEO-specific, not all 7s ──────────────────────────

function buildMockScores(ad, project) {
  const understanding  = project.understanding_data || {}
  const productName    = understanding.detected_products?.[0] || 'the product'
  const script30s      = ad.script_30s || {}
  const hookLine       = ad.hook_text || script30s.hook || 'the hook line'

  // Realistic distribution: 2 weak dims, strong overall narrative
  const dimensions = {
    hook_strength:           { score: 5, reason: `"${hookLine.slice(0, 60)}..." opens without naming a specific pain point — the audience scrolls before the product is mentioned` },
    clarity:                 { score: 7, reason: `The script body clearly explains what ${productName} does, though the transition from hook to body loses 2–3 seconds` },
    offer_strength:          { score: 4, reason: `No specific outcome or number is stated — "saves time" without a concrete benchmark fails to create urgency` },
    cta_strength:            { score: 6, reason: `CTA is present but uses a generic verb — replacing it with the product name and a specific action would lift click-through` },
    platform_fit:            { score: 8, reason: `Format and caption density are well-matched to ${AD_TYPE_PLATFORM[ad.ad_type] || 'the target platform'} feed behavior` },
    voiceover_fit:           { score: 7, reason: `Voice persona is consistent with the ad type — pacing holds attention through the body copy` },
    caption_fit:             { score: 8, reason: `Caption chunking aligns with voiceover rhythm; high-emphasis words are correctly isolated` },
    conversion_potential:    { score: 6, reason: `The ad generates awareness but the weak offer (score 4) reduces conversion probability at the bottom of the funnel` },
    brand_product_relevance: { score: 7, reason: `${productName} is named early; the core value prop is visible within the first 5 seconds` },
  }

  const scores  = Object.values(dimensions).map(d => d.score)
  const avg     = scores.reduce((a, b) => a + b, 0) / scores.length
  const overall = Math.round(avg * 10) / 10

  return {
    dimensions,
    overall_score: overall,
    grade:         computeGrade(overall),
    strengths: [
      `Platform fit (8): caption style and format match ${AD_TYPE_PLATFORM[ad.ad_type] || 'the platform'} consumption patterns`,
      `Caption chunking (8): high-energy words correctly isolated for maximum scroll-stop`,
      `Clarity (7): ${productName} value prop established within the first 8 seconds`,
    ],
    weaknesses: [
      `Offer strength (4): no specific number, outcome, or deadline — "saves time" is not an offer`,
      `Hook strength (5): "${hookLine.slice(0, 45)}..." does not name the pain before introducing the product`,
    ],
    suggestions: [
      { dimension: 'offer_strength', fix: 'Add a specific outcome to the body: "build a full ad campaign in under 60 seconds" converts 40% better than generic time-saving claims' },
      { dimension: 'hook_strength',  fix: 'Open with the audience\'s exact pain: "Still briefing your agency every week?" stops the scroll before the product is shown' },
    ],
    fix_targets: ['hook_strength', 'offer_strength'],
  }
}

// ─── Core scoring logic (exported for batch route) ───────────────────────────

/**
 * Score one ad concept against its parent project.
 * Returns a scores object: { dimensions, overall_score, grade, strengths, weaknesses, suggestions, fix_targets }
 *
 * @param {object} ad             - edit_ads row (full *)
 * @param {object} project        - edit_projects row (id, understanding_data, creative_strategy)
 * @param {object} supabaseAdmin  - admin Supabase client (for persisting results)
 * @returns {Promise<object>}     - scores object
 */
export async function scoreAd(ad, project, supabaseAdmin) {
  const apiKey = process.env.OPENAI_API_KEY

  let scores

  if (!apiKey) {
    scores = buildMockScores(ad, project)
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
            { role: 'user',   content: buildScoringPrompt(ad, project) },
          ],
          response_format: { type: 'json_object' },
          max_tokens:      1200,
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

      const raw = JSON.parse(content)
      scores    = enforceRules(raw)
    } catch (err) {
      // Non-fatal fallback: return mock scores with error flag
      scores = {
        ...buildMockScores(ad, project),
        fallback:       true,
        fallback_reason: `Scoring unavailable: ${err.message}`,
      }
    }
  }

  // Persist to edit_ads.quality_scores — non-fatal
  if (supabaseAdmin) {
    try {
      await supabaseAdmin
        .from('edit_ads')
        .update({ quality_scores: scores })
        .eq('id', ad.id)
    } catch {
      // Non-fatal — caller still receives scores
    }
  }

  return scores
}

// ─── Route ────────────────────────────────────────────────────────────────────
// POST /api/edit-studio/quality-score
// Body: { adId }

export async function POST(req) {
  const log = makeRouteLogger('quality-score')

  try {
    const body = await req.json()
    const { adId } = body

    // ── Validate input ────────────────────────────────────────────────────────
    if (!adId) {
      return NextResponse.json(
        { status: 'error', ok: false, message: 'adId is required.' },
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
      .select('*')
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

    // ── Fetch parent project (for understanding_data + creative_strategy) ─────
    const { data: project, error: projectErr } = await supabaseAdmin
      .from('edit_projects')
      .select('id, user_id, understanding_data, creative_strategy')
      .eq('id', ad.project_id)
      .single()

    if (projectErr || !project) {
      return NextResponse.json(
        { status: 'error', ok: false, message: `Project not found: ${projectErr?.message ?? 'unknown error'}` },
        { status: 404 }
      )
    }

    // ── Score the ad ──────────────────────────────────────────────────────────
    log.info(`Scoring ad ${adId} (type: ${ad.ad_type})`)
    const scores = await scoreAd(ad, project, supabaseAdmin)

    log.success({
      projectId: ad.project_id,
      extra: {
        adId,
        adType:        ad.ad_type,
        overall_score: scores.overall_score,
        grade:         scores.grade,
        fix_targets:   scores.fix_targets?.length ?? 0,
      },
    })

    return NextResponse.json({
      status:  'success',
      ok:      true,
      adId,
      adType:  ad.ad_type,
      scores,
    })
  } catch (err) {
    log.failure({ errorCode: 'QUALITY_SCORE_FATAL', message: err.message })
    return NextResponse.json(
      { status: 'error', ok: false, message: err.message },
      { status: 500 }
    )
  }
}
