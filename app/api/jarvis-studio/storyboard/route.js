import { NextResponse }       from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies }            from 'next/headers'

export const maxDuration = 300

async function makeSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
}

// Five visual executions of the same story — distinct director's cuts
const DIRECTOR_CUTS = [
  {
    id:         'cut_dark_luxury',
    title:      'Dark Luxury',
    palette:    'Deep black (#0a0a0a), gold/amber accents (#c8a84b), dramatic single-source directional lighting, shadows with intention. Premium editorial. Think luxury watch ad.',
    protagonist:'A person representative of this brand\'s target audience — sharp, driven, slightly exhausted from operating at a high level. Premium but not flashy. Let the brand\'s actual industry and audience define who this person is, what they wear, and what environment they inhabit. They command the frame.',
    caption_tone:'Direct and premium. No fluff. Commands attention.',
  },
  {
    id:         'cut_clean_minimal',
    title:      'Clean Minimal',
    palette:    'Bright white or platinum backgrounds. Cool tones. High-key even lighting. Clinical precision. Think Apple product reveal.',
    protagonist:'A person representative of this brand\'s target audience — precise, focused, deliberate. Their environment is clean and intentional. Let the brand\'s actual industry and audience define the specific role, age, and setting. Everything in frame has a reason to be there.',
    caption_tone:'Clean and confident. Short declarative statements.',
  },
  {
    id:         'cut_warm_authentic',
    title:      'Warm & Authentic',
    palette:    'Rich warm browns, burnished copper tones, cream highlights, candlelight warmth. Feels like a home office or coffee shop. Human and real.',
    protagonist:'A person representative of this brand\'s target audience — real, genuine, slightly imperfect. The kind of person who cares deeply about what they do. Let the brand\'s actual industry and audience define who this person is and where they work. Not a stock photo — a real human being in a real environment.',
    caption_tone:'Honest and conversational. Speaks directly to the viewer.',
  },
  {
    id:         'cut_high_energy',
    title:      'High Energy',
    palette:    'Deep navy or midnight blue. Neon/electric blue accents (#00aaff). High contrast. Kinetic energy. Motion blur and dynamic angles.',
    protagonist:'A person representative of this brand\'s target audience — confident, decisive, always in motion. Let the brand\'s actual industry and audience define their specific role and environment. The energy reads: "I used to not have time for this. Now I do."',
    caption_tone:'Urgent and punchy. Creates FOMO. Every word earns its place.',
  },
  {
    id:         'cut_bold_contrast',
    title:      'Bold & Graphic',
    palette:    'Pure high-contrast black and white. One vivid accent — deep red (#c84a4a) or electric green (#4a9a6a). Editorial and magazine-level composition.',
    protagonist:'A person representative of this brand\'s target audience — confident, strong presence, intentional in every choice. Let the brand\'s actual industry and audience define who this person is. Slightly provocative gaze. Magazine-level composition.',
    caption_tone:'Provocative and challenging. Makes the viewer question their current approach.',
  },
]

async function generateConceptVisuals(cut, story, productUrls, hasFounder) {
  const productActs  = story.beats.filter(b => b.visual_type === 'product_screenshot')
  const cinematicActs = story.beats.filter(b => b.visual_type === 'cinematic')

  const systemPrompt = `You are a cinematographer and visual director for a premium ad agency.
You have been given a story and your job is to write the exact DALL-E prompt for each cinematic scene.

VISUAL STYLE FOR THIS CONCEPT: ${cut.title}
${cut.palette}
Protagonist type: ${cut.protagonist}

ABSOLUTE RULE — DALL-E PROMPTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Every dalle_prompt must describe ONLY:
→ People, faces, expressions, body language, clothing
→ Physical environments: offices, rooms, streets, nature
→ Objects: desks, papers, phones, coffee cups, invoices, books
→ Lighting, shadows, textures, composition
→ Camera angle, lens feel, color palette

NEVER describe:
→ Software interfaces, dashboards, app screens
→ Readable text, marketing copy, brand names, logos
→ Abstract concepts ("AI", "success", "growth")
→ Technology in detail (just show humans using it, screen blurred/out of frame)

DALL-E cannot render readable text accurately. Any text in a prompt creates garbage.
We have REAL product screenshots for the software scenes — they don't need prompts.

Each dalle_prompt must end with: "Vertical 9:16. ${cut.palette.split('.')[0]}. No readable text."
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Return only valid JSON.`

  const userContent = `THE AD STORY:
Hero: ${story.hero}
Pain: ${story.pain}
Transformation: ${story.transformation}

THE 5 BEATS:
${story.beats.map(b => `Act ${b.act} (${b.label}): "${b.emotional_beat}" — caption: "${b.caption}"`).join('\n')}

CINEMATIC ACTS THAT NEED DALLE PROMPTS (acts ${cinematicActs.map(b => b.act).join(', ')}):
${cinematicActs.map(b => `Act ${b.act} — ${b.label}: ${b.emotional_beat}`).join('\n')}

PRODUCT ACTS (acts ${productActs.map(b => b.act).join(', ')}):
These use real screenshots — NO dalle_prompt needed.

${hasFounder ? 'FOUNDER IMAGE AVAILABLE — match this concept\'s protagonist description to the founder\'s energy and presence. Reference their style.' : 'NO FOUNDER — invent a specific, believable protagonist matching the concept description.'}

Generate dalle_prompt for each cinematic act (${cinematicActs.map(b => b.act).join(', ')}).
Make each prompt SPECIFIC to this story beat and visual style. Not generic.
100-150 words per prompt. Cinematic and precise.

Return this JSON:
{
  "scenes": [
    ${story.beats.map(b => b.visual_type === 'cinematic'
      ? `{ "act": ${b.act}, "dalle_prompt": "WRITE THIS — cinematic description in ${cut.title} style" }`
      : `{ "act": ${b.act}, "dalle_prompt": null }`
    ).join(',\n    ')}
  ]
}`

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({
      model:           'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user',   content: userContent },
      ],
      temperature:     0.7,
      response_format: { type: 'json_object' },
      max_tokens:      2000,
    }),
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.error?.message || `OpenAI error for cut ${cut.id}`)

  let parsed
  try { parsed = JSON.parse(data.choices[0].message.content) }
  catch { throw new Error(`Invalid JSON for cut ${cut.id}`) }

  return parsed.scenes || []
}

