import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { buildCalendarPrompt } from '../../prompt-engine-v3/ad-system/contentCalendar.js'

// POST /api/content-calendar
// Generates a 30-day content calendar with daily hooks, captions, and creative direction.
// Cost: 5 credits

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
    if (!userRow || userRow.credits < 5) {
      return NextResponse.json({ status: 'error', message: 'Not enough credits — need 5' }, { status: 402 })
    }

    const { adConfig, durationDays = 30 } = await req.json()
    if (!adConfig?.productName) {
      return NextResponse.json({ status: 'error', message: 'Product name required' }, { status: 400 })
    }

    const xaiApiKey = String(process.env.XAI_API_KEY || '')
      .replace(/^Bearer\s+/i, '').replace(/^"+|"+$/g, '').trim()

    const userPrompt = buildCalendarPrompt(adConfig, durationDays)

    const aiRes = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${xaiApiKey}` },
      body: JSON.stringify({
        model:       'grok-3-fast',
        messages: [
          { role: 'system', content: 'You are a world-class content strategist. Respond with ONLY valid JSON. No markdown. No preamble. Start with [.' },
          { role: 'user',   content: userPrompt },
        ],
        temperature: 0.8,
        max_tokens:  4000,
      }),
    })

    const aiData = await aiRes.json()
    if (!aiRes.ok) {
      return NextResponse.json({ status: 'error', message: aiData?.error?.message || 'AI failed' }, { status: 500 })
    }

    const rawText = aiData?.choices?.[0]?.message?.content || ''
    let parsed = null
    const tryParse = (s) => { try { return JSON.parse(s) } catch { return null } }

    const stripped = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim()
    parsed = tryParse(stripped)

    if (!parsed) {
      const first = stripped.indexOf('[')
      const last  = stripped.lastIndexOf(']')
      if (first !== -1 && last > first) parsed = tryParse(stripped.slice(first, last + 1))
    }

    if (!parsed) {
      return NextResponse.json({ status: 'error', message: 'Could not parse calendar' }, { status: 500 })
    }

    await admin.from('app_users').update({ credits: userRow.credits - 5 }).eq('id', user.id)

    return NextResponse.json({ status: 'success', calendar: parsed, creditsRemaining: userRow.credits - 5 })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
