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

// GET /api/avatar-studio/video-status?videoId=xxx
// Polls HeyGen video generation status
export async function GET(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const videoId = searchParams.get('videoId')
    if (!videoId) return NextResponse.json({ error: 'videoId required' }, { status: 400 })

    const db = admin()
    const { data: integrations } = await db
      .from('user_integrations')
      .select('heygen_api_key')
      .eq('user_id', user.id)
      .single()

    const heygenKey = integrations?.heygen_api_key
    if (!heygenKey) return NextResponse.json({ error: 'HeyGen API key missing' }, { status: 400 })

    const res = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${videoId}`, {
      headers: { 'X-Api-Key': heygenKey },
    })

    const data = await res.json()
    console.log('[video-status] HeyGen status:', JSON.stringify(data).slice(0, 300))

    if (!res.ok) {
      const msg = data?.error?.message || data?.message || `HTTP ${res.status}`
      return NextResponse.json({ error: msg }, { status: 500 })
    }

    const status = (data?.data?.status || data?.status || '').toLowerCase()
    const videoUrl = data?.data?.video_url || data?.video_url || null
    const thumbnailUrl = data?.data?.thumbnail_url || data?.thumbnail_url || null
    const error = data?.data?.error || data?.error || null

    const done = status === 'completed' || status === 'success'
    const failed = status === 'failed' || status === 'error'

    return NextResponse.json({ status, done, failed, videoUrl, thumbnailUrl, error })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
