import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export const maxDuration = 60

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


// POST /api/jarvis-studio/produce-status
// Body: { jobs }
// Returns: { jobs, overallStatus: 'in_progress' | 'complete' | 'failed', finalAd? }
export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { jobs } = await req.json()
    if (!jobs) return NextResponse.json({ error: 'jobs required' }, { status: 400 })

    const admin = makeAdmin()

    // Get user's API keys
    const { data: integrations } = await admin
      .from('user_integrations')
      .select('heygen_api_key, runway_api_key')
      .eq('user_id', user.id)
      .single()

    const heygenKey = integrations?.heygen_api_key
    const runwayKey = integrations?.runway_api_key

    const updatedJobs = { ...jobs }
    const updatedSceneJobs = [...(jobs.sceneJobs || [])]

    // 1. Check avatar status if still processing
    if (jobs.avatarStatus === 'processing' && jobs.avatarId && heygenKey) {
      try {
        const res = await fetch(`https://api.heygen.com/v1/avatar.get?avatar_id=${jobs.avatarId}`, {
          headers: { 'X-Api-Key': heygenKey },
        })
        const data = await res.json()
        const status = data?.data?.status
        if (status && status !== 'processing') {
          updatedJobs.avatarStatus = 'ready'
        }
      } catch {}
    }

    // 2. If avatar just became ready, start any queued heygen jobs
    if (updatedJobs.avatarStatus === 'ready' && jobs.avatarId && heygenKey) {
      for (let i = 0; i < updatedSceneJobs.length; i++) {
        const job = updatedSceneJobs[i]
        if (job.generator === 'heygen' && job.status === 'awaiting_avatar') {
          // We don't have the script here — return to frontend to re-call produce for these scenes
          // For now mark as 'starting' — the frontend should re-call produce with remaining scenes
          updatedSceneJobs[i] = { ...job, status: 'avatar_ready_needs_start' }
        }
      }
    }

    // 3. Poll HeyGen video status
    for (let i = 0; i < updatedSceneJobs.length; i++) {
      const job = updatedSceneJobs[i]
      if (job.generator === 'heygen' && job.status === 'generating' && job.videoId && heygenKey) {
        try {
          const res = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${job.videoId}`, {
            headers: { 'X-Api-Key': heygenKey },
          })
          const data = await res.json()
          const videoStatus = data?.data?.status
          const videoUrl    = data?.data?.video_url
          if (videoStatus === 'completed' && videoUrl) {
            updatedSceneJobs[i] = { ...job, status: 'complete', videoUrl }
          } else if (videoStatus === 'failed' || videoStatus === 'deleted') {
            updatedSceneJobs[i] = { ...job, status: 'error', error: 'HeyGen generation failed' }
          }
        } catch {}
      }
    }

    // 4. Poll Runway task status
    for (let i = 0; i < updatedSceneJobs.length; i++) {
      const job = updatedSceneJobs[i]
      if (job.generator === 'runway' && job.status === 'generating' && job.taskId && runwayKey) {
        try {
          const res = await fetch(`https://api.dev.runwayml.com/v1/tasks/${job.taskId}`, {
            headers: { Authorization: `Bearer ${runwayKey}`, 'X-Runway-Version': '2024-11-06' },
          })
          const data = await res.json()
          const taskStatus = data?.status
          if (taskStatus === 'SUCCEEDED') {
            const videoUrl = data?.output?.[0] || null
            updatedSceneJobs[i] = { ...job, status: 'complete', videoUrl }
          } else if (taskStatus === 'FAILED' || taskStatus === 'CANCELLED') {
            updatedSceneJobs[i] = { ...job, status: 'error', error: `Runway ${taskStatus}` }
          }
        } catch {}
      }
    }

    updatedJobs.sceneJobs = updatedSceneJobs

    // 5. Determine overall status
    const activeScenesTotal = updatedSceneJobs.filter(j => !['skipped', 'skipped_no_key'].includes(j.status)).length
    const completedScenes   = updatedSceneJobs.filter(j => j.status === 'complete').length
    const errorScenes       = updatedSceneJobs.filter(j => j.status === 'error').length
    const allScenesResolved = completedScenes + errorScenes >= activeScenesTotal

    let overallStatus = 'in_progress'
    if (allScenesResolved && completedScenes > 0) {
      overallStatus = 'complete'
    } else if (allScenesResolved && completedScenes === 0) {
      overallStatus = 'failed'
    }

    const response = { status: 'success', jobs: updatedJobs, overallStatus }

    if (overallStatus === 'complete') {
      const completedClips = updatedSceneJobs
        .filter(j => j.status === 'complete' && j.videoUrl)
        .map(j => j.videoUrl)
      response.finalAd = {
        exportUrl:  completedClips[0] || null,
        clips:      completedClips,
        conceptId:  jobs.conceptId,
        sceneCount: completedScenes,
        musicUsed:  !!jobs.musicUrl,
      }
    }

    return NextResponse.json(response)

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
