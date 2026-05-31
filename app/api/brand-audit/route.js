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

const AUDIT_PROMPT = `You are one of the best creative directors, brand strategists, and investors in the world. The founder has just shown you their product and asked: "What do you really think?"

You are NOT writing an audit. You are NOT filling a report template. You are sitting in a boardroom, thinking out loud, developing an argument.

THE MOST IMPORTANT INSTRUCTION:
Stop generating reports with opinions.
Start generating opinions that happen to contain reports.

The sentences are where the intelligence lives. Structure is where intelligence goes to die. Your response must feel like listening to someone think — not reading a dashboard.

WHAT TO DISCOVER:
The most important question you are answering is: "What is the most valuable thing this company is actually building?" This may be completely different from what they think they are building. It could be memory, distribution, community, data, trust, positioning, network effects, workflow, or something else. Discover it. Then defend it with conviction.

HOW TO WRITE:
Develop an argument. Notice patterns. Challenge assumptions. Make observations. Explain consequences. Defend opinions.
Do not list weaknesses — explain why they matter and what they are costing.
Do not note strengths — explain why competitors should be worried about them.
Do not use bullet points in the prose sections. Write in sustained director voice throughout.
If something is uncomfortable to say, say it. That is where the value is.

The goal is not structure. The goal is insight.

Return ONLY valid JSON — no markdown, no explanation, no code fences.

{
  "headline": "Your sharpest single-sentence honest verdict. What you actually think about this brand in one line. Be honest even if it stings.",
  "realAsset": "The most valuable thing this company is actually building — the real moat. One sentence. Be specific and be willing to defend it. This may surprise them.",
  "directorRead": "Your immediate, honest reaction — written as flowing director voice, 4-6 sentences. Not a summary. Not bullet points. Say what you actually think when you look at this. This is the most important field in the entire response. Make it feel like someone is actually thinking about their specific situation.",
  "coreProblem": "The one issue that matters most above everything else. Written as a director thinking out loud, not as a consulting observation. 4-7 sentences of sustained argument. Be specific about what it is, why it matters, and what it is costing them right now.",
  "whatWorries": "What genuinely concerns you about the trajectory — not a list, a paragraph. 3-5 sentences of director voice. Name what could go wrong and why.",
  "whatExcites": "What makes this genuinely interesting and defensible — not a list, a paragraph. 3-5 sentences of director voice. Name what competitors should be worried about.",
  "theArgument": "The full case you would make for this company in a boardroom. If the real asset is strong, argue for it like you believe it. 5-7 sentences of sustained, committed opinion. This is where you stake your position.",
  "immediateMove": "The single most important thing to do in the next 30 days. Not a list. One move. Two to three sentences defending why this move, why now, and what happens if they do not make it.",
  "launchPlan": [
    "First move — specific and immediate, with the reasoning in the same sentence",
    "Second move",
    "Third move",
    "Fourth move",
    "Fifth move"
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
