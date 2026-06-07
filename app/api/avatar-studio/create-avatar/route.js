import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

export const maxDuration = 60

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

// POST — create HeyGen photo avatar from uploaded photo URL
// Returns immediately with avatarId; client polls /avatar-status until ready
export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { signedUrl, storagePath } = await req.json()
    if (!signedUrl) return NextResponse.json({ error: 'signedUrl required' }, { status: 400 })

    const db = admin()
    const { data: integrations } = await db
      .from('user_integrations')
      .select('heygen_api_key, heygen_personal_avatar_id')
      .eq('user_id', user.id)
      .single()

    const heygenKey = integrations?.heygen_api_key
    if (!heygenKey) return NextResponse.json({ error: 'HeyGen API key not connected. Add it in Account Settings.' }, { status: 400 })

    // If avatar already exists for this user, return it
    if (integrations?.heygen_personal_avatar_id) {
      return NextResponse.json({
        status: 'existing',
        avatarId: integrations.heygen_personal_avatar_id,
        message: 'Using your existing avatar',
      })
    }

    const res = await fetch('https://api.heygen.com/v3/avatars', {
      method: 'POST',
      headers: { 'X-Api-Key': heygenKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'photo',
        name: `avatar_studio_${user.id.slice(0, 8)}_${Date.now()}`,
        file: { type: 'url', url: signedUrl },
      }),
    })

    const data = await res.json()
    const avatarId =
      data?.data?.avatar_item?.id ||
      data?.data?.id ||
      data?.data?.avatar_id ||
      null

    if (!avatarId) {
      const errMsg = data?.error?.message || data?.message || JSON.stringify(data).slice(0, 200)
      return NextResponse.json({ error: `HeyGen avatar creation failed: ${errMsg}` }, { status: 500 })
    }

    // Save avatarId to user_integrations immediately
    await db.from('user_integrations').upsert({
      user_id: user.id,
      heygen_personal_avatar_id: avatarId,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' })

    return NextResponse.json({ status: 'creating', avatarId })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
