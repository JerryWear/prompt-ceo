import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// POST /api/photographer-brief
// Generates a real-world photographer shoot brief from Studio scenes.
// Cost: 2 credits

export async function POST(req) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name)              { return cookieStore.get(name)?.value },
          set(name, value, opts) { cookieStore.set({ name, value, ...opts }) },
          remove(name, opts)     { cookieStore.set({ name, value: '', ...opts }) },
        },
      }
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (!user || authError) {
      return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })
    }

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data: userRow } = await admin.from('app_users').select('credits').eq('id', user.id).single()
    if (!userRow || userRow.credits < 2) {
      return NextResponse.json({ status: 'error', message: 'Not enough credits — need 2' }, { status: 402 })
    }

    const { scenes, studioContext } = await req.json()
    if (!scenes?.length) {
      return NextResponse.json({ status: 'error', message: 'No scenes provided' }, { status: 400 })
    }

    const xaiApiKey = String(process.env.XAI_API_KEY || '')
      .replace(/^Bearer\s+/i, '').replace(/^"+|"+$/g, '').trim()

    const sceneList = scenes.slice(0, 20).map((s, i) =>
      `Shot ${i + 1}${s._shotZone ? ` (${s._shotZone})` : ''}: ${s.finalPrompt || ''}`
    ).join('\n')

    const userPrompt = `You are a professional photographer's creative director writing a practical shoot brief.

STUDIO CONTEXT:
World: ${studioContext?.worldId?.replace(/_/g, ' ') || 'not set'}
Director style: ${studioContext?.directorPreset || 'none'}
Character: ${studioContext?.identityName || 'not specified'}
${studioContext?.ageRange !== 'auto' ? `Age: ${studioContext.ageRange}` : ''}
Total scenes: ${scenes.length}

AI-GENERATED SCENE PROMPTS:
${sceneList}

Translate these AI prompts into a practical photographer brief for a real shoot.
Focus on what a real photographer, stylist, and model need to know.

Return ONLY valid JSON (no markdown):
{
  "briefTitle": "Shoot Brief — [descriptive name]",
  "shootDate": "Flexible / [suggest day type]",
  "duration": "estimated shoot duration",
  "crew": ["photographer", "stylist if needed", "other crew"],
  "character": {
    "description": "who the model should embody",
    "wardrobe": ["outfit 1", "outfit 2", "outfit 3"],
    "hair": "hair direction",
    "makeup": "makeup direction",
    "energy": "how the model should carry themselves"
  },
  "location": {
    "type": "location type — studio/practical/outdoor",
    "requirements": ["requirement 1", "requirement 2"],
    "alternatives": "backup location option"
  },
  "lighting": {
    "style": "overall lighting approach",
    "keyLight": "key light setup",
    "mood": "lighting mood and color temperature"
  },
  "shotList": [
    {
      "shotNumber": 1,
      "zone": "establishing",
      "description": "practical description of what to capture",
      "angle": "camera angle and lens",
      "direction": "specific direction to give model/team",
      "ref": "mood reference — a film, photographer, or aesthetic"
    }
  ],
  "directorNotes": "overall creative vision for the shoot — one paragraph",
  "deliverables": ["file format", "minimum selects", "editing style"]
}`

    const aiRes = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${xaiApiKey}` },
      body: JSON.stringify({
        model:      'grok-3-fast',
        messages: [
          { role: 'system', content: 'You are a creative director writing shoot briefs. Respond with ONLY valid JSON. No markdown. Start with {.' },
          { role: 'user',   content: userPrompt },
        ],
        temperature: 0.6,
        max_tokens:  2000,
      }),
    })

    const aiData = await aiRes.json()
    if (!aiRes.ok) {
      return NextResponse.json({ status: 'error', message: aiData?.error?.message || 'AI failed' }, { status: 500 })
    }

    const rawText = aiData?.choices?.[0]?.message?.content || ''
    let parsed = null
    const tryParse = (s) => { try { return JSON.parse(s) } catch { return null } }
    parsed = tryParse(rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim())
    if (!parsed) {
      const m = rawText.match(/\{[\s\S]*\}/)
      if (m) parsed = tryParse(m[0])
    }
    if (!parsed) {
      return NextResponse.json({ status: 'error', message: 'Could not parse brief' }, { status: 500 })
    }

    await admin.from('app_users').update({ credits: userRow.credits - 2 }).eq('id', user.id)

    return NextResponse.json({ status: 'success', brief: parsed, creditsRemaining: userRow.credits - 2 })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
