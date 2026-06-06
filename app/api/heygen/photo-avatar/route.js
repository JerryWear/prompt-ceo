import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

export const maxDuration = 30
export const runtime = 'nodejs'

async function makeSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { get(n) { return cookieStore.get(n)?.value }, set() {}, remove() {} } }
  )
}
function makeAdmin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

async function getHeyGenKey(userId) {
  const { data } = await makeAdmin()
    .from('user_integrations').select('heygen_api_key').eq('user_id', userId).single()
  return data?.heygen_api_key || null
}

// GET /api/heygen/photo-avatar?action=upload-url&fileName=avatar.jpg
// Returns a signed upload URL so the browser can PUT the file directly to Supabase.
// After the upload, the client calls POST with the storagePath.
export async function GET(req) {
  const { searchParams } = new URL(req.url)

  // Diagnostic ping
  if (searchParams.get('action') !== 'upload-url') {
    return NextResponse.json({ status: 'alive', route: '/api/heygen/photo-avatar' })
  }

  try {
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const fileName    = searchParams.get('fileName') || 'avatar.jpg'
    const storagePath = `${user.id}/avatar-uploads/${Date.now()}_${fileName}`

    const { data, error } = await makeAdmin().storage
      .from('edit-studio-assets')
      .createSignedUploadUrl(storagePath, { upsert: true })

    if (error) return NextResponse.json({ status: 'error', message: error.message }, { status: 500 })

    return NextResponse.json({
      status:      'success',
      signedUrl:   data.signedUrl,
      storagePath,
      bucket:      'edit-studio-assets',
    })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}

// POST /api/heygen/photo-avatar
// Body (JSON, tiny): { storagePath: string, bucket: string }
// Route downloads file from Supabase via admin client, uploads to HeyGen.
export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const apiKey = await getHeyGenKey(user.id)
    if (!apiKey) return NextResponse.json({ status: 'error', message: 'No HeyGen API key connected' }, { status: 400 })

    const body = await req.json()
    const { storagePath, bucket = 'edit-studio-assets' } = body
    if (!storagePath) return NextResponse.json({ status: 'error', message: 'storagePath required' }, { status: 400 })

    // Download from Supabase via admin (bypasses RLS / private bucket)
    const { data: fileBlob, error: dlError } = await makeAdmin().storage.from(bucket).download(storagePath)
    if (dlError || !fileBlob) {
      return NextResponse.json({ status: 'error', message: `Supabase download failed: ${dlError?.message}` }, { status: 500 })
    }

    const buffer   = Buffer.from(await fileBlob.arrayBuffer())
    const mimeType = fileBlob.type || 'image/jpeg'

    // Upload to HeyGen
    const uploadForm = new FormData()
    uploadForm.append('file', new Blob([buffer], { type: mimeType }), 'avatar.jpg')

    const uploadRes  = await fetch('https://api.heygen.com/v2/photo_avatar/photo/upload', {
      method: 'POST',
      headers: { 'X-Api-Key': apiKey },
      body:    uploadForm,
    })

    // Capture raw text first so we can log it on failure
    const uploadText = await uploadRes.text()
    let uploadData
    try { uploadData = JSON.parse(uploadText) } catch { uploadData = {} }

    if (!uploadRes.ok || !uploadData?.data?.photo_id) {
      console.error('[photo-avatar] HeyGen upload response:', uploadRes.status, uploadText.slice(0, 500))
      return NextResponse.json({
        status:   'error',
        message:  uploadData?.message || `HeyGen upload failed (${uploadRes.status})`,
        heygen:   uploadText.slice(0, 300),
      }, { status: 500 })
    }

    // Create instant avatar
    const createRes  = await fetch('https://api.heygen.com/v2/photo_avatar/instant/create', {
      method:  'POST',
      headers: { 'X-Api-Key': apiKey, 'Content-Type': 'application/json' },
      body:    JSON.stringify({ photo_id: uploadData.data.photo_id, name: 'My Photo Avatar' }),
    })

    const createText = await createRes.text()
    let createData
    try { createData = JSON.parse(createText) } catch { createData = {} }

    if (!createRes.ok) {
      console.error('[photo-avatar] HeyGen create response:', createRes.status, createText.slice(0, 500))
      return NextResponse.json({
        status:  'error',
        message: createData?.message || `Avatar creation failed (${createRes.status})`,
        heygen:  createText.slice(0, 300),
      }, { status: 500 })
    }

    const avatarId = createData?.data?.avatar_id || createData?.data?.id
    if (!avatarId) {
      return NextResponse.json({
        status:  'error',
        message: 'No avatar ID in HeyGen response',
        heygen:  createText.slice(0, 300),
      }, { status: 500 })
    }

    return NextResponse.json({ status: 'success', avatarId, photoId: uploadData.data.photo_id })

  } catch (err) {
    console.error('[photo-avatar] fatal:', err)
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
