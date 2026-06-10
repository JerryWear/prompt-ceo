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

    // Shared system prompt — same rules applied to every concept call
    const systemPrompt = `You are a world-class creative director at a premium AI ad agency. You generate precise storyboards for vertical short-form ads (9:16, 30 seconds, Instagram Reels / TikTok).

CORE RULES:
- "generator": "heygen" = founder speaks to camera. ONLY use heygen if hasFounder is true (${hasFounder})
- "generator": "runway" = AI-generated video. Use for all visual/cinematic scenes
- Scripts: punchy, specific to THIS brand — never generic. Sound like a real person, not an ad
- Scene durations must sum to exactly 30 seconds
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
• The product's actual name or named feature shown in the visual environment
• A specific workflow step being visualized in concrete detail (the actual named steps)
• The brand's color palette / visual identity as the dominant aesthetic
• A real output only this product generates, shown visually with specifics
• A named screen, interface, or environment unique to this product
• A measurable result this product achieves, visualized (not "results" — the actual numbers)

Key features to anchor to: ${keyFeatures || 'see brief above'}
Visual identity to embody: ${brandStyle || 'premium cinematic'}

REQUIRED FIELDS on every scene:
"brand_anchors": ["specific visual anchor 1", "specific visual anchor 2"],
"brand_check": "one sentence: how does someone watching only this 5-second clip know this is for ${productName}?"`

    // Brief context reused across all 5 calls
    const briefContext = `CREATIVE BRIEF:
Product: ${summary?.product}
Audience: ${summary?.audience}
Problem: ${summary?.problem}
Solution: ${summary?.solution}
Key Benefit: ${summary?.keyBenefit}
Hook: ${hook}
Style: ${recommendedStyle}
Key Messages: ${(keyMessages || []).join(' | ')}

AVAILABLE ASSETS:
${assetContext.join('\n')}`

    // Scene JSON template (shared)
    const sceneTemplate = `{
  "id": "sN_M",
  "index": 0,
  "label": "Hook | Problem | Solution | Transformation | CTA",
  "type": "founder | product | lifestyle | pain_point | cta | transformation",
  "generator": "${hasFounder ? 'heygen | runway' : 'runway'}",
  "duration": 5,
  "script": "Exact words founder speaks (heygen only). null for runway.",
  "visual_direction": "Cinematographer-level description. Brand-specific anchors required.",
  "dalle_prompt": "Ultra-detailed. Photorealistic. Vertical 9:16. Brand-specific. No people. No faces. Shot on RED. 8K cinematic.",
  "shot": "extreme_close_up | close_up | medium_close_up | medium | wide | overhead",
  "brand_anchors": ["anchor 1", "anchor 2"],
  "brand_check": "How a viewer knows this is for ${productName}",
  "screenshotUrl": ${hasRealScreenshots ? '"URL from PRODUCT REALITY list or null"' : 'null'},
  "assetAssignment": { "sourceType": "heygen | runway | product_image | video_footage | generated", "sourceIndex": null, "note": "..." }
}`

    // Generate one concept per call — 5 parallel calls, each focused on a single concept.
    // This produces reliably complete output vs. one large call where GPT truncates early.
    async function generateOneConcept(conceptIndex, direction) {
      const n = conceptIndex + 1
      const userContent = `${briefContext}

YOU ARE GENERATING CONCEPT ${n} OF 5.
DIRECTION: ${direction}
${!hasFounder ? 'NO HEYGEN — no founder image. All scenes must use generator: "runway".' : ''}

Generate exactly 5 scenes whose durations sum to 30 seconds. Make this concept feel COMPLETELY DIFFERENT from any other ad for this product.

Return ONLY this JSON (one concept object):
{
  "concept": {
    "id": "concept_${n}",
    "title": "3-5 evocative words",
    "logline": "Single punchy line",
    "angle": "problem_solution | testimonial | day_in_life | pattern_interrupt | aspirational | direct_response",
    "platform": "instagram_reels",
    "total_duration": 30,
    "scenes": [${sceneTemplate}]
  }
}`

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user',   content: userContent },
          ],
          temperature: 0.75,
          response_format: { type: 'json_object' },
          max_tokens: 4000,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error?.message || `OpenAI error (concept ${n})`)

      const choice = data.choices?.[0]
      if (choice?.finish_reason === 'length') {
        console.error(`[storyboard] concept ${n} truncated at ${data.usage?.completion_tokens} tokens`)
        throw new Error(`Concept ${n} was truncated`)
      }

      let parsed
      try {
        parsed = JSON.parse(choice.message.content)
      } catch {
        console.error(`[storyboard] concept ${n} JSON parse failed:`, String(choice?.message?.content || '').slice(0, 400))
        throw new Error(`Concept ${n} returned invalid JSON`)
      }

      const concept = parsed.concept || parsed.concepts?.[0] || null
      if (!concept) throw new Error(`Concept ${n} missing from response`)
      console.log(`[storyboard] ✓ concept ${n}: "${concept.title}" (${concept.scenes?.length} scenes, ${data.usage?.completion_tokens} tokens)`)
      return concept
    }

    // Run all 5 in parallel
    const results = await Promise.allSettled(
      conceptDirections.map((dir, i) => generateOneConcept(i, dir))
    )

    const concepts = results.map((r, i) => {
      if (r.status === 'rejected') {
        console.error(`[storyboard] concept ${i + 1} failed:`, r.reason?.message)
        return null
      }
      return r.value
    }).filter(Boolean)

    if (concepts.length === 0) {
      return NextResponse.json({ error: 'All 5 concept generations failed — check OpenAI logs' }, { status: 500 })
    }

    console.log(`[storyboard] ${concepts.length}/5 concepts generated successfully`)

    // Enforce: if no founder, strip any heygen scenes that GPT snuck in
    if (!hasFounder) {
      concepts.forEach(concept => {
        concept.scenes?.forEach(scene => {
          if (scene.generator === 'heygen') {
            scene.generator = 'runway'
            scene.script = null
          }
        })
      })
    }

    const storyboard = { concepts }

    return NextResponse.json({ status: 'success', storyboard })

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
