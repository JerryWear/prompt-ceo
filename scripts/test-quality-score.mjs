/**
 * Sprint 7 validation: Quality Engine
 *
 * Calls GPT-4o directly to score 5 PromptCEO ad concepts across 9 dimensions.
 * Shows full scores, grades, strengths/weaknesses, fix_targets, and render readiness.
 *
 * Usage: node scripts/test-quality-score.mjs
 * Does NOT write to the database — safe to run anytime.
 */
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
function loadEnv() {
  try {
    const lines = readFileSync(join(__dirname, '..', '.env.local'), 'utf8').split('\n')
    for (const line of lines) {
      const t = line.trim()
      if (!t || t.startsWith('#')) continue
      const eq = t.indexOf('=')
      if (eq === -1) continue
      const k = t.slice(0, eq).trim()
      const v = t.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
      if (!process.env[k]) process.env[k] = v
    }
  } catch {}
}
loadEnv()

// ── Fixtures — same data the live pipeline produces ───────────────────────────

const MOCK_PROJECT = {
  id: 'proj-test-uuid',
  user_id: 'user-test-uuid',
  understanding_data: {
    detected_products: ['PromptCEO'],
    business_type: 'saas',
    business_description: 'PromptCEO is an AI Creative Operating System for marketers and creators — generates prompts, builds ad campaigns, edits video, and selects music using AI.',
    key_messages: [
      'PromptCEO is the AI Creative Operating System.',
      'Build full ad campaigns from one video upload in under 60 seconds.',
      'AI Director, Campaign Intelligence, and Music Studio in one platform.',
    ],
  },
  creative_strategy: {
    strategy: {
      target_audience: 'SaaS founders, indie hackers, and digital marketers who currently spend $3k–$10k/month on creative agencies',
      primary_message:  'Replace your creative agency with one AI platform — faster, cheaper, better.',
    },
  },
}

