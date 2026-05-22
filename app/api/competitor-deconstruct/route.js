import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) { return cookieStore.get(name)?.value },
        set() {},
        remove() {},
      },
    }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

const ANALYSIS_PROMPT = `You are a world-class creative director and performance marketing expert analyzing a competitor's advertisement image.

Conduct a complete visual deconstruction of this ad. Be specific and honest — identify both strengths and the gaps that can be exploited.

Return ONLY valid JSON with exactly this structure:

{
  "visualWorld": "What world/setting/location they placed the subject in — be specific",
  "lightingStyle": "Exact lighting description — colour temperature, direction, quality, what it achieves",
  "composition": "Camera angle, focal length feel, framing choice, depth of field — and what it communicates",
  "wardrobeAndStyling": "What the subject is wearing, the styling aesthetic, and what it signals about the brand",
  "emotionalAngle": "The primary emotion this image is designed to trigger in the viewer",
  "hookVisual": "What is the single visual element that stops the scroll — what makes it work",
  "brandPositioning": "What status/lifestyle tier this brand is positioning itself in based purely on the visual",
  "whatTheyDid": [
    "Specific strength 1 — what they executed well and why",
    "Specific strength 2",
    "Specific strength 3"
  ],
  "whatTheyMissed": [
    "Specific visual gap 1 — what is absent or weak",
    "Specific visual gap 2",
    "Specific visual gap 3"
  ],
  "yourSuperiorVersion": {
    "worldAndSetting": "The specific location/world to use that is MORE elevated than theirs",
    "lightingUpgrade": "The exact lighting upgrade — be cinematic and specific with Kelvin/direction",
    "compositionUpgrade": "The specific lens and framing choice that creates more desire",
    "wardrobeUpgrade": "The specific styling upgrade that outclasses their aesthetic",
    "emotionalUpgrade": "The stronger emotion you should target instead",
    "fullPromptDirection": "A complete one-paragraph image prompt direction that would produce a superior ad to what they made — cinematic, specific, actionable for AI image generation"
  },
  "winVerdict": "One sentence on exactly how and why your version would outperform theirs in this market"
}`

export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const body = await req.json()
    const { imageDataUrl, brandContext } = body

    if (!imageDataUrl?.trim()) {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 })
    }

    // Credit check — 3 credits for vision analysis
    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
    const { data: userRow } = await admin.from('app_users').select('credits').eq('id', user.id).single()
    if (!userRow || userRow.credits < 3) {
      return NextResponse.json({ error: 'Not enough credits — need 3' }, { status: 402 })
    }

    const apiKey = String(process.env.XAI_API_KEY || '')
      .replace(/^Bearer\s+/i, '').replace(/^"+|"+$/g, '').trim()

    if (!apiKey) return NextResponse.json({ error: 'API key not configured' }, { status: 500 })

    const contextNote = brandContext?.trim()
      ? `\n\nADDITIONAL CONTEXT FROM USER: ${brandContext}`
      : ''

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'grok-2-vision-1212',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: { url: imageDataUrl, detail: 'high' },
              },
              {
                type: 'text',
                text: ANALYSIS_PROMPT + contextNote,
              },
            ],
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      throw new Error(`Vision API error: ${errText}`)
    }

    const grokData = await response.json()
    const raw      = grokData.choices?.[0]?.message?.content?.trim() || ''
    const cleaned  = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim()

    let analysis
    try {
      analysis = JSON.parse(cleaned)
    } catch {
      return NextResponse.json({ error: 'Failed to parse analysis JSON', raw }, { status: 500 })
    }

    // Deduct credits
    await admin.from('app_users').update({ credits: userRow.credits - 3 }).eq('id', user.id)

    return NextResponse.json({ status: 'success', analysis, creditsRemaining: userRow.credits - 3 })
  } catch (err) {
    console.error('COMPETITOR_DECONSTRUCT_ERROR:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
