import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { get: (n) => cookieStore.get(n)?.value, set() {}, remove() {} } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

function admin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

// POST — track world usage. Fire-and-forget from client.
export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { worldId, worldName, liked } = await req.json()
    if (!worldId) return NextResponse.json({ error: 'worldId required' }, { status: 400 })

    const db = admin()

    // Try to fetch existing row
    const { data: existing } = await db
      .from('world_memory')
      .select('id, use_count, like_count')
      .eq('user_id', user.id)
      .eq('world_id', worldId)
      .single()

    if (existing) {
      await db.from('world_memory').update({
        use_count:   existing.use_count + 1,
        like_count:  liked ? (existing.like_count || 0) + 1 : (existing.like_count || 0),
        last_used_at: new Date().toISOString(),
      }).eq('id', existing.id)
    } else {
      await db.from('world_memory').insert({
        user_id:      user.id,
        world_id:     worldId,
        world_name:   worldName || worldId,
        use_count:    1,
        like_count:   liked ? 1 : 0,
        last_used_at: new Date().toISOString(),
      })
    }

    return NextResponse.json({ status: 'ok' })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
