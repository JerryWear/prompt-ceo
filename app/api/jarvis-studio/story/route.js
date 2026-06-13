import { NextResponse }       from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies }            from 'next/headers'

export const maxDuration = 120

async function makeSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
}

// POST /api/jarvis-studio/story
// Input:  { understanding, assets, assessment, intent, prompt }
// Output: { story: { hero, pain, goal, solution, transformation, outcome, beats[5] } }
export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { understanding, assets, assessment, intent, prompt } = await req.json()
    if (!understanding) return NextResponse.json({ error: 'understanding required' }, { status: 400 })

    const productName = (
      understanding?.brand?.name ||
      understanding?.products?.names?.[0] ||
      'this product'
    ).split(/[—.\n]/)[0].trim().slice(0, 60)

    const audience = understanding?.brand?.targetAudience || 'marketers and business owners'
    const pain     = understanding?.brand?.painPoints?.[0] || 'wasting time on slow, expensive processes'
    const value    = understanding?.brand?.valueProposition || 'saves time and produces better results'
    const hasFounder = !!assets?.founderImageUrl
    const hasProduct = (assets?.productImageUrls?.length || 0) > 0

    const systemPrompt = `You are the Creative Director at an elite advertising agency.
You write STORIES for 30-second short-form video ads (Instagram Reels, TikTok, YouTube Shorts).

CORE PHILOSOPHY:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
An advertisement is a short movie about a customer's transformation.
The CUSTOMER is the hero.
The PRODUCT is the force that creates change.
A dashboard is not a story. A logo is not a story. Emotion is a story.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

THE 5 ACT STRUCTURE (30 seconds, ~6 seconds each):

Act 1 — SETUP        → visual_type: "cinematic"          → The hero in their current painful world
Act 2 — CONFLICT     → visual_type: "cinematic"          → The problem embodied, made visceral
Act 3 — DISCOVERY    → visual_type: "product_screenshot" → First contact with the solution (REAL product only)
Act 4 — TRANSFORMATION→ visual_type: "product_screenshot"→ The solution working (REAL product only)
Act 5 — RESOLUTION   → visual_type: "cinematic"          → The hero's transformed life

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ABSOLUTE RULES FOR DALL-E PROMPTS (Acts 1, 2, 5 ONLY):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DALL-E CAN render: people, faces, hands, bodies, offices, desks, cities, nature, objects, textures, lighting, emotion, clothing, food, cars, architecture — anything physical and real.

DALL-E CANNOT render: software UI, app screens, dashboards, readable text, brand logos, marketing copy, accurate interfaces.

Asking DALL-E to show software produces hallucinated garbage. We have REAL screenshots for that. Use them (Acts 3 and 4).

CORRECT dalle_prompt:
✓ "A startup founder at a cluttered desk, 2am, holding an agency invoice with red revision marks. Empty coffee cups. A single desk lamp. Exhausted expression. Vertical 9:16. Cinematic photography. Shot on ARRI. No readable text anywhere."
✓ "An overhead view of a desk covered in sticky notes, crossed-out notebook pages, three different laptops, empty takeaway cups. No person visible — only the evidence of too much work. Vertical 9:16 format. No readable text."
✓ "Same founder now at a clean minimal desk. Single laptop open, screen too blurred to read. Confident posture. Morning light through window. Relaxed. In control. Vertical 9:16. Cinematic. No readable text."

WRONG dalle_prompt (these will fail):
✗ "Dashboard showing campaign metrics" — software, won't look right
✗ "PromptCEO interface loading" — our real product exists, use it
✗ "Screen with text saying Campaign Ready" — DALL-E can't render text
✗ "AI platform generating ads" — abstract concept, produces garbage

Acts 3 and 4: visual_type = "product_screenshot" → dalle_prompt = null. Always. No exceptions.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CAPTION RULES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Captions are TEXT OVERLAYS added in post-production. They are NEVER in the DALL-E image.
Keep captions to 3-8 words. Punchy. Direct. Specific to this brand.
Examples:
Act 1: "Still paying $8,500 per campaign?" / "The agency takes 3 weeks." / "43 browser tabs. One campaign."
Act 2: "You have the ideas. Not the time." / "3 tools. 4 agencies. 0 results."
Act 3: Product name only — "PromptCEO" / "One brief." / "Enter your product."
Act 4: The result — "Campaign done in 60 seconds." / "Five complete ads. One input."
Act 5: CTA — "Start free today." / "Fire your agency. → promptceo.com"

Also generate a voiceScript field at the top level: a 75-word maximum voiceover narration for a 30-second video ad that follows the 5-act story arc. Write in second person, present tense. Punchy, cinematic, no filler words. Start with the hook.

Return only valid JSON.`

    const userContent = `Product: ${productName}
Audience: ${audience}
Pain point: ${pain}
Value proposition: ${value}
Ad intent: ${intent || 'cinematic commercial'}
Additional context: ${prompt || 'none'}
Assessment: ${assessment ? JSON.stringify(assessment).slice(0, 600) : 'none'}

Assets available:
${hasFounder ? '✓ Founder image — reference their presence/energy in Acts 1 and 5 dalle_prompt' : '✗ No founder — describe a generic but specific-feeling protagonist'}
${hasProduct ? '✓ Real product screenshots — Acts 3 and 4 will use these automatically. Write dalle_prompt = null for those acts.' : '✗ No product screenshots — Acts 3 and 4 will use a UI placeholder. Still write dalle_prompt = null for those acts.'}

Generate the complete ad story for ${productName}.

Return this exact JSON:
{
  "story": {
    "hero": "One precise sentence: who is this person, what do they do, what situation are they in right now",
    "pain": "The specific thing they lose — time, money, energy, opportunity — before this product exists",
    "goal": "What they actually want to achieve (outcome, not feature)",
    "solution": "How ${productName} specifically creates the change — one concrete mechanism",
    "transformation": "The concrete before/after: what changed in their actual life or work",
    "outcome": "The measurable result — what they now have that they didn't before",
    "beats": [
      {
        "act": 1,
        "label": "Setup",
        "title": "3-5 word evocative title",
        "emotional_beat": "Precise emotion: what the viewer FEELS in this 5-second moment. One sentence.",
        "visual_type": "cinematic",
        "caption": "3-8 word hook overlay",
        "dalle_prompt": "Full cinematic description. People and environments only. NO software, NO UI, NO readable text. Vertical 9:16. Photorealistic. Shot on ARRI or RED camera."
      },
      {
        "act": 2,
        "label": "Conflict",
        "title": "3-5 word evocative title",
        "emotional_beat": "Precise emotion the viewer feels. One sentence.",
        "visual_type": "cinematic",
        "caption": "3-8 word overlay",
        "dalle_prompt": "Full cinematic description. Objects/environments that embody the problem. NO software, NO UI, NO readable text. Vertical 9:16. Photorealistic."
      },
      {
        "act": 3,
        "label": "Discovery",
        "title": "3-5 word evocative title",
        "emotional_beat": "Relief. Curiosity. Something is different here.",
        "visual_type": "product_screenshot",
        "caption": "1-4 words — product name or core capability",
        "dalle_prompt": null
      },
      {
        "act": 4,
        "label": "Transformation",
        "title": "3-5 word evocative title",
        "emotional_beat": "Excitement. Awe. Watching it actually work.",
        "visual_type": "product_screenshot",
        "caption": "3-7 words — the result happening",
        "dalle_prompt": null
      },
      {
        "act": 5,
        "label": "Resolution",
        "title": "3-5 word evocative title",
        "emotional_beat": "Confidence. Aspiration. This is the new reality.",
        "visual_type": "cinematic",
        "caption": "CTA — 3-7 words with action",
        "dalle_prompt": "Full cinematic description of the hero's transformed world. Confident, successful, in control. NO software, NO UI, NO readable text. Vertical 9:16. Photorealistic."
      }
    ]
  },
  "voiceScript": "75-word max voiceover for the 30-second ad. Second person, present tense. Punchy, cinematic. Start with the hook. No filler words."
}`

    const visionContent = [{ type: 'text', text: userContent }]
    if (assets?.founderImageUrl) {
      visionContent.push({ type: 'text', text: 'FOUNDER IMAGE — reference this person\'s energy and style in Acts 1 and 5 dalle_prompt descriptions:' })
      visionContent.push({ type: 'image_url', image_url: { url: assets.founderImageUrl, detail: 'low' } })
    }
    if (assets?.productImageUrls?.[0]) {
      visionContent.push({ type: 'text', text: 'PRODUCT SCREENSHOT — this is what Acts 3 and 4 will show. Reference it in emotional_beat only. dalle_prompt must be null for those acts:' })
      visionContent.push({ type: 'image_url', image_url: { url: assets.productImageUrls[0], detail: 'low' } })
    }
    const hasImages = visionContent.length > 1

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model:           'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user',   content: hasImages ? visionContent : userContent },
        ],
        temperature:     0.8,
        response_format: { type: 'json_object' },
        max_tokens:      2500,
      }),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error?.message || `OpenAI error (${res.status})`)

    let parsed
    try { parsed = JSON.parse(data.choices[0].message.content) }
    catch { throw new Error('Story generation returned invalid JSON') }

    const story = parsed.story
    if (!story?.beats?.length) throw new Error('No story beats returned')

    // Hard-enforce visual_type rules regardless of what GPT returned
    story.beats.forEach(beat => {
      if (beat.act === 3 || beat.act === 4) {
        beat.visual_type  = 'product_screenshot'
        beat.dalle_prompt = null
      } else {
        beat.visual_type = 'cinematic'
        if (!beat.dalle_prompt) beat.dalle_prompt = `Cinematic vertical portrait. ${beat.emotional_beat || ''} No readable text. 9:16.`
      }
    })

    const voiceScript = (parsed.voiceScript || '').trim() || null
    if (voiceScript) console.log(`[story] ✓ voiceScript (${voiceScript.split(' ').length} words)`)
    console.log(`[story] ✓ "${productName}" — hero: "${story.hero?.slice(0, 60)}"`)
    return NextResponse.json({ status: 'success', story, voiceScript })

  } catch (err) {
    console.error('[story] error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
