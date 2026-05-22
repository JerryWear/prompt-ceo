import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

function admin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}
async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { get(n) { return cookieStore.get(n)?.value }, set() {}, remove() {} } })
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function GET() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })
    const { data } = await admin().from('user_integrations').select('runway_api_key').eq('user_id', user.id).single()
    const key = data?.runway_api_key || ''
    return NextResponse.json({ status: 'success', hasKey: !!key, masked: key ? key.slice(0,6) + '••••••' + key.slice(-4) : '' })
  } catch (err) { return NextResponse.json({ status: 'error', message: err.message }, { status: 500 }) }
}

export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })
    const { apiKey } = await req.json()
    if (!apiKey?.trim()) return NextResponse.json({ status: 'error', message: 'API key required' }, { status: 400 })

    // Validate key with a lightweight Runway API call
    const testRes = await fetch('https://api.dev.runwayml.com/v1/tasks', {
      method: 'GET',
      headers: { Authorization: `Bearer ${apiKey.trim()}`, 'X-Runway-Version': '2024-11-06' }
    })
    // Runway returns 200 or 401 — either way key is valid if not 401
    if (testRes.status === 401) return NextResponse.json({ status: 'error', message: 'Invalid Runway API key' }, { status: 400 })

    await admin().from('user_integrations').upsert({
      user_id: user.id, runway_api_key: apiKey.trim(), updated_at: new Date().toISOString()
    }, { onConflict: 'user_id' })

    return NextResponse.json({ status: 'success', masked: apiKey.slice(0,6) + '••••••' + apiKey.slice(-4) })
  } catch (err) { return NextResponse.json({ status: 'error', message: err.message }, { status: 500 }) }
}

export async function DELETE() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })
    await admin().from('user_integrations').update({ runway_api_key: null }).eq('user_id', user.id)
    return NextResponse.json({ status: 'success' })
  } catch (err) { return NextResponse.json({ status: 'error', message: err.message }, { status: 500 }) }
}
