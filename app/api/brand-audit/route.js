/**
 * POST /api/brand-audit
 *
 * AI Creative Director full brand audit.
 * Accepts: product image + optional ad image + optional website URL + optional brand context.
 * Returns: comprehensive strategic analysis in the voice of a senior creative director.
 */

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

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

async function fetchWebsiteText(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PromptCEO/1.0)' },
      signal: AbortSignal.timeout(8000),
    })
    const html = await res.text()
    // Strip tags, collapse whitespace, take first 3000 chars
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 3000)
    return text
  } catch {
    return null
  }
}

const AUDIT_PROMPT = `You are a world-class creative director, brand strategist, and performance marketer in your first session with a new client.

You have access to their product image and optionally their existing ad creative, website content, and a brief from the client.

You are NOT here to be polite. You are here to be genuinely useful. You will form strong opinions. You will say what you actually see — not what they want to hear. You speak like someone who has worked with 1,000 brands and can immediately identify what separates the ones that win from the ones that do not.

Your job: give them the most valuable 30-minute strategic session they could ever receive. Lead with your strongest, most honest observation — the thing that changes how they see their own brand.

Return ONLY valid JSON — no markdown, no explanation, no code fences.

{
  "headline": "Your sharpest single-sentence read — what you actually think about this brand or product in one line. Be honest, even if it stings.",
  "realPositioning": "What they are actually selling vs what they think they are selling. The emotional truth beneath the product.",
  "whatISee": [
    "Your most important visual or brand observation — specific, not generic",
    "Second observation",
    "Third observation"
  ],
  "whatIsWorking": [
    "Specific strength 1 — name exactly what is good and why it works",
    "Specific strength 2",
    "Specific strength 3"
  ],
  "whatIsWeak": [
    "Specific weakness 1 — name exactly what is missing or broken and what it is costing them",
    "Specific weakness 2",
    "Specific weakness 3"
  ],
  "competitorGaps": [
    "Specific thing a competitor in this space does better",
    "Specific gap 2"
  ],
  "recommendedPositioning": {
    "core": "The positioning they should own — one sharp sentence",
    "reasoning": "Why this positioning wins in their specific market"
  },
  "hiddenOpportunity": "The single biggest opportunity nobody in their space is talking about. The angle that changes the game. Be specific.",
  "ifIWereLaunchingTomorrow": [
    "Step 1 — specific, immediate, actionable",
    "Step 2",
    "Step 3",
    "Step 4",
    "Step 5"
  ],
  "campaignAngles": [
    {
      "angle": "Campaign direction title",
      "concept": "What this campaign actually does and why it works for this specific brand",
      "bestPlatform": "Instagram | TikTok | YouTube | LinkedIn | Meta Ads",
      "hookExample": "An actual scroll-stopping hook written for this angle"
    },
    {
      "angle": "Second campaign direction",
      "concept": "Concept and reasoning",
      "bestPlatform": "Platform",
      "hookExample": "Example hook"
    },
    {
      "angle": "Third campaign direction",
      "concept": "Concept and reasoning",
      "bestPlatform": "Platform",
      "hookExample": "Example hook"
    },
    {
      "angle": "Fourth campaign direction",
      "concept": "Concept and reasoning",
      "bestPlatform": "Platform",
      "hookExample": "Example hook"
    }
  ],
  "hookConcepts": [
    {
      "hook": "The actual hook line — written as if for real use",
      "type": "curiosity_gap | transformation | authority | pain_point | pattern_interrupt | aspiration | status",
      "platform": "Best platform for this hook",
      "why": "One sentence on why this hook works for this specific brand"
    },
    { "hook": "Hook 2", "type": "type", "platform": "platform", "why": "why" },
    { "hook": "Hook 3", "type": "type", "platform": "platform", "why": "why" },
    { "hook": "Hook 4", "type": "type", "platform": "platform", "why": "why" },
    { "hook": "Hook 5", "type": "type", "platform": "platform", "why": "why" }
  ],
  "videoConcepts": [
    {
      "concept": "Video concept title",
      "format": "UGC | Cinematic | Talking head | B-roll | Testimonial | Split-screen",
      "direction": "What this video actually shows, how it opens, what makes it work",
      "platform": "Best platform"
    },
    { "concept": "Concept 2", "format": "format", "direction": "direction", "platform": "platform" },
    { "concept": "Concept 3", "format": "format", "direction": "direction", "platform": "platform" }
  ],
  "ugcConcepts": [
    {
      "concept": "UGC concept title",
      "briefDirection": "What you would tell a creator to film — specific enough to brief someone today"
    },
    {
      "concept": "UGC concept 2",
      "briefDirection": "Creator brief direction"
    }
  ],
  "landingPageImprovements": [
    {
      "issue": "What is missing or broken on the current page",
      "fix": "Exactly how to fix it — specific, not vague",
      "impact": "What this change would do for conversion"
    },
    { "issue": "Issue 2", "fix": "Fix", "impact": "Impact" },
    { "issue": "Issue 3", "fix": "Fix", "impact": "Impact" }
  ],
  "revenueOpportunities": [
    {
      "opportunity": "Revenue angle title",
      "reasoning": "Why this works specifically for this brand and market",
      "difficulty": "Easy | Medium | Hard"
    },
    { "opportunity": "Opportunity 2", "reasoning": "reasoning", "difficulty": "Medium" },
    { "opportunity": "Opportunity 3", "reasoning": "reasoning", "difficulty": "Hard" }
  ]
}`

