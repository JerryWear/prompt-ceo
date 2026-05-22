import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { buildNamingConventionPrompt } from '../../prompt-engine-v3/ad-system/namingConvention.js'

const CREDIT_COST = 0

function admin() { return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY) }
async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { get(n) { return cookieStore.get(n)?.value }, set() {}, remove() {} } })
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })
    const db = admin()
    const { data: userRow } = await db.from('app_users').select('credits').eq('id', user.id).single()
    if (!userRow || userRow.credits < CREDIT_COST) return NextResponse.json({ status: 'error', message: `Need ${CREDIT_COST} credits` }, { status: 402 })

    const { platform, productName, businessType, campaignGoals, teamSize } = await req.json()

    const apiKey = String(process.env.XAI_API_KEY || '').replace(/^Bearer\s+/i, '').replace(/^"+|"+$/g, '').trim()
    const prompt = buildNamingConventionPrompt({ platform, productName, businessType, campaignGoals, teamSize })
    const grokRes = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: 'grok-3-fast', messages: [
        { role: 'system', content: 'You are a senior paid media strategist. Output ONLY valid JSON. No markdown. Start with {.' },
        { role: 'user', content: prompt }], temperature: 0.7, max_tokens: 2500 }),
    })
    const grokData = await grokRes.json()
    if (!grokRes.ok) return NextResponse.json({ status: 'error', message: grokData?.error?.message || 'AI failed' }, { status: 500 })
    const raw = grokData.choices?.[0]?.message?.content?.trim() || ''
    let system
    try { const m = raw.match(/\{[\s\S]*\}/); system = JSON.parse(m ? m[0] : raw) }
    catch { return NextResponse.json({ status: 'error', message: 'Failed to parse system' }, { status: 500 }) }
    await db.from('app_users').update({ credits: userRow.credits - CREDIT_COST }).eq('id', user.id)
    return NextResponse.json({ status: 'success', system, creditsUsed: CREDIT_COST, creditsRemaining: userRow.credits - CREDIT_COST })
  } catch (err) { return NextResponse.json({ status: 'error', message: err.message }, { status: 500 }) }
}
