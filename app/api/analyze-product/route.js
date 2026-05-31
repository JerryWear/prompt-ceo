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

const ANALYSIS_PROMPT = `You are a senior brand strategist and creative director analyzing a product photo.

Analyze this product image carefully. Return ONLY valid JSON — no markdown, no explanation.

Return this exact structure:
{
  "product": {
    "name": "Short descriptive product name (e.g. 'Black Performance Hoodie')",
    "category": "Product category (e.g. 'Premium Activewear')",
    "visualStyle": "2-4 word description of visual aesthetic seen in the image",
    "priceSignal": "One of: budget | mid-range | premium | luxury",
    "photographyQuality": "One of: poor | average | good | excellent",
    "observations": [
      "Specific observation about what you actually see in the image",
      "Another specific visual observation",
      "A third observation about packaging, design, or photography"
    ]
  },
  "audience": {
    "primary": "Primary target audience description",
    "secondary": "Secondary audience",
    "psychographics": "What this product signals about the buyer's identity or values"
  },
  "directions": [
    "Campaign direction 1 — specific to this product",
    "Campaign direction 2",
    "Campaign direction 3",
    "Campaign direction 4"
  ],
  "strengths": [
    "Specific visual or positioning strength visible in the image"
  ],
  "weaknesses": [
    "Specific visual or positioning weakness visible in the image"
  ],
  "opportunities": [
    "Content or campaign opportunity suggested by this product"
  ],
  "campaignDraft": {
    "productName": "Suggested product name for campaigns",
    "positioning": "One sentence positioning statement",
    "primaryAudience": "Who to target",
    "topAngle": "The single strongest campaign angle for this product",
    "sampleHook": "One scroll-stopping hook line for this specific product"
  }
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
        model: 'grok-2-vision',
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