export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const apiKey = String(process.env.XAI_API_KEY || '').replace(/^Bearer\s+/i, '').replace(/^"+|"+$/g, '').trim()
    if (!apiKey) return NextResponse.json({ error: 'Missing XAI_API_KEY' }, { status: 500 })

    const body = await req.json()
    const { productImageUrl, adImageUrl, websiteUrl, brandContext } = body

    if (!productImageUrl) return NextResponse.json({ error: 'Product image is required' }, { status: 400 })

    // Build context string
    const contextParts = []
    if (brandContext?.trim()) contextParts.push(`CLIENT BRIEF: ${brandContext.trim()}`)

    // Fetch website if URL provided
    if (websiteUrl?.trim()) {
      const siteText = await fetchWebsiteText(websiteUrl.trim())
      if (siteText) contextParts.push(`WEBSITE CONTENT (extracted):\n${siteText}`)
      else contextParts.push(`WEBSITE URL: ${websiteUrl} (could not fetch content — work from image and context only)`)
    }

    const contextNote = contextParts.length > 0
      ? `\n\nADDITIONAL CONTEXT:\n${contextParts.join('\n\n')}`
      : ''

    // Build vision content — product image required, ad image optional
    const imageContent = [
      { type: 'image_url', image_url: { url: productImageUrl, detail: 'high' } },
    ]
    if (adImageUrl) {
      imageContent.push({ type: 'image_url', image_url: { url: adImageUrl, detail: 'high' } })
    }
    imageContent.push({ type: 'text', text: AUDIT_PROMPT + contextNote })

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'grok-4',
        messages: [{ role: 'user', content: imageContent }],
        temperature: 0.65,
        max_tokens: 3500,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      throw new Error(`Vision API error: ${err}`)
    }

    const grokData = await response.json()
    const raw = grokData.choices?.[0]?.message?.content?.trim() || '{}'
    const cleaned = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim()

    let result
    try {
      result = JSON.parse(cleaned)
    } catch {
      const match = cleaned.match(/\{[\s\S]*\}/)
      result = match ? JSON.parse(match[0]) : { error: 'Could not parse analysis' }
    }

    return NextResponse.json({ ok: true, analysis: result })
  } catch (err) {
    console.error('[brand-audit]', err?.message)
    return NextResponse.json({ error: err?.message || 'Audit failed' }, { status: 500 })
  }
}
