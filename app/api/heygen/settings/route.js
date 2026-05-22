import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

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

// GET — retrieve HeyGen API key (masked)
export async function GET() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const { data } = await admin()
      .from('user_integrations')
      .select('heygen_api_key')
      .eq('user_id', user.id)
      .single()

    const key = data?.heygen_api_key || ''
    const masked = key ? key.slice(0, 6) + '••••••••••••' + key.slice(-4) : ''

    return NextResponse.json({ status: 'success', hasKey: !!key, masked })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}

// POST — save HeyGen API key
export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const { apiKey } = await req.json()
    if (!apiKey?.trim()) return NextResponse.json({ status: 'error', message: 'API key required' }, { status: 400 })

    // Verify the key works by hitting HeyGen
    const testRes = await fetch('https://api.heygen.com/v2/avatars?limit=1', {
      headers: { 'X-Api-Key': apiKey.trim() }
    })
    if (!testRes.ok) {
      return NextResponse.json({ status: 'error', message: 'Invalid HeyGen API key — please check and try again' }, { status: 400 })
    }

    const db = admin()
    await db.from('user_integrations').upsert({
      user_id:         user.id,
      heygen_api_key:  apiKey.trim(),
      updated_at:      new Date().toISOString(),
    }, { onConflict: 'user_id' })

    const masked = apiKey.slice(0, 6) + '••••••••••••' + apiKey.slice(-4)
    return NextResponse.json({ status: 'success', masked })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}

// DELETE — remove HeyGen API key
export async function DELETE() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    await admin().from('user_integrations').update({ heygen_api_key: null }).eq('user_id', user.id)
    return NextResponse.json({ status: 'success' })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
