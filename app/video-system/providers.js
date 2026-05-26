// ── Video Provider Registry ───────────────────────────────────────────────────
// Each provider implements: generate(params) → { videoUrl, thumbnailUrl, duration, provider }
// Add new providers here — orchestrator picks up automatically via env vars.

import { createHmac } from 'crypto'
import RunwayML from '@runwayml/sdk'

// ── Runway ML ─────────────────────────────────────────────────────────────────
async function runwayGenerate({ prompt, imageUrl, duration, ratio, mode }) {
  const apiKey = process.env.RUNWAYML_API_SECRET
  if (!apiKey) throw new Error('RUNWAYML_API_SECRET not configured')

  const client = new RunwayML({ apiKey })

  const params = {
    model: 'gen4_turbo',
    promptText: prompt,
    ratio: ratio || '720:1280',
    duration: duration || 5,
  }
  if (imageUrl) params.promptImage = imageUrl

  const task = await client.imageToVideo.create(params)

  let result = task
  let attempts = 0
  while (result.status !== 'SUCCEEDED' && attempts < 60) {
    if (result.status === 'FAILED') throw new Error('Runway: generation failed')
    await new Promise(r => setTimeout(r, 5000))
    result = await client.tasks.retrieve(task.id)
    attempts++
  }

  if (result.status !== 'SUCCEEDED') throw new Error('Runway: generation timed out')
  const videoUrl = result.output?.[0]
  if (!videoUrl) throw new Error('Runway: no video returned')
  return { videoUrl, thumbnailUrl: null, duration, provider: 'runway' }
}

// ── Kling ─────────────────────────────────────────────────────────────────────
function klingJWT() {
  const apiKey    = process.env.KLING_API_KEY    || ''
  const apiSecret = process.env.KLING_API_SECRET || ''
  const now = Math.floor(Date.now() / 1000)
  const header  = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')
  const payload = Buffer.from(JSON.stringify({ iss: apiKey, exp: now + 1800, nbf: now - 5 })).toString('base64url')
  const sig = createHmac('sha256', apiSecret).update(`${header}.${payload}`).digest('base64url')
  return `${header}.${payload}.${sig}`
}

async function klingGenerate({ prompt, imageUrl, duration, ratio, mode }) {
  const apiKey    = process.env.KLING_API_KEY    || ''
  const apiSecret = process.env.KLING_API_SECRET || ''
  if (!apiKey || !apiSecret) throw new Error('KLING_API_KEY / KLING_API_SECRET not configured')

  const jwt     = klingJWT()
  const baseUrl = 'https://api.klingai.com/v1'
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt}` }

  // Text-to-video or image-to-video
  const endpoint = imageUrl
    ? `${baseUrl}/videos/image2video`
    : `${baseUrl}/videos/text2video`

  const body = imageUrl
    ? { model_name: 'kling-v1-5', image: imageUrl, prompt, duration: duration || 5, aspect_ratio: ratio === '1280:720' ? '16:9' : '9:16' }
    : { model_name: 'kling-v1-5', prompt, duration: duration || 5, aspect_ratio: ratio === '1280:720' ? '16:9' : '9:16' }

  const createRes = await fetch(endpoint, { method: 'POST', headers, body: JSON.stringify(body) })
  const createData = await createRes.json()
  const taskId = createData?.data?.task_id
  if (!taskId) throw new Error(`Kling: failed to create task — ${JSON.stringify(createData)}`)

  const pollEndpoint = imageUrl
    ? `${baseUrl}/videos/image2video/${taskId}`
    : `${baseUrl}/videos/text2video/${taskId}`

  let attempts = 0
  while (attempts < 60) {
    await new Promise(r => setTimeout(r, 5000))
    const pollRes  = await fetch(pollEndpoint, { headers: { Authorization: `Bearer ${klingJWT()}` } })
    const pollData = await pollRes.json()
    const status   = pollData?.data?.task_status
    if (status === 'succeed') {
      const videoUrl = pollData?.data?.task_result?.videos?.[0]?.url
      if (!videoUrl) throw new Error('Kling: no video URL in result')
      return { videoUrl, thumbnailUrl: pollData?.data?.task_result?.videos?.[0]?.cover_image_url || null, duration, provider: 'kling' }
    }
    if (status === 'failed') throw new Error(`Kling: task failed — ${pollData?.data?.task_status_msg || ''}`)
    attempts++
  }
  throw new Error('Kling: generation timed out')
}

// ── Luma Dream Machine ────────────────────────────────────────────────────────
async function lumaGenerate({ prompt, imageUrl, duration, ratio, mode }) {
  const apiKey = process.env.LUMAAI_API_KEY || ''
  if (!apiKey) throw new Error('LUMAAI_API_KEY not configured')

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` }
  const aspectRatio = ratio === '1280:720' ? '16:9' : '9:16'

  const body = {
    prompt,
    aspect_ratio: aspectRatio,
    loop: false,
  }
  if (imageUrl) {
    body.keyframes = { frame0: { type: 'image', url: imageUrl } }
  }

  const createRes  = await fetch('https://api.lumalabs.ai/dream-machine/v1/generations', { method: 'POST', headers, body: JSON.stringify(body) })
  const createData = await createRes.json()
  const genId = createData?.id
  if (!genId) throw new Error(`Luma: failed to create generation — ${JSON.stringify(createData)}`)

  let attempts = 0
  while (attempts < 60) {
    await new Promise(r => setTimeout(r, 5000))
    const pollRes  = await fetch(`https://api.lumalabs.ai/dream-machine/v1/generations/${genId}`, { headers: { Authorization: `Bearer ${apiKey}` } })
    const pollData = await pollRes.json()
    const state    = pollData?.state
    if (state === 'completed') {
      const videoUrl = pollData?.assets?.video
      if (!videoUrl) throw new Error('Luma: no video URL in result')
      return { videoUrl, thumbnailUrl: pollData?.assets?.image || null, duration, provider: 'luma' }
    }
    if (state === 'failed') throw new Error(`Luma: generation failed — ${pollData?.failure_reason || ''}`)
    attempts++
  }
  throw new Error('Luma: generation timed out')
}

// ── Provider Registry ─────────────────────────────────────────────────────────
export const PROVIDERS = {
  runway: {
    id:           'runway',
    name:         'Runway Gen-4',
    envKeys:      ['RUNWAYML_API_SECRET'],
    capabilities: ['image_to_video', 'text_to_video'],
    maxDuration:  10,
    generate:     runwayGenerate,
  },
  kling: {
    id:           'kling',
    name:         'Kling v1.5',
    envKeys:      ['KLING_API_KEY', 'KLING_API_SECRET'],
    capabilities: ['image_to_video', 'text_to_video'],
    maxDuration:  10,
    generate:     klingGenerate,
  },
  luma: {
    id:           'luma',
    name:         'Luma Dream Machine',
    envKeys:      ['LUMAAI_API_KEY'],
    capabilities: ['image_to_video', 'text_to_video'],
    maxDuration:  9,
    generate:     lumaGenerate,
  },
}

export function getAvailableProviders() {
  return Object.values(PROVIDERS).filter(p =>
    p.envKeys.every(k => !!process.env[k])
  )
}

export function getProvider(id) {
  return PROVIDERS[id] || null
}
