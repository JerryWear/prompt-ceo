import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

export const maxDuration = 60

function admin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { get(n) { return cookieStore.get(n)?.value }, set() {}, remove() {} } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// POST — receive photo file, store in Supabase, return storage URL + signed URL
export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const formData = await req.formData()
    const file = formData.get('photo')
    if (!file) return NextResponse.json({ error: 'Photo file required' }, { status: 400 })

    const buffer = Buffer.from(await file.arrayBuffer())
    const ext = file.type.includes('png') ? 'png' : 'jpg'
    const path = `avatar-studio/${user.id}/photo_${Date.now()}.${ext}`

    const db = admin()
    const { error: uploadErr } = await db.storage
      .from('identity-images')
      .upload(path, buffer, { contentType: file.type, upsert: true })

    if (uploadErr) return NextResponse.json({ error: uploadErr.message }, { status: 500 })

    const { data: signedData } = await db.storage
      .from('identity-images')
      .createSignedUrl(path, 7200)

    return NextResponse.json({
      status: 'success',
      storagePath: path,
      signedUrl: signedData?.signedUrl,
    })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
