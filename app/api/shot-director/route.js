import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { buildShotDirectorPrompt } from '../../prompt-engine-v3/studio/studioIntelligence.js'

// POST /api/shot-director
// Gives a creative director note on a generated scene prompt.
// No credit cost — part of the core generation experience.

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

    const { finalPrompt, context } = await req.json()
    if (!finalPrompt?.trim()) {
      return NextResponse.json({ status: 'error', message: 'Scene prompt required' }, { status: 400 })
    }

    const xaiApiKey = String(process.env.XAI_API_KEY || '')
      .replace(/^Bearer\s+/i, '').replace(/^"+|"+$/g, '').trim()

    const userPrompt = buildShotDirectorPrompt(finalPrompt, context || {})

    const aiRes = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${xaiApiKey}` },
      body: JSON.stringify({
        model:      'grok-3-fast',
        messages: [
          { role: 'system', content: 'You are a senior cinematographer. Respond with ONLY valid JSON. No markdown. Start with {.' },
          { role: 'user',   content: userPrompt },
        ],
        temperature: 0.6,
        max_tokens:  400,
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
      return NextResponse.json({ status: 'error', message: 'Could not parse director note' }, { status: 500 })
    }

    return NextResponse.json({ status: 'success', note: parsed })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
