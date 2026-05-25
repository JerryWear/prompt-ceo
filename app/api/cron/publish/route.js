import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// GET /api/cron/publish — called by Vercel Cron every 5 minutes
// Processes all scheduled posts whose scheduled_at is in the past
export async function GET(req) {
  // Verify cron secret to prevent unauthorized calls
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  // Fetch all due scheduled posts
  const { data: duePosts, error } = await admin
    .from('scheduled_posts')
    .select('*, user_integrations!inner(instagram_access_token, instagram_user_id, tiktok_access_token)')
    .eq('status', 'scheduled')
    .lte('scheduled_at', new Date().toISOString())
    .limit(20)

  if (error) {
    console.error('Cron fetch error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!duePosts?.length) {
    return NextResponse.json({ processed: 0 })
  }

  const results = []

  for (const post of duePosts) {
    const targets = post.platform === 'both' ? ['instagram', 'tiktok'] : [post.platform]

    for (const target of targets) {
      try {
        const res = await fetch(`${siteUrl}/api/publish/${target}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-cron-user-id': post.user_id, // internal bypass for cron
          },
          body: JSON.stringify({
            mediaUrl:        post.media_url,
            caption:         post.caption,
            contentType:     post.content_type,
            scheduledPostId: post.id,
          }),
        })
        const data = await res.json()
        results.push({ id: post.id, platform: target, status: data.status || 'error', error: data.error })
      } catch (err) {
        results.push({ id: post.id, platform: target, status: 'error', error: err.message })
        await admin.from('scheduled_posts').update({
          status: 'failed',
          error_message: err.message,
        }).eq('id', post.id)
      }
    }
  }

  return NextResponse.json({ processed: duePosts.length, results })
}