const MOCK_ADS = [
  {
    id: 'ad-founder-uuid',
    ad_type: 'founder',
    hook_type: 'personal_story',
    hook_text: 'I was paying eight thousand dollars a month to a creative agency. I built PromptCEO instead.',
    selected_duration: '30s',
    script_30s: {
      hook: 'I was paying eight thousand dollars a month to a creative agency.',
      body: 'So I built PromptCEO. Upload one screen recording. Get five finished ads — with voiceover, captions, and music — in under 60 seconds.',
      cta:  'Try PromptCEO free. Link in bio.',
    },
    voiceover_voice: 'founder_male',
    caption_timeline: [
      { text: 'EIGHT THOUSAND', start: 0,    end: 1.5 },
      { text: 'DOLLARS A MONTH', start: 1.5,  end: 3.0 },
      { text: 'TO AN AGENCY',    start: 3.0,  end: 4.5 },
      { text: 'I BUILT',         start: 6.0,  end: 7.0 },
      { text: 'PROMPTCEO',       start: 7.0,  end: 8.5 },
      { text: '5 ADS IN 60s',    start: 20.0, end: 22.0 },
      { text: 'TRY FREE',        start: 28.0, end: 30.0 },
    ],
  },
  {
    id: 'ad-saas-uuid',
    ad_type: 'saas_demo',
    hook_type: 'curiosity',
    hook_text: 'Watch this. I just uploaded one video and got five finished ads.',
    selected_duration: '30s',
    script_30s: {
      hook: 'Watch this. One video upload.',
      body: 'PromptCEO analyzed my screen recording, wrote five ad scripts, generated voiceovers, added captions, and selected music. All in under 60 seconds.',
      cta:  'See it at PromptCEO dot io.',
    },
    voiceover_voice: 'professional_female',
    caption_timeline: [
      { text: 'ONE VIDEO',    start: 0,    end: 1.5 },
      { text: 'FIVE ADS',     start: 1.5,  end: 3.0 },
      { text: '60 SECONDS',   start: 3.0,  end: 4.5 },
      { text: 'PROMPTCEO.IO', start: 28.0, end: 30.0 },
    ],
  },
  {
    id: 'ad-prob-uuid',
    ad_type: 'problem_solution',
    hook_type: 'pain_point',
    hook_text: 'You briefed your agency three weeks ago. You still have one ad.',
    selected_duration: '30s',
    script_30s: {
      hook: 'You briefed your agency three weeks ago. You have one ad to show for it.',
      body: 'PromptCEO uploads your footage, writes the scripts, generates the voiceover, adds captions, and selects the music — in 60 seconds. Not three weeks.',
      cta:  'Start free today.',
    },
    voiceover_voice: 'professional_female',
    caption_timeline: [
      { text: 'THREE WEEKS',   start: 0,    end: 1.5 },
      { text: 'ONE AD.',       start: 1.5,  end: 3.0 },
      { text: '60 SECONDS.',   start: 20.0, end: 22.0 },
      { text: 'START FREE',    start: 28.0, end: 30.0 },
    ],
  },
  {
    id: 'ad-li-uuid',
    ad_type: 'linkedin_authority',
    hook_type: 'insight',
    hook_text: 'Most marketing teams outsource creative because they think there is no other option.',
    selected_duration: '30s',
    script_30s: {
      hook: 'Most marketing teams outsource creative because they think there is no other option.',
      body: 'PromptCEO is the AI Creative Operating System. Upload raw footage. Get five finished ad concepts with voiceover, captions, and music — scored by AI before you render a single frame.',
      cta:  'See what is possible at PromptCEO dot io.',
    },
    voiceover_voice: 'professional_male',
    caption_timeline: [
      { text: 'MOST MARKETING TEAMS',   start: 0,    end: 2.5 },
      { text: 'OUTSOURCE CREATIVE',     start: 2.5,  end: 4.5 },
      { text: 'AI CREATIVE OS',         start: 12.0, end: 14.0 },
      { text: 'SCORED BEFORE RENDER',   start: 22.0, end: 25.0 },
      { text: 'PROMPTCEO.IO',           start: 28.0, end: 30.0 },
    ],
  },
  {
    id: 'ad-tiktok-uuid',
    ad_type: 'tiktok_hook',
    hook_type: 'pattern_interrupt',
    hook_text: 'Okay wait. You need to see this right now.',
    selected_duration: '30s',
    script_30s: {
      hook: 'Okay wait. You need to see this.',
      body: 'I just replaced my entire creative agency with one AI tool. Upload a screen recording. Get five ads. Voiceover. Captions. Music. Done. PromptCEO.',
      cta:  'PromptCEO dot io.',
    },
    voiceover_voice: 'energetic_creator',
    caption_timeline: [
      { text: 'WAIT.',          start: 0,    end: 0.8 },
      { text: 'SEE THIS.',      start: 0.8,  end: 1.8 },
      { text: 'REPLACED',       start: 4.0,  end: 5.0 },
      { text: 'MY AGENCY',      start: 5.0,  end: 6.0 },
      { text: '5 ADS.',         start: 10.0, end: 11.0 },
      { text: 'VOICE.',         start: 11.0, end: 12.0 },
      { text: 'CAPTIONS.',      start: 12.0, end: 13.0 },
      { text: 'MUSIC.',         start: 13.0, end: 14.0 },
      { text: 'DONE.',          start: 14.0, end: 15.0 },
      { text: 'PROMPTCEO.IO',   start: 28.0, end: 30.0 },
    ],
  },
]

// ── Scoring constants (mirrors quality-score/route.js) ────────────────────────

const OPENAI_CHAT_URL = 'https://api.openai.com/v1/chat/completions'
const MODEL           = 'gpt-4o'
const MIN_AVG_SCORE   = 6.0
const MIN_AD_SCORE    = 4.0

