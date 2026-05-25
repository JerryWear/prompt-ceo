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

// POST /api/publish/tiktok
// Body: { mediaUrl, caption, contentType, scheduledPostId }
export async function POST(req) {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { mediaUrl, caption, contentType = 'video', scheduledPostId } = await req.json()
  if (!mediaUrl) return NextResponse.json({ error: 'mediaUrl required' }, { status: 400 })

  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

  const { data: integration } = await admin
    .from('user_integrations')
    .select('tiktok_access_token, tiktok_open_id')
    .eq('user_id', user.id)
    .single()

  if (!integration?.tiktok_access_token) {
    return NextResponse.json({ error: 'TikTok not connected. Connect your account first.' }, { status: 400 })
  }

  const { tiktok_access_token: token } = integration

  try {
    // TikTok Content Posting API — direct post via URL
    const initRes = await fetch('https://open.tiktokapis.com/v2/post/publish/video/init/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        post_info: {
          title:           (caption || '').slice(0, 150),
          privacy_level:   'PUBLIC_TO_EVERYONE',
          disable_duet:    false,
          disable_comment: false,
          disable_stitch:  false,
        },
        source_info: {
          source:    'PULL_FROM_URL',
          video_url: mediaUrl,
        },
      }),
    })

    const initData = await initRes.json()
    if (initData.error?.code && initData.error.code !== 'ok') {
      throw new Error(initData.error.message || 'TikTok init failed')
    }

    const publishId = initData.data?.publish_id
    if (!publishId) throw new Error('No publish_id from TikTok')

    // Poll for completion
    let videoId = ''
    for (let i = 0; i < 24; i++) {
      await new Promise(r => setTimeout(r, 5000))
      const statusRes = await fetch('https://open.tiktokapis.com/v2/post/publish/status/fetch/', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ publish_id: publishId }),
      })
      const statusData = await statusRes.json()
      const st = statusData.data?.status
      if (st === 'PUBLISH_COMPLETE') {
        videoId = statusData.data?.publicaly_available_post_id?.[0] || publishId
        break
      }
      if (st === 'FAILED') throw new Error(statusData.data?.fail_reason || 'TikTok publish failed')
    }

    if (scheduledPostId) {
      await admin.from('scheduled_posts').update({
        status: 'published',
        published_at: new Date().toISOString(),
        tiktok_video_id: videoId || publishId,
        platform_post_id: videoId || publishId,
      }).eq('id', scheduledPostId).eq('user_id', user.id)
    }

    return NextResponse.json({ status: 'published', publishId, videoId })
  } catch (err) {
    console.error('TikTok publish error:', err)
    if (scheduledPostId) {
      await admin.from('scheduled_posts').update({
        status: 'failed',
        error_message: err.message,
      }).eq('id', scheduledPostId).eq('user_id', user.id)
    }
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
