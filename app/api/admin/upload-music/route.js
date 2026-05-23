import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// POST /api/admin/upload-music
// Saves the music_tracks DB row after the file has already been uploaded
// directly from the browser to Supabase Storage via a signed URL.

export async function POST(req) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { cookies: { get(n) { return cookieStore.get(n)?.value }, set() {}, remove() {} } }
    )
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (!user || authError) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data: userRow } = await admin.from('app_users').select('is_admin').eq('id', user.id).single()
    if (!userRow?.is_admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const body = await req.json()
    const { title, artist, genre, mood, energy, duration, is_premium, featured, upload_type, file_url } = body

    if (!title || !file_url) {
      return NextResponse.json({ error: 'title and file_url are required' }, { status: 400 })
    }

    const isPreview = upload_type === 'preview'

    let track, insertErr

    if (isPreview) {
      // Preview upload: find existing track by title and update preview_file_url
      const { data: existing } = await admin
        .from('music_tracks')
        .select('id')
        .ilike('title', title.trim())
        .single()

      if (existing) {
        const { data: updated, error: updateErr } = await admin
          .from('music_tracks')
          .update({ preview_file_url: file_url })
          .eq('id', existing.id)
          .select('id, title')
          .single()
        track = updated
        insertErr = updateErr
      } else {
        // No existing track — create a minimal row
        const { data: inserted, error: ie } = await admin
          .from('music_tracks')
          .insert({ title, artist_name: artist || '', preview_file_url: file_url, full_file_url: file_url, is_active: false })
          .select('id, title')
          .single()
        track = inserted
        insertErr = ie
      }
    } else {
      // Full track upload: create new row
      const { data: inserted, error: ie } = await admin
        .from('music_tracks')
        .insert({
          title,
          artist:           artist,
          artist_name:      artist,
          genre:            genre || null,
          mood:             mood  || null,
          energy:           energy || 'medium',
          duration_seconds: duration ? parseInt(duration, 10) : null,
          full_file_url:    file_url,
          preview_file_url: file_url,
          is_active:        true,
          is_premium:       !!is_premium,
          featured:         !!featured,
        })
        .select('id, title')
        .single()
      track = inserted
      insertErr = ie
    }

    if (insertErr) return NextResponse.json({ error: insertErr.message }, { status: 500 })

    return NextResponse.json({ status: 'success', track })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
