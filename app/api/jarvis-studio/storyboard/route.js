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

// ─── Compliance Scoring ───────────────────────────────────────────────────────
// Scores 0–100: how well does this concept use what the user actually provided?
// Called after generation — no extra AI calls.

function computeCompliance(concept, inv) {
  const scenes  = concept.scenes || []
  const sources = scenes.flatMap(s => s.source_used || [])
  let score = 100
  const deductions = []

  if (inv.hasFounder) {
    const used = sources.includes('founder_image') || scenes.some(s => s.generator === 'heygen')
    if (!used) { score -= 25; deductions.push('founder image not used (-25)') }
  }
  if (inv.hasProducts) {
    const used = sources.some(s => s === 'product_image' || s === 'uploaded_image') ||
                 scenes.some(s => s.assetAssignment?.sourceType === 'product_image')
    if (!used) { score -= 20; deductions.push('product images not referenced (-20)') }
  }
  if (inv.hasVideo) {
    const used = sources.includes('uploaded_video') ||
                 scenes.some(s => s.assetAssignment?.sourceType === 'video_footage')
    if (!used) { score -= 10; deductions.push('video footage not referenced (-10)') }
  }
  if (inv.hasScreenshots) {
    const used = sources.includes('website_screenshot') || scenes.some(s => s.screenshotUrl)
    if (!used) { score -= 10; deductions.push('website screenshots not referenced (-10)') }
  }

  // Penalise over-invention when real assets exist
  const totalAssetTypes = (inv.hasFounder ? 1 : 0) + (inv.hasProducts ? 1 : 0) +
                          (inv.hasVideo ? 1 : 0) + (inv.hasScreenshots ? 1 : 0)
  if (totalAssetTypes > 0 && sources.length > 0) {
    const jarvisRatio = sources.filter(s => s === 'jarvis_generated').length / sources.length
    if (jarvisRatio > 0.6) {
      const penalty = Math.round((jarvisRatio - 0.6) * 50)
      score -= penalty
      deductions.push(`over-generated (${Math.round(jarvisRatio * 100)}% jarvis_generated, -${penalty})`)
    }
  }

  // Penalise capability-invisible scenes
  const GENERIC_CAPS = /^(show|display|dashboard|interface|screen|software|platform|results|overview|ui)$/i
  const capScenes = scenes.filter(s => s.capability_anchor && !GENERIC_CAPS.test(s.capability_anchor.trim()))
  if (capScenes.length < scenes.length) {
    const missing = scenes.length - capScenes.length
    const penalty = missing * 5
    score -= penalty
    deductions.push(`${missing} scene(s) lack specific capability anchor (-${penalty})`)
  }
  // Penalise missing proof_of_capability
  const proofScenes = scenes.filter(s => s.proof_of_capability && s.proof_of_capability.includes('→'))
  if (proofScenes.length < scenes.length) {
    const missing = scenes.length - proofScenes.length
    score -= missing * 3
    deductions.push(`${missing} scene(s) missing input→output proof (-${missing * 3})`)
  }

  const final = Math.max(0, Math.min(100, score))
  if (deductions.length) console.log(`[storyboard] compliance ${concept.id}: ${final}/100 — ${deductions.join(', ')}`)
  else console.log(`[storyboard] compliance ${concept.id}: ${final}/100 ✓`)
  return { score: final, deductions }
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

    const hasFounder   = !!assets?.founderImageUrl
    const hasProducts  = assets?.productImageUrls?.length > 0
    const hasVideo     = assets?.videoUrls?.length > 0
    const hasScreenshots = brandScreenshots.length > 0

    // Asset inventory — passed to compliance scorer and system prompt
    const assetInventory = { hasFounder, hasProducts, hasVideo, hasScreenshots }

    const productName = (summary?.product || 'this brand').split(/[—.\n]/)[0].trim().slice(0, 60)
    const keyFeatures = (keyMessages || []).slice(0, 6).join(' | ')
    const brandStyle  = recommendedStyle || summary?.solution || ''

    // ── Level 1: Build explicit asset reference block ────────────────────────
    // GPT sees exactly what exists so it cannot claim ignorance of available assets.
    const assetLines = []
    if (hasFounder) {
      assetLines.push(`FOUNDER IMAGE ✓ AVAILABLE
→ Use for heygen scenes where founder speaks directly to camera
→ Set generator: "heygen", populate script field
→ source_used must include "founder_image"`)
    }
    if (hasProducts) {
      const urls = (assets.productImageUrls || []).map((u, i) => `  [product_image_${i}] ${u.slice(0, 80)}`).join('\n')
      assetLines.push(`PRODUCT IMAGES ✓ AVAILABLE (${assets.productImageUrls.length} images)
${urls}
→ Reference these in visual_direction and dalle_prompt — describe what you see in them
→ Set assetAssignment.sourceType: "product_image", sourceIndex: 0/1/2
→ source_used must include "product_image"`)
    }
    if (hasVideo) {
      assetLines.push(`VIDEO FOOTAGE ✓ AVAILABLE (${assets.videoUrls.length} video${assets.videoUrls.length > 1 ? 's' : ''})
→ Reference the footage style, content, and visual language in runway scenes
→ Set assetAssignment.sourceType: "video_footage"
→ source_used must include "uploaded_video"`)
    }
    if (hasScreenshots) {
      const lines = brandScreenshots.map((s, i) => `  [screenshot_${i}] ${s.page}: ${s.url.slice(0, 80)}`).join('\n')
      assetLines.push(`WEBSITE SCREENSHOTS ✓ AVAILABLE (${brandScreenshots.length} pages)
${lines}
→ USE AS BRAND REFERENCE: extract colors, logo style, UI patterns, product visuals
→ DO NOT blindly animate every screenshot — only use screenshotUrl when showing the real UI serves the story
→ Inform dalle_prompt with the visual language you extract from these screenshots
→ source_used must include "website_screenshot" on any scene that references them`)
    }
    if (!assetLines.length) {
      assetLines.push('NO ASSETS PROVIDED — Jarvis creativity is the only available source (Level 3 fallback).')
    }
    const assetBlock = assetLines.join('\n\n')

    // ── Concept directions based on intent ──────────────────────────────────
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

    // ── Shared system prompt ──────────────────────────────────────────────────
    const systemPrompt = `You are Jarvis — an elite creative director at a premium AI ad agency.
You generate precise storyboards for vertical short-form ads (9:16, 30 seconds, Instagram Reels / TikTok).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CREATIVE OBEDIENCE HIERARCHY — FOLLOW IN STRICT PRIORITY ORDER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LEVEL 1 — USER ASSETS (HIGHEST PRIORITY)
${assetBlock}

YOUR FIRST QUESTION for every scene must be:
"What user asset already exists that serves this scene?"
NOT: "What can I imagine for this scene?"

If an asset exists and a scene ignores it → that is a failure.
If product images exist and a runway scene describes generic visuals → that is a failure.
If a founder image exists and no heygen scene appears in the concept → that is a failure (unless direction says no founder).

LEVEL 2 — USER PROMPT / STATED DIRECTION
The user has specified: "${hook}"
Intent type: ${intent || 'general'}

RULE: EXPAND the user's stated direction into scenes. Do NOT reinterpret it.
If user says "luxury founder ad" → make a luxury founder ad.
If user says "show the dashboard transforming a brief" → show the dashboard transforming a brief.
Do not replace their concept with a different story. Creativity fills the gaps, not the frame.

LEVEL 3 — JARVIS CREATIVITY (FALLBACK ONLY)
Only invent visual concepts where no user asset or prompt provides the answer.
Creativity enhances user intent — it does not replace it.
If assets exist, the score of "jarvis_generated" source_used entries in scenes must stay below 60%.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TECHNICAL RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- "generator": "heygen" = founder speaks to camera. ONLY use if hasFounder is true (${hasFounder})
- "generator": "runway" = AI-generated video. Use for all visual/cinematic scenes
- Scripts: punchy, specific to THIS brand — never generic. Sound like a real person
- Scene durations must sum to exactly 30 seconds
- First scene = hook. Last scene = CTA.
- Return ONLY valid JSON.

RUNWAY SCENES — NO PEOPLE:
Runway AI CANNOT generate realistic human faces. For all runway scenes:
- NEVER describe people, faces, smiling clients, or "person using product"
- INSTEAD: describe what THIS SPECIFIC PRODUCT looks like in action, what it PRODUCES, what its world feels like
- The dalle_prompt generates the preview image. Make it brand-specific and people-free.

BRAND ANCHOR SYSTEM (mandatory):
Every runway scene MUST be visually locked to "${productName}" specifically.
Test: "If I removed the brand name, could this be an ad for 10 other products?" → If yes, rewrite it.

Valid anchors (use 2–3 per runway scene):
• Product name or named feature shown in the visual environment
• A specific workflow step visualized in concrete detail
• The brand's color palette as the dominant aesthetic
• A real output only this product generates, shown with specifics
• A named screen, interface, or environment unique to this product

Key features: ${keyFeatures || 'see brief above'}
Visual identity: ${brandStyle || 'premium cinematic'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CAPABILITY ANCHOR SYSTEM (mandatory — every scene):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The #1 failure in AI product ads: showing SOFTWARE without showing CAPABILITY.
A viewer must understand what ${productName} DOES within 10 seconds — even if the logo is removed.

RULE: Every scene must answer "What specific ${productName} capability is being demonstrated?"

BAD — dashboard-driven (shows the software EXISTS):
✗ "Show the dashboard"
✗ "Display campaign results screen"
✗ "Software interface loading"
✗ "Analytics panel with charts"

GOOD — capability-driven (shows the software WORKS):
✓ capability: "Brief generation" → proof: "Blank text box → structured 5-part creative brief appears in 3 seconds"
✓ capability: "Concept generation" → proof: "Brief in → 5 distinct ad concepts with previews materialize instantly"
✓ capability: "Storyboard creation" → proof: "Concept selected → 25 scene frames with scripts and visuals appear"
✓ capability: "One-brief to full campaign" → proof: "Single idea typed → complete campaign ready in under 60 seconds"
✓ capability: "AI Creative Direction" → proof: "PromptCEO writes scripts, directs shots, generates visuals — zero agency needed"
✓ capability: "Ad production" → proof: "Storyboard approved → Runway + HeyGen clips render and assemble into MP4"

Test for every scene: "After watching only this 5-second clip, does a viewer know ONE SPECIFIC THING ${productName} can do?"
If NO → capability is invisible → rewrite the scene.

REQUIRED FIELDS on every scene:
"capability_anchor": "The specific named capability being demonstrated (not 'dashboard' — the ACTUAL action)",
"proof_of_capability": "[input state] → [transformation] → [output state] — what the viewer watches happen"

source_used values (use the correct ones):
• "founder_image" — scene built around the uploaded founder photo (heygen scenes)
• "product_image" — scene references uploaded product images
• "uploaded_video" — scene references uploaded video footage
• "website_screenshot" — scene uses brand reference from website screenshots
• "user_prompt" — scene follows the user's stated direction directly
• "brand_knowledge" — scene uses brand info from brief (no direct asset)
• "jarvis_generated" — scene is fully invented by Jarvis (last resort)`

    // ── Brief context ─────────────────────────────────────────────────────────
    const briefContext = `CREATIVE BRIEF:
Product: ${summary?.product}
Audience: ${summary?.audience}
Problem: ${summary?.problem}
Solution: ${summary?.solution}
Key Benefit: ${summary?.keyBenefit}
Hook: ${hook}
Style: ${recommendedStyle}
Key Messages: ${(keyMessages || []).join(' | ')}`

    // ── Scene template ────────────────────────────────────────────────────────
    const screenshotUrlField = hasScreenshots
      ? '"Use a screenshot URL from the WEBSITE SCREENSHOTS list ONLY if showing the real UI serves this specific scene (product demo, CTA), otherwise null"'
      : 'null'

    const sceneTemplate = `{
  "id": "sN_M",
  "index": 0,
  "label": "Hook | Problem | Solution | Transformation | CTA",
  "type": "founder | product | lifestyle | pain_point | cta | transformation",
  "generator": "${hasFounder ? 'heygen | runway' : 'runway'}",
  "duration": 5,
  "script": "Exact words founder speaks (heygen only). null for runway.",
  "visual_direction": "Cinematographer description built around USER ASSETS first, then brand specifics.",
  "dalle_prompt": "Ultra-detailed. Photorealistic. Vertical 9:16. Informed by user assets and brand visuals. No people. No faces. Shot on RED. 8K cinematic.",
  "shot": "extreme_close_up | close_up | medium_close_up | medium | wide | overhead",
  "brand_anchors": ["specific visual anchor 1 tying scene to ${productName}", "anchor 2"],
  "brand_check": "How a viewer knows this is for ${productName} — not a competitor",
  "capability_anchor": "The specific named ${productName} capability this scene demonstrates — not 'dashboard', the ACTUAL action",
  "proof_of_capability": "[input state] → [transformation] → [output state] the viewer watches happen",
  "screenshotUrl": ${screenshotUrlField},
  "source_used": ["founder_image | product_image | uploaded_video | website_screenshot | user_prompt | brand_knowledge | jarvis_generated"],
  "assetAssignment": { "sourceType": "heygen | runway | product_image | video_footage | generated", "sourceIndex": null, "note": "Which user asset this scene builds on and why" }
}`

    // ── Generate one concept per call ─────────────────────────────────────────
    async function generateOneConcept(conceptIndex, direction) {
      const n = conceptIndex + 1
      const userContent = `${briefContext}

GENERATING CONCEPT ${n} OF 5.
DIRECTION: ${direction}
${!hasFounder ? 'NO HEYGEN — no founder image uploaded. All scenes must use generator: "runway".' : ''}

OBEDIENCE CHECK BEFORE WRITING:
1. Which user assets from LEVEL 1 above can this concept use?
2. Does this direction match the user's stated hook/intent?
3. Only invent where no asset or prompt covers it.

CAPABILITY CHECK BEFORE WRITING:
For each scene, answer: "What specific ${productName} capability will a viewer understand from this 5-second clip?"
If the answer is "they'll see a dashboard" → that scene is capability-invisible → rewrite it before writing JSON.
The 5 scenes of this concept should together demonstrate at least 3 distinct ${productName} capabilities.

Generate exactly 5 scenes. Durations sum to 30 seconds. This concept must feel COMPLETELY DIFFERENT from the other 4 concepts.

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

      // Verify source_used is populated on every scene
      const missing = (concept.scenes || []).filter(s => !s.source_used?.length)
      if (missing.length) console.warn(`[storyboard] concept ${n}: ${missing.length} scene(s) missing source_used`)

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

    // Enforce: strip any heygen scenes if no founder image was uploaded
    if (!hasFounder) {
      concepts.forEach(concept => {
        concept.scenes?.forEach(scene => {
          if (scene.generator === 'heygen') {
            scene.generator = 'runway'
            scene.script    = null
          }
        })
      })
    }

    // Compute compliance score for each concept
    concepts.forEach(concept => {
      const { score, deductions } = computeCompliance(concept, assetInventory)
      concept.compliance_score    = score
      concept.compliance_details  = deductions
    })

    const avgScore = Math.round(concepts.reduce((s, c) => s + (c.compliance_score || 0), 0) / concepts.length)
    console.log(`[storyboard] ${concepts.length}/5 concepts | avg compliance: ${avgScore}/100`)

    return NextResponse.json({ status: 'success', storyboard: { concepts } })

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
