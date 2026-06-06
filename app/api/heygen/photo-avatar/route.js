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

    // Create a signed read URL so HeyGen can fetch the photo from Supabase
    const { data: signedData, error: signedError } = await makeAdmin().storage
      .from(bucket)
      .createSignedUrl(storagePath, 3600)  // valid for 1 hour

    if (signedError || !signedData?.signedUrl) {
      return NextResponse.json({ status: 'error', message: `Could not create signed URL: ${signedError?.message}` }, { status: 500 })
    }

    // HeyGen v3 avatars API — accepts a URL directly, no separate upload step needed
    const createRes  = await fetch('https://api.heygen.com/v3/avatars', {
      method:  'POST',
      headers: { 'X-Api-Key': apiKey, 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        type: 'photo',
        name: 'My Photo Avatar',
        file: { type: 'url', url: signedData.signedUrl },
      }),
    })

    const createText = await createRes.text()
    let createData
    try { createData = JSON.parse(createText) } catch { createData = {} }

    if (!createRes.ok) {
      console.error('[photo-avatar] HeyGen v3 response:', createRes.status, createText.slice(0, 500))
      return NextResponse.json({
        status:  'error',
        message: createData?.message || `HeyGen avatar creation failed (${createRes.status})`,
        heygen:  createText.slice(0, 300),
      }, { status: 500 })
    }

    // v3 response: { data: { avatar_item: { id, status }, avatar_group: { id } } }
    const avatarId = createData?.data?.avatar_item?.id || createData?.data?.id || createData?.avatar_id
    if (!avatarId) {
      return NextResponse.json({
        status:  'error',
        message: 'No avatar ID in HeyGen v3 response',
        heygen:  createText.slice(0, 300),
      }, { status: 500 })
    }

    return NextResponse.json({ status: 'success', avatarId, processing: createData?.data?.avatar_item?.status === 'processing' })

  } catch (err) {
    console.error('[photo-avatar] fatal:', err)
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
