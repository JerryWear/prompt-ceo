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

// ── Prompt builder — exact copy of app/api/edit-studio/ad-concepts/route.js ────

const SYSTEM_PROMPT = `You are a performance creative director who writes ad scripts specifically for text-to-speech narration and video ads. Your scripts are SPOKEN, not read.

Core rules you never break:
- Every sentence is 10 words or fewer. Break longer sentences in two.
- Use contractions always: "I'm" not "I am", "you're" not "you are", "it's" not "it is"
- Write out all numbers and symbols: "$10k" → "ten thousand dollars", "5 ads" → "five ads", "promptceo.io" → "PromptCEO dot io"
- No three-item lists crammed in one sentence. One idea per sentence.
- No corporate buzzwords: never use "revolutionize", "leverage", "synergy", "enhance", "optimize", "utilize"
- Use "..." only before a genuine dramatic pause or reveal — not after every sentence
- Each script persona has a different voice register — match it exactly
- No generic SaaS copy. Every line must be specific to the actual product.`

function buildConceptPrompt(understandingData, creativeStrategy) {
  const productName = understandingData?.detected_products?.[0] || 'PromptCEO'
  const strategy    = creativeStrategy?.strategy || creativeStrategy || {}

  const productContext = [
    understandingData?.detected_products?.length
      ? `Products detected: ${understandingData.detected_products.join(', ')}`
      : '',
    understandingData?.business_description
      ? `Business: ${understandingData.business_description}`
      : '',
    understandingData?.key_messages?.length
      ? `Key messages: ${understandingData.key_messages.join(' | ')}`
      : '',
  ].filter(Boolean).join('\n')

  const strategyContext = [
    strategy.target_audience  ? `Audience: ${strategy.target_audience}`               : '',
    strategy.primary_message  ? `Core message: ${strategy.primary_message}`           : '',
    strategy.opening_hook_example ? `Hook example: ${strategy.opening_hook_example}`  : '',
    strategy.cta              ? `CTA direction: ${strategy.cta}`                      : '',
  ].filter(Boolean).join('\n')

  return `Product context:
${productContext}

Creative strategy:
${strategyContext}

Generate exactly 5 ad concepts. Return JSON: { "concepts": [ ...5 objects... ] }

Each concept MUST have these exact fields — no exceptions:
{
  "ad_type": "founder|saas_demo|problem_solution|linkedin_authority|tiktok_hook",
  "hook_archetype": "authority|curiosity|problem|transformation|contrarian",
  "hook": "the opening line",
  "script_15s": { "hook": "...", "body": "...", "cta": "..." },
  "script_30s": { "hook": "...", "body": "...", "cta": "..." },
  "script_60s": { "hook": "...", "body": "...", "cta": "..." },
  "cta": "standalone call to action",
  "platform": "linkedin|tiktok|youtube|instagram|meta",
  "objective": "what this ad achieves",
  "why_it_works": "specific psychology, not generic benefits"
}

AD TYPES (in this order):
1. founder (platform: linkedin, hook_archetype: authority) — first person founder story. Start with what you paid or lost. Sound like a real person on camera, not a brand.
   Good: "I was paying eight thousand dollars a month to a creative agency. Two weeks for one ad. I built ${productName} because I got tired of it."
   Bad: "Revolutionize your workflow with AI-powered solutions."

2. saas_demo (platform: youtube, hook_archetype: curiosity) — narrator reacting to the product live. Short excited sentences. React to what you see on screen.
   Good: "Watch this. I just uploaded one video. It built me five ads. Each with a script and a voiceover."
   Bad: "PromptCEO's platform leverages AI to enhance your creative capabilities."

3. problem_solution (platform: meta, hook_archetype: problem) — name the exact pain first, then fix it. Two acts, no middle fluff.
   Good: "You briefed your agency three weeks ago. You got one ad. It didn't convert. There's a better way."
   Bad: "Tired of slow creative processes? Optimize your workflow today."

4. linkedin_authority (platform: linkedin, hook_archetype: transformation) — lead with an industry insight. Never open with a product pitch. Let ${productName} arrive as the logical conclusion.
   Good: "Most marketing teams outsource creative because they think there's no other option. There is."
   Bad: "Transform your marketing strategy with ${productName}'s cutting-edge AI."

5. tiktok_hook (platform: tiktok, hook_archetype: contrarian) — phone-camera feel. Very short sentences: 4 to 6 words each. Mid-thought. Sounds unscripted.
   Good: "Okay wait. You need to see this. I just replaced my entire ad agency. With one tool."
   Bad: "Discover how PromptCEO challenges the status quo of creative production."

SCRIPT RULES:
- 15s = under 40 words total. 30s = under 80 words total. 60s = under 165 words total.
- Write out ALL numbers: "$5,000" → "five thousand dollars". "5 ads" → "five ads".
- Speak URLs: "promptceo.io" → "${productName} dot io".
- Max 12 words per sentence. Split anything longer.
- Use contractions: "I'm", "it's", "you're" — not "I am", "it is", "you are".
- BANNED: revolutionize, leverage, enhance, optimize, utilize, unlock, empower, transform, seamless, cutting-edge, game-changing.`
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
          content: SYSTEM_PROMPT,
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
