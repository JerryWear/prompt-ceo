import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { get(n) { return cookieStore.get(n)?.value }, set() {}, remove() {} } })
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

async function getHeyGenKey(userId) {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  const { data } = await db.from('user_integrations').select('heygen_api_key').eq('user_id', userId).single()
  return data?.heygen_api_key || null
}

export async function GET(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const apiKey = await getHeyGenKey(user.id)
    if (!apiKey) return NextResponse.json({ status: 'error', message: 'No HeyGen API key' }, { status: 400 })

    const { searchParams } = new URL(req.url)
    const videoId = searchParams.get('video_id')
    if (!videoId) return NextResponse.json({ status: 'error', message: 'video_id required' }, { status: 400 })

    const res = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${videoId}`, {
      headers: { 'X-Api-Key': apiKey }
    })

    const data = await res.json()
    if (!res.ok) return NextResponse.json({ status: 'error', message: 'Failed to get status' }, { status: 500 })

    const videoData = data?.data || {}

    return NextResponse.json({
      status:     'success',
      videoStatus: videoData.status,          // processing | completed | failed
      videoUrl:    videoData.video_url || null,
      thumbnailUrl:videoData.thumbnail_url || null,
      duration:    videoData.duration || null,
      error:       videoData.error || null,
    })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
