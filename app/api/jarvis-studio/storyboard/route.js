import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const maxDuration = 300

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

    const { creativeBrief, assets, intent, brandScreenshots = [], understanding, videoFrameUrls = [] } = await req.json()
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

    // Build visual DNA block from vision-extracted understanding (if available)
    let visualDNABlock = ''
    if (understanding?.brand?.visualStyle || understanding?.products?.designLanguage) {
      const dnaLines = []
      if (understanding.brand?.visualStyle)       dnaLines.push(`Visual Style: ${understanding.brand.visualStyle}`)
      if (understanding.products?.designLanguage) dnaLines.push(`Design Language: ${understanding.products.designLanguage}`)
      if (understanding.products?.keyVisuals)     dnaLines.push(`Key Visuals: ${understanding.products.keyVisuals}`)
      if (understanding.products?.descriptions?.length) {
        dnaLines.push(`Product Appearance: ${understanding.products.descriptions.slice(0, 3).join(' | ')}`)
      }
      visualDNABlock = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BRAND VISUAL DNA — GPT-4O VISION ANALYSIS OF USER'S ACTUAL IMAGES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${dnaLines.join('\n')}

MANDATORY FOR EVERY dalle_prompt:
→ Use THESE visual characteristics — not generic "dark UI" or "creative platform"
→ Incorporate the actual colors, typography, and design language described above
→ Someone who uses the real product should recognize their app in the preview image
`
    }

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
      const productUrls = assets.productImageUrls || []
      const urlLines = productUrls.map((u, i) => `  product_image_${i}: "${u}"`).join('\n')
      assetLines.push(`PRODUCT IMAGES ✓ AVAILABLE — ${productUrls.length} real screenshot(s) of the actual product
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXACT URLs (copy these verbatim into screenshotUrl):
${urlLines}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MANDATORY RULE — REAL > GENERATED:
These are real screenshots of the client's actual product. A real image is ALWAYS better than an AI-generated interpretation.
→ For every Solution scene: set screenshotUrl to product_image_0 (or rotate through available images)
→ For every Transformation scene: set screenshotUrl to one of these URLs
→ For Hook or Problem scenes that show the product: set screenshotUrl
→ ONLY set screenshotUrl to null on founder (heygen) scenes or pure lifestyle/emotion scenes with no product
→ When screenshotUrl is set, the client sees their REAL product in the ad preview — not a fake
→ source_used must include "product_image"`)
    }
    if (hasVideo) {
      assetLines.push(`VIDEO FOOTAGE ✓ AVAILABLE (${assets.videoUrls.length} video${assets.videoUrls.length > 1 ? 's' : ''})
→ Reference the footage style, content, and visual language in runway scenes
→ Set assetAssignment.sourceType: "video_footage"
→ source_used must include "uploaded_video"`)
    }
    if (hasScreenshots) {
      const lines = brandScreenshots.map((s, i) => `  screenshot_${i} (${s.page}): "${s.url.slice(0, 120)}"`).join('\n')
      assetLines.push(`WEBSITE SCREENSHOTS ✓ AVAILABLE — ${brandScreenshots.length} real page screenshot(s)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXACT URLs (copy verbatim into screenshotUrl when showing the real site serves the scene):
${lines}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ Extract colors, logo, UI patterns, and design language from these screenshots
→ Use as screenshotUrl for product-demo scenes where showing the real website is more convincing than a generated image
→ source_used must include "website_screenshot"`)
    }
    if (!assetLines.length) {
      assetLines.push('NO ASSETS PROVIDED — Jarvis creativity is the only available source (Level 3 fallback).')
    }
    const assetBlock = assetLines.join('\n\n')

    // ── Visual palettes — one per concept, forced distinct ───────────────────
    const VISUAL_STYLES = [
      'DARK LUXURY GOLD: deep black backgrounds (#0a0a0a), gold/amber accent (#c8a84b), dramatic single-source lighting, premium editorial.',
      'CLEAN MINIMAL WHITE: bright white or platinum backgrounds, cool silver tones, high-key even lighting, clinical precision.',
      'HIGH ENERGY ELECTRIC BLUE: deep navy or midnight blue backgrounds, neon/electric blue accents (#00aaff), high contrast, kinetic energy.',
      'WARM PREMIUM AMBER: rich warm browns, burnished copper, cream/ivory highlights, candlelight-warm tones, feels trustworthy.',
      'BOLD GRAPHIC MONOCHROME: high contrast pure black and white with one vivid accent color (deep red or electric green), editorial/magazine.',
    ]

    // ── 5 genuinely different advertising angles ──────────────────────────────
    // Each is a STORY with a specific narrative arc — not a production format.
    // The audience should feel these are 5 completely different ads, not 5 themes.
    const productPain  = understanding?.brand?.painPoints?.[0] || 'wasting time and money on slow, expensive creative'
    const productValue = understanding?.brand?.valueProposition || summary?.keyBenefit || 'saves time and produces better results'
    const audience     = understanding?.brand?.targetAudience || summary?.audience || 'marketers and business owners'

    const CONCEPT_ANGLES = [
      {
        title: 'The Expensive Alternative',
        angle: 'agency_replacement',
        narrative: 'Old way (agencies/manual) → the cost → this product replaces it entirely',
        direction: `Open on the COST of the old way — an agency invoice, a slow turnaround, wasted budget. The ${audience} is trapped paying for things that take forever and underdeliver. Then this product arrives and replaces the whole system. The transformation is about FREEDOM from dependency, not just faster output.
SCENE GUIDE:
Hook → An expensive invoice or slow process. The thing that costs money and time every month. NO product UI.
Problem → The frustration of waiting. The gap between what was paid and what was delivered. NO product UI.
Solution → This product doing in seconds what took weeks. THE ONLY SCENE WITH PRODUCT UI — use screenshotUrl.
Transformation → The person who no longer depends on anyone. Full creative control. Faster. Cheaper. NO product UI.
CTA → ${hasFounder ? 'Founder direct to camera: "Fire your agency."' : '"Why pay for what this does for free."'}`
      },
      {
        title: 'The Midnight Deadline',
        angle: 'urgency_speed',
        narrative: 'A campaign needed NOW → panic → product saves the day in real time',
        direction: `The entire story is about SPEED and PRESSURE. A campaign must go live in hours, not days. The audience feels the clock. They see the old way failing (no time). Then the product compresses time — idea to live campaign in the time it used to take to write a brief.
SCENE GUIDE:
Hook → DEADLINE PRESSURE. A clock, a blank calendar slot, a message saying "we need this NOW." NO product UI.
Problem → Traditional workflow: brief writers, agencies, review rounds — days turning into weeks. All impossibly slow. NO product UI.
Solution → This product running. Watch the campaign materializing in real time. THE ONLY SCENE WITH PRODUCT UI — use screenshotUrl.
Transformation → Campaign live. Numbers climbing. Done before the old way would have even started. NO product UI.
CTA → ${hasFounder ? 'Founder: "60 seconds. That\'s all it takes."' : '"Idea. 60 seconds. Live." Text on dark background.'}`
      },
      {
        title: 'The Founder at 3AM',
        angle: 'founder_burnout_rescue',
        narrative: 'Solo founder drowning in work → product gives them their life back',
        direction: `This concept speaks directly to the ${audience} who wears too many hats. The pain is OVERWHELM — too much to do, not enough hours, marketing eating all the time. The product doesn't just save time. It gives the founder back their creative confidence and their sanity.
SCENE GUIDE:
Hook → A person alone at a desk, late at night. Multiple screens. A pile of tasks. The weight of doing everything yourself. NO product UI.
Problem → ${productPain}. Visualized as stacks, clutter, chaos, an overflowing inbox. NO product UI.
Solution → The moment everything simplifies. One tool. THE ONLY SCENE WITH PRODUCT UI — use screenshotUrl.
Transformation → The same person. Now calm. Focused. Presenting results confidently to a client. Work done in hours, not days. NO product UI.
CTA → ${hasFounder ? 'Founder to camera: "I stopped drowning. This is why."' : '"Your creative team. Already hired."'}`
      },
      {
        title: 'Results First',
        angle: 'proof_reverse_reveal',
        narrative: 'Start with impressive outcome → reveal how it was done → anyone can replicate it',
        direction: `Reverse narrative. Open with the END RESULT — big numbers, successful campaign, winning output. Let the viewer wonder how it was done. Then reveal: one person, one tool. The product becomes aspirational because the RESULTS are shown first, not the features.
SCENE GUIDE:
Hook → IMPRESSIVE RESULTS. High engagement numbers, a campaign that performed, revenue impact. The viewer asks "how?". NO product UI.
Problem → Reveal what it USED to take to produce results like this — agencies, teams, weeks of work. NO product UI.
Solution → The reveal: this one tool. THE ONLY SCENE WITH PRODUCT UI — use screenshotUrl. The "ah-ha" moment.
Transformation → One person achieving what used to require a whole team. The democratization of great marketing. NO product UI.
CTA → ${hasFounder ? 'Founder: "This is how I did it. Your turn."' : '"Your turn." Clean. Simple. Direct.'}`
      },
      {
        title: 'The Category Has Moved',
        angle: 'category_leadership',
        narrative: 'The best marketers have already changed how they work — this is the new standard',
        direction: `Aspirational and slightly provocative. The serious players have already shifted to AI-powered creative. The old manual way is for people who haven't caught up yet. This product is what the top ${audience} use now. It positions the viewer to be a category leader, or risk being left behind.
SCENE GUIDE:
Hook → A CONTRAST. The confident, winning version of the target audience — premium environment, clarity, results. NO product UI.
Problem → What separates them from the rest? Not talent. Systems. The people still doing it manually are falling behind. NO product UI.
Solution → The tool that the best use. THE ONLY SCENE WITH PRODUCT UI — use screenshotUrl. This is their weapon.
Transformation → The viewer on the winning side. Same tools, same results. The category shift has happened. NO product UI.
CTA → ${hasFounder ? 'Founder: "This is the standard now. Are you using it?"' : '"This is marketing now."'}`
      },
    ]

    // Overlay intent-based production guidance on top of the story angle
    const intentGuide = intent === 'founder_ad' || intent === 'ugc'
      ? 'PRODUCTION NOTE: Founder is available. Prioritize heygen for Hook and CTA scenes where direct human connection matters most. Runway for all visual narrative scenes.'
      : intent === 'cinematic' || intent === 'product_demo'
      ? 'PRODUCTION NOTE: Cinematic intent. All scenes runway-generated. High production value. No heygen unless founder image provided.'
      : hasFounder
      ? 'PRODUCTION NOTE: Founder image available. Use heygen for Hook and/or CTA — the human touch increases conversion. Runway for all other scenes.'
      : 'PRODUCTION NOTE: No founder image. All scenes runway-generated. Rely on strong visuals and on-screen text.'

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

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCENE VISUAL LAWS — VIOLATING THESE PRODUCES A BROKEN AD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

An ad that shows dashboards in 4 out of 5 scenes is NOT an ad. It's a product tour.
Nobody watches product tours. People watch STORIES.

Rule: 4 of 5 scenes must show human situations, emotions, objects, environments.
Only 1 scene (Solution) is allowed to show the product UI.

━━ HOOK (Scene 1) — NO PRODUCT UI ━━
This scene makes the viewer feel something BEFORE they see the product.
Show a human moment in the PAIN. A real situation the audience recognizes.
Good: "A marketing manager's desk at midnight — laptop open, 11 browser tabs, invoice from agency, empty coffee cups"
Good: "Hands holding a printout covered in red revision marks — third round of changes"
Good: "A phone showing an email chain 40 messages long with an agency going in circles"
BAD: "Dashboard showing campaign metrics" ← this is UI. Not allowed in Hook.
BAD: "Software interface loading" ← this is UI. Not allowed in Hook.

━━ PROBLEM (Scene 2) — NO PRODUCT UI ━━
Visual metaphor for what the audience LOSES every day without this product.
Show the cost: money burning, time slipping, complexity multiplying.
Good: "A torn-up invoice, dollar bills scattered, a calendar with 'DEADLINE MISSED' stamped across it"
Good: "Six different browser tabs open simultaneously — each a different tool, none talking to each other"
Good: "A stack of papers labeled 'BRIEFS' — tall, unstable, threatening to fall"
BAD: "Analytics panel showing poor results" ← this is UI. Not allowed in Problem.

━━ SOLUTION (Scene 3) — THE ONLY SCENE WITH PRODUCT UI ━━
This is the one scene where the viewer sees ${productName}.
If screenshotUrl is available: USE IT. The real product is always better than a generated interpretation.
Show one specific capability transforming — not a static screenshot. A BEFORE → AFTER within the frame.
Good: "The PromptCEO dashboard — a blank brief on the left, five complete ad concepts appearing on the right"
Good: "Product interface: single text input at top, 25 storyboard frames populating below it in real time"

━━ TRANSFORMATION (Scene 4) — NO PRODUCT UI ━━
Show the human RESULT. The same person from Scene 1, now winning.
The product is invisible — only the outcome is visible.
Good: "Same desk from Hook, now clean. A single screen, one focused window. Confident posture."
Good: "Phone in hand showing campaign live and performing — engagement climbing"
Good: "A founder presenting a deck to a client who looks impressed — the story of the campaign told visually"
BAD: "Dashboard with green results" ← still UI. Show the PERSON who won, not the software they used.

━━ CTA (Scene 5) — MINIMAL UI ━━
Simple. Direct. One action. Human connection.
Best options: founder to camera (heygen) / logo on dark background / one line of text + URL
No complex software demos. The viewer has already seen the product in Scene 3.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DALL-E PROMPT RULES FOR EACH SCENE TYPE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
For Hook / Problem / Transformation / CTA:
→ Describe OBJECTS, ENVIRONMENTS, TEXTURES, LIGHTING, MOOD
→ NEVER describe a screen, dashboard, or software interface
→ "A desk strewn with papers, half-empty coffee cups, a phone face-down" ← correct
→ "A software dashboard showing analytics" ← WRONG — not allowed outside Solution

For Solution only:
→ Describe the product interface using actual brand colors and visual patterns
→ Show the TRANSFORMATION happening — input state and output state visible in the frame

No people, no faces in any dalle_prompt. No realistic human portraits.
Objects, environments, textures, light — these carry emotion without needing faces.

Key features: ${keyFeatures || 'see brief above'}
Visual identity: ${brandStyle || 'premium cinematic'}
${visualDNABlock}
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
    const screenshotUrlField = (hasProducts || hasScreenshots)
      ? `"REQUIRED for product/solution/transformation scenes: copy the exact URL from PRODUCT IMAGES or WEBSITE SCREENSHOTS above. null only for pure founder-speech or emotion-only scenes."`
      : 'null'

    const sceneTemplate = `{
  "id": "sN_M",
  "index": 0,
  "label": "Hook | Problem | Solution | Transformation | CTA",
  "type": "founder | product | lifestyle | pain_point | cta | transformation",
  "generator": "${hasFounder ? 'heygen | runway' : 'runway'}",
  "duration": 5,
  "script": "Exact words founder speaks (heygen only). null for runway.",
  "visual_scene": "CINEMATIC DESCRIPTION of exactly what fills the frame. For Hook/Problem/Transformation: a human situation, object, environment, or emotion — NOT software. For Solution: the product capability in action. For CTA: logo or founder. This field drives the dalle_prompt.",
  "emotion_target": "What the viewer feels watching this scene: stress | overwhelm | frustration | relief | excitement | confidence | aspiration | curiosity",
  "contains_ui": false,
  "visual_direction": "Director note for the cinematographer — built from visual_scene above.",
  "dalle_prompt": "Photorealistic still image. Vertical 9:16. Shot on RED camera. 8K. NO people. NO faces. IMPORTANT: for Hook/Problem/Transformation/CTA — describe objects, environments, textures, lighting, mood. NEVER describe a software dashboard outside of Solution scene. For Solution: describe the product interface using brand-accurate colors and UI patterns.",
  "shot": "extreme_close_up | close_up | medium_close_up | medium | wide | overhead",
  "brand_anchors": ["specific visual anchor tying scene to ${productName}", "anchor 2"],
  "brand_check": "How a viewer knows this is for ${productName} — not a competitor. For Hook/Problem: the emotional anchor. For Solution: the product UI.",
  "capability_anchor": "The specific named ${productName} capability this scene demonstrates — not 'dashboard', the ACTUAL action",
  "proof_of_capability": "[input state] → [transformation] → [output state] the viewer watches happen",
  "screenshotUrl": ${screenshotUrlField},
  "source_used": ["founder_image | product_image | uploaded_video | website_screenshot | user_prompt | brand_knowledge | jarvis_generated"],
  "assetAssignment": { "sourceType": "heygen | runway | product_image | video_footage | generated", "sourceIndex": null, "note": "Which user asset this scene builds on and why" }
}`

    // ── Generate one concept per call ─────────────────────────────────────────
    async function generateOneConcept(conceptIndex, angle) {
      const n           = conceptIndex + 1
      const visualStyle = VISUAL_STYLES[conceptIndex]
      const userContent = `${briefContext}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GENERATING CONCEPT ${n} OF 5: "${angle.title}"
ADVERTISING ANGLE: ${angle.angle}
NARRATIVE ARC: ${angle.narrative}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${angle.direction}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${intentGuide}
${!hasFounder ? '\nNO HEYGEN — no founder image uploaded. All scenes must use generator: "runway".' : ''}

MANDATORY VISUAL AESTHETIC FOR THIS CONCEPT — ${visualStyle.split(':')[0]}:
${visualStyle}
Every dalle_prompt in this concept must use THIS palette. Failure to do so makes the preview look identical to another concept.

PRE-WRITE CHECKLIST (answer each before writing JSON):
1. Hook visual_scene: What specific human moment shows the pain? (NOT a dashboard — a person/object/environment)
2. Problem visual_scene: What visual metaphor shows what the audience loses without ${productName}? (NOT a dashboard)
3. Solution visual_scene: What does the product ACTUALLY DO in this frame? (Only scene allowed to show UI — use screenshotUrl)
4. Transformation visual_scene: What does the person's world look like AFTER? (NOT a dashboard — the human result)
5. CTA visual_scene: What closes the story? (Founder to camera OR logo + text — minimal)

Generate exactly 5 scenes. Durations sum to 30 seconds.

Return ONLY this JSON (one concept object):
{
  "concept": {
    "id": "concept_${n}",
    "title": "${angle.title}",
    "logline": "Single punchy line capturing this specific angle",
    "angle": "${angle.angle}",
    "platform": "instagram_reels",
    "total_duration": 30,
    "scenes": [${sceneTemplate}]
  }
}`

      // Build vision content — Jarvis sees the actual brand images, not text descriptions of them
      const visionContent = [{ type: 'text', text: userContent }]

      if (assets?.founderImageUrl) {
        visionContent.push({ type: 'text', text: 'FOUNDER IMAGE (you can see this person — use their appearance for HeyGen scene direction):' })
        visionContent.push({ type: 'image_url', image_url: { url: assets.founderImageUrl, detail: 'high' } })
      }
      if (assets?.productImageUrls?.length) {
        visionContent.push({ type: 'text', text: `PRODUCT UI (${assets.productImageUrls.length} images — you can see the actual interface, colors, and design language):` })
        assets.productImageUrls.slice(0, 3).forEach(url => {
          visionContent.push({ type: 'image_url', image_url: { url, detail: 'high' } })
        })
      }
      if (brandScreenshots?.length) {
        visionContent.push({ type: 'text', text: 'WEBSITE SCREENSHOTS (you can see the live product site — extract colors, layout, visual identity):' })
        brandScreenshots.slice(0, 2).forEach(s => {
          visionContent.push({ type: 'image_url', image_url: { url: s.url, detail: 'low' } })
        })
      }
      if (videoFrameUrls?.length) {
        visionContent.push({ type: 'text', text: `VIDEO FRAMES (${videoFrameUrls.length} frames from uploaded video — you can see the footage content):` })
        videoFrameUrls.slice(0, 3).forEach(url => {
          visionContent.push({ type: 'image_url', image_url: { url, detail: 'low' } })
        })
      }

      const hasImages = visionContent.length > 1
      if (hasImages) {
        visionContent.push({
          type: 'text',
          text: 'You are now SEEING the actual brand assets above — not a description of them. When writing dalle_prompt fields, describe what you literally observe: the specific interface colors, UI elements, typography, and visual patterns. Do not invent or imagine a style. Describe what you see.',
        })
        console.log(`[storyboard] concept ${n} vision: ${visionContent.filter(c => c.type === 'image_url').length} images`)
      }

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user',   content: hasImages ? visionContent : userContent },
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

      // CRITICAL: enforce globally unique scene IDs — GPT often reuses s1_1..s1_5 across all concepts,
      // causing the frontend previews dict to overwrite earlier concepts with later ones.
      if (concept.scenes) {
        concept.scenes.forEach((scene, idx) => { scene.id = `c${n}_s${idx + 1}` })
      }

      // POST-PROCESSING: ensure real product images appear in product-facing scenes.
      // GPT sometimes writes good descriptions but forgets to paste the screenshotUrl.
      // We auto-assign here so the client always sees their real product in the preview.
      const productUrls    = assets?.productImageUrls || []
      const screenshotUrls = (brandScreenshots || []).map(s => s.url).filter(Boolean)
      const allRealUrls    = [...productUrls, ...screenshotUrls]

      if (allRealUrls.length > 0 && concept.scenes) {
        let urlIdx = 0
        concept.scenes.forEach(scene => {
          // Only auto-assign to runway (non-heygen) scenes without a screenshotUrl already set
          if (scene.generator !== 'heygen' && !scene.screenshotUrl) {
            const label = (scene.label || '').toLowerCase()
            // Solution and Transformation scenes should always show the real product
            if (label === 'solution' || label === 'transformation') {
              scene.screenshotUrl = allRealUrls[urlIdx % allRealUrls.length]
              urlIdx++
              console.log(`[storyboard] auto-assigned real image to ${scene.id} (${scene.label})`)
            }
          }
        })
      }

      console.log(`[storyboard] ✓ concept ${n}: "${concept.title}" (${concept.scenes?.length} scenes, ${data.usage?.completion_tokens} tokens)`)
      return concept
    }

    // Run all 5 in parallel
    const results = await Promise.allSettled(
      CONCEPT_ANGLES.map((angle, i) => generateOneConcept(i, angle))
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
