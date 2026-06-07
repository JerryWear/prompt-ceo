import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
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

// Strip anything DALL-E 3 rejects: real people, named brands, violence, real faces.
// The GPT-generated dalle_prompt often includes "person", "founder", brand names, etc.
// We replace it with a safe abstract prompt that still captures the scene mood.
function buildSafePrompt(scene) {
  const label = (scene.label || 'Scene').toLowerCase()
  const direction = (scene.visual_direction || scene.dalle_prompt || '').slice(0, 200)

  // Extract mood/vibe words, strip people/brand references
  const safe = direction
    .replace(/\b(person|people|man|woman|founder|CEO|human|face|portrait|model|creator|professional|user|customer|client|brand|apple|google|meta|nike|[\w]+\.com)\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim()

  return `Cinematic vertical advertisement frame, ${label} scene concept. ${safe ? safe + '.' : ''} Abstract creative visualization, dramatic moody lighting, dark background, high contrast, no people, no faces, no text, no logos, photorealistic product aesthetic.`
}

async function generateDalleImage(scene) {
  const prompt = buildSafePrompt(scene)

  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({ model: 'dall-e-3', prompt, n: 1, size: '1024x1792', quality: 'standard' }),
  })
  const data = await res.json()

  if (!res.ok) {
    const errMsg = data.error?.message || `DALL-E ${res.status}`
    console.error('[preview-scenes] DALL-E error:', errMsg, '| prompt:', prompt.slice(0, 100))
    throw new Error(errMsg)
  }

  const url = data.data?.[0]?.url
  if (!url) throw new Error('DALL-E returned no URL')
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

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 })
    }

    const { scenes } = await req.json()
    if (!Array.isArray(scenes) || scenes.length === 0) {
      return NextResponse.json({ error: 'scenes array required' }, { status: 400 })
    }

    // Generate one at a time to avoid rate limits (DALL-E 3: 5 RPM on most tiers)
    const previews = []
    for (const scene of scenes) {
      try {
        const imageUrl = await generateDalleImage(scene)
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
