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

    const { creativeBrief, assets, intent, brandScreenshots = [] } = await req.json()
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

    // Extract brand identity for anchor system
    const productName = (summary?.product || 'this brand').split(/[—.\n]/)[0].trim().slice(0, 60)
    const keyFeatures  = (keyMessages || []).slice(0, 6).join(' | ')
    const brandStyle   = recommendedStyle || summary?.solution || ''

    // Build Product Reality context — real screenshots replace AI-imagined UI
    const hasRealScreenshots = brandScreenshots.length > 0
    const screenshotList = brandScreenshots
      .map((s, i) => `${i + 1}. ${s.page}: ${s.url}`)
      .join('\n')

    const productRealityBlock = hasRealScreenshots ? `
PRODUCT REALITY ENGINE — REAL SCREENSHOTS (use these instead of imagining the UI):
─────────────────────────────────────────────────────────────────────────────────
The following URLs are actual screenshots of the real product. They are not AI-generated.
Runway will ANIMATE these real screenshots — making the actual UI come to life.

${screenshotList}

DIRECTIVE for screenplay scenes (type: product, lifestyle, cta, transformation, pain_point):
→ Set "screenshotUrl" to the most relevant screenshot URL from the list above.
→ Runway will animate that real screenshot — do NOT hallucinate the UI.
→ The dalle_prompt should describe camera motion OVER the real UI (push in, slow reveal, orbit).
→ Do NOT set screenshotUrl on "heygen" (founder speaks) scenes.
→ If no screenshot fits, set screenshotUrl to null (scene falls back to AI generation).

This is the difference between imagining the product and showing the product.
For ${productName}: every product scene should use the homepage screenshot unless a more specific one exists.` : ''

    const gptRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are a world-class creative director at a premium AI ad agency. You generate precise storyboards for vertical short-form ads (9:16, 30 seconds, Instagram Reels / TikTok).

CORE RULES:
- Every concept must feel completely different — different hook, different emotion, different structure
- "generator": "heygen" = founder speaks to camera. ONLY use heygen if hasFounder is true (${hasFounder})
- "generator": "runway" = AI-generated video. Use for all visual/cinematic scenes
- Scripts: punchy, specific to THIS brand — never generic. Sound like a real person, not an ad
- Scene durations must sum to exactly total_duration
- First scene = hook. Last scene = CTA.
- Return ONLY valid JSON.

RUNWAY SCENES — NO PEOPLE:
Runway AI CANNOT generate realistic human faces. For all runway scenes:
- NEVER describe people, faces, smiling clients, testimonials showing humans, or "person using product"
- INSTEAD: describe what THIS SPECIFIC PRODUCT looks like in action, what its world feels like, what it PRODUCES
- The dalle_prompt generates the preview image. Make it brand-specific and people-free.

${productRealityBlock}

BRAND ANCHOR SYSTEM (mandatory — this is the most important rule):
The #1 failure in AI ads is generic imagery that could be for any brand in the category.
Every runway scene MUST be visually locked to "${productName}" specifically.

Test each scene: "If I removed the brand name, could this be an ad for 10 other products?" → If yes, rewrite it.

Valid brand anchors (use 2–3 per runway scene):
• The product's actual name or named feature shown in the visual environment (e.g., a specific studio/module name in the scene)
• A specific workflow step being visualized in concrete detail (not "the process" — the actual named steps)
• The brand's color palette / visual identity as the dominant aesthetic (use the style description)
• A real output only this product generates, shown visually with specifics
• A named screen, interface, or environment unique to this product
• A measurable result this product achieves, visualized (not "results" — the actual numbers or specifics)

Key features to anchor to: ${keyFeatures || 'see brief above'}
Visual identity to embody: ${brandStyle || 'premium cinematic'}

REQUIRED FIELDS on every scene (including heygen scenes):
"brand_anchors": ["specific visual anchor 1", "specific visual anchor 2"],
"brand_check": "one sentence: how does someone watching only this 5-second clip — with no caption — know this is for ${productName} and not a competitor?"

If brand_check sounds vague or could apply to a competitor → the anchors are too weak → rewrite the scene.`,
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
          "visual_direction": "Precise cinematographer-level scene description. What is happening, how it is framed, what emotion it creates. Must reference brand-specific anchors.",
          "dalle_prompt": "Ultra-detailed prompt. Photorealistic. Vertical 9:16 portrait frame. [brand-specific setting/output/interface]. [specific action/composition]. [specific lighting matching brand aesthetic]. Shot on RED camera. 8K. Cinematic color grade. No people. No faces.",
          "shot": "extreme_close_up | close_up | medium_close_up | medium | wide | overhead",
          "brand_anchors": ["specific visual detail 1 tying scene to ${productName}", "specific visual detail 2"],
          "brand_check": "one sentence answer: how does a viewer know this is for ${productName}?",
          "screenshotUrl": ${hasRealScreenshots ? `"URL from the PRODUCT REALITY list above (for product/cta/lifestyle/transformation runway scenes), or null"` : 'null'},
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
        max_tokens: 6000,
      }),
    })

    const gptData = await gptRes.json()
    if (!gptRes.ok) return NextResponse.json({ error: gptData.error?.message || 'OpenAI error' }, { status: 500 })

    let storyboard
    try {
      storyboard = JSON.parse(gptData.choices[0].message.content)
    } catch (parseErr) {
      console.error('[storyboard] JSON parse failed:', parseErr.message)
      console.error('[storyboard] raw GPT output (first 500):', String(gptData.choices?.[0]?.message?.content || '').slice(0, 500))
      return NextResponse.json({ error: 'Failed to parse storyboard — GPT returned invalid JSON' }, { status: 500 })
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
