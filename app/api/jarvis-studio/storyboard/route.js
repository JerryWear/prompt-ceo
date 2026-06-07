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
// Body: { creativeBrief, assets, intent? }
// Returns: { status, storyboard: { concepts: [...] } }
export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { creativeBrief, assets, intent } = await req.json()
    if (!creativeBrief) return NextResponse.json({ error: 'creativeBrief required' }, { status: 400 })

    const { summary, keyMessages, hook, recommendedStyle, assetPlan } = creativeBrief

    const hasFounder  = !!assets?.founderImageUrl
    const hasProducts = assets?.productImageUrls?.length > 0
    const hasVideo    = assets?.videoUrls?.length > 0

    const assetContext = []
    if (hasFounder)  assetContext.push('FOUNDER IMAGE: Use for HeyGen avatar. Founder speaks directly to camera in heygen scenes.')
    if (hasProducts) assetContext.push(`PRODUCT IMAGES (${assets.productImageUrls.length}): Use as reference for product visuals. Runway scenes should reflect the actual product design.`)
    if (hasVideo)    assetContext.push('VIDEO FOOTAGE: Reference footage available. Some runway scenes can instruct Runway to recreate or match the visual style.')
    if (!assetContext.length) assetContext.push('NO VISUAL ASSETS: All scenes will be fully AI-generated. No founder clips.')

    const conceptDirections = []
    if (intent === 'founder_ad' || intent === 'ugc') {
      conceptDirections.push('Concept 1: Founder leads — opens with heygen hook, intercut runway visuals')
      conceptDirections.push('Concept 2: Founder problem/solution — heygen problem statement, runway solution visuals, heygen CTA')
      conceptDirections.push('Concept 3: Day in the life — all runway lifestyle, no founder')
      conceptDirections.push('Concept 4: Social proof — founder gives testimonial format, runway shows results')
      conceptDirections.push('Concept 5: Direct response — founder speaks full ad, minimal runway cuts')
    } else if (intent === 'cinematic' || intent === 'product_demo') {
      conceptDirections.push('Concept 1: Pure visual — all runway cinematic, no founder')
      conceptDirections.push('Concept 2: Product hero — all runway product-focused closeups and demos')
      conceptDirections.push('Concept 3: Before/after — runway contrast, founder closes if available')
      conceptDirections.push('Concept 4: Lifestyle integration — runway shows product in aspirational context')
      conceptDirections.push('Concept 5: Pattern interrupt — dramatic runway opener, founder CTA if available')
    } else {
      conceptDirections.push('Concept 1: Problem/Solution — opens with founder speaking (heygen hook), runway visuals for solution')
      conceptDirections.push('Concept 2: Pure visual storytelling — all runway, no heygen')
      conceptDirections.push('Concept 3: Social proof/testimonial — runway visuals, founder closes the ad (heygen CTA)')
      conceptDirections.push('Concept 4: Pattern interrupt — dramatic runway opener, no heygen unless founder available')
      conceptDirections.push('Concept 5: Transformation/aspirational — founder opens and closes (heygen), runway shows transformation')
    }

    const gptRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are a world-class creative director at a premium AI ad agency. You generate precise storyboards for vertical short-form ads (9:16, 30 seconds, Instagram Reels / TikTok).

Rules:
- Every concept must feel completely different — different hook, different emotion, different structure
- "generator": "heygen" = founder speaks to camera. ONLY use heygen if hasFounder is true (${hasFounder})
- "generator": "runway" = AI-generated video. Use for all visual/cinematic scenes
- assetAssignment tells Runway/HeyGen which uploaded asset to reference
- Scripts: punchy, specific to THIS brand — never generic. Sound like a real person, not an ad
- Scene durations must sum to exactly total_duration
- First scene = hook. Last scene = CTA.
- Return ONLY valid JSON.

CRITICAL — RUNWAY SCENES (visual_direction and dalle_prompt):
Runway AI CANNOT generate realistic human faces. For all runway scenes:
- NEVER describe people, faces, smiling clients, testimonials showing humans, or "person using product"
- INSTEAD: describe what THIS SPECIFIC PRODUCT looks like in action, what its world feels like, what it PRODUCES — based entirely on the product description and brief above
- Your visual directions must be specific to THIS brand — not generic tech imagery. Use the product name, its actual features, its real outputs, its brand aesthetic as described
- If the scene is a testimonial: show the OUTCOME or RESULT this product creates for its users (what success looks like for THEM) — in the product's own visual language
- The dalle_prompt is used to generate a preview image. Make it brand-specific and people-free.`,
          },
          {
            role: 'user',
            content: `CREATIVE BRIEF:
Product: ${summary?.product}
Audience: ${summary?.audience}
Problem: ${summary?.problem}
Solution: ${summary?.solution}
Key Benefit: ${summary?.keyBenefit}
Hook: ${hook}
Style: ${recommendedStyle}
Key Messages: ${(keyMessages || []).join(' | ')}

AVAILABLE ASSETS:
${assetContext.join('\n')}

CONCEPT DIRECTIONS:
${conceptDirections.join('\n')}

Generate 5 ad concepts. Each has exactly 5 scenes. Total duration: 30 seconds.
${!hasFounder ? 'IMPORTANT: No heygen scenes — no founder image provided. All scenes must use generator: "runway".' : ''}

Return this exact JSON:
{
  "concepts": [
    {
      "id": "concept_1",
      "title": "Concept title (3-5 words, evocative)",
      "logline": "Single punchy line capturing this ad's core idea",
      "angle": "problem_solution | testimonial | day_in_life | pattern_interrupt | aspirational | direct_response",
      "platform": "instagram_reels",
      "total_duration": 30,
      "scenes": [
        {
          "id": "s1_1",
          "index": 0,
          "label": "Hook",
          "type": "founder | product | lifestyle | pain_point | cta | transformation",
          "generator": "${hasFounder ? 'heygen | runway' : 'runway'}",
          "duration": 5,
          "script": "Exact words founder speaks (heygen only). null for runway scenes.",
          "visual_direction": "Precise cinematographer-level scene description. What is happening, how it is framed, what emotion it creates.",
          "dalle_prompt": "Ultra-detailed DALL-E 3 prompt. Photorealistic. Vertical 9:16 portrait frame. [specific setting]. [specific action/composition]. [specific lighting]. Shot on RED camera. 8K. Cinematic color grade.",
          "shot": "extreme_close_up | close_up | medium_close_up | medium | wide | overhead",
          "assetAssignment": {
            "sourceType": "heygen | runway | product_image | video_footage | generated",
            "sourceIndex": null,
            "note": "brief note on how this asset feeds this scene"
          }
        }
      ]
    }
  ]
}`,
          },
        ],
        temperature: 0.85,
        response_format: { type: 'json_object' },
        max_tokens: 5000,
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

    // Enforce: if no founder, strip any heygen scenes
    if (!hasFounder && storyboard?.concepts) {
      storyboard.concepts.forEach(concept => {
        concept.scenes?.forEach(scene => {
          if (scene.generator === 'heygen') {
            scene.generator = 'runway'
            scene.script = null
          }
        })
      })
    }

    return NextResponse.json({ status: 'success', storyboard })

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
