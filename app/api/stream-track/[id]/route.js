import { NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// GET /api/stream-track/[id]
// Generates a fresh signed URL for the track file and redirects to it.
// Works for both public (music-previews) and private (music-full) buckets.

export async function GET(req, { params }) {
  try {
    const { id } = await params
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

    const fileUrl = track.preview_file_url || track.full_file_url
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
