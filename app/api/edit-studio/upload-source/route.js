import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

// ─── Supabase helpers ─────────────────────────────────────────────────────────

async function makeSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
      },
    }
  )
}

function makeAdmin() {
  return createAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

// ─── Route ────────────────────────────────────────────────────────────────────
// POST /api/edit-studio/upload-source
// Returns a signed upload URL so the browser can PUT the video directly to
// Supabase Storage without routing through a serverless function.
//
// Body: { projectId, fileName, fileSize, mimeType }
// Returns: { signedUrl, token, path, publicUrl }

export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })
    }

    const body = await req.json()
    const { projectId, fileName, fileSize, mimeType } = body

    // Validate file size (2 GB max)
    if (fileSize && fileSize > 2 * 1024 * 1024 * 1024) {
      return NextResponse.json({ status: 'error', message: 'File exceeds 2 GB limit' }, { status: 413 })
    }

    // Build storage path: edit-studio-assets/{userId}/{projectId}/{fileName}
    const safeName = (fileName || 'source.mp4').replace(/[^a-zA-Z0-9._-]/g, '_')
    const storagePath = `${user.id}/${projectId || 'unknown'}/${safeName}`

    // Create signed upload URL using service role (bypasses RLS for the presign)
    const admin = makeAdmin()
    const { data, error } = await admin.storage
      .from('edit-studio-assets')
      .createSignedUploadUrl(storagePath)

    if (error) {
      return NextResponse.json({ status: 'error', message: error.message }, { status: 500 })
    }

    // Derive the public URL for the file (will be accessible after upload)
    const { data: urlData } = admin.storage
      .from('edit-studio-assets')
      .getPublicUrl(storagePath)

    // Update edit_projects.source_video_url (non-fatal)
    if (projectId) {
      try {
        await supabase
          .from('edit_projects')
          .update({ source_video_url: urlData.publicUrl })
          .eq('id', projectId)
          .eq('user_id', user.id)
      } catch { /* non-fatal */ }
    }

    return NextResponse.json({
      status:     'success',
      signedUrl:  data.signedUrl,
      token:      data.token,
      path:       storagePath,
      publicUrl:  urlData.publicUrl,
    })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