const VOICE_LABELS = {
  founder_male:        { label: 'Founder Male',        desc: 'deep, authoritative — best for authority and credibility plays' },
  professional_male:   { label: 'Professional Male',   desc: 'clear, trustworthy — best for LinkedIn and SaaS demos' },
  professional_female: { label: 'Professional Female', desc: 'warm, confident — best for problem/solution and launches' },
  ugc_creator:         { label: 'UGC Creator',         desc: 'casual, authentic — best for TikTok and social proof' },
  energetic_creator:   { label: 'Energetic Creator',   desc: 'high energy, punchy — best for TikTok hooks and viral formats' },
}

const AD_TYPE_PLATFORM = {
  founder:            'instagram / tiktok',
  saas_demo:          'linkedin / youtube',
  problem_solution:   'instagram / facebook',
  linkedin_authority: 'linkedin',
  tiktok_hook:        'tiktok',
}

const CAPTION_STYLE_LABELS = {
  founder:            'Founder style — 3–4 word chunks, bold, centered',
  saas_demo:          'SaaS Demo — 3–4 word chunks, clean, crisp',
  problem_solution:   'Founder style — 3–4 word chunks, bold, centered',
  linkedin_authority: 'LinkedIn style — 5–7 word lines, minimal, professional',
  tiktok_hook:        'TikTok UGC — 2–3 word punchy chunks, all caps',
}

const SYSTEM_PROMPT = `You are a senior performance marketing analyst specializing in short-form video ads and direct-response copy. You score ad concepts rigorously and specifically — no generic feedback. Every weakness must name the specific word or line that is the problem. Every suggestion must be actionable in one sentence.`

