import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const maxDuration = 60

async function makeSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
}

// POST /api/jarvis-studio/creative-brief
// Body: { understanding, assets, intent?, prompt? }
// Returns: { brief: { summary, keyMessages, assetPlan, newContentNeeded, recommendedStyle } }
export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { understanding, assets, intent, prompt } = await req.json()
    if (!understanding) return NextResponse.json({ error: 'understanding required' }, { status: 400 })

    const { brand, founder, products, video, adReadiness } = understanding

    const assetInventory = []
    if (assets?.founderImageUrl) assetInventory.push('Founder/brand image')
    if (assets?.productImageUrls?.length) assetInventory.push(`${assets.productImageUrls.length} product image(s)`)
    if (assets?.videoUrls?.length) assetInventory.push(`${assets.videoUrls.length} video(s)`)
    if (assets?.musicUrl || assets?.musicTrackId) assetInventory.push('Music track')

    const briefPrompt = `You are a creative director building a pre-production brief for an AI-generated ad campaign.

BRAND UNDERSTANDING:
- Brand: ${brand?.name}
- Product: ${brand?.productDescription}
- Audience: ${brand?.targetAudience}
- Pain points: ${(brand?.painPoints || []).join('; ')}
- Key messages: ${(brand?.keyMessages || []).join('; ')}
- Tone: ${brand?.toneOfVoice}
- Visual style: ${brand?.visualStyle}
- Advantage: ${brand?.competitiveAdvantage}

FOUNDER: ${founder?.present ? `Present — ${founder?.visualDescription}. Camera presence: ${founder?.cameraPresence}. Suggested role: ${founder?.suggestedRole}` : 'Not provided'}
PRODUCTS: ${products?.count > 0 ? `${products.count} images — ${products?.keyVisuals}` : 'Not provided'}
VIDEO: ${video?.present ? video?.analysis : 'Not provided'}

UPLOADED ASSETS: ${assetInventory.join(', ') || 'None — generation only'}

${intent ? `DESIRED AD TYPE: ${intent.replace(/_/g, ' ')}` : ''}
${prompt ? `USER DIRECTION: ${prompt}` : ''}

Build a creative brief. Return ONLY this exact JSON:
{
  "summary": {
    "product": "one sharp sentence about the product",
    "audience": "who this is for, very specifically",
    "problem": "the core pain this product solves",
    "solution": "how this product solves it",
    "keyBenefit": "the single most compelling benefit for the ad"
  },
  "keyMessages": ["message 1", "message 2", "message 3"],
  "hook": "the single best opening hook for this brand's ads — specific, punchy",
  "recommendedStyle": "specific style direction for the production (e.g. 'Founder speaks directly to camera, raw and confident, intercut with product closeups')",
  "assetPlan": {
    "founderImage": { "role": "how founder image will be used in ads", "scenes": "which scene types" },
    "productImages": { "role": "how product images feed into visual design", "scenes": "which scene types" },
    "video": { "role": "how uploaded video will be used or referenced", "scenes": "which scene types" }
  },
  "newContentNeeded": [
    "list of content Jarvis will generate from scratch (e.g. 'Runway cinematic scene: product dissolving in water')"
  ]
}`

    const gptRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a senior creative director at a top-tier ad agency. Build precise, actionable creative briefs. No fluff. No generic statements. Be specific to this exact brand. Return only valid JSON.' },
          { role: 'user', content: briefPrompt },
        ],
        temperature: 0.4,
        response_format: { type: 'json_object' },
        max_tokens: 1200,
      }),
    })

    const gptData = await gptRes.json()
    if (!gptRes.ok) return NextResponse.json({ error: gptData.error?.message || 'OpenAI error' }, { status: 500 })

    let brief
    try {
      brief = JSON.parse(gptData.choices[0].message.content)
    } catch {
      return NextResponse.json({ error: 'Failed to parse brief' }, { status: 500 })
    }

    return NextResponse.json({ status: 'success', brief })

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
