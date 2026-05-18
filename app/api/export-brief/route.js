import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import {
  buildCampaignBriefPrompt,
  buildCreatorBriefPrompt,
  buildMediaBuyerBriefPrompt,
} from '../../prompt-engine-v3/ad-system/exportBriefs.js'

// POST /api/export-brief
// Generates a professional brief document: campaign | creator | media_buyer
// Cost: 2 credits

const BUILDERS = {
  campaign:    buildCampaignBriefPrompt,
  creator:     buildCreatorBriefPrompt,
  media_buyer: buildMediaBuyerBriefPrompt,
}

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

    const { briefType, adConfig, outputs } = await req.json()
    const builder = BUILDERS[briefType]
    if (!builder) {
      return NextResponse.json({ status: 'error', message: `Unknown brief type: ${briefType}` }, { status: 400 })
    }
    if (!adConfig?.productName) {
      return NextResponse.json({ status: 'error', message: 'Product name required' }, { status: 400 })
    }

    const xaiApiKey = String(process.env.XAI_API_KEY || '')
      .replace(/^Bearer\s+/i, '').replace(/^"+|"+$/g, '').trim()

    const userPrompt = builder(adConfig, outputs || {})

    const aiRes = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${xaiApiKey}` },
      body: JSON.stringify({
        model:       'grok-3-fast',
        messages: [
          { role: 'system', content: 'You are a senior agency professional. Respond with ONLY valid JSON. No markdown. Start with {.' },
          { role: 'user',   content: userPrompt },
        ],
        temperature: 0.6,
        max_tokens:  1800,
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
      return NextResponse.json({ status: 'error', message: 'Could not parse brief' }, { status: 500 })
    }

    await admin.from('app_users').update({ credits: userRow.credits - 2 }).eq('id', user.id)

    return NextResponse.json({ status: 'success', brief: parsed, creditsRemaining: userRow.credits - 2 })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
