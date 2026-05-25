import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

// GET /api/integrations — returns which platforms are connected for the user
export async function GET() {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { cookies: { get: (n) => cookieStore.get(n)?.value, set() {}, remove() {} } }
    )
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ integrations: { instagram: null, tiktok: null } })

    const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    const { data } = await admin
      .from('user_integrations')
      .select('instagram_username, instagram_user_id, instagram_connected_at, tiktok_username, tiktok_open_id, tiktok_connected_at')
      .eq('user_id', user.id)
      .single()

    return NextResponse.json({
      integrations: {
        instagram: data?.instagram_user_id
          ? { username: data.instagram_username, connectedAt: data.instagram_connected_at }
          : null,
        tiktok: data?.tiktok_open_id
          ? { username: data.tiktok_username, connectedAt: data.tiktok_connected_at }
          : null,
      }
    })
  } catch {
    return NextResponse.json({ integrations: { instagram: null, tiktok: null } })
  }
}
