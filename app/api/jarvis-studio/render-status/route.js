import { NextResponse }      from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies }            from 'next/headers'

async function makeSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
}

// GET /api/jarvis-studio/render-status?jobId=<uuid>
// Returns: { status, exportUrl?, errorMessage? }
// status is one of: queued | processing | completed | failed
export async function GET(req) {
  const supabase = await makeSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const jobId = searchParams.get('jobId')
  if (!jobId) return NextResponse.json({ error: 'Missing jobId' }, { status: 400 })

  // RLS ensures users can only read their own rows
  const { data: job, error } = await supabase
    .from('jarvis_render_jobs')
    .select('status, export_url, error_message')
    .eq('id', jobId)
    .single()

  if (error || !job) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 })
  }

  return NextResponse.json({
    status:       job.status,
    exportUrl:    job.export_url     || null,
    errorMessage: job.error_message  || null,
  })
}
