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

    const audience = understanding?.brand?.targetAudience || 'people looking for a better solution to their problem'
    const pain     = understanding?.brand?.painPoints?.[0] || 'the current approach is slow, expensive, or frustrating'
    const value    = understanding?.brand?.valueProposition || 'a faster, simpler way to get the result they want'
    if (!understanding?.brand?.targetAudience || !understanding?.brand?.painPoints?.[0] || !understanding?.brand?.valueProposition) {
      console.warn('[story] Using generic fallback(s) — understanding data incomplete:', {
        audienceFallback: !understanding?.brand?.targetAudience,
        painFallback:     !understanding?.brand?.painPoints?.[0],
        valueFallback:    !understanding?.brand?.valueProposition,
      })
    }
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
✓ Ground every prompt in the actual brand context — the industry, the protagonist's world, the specific emotion of this beat. A fitness coach, a restaurant owner, and a logistics manager each live in a different physical world. Show that world.
✓ Be specific to the scene: name the objects, environment, lighting, and body language that embody THIS brand's pain or transformation. Generic is wrong. "Person looking stressed at a desk" is generic. "A restaurant manager staring at a whiteboard covered in crossed-out staff schedules, 11pm, kitchen quiet behind her" is specific.
✓ Use the uploaded assets as your reference point. If a founder image was provided, their energy, age, and presence should shape Acts 1 and 5. If product images were provided, the visual aesthetic of the product should inform the world around the protagonist.

WRONG dalle_prompt (these will fail):
✗ "Dashboard showing campaign metrics" — software UI, won't render correctly
✗ "[Product name] interface loading" — the real product's screenshots are used for Acts 3 and 4, not DALL-E
✗ "Screen with text saying [result]" — DALL-E cannot render readable text accurately
✗ "AI platform generating [output]" — abstract concepts produce garbage; show people and environments instead
✗ Generic stock-photo scenes unrelated to this brand's world — every prompt must earn its specificity from the brand context provided

Acts 3 and 4: visual_type = "product_screenshot" → dalle_prompt = null. Always. No exceptions.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CAPTION RULES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Captions are TEXT OVERLAYS added in post-production. They are NEVER in the DALL-E image.
Keep captions to 3-8 words. Punchy. Direct. Specific to this brand.
Structure (replace every bracket with content specific to this brand — never copy these verbatim):
Act 1: "[Specific cost or time the target audience is losing right now]" — name a real number or real situation
Act 2: "[The gap between what they want and what they have]" — make it visceral, not abstract
Act 3: "[The product name or the single thing it does]" — short, declarative
Act 4: "[The measurable result this product produces]" — specific outcome, not a feature
Act 5: "[Action-led CTA with brand domain or core offer]" — direct, no hedging

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
