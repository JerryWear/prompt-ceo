import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

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

function buildBriefPrompt({ finalPrompt, context }) {
  const { worldId, characterName, progressionLevel, timeOfDay, productHint, platform } = context || {}

  const worldLabel = worldId ? worldId.replace(/-/g, ' ') : 'luxury lifestyle'
  const levelLabel = progressionLevel || 'tease'
  const subject    = characterName   || 'the subject'
  const tod        = (timeOfDay      || '').replace(/_/g, ' ') || 'cinematic moment'
  const prod       = productHint?.trim() || ''
  const platLabel  = platform || 'Instagram'

  return `You are a world-class ad creative strategist. Given this cinematic image prompt, generate a complete creative brief.

IMAGE PROMPT:
${finalPrompt}

CONTEXT:
- World: ${worldLabel}
- Subject: ${subject}
- Emotional arc: ${levelLabel} phase
- Time of day: ${tod}
${prod ? `- Product/Brand: ${prod}` : ''}
- Platform: ${platLabel}

Generate a structured creative brief with EXACTLY this JSON format:

{
  "hooks": [
    { "type": "pain", "text": "hook targeting the audience's pain point or fear" },
    { "type": "desire", "text": "hook targeting the audience's aspiration or desire" },
    { "type": "curiosity", "text": "hook creating intrigue or curiosity" }
  ],
  "caption": "Platform-ready caption for this image. 1-3 sentences. Tone matches the world and emotional arc. No generic phrases. No hashtags.",
  "ctas": [
    { "style": "soft", "text": "gentle, low-pressure call to action" },
    { "style": "direct", "text": "clear, direct call to action" },
    { "style": "exclusive", "text": "scarcity or exclusivity-driven call to action" }
  ],
  "emotionAngle": "2-sentence explanation of why this image works psychologically — what emotion it triggers and why that drives the desired response.",
  "scriptSnippet": "The first 3 seconds of a video script for this creative. Format: [VISUAL] description | [AUDIO] voiceover or sound.",
  "platformTip": "One specific tip for this platform to maximize performance."
}

Return ONLY valid JSON. No markdown. No explanation outside the JSON.`
}

export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const body = await req.json()
    const { finalPrompt, context } = body

    if (!finalPrompt?.trim()) {
      return NextResponse.json({ error: 'finalPrompt is required' }, { status: 400 })
    }

    const apiKey = String(process.env.XAI_API_KEY || '')
      .replace(/^Bearer\s+/i, '')
      .replace(/^"+|"+$/g, '')
      .trim()

    if (!apiKey) return NextResponse.json({ error: 'API key not configured' }, { status: 500 })

    const systemPrompt = buildBriefPrompt({ finalPrompt, context })

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'grok-3-fast',
        messages: [{ role: 'user', content: systemPrompt }],
        temperature: 0.75,
        max_tokens: 1200,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      throw new Error(`Grok API error: ${err}`)
    }

    const grokData = await response.json()
    const raw      = grokData.choices?.[0]?.message?.content?.trim() || ''

    // Strip markdown code fences if present
    const cleaned = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim()

    let brief
    try {
      brief = JSON.parse(cleaned)
    } catch {
      return NextResponse.json({ error: 'Failed to parse brief JSON', raw }, { status: 500 })
    }

    return NextResponse.json({ status: 'success', brief })
  } catch (err) {
    console.error('CREATIVE_BRIEF_ERROR:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
