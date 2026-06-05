import { NextResponse } from 'next/server'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { validateRenderPlan, buildFfmpegCommand, buildRenderJobRecord } from '../../../../lib/edit-studio/renderEngine.js'

const PLATFORM_RESOLUTION = {
  tiktok:    { resolution: '1080x1920', aspectRatio: '9:16', fps: 30 },
  instagram: { resolution: '1080x1920', aspectRatio: '9:16', fps: 30 },
  youtube:   { resolution: '1080x1920', aspectRatio: '9:16', fps: 30 },
  linkedin:  { resolution: '1920x1080', aspectRatio: '16:9', fps: 30 },
  meta:      { resolution: '1080x1080', aspectRatio: '1:1',  fps: 30 },
}

const GOAL_TO_CAMPAIGN_PHASE = {
  founder: 'awareness', demo: 'consideration', tutorial: 'nurture',
  launch: 'conversion', ugc: 'awareness', edu: 'awareness',
}

async function makeSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
}

function makeAdmin() {
  return createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

// POST /api/edit-studio/render-batch
// Creates one render job per requested platform variant.
// Input: { projectId, baseRenderPlan, platforms: ['tiktok','instagram','linkedin','meta'] }
// Returns: { jobs: [{ platform, jobId, jobStatus }], errors: [] }
export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const body = await req.json()
    const { projectId, baseRenderPlan, platforms } = body

    if (!baseRenderPlan) return NextResponse.json({ status: 'error', message: 'baseRenderPlan required' }, { status: 400 })
    if (!Array.isArray(platforms) || !platforms.length) return NextResponse.json({ status: 'error', message: 'platforms array required' }, { status: 400 })
    if (!baseRenderPlan.sourceVideoUrl) return NextResponse.json({ status: 'error', message: 'No sourceVideoUrl in render plan' }, { status: 400 })

    const admin    = makeAdmin()
    const batchId  = crypto.randomUUID()
    const jobs     = []
    const errors   = []
    const goal     = baseRenderPlan.goal || null
    const campaignPhase = goal ? (GOAL_TO_CAMPAIGN_PHASE[goal] || 'awareness') : null

    for (const platform of platforms) {
      const meta = PLATFORM_RESOLUTION[platform]
      if (!meta) { errors.push(`Unknown platform: ${platform}`); continue }

      // Build variant: same plan, platform-specific resolution + fps
      const variantPlan = {
        ...baseRenderPlan,
        platform,
        resolution:  meta.resolution,
        aspectRatio: meta.aspectRatio,
        fps:         meta.fps,
      }

      const validation = validateRenderPlan(variantPlan)
      if (!validation.valid) { errors.push(`${platform}: ${validation.errors.join(', ')}`); continue }

      const ffmpegCommandPreview = buildFfmpegCommand(variantPlan)
      const jobRecord            = buildRenderJobRecord(projectId, user.id, { ...variantPlan, ffmpegCommandPreview })

      const { data: job, error: insertErr } = await admin
        .from('edit_render_jobs')
        .insert({ ...jobRecord, batch_id: batchId })
        .select('id, status, created_at')
        .single()

      if (insertErr) { errors.push(`${platform}: ${insertErr.message}`); continue }

      jobs.push({ platform, jobId: job.id, jobStatus: job.status, queuedAt: job.created_at })

      // Emit video_generated signal per platform (non-fatal, fire-and-forget)
      supabase.from('signal_logs').insert({
        user_id:    user.id,
        project_id: projectId || null,
        event_type: 'video_generated',
        weight:     5,
        metadata:   {
          platform,
          goal,
          campaignPhase,
          videoLength:   baseRenderPlan.totalDuration || null,
          captionStyle:  baseRenderPlan.captionSettings?.style || null,
          musicTitle:    baseRenderPlan.music?.title || null,
          source:        'edit_studio_batch',
        },
      }).then(() => {}).catch(() => {})
    }

    // Append job summaries to project (non-fatal)
    if (jobs.length) {
      try {
        const { data: proj } = await supabase.from('edit_projects').select('render_jobs').eq('id', projectId).eq('user_id', user.id).single()
        const existing  = proj?.render_jobs || []
        const summaries = jobs.map(j => ({ id: j.jobId, platform: j.platform, status: j.jobStatus, batchId, createdAt: j.queuedAt }))
        await supabase.from('edit_projects').update({ render_jobs: [...existing, ...summaries] }).eq('id', projectId).eq('user_id', user.id)
      } catch { /* non-fatal */ }
    }

    return NextResponse.json({ status: 'success', batchId, jobs, errors: errors.length ? errors : undefined })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
