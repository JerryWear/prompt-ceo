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

const admin = () => createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

// GET — list user's scheduled posts (most recent 50)
export async function GET(req) {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status') // optional filter

  let query = admin()
    .from('scheduled_posts')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50)

  if (status) query = query.eq('status', status)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ posts: data })
}

// POST — create a new scheduled post
export async function POST(req) {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const body = await req.json()
  const { mediaUrl, caption, hashtags, platform, contentType, scheduledAt, projectId, source } = body

  if (!mediaUrl)  return NextResponse.json({ error: 'mediaUrl required' }, { status: 400 })
  if (!platform)  return NextResponse.json({ error: 'platform required' }, { status: 400 })

  // If scheduledAt is null/now → publish immediately after creating the row
  const publishNow = !scheduledAt

  const { data, error } = await admin()
    .from('scheduled_posts')
    .insert({
      user_id:      user.id,
      project_id:   projectId || null,
      platform,
      content_type: contentType || 'image',
      media_url:    mediaUrl,
      caption:      caption || '',
      hashtags:     hashtags || [],
      scheduled_at: scheduledAt || new Date().toISOString(),
      status:       'scheduled',
      source:       source || 'studio',
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Publish immediately if no future schedule
  if (publishNow) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ')

    const targets = platform === 'both' ? ['instagram', 'tiktok'] : [platform]
    for (const target of targets) {
      fetch(`${siteUrl}/api/publish/${target}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
        body: JSON.stringify({ mediaUrl, caption, contentType, scheduledPostId: data.id }),
      }).catch(() => {})
    }
  }

  return NextResponse.json({ post: data, publishingNow: publishNow })
}

// PATCH — update status or cancel
export async function PATCH(req) {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { id, status } = await req.json()
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  const { data, error } = await admin()
    .from('scheduled_posts')
    .update({ status })
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ post: data })
}

// DELETE
export async function DELETE(req) {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  const { error } = await admin()
    .from('scheduled_posts')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ status: 'deleted' })
}
