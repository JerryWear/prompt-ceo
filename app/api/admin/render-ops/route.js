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

// GET /api/admin/render-ops
// Returns render operations statistics: counts by status, avg duration,
// recent failures with error details. Admin-only.
export async function GET() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const admin = createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

    const { data: userRow } = await admin.from('app_users').select('is_admin').eq('id', user.id).single()
    if (!userRow?.is_admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const [queued, processing, completed, failed, recent] = await Promise.all([
      admin.from('edit_render_jobs').select('id', { count: 'exact', head: true }).eq('status', 'queued'),
      admin.from('edit_render_jobs').select('id', { count: 'exact', head: true }).eq('status', 'processing'),
      admin.from('edit_render_jobs').select('id, created_at, updated_at, render_details').eq('status', 'completed').order('updated_at', { ascending: false }).limit(100),
      admin.from('edit_render_jobs').select('id, created_at, updated_at, error_message, render_details, render_plan').eq('status', 'failed').order('updated_at', { ascending: false }).limit(20),
      admin.from('edit_render_jobs').select('id, status, user_id, created_at, updated_at, render_plan, render_details, error_message').order('created_at', { ascending: false }).limit(20),
    ])

    // Compute average render duration from completed jobs that have timestamps
    const completedWithDuration = (completed.data || []).filter(j =>
      j.render_details?.completedAt && j.created_at
    )
    const avgDurationMs = completedWithDuration.length
      ? completedWithDuration.reduce((sum, j) => {
          const dur = new Date(j.render_details.completedAt).getTime() - new Date(j.created_at).getTime()
          return sum + dur
        }, 0) / completedWithDuration.length
      : null

    const avgDurationSeconds = avgDurationMs ? Math.round(avgDurationMs / 1000) : null

    return NextResponse.json({
      counts: {
        queued:     queued.count     || 0,
        processing: processing.count || 0,
        completed:  completed.data?.length || 0,
        failed:     failed.data?.length    || 0,
      },
      avgRenderSeconds: avgDurationSeconds,
      recentFailures: (failed.data || []).slice(0, 10).map(j => ({
        id:        j.id,
        createdAt: j.created_at,
        failedAt:  j.updated_at,
        error:     j.error_message,
        platform:  j.render_plan?.platform || null,
        retries:   j.render_details?.retryCount || 0,
      })),
      recentJobs: (recent.data || []).map(j => ({
        id:        j.id,
        status:    j.status,
        userId:    j.user_id?.slice(0, 8) + '…',
        platform:  j.render_plan?.platform || null,
        createdAt: j.created_at,
        updatedAt: j.updated_at,
        error:     j.error_message || null,
        stage:     j.render_details?.stage || null,
        retries:   j.render_details?.retryCount || 0,
      })),
    })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
