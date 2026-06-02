import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { makeRouteLogger } from '../../../../lib/edit-studio/apiLogger.js'
import {
  validateRenderPlan,
  buildFfmpegCommand,
  buildRenderJobRecord,
  buildRenderJobUpdate,
  checkFfmpegAvailability,
  executeRenderJob,
} from '../../../../lib/edit-studio/renderEngine.js'

// 60-second function timeout — maximum for Vercel Pro.
// For local dev with FFmpeg, short clips will complete within this window.
export const maxDuration = 60

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

// ─── Job helpers ──────────────────────────────────────────────────────────────

async function updateJobStatus(supabase, jobId, userId, status, extra = {}) {
  const payload = { status, ...extra }
  // Stamp lifecycle timestamps
  if (status === 'processing') payload.processing_started_at = new Date().toISOString()
  if (status === 'failed')     payload.failed_at             = new Date().toISOString()
  await supabase
    .from('edit_render_jobs')
    .update(payload)
    .eq('id', jobId)
    .eq('user_id', userId)
}

async function appendJobToProject(supabase, projectId, userId, jobSummary) {
  try {
    const { data } = await supabase
      .from('edit_projects')
      .select('render_jobs')
      .eq('id', projectId)
      .eq('user_id', userId)
      .single()

    const existing = data?.render_jobs || []
    const deduped  = existing.filter(j => j.id !== jobSummary.id)
    await supabase
      .from('edit_projects')
      .update({ render_jobs: [...deduped, jobSummary] })
      .eq('id', projectId)
      .eq('user_id', userId)
  } catch { /* non-fatal */ }
}

// ─── Route ────────────────────────────────────────────────────────────────────
// POST /api/edit-studio/render
// Creates a render job and attempts synchronous execution if FFmpeg is available.

export async function POST(req) {
  const admin    = makeAdmin()
  const supabase = await makeSupabase()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })
  }

  const log  = makeRouteLogger('render')
  let jobId  = null

  try {
    const body = await req.json()
    const { projectId, renderPlan } = body

    if (!renderPlan) {
      return NextResponse.json({
        status:  'error',
        message: 'No render plan provided. Run Prepare Render Plan first.',
      }, { status: 400 })
    }

    // ── Hard block: no sourceVideoUrl = no job ───────────────────────────────
    if (!renderPlan.sourceVideoUrl) {
      return NextResponse.json({
        status:  'error',
        message: 'No source video URL in render plan. Upload your source video to storage first (Export tab → Upload Source Video).',
      }, { status: 400 })
    }

    // ── Validate ─────────────────────────────────────────────────────────────
    const validation = validateRenderPlan(renderPlan)
    if (!validation.valid) {
      return NextResponse.json({
        status:  'error',
        message: 'Render plan has blocking issues',
        errors:  validation.errors,
      }, { status: 400 })
    }

    // ── Create job as queued ──────────────────────────────────────────────────
    const ffmpegCommandPreview = buildFfmpegCommand(renderPlan)
    const jobRecord            = buildRenderJobRecord(
      projectId || renderPlan.projectId,
      user.id,
      { ...renderPlan, ffmpegCommandPreview }
    )

    const { data: job, error: insertError } = await supabase
      .from('edit_render_jobs')
      .insert(jobRecord)
      .select('id, status, created_at')
      .single()

    if (insertError) {
      return NextResponse.json({ status: 'error', message: insertError.message }, { status: 500 })
    }
    jobId = job.id

    // ── Render mode: queue (default) vs inline ────────────────────────────────
    // EDIT_STUDIO_RENDER_MODE=inline  → attempt immediate FFmpeg (local dev / self-hosted)
    // EDIT_STUDIO_RENDER_MODE=queue   → always queue for worker (Vercel / production default)
    const renderMode      = process.env.EDIT_STUDIO_RENDER_MODE || 'queue'
    const ffmpegAvailable = renderMode === 'inline' ? await checkFfmpegAvailability() : false
    const useInline       = renderMode === 'inline' && ffmpegAvailable

    if (!useInline) {
      // Queue mode — worker picks it up from edit_render_jobs
      await appendJobToProject(supabase, projectId || renderPlan.projectId, user.id, {
        id: jobId, status: 'queued', createdAt: job.created_at,
      })
      const reason = renderMode === 'queue'
        ? 'EDIT_STUDIO_RENDER_MODE=queue — production render worker will process this job.'
        : 'FFmpeg not found on PATH — set EDIT_STUDIO_RENDER_MODE=inline and install FFmpeg to render here.'
      log.success({ projectId, extra: { jobId, jobStatus: 'queued', renderMode, ffmpegAvailable } })
      return NextResponse.json({
        status:          'success',
        ok:              true,
        jobId,
        jobStatus:       'queued',
        renderMode,
        ffmpegAvailable: renderMode === 'inline' ? ffmpegAvailable : undefined,
        message:         `Render job queued. ${reason}`,
        queuedAt:        job.created_at,
        warnings:        validation.warnings,
        ffmpegCommandPreview,
      })
    }

    // ── FFmpeg available — attempt synchronous render ─────────────────────────
    await updateJobStatus(supabase, jobId, user.id, 'processing')

    let exportUrl
    try {
      const result = await executeRenderJob(renderPlan, jobId, user.id, admin)
      exportUrl    = result.exportUrl
    } catch (renderErr) {
      // Render failed — update job, return structured error
      await updateJobStatus(supabase, jobId, user.id, 'failed', {
        error_message: renderErr.message,
      })
      await appendJobToProject(supabase, projectId || renderPlan.projectId, user.id, {
        id: jobId, status: 'failed', error: renderErr.message, createdAt: job.created_at,
      })
      return NextResponse.json({
        status:     'success',
        jobId,
        jobStatus:  'failed',
        errorMessage: renderErr.message,
        message:    `Render failed: ${renderErr.message}. Your render plan is intact — fix the issue and try again.`,
      })
    }

    // ── Success ───────────────────────────────────────────────────────────────
    const renderDetailsPayload = { ...renderDetails, completed_at: new Date().toISOString() }
    await updateJobStatus(supabase, jobId, user.id, 'completed', {
      export_url: exportUrl,
      render_details: renderDetailsPayload,
    })

    // Update project status to exported
    try {
      await supabase
        .from('edit_projects')
        .update({ status: 'exported' })
        .eq('id', projectId || renderPlan.projectId)
        .eq('user_id', user.id)
    } catch { /* non-fatal */ }

    await appendJobToProject(supabase, projectId || renderPlan.projectId, user.id, {
      id: jobId, status: 'completed', exportUrl, createdAt: job.created_at,
    })

    log.success({ projectId, extra: { jobId, jobStatus: 'completed', captionsRendered: renderDetails?.captionsRendered, musicRendered: renderDetails?.musicRendered } })
    return NextResponse.json({
      status:     'success',
      ok:         true,
      jobId,
      jobStatus:  'completed',
      exportUrl,
      renderDetails,
      ffmpegAvailable: true,
      message:    'Render complete. Your MP4 is ready for download.',
      warnings:   validation.warnings,
    })
  } catch (err) {
    // Unexpected error — update job if created
    if (jobId) {
      try {
        const supabase2 = await makeSupabase()
        await updateJobStatus(supabase2, jobId, user.id, 'failed', { error_message: err.message })
      } catch { /* swallow secondary error */ }
    }
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
