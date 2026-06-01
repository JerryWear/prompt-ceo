import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

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
// GET /api/edit-studio/render-status?jobId=<uuid>
// Returns current status and export URL for a render job.
// Used by the frontend polling loop (every 3s while status is queued/processing).

export async function GET(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const jobId = searchParams.get('jobId')

    if (!jobId) {
      return NextResponse.json({ status: 'error', message: 'jobId is required' }, { status: 400 })
    }

    const { data: job, error } = await supabase
      .from('edit_render_jobs')
      .select('id, status, export_url, error_message, updated_at, render_plan, render_details')
      .eq('id', jobId)
      .eq('user_id', user.id)
      .single()

    if (error || !job) {
      return NextResponse.json({ status: 'error', message: 'Job not found' }, { status: 404 })
    }

    // If job is completed and we have an export_url, refresh the signed URL
    let exportUrl = job.export_url
    if (job.status === 'completed' && exportUrl) {
      try {
        // Re-issue a fresh signed URL (original may be expiring)
        // Extract the storage path from the existing URL or reconstruct it
        const plan        = job.render_plan || {}
        const storagePath = `${user.id}/${plan.projectId || 'unknown'}/${jobId}.mp4`
        const admin       = makeAdmin()
        const { data: signed } = await admin.storage
          .from('edit-studio-exports')
          .createSignedUrl(storagePath, 3600)
        if (signed?.signedUrl) exportUrl = signed.signedUrl
      } catch { /* use stored URL as fallback */ }
    }

    return NextResponse.json({
      status:        'success',
      jobId:         job.id,
      jobStatus:     job.status,
      exportUrl,
      errorMessage:  job.error_message || null,
      renderDetails: job.render_details || null,
      updatedAt:     job.updated_at,
    })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
