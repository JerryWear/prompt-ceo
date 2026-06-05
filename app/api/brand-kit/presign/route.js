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
    const uploadType = body?.uploadType || 'logo'
    const ALLOWED = {
      logo:      { exts: ['png','jpg','jpeg','svg','webp'], path: (id, ext) => `${id}/logo.${ext}`,      maxMb: 2 },
      intro:     { exts: ['mp4','mov','webm'],              path: (id, ext) => `${id}/intro.${ext}`,     maxMb: 50 },
      outro:     { exts: ['mp4','mov','webm'],              path: (id, ext) => `${id}/outro.${ext}`,     maxMb: 50 },
      watermark: { exts: ['png','webp'],                    path: (id, ext) => `${id}/watermark.${ext}`, maxMb: 2 },
    }

    const typeConfig = ALLOWED[uploadType]
    if (!typeConfig) {
      return NextResponse.json({ status: 'error', message: `Unknown upload type: ${uploadType}` }, { status: 400 })
    }
    if (!typeConfig.exts.includes(ext)) {
      return NextResponse.json({ status: 'error', message: `${uploadType} must be ${typeConfig.exts.join(', ')}` }, { status: 400 })
    }

    const storagePath = typeConfig.path(user.id, ext)
    const db = createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

    const { data, error } = await db.storage.from('brand-assets').createSignedUploadUrl(storagePath)
    if (error) throw new Error(error.message)

    // Build signed read URL (1 day)
    const { data: urlData } = await db.storage.from('brand-assets').createSignedUrl(storagePath, 86400)
    const publicUrl = urlData?.signedUrl || null

    return NextResponse.json({ status: 'success', signedUrl: data.signedUrl, token: data.token, storagePath, publicUrl, uploadType })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
