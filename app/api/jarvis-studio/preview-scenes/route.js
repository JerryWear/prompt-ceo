import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js'
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
function extractShortName(productStr) {
  return (productStr || '').split(/[—.\n]/)[0].trim().slice(0, 40)
}

function validateAndAnchorPrompt(scene, brandContext) {
  const anchors    = scene.brand_anchors || []
  const brandCheck = scene.brand_check   || ''
  const raw        = scene.dalle_prompt  || scene.visual_scene || scene.visual_direction || ''

  if (!brandContext?.productName) {
    return { prompt: raw, anchored: false, reason: 'no brand context' }
  }

  const shortName = extractShortName(brandContext.productName)
  const text      = raw.toLowerCase()

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

  const anchorText = anchors.length > 0
    ? anchors.join(', ')
    : brandContext.keyMessages?.slice(0, 2).join(' | ') || shortName

  const styleHint  = brandContext.visualDNA
    ? ` — ${brandContext.visualDNA.slice(0, 120)}`
    : brandContext.style
      ? ` — ${brandContext.style.slice(0, 60)}`
      : ''
  const prefix  = `${shortName}${styleHint}: ${anchorText}. `
  const anchored = `${prefix}${raw}`

  console.log(`[preview] ⚠️  ${scene.id} brand weak — anchoring`)
  console.log(`[preview]    brand_check: "${brandCheck.slice(0, 80) || '(none)'}"`)
  console.log(`[preview]    anchors:     [${anchors.join(' | ') || 'none'}]`)
  console.log(`[preview]    injected:    "${prefix.slice(0, 100)}"`)

  return { prompt: anchored, anchored: true, reason: 'weak brand anchor — strengthened' }
}

