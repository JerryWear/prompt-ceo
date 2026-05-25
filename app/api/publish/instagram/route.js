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

// POST /api/publish/instagram
// Body: { mediaUrl, caption, contentType, scheduledPostId }
export async function POST(req) {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { mediaUrl, caption, contentType = 'image', scheduledPostId } = await req.json()
  if (!mediaUrl) return NextResponse.json({ error: 'mediaUrl required' }, { status: 400 })

  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

  // Get integration
  const { data: integration } = await admin
    .from('user_integrations')
    .select('instagram_access_token, instagram_user_id')
    .eq('user_id', user.id)
    .single()

  if (!integration?.instagram_access_token || !integration?.instagram_user_id) {
    return NextResponse.json({ error: 'Instagram not connected. Connect your account first.' }, { status: 400 })
  }

  const { instagram_access_token: token, instagram_user_id: igUserId } = integration

  try {
    const isVideo = contentType === 'video' || contentType === 'reel'
    const fullCaption = caption || ''

    // Step 1 — create media container
    const containerBody = new URLSearchParams({
      access_token: token,
      caption:      fullCaption,
    })

    if (isVideo) {
      containerBody.set('media_type', contentType === 'reel' ? 'REELS' : 'VIDEO')
      containerBody.set('video_url',  mediaUrl)
    } else {
      containerBody.set('image_url',  mediaUrl)
    }

    const containerRes = await fetch(
      `https://graph.facebook.com/v19.0/${igUserId}/media`,
      { method: 'POST', body: containerBody }
    )
    const containerData = await containerRes.json()
    if (!containerData.id) throw new Error(containerData.error?.message || 'Failed to create media container')

    // For videos, poll until ready
    if (isVideo) {
      let ready = false
      for (let i = 0; i < 20; i++) {
        await new Promise(r => setTimeout(r, 5000))
        const statusRes = await fetch(
          `https://graph.facebook.com/v19.0/${containerData.id}?fields=status_code&access_token=${token}`
        )
        const statusData = await statusRes.json()
        if (statusData.status_code === 'FINISHED') { ready = true; break }
        if (statusData.status_code === 'ERROR') throw new Error('Instagram video processing failed')
      }
      if (!ready) throw new Error('Instagram video processing timed out')
    }

    // Step 2 — publish
    const publishRes = await fetch(
      `https://graph.facebook.com/v19.0/${igUserId}/media_publish`,
      {
        method: 'POST',
        body: new URLSearchParams({ access_token: token, creation_id: containerData.id }),
      }
    )
    const publishData = await publishRes.json()
    if (!publishData.id) throw new Error(publishData.error?.message || 'Failed to publish to Instagram')

    // Update scheduled post if provided
    if (scheduledPostId) {
      await admin.from('scheduled_posts').update({
        status: 'published',
        published_at: new Date().toISOString(),
        ig_media_id: publishData.id,
        platform_post_id: publishData.id,
      }).eq('id', scheduledPostId).eq('user_id', user.id)
    }

    return NextResponse.json({ status: 'published', igMediaId: publishData.id })
  } catch (err) {
    console.error('Instagram publish error:', err)
    if (scheduledPostId) {
      await admin.from('scheduled_posts').update({
        status: 'failed',
        error_message: err.message,
      }).eq('id', scheduledPostId).eq('user_id', user.id)
    }
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
