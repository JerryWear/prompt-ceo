import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export const maxDuration = 120

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

// POST /api/jarvis-studio/produce
// Body: { concept, assets, scenePreviews?, musicTrackId?, musicUrl? }
// Returns: { jobs: { avatarId?, avatarStatus, sceneJobs, musicUrl, conceptId } }
export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { concept, assets, scenePreviews = {}, musicTrackId, musicUrl } = await req.json()
    if (!concept?.scenes?.length) return NextResponse.json({ error: 'concept with scenes required' }, { status: 400 })

    const admin = makeAdmin()

    // Get user's API keys
    const { data: integrations } = await admin
      .from('user_integrations')
      .select('heygen_api_key, runway_api_key')
      .eq('user_id', user.id)
      .single()

    const heygenKey = integrations?.heygen_api_key
    const runwayKey = integrations?.runway_api_key

    const heygenScenes = concept.scenes.filter(s => s.generator === 'heygen' && s.script)
    const runwayScenes = concept.scenes.filter(s => s.generator === 'runway')

    let avatarId   = null
    let avatarStatus = 'not_needed'

    // Create HeyGen photo avatar if founder image provided
    if (heygenScenes.length > 0 && assets?.founderStoragePath) {
      if (!heygenKey) {
        avatarStatus = 'no_key'
      } else {
        try {
          const { data: signedData } = await admin.storage
            .from(assets.founderBucket || 'edit-studio-exports')
            .createSignedUrl(assets.founderStoragePath, 3600)

          const signedUrl = signedData?.signedUrl
          if (!signedUrl) throw new Error('Could not create signed URL for founder image')

          const avatarRes = await fetch('https://api.heygen.com/v3/avatars', {
            method: 'POST',
            headers: { 'X-Api-Key': heygenKey, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'photo',
              name: `jarvis_${concept.id}_${Date.now()}`,
              file: { type: 'url', url: signedUrl },
            }),
          })
          const avatarData = await avatarRes.json()
          avatarId = avatarData?.data?.avatar_item?.id || avatarData?.data?.id
          if (avatarId) {
            avatarStatus = avatarData?.data?.avatar_item?.status === 'processing' ? 'processing' : 'ready'
          } else {
            console.error('HeyGen avatar: no ID returned', JSON.stringify(avatarData).slice(0, 300))
            avatarStatus = 'error'
          }
        } catch (e) {
          console.error('HeyGen avatar creation error:', e.message)
          avatarStatus = 'error'
        }
      }
    } else if (heygenScenes.length > 0) {
      avatarStatus = 'no_founder_image'
    }

    // Get HeyGen voice
    let voiceId = null
    if (heygenKey && heygenScenes.length > 0) {
      try {
        const voiceRes = await fetch('https://api.heygen.com/v2/voices', {
          headers: { 'X-Api-Key': heygenKey },
        })
        const voiceData = await voiceRes.json()
        const voices = (voiceData?.data?.voices || []).filter(v => v.language === 'English' || v.locale?.startsWith('en'))
        voiceId = voices[0]?.voice_id || null
      } catch {}
    }

    // Start scene jobs
    const sceneJobs = []

    for (const scene of concept.scenes) {
      if (scene.generator === 'heygen') {
        if (!heygenKey || !avatarId || avatarStatus === 'error') {
          sceneJobs.push({ sceneId: scene.id, generator: 'heygen', status: avatarStatus === 'processing' ? 'awaiting_avatar' : 'skipped', videoId: null, videoUrl: null })
          continue
        }
        if (avatarStatus === 'processing') {
          sceneJobs.push({ sceneId: scene.id, generator: 'heygen', status: 'awaiting_avatar', script: scene.script || '', videoId: null, videoUrl: null })
          continue
        }
        // Avatar ready — start video generation
        try {
          const genRes = await fetch('https://api.heygen.com/v2/video/generate', {
            method: 'POST',
            headers: { 'X-Api-Key': heygenKey, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              video_inputs: [{
                character: { type: 'avatar', avatar_id: avatarId, avatar_style: 'normal' },
                voice: { type: 'text', input_text: scene.script, voice_id: voiceId, speed: 1.0 },
                background: { type: 'color', value: '#0a0a0a' },
              }],
              dimension: { width: 1080, height: 1920 },
              test: false,
            }),
          })
          const genData = await genRes.json()
          const videoId = genData?.data?.video_id
          sceneJobs.push({ sceneId: scene.id, generator: 'heygen', status: videoId ? 'generating' : 'error', videoId: videoId || null, videoUrl: null })
        } catch (e) {
          sceneJobs.push({ sceneId: scene.id, generator: 'heygen', status: 'error', videoId: null, videoUrl: null, error: e.message })
        }
      } else if (scene.generator === 'runway') {
        if (!runwayKey) {
          sceneJobs.push({ sceneId: scene.id, generator: 'runway', status: 'skipped_no_key', taskId: null, videoUrl: null })
          continue
        }
        try {
          const previewUrl = scenePreviews[scene.id] || null
          const runwayBody = {
            model: 'gen4_turbo',
            promptText: scene.visual_direction || scene.dalle_prompt,
            ratio: '720:1280',
            duration: Math.min(Math.max(scene.duration || 5, 5), 10),
          }
          if (previewUrl) runwayBody.promptImage = previewUrl

          const runRes = await fetch('https://api.dev.runwayml.com/v1/image_to_video', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${runwayKey}`,
              'Content-Type': 'application/json',
              'X-Runway-Version': '2024-11-06',
            },
            body: JSON.stringify(runwayBody),
          })
          const runData = await runRes.json()
          const taskId = runData?.id
          sceneJobs.push({ sceneId: scene.id, generator: 'runway', status: taskId ? 'generating' : 'error', taskId: taskId || null, videoUrl: null })
        } catch (e) {
          sceneJobs.push({ sceneId: scene.id, generator: 'runway', status: 'error', taskId: null, videoUrl: null, error: e.message })
        }
      }
    }

    // Resolve music URL from library track if needed
    let resolvedMusicUrl = musicUrl || null
    if (musicTrackId && !resolvedMusicUrl) {
      const { data: track } = await admin.from('music_tracks').select('preview_url').eq('id', musicTrackId).single()
      if (track?.preview_url) resolvedMusicUrl = track.preview_url
    }

    const jobs = {
      conceptId:    concept.id,
      conceptTitle: concept.title,
      avatarId,
      avatarStatus,
      voiceId,
      heygenKey:    heygenKey ? 'present' : 'missing',
      runwayKey:    runwayKey ? 'present' : 'missing',
      sceneJobs,
      musicUrl:     resolvedMusicUrl,
      assemblyJobId:  null,
      assemblyStatus: null,
    }

    return NextResponse.json({ status: 'success', jobs })

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
