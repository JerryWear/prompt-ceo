import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { buildFatiguePrompt } from '../../prompt-engine-v3/ad-system/creativeDirector.js'

// POST /api/ad-fatigue
// Detects repetition, overuse patterns, and missing angles across all outputs.
// Cost: 1 credit

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
    if (!userRow || userRow.credits < 1) {
      return NextResponse.json({ status: 'error', message: 'Not enough credits — need 1' }, { status: 402 })
    }

    const { outputs, adConfig } = await req.json()
    if (!outputs || !adConfig?.productName) {
      return NextResponse.json({ status: 'error', message: 'outputs and productName required' }, { status: 400 })
    }

    const xaiApiKey = String(process.env.XAI_API_KEY || '')
      .replace(/^Bearer\s+/i, '').replace(/^"+|"+$/g, '').trim()

    const userPrompt = buildFatiguePrompt(outputs, adConfig)

    const aiRes = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${xaiApiKey}` },
      body: JSON.stringify({
        model:       'grok-3-fast',
        messages: [
          { role: 'system', content: 'You are a creative director auditing for ad fatigue. Respond with ONLY valid JSON. No markdown. Start with {.' },
          { role: 'user',   content: userPrompt },
        ],
        temperature: 0.3,
        max_tokens:  800,
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
      return NextResponse.json({ status: 'error', message: 'Could not parse fatigue report' }, { status: 500 })
    }

    await admin.from('app_users').update({ credits: userRow.credits - 1 }).eq('id', user.id)

    return NextResponse.json({ status: 'success', report: parsed, creditsRemaining: userRow.credits - 1 })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
