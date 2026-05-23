import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// POST /api/admin/upload-music
// Uploads audio file to music-previews bucket + inserts music_tracks row

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

    const formData  = await req.formData()
    const file      = formData.get('file')
    const title     = formData.get('title')     || ''
    const artist    = formData.get('artist')    || ''
    const genre     = formData.get('genre')     || ''
    const mood      = formData.get('mood')      || ''
    const energy    = formData.get('energy')    || 'medium'
    const duration  = parseInt(formData.get('duration') || '0', 10)
    const isPremium = formData.get('is_premium') === 'true'
    const featured  = formData.get('featured')  === 'true'

    if (!file || !title || !artist) {
      return NextResponse.json({ error: 'file, title, and artist are required' }, { status: 400 })
    }

    // Upload to music-previews bucket
    const ext      = file.name.split('.').pop() || 'mp3'
    const safeName = title.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 40)
    const path     = `${Date.now()}-${safeName}.${ext}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer      = Buffer.from(arrayBuffer)

    const { data: storageData, error: storageErr } = await admin.storage
      .from('music-previews')
      .upload(path, buffer, { contentType: file.type || 'audio/mpeg', upsert: false })

    if (storageErr) return NextResponse.json({ error: `Storage upload failed: ${storageErr.message}` }, { status: 500 })

    const { data: { publicUrl } } = admin.storage
      .from('music-previews')
      .getPublicUrl(storageData.path)

    // Insert track row
    const { data: track, error: insertErr } = await admin
      .from('music_tracks')
      .insert({
        title,
        artist:      artist,
        artist_name: artist,
        genre,
        mood,
        energy,
        duration_seconds: duration || null,
        preview_file_url: publicUrl,
        is_active:   true,
        is_premium:  isPremium,
        featured,
      })
      .select('id, title')
      .single()

    if (insertErr) return NextResponse.json({ error: `DB insert failed: ${insertErr.message}` }, { status: 500 })

    return NextResponse.json({ status: 'success', track })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
