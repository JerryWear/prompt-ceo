import { NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

// GET /api/stream-track/[id]?type=preview|full
// Preview URLs are public — no auth required.
// Full-track signed URLs require an authenticated session.

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

export async function GET(req, { params }) {
  try {
    const { id } = await params
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type') || 'preview'

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data: track, error } = await admin
      .from('music_tracks')
      .select('preview_file_url, full_file_url')
      .eq('id', id)
      .single()

    if (error || !track) return NextResponse.json({ error: 'Track not found' }, { status: 404 })

    // Full-track access requires authentication
    let fileUrl
    if (type === 'full' || (!track.preview_file_url && track.full_file_url)) {
      const user = await getUser()
      if (!user) {
        return NextResponse.json({ error: 'Unauthorized — full track requires authentication' }, { status: 401 })
      }
      fileUrl = track.full_file_url
    } else {
      fileUrl = track.preview_file_url
    }

    if (!fileUrl) return NextResponse.json({ error: 'No file URL' }, { status: 404 })

    // Extract bucket name and path from the Supabase storage URL
    // URL format: https://[project].supabase.co/storage/v1/object/public/[bucket]/[path]
    const storageMatch = fileUrl.match(/\/storage\/v1\/object\/(?:public\/)?([^/]+)\/(.+)$/)
    if (!storageMatch) {
      // Not a Supabase storage URL — redirect directly
      return NextResponse.redirect(fileUrl)
    }

    const bucket = storageMatch[1]
    const path   = storageMatch[2]

    // Generate a 2-hour signed URL
    const { data: signed, error: signErr } = await admin.storage
      .from(bucket)
      .createSignedUrl(path, 7200)

    if (signErr || !signed?.signedUrl) {
      // Fall back to original URL (works for public buckets)
      return NextResponse.redirect(fileUrl)
    }

    return NextResponse.redirect(signed.signedUrl)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