function buildScoringPrompt(ad) {
  const understanding = MOCK_PROJECT.understanding_data
  const strategy      = MOCK_PROJECT.creative_strategy.strategy

  const productName   = understanding.detected_products[0]
  const bizDesc       = understanding.business_description
  const platform      = AD_TYPE_PLATFORM[ad.ad_type] || 'social media'
  const voicePersona  = VOICE_LABELS[ad.voiceover_voice] || { label: ad.voiceover_voice, desc: '' }
  const captionStyle  = CAPTION_STYLE_LABELS[ad.ad_type] || ad.ad_type
  const captionCount  = ad.caption_timeline.length
  const script30s     = ad.script_30s

  return `Score this ad concept for ${productName} (${bizDesc}).

TARGET AUDIENCE: ${strategy.target_audience}
CORE MESSAGE: ${strategy.primary_message}
AD TYPE: ${ad.ad_type} → ${platform}
HOOK ARCHETYPE: ${ad.hook_type}

HOOK LINE:
${ad.hook_text}

30s SCRIPT:
Hook: ${script30s.hook}
Body: ${script30s.body}
CTA:  ${script30s.cta}

VOICE PERSONA: ${voicePersona.label} — ${voicePersona.desc}
CAPTION STYLE: ${captionStyle}
CAPTION COUNT: ${captionCount} chunks
DURATION: ${ad.selected_duration}

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

function computeGrade(score) {
  if (score >= 8.5) return 'A'
  if (score >= 7.0) return 'B'
  if (score >= 5.5) return 'C'
  if (score >= 4.0) return 'D'
  return 'F'
}

function enforceRules(raw) {
  const dims = raw.dimensions || {}
  const keys = [
    'hook_strength', 'clarity', 'offer_strength', 'cta_strength',
    'platform_fit', 'voiceover_fit', 'caption_fit',
    'conversion_potential', 'brand_product_relevance',
  ]
  const clamp  = v => Math.min(10, Math.max(0, Number(v) || 0))
  const scores = keys.map(k => clamp(dims[k]?.score))
  const avg    = scores.reduce((a, b) => a + b, 0) / scores.length
  const overall = Math.round(avg * 10) / 10
  const fixTargets = keys.filter(k => clamp(dims[k]?.score) < 6)

  return {
    dimensions:   dims,
    overall_score: overall,
    grade:         computeGrade(overall),
    strengths:     (raw.strengths  || []).slice(0, 3),
    weaknesses:    (raw.weaknesses || []).slice(0, 3),
    suggestions:   (raw.suggestions || []).filter(s => fixTargets.includes(s.dimension)).slice(0, 3),
    fix_targets:   fixTargets,
  }
}

async function scoreAd(ad) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error('OPENAI_API_KEY not found in .env.local')

  const res = await fetch(OPENAI_CHAT_URL, {
    method:  'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type':  'application/json',
    },
    body: JSON.stringify({
      model:    MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user',   content: buildScoringPrompt(ad) },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 1200,
    }),
  })

  if (!res.ok) {
    const errText = await res.text().catch(() => res.statusText)
    throw new Error(`OpenAI ${res.status}: ${errText}`)
  }

  const data    = await res.json()
  const content = data.choices?.[0]?.message?.content
  if (!content) throw new Error(`GPT-4o returned empty content`)

  return enforceRules(JSON.parse(content))
}

function assessReadiness(results) {
  const valid = results.filter(r => r.scores && typeof r.scores.overall_score === 'number')
  if (!valid.length) return { ready_to_render: false, render_warning: 'No valid scores.' }

  const avg     = valid.reduce((s, r) => s + r.scores.overall_score, 0) / valid.length
  const avgR    = Math.round(avg * 10) / 10
  const critical = valid.filter(r => r.scores.overall_score < MIN_AD_SCORE)

  if (critical.length) {
    return {
      ready_to_render: false,
      avg_score: avgR,
      render_warning: `Grade-F ad(s): ${critical.map(r => r.ad.ad_type).join(', ')} — revise before rendering`,
    }
  }
  if (avgR < MIN_AVG_SCORE) {
    return {
      ready_to_render: false,
      avg_score: avgR,
      render_warning: `Average ${avgR} is below ${MIN_AVG_SCORE} threshold — review fix_targets`,
    }
  }
  return { ready_to_render: true, avg_score: avgR, render_warning: null }
}

function scoreBar(score) {
  const filled = Math.round(score)
  return '[' + '█'.repeat(filled) + '░'.repeat(10 - filled) + `] ${score.toFixed(1)}`
}

function gradeColor(grade) {
  return { A: '🟢', B: '🟡', C: '🟠', D: '🔴', F: '❌' }[grade] || '⚪'
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function run() {
  console.log('='.repeat(72))
  console.log('PromptCEO — Sprint 7 Validation: Quality Engine')
  console.log(`Scoring 5 ad concepts via GPT-4o (${MODEL})`)
  console.log('='.repeat(72))
  console.log()

  const results = []

  for (const ad of MOCK_ADS) {
    const label = ad.ad_type.toUpperCase().replace(/_/g, ' ')
    process.stdout.write(`Scoring ${label}... `)

    try {
      const scores = await scoreAd(ad)
      results.push({ ad, scores, error: null })
      console.log(`${gradeColor(scores.grade)} ${scores.grade}  (${scores.overall_score}/10)`)
    } catch (err) {
      results.push({ ad, scores: null, error: err.message })
      console.log(`❌ ERROR: ${err.message}`)
    }
  }

  console.log()

  // ── Per-ad detail ───────────────────────────────────────────────────────────
  for (const { ad, scores, error } of results) {
    const label = ad.ad_type.toUpperCase().replace(/_/g, ' ')
    console.log('─'.repeat(72))
    console.log(`AD: ${label}  [${ad.ad_type}]`)

    if (error) {
      console.log(`  ❌ Scoring failed: ${error}`)
      continue
    }

    console.log(`  Overall: ${scoreBar(scores.overall_score)}  Grade: ${gradeColor(scores.grade)} ${scores.grade}`)
    console.log()
    console.log('  Dimensions:')

    const dims = scores.dimensions
    const keys = [
      'hook_strength', 'clarity', 'offer_strength', 'cta_strength',
      'platform_fit', 'voiceover_fit', 'caption_fit',
      'conversion_potential', 'brand_product_relevance',
    ]
    for (const k of keys) {
      const d     = dims[k]
      const score = d?.score ?? '?'
      const flag  = score < 6 ? ' ⚠' : ''
      const label = k.replace(/_/g, ' ').padEnd(24)
      console.log(`    ${label}  ${String(score).padStart(2)}/10${flag}`)
      if (d?.reason) console.log(`      → ${d.reason}`)
    }

    if (scores.strengths?.length) {
      console.log()
      console.log('  Strengths:')
      scores.strengths.forEach(s => console.log(`    ✓ ${s}`))
    }

    if (scores.weaknesses?.length) {
      console.log()
      console.log('  Weaknesses:')
      scores.weaknesses.forEach(w => console.log(`    ✗ ${w}`))
    }

    if (scores.suggestions?.length) {
      console.log()
      console.log('  Fix suggestions:')
      scores.suggestions.forEach(s => console.log(`    → [${s.dimension}] ${s.fix}`))
    }

    if (scores.fix_targets?.length) {
      console.log()
      console.log(`  Fix targets: ${scores.fix_targets.join(', ')}`)
    }

    console.log()
  }

  // ── Render readiness ────────────────────────────────────────────────────────
  const readiness = assessReadiness(results)
  const valid     = results.filter(r => r.scores)

  console.log('='.repeat(72))
  console.log('RENDER READINESS ASSESSMENT')
  console.log('='.repeat(72))

  const sorted = [...valid].sort((a, b) => b.scores.overall_score - a.scores.overall_score)
  if (sorted.length) {
    console.log(`  Strongest: ${sorted[0].ad.ad_type}  (${sorted[0].scores.overall_score}/10  ${sorted[0].scores.grade})`)
    console.log(`  Weakest:   ${sorted[sorted.length - 1].ad.ad_type}  (${sorted[sorted.length - 1].scores.overall_score}/10  ${sorted[sorted.length - 1].scores.grade})`)
  }
  console.log(`  Avg score: ${readiness.avg_score ?? '—'}`)
  console.log(`  Threshold: ${MIN_AVG_SCORE} avg / ${MIN_AD_SCORE} per-ad minimum`)
  console.log()

  if (readiness.ready_to_render) {
    console.log('  ✅ READY TO RENDER — all ads pass quality threshold')
  } else {
    console.log(`  ⛔ NOT READY — ${readiness.render_warning}`)
  }

  // ── Summary ─────────────────────────────────────────────────────────────────
  console.log()
  console.log('='.repeat(72))
  console.log('SUMMARY')
  console.log('='.repeat(72))

  const failed = results.filter(r => r.error)
  if (failed.length) {
    console.log(`❌ SPRINT 7 FAIL — ${failed.length} ad(s) could not be scored`)
    failed.forEach(r => console.log(`   ${r.ad.ad_type}: ${r.error}`))
  } else {
    const allPass = valid.every(r => r.scores.overall_score >= MIN_AD_SCORE)
    const grades  = results.map(r => `${r.ad.ad_type}=${r.scores?.grade ?? '?'}`).join('  ')
    console.log(`Scored: ${valid.length}/5 ads    Avg: ${readiness.avg_score}    Grades: ${grades}`)
    console.log()
    if (allPass) {
      console.log('✅ SPRINT 7 PASS — Quality Engine scores 5 PromptCEO concepts, all above grade F')
    } else {
      const low = valid.filter(r => r.scores.overall_score < MIN_AD_SCORE).map(r => r.ad.ad_type)
      console.log(`⚠  SPRINT 7 PARTIAL — ${low.join(', ')} scored below ${MIN_AD_SCORE} (grade F)`)
      console.log('   Fix-with-AI can rewrite these before render.')
    }
  }
  console.log('='.repeat(72))
}

run().catch(err => {
  console.error('Fatal:', err.message)
  process.exit(1)
})
