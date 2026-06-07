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

// Try multiple HeyGen endpoints to check avatar status.
// Returns 'processing' | 'ready' | 'error' | 'unknown'
async function checkHeygenAvatarStatus(avatarId, heygenKey) {
  const endpoints = [
    `https://api.heygen.com/v1/avatar.get?avatar_id=${avatarId}`,
    `https://api.heygen.com/v2/avatar/${avatarId}`,
    `https://api.heygen.com/v3/photo_avatar/${avatarId}`,
  ]

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        headers: { 'X-Api-Key': heygenKey },
      })
      if (!res.ok) continue
      const data = await res.json()
      // Try multiple response shapes
      const status =
        data?.data?.status ||
        data?.data?.avatar_item?.status ||
        data?.status ||
        null

      if (!status) continue

      const s = status.toLowerCase()
      if (s === 'processing' || s === 'pending' || s === 'queued' || s === 'training') return 'processing'
      if (s === 'failed' || s === 'error' || s === 'deleted') return 'error'
      // Any other value (completed, ready, active, available, done, success) → ready
      return 'ready'
    } catch {}
  }

  return 'unknown'
}

// POST /api/jarvis-studio/produce-status
// Body: { jobs }
// Returns: { jobs, overallStatus: 'in_progress' | 'complete' | 'partial' | 'failed', finalAd? }
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

    const updatedJobs = { ...jobs, pollCount: (jobs.pollCount || 0) + 1 }
    const updatedSceneJobs = [...(jobs.sceneJobs || [])]

    // TIMEOUT: after 45 polls (~6 minutes), drain all stuck avatar jobs to error
    const AVATAR_POLL_TIMEOUT = 45
    const timedOut = updatedJobs.pollCount > AVATAR_POLL_TIMEOUT

    // 1. Check avatar status if still processing
    if (jobs.avatarStatus === 'processing' && jobs.avatarId && heygenKey) {
      if (timedOut) {
        updatedJobs.avatarStatus = 'error'
        updatedJobs.avatarError = 'Avatar creation timed out after 6 minutes'
      } else {
        const avatarReady = await checkHeygenAvatarStatus(jobs.avatarId, heygenKey)
        if (avatarReady === 'ready') {
          updatedJobs.avatarStatus = 'ready'
        } else if (avatarReady === 'error') {
          updatedJobs.avatarStatus = 'error'
          updatedJobs.avatarError = 'Avatar creation failed on HeyGen'
        }
        // 'processing' and 'unknown' → keep polling
      }
    }

    // 1b. Terminal avatar states → drain any stuck awaiting_avatar scenes to error
    if (['error', 'no_founder_image', 'no_key'].includes(updatedJobs.avatarStatus)) {
      for (let i = 0; i < updatedSceneJobs.length; i++) {
        const job = updatedSceneJobs[i]
        if (job.generator === 'heygen' && (job.status === 'awaiting_avatar' || job.status === 'avatar_ready_needs_start')) {
          updatedSceneJobs[i] = {
            ...job,
            status: 'error',
            error: updatedJobs.avatarError || `Avatar ${updatedJobs.avatarStatus}`,
          }
        }
      }
    }

    // 2. If avatar just became ready, start any queued heygen jobs
    if (updatedJobs.avatarStatus === 'ready' && jobs.avatarId && heygenKey) {
      for (let i = 0; i < updatedSceneJobs.length; i++) {
        const job = updatedSceneJobs[i]
        if (job.generator === 'heygen' && (job.status === 'awaiting_avatar' || job.status === 'avatar_ready_needs_start')) {
          try {
            const genBody = {
              video_inputs: [{
                character: { type: 'avatar', avatar_id: jobs.avatarId, avatar_style: 'normal' },
                voice: {
                  type: 'text',
                  input_text: job.script || 'Hello.',
                  speed: 1.0,
                },
                background: { type: 'color', value: '#0a0a0a' },
              }],
              dimension: { width: 1080, height: 1920 },
              test: false,
            }
            // Only add voice_id if we have one
            if (jobs.voiceId) genBody.video_inputs[0].voice.voice_id = jobs.voiceId

            const genRes = await fetch('https://api.heygen.com/v2/video/generate', {
              method: 'POST',
              headers: { 'X-Api-Key': heygenKey, 'Content-Type': 'application/json' },
              body: JSON.stringify(genBody),
            })
            const genData = await genRes.json()
            const videoId = genData?.data?.video_id
            if (videoId) {
              updatedSceneJobs[i] = { ...job, status: 'generating', videoId }
            } else {
              const errMsg = genData?.error?.message || genData?.message || JSON.stringify(genData).slice(0, 200)
              updatedSceneJobs[i] = { ...job, status: 'error', error: `HeyGen generate: ${errMsg}` }
            }
          } catch (e) {
            updatedSceneJobs[i] = { ...job, status: 'error', error: e.message }
          }
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
          } else if (videoStatus === 'failed' || videoStatus === 'deleted' || videoStatus === 'error') {
            const errMsg = data?.data?.error || 'HeyGen video generation failed'
            updatedSceneJobs[i] = { ...job, status: 'error', error: errMsg }
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
            const reason = data?.failure_code || data?.failure || data?.error?.message || taskStatus
            console.error('[produce-status] Runway task failed:', job.taskId, reason, JSON.stringify(data).slice(0, 300))
            updatedSceneJobs[i] = { ...job, status: 'error', error: `Runway: ${reason}` }
          }
        } catch (e) { console.error('[produce-status] Runway poll error:', e.message) }
      }
    }

    updatedJobs.sceneJobs = updatedSceneJobs

    // 5. Determine overall status
    // Skipped scenes don't count toward the total — they're intentionally excluded
    const SKIP_STATUSES = ['skipped', 'skipped_no_key']
    const activeScenes    = updatedSceneJobs.filter(j => !SKIP_STATUSES.includes(j.status))
    const activeScenesTotal = activeScenes.length
    const completedScenes   = updatedSceneJobs.filter(j => j.status === 'complete').length
    const errorScenes       = updatedSceneJobs.filter(j => j.status === 'error').length
    const allScenesResolved = activeScenesTotal === 0 || (completedScenes + errorScenes >= activeScenesTotal)

    let overallStatus = 'in_progress'
    if (allScenesResolved) {
      if (completedScenes > 0) {
        // Some completed — call it a win (even if others errored)
        overallStatus = errorScenes > 0 ? 'partial' : 'complete'
      } else {
        overallStatus = 'failed'
      }
    }

    const response = { status: 'success', jobs: updatedJobs, overallStatus }

    if (overallStatus === 'complete' || overallStatus === 'partial') {
      const completedClips = updatedSceneJobs
        .filter(j => j.status === 'complete' && j.videoUrl)
        .map(j => ({ sceneId: j.sceneId, videoUrl: j.videoUrl }))

      response.finalAd = {
        clips:       completedClips,
        exportUrl:   completedClips[0]?.videoUrl || null,
        conceptId:   jobs.conceptId,
        sceneCount:  completedScenes,
        totalScenes: activeScenesTotal,
        musicUsed:   !!jobs.musicUrl,
        partial:     overallStatus === 'partial',
      }
    }

    return NextResponse.json(response)

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
