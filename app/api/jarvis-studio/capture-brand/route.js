import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export const maxDuration = 90

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

// Upload a base64 or URL screenshot to Supabase for a stable, long-lived URL.
// Firecrawl screenshot field may be a data URI (base64) or a hosted URL.
async function uploadScreenshot(admin, userId, pageSlug, screenshotData) {
  let buffer
  let contentType = 'image/png'

  if (screenshotData.startsWith('data:')) {
    // Base64 data URI: data:image/png;base64,<data>
    const commaIdx = screenshotData.indexOf(',')
    const meta     = screenshotData.slice(5, commaIdx) // e.g. "image/png;base64"
    contentType    = meta.split(';')[0] || 'image/png'
    buffer         = Buffer.from(screenshotData.slice(commaIdx + 1), 'base64')
  } else {
    // External URL — download it
    const res = await fetch(screenshotData)
    if (!res.ok) throw new Error(`Screenshot download failed: ${res.status}`)
    buffer = Buffer.from(await res.arrayBuffer())
    const ct = res.headers.get('content-type')
    if (ct) contentType = ct.split(';')[0]
  }

  const ext        = contentType.includes('jpeg') ? 'jpg' : 'png'
  const storagePath = `jarvis-studio/${userId}/brand-screens/${Date.now()}_${pageSlug}.${ext}`

  const { error } = await admin.storage
    .from('identity-images')
    .upload(storagePath, buffer, { contentType, upsert: true })

  if (error) throw new Error(`Supabase upload: ${error.message}`)

  // 7-day signed URL — long enough for any production session
  const { data: signed } = await admin.storage
    .from('identity-images')
    .createSignedUrl(storagePath, 7 * 24 * 3600)

  return { storagePath, url: signed?.signedUrl }
}

// Capture one page via Firecrawl and return a stable Supabase URL for the screenshot.
async function capturePage(admin, userId, pageUrl, pageSlug) {
  const apiKey = process.env.FIRECRAWL_API_KEY
  if (!apiKey) return null

  try {
    const res  = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body:    JSON.stringify({
        url:             pageUrl,
        formats:         ['screenshot', 'markdown'],
        onlyMainContent: false,
        waitFor:         2500,
        timeout:         25000,
      }),
    })
    const data = await res.json()
    if (!data.success) {
      console.warn('[capture-brand] Firecrawl failed for', pageUrl, data.error || '')
      return null
    }

    const screenshotRaw = data.data?.screenshot
    if (!screenshotRaw) {
      console.warn('[capture-brand] No screenshot returned for', pageUrl)
      return null
    }

    const { url, storagePath } = await uploadScreenshot(admin, userId, pageSlug, screenshotRaw)
    const title = data.data?.metadata?.title || pageSlug

    console.log('[capture-brand] captured', pageSlug, '→', url?.slice(0, 80))
    return { page: pageSlug, url, storagePath, title }

  } catch (err) {
    console.error('[capture-brand] error capturing', pageUrl, ':', err.message)
    return null
  }
}

// Derive candidate sub-pages to capture for a given base URL.
// Keeps it to 2-3 high-value pages — prioritise features/pricing over blog.
function deriveSubPages(baseUrl) {
  const base = baseUrl.replace(/\/$/, '')
  const candidates = [
    { slug: 'pricing',  path: '/pricing'  },
    { slug: 'features', path: '/features' },
    { slug: 'product',  path: '/product'  },
    { slug: 'about',    path: '/about'    },
  ]
  return candidates.map(c => ({ ...c, url: `${base}${c.path}` }))
}

// POST /api/jarvis-studio/capture-brand
// Body: { url, captureSubPages?: boolean }
// Returns: { brandPack: { screenshots: [{ page, url, title }], siteTitle } }
export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { url, captureSubPages = true } = await req.json()
    if (!url?.trim()) return NextResponse.json({ error: 'url required' }, { status: 400 })

    const admin  = makeAdmin()
    const baseUrl = url.trim().replace(/\/$/, '')

    console.log('[capture-brand] starting capture for', baseUrl)

    // Capture homepage first (always)
    const homepageResult = await capturePage(admin, user.id, baseUrl, 'homepage')

    const screenshots = []
    if (homepageResult) screenshots.push(homepageResult)

    // Capture 2 sub-pages in parallel (best-effort — failures are silently dropped)
    if (captureSubPages) {
      const subPages   = deriveSubPages(baseUrl).slice(0, 2)
      const subResults = await Promise.allSettled(
        subPages.map(sp => capturePage(admin, user.id, sp.url, sp.slug))
      )
      subResults.forEach(r => {
        if (r.status === 'fulfilled' && r.value) screenshots.push(r.value)
      })
    }

    console.log(`[capture-brand] total screenshots captured: ${screenshots.length}`)

    return NextResponse.json({
      status: 'success',
      brandPack: {
        screenshots,
        capturedUrl: baseUrl,
        capturedAt:  new Date().toISOString(),
      },
    })

  } catch (err) {
    console.error('[capture-brand] error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
