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

// POST — create an instant photo avatar from a base64 image URL
export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })
    const apiKey = await getHeyGenKey(user.id)
    if (!apiKey) return NextResponse.json({ status: 'error', message: 'No HeyGen API key connected' }, { status: 400 })

    const { imageDataUrl, name = 'My Photo Avatar' } = await req.json()
    if (!imageDataUrl?.trim()) return NextResponse.json({ status: 'error', message: 'imageDataUrl required' }, { status: 400 })

    // Step 1: Upload the photo to HeyGen
    const base64Data = imageDataUrl.includes(',') ? imageDataUrl.split(',')[1] : imageDataUrl
    const mimeType   = imageDataUrl.includes('data:') ? imageDataUrl.split(';')[0].split(':')[1] : 'image/jpeg'
    const buffer     = Buffer.from(base64Data, 'base64')

    const formData = new FormData()
    const blob = new Blob([buffer], { type: mimeType })
    formData.append('file', blob, 'avatar.jpg')

    const uploadRes = await fetch('https://api.heygen.com/v1/photo_avatar/photo/upload', {
      method:  'POST',
      headers: { 'X-Api-Key': apiKey },
      body:    formData,
    })
    const uploadData = await uploadRes.json()
    if (!uploadRes.ok || !uploadData?.data?.photo_id) {
      return NextResponse.json({ status: 'error', message: uploadData?.message || 'Photo upload failed' }, { status: 500 })
    }

    const photoId = uploadData.data.photo_id

    // Step 2: Create instant avatar from photo
    const createRes = await fetch('https://api.heygen.com/v2/photo_avatar/instant/create', {
      method:  'POST',
      headers: { 'X-Api-Key': apiKey, 'Content-Type': 'application/json' },
      body:    JSON.stringify({ photo_id: photoId, name }),
    })
    const createData = await createRes.json()
    if (!createRes.ok) {
      return NextResponse.json({ status: 'error', message: createData?.message || 'Avatar creation failed' }, { status: 500 })
    }

    const avatarId = createData?.data?.avatar_id || createData?.data?.id
    if (!avatarId) return NextResponse.json({ status: 'error', message: 'No avatar ID returned' }, { status: 500 })

    return NextResponse.json({ status: 'success', avatarId, photoId, name })
  } catch (err) {
    console.error('Photo avatar error:', err)
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
