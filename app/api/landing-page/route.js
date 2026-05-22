import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { buildLandingPagePrompt } from '../../prompt-engine-v3/ad-system/landingPage.js'

const CREDIT_COST = 0

function admin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { get(n) { return cookieStore.get(n)?.value }, set() {}, remove() {} } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const db = admin()
    const { data: userRow } = await db.from('app_users').select('credits').eq('id', user.id).single()
    if (!userRow || userRow.credits < CREDIT_COST) {
      return NextResponse.json({ status: 'error', message: `Not enough credits — need ${CREDIT_COST}` }, { status: 402 })
    }

    const body = await req.json()
    const adConfig = body?.adConfig || {}
    if (!adConfig.productName?.trim()) {
      return NextResponse.json({ status: 'error', message: 'Product name required' }, { status: 400 })
    }

    const apiKey = String(process.env.XAI_API_KEY || '').replace(/^Bearer\s+/i, '').replace(/^"+|"+$/g, '').trim()
    const prompt = buildLandingPagePrompt(adConfig)

    const grokRes = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'grok-3-fast',
        messages: [
          { role: 'system', content: 'You are a world-class conversion copywriter. Output ONLY valid JSON. No markdown. Start with {.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.85,
        max_tokens: 4000,
      }),
    })

    const grokData = await grokRes.json()
    if (!grokRes.ok) return NextResponse.json({ status: 'error', message: grokData?.error?.message || 'AI failed' }, { status: 500 })

    const raw = grokData.choices?.[0]?.message?.content?.trim() || ''
    let page
    try {
      const m = raw.match(/\{[\s\S]*\}/)
      page = JSON.parse(m ? m[0] : raw)
    } catch {
      return NextResponse.json({ status: 'error', message: 'Failed to parse landing page' }, { status: 500 })
    }

    await db.from('app_users').update({ credits: userRow.credits - CREDIT_COST }).eq('id', user.id)

    return NextResponse.json({ status: 'success', page, creditsUsed: CREDIT_COST, creditsRemaining: userRow.credits - CREDIT_COST })
  } catch (err) {
    console.error('Landing page error:', err)
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
