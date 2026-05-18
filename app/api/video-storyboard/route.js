import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { buildStoryboardPrompt } from '../../prompt-engine-v3/ad-system/videoStoryboard.js'

// POST /api/video-storyboard
// Generates a shot-by-shot production storyboard for a video ad.
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

    const { videoPrompt, adConfig, adDuration = 30 } = await req.json()
    if (!videoPrompt || !adConfig?.productName) {
      return NextResponse.json({ status: 'error', message: 'videoPrompt and productName required' }, { status: 400 })
    }

    const xaiApiKey = String(process.env.XAI_API_KEY || '')
      .replace(/^Bearer\s+/i, '').replace(/^"+|"+$/g, '').trim()

    const userPrompt = buildStoryboardPrompt(videoPrompt, adConfig, adDuration)

    const aiRes = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${xaiApiKey}` },
      body: JSON.stringify({
        model:       'grok-3-fast',
        messages: [
          { role: 'system', content: 'You are a senior video director. Respond with ONLY valid JSON. No markdown. No preamble. Start with {.' },
          { role: 'user',   content: userPrompt },
        ],
        temperature: 0.75,
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
      const firstBrace = rawText.indexOf('{')
      const lastBrace  = rawText.lastIndexOf('}')
      if (firstBrace !== -1 && lastBrace > firstBrace) parsed = tryParse(rawText.slice(firstBrace, lastBrace + 1))
    }
    if (!parsed) {
      return NextResponse.json({ status: 'error', message: 'Could not parse storyboard' }, { status: 500 })
    }

    await admin.from('app_users').update({ credits: userRow.credits - 2 }).eq('id', user.id)

    return NextResponse.json({ status: 'success', storyboard: parsed, creditsRemaining: userRow.credits - 2 })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
