import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { get(n) { return cookieStore.get(n)?.value }, set() {}, remove() {} } })
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

async function getHeyGenKey(userId) {
  const { data } = await createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    .from('user_integrations').select('heygen_api_key').eq('user_id', userId).single()
  return data?.heygen_api_key || null
}

async function uploadToHeyGen(buffer, mimeType, apiKey) {
  const formData = new FormData()
  formData.append('file', new Blob([buffer], { type: mimeType }), 'avatar.jpg')

  const uploadRes = await fetch('https://api.heygen.com/v1/photo_avatar/photo/upload', {
    method: 'POST', headers: { 'X-Api-Key': apiKey }, body: formData,
  })
  const uploadData = await uploadRes.json()
  if (!uploadRes.ok || !uploadData?.data?.photo_id) {
    throw new Error(uploadData?.message || 'Photo upload to HeyGen failed')
  }

  const photoId   = uploadData.data.photo_id
  const createRes = await fetch('https://api.heygen.com/v2/photo_avatar/instant/create', {
    method: 'POST', headers: { 'X-Api-Key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ photo_id: photoId, name: 'My Photo Avatar' }),
  })
  const createData = await createRes.json()
  if (!createRes.ok) throw new Error(createData?.message || 'Avatar creation failed')

  const avatarId = createData?.data?.avatar_id || createData?.data?.id
  if (!avatarId) throw new Error('No avatar ID returned from HeyGen')
  return { avatarId, photoId }
}

// POST /api/heygen/photo-avatar
// Accepts either:
//   multipart/form-data  with field "file" (direct file upload — preferred)
//   application/json     with { imageUrl }  (server fetches the URL)
export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })
    const apiKey = await getHeyGenKey(user.id)
    if (!apiKey) return NextResponse.json({ status: 'error', message: 'No HeyGen API key connected' }, { status: 400 })

    const contentType = req.headers.get('content-type') || ''
    let buffer, mimeType

    if (contentType.includes('multipart/form-data')) {
      // ── File upload path ─────────────────────────────────────────────────────
      const form = await req.formData()
      const file = form.get('file')
      if (!file) return NextResponse.json({ status: 'error', message: 'No file provided' }, { status: 400 })
      buffer   = Buffer.from(await file.arrayBuffer())
      mimeType = file.type || 'image/jpeg'

    } else {
      // ── URL path ─────────────────────────────────────────────────────────────
      const body = await req.json()
      const { imageUrl } = body
      if (!imageUrl?.trim()) return NextResponse.json({ status: 'error', message: 'imageUrl required' }, { status: 400 })

      const imgRes = await fetch(imageUrl)
      if (!imgRes.ok) return NextResponse.json({ status: 'error', message: `Could not fetch image: ${imgRes.status}` }, { status: 400 })
      buffer   = Buffer.from(await imgRes.arrayBuffer())
      mimeType = imgRes.headers.get('content-type') || 'image/jpeg'
    }

    const { avatarId, photoId } = await uploadToHeyGen(buffer, mimeType, apiKey)
    return NextResponse.json({ status: 'success', avatarId, photoId })

  } catch (err) {
    console.error('Photo avatar error:', err)
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
