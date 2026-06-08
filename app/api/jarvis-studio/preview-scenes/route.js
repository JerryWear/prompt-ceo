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

// ─── Brand Anchor Validation ─────────────────────────────────────────────────
// Checks if a scene's dalle_prompt is locked to the specific brand.
// If not, prepends brand anchors before sending to xAI — no extra AI call needed.

function extractShortName(productStr) {
  // "PromptCEO — AI Creative OS" → "PromptCEO"
  return (productStr || '').split(/[—.\n]/)[0].trim().slice(0, 40)
}

function validateAndAnchorPrompt(scene, brandContext) {
  const anchors    = scene.brand_anchors || []
  const brandCheck = scene.brand_check   || ''
  const raw        = scene.dalle_prompt  || scene.visual_direction || ''

  if (!brandContext?.productName) {
    // No brand context — can't validate, proceed as-is
    return { prompt: raw, anchored: false, reason: 'no brand context' }
  }

  const shortName = extractShortName(brandContext.productName)
  const text      = raw.toLowerCase()

  // Check brand presence
  const mentionsProduct  = shortName && text.includes(shortName.toLowerCase())
  const hasAnchors       = anchors.length > 0
  const checkIsSpecific  = brandCheck.length > 30 &&
    !/(any|generic|could be|competitor|other brand)/i.test(brandCheck)

  const isStrong = mentionsProduct || (hasAnchors && checkIsSpecific)

  if (isStrong) {
    console.log(`[preview] ✅ ${scene.id} brand strong`)
    if (anchors.length) console.log(`[preview]    anchors: [${anchors.join(' | ')}]`)
    if (brandCheck)     console.log(`[preview]    check:   "${brandCheck.slice(0, 100)}"`)
    return { prompt: raw, anchored: false, reason: 'already brand-specific' }
  }

  // Strengthen: prepend brand anchors to the prompt
  const anchorText = anchors.length > 0
    ? anchors.join(', ')
    : brandContext.keyMessages?.slice(0, 2).join(' | ') || shortName

  const styleHint = brandContext.style ? ` — ${brandContext.style.slice(0, 60)}` : ''
  const prefix    = `${shortName}${styleHint}: ${anchorText}. `
  const anchored  = `${prefix}${raw}`

  console.log(`[preview] ⚠️  ${scene.id} brand weak — anchoring`)
  console.log(`[preview]    brand_check: "${brandCheck.slice(0, 80) || '(none)'}"`)
  console.log(`[preview]    anchors:     [${anchors.join(' | ') || 'none'}]`)
  console.log(`[preview]    injected:    "${prefix.slice(0, 100)}"`)

  return { prompt: anchored, anchored: true, reason: 'weak brand anchor — strengthened' }
}

function buildFinalPrompt(scene, brandContext) {
  const { prompt } = validateAndAnchorPrompt(scene, brandContext)

  // Strip people/face words — xAI content policy
  const safe = prompt
    .replace(/\b(person|people|man|woman|human|face|portrait|smil\w*|testimonial|candid|interview|talking head|looking at camera)\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim()

  const final = `${safe || `Cinematic vertical advertisement frame, ${scene.label || 'scene'}`}. No people, no faces, vertical 9:16 format.`

  console.log(`[preview] ✦  ${scene.id} → xAI prompt: "${final.slice(0, 140)}"`)
  return final
}

async function generatePreviewImage(scene, brandContext) {
  const prompt = buildFinalPrompt(scene, brandContext)
  const xaiKey = String(process.env.XAI_API_KEY || '').replace(/^Bearer\s+/i, '')
  if (!xaiKey) throw new Error('XAI_API_KEY not configured')

  const res  = await fetch('https://api.x.ai/v1/images/generations', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${xaiKey}` },
    body:    JSON.stringify({ model: 'grok-imagine-image-quality', prompt, aspect_ratio: '9:16' }),
  })
  const data = await res.json()

  if (!res.ok) {
    const errMsg = data.error?.message || `xAI ${res.status}`
    console.error('[preview-scenes] xAI error:', errMsg, '| scene:', scene.id)
    throw new Error(errMsg)
  }

  const url = data.data?.[0]?.url || data.images?.[0]?.url || data.url
  if (!url) throw new Error('xAI returned no URL')
  return url
}

// POST /api/jarvis-studio/preview-scenes
// Body: {
//   scenes: [{ id, dalle_prompt, visual_direction, label, brand_anchors?, brand_check? }],
//   brandContext?: { productName, keyMessages, style }
// }
// Returns: { status, previews: [{ id, imageUrl, error?, anchored? }] }
export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    if (!process.env.XAI_API_KEY) {
      return NextResponse.json({ error: 'XAI_API_KEY not configured' }, { status: 500 })
    }

    const { scenes, brandContext } = await req.json()
    if (!Array.isArray(scenes) || scenes.length === 0) {
      return NextResponse.json({ error: 'scenes array required' }, { status: 400 })
    }

    if (brandContext?.productName) {
      console.log(`[preview-scenes] brand context: "${brandContext.productName}"`)
    }

    // Generate sequentially — each xAI call takes ~10-15s, naturally under rate limits.
    const previews = []
    for (const scene of scenes) {
      // Product Reality Engine: if scene has a real screenshot, use it directly — skip xAI entirely.
      if (scene.screenshotUrl) {
        console.log(`[preview] 📸 ${scene.id} real screenshot → skipping xAI: ${scene.screenshotUrl.slice(0, 80)}`)
        previews.push({ id: scene.id, imageUrl: scene.screenshotUrl, isReal: true })
        continue
      }

      try {
        const imageUrl = await generatePreviewImage(scene, brandContext)
        const { anchored } = validateAndAnchorPrompt(scene, brandContext)
        previews.push({ id: scene.id, imageUrl, anchored })
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
