import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { buildLaunchPackagePrompt } from '../../prompt-engine-v3/ad-system/launchPackage.js'

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

    const body = await req.json()
    const adConfig = body?.adConfig || {}
    if (!adConfig.productName?.trim()) return NextResponse.json({ status: 'error', message: 'Product name required' }, { status: 400 })

    const apiKey = String(process.env.XAI_API_KEY || '').replace(/^Bearer\s+/i, '').replace(/^"+|"+$/g, '').trim()
    const prompt = buildLaunchPackagePrompt(adConfig)

    const grokRes = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: 'grok-3-fast', messages: [
        { role: 'system', content: 'You are a senior paid media manager. Output ONLY valid JSON. No markdown. Start with {.' },
        { role: 'user', content: prompt }], temperature: 0.75, max_tokens: 4000 }),
    })
    const grokData = await grokRes.json()
    if (!grokRes.ok) return NextResponse.json({ status: 'error', message: grokData?.error?.message || 'AI failed' }, { status: 500 })

    const raw = grokData.choices?.[0]?.message?.content?.trim() || ''
    let pkg
    try { const m = raw.match(/\{[\s\S]*\}/); pkg = JSON.parse(m ? m[0] : raw) }
    catch { return NextResponse.json({ status: 'error', message: 'Failed to parse package' }, { status: 500 }) }

    return NextResponse.json({ status: 'success', package: pkg })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
