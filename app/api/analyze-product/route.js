/**
 * POST /api/analyze-product
 *
 * Analyzes a product photo using XAI vision (grok-2-vision-1212).
 * Returns: product identification, audience inference, campaign directions,
 * and (if brandProfile provided) Brand DNA conflict analysis.
 *
 * Body: { imageDataUrl: string, brandProfile?: object }
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

const ANALYSIS_PROMPT = `You are a senior brand strategist, creative director, and marketing consultant analyzing a product photo. Think like the best marketing mind in the room.

Analyze this product image carefully and deeply. Return ONLY valid JSON — no markdown, no explanation, no code fences.

Return this EXACT structure (all fields required):
{
  "product": {
    "name": "Short descriptive product name",
    "category": "Specific product category",
    "confidence": 95,
    "visualStyle": "2-4 word description of visual aesthetic",
    "priceSignal": "budget | mid-range | premium | luxury",
    "marketPosition": "One sentence: where this product sits in the market",
    "marketSaturation": "Low | Medium | High | Very High",
    "differentiationStrength": "Weak | Medium | Strong | Very Strong",
    "observations": [
      "Specific visual observation about what you actually see",
      "Second specific observation about design or quality signals",
      "Third observation about positioning or photography"
    ]
  },
  "audience": {
    "segments": ["Audience segment 1", "Audience segment 2", "Audience segment 3"],
    "psychographics": "What owning this product says about the buyer's identity"
  },
  "competitors": ["Competitor 1", "Competitor 2", "Competitor 3", "Competitor 4"],
  "swot": {
    "strengths": ["Specific strength 1", "Specific strength 2", "Specific strength 3"],
    "weaknesses": ["Specific weakness 1", "Specific weakness 2"],
    "opportunities": ["Specific opportunity 1", "Specific opportunity 2", "Specific opportunity 3"],
    "threats": ["Specific threat 1", "Specific threat 2", "Specific threat 3"]
  },
  "directions": [
    {
      "direction": "Campaign direction — specific and strategic",
      "reasoning": "Why this specific direction works for this specific product",
      "bestPlatform": "Instagram | TikTok | LinkedIn | YouTube | Meta Ads",
      "expectedImpact": "High | Medium | Low",
      "difficulty": "Easy | Medium | Hard"
    },
    {
      "direction": "Second campaign direction",
      "reasoning": "Why this works",
      "bestPlatform": "Platform",
      "expectedImpact": "High | Medium | Low",
      "difficulty": "Easy | Medium | Hard"
    },
    {
      "direction": "Third campaign direction",
      "reasoning": "Why this works",
      "bestPlatform": "Platform",
      "expectedImpact": "High | Medium | Low",
      "difficulty": "Easy | Medium | Hard"
    },
    {
      "direction": "Fourth campaign direction",
      "reasoning": "Why this works",
      "bestPlatform": "Platform",
      "expectedImpact": "High | Medium | Low",
      "difficulty": "Easy | Medium | Hard"
    }
  ],
  "whatWouldIDo": [
    "First specific strategic recommendation if launching this product tomorrow",
    "Second recommendation",
    "Third recommendation",
    "Fourth recommendation",
    "Fifth recommendation"
  ],
  "sampleHook": "One scroll-stopping hook line written specifically for this product"
}`

const CONFLICT_PROMPT = (brandProfile) => `
Additionally, compare the product image to this Brand DNA:

Brand Name: ${brandProfile.name || 'Not specified'}
Brand Voice: ${brandProfile.voice || 'Not specified'}
Visual Style: ${brandProfile.style || 'Not specified'}
Target Audience: ${brandProfile.target_audience || 'Not specified'}
Price Point: ${brandProfile.price_point || 'Not specified'}

Add a "brandConflicts" array to your JSON with any mismatches you identify between what you actually see in the product image and what the Brand DNA describes. Each conflict:
{
  "issue": "Short conflict title",
  "observation": "What you actually see in the image",
  "brandDNA": "What the Brand DNA says",
  "severity": "low | medium | high",
  "recommendation": "Specific action to resolve this"
}

If the product and brand DNA are well-aligned, return an empty array for brandConflicts.
Return a "brandAlignment" score from 0-100 where 100 = perfect alignment.`

export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const apiKey = String(process.env.XAI_API_KEY || '').replace(/^Bearer\s+/i, '').replace(/^"+|"+$/g, '').trim()
    if (!apiKey) return NextResponse.json({ error: 'Missing XAI_API_KEY' }, { status: 500 })

    const body = await req.json()
    const { imageDataUrl, brandProfile } = body

    if (!imageDataUrl) return NextResponse.json({ error: 'Image required' }, { status: 400 })

    const prompt = ANALYSIS_PROMPT + (brandProfile ? CONFLICT_PROMPT(brandProfile) : '')

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'grok-4',
        messages: [{
          role: 'user',
          content: [
            { type: 'image_url', image_url: { url: imageDataUrl, detail: 'high' } },
            { type: 'text', text: prompt },
          ],
        }],
        temperature: 0.6,
        max_tokens: 2000,
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
      // Try to extract JSON from response
      const match = cleaned.match(/\{[\s\S]*\}/)
      result = match ? JSON.parse(match[0]) : { error: 'Could not parse analysis' }
    }

    return NextResponse.json({ ok: true, analysis: result })
  } catch (err) {
    console.error('[analyze-product]', err?.message)
    return NextResponse.json({ error: err?.message || 'Analysis failed' }, { status: 500 })
  }
}
