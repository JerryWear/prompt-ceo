import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { makeRouteLogger } from '../../../../lib/edit-studio/apiLogger.js'

// Allow up to 60 seconds — GPT-4o generating 5 complete scripts can be slow
export const maxDuration = 60

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

// ─── System prompt ────────────────────────────────────────────────────────────

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

// ─── User prompt builder ──────────────────────────────────────────────────────

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
    strategy.target_audience  ? `Audience: ${strategy.target_audience}`        : '',
    strategy.primary_message  ? `Core message: ${strategy.primary_message}`    : '',
    strategy.opening_hook_example ? `Hook example: ${strategy.opening_hook_example}` : '',
    strategy.cta              ? `CTA direction: ${strategy.cta}`               : '',
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

// ─── Mock fallback ────────────────────────────────────────────────────────────
// PromptCEO-specific — not generic placeholder text. Fully populated.

function buildMockConcepts(understandingData) {
  const productName = understandingData?.detected_products?.[0] || 'PromptCEO'

  return [
    {
      ad_type:       'founder',
      hook_archetype: 'authority',
      hook:           `I built ${productName} after wasting $80,000 on creative agencies that didn't understand my brand.`,
      script_15s: {
        hook: `I built ${productName} after wasting $80,000 on creative agencies.`,
        body: 'Now I generate campaign-ready ads in under 60 seconds.',
        cta:  `Try ${productName} free — no agency required.`,
      },
      script_30s: {
        hook: `I built ${productName} after wasting $80,000 on creative agencies that didn't understand my brand.`,
        body: `Every brief took two weeks. Every revision cost another $2,000. With ${productName}, I enter my brand DNA once and it generates hooks, scripts, and captions that actually sound like me — in under a minute.`,
        cta:  `Start your first campaign at ${productName.toLowerCase()}.io today.`,
      },
      script_60s: {
        hook: `I built ${productName} after wasting $80,000 on creative agencies that kept missing the point.`,
        body: `They'd ask for a brief. I'd spend three days writing it. Two weeks later I'd get copy that sounded like it could belong to any SaaS company on the internet. ${productName} is the opposite. You put in your brand DNA once — your tone, your audience, your differentiators — and it generates ad hooks, full scripts, and campaign sequences that sound like you wrote them at your best. I've shipped more campaigns in the last 30 days than I did in the previous six months. The agency billed me for their learning curve. ${productName} already knows the brief.`,
        cta:  `Go to ${productName.toLowerCase()}.io and run your first campaign free.`,
      },
      cta:          `Start free at ${productName.toLowerCase()}.io`,
      platform:     'linkedin',
      objective:    'Build founder credibility and drive trial signups from agency-fatigued founders',
      why_it_works: `Founder vulnerability ("I wasted $80k") triggers loss-aversion empathy before the solution lands. The specific dollar figure creates credibility. Ending with the contrast (agency = slow and generic; ${productName} = instant and branded) activates the viewer's desire for the same relief.`,
    },
    {
      ad_type:       'saas_demo',
      hook_archetype: 'curiosity',
      hook:           `Watch ${productName} write a full ad campaign in 47 seconds — from brand brief to finished script.`,
      script_15s: {
        hook: `Watch ${productName} build a full ad campaign in 47 seconds.`,
        body: 'Brand DNA in. Hooks, scripts, and captions out.',
        cta:  `Try ${productName} free today.`,
      },
      script_30s: {
        hook: `Watch ${productName} write a full ad campaign in 47 seconds — from brand brief to finished script.`,
        body: `You enter your product, your audience, and your brand voice. ${productName} generates five ad angles, platform-specific hooks, and 15s, 30s, and 60s scripts. Ready to hand to production.`,
        cta:  `Run your first campaign at ${productName.toLowerCase()}.io — it's free to start.`,
      },
      script_60s: {
        hook: `Watch ${productName} write a full ad campaign in 47 seconds.`,
        body: `Here's the full flow. I type in my product name and what it does. I set my target audience — SaaS founders, marketing leads, whoever buys from me. I hit Generate. In under a minute, ${productName} has produced five campaign angles, a hook for each one, and complete scripts in three lengths. Every line is platform-specific. Every hook names my product. Every CTA drives to an action. This isn't a template. This is an AI that was trained on what actually converts — and it outputs work that's ready to shoot, not work that needs two more rounds of edits.`,
        cta:  `Go to ${productName.toLowerCase()}.io and watch it build your first campaign live.`,
      },
      cta:          `Run your first campaign free at ${productName.toLowerCase()}.io`,
      platform:     'youtube',
      objective:    'Demonstrate speed and output quality to convert skeptical viewers who think AI copy is generic',
      why_it_works: `"Watch X happen in Y seconds" triggers curiosity and social comparison. The specific time (47 seconds) feels more credible than a round number. Showing the full flow rather than describing it removes the cognitive effort of imagining the product — viewers see their own workflow, compressed.`,
    },
    {
      ad_type:       'problem_solution',
      hook_archetype: 'problem',
      hook:           `Your creative agency just quoted you $6,000 and a three-week turnaround. ${productName} costs less per month than one revision round.`,
      script_15s: {
        hook: `Your agency quoted $6,000. ${productName} costs less than one revision round.`,
        body: 'Same output. 47 seconds. No briefs.',
        cta:  `Switch to ${productName} today.`,
      },
      script_30s: {
        hook: `Your creative agency just quoted you $6,000 and a three-week turnaround.`,
        body: `${productName} generates the same quality of hooks, scripts, and campaign concepts in under a minute — for less than you'd pay for a single revision. You enter your brand once. Every campaign after that already knows your voice.`,
        cta:  `Start at ${productName.toLowerCase()}.io and kill the agency dependency.`,
      },
      script_60s: {
        hook: `Your creative agency just quoted you $6,000 and a three-week turnaround for one campaign.`,
        body: `Here's what that buys you: a brief template, a kick-off call, a first draft that sounds nothing like your brand, two rounds of revisions, and a final delivery that's already two weeks behind your launch window. ${productName} does the same job in 47 seconds. You enter your brand DNA once — your tone, your product, your audience — and it generates five campaign angles with full scripts in every length. The AI already knows what converts. It already knows your brief. You don't need to teach it twice. The agency charges you for their learning curve every single time.`,
        cta:  `End the agency cycle. Start free at ${productName.toLowerCase()}.io.`,
      },
      cta:          `Start free at ${productName.toLowerCase()}.io`,
      platform:     'meta',
      objective:    'Convert marketers who are actively suffering from slow/expensive creative workflows',
      why_it_works: `Leading with the competitor's price ($6,000) triggers immediate pain recognition for anyone who's been through that conversation. The contrast is implicit before ${productName} is even named — so when the solution arrives, the viewer is already in problem-mode. This is the classic agitate-then-solve structure, but grounded in a specific, recognizable dollar figure rather than abstract pain.`,
    },
    {
      ad_type:       'linkedin_authority',
      hook_archetype: 'transformation',
      hook:           `Six months ago I was spending 40% of my marketing budget on creative. Then I switched to ${productName}.`,
      script_15s: {
        hook: `Six months ago I was spending 40% of my marketing budget on creative.`,
        body: `Then I found ${productName}. That budget now goes to distribution.`,
        cta:  `See how at ${productName.toLowerCase()}.io.`,
      },
      script_30s: {
        hook: `Six months ago I was spending 40% of my marketing budget on creative. Then I switched to ${productName}.`,
        body: `That budget now goes to media spend, not production. ${productName} handles briefs, hooks, scripts, and campaign sequences — with Brand DNA built in so every piece sounds like it came from the same creative team. Which it did. It was just AI.`,
        cta:  `If you're still paying agencies to learn your brand, visit ${productName.toLowerCase()}.io.`,
      },
      script_60s: {
        hook: `Six months ago I was spending 40% of my marketing budget on creative production. Today that number is under 8%.`,
        body: `The difference isn't that I found cheaper freelancers. The difference is ${productName}. I entered my brand DNA once — my positioning, my tone, my audience signals. Now every campaign I run starts from a brief that already understands my brand. ${productName} generates the angles, the hooks, the 15s and 30s and 60s scripts. I review, I approve, I ship. What used to take two weeks and $6,000 now takes 47 seconds. The creative quality hasn't dropped. In some cases it's improved — because the AI never has an off day, never misremembers the brief, and never charges me for a revision.`,
        cta:  `Reclaim your creative budget. Start at ${productName.toLowerCase()}.io.`,
      },
      cta:          `Visit ${productName.toLowerCase()}.io to reclaim your creative budget`,
      platform:     'linkedin',
      objective:    'Build B2B credibility with marketing decision-makers through a before/after transformation story',
      why_it_works: `LinkedIn audiences respond to transformation narratives with specific, measurable proof (40% → 8%). Framing it as a budget reallocation story rather than a "tools" story speaks to the decision-maker's KPIs, not their workflow preferences. The insight ("AI never has an off day") lands as genuine conviction rather than a feature list.`,
    },
    {
      ad_type:       'tiktok_hook',
      hook_archetype: 'contrarian',
      hook:           `Stop hiring copywriters. ${productName} already knows your brand better than they do.`,
      script_15s: {
        hook: `Stop hiring copywriters. ${productName} knows your brand better than they do.`,
        body: 'Enter your DNA once. Get campaigns forever.',
        cta:  `${productName.toLowerCase()}.io — try it free.`,
      },
      script_30s: {
        hook: `Controversial opinion: stop hiring copywriters for ad campaigns.`,
        body: `${productName} builds a Brand DNA from your inputs and generates hooks, scripts, and full campaign sequences that sound exactly like you — but better. I've been testing it for 30 days. The conversion rate on AI-generated hooks is outperforming my last three agency briefs.`,
        cta:  `${productName.toLowerCase()}.io — your first campaign is free.`,
      },
      script_60s: {
        hook: `Controversial opinion: you should stop hiring copywriters to write your ad campaigns.`,
        body: `Before you close this video, hear me out. I'm not saying copywriters aren't talented. I'm saying the briefing process breaks them. By the time they understand your brand, your product positioning, your audience nuances — you've had four calls, written a twelve-page brief, and waited two weeks. ${productName} skips all of that. You enter your brand DNA once. Your positioning, your tone, your differentiators, your dream customer. Every campaign after that starts with a system that already knows all of it. The hooks it generates don't sound generic because they're not generic — they're trained on your specific context. I ran a test. ${productName}'s hooks versus my agency's best work. ${productName} won on click-through. Twice.`,
        cta:  `See it yourself at ${productName.toLowerCase()}.io — first campaign is completely free.`,
      },
      cta:          `${productName.toLowerCase()}.io — first campaign free`,
      platform:     'tiktok',
      objective:    'Disrupt the assumption that human copywriters are the only path to quality ad creative',
      why_it_works: `"Controversial opinion" is a proven pattern interrupt on TikTok — it signals that the creator is about to say something that violates a commonly held belief, which forces the viewer to stay and hear the argument. The contrarian position (against hiring copywriters) is provocative enough to drive comments and shares, which extends organic reach. Ending with a specific test result ("won on CTR, twice") converts the skeptic who stayed to watch.`,
    },
  ]
}

