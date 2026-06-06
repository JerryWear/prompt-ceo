import { NextResponse }        from 'next/server'
import { createServerClient }  from '@supabase/ssr'
import { createClient }        from '@supabase/supabase-js'
import { cookies }             from 'next/headers'

export const maxDuration = 10

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

// GET /api/edit-studio/jarvis-status?jobId=...
// Returns the current status of a Railway render job.
export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const jobId = searchParams.get('jobId')
  if (!jobId) return NextResponse.json({ status: 'error', message: 'jobId required' }, { status: 400 })

  try {
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const admin = makeAdmin()
    const { data: job, error } = await admin
      .from('edit_render_jobs')
      .select('id, status, export_url, error_message, render_details, updated_at')
      .eq('id', jobId)
      .single()

    if (error || !job) {
      return NextResponse.json({ status: 'error', message: error?.message || 'Job not found' }, { status: 404 })
    }

    return NextResponse.json({
      status:      'success',
      jobStatus:   job.status,          // 'queued' | 'processing' | 'completed' | 'failed'
      exportUrl:   job.export_url,      // signed URL when completed
      error:       job.error_message,
      stage:       job.render_details?.stage,
      updatedAt:   job.updated_at,
    })

  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
