import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const maxDuration = 300

async function makeSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
}

// Strip anything DALL-E 3 rejects: real people, named brands, violence, real faces.
// The GPT-generated dalle_prompt often includes "person", "founder", brand names, etc.
// We replace it with a safe abstract prompt that still captures the scene mood.
function buildSafePrompt(scene) {
  const label = (scene.label || 'Scene').toLowerCase()
  // dalle_prompt is more image-generation-ready than visual_direction — prefer it
  const direction = (scene.dalle_prompt || scene.visual_direction || '').slice(0, 400)

  // Strip only explicit people/face/person words — keep all brand/product context
  const safe = direction
    .replace(/\b(person|people|man|woman|human|face|portrait|smil\w*|testimonial|candid|interview|talking head|looking at camera)\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim()

  // Use the brand-specific content from the storyboard prompt — never replace it with generic text
  return `${safe || `Cinematic vertical advertisement frame, ${label} scene`}. No people, no faces, no logos, vertical 9:16 format.`
}

async function generatePreviewImage(scene) {
  const prompt = buildSafePrompt(scene)
  const xaiKey = String(process.env.XAI_API_KEY || '').replace(/^Bearer\s+/i, '')
  if (!xaiKey) throw new Error('XAI_API_KEY not configured')

  const res = await fetch('https://api.x.ai/v1/images/generations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${xaiKey}` },
    body: JSON.stringify({ model: 'grok-imagine-image-quality', prompt, aspect_ratio: '9:16' }),
  })
  const data = await res.json()

  if (!res.ok) {
    const errMsg = data.error?.message || `xAI ${res.status}`
    console.error('[preview-scenes] xAI error:', errMsg, '| prompt:', prompt.slice(0, 100))
    throw new Error(errMsg)
  }

  const url = data.data?.[0]?.url || data.images?.[0]?.url || data.url
  if (!url) throw new Error('xAI returned no URL')
  return url
}

// POST /api/jarvis-studio/preview-scenes
// Body: { scenes: [{ id, dalle_prompt, visual_direction, label }] }
// Returns: { status, previews: [{ id, imageUrl, error? }] }
export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    if (!process.env.XAI_API_KEY) {
      return NextResponse.json({ error: 'XAI_API_KEY not configured' }, { status: 500 })
    }

    const { scenes } = await req.json()
    if (!Array.isArray(scenes) || scenes.length === 0) {
      return NextResponse.json({ error: 'scenes array required' }, { status: 400 })
    }

    // Generate one at a time. Each DALL-E 3 call takes ~10-15s so sequential calls
    // naturally stay under the 5 RPM rate limit without artificial sleeps.
    const previews = []
    for (const scene of scenes) {
      try {
        const imageUrl = await generatePreviewImage(scene)
        previews.push({ id: scene.id, imageUrl })
      } catch (e) {
        console.error('[preview-scenes] scene', scene.id, 'failed:', e.message)
        previews.push({ id: scene.id, imageUrl: null, error: e.message })
      }
    }

    const loaded = previews.filter(p => p.imageUrl).length
    console.log(`[preview-scenes] ${loaded}/${previews.length} images generated`)

    return NextResponse.json({ status: 'success', previews, loaded, total: previews.length })

  } catch (err) {
    console.error('[preview-scenes] route error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
