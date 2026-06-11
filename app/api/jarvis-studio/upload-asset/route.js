import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export const maxDuration = 60

async function makeSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
}

function makeAdmin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

// POST /api/jarvis-studio/upload-asset
// Body: FormData with 'file' field
// Returns: { status, publicUrl }
export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const formData = await req.formData()
    const file = formData.get('file')
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const nameParts = (file.name || 'image.jpg').split('.')
    const ext = nameParts.length > 1 ? nameParts.pop().toLowerCase() : 'jpg'
    const storagePath = `jarvis-assets/${user.id}/${Date.now()}.${ext}`

    const MIME_BY_EXT = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', gif: 'image/gif', mp4: 'video/mp4', mov: 'video/quicktime', webm: 'video/webm', mp3: 'audio/mpeg', wav: 'audio/wav', m4a: 'audio/mp4' }
    const contentType = file.type || MIME_BY_EXT[ext] || 'application/octet-stream'

    const admin = makeAdmin()

    // Upload to identity-images (public bucket — permanent URLs, accessible by Runway + browser)
    const { error } = await admin.storage
      .from('identity-images')
      .upload(storagePath, buffer, { contentType, upsert: true })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    const { data: urlData } = admin.storage.from('identity-images').getPublicUrl(storagePath)

    return NextResponse.json({ status: 'success', publicUrl: urlData.publicUrl, storagePath, bucket: 'identity-images' })

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
