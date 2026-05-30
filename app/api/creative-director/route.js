import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { get: (n) => cookieStore.get(n)?.value, set() {}, remove() {} } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

const STYLE_VOICE = {
  luxury:                 ['premium', 'aspirational', 'luxury', 'high-end', 'exclusive'],
  cinematic:              ['cinematic', 'editorial', 'artistic', 'film', 'dramatic'],
  ugc:                    ['authentic', 'friendly', 'relatable', 'real', 'raw', 'natural'],
  emotional:              ['emotional', 'warm', 'human', 'heartfelt', 'empathetic'],
  viral:                  ['viral', 'bold', 'energetic', 'trend', 'hook', 'scroll-stopping'],
  dark_luxury:            ['premium', 'dark', 'luxury', 'high-fashion', 'moody', 'intense'],
  high_energy:            ['motivational', 'energetic', 'bold', 'powerful', 'hype', 'pump'],
  soft_feminine:          ['soft', 'feminine', 'gentle', 'authentic', 'pastel', 'delicate'],
  corporate_authority:    ['authoritative', 'professional', 'corporate', 'trust', 'credible'],
  fitness_motivation:     ['motivational', 'athletic', 'transformative', 'strong', 'results'],
  high_status:            ['premium', 'status', 'aspirational', 'elite', 'success'],
  aspirational_lifestyle: ['aspirational', 'lifestyle', 'freedom', 'dream', 'travel', 'adventure'],
}

const VISUAL_PACING = {
  fast_cut:     'High energy, rapid transitions — attention and retargeting phases',
  cinematic:    'Slow, deliberate, wide shots — luxury and aspirational styles',
  tension:      'Building suspense, tight frames — desire escalation and emotional styles',
  story_driven: 'Linear narrative flow — authentic UGC and conversion phases',
}

const STYLE_PACING_MAP = {
  luxury: 'cinematic', cinematic: 'cinematic', dark_luxury: 'tension',
  emotional: 'tension', ugc: 'story_driven', soft_feminine: 'story_driven',
  corporate_authority: 'story_driven', viral: 'fast_cut', high_energy: 'fast_cut',
  fitness_motivation: 'fast_cut', aspirational_lifestyle: 'cinematic', high_status: 'cinematic',
}

const PLATFORM_GOAL = {
  instagram: 'Visual storytelling, premium, aspirational',
  tiktok: 'Short-form viral, high energy, trend-driven',
  meta: 'Lead generation, direct response, benefit-driven',
  youtube: 'Long-form storytelling, educational, authority',
}

export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { instruction, currentConfig } = await req.json()
    if (!instruction?.trim()) return NextResponse.json({ error: 'instruction is required' }, { status: 400 })

    const systemPrompt = `You are a Creative Director AI for a social media ad studio.
Your job is to interpret a natural language creative instruction and map it to a structured config delta.

Available styles and their voice associations:
${Object.entries(STYLE_VOICE).map(([s, v]) => `- ${s}: ${v.join(', ')}`).join('\n')}

Available visual pacing options:
${Object.entries(VISUAL_PACING).map(([p, d]) => `- ${p}: ${d}`).join('\n')}

Available platforms:
${Object.entries(PLATFORM_GOAL).map(([p, d]) => `- ${p}: ${d}`).join('\n')}

Current config: ${JSON.stringify(currentConfig || {})}

Respond ONLY with valid JSON in this exact format:
{
  "style": "<style key or null if no change>",
  "visualPacing": "<pacing key or null if no change>",
  "platform": "<platform key or null if no change>",
  "hookType": "<pain|desire|curiosity|transformation|viral or null if no change>",
  "explanation": "<1-2 sentences explaining what you changed and why, in plain English>"
}

Rules:
- Only include fields that the instruction clearly implies changing
- Use null for fields the instruction doesn't address
- If style is set and visualPacing is not explicitly mentioned, derive visualPacing from the style using: luxury->cinematic, dark_luxury->tension, emotional->tension, ugc->story_driven, soft_feminine->story_driven, corporate_authority->story_driven, viral->fast_cut, high_energy->fast_cut, fitness_motivation->fast_cut, aspirational_lifestyle->cinematic, high_status->cinematic, cinematic->cinematic
- explanation must be human-readable, no jargon`

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.XAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'grok-3-fast',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: instruction },
        ],
        temperature: 0.3,
        max_tokens: 300,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      throw new Error(`xAI error: ${err}`)
    }

    const data = await response.json()
    const raw = data.choices?.[0]?.message?.content?.trim() || '{}'

    let delta
    try {
      delta = JSON.parse(raw)
    } catch {
      const match = raw.match(/\{[\s\S]*\}/)
      delta = match ? JSON.parse(match[0]) : { explanation: 'Could not parse response. Try rephrasing your instruction.' }
    }

    const cleanDelta = Object.fromEntries(
      Object.entries(delta).filter(([k, v]) => v !== null && k !== 'explanation')
    )

    return NextResponse.json({ delta: cleanDelta, explanation: delta.explanation || '' })
  } catch (err) {
    console.error('creative-director error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