function buildFinalPrompt(scene, brandContext) {
  const { prompt } = validateAndAnchorPrompt(scene, brandContext)
  const base = prompt || `Cinematic vertical advertisement frame, ${scene.label || 'scene'}`

  // UI scenes: strip people so product is the focus
  // Human scenes (Hook/Problem/Transformation/CTA): keep people — that IS the scene
  const isUiScene = scene.contains_ui || scene.label === 'Solution'
  const safe = isUiScene
    ? base.replace(/\b(talking head|looking at camera)\b/gi, '').replace(/\s{2,}/g, ' ').trim()
    : base

  const final = `${safe}. Cinematic vertical 9:16 format, advertisement quality.`
  console.log(`[preview] ✦  ${scene.id} (${scene.label}) prompt: "${final.slice(0, 140)}"`)
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

// ── Upload buffer to Supabase, return public URL (or base64 fallback) ─────────
async function storeImage(buf, mime, scene, userId, storageClient) {
  const ext = mime.includes('png') ? 'png' : 'jpg'
  if (storageClient && userId) {
    const path = `jarvis-previews/${userId}/${Date.now()}-${scene.id}.${ext}`
    const { error } = await storageClient.upload(path, buf, { contentType: mime, upsert: true })
    if (!error) {
      const { data } = storageClient.getPublicUrl(path)
      if (data?.publicUrl) {
        console.log(`[preview] ✅ stored: ${scene.id} → Supabase`)
        return data.publicUrl
      }
    }
    console.warn(`[preview] Supabase upload failed for ${scene.id}: ${error?.message}`)
  }
  // Fallback: base64 data URL (works but adds size to JSON response)
  return `data:${mime};base64,${buf.toString('base64')}`
}

async function generatePreviewImage(scene, brandContext, userId, storageClient) {
  const prompt       = buildFinalPrompt(scene, brandContext)
  const replicateKey = process.env.REPLICATE_API_KEY
  const openaiKey    = process.env.OPENAI_API_KEY

  // ── FLUX-1.1-pro via Replicate — 9:16 native, cinematic quality ──────────
  if (replicateKey) {
    try {
      console.log('FLUX generating scene:', scene.id, 'prompt length:', prompt.length)
      const replicateRes = await fetch(
        'https://api.replicate.com/v1/models/black-forest-labs/flux-1.1-pro/predictions',
        {
          method:  'POST',
          headers: {
            'Authorization': `Bearer ${replicateKey}`,
            'Content-Type':  'application/json',
            'Prefer':        'wait',
          },
          body: JSON.stringify({
            input: {
              prompt,
              aspect_ratio:    '9:16',
              output_format:   'jpg',
              output_quality:  90,
              safety_tolerance: 2,
            },
          }),
          signal: AbortSignal.timeout(60000),
        }
      )
      const replicateData = await replicateRes.json()
      console.log('FLUX response status:', replicateRes.status, 'output:', replicateData.output, 'error:', replicateData.error, 'detail:', replicateData.detail)
      if (!replicateRes.ok || !replicateData.output) {
        throw new Error(replicateData.detail || 'Replicate generation failed')
      }
      // replicateData.output is a direct image URL — download it
      const imageRes = await fetch(replicateData.output, { signal: AbortSignal.timeout(15000) })
      if (!imageRes.ok) throw new Error(`Image download failed: ${imageRes.status}`)
      const imageBuffer = Buffer.from(await imageRes.arrayBuffer())
      return await storeImage(imageBuffer, 'image/jpeg', scene, userId, storageClient)
    } catch (err) {
      console.error('FLUX failed for scene:', scene.id, err.message)
    }
  } else {
    console.warn('[preview] REPLICATE_API_KEY not set — falling back to dall-e-3')
  }

  // ── dall-e-3 fallback — b64_json to avoid CDN URL access issues ──────────
  if (openaiKey) {
    try {
      const res  = await fetch('https://api.openai.com/v1/images/generations', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${openaiKey}` },
        body:    JSON.stringify({ model: 'dall-e-3', prompt, n: 1, size: '1024x1792', quality: 'standard', response_format: 'b64_json' }),
        signal:  AbortSignal.timeout(45000),
      })
      const data = await res.json()
      if (res.ok) {
        const b64 = data.data?.[0]?.b64_json
        if (b64) {
          return await storeImage(Buffer.from(b64, 'base64'), 'image/jpeg', scene, userId, storageClient)
        }
      } else {
        console.warn(`[preview] dall-e-3 ${res.status} ${scene.id}: ${data.error?.message || ''}`)
      }
    } catch (e) {
      console.warn(`[preview] dall-e-3 ${scene.id}: ${e.message}`)
    }
  } else {
    console.warn('[preview] OPENAI_API_KEY not set')
  }

  // ── SVG placeholder — always works, loads in <1ms ─────────────────────────
  console.log(`[preview] SVG placeholder: ${scene.id}`)
  return buildScenePlaceholder(scene)
}

// POST /api/jarvis-studio/preview-scenes
// Body: { scenes: [{ id, dalle_prompt, visual_direction, label, brand_anchors?, brand_check? }], brandContext? }
// Returns: { status, previews: [{ id, imageUrl, error?, anchored? }] }
export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    // Admin client for storage uploads — same pattern as generate-image route
    const adminClient   = createSupabaseAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    const storageClient = adminClient.storage.from('identity-images')

    const { scenes, brandContext } = await req.json()
    if (!Array.isArray(scenes) || scenes.length === 0) {
      return NextResponse.json({ error: 'scenes array required' }, { status: 400 })
    }

    if (brandContext?.productName) {
      console.log(`[preview-scenes] brand context: "${brandContext.productName}"`)
    }

    // Generate sequentially — each call takes ~5-15s, naturally under rate limits
    const previews = []
    for (const scene of scenes) {
      // Product Reality Engine: real screenshot → skip generation entirely
      if (scene.screenshotUrl) {
        console.log(`[preview] 📸 ${scene.id} real screenshot`)
        previews.push({ id: scene.id, imageUrl: scene.screenshotUrl, isReal: true })
        continue
      }

      try {
        const { anchored } = validateAndAnchorPrompt(scene, brandContext)
        const imageUrl = await generatePreviewImage(scene, brandContext, user.id, storageClient)
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
