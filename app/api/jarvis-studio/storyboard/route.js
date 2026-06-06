import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const maxDuration = 90

async function makeSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
}

// POST /api/jarvis-studio/storyboard
// Body: { brandContext }
// Returns: { status, storyboard: { concepts: [...] } }
export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { brandContext } = await req.json()
    if (!brandContext) return NextResponse.json({ error: 'brandContext required' }, { status: 400 })

    const gptRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are a world-class creative director at a premium AI creative agency. You generate storyboards for viral short-form ads (Instagram Reels, TikTok).

Your storyboards are cinematic, specific, and psychologically engineered to convert. You create ads that feel real, not like ads.

Rules:
- Every concept must have a distinct angle — not variations of the same theme
- Scenes with "generator": "heygen" are for the founder/spokesperson speaking to camera
- Scenes with "generator": "runway" are AI-generated video clips (no person talking)
- DALL-E prompts must be photorealistic, ultra-detailed, vertical 9:16 portrait frame, cinematic lighting
- DALL-E prompts for heygen scenes should describe the setting/environment (not a placeholder face)
- Scripts for heygen scenes must be punchy, direct, conversational — not promotional-sounding
- Scene durations must sum exactly to total_duration
- First scene is always the hook. Last scene is always the CTA.
- Return ONLY valid JSON.`,
          },
          {
            role: 'user',
            content: `Brand Context:
Brand: ${brandContext.brandName}
Industry: ${brandContext.industry}
Product: ${brandContext.productDescription}
Value Prop: ${brandContext.valueProposition}
Target Audience: ${brandContext.targetAudience}
Tone: ${brandContext.toneOfVoice}
Key Messages: ${(brandContext.keyMessages || []).join(', ')}
Pain Points: ${(brandContext.painPoints || []).join(', ')}
Visual Style: ${brandContext.visualStyle}
Competitive Advantage: ${brandContext.competitiveAdvantage}
Founder Personality: ${brandContext.founderPersonality || 'not specified'}

Generate 5 distinct ad concepts for ${brandContext.platformFocus || 'instagram_reels'}. Each concept has exactly 5 scenes.

Concept directions:
- Concept 1: Problem/Solution — opens with founder speaking (heygen hook)
- Concept 2: Pure visual storytelling — all runway, no heygen
- Concept 3: Social proof/testimonial — founder closes the ad (heygen as last scene)
- Concept 4: Pattern interrupt / shock opener — all visual, dramatic
- Concept 5: Transformation/aspirational — founder opens and closes (heygen first + last)

Return this exact JSON structure:
{
  "concepts": [
    {
      "id": "concept_1",
      "title": "Concept title (3-5 words)",
      "logline": "One-sentence hook capturing this ad's angle",
      "angle": "problem_solution | testimonial | day_in_life | pattern_interrupt | aspirational",
      "platform": "instagram_reels",
      "total_duration": 30,
      "scenes": [
        {
          "id": "s1_1",
          "index": 0,
          "label": "Hook",
          "type": "founder | product | lifestyle | pain_point | cta",
          "generator": "heygen | runway",
          "duration": 5,
          "script": "exact words founder speaks — heygen only, null for runway",
          "visual_direction": "cinematographer-level scene description (1-2 sentences)",
          "dalle_prompt": "Ultra-detailed DALL-E 3 prompt. Photorealistic. Vertical 9:16 portrait frame. [specific environment/setting]. [specific action/composition]. Cinematic lighting. Shot on RED camera. 8K. Professional photography.",
          "shot": "extreme_close_up | close_up | medium_close_up | medium | wide | overhead"
        }
      ]
    }
  ]
}`,
          },
        ],
        temperature: 0.85,
        response_format: { type: 'json_object' },
        max_tokens: 4500,
      }),
    })

    const gptData = await gptRes.json()
    if (!gptRes.ok) return NextResponse.json({ error: gptData.error?.message || 'OpenAI error' }, { status: 500 })

    let storyboard
    try {
      storyboard = JSON.parse(gptData.choices[0].message.content)
    } catch {
      return NextResponse.json({ error: 'Failed to parse storyboard' }, { status: 500 })
    }

    return NextResponse.json({ status: 'success', storyboard })

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
