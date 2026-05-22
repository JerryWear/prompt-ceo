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

async function getSynthesiaKey(userId) {
  const { data } = await createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    .from('user_integrations').select('synthesia_api_key').eq('user_id', userId).single()
  return data?.synthesia_api_key || null
}

export async function GET(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })
    const key = await getSynthesiaKey(user.id)
    if (!key) return NextResponse.json({ status: 'error', message: 'No Synthesia API key' }, { status: 400 })

    const { searchParams } = new URL(req.url)
    const videoId = searchParams.get('video_id')
    if (!videoId) return NextResponse.json({ status: 'error', message: 'video_id required' }, { status: 400 })

    const res = await fetch(`https://api.synthesia.io/v2/videos/${videoId}`, {
      headers: { Authorization: key }
    })
    const data = await res.json()
    if (!res.ok) return NextResponse.json({ status: 'error', message: 'Failed to get status' }, { status: 500 })

    // Synthesia statuses: in_progress | complete | failed
    return NextResponse.json({
      status:      'success',
      videoStatus: data.status === 'complete' ? 'completed' : data.status === 'failed' ? 'failed' : 'processing',
      videoUrl:    data.download || null,
      thumbnailUrl:data.thumbnail || null,
      duration:    data.duration || null,
    })
  } catch (err) { return NextResponse.json({ status: 'error', message: err.message }, { status: 500 }) }
}