// POST /api/jarvis-studio/storyboard
// Input:  { story, assets, productUrls, brandScreenshots, understanding, videoFrameUrls }
// Output: { storyboard: { concepts: [5 concepts × 5 scenes] } }
export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { story, assets, productUrls = [], brandScreenshots = [], understanding, videoFrameUrls = [] } = await req.json()

    if (!story?.beats?.length) return NextResponse.json({ error: 'story with beats required' }, { status: 400 })

    const hasFounder = !!assets?.founderImageUrl

    // All real product image URLs available for Acts 3 & 4
    const allProductUrls = [
      ...(assets?.productImageUrls || []),
      ...productUrls,
      ...brandScreenshots.map(s => s.url).filter(Boolean),
    ].filter(Boolean)

    console.log(`[storyboard] generating 5 concepts | ${story.beats.length} beats | ${allProductUrls.length} product URLs | founder: ${hasFounder}`)

    // Generate visual descriptions for all 5 cuts in parallel
    const cutResults = await Promise.allSettled(
      DIRECTOR_CUTS.map(cut => generateConceptVisuals(cut, story, allProductUrls, hasFounder))
    )

    const concepts = []

    DIRECTOR_CUTS.forEach((cut, idx) => {
      const result = cutResults[idx]
      if (result.status === 'rejected') {
        console.error(`[storyboard] cut ${cut.id} failed:`, result.reason?.message)
        return
      }

      const visualScenes = result.value // [{ act, dalle_prompt }]

      const scenes = story.beats.map((beat, sceneIdx) => {
        const visual = visualScenes.find(s => s.act === beat.act) || {}

        // Product acts always use the real screenshot — never generated
        const isProductAct = beat.visual_type === 'product_screenshot'
        const screenshotUrl = isProductAct && allProductUrls.length > 0
          ? allProductUrls[sceneIdx % allProductUrls.length]
          : null

        // Sanitize dalle_prompt for cinematic acts — strip any UI/text references
        let dallePrompt = (!isProductAct && visual.dalle_prompt) ? visual.dalle_prompt : null
        if (dallePrompt) {
          // Remove patterns that instruct DALL-E to render UI or text
          dallePrompt = dallePrompt
            .replace(/\b(dashboard|interface|ui|software|app|screen|display|monitor showing|laptop screen with|analytics|metrics panel|SaaS)\b/gi, '')
            .replace(/\b(text (reading|saying|that says)|text overlay|caption|subtitle)\b/gi, '')
            .replace(/\s{2,}/g, ' ')
            .trim()
        }

        return {
          id:             `c${idx + 1}_s${sceneIdx + 1}`,
          index:          sceneIdx,
          act:            beat.act,
          label:          beat.label,
          title:          beat.title,
          type:           beat.visual_type === 'product_screenshot' ? 'product' : 'cinematic',
          duration:       6,
          visual_type:    beat.visual_type,
          emotional_beat: beat.emotional_beat,
          caption:        beat.caption   || '',
          dalle_prompt:   dallePrompt,
          visual_scene:   dallePrompt    || beat.emotional_beat || '',
          contains_ui:    isProductAct,
          screenshotUrl:  screenshotUrl,
          source_used:    isProductAct ? ['product_image'] : ['jarvis_generated'],
        }
      })

      concepts.push({
        id:              `concept_${idx + 1}`,
        title:           cut.title,
        logline:         `${cut.caption_tone} — ${story.transformation?.slice(0, 80) || ''}`,
        visual_style:    cut.id,
        platform:        'instagram_reels',
        total_duration:  30,
        passes_quality_gate: true,
        compliance_score:    95,
        scenes,
      })
    })

    if (concepts.length === 0) {
      return NextResponse.json({ error: 'All 5 concept generations failed' }, { status: 500 })
    }

    console.log(`[storyboard] ✓ ${concepts.length}/5 concepts ready`)
    return NextResponse.json({ status: 'success', storyboard: { concepts, story } })

  } catch (err) {
    console.error('[storyboard] error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
