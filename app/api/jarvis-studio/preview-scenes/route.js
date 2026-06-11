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

  const styleHint  = brandContext.visualDNA
    ? ` — ${brandContext.visualDNA.slice(0, 120)}`
    : brandContext.style
      ? ` — ${brandContext.style.slice(0, 60)}`
      : ''
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

// ── SVG scene placeholder — loads instantly, never fails ─────────────────────
function xmlEsc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
function buildScenePlaceholder(scene) {
  const accent = { Hook:'#c8a84b', Problem:'#c07070', Solution:'#70c090', Transformation:'#7090c8', CTA:'#c870a8' }[scene.label] || '#555'
  const label  = xmlEsc((scene.label || 'SCENE').toUpperCase())
  const cap    = xmlEsc((scene.capability_anchor || scene.type || '').slice(0, 40))
  const svg    = `<svg xmlns="http://www.w3.org/2000/svg" width="576" height="1024"><rect width="576" height="1024" fill="#0c0c0c"/><rect width="576" height="2" fill="${accent}"/><rect y="1022" width="576" height="2" fill="${accent}" opacity="0.2"/><text x="288" y="490" text-anchor="middle" font-family="system-ui,sans-serif" font-size="30" font-weight="700" fill="${accent}" letter-spacing="4">${label}</text><text x="288" y="532" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" fill="#505050">${cap}</text></svg>`
  return 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64')
}

async function generatePreviewImage(scene, brandContext) {
  const prompt = buildFinalPrompt(scene, brandContext)

  // ── Try xAI — download the image server-side so browser can display it ──────
  // xAI URLs require server-side access; browser <img> tags cannot load them directly.
  const xaiKey = String(process.env.XAI_API_KEY || '').replace(/^Bearer\s+/i, '')
  if (xaiKey) {
    try {
      const xaiRes  = await fetch('https://api.x.ai/v1/images/generations', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${xaiKey}` },
        body:    JSON.stringify({ model: 'grok-imagine-image-quality', prompt, aspect_ratio: '9:16' }),
        signal:  AbortSignal.timeout(25000),
      })
      const xaiData = await xaiRes.json()
      if (xaiRes.ok) {
        const xaiUrl = xaiData.data?.[0]?.url || xaiData.images?.[0]?.url || xaiData.url
        if (xaiUrl) {
          // Download from xAI CDN and return as base64 data URL — browser displays instantly
          const imgRes = await fetch(xaiUrl, { signal: AbortSignal.timeout(15000) })
          if (imgRes.ok) {
            const buf  = await imgRes.arrayBuffer()
            const mime = imgRes.headers.get('content-type') || 'image/jpeg'
            console.log(`[preview] ✅ xAI: ${scene.id} (${Math.round(buf.byteLength / 1024)}KB)`)
            return `data:${mime};base64,${Buffer.from(buf).toString('base64')}`
          }
        }
        console.warn(`[preview] xAI 200 no usable URL ${scene.id}: ${JSON.stringify(xaiData).slice(0, 120)}`)
      } else {
        console.warn(`[preview] xAI ${xaiRes.status} ${scene.id}: ${xaiData.error?.message || ''}`)
      }
    } catch (e) {
      console.warn(`[preview] xAI ${scene.id}: ${e.message}`)
    }
  }

  // ── SVG placeholder — always works, loads in <1ms ─────────────────────────
  console.log(`[preview] SVG placeholder: ${scene.id}`)
  return buildScenePlaceholder(scene)
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
