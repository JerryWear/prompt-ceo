/**
 * Sprint 3 validation: Ad Concepts Engine
 * Calls GPT-4o directly with PromptCEO understanding + strategy data.
 * Prints all 5 ad concepts with hooks and scripts.
 *
 * Usage: node scripts/test-ad-concepts.mjs
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

// ── Fixtures — same data the live pipeline would produce ──────────────────────

const UNDERSTANDING = {
  detected_products: ['PromptCEO', 'Prompt Studio', 'Ad Studio', 'Campaign Builder', 'AI Director', 'Music Studio'],
  business_type: 'saas',
  business_description: 'PromptCEO is an AI Creative Operating System for marketers and creators.',
  screens_detected: [
    { label: 'Prompt Studio', timestamp_approx: 3.5, significance: 'high' },
    { label: 'Ad Studio',     timestamp_approx: 18,  significance: 'high' },
    { label: 'Campaign Builder', timestamp_approx: 41, significance: 'medium' },
    { label: 'Music Studio',  timestamp_approx: 65.5, significance: 'medium' },
  ],
  key_messages: [
    'PromptCEO is the AI Creative Operating System.',
    'Generate cinematic prompts with Prompt Studio.',
    'Build ad campaigns with Ad Studio using AI-driven tools.',
    'AI Director and Campaign Intelligence optimize campaign effectiveness.',
    'Music Studio aligns audio with brand DNA and campaign goals.',
  ],
  recommended_positioning: 'problem_solution',
  strong_moments: [
    { timestamp_approx: 0,    label: 'Introduction of PromptCEO',    type: 'hook' },
    { timestamp_approx: 41,   label: 'Demonstration of Campaign Builder', type: 'demo' },
    { timestamp_approx: 78.5, label: 'Final positioning statement',   type: 'cta' },
  ],
}

const CREATIVE_STRATEGY = {
  strategy: {
    positioning: 'problem_solution',
    positioning_rationale: 'PromptCEO solves a concrete expensive problem — slow, costly creative production.',
    target_audience: 'SaaS founders and marketing leads spending $3k–$10k/month on creative agencies.',
    primary_platform: 'linkedin',
    platform_rationale: 'Decision-makers with creative budgets are active on LinkedIn; product demos convert well.',
    ad_format: 'screen_demo',
    recommended_duration: '30s',
    duration_rationale: '30s is long enough to show two features but short enough to hold feed attention.',
    primary_message: 'PromptCEO replaces your creative agency with an AI that knows your brand.',
    supporting_messages: [
      'Every campaign remembers your Brand DNA',
      'Hooks, scripts, and captions in under 60 seconds',
    ],
    cta: 'Start free at promptceo.io',
    hook_strategy: 'problem',
    hook_strategy_rationale: 'Marketing teams feel the pain of slow expensive creative — naming it creates instant recognition.',
    opening_hook_example: 'Still paying your agency $5,000 to write ad copy? PromptCEO does it in 30 seconds.',
    avoid: [
      'Generic AI claims without showing the product',
      'Long intros before showing the actual tool',
    ],
  },
  ad_concepts: [],
  primary_concept: 'demo',
}

// ── Prompt builder (mirrors app/api/edit-studio/ad-concepts/route.js) ─────────

function buildConceptPrompt(understandingData, creativeStrategy) {
  const productName = understandingData.detected_products?.[0] || 'the product'
  const s = creativeStrategy.strategy || {}
  return `Product context:
Products/features: ${understandingData.detected_products?.join(', ')}
Business: ${understandingData.business_description}
Key messages: ${understandingData.key_messages?.join(' | ')}

Creative strategy:
Positioning: ${s.positioning} — ${s.positioning_rationale}
Target audience: ${s.target_audience}
Primary message: ${s.primary_message}
Hook strategy: ${s.hook_strategy} — ${s.hook_strategy_rationale}
Opening hook example: ${s.opening_hook_example}
CTA: ${s.cta}

Generate exactly 5 ad concepts in this order:
1. Founder Ad (hook_archetype: authority)
2. SaaS Demo Ad (hook_archetype: curiosity)
3. Problem/Solution Ad (hook_archetype: problem)
4. LinkedIn Authority Ad (hook_archetype: transformation)
5. TikTok Hook Ad (hook_archetype: contrarian)

For each concept generate all of:
- ad_type (founder | saas_demo | problem_solution | linkedin_authority | tiktok_hook)
- hook_archetype
- hook (the specific opening line)
- script_15s: { hook, body, cta }
- script_30s: { hook, body, cta }
- script_60s: { hook, body, cta }
- cta (standalone call to action)
- platform (linkedin | tiktok | instagram | youtube | meta)
- objective (what this ad is trying to achieve)
- why_it_works (2-3 sentences on the psychology)

Rules:
- Every hook must include the product name "${productName}"
- Every script section must be a complete speakable sentence
- 15s = under 40 words total. 30s = under 85 words. 60s = under 175 words.
- The CTA must include a URL or specific action + product name
- why_it_works must explain the specific psychological mechanism
- No generic SaaS copy. No filler. No hedging.

Return JSON: { "concepts": [ ...5 objects... ] }`
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function run() {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) { console.error('OPENAI_API_KEY missing'); process.exit(1) }

  console.log('='.repeat(70))
  console.log('PromptCEO — Sprint 3 Validation: Ad Concepts Engine')
  console.log('='.repeat(70))
  console.log('Calling GPT-4o (5 complete concepts × 3 script lengths)...\n')

  const start = Date.now()

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a senior performance creative director at a top SaaS marketing agency. You write ads that convert — not ads that describe software. Every script line must be short enough to say out loud in one breath. Every hook must name the specific product. No filler words. No hedging. No generic SaaS copy.',
        },
        { role: 'user', content: buildConceptPrompt(UNDERSTANDING, CREATIVE_STRATEGY) },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 4000,
    }),
  })

  const elapsed = ((Date.now() - start) / 1000).toFixed(1)
  if (!res.ok) { const t = await res.text(); console.error(`API error ${res.status}: ${t}`); process.exit(1) }
  const data = await res.json()
  const content = data.choices?.[0]?.message?.content
  if (!content) { console.error('Empty GPT-4o response'); process.exit(1) }

  const parsed = JSON.parse(content)
  const concepts = parsed.concepts || []

  console.log(`GPT-4o responded in ${elapsed}s — ${data.usage?.total_tokens} tokens\n`)

  // ── Print each concept ────────────────────────────────────────────────────
  const DIVIDER = '─'.repeat(70)

  for (let i = 0; i < concepts.length; i++) {
    const c = concepts[i]
    console.log(DIVIDER)
    console.log(`CONCEPT ${i + 1}: ${c.ad_type?.toUpperCase().replace(/_/g, ' ')}  [${c.hook_archetype} hook]  → ${c.platform?.toUpperCase()}`)
    console.log(DIVIDER)
    console.log(`HOOK:        ${c.hook}`)
    console.log(`OBJECTIVE:   ${c.objective}`)
    console.log(`CTA:         ${c.cta}`)
    console.log(`WHY IT WORKS: ${c.why_it_works}`)

    for (const dur of ['15s', '30s', '60s']) {
      const s = c[`script_${dur}`] || {}
      const words = [s.hook, s.body, s.cta].filter(Boolean).join(' ').split(/\s+/).length
      console.log(`\n  ── ${dur} script (${words} words) ──`)
      console.log(`  HOOK: ${s.hook}`)
      console.log(`  BODY: ${s.body}`)
      console.log(`  CTA:  ${s.cta}`)
    }
    console.log('')
  }

  // ── Validation ────────────────────────────────────────────────────────────
  console.log('='.repeat(70))
  console.log('VALIDATION')
  console.log('='.repeat(70))

  const REQUIRED_TYPES = ['founder', 'saas_demo', 'problem_solution', 'linkedin_authority', 'tiktok_hook']
  const foundTypes = concepts.map(c => c.ad_type)
  const REQUIRED_FIELDS = ['hook', 'script_15s', 'script_30s', 'script_60s', 'cta', 'platform', 'objective', 'why_it_works']

  let pass = true

  for (const req of REQUIRED_TYPES) {
    const found = concepts.find(c => c.ad_type === req)
    if (!found) { console.log(`❌ Missing ad type: ${req}`); pass = false }
    else {
      const missingFields = REQUIRED_FIELDS.filter(f => !found[f])
      if (missingFields.length) {
        console.log(`⚠  ${req} — missing fields: ${missingFields.join(', ')}`)
        pass = false
      } else {
        const productMentioned = [found.hook, found.script_30s?.hook].some(t => t?.toLowerCase().includes('promptceo'))
        console.log(`${productMentioned ? '✅' : '⚠ '} ${req.padEnd(22)} — all fields present${productMentioned ? ', product named in hook' : ', product name not in hook'}`)
      }
    }
  }

  const cost = ((data.usage?.prompt_tokens || 0) * 0.0000025 + (data.usage?.completion_tokens || 0) * 0.000010).toFixed(4)
  console.log(`\nTokens: ${data.usage?.total_tokens} (prompt: ${data.usage?.prompt_tokens}, completion: ${data.usage?.completion_tokens})`)
  console.log(`Estimated cost: $${cost}`)
  console.log('')
  console.log(pass ? '✅ SPRINT 3 PASS — all 5 concepts complete with hooks + scripts' : '❌ SPRINT 3 FAIL — see issues above')
  console.log('='.repeat(70))
}

run().catch(e => { console.error(e); process.exit(1) })
