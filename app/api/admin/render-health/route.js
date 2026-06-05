import { NextResponse } from 'next/server'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { get: (n) => cookieStore.get(n)?.value, set() {}, remove() {} } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// GET /api/admin/render-health
// Returns real-time render infrastructure health: queue depth, active jobs,
// last success/failure timestamps. Admin-only.
export async function GET() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const admin = createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

    // Verify admin
    const { data: userRow } = await admin.from('app_users').select('is_admin').eq('id', user.id).single()
    if (!userRow?.is_admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    // Run all queries in parallel
    const [queuedResult, processingResult, lastCompleted, lastFailed, recentJobs] = await Promise.all([
      admin.from('edit_render_jobs').select('id', { count: 'exact', head: true }).eq('status', 'queued'),
      admin.from('edit_render_jobs').select('id', { count: 'exact', head: true }).eq('status', 'processing'),
      admin.from('edit_render_jobs').select('updated_at, render_details').eq('status', 'completed').order('updated_at', { ascending: false }).limit(1),
      admin.from('edit_render_jobs').select('updated_at, error_message').eq('status', 'failed').order('updated_at', { ascending: false }).limit(1),
      admin.from('edit_render_jobs').select('id, status, created_at, updated_at, render_details, error_message').order('created_at', { ascending: false }).limit(5),
    ])

    const queueSize    = queuedResult.count      || 0
    const activeJobs   = processingResult.count  || 0
    const lastSuccess  = lastCompleted.data?.[0] || null
    const lastFailure  = lastFailed.data?.[0]    || null
    const recent       = recentJobs.data          || []

    // Compute minutes since last success
    const now = Date.now()
    const lastSuccessMs = lastSuccess?.updated_at ? new Date(lastSuccess.updated_at).getTime() : null
    const sinceLastSuccess = lastSuccessMs ? Math.floor((now - lastSuccessMs) / 60000) : null

    // Determine health status
    let status = 'healthy'
    let statusMessage = 'Worker is processing normally.'

    if (queueSize > 10) {
      status = 'degraded'
      statusMessage = `Queue is backing up: ${queueSize} jobs waiting.`
    } else if (activeJobs === 0 && queueSize > 0) {
      status = 'degraded'
      statusMessage = 'Jobs queued but no worker is processing. Check Railway deployment.'
    } else if (sinceLastSuccess !== null && sinceLastSuccess > 60) {
      status = 'warning'
      statusMessage = `No successful render in ${sinceLastSuccess} minutes.`
    } else if (queueSize === 0 && activeJobs === 0) {
      status = 'idle'
      statusMessage = 'Worker is idle — no jobs queued.'
    }

    return NextResponse.json({
      status,
      statusMessage,
      queueSize,
      activeJobs,
      lastSuccess: lastSuccess ? {
        at: lastSuccess.updated_at,
        minutesAgo: sinceLastSuccess,
        details: lastSuccess.render_details,
      } : null,
      lastFailure: lastFailure ? {
        at:      lastFailure.updated_at,
        message: lastFailure.error_message,
      } : null,
      recentJobs: recent.map(j => ({
        id:        j.id,
        status:    j.status,
        createdAt: j.created_at,
        updatedAt: j.updated_at,
        error:     j.error_message || null,
        details:   j.render_details || null,
      })),
    })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
