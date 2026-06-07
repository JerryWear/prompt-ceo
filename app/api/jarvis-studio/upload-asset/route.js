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
    const ext = (file.name || 'image.jpg').split('.').pop().toLowerCase()
    const path = `jarvis-assets/${user.id}/${Date.now()}.${ext}`

    const admin = makeAdmin()

    // Upload to edit-studio-exports bucket (guaranteed to exist)
    const { error } = await admin.storage
      .from('edit-studio-exports')
      .upload(path, buffer, {
        contentType: file.type || 'image/jpeg',
        upsert: true,
      })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    const { data: signedData, error: signError } = await admin.storage
      .from('edit-studio-exports')
      .createSignedUrl(path, 86400) // 24 hours

    if (signError) return NextResponse.json({ error: signError.message }, { status: 500 })

    return NextResponse.json({ status: 'success', publicUrl: signedData.signedUrl, storagePath: path, bucket: 'edit-studio-exports' })

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
