// ── Video Orchestration Layer ─────────────────────────────────────────────────
// Caller passes standard VideoParams → gets back VideoResult.
// Provider selection is automatic — callers never reference a specific provider.

import { getAvailableProviders, getProvider } from './providers.js'

/**
 * @typedef {Object} VideoParams
 * @property {string}  prompt        - The text prompt / cinematic direction
 * @property {string}  [imageUrl]    - Anchor image URL for image-to-video
 * @property {number}  [duration]    - Desired duration in seconds (5 or 10)
 * @property {string}  [ratio]       - '720:1280' (portrait) | '1280:720' (landscape)
 * @property {string}  [mode]        - Generation mode hint (director | product_ad | personal_brand_ad)
 * @property {string}  [preferredProvider] - Override: 'runway' | 'kling' | 'luma'
 * @property {string}  [capability]  - Required capability: 'image_to_video' | 'text_to_video'
 */

/**
 * @typedef {Object} VideoResult
 * @property {string}  videoUrl
 * @property {string|null} thumbnailUrl
 * @property {number}  duration
 * @property {string}  provider       - Which provider was actually used
 */

/**
 * Select the best available provider.
 * Priority: PREFERRED_VIDEO_PROVIDER env → preferredProvider param → first available
 */
export function selectProvider(preferredId, capability = 'text_to_video') {
  const available = getAvailableProviders().filter(p =>
    !capability || p.capabilities.includes(capability)
  )
  if (available.length === 0) return null

  // Env-level global preference
  const envPref = process.env.PREFERRED_VIDEO_PROVIDER
  if (envPref) {
    const envProvider = available.find(p => p.id === envPref)
    if (envProvider) return envProvider
  }

  // Request-level preference
  if (preferredId) {
    const reqProvider = available.find(p => p.id === preferredId)
    if (reqProvider) return reqProvider
  }

  return available[0]
}

/**
 * Generate a video through the best available provider.
 * Falls through to the next provider if the primary fails.
 */
export async function generateVideo(params) {
  const capability = params.imageUrl ? 'image_to_video' : 'text_to_video'
  const available  = getAvailableProviders().filter(p => p.capabilities.includes(capability))

  if (available.length === 0) {
    throw new Error('No video provider is configured. Set RUNWAYML_API_SECRET, KLING_API_KEY/KLING_API_SECRET, or LUMAAI_API_KEY.')
  }

  // Build ordered list: preferred first, then rest
  const preferred = selectProvider(params.preferredProvider, capability)
  const ordered = [preferred, ...available.filter(p => p.id !== preferred?.id)].filter(Boolean)

  let lastError = null
  for (const provider of ordered) {
    try {
      const result = await provider.generate({
        prompt:   params.prompt,
        imageUrl: params.imageUrl || null,
        duration: Math.min(params.duration || 5, provider.maxDuration),
        ratio:    params.ratio    || '720:1280',
        mode:     params.mode     || 'director',
      })
      return { ...result, provider: provider.id, providerName: provider.name }
    } catch (err) {
      console.error(`[video-orchestrator] ${provider.id} failed:`, err.message)
      lastError = err
      // Only fall through if there are more providers to try
    }
  }

  throw lastError || new Error('All video providers failed')
}

/**
 * Returns provider status for the UI — which are configured and which is active.
 */
export function getProviderStatus() {
  const available = getAvailableProviders()
  const active    = selectProvider(null)
  return {
    available: available.map(p => ({ id: p.id, name: p.name })),
    active:    active ? { id: active.id, name: active.name } : null,
    preferred: process.env.PREFERRED_VIDEO_PROVIDER || null,
  }
}
