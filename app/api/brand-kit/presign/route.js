import { NextResponse } from 'next/server'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// POST /api/brand-kit/presign
// Returns a signed upload URL for the brand-assets bucket.
// Client uploads PNG directly to storage, then calls PATCH /api/brand-kit with the URL.
export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const body = await req.json()
    const ext  = (body?.fileName || 'logo.png').split('.').pop().toLowerCase()
    if (!['png', 'jpg', 'jpeg', 'svg', 'webp'].includes(ext)) {
      return NextResponse.json({ status: 'error', message: 'Logo must be PNG, JPG, SVG, or WebP' }, { status: 400 })
    }

    const storagePath = `${user.id}/logo.${ext}`
    const db = createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

    const { data, error } = await db.storage.from('brand-assets').createSignedUploadUrl(storagePath)
    if (error) throw new Error(error.message)

    // Build signed read URL (1 day)
    const { data: urlData } = await db.storage.from('brand-assets').createSignedUrl(storagePath, 86400)
    const publicUrl = urlData?.signedUrl || null

    return NextResponse.json({ status: 'success', signedUrl: data.signedUrl, token: data.token, storagePath, publicUrl })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
