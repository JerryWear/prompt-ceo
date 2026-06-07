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

// GET /api/avatar-studio/avatar-status?avatarId=xxx
// Polls HeyGen for avatar ready status
export async function GET(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const avatarId = searchParams.get('avatarId')
    if (!avatarId) return NextResponse.json({ error: 'avatarId required' }, { status: 400 })

    const db = admin()
    const { data: integrations } = await db
      .from('user_integrations')
      .select('heygen_api_key')
      .eq('user_id', user.id)
      .single()

    const heygenKey = integrations?.heygen_api_key
    if (!heygenKey) return NextResponse.json({ error: 'HeyGen API key missing' }, { status: 400 })

    // Try all known HeyGen v3 status endpoints
    const endpoints = [
      `https://api.heygen.com/v3/photo_avatar/${avatarId}`,
      `https://api.heygen.com/v2/avatar/${avatarId}`,
      `https://api.heygen.com/v1/avatar.get?avatar_id=${avatarId}`,
    ]

    let ready = false
    let failed = false
    let rawStatus = 'unknown'

    for (const endpoint of endpoints) {
      try {
        const res = await fetch(endpoint, { headers: { 'X-Api-Key': heygenKey } })
        const data = await res.json()
        console.log('[avatar-status]', endpoint, res.status, JSON.stringify(data).slice(0, 200))
        if (!res.ok) continue

        const s = (
          data?.data?.status ||
          data?.data?.avatar_item?.status ||
          data?.data?.avatar?.status ||
          data?.status ||
          ''
        ).toLowerCase()

        if (!s) continue
        rawStatus = s

        if (s === 'failed' || s === 'error' || s === 'deleted') { failed = true; break }
        if (s !== 'processing' && s !== 'pending' && s !== 'queued' && s !== 'training' && s !== 'in_progress') {
          ready = true; break
        }
        break
      } catch {}
    }

    return NextResponse.json({ ready, failed, rawStatus })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