// ─── Map a concept to an edit_ads DB row ──────────────────────────────────────

function conceptToRow(concept, projectId, userId) {
  return {
    project_id:     projectId,
    user_id:        userId,
    ad_type:        concept.ad_type,
    hook_type:      concept.hook_archetype,
    hook_text:      concept.hook,
    hooks:          [
      {
        type:       concept.hook_archetype,
        text:       concept.hook,
        rationale:  concept.why_it_works,
      },
    ],
    script_15s:     concept.script_15s,
    script_30s:     concept.script_30s,
    script_60s:     concept.script_60s,
    quality_scores: {
      platform:      concept.platform,
      objective:     concept.objective,
      why_it_works:  concept.why_it_works,
      cta:           concept.cta,
    },
    status:         'scripted',
  }
}

// ─── Route ────────────────────────────────────────────────────────────────────
// POST /api/edit-studio/ad-concepts
// Body: { projectId, understandingData, creativeStrategy }

export async function POST(req) {
  const log = makeRouteLogger('ad-concepts')

  try {
    const body = await req.json()
    const { projectId, understandingData, creativeStrategy } = body

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
    if (!creativeStrategy) {
      return NextResponse.json(
        { status: 'error', ok: false, message: 'creativeStrategy is required.' },
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
    let concepts
    let fallback       = false
    let fallbackReason = ''

    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      fallback       = true
      fallbackReason = 'OPENAI_API_KEY not configured'
      concepts       = buildMockConcepts(understandingData)
    } else {
      try {
        log.info('Calling GPT-4o for 5 ad concepts')
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
              { role: 'user',   content: buildConceptPrompt(understandingData, creativeStrategy) },
            ],
            response_format: { type: 'json_object' },
            max_tokens:      4000,
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

        const parsed = JSON.parse(content)

        if (!Array.isArray(parsed.concepts) || parsed.concepts.length !== 5) {
          throw new Error(`GPT-4o returned ${parsed.concepts?.length ?? 0} concepts — expected exactly 5`)
        }
        const rawConcepts = parsed.concepts

        // Fix 1 — Enforce canonical ad_type values and required order (Spec item 8)
        const REQUIRED_AD_TYPES = ['founder', 'saas_demo', 'problem_solution', 'linkedin_authority', 'tiktok_hook']
        const orderedConcepts = REQUIRED_AD_TYPES.map((requiredType, idx) => {
          const match = rawConcepts.find(c => c.ad_type === requiredType) || rawConcepts[idx] || {}
          return { ...match, ad_type: requiredType }
        })

        // Fix 2 — Field validation: fill in safe defaults for any missing fields (Spec item 9)
        const REQUIRED_CONCEPT_FIELDS = {
          hook: '',
          hook_archetype: 'problem',
          script_15s: { hook: '', body: '', cta: '' },
          script_30s: { hook: '', body: '', cta: '' },
          script_60s: { hook: '', body: '', cta: '' },
          cta: '',
          platform: 'linkedin',
          objective: '',
          why_it_works: '',
        }
        concepts = orderedConcepts.map(c => ({
          ...REQUIRED_CONCEPT_FIELDS,
          ...c,
          script_15s: { ...REQUIRED_CONCEPT_FIELDS.script_15s, ...(c.script_15s || {}) },
          script_30s: { ...REQUIRED_CONCEPT_FIELDS.script_30s, ...(c.script_30s || {}) },
          script_60s: { ...REQUIRED_CONCEPT_FIELDS.script_60s, ...(c.script_60s || {}) },
        }))
      } catch (err) {
        fallback       = true
        fallbackReason = `Ad concept generation unavailable: ${err.message}`
        concepts       = buildMockConcepts(understandingData)
      }
    }

    // ── Persist to edit_ads (fatal — this is critical data) ──────────────────
    // Skip insert on fallback — no partial/mock rows in the DB.
    let insertedRows

    if (!fallback) {
      const supabaseAdmin = makeAdminClient()
      const rows = concepts.map(c => conceptToRow(c, projectId, user.id))

      const { data: inserted, error: insertErr } = await supabaseAdmin
        .from('edit_ads')
        .insert(rows)
        .select('id, ad_type, hook_type, hook_text, script_15s, script_30s, script_60s, quality_scores, status')

      if (insertErr) {
        log.failure({ projectId, errorCode: 'INSERT_FAILED', message: insertErr.message })
        return NextResponse.json(
          { status: 'error', ok: false, message: `Failed to save ad concepts: ${insertErr.message}` },
          { status: 500 }
        )
      }

      insertedRows = inserted
    }

    // ── Build response concepts ───────────────────────────────────────────────
    // If we have DB rows, merge in the DB id and quality_scores fields.
    // On fallback, return the mock with no id.
    const responseConcepts = fallback
      ? concepts.map(c => ({
          id:           null,                   // Fix 5 — clean sentinel instead of undefined
          ad_type:      c.ad_type,
          hook_type:    c.hook_archetype,
          hook_text:    c.hook,
          script_15s:   c.script_15s,
          script_30s:   c.script_30s,
          script_60s:   c.script_60s,
          platform:     c.platform,
          objective:    c.objective,
          why_it_works: c.why_it_works,
          cta:          c.cta || '',            // Fix 3 — include cta (Spec item 13)
        }))
      : insertedRows.map((row) => {
          const qs = row.quality_scores || {}  // Fix 4 — explicit fallback for quality_scores
          return {
            id:           row.id,
            ad_type:      row.ad_type,
            hook_type:    row.hook_type,
            hook_text:    row.hook_text,
            script_15s:   row.script_15s,
            script_30s:   row.script_30s,
            script_60s:   row.script_60s,
            platform:     qs.platform,
            objective:    qs.objective,
            why_it_works: qs.why_it_works,
            cta:          qs.cta || '',         // Fix 3 — include cta (Spec item 13)
          }
        })

    log.success({
      projectId,
      fallback,
      extra: {
        concepts_count: responseConcepts.length,
        ad_types:       responseConcepts.map(c => c.ad_type),
        inserted:       !fallback,
      },
    })

    return NextResponse.json({
      status:          'success',
      ok:              true,
      fallback,
      fallback_reason: fallback ? fallbackReason : undefined,
      concepts:        responseConcepts,
    })
  } catch (err) {
    log.failure({ errorCode: 'AD_CONCEPTS_FATAL', message: err.message })
    return NextResponse.json(
      { status: 'error', ok: false, message: err.message },
      { status: 500 }
    )
  }
}
