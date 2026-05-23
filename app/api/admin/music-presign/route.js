import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// POST /api/admin/music-presign
// Returns a signed upload URL for direct browser → Supabase Storage upload.
// The client uses the URL to PUT the file, then calls /api/admin/upload-music
// with the metadata + path to save the DB row.

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

    const { filename, contentType, title } = await req.json()
    if (!filename) return NextResponse.json({ error: 'filename required' }, { status: 400 })

    const ext      = filename.split('.').pop() || 'mp3'
    const safeName = (title || filename).toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 40)
    const path     = `${Date.now()}-${safeName}.${ext}`

    const { data, error } = await admin.storage
      .from('music-previews')
      .createSignedUploadUrl(path)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    const { data: { publicUrl } } = admin.storage
      .from('music-previews')
      .getPublicUrl(path)

    return NextResponse.json({ status: 'success', signedUrl: data.signedUrl, path, publicUrl, token: data.token })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
