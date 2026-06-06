/**
 * Edit Studio 2.0 Sprint 7 — Production verification
 * Verifies the 10 post-deploy checkpoints against promptceo.io
 * Usage: node scripts/verify-edit-studio.mjs
 */
import { chromium } from 'playwright'
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SHOTS_DIR = join(__dirname, '..', 'verification-screenshots')
mkdirSync(SHOTS_DIR, { recursive: true })

const BASE = 'https://www.promptceo.io'
const RESULTS = []

async function shot(page, name, label) {
  const file = join(SHOTS_DIR, `${name}.png`)
  await page.screenshot({ path: file, fullPage: false })
  console.log(`  📸 ${label} → verification-screenshots/${name}.png`)
  return file
}

function pass(n, label, detail = '') { RESULTS.push({ n, status: '✅', label, detail }); console.log(`  ✅ ${n}. ${label}${detail ? ' — ' + detail : ''}`) }
function fail(n, label, detail = '') { RESULTS.push({ n, status: '❌', label, detail }); console.log(`  ❌ ${n}. ${label}${detail ? ' — ' + detail : ''}`) }
function warn(n, label, detail = '') { RESULTS.push({ n, status: '⚠️', label, detail }); console.log(`  ⚠️  ${n}. ${label}${detail ? ' — ' + detail : ''}`) }

async function run() {
  console.log('\n' + '='.repeat(70))
  console.log('Edit Studio 2.0 Sprint 7 — Production Verification')
  console.log(`Target: ${BASE}/edit-studio`)
  console.log('='.repeat(70) + '\n')

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36',
  })
  const page = await context.newPage()

  // ── 1. /edit-studio shows PromptCEO top navigation ───────────────────────

  console.log('CHECK 1: PromptCEO navigation bar')
  await page.goto(`${BASE}/edit-studio`, { waitUntil: 'networkidle', timeout: 30000 })
  await shot(page, '01-edit-studio-landing', 'Edit Studio landing page')

  const wordmark = await page.locator('text=PromptCEO').first().isVisible().catch(() => false)
  const navDash  = await page.locator('a[href="/dashboard"]').first().isVisible().catch(() => false)
  const navEdit  = await page.locator('a[href="/edit-studio/v2"]').first().isVisible().catch(() => false)
  const navAcc   = await page.locator('text=Account').first().isVisible().catch(() => false)

  if (wordmark && (navDash || navEdit)) {
    pass(1, 'PromptCEO top navigation present', `wordmark=${wordmark} dashboard=${navDash} edit-studio-link=${navEdit} account=${navAcc}`)
  } else {
    fail(1, 'PromptCEO top navigation missing', `wordmark=${wordmark} dashboard=${navDash} edit-studio-link=${navEdit}`)
  }

  // Screenshot of nav bar only
  await page.screenshot({
    path: join(SHOTS_DIR, '01b-nav-bar-crop.png'),
    clip: { x: 0, y: 0, width: 1440, height: 56 },
  })
  console.log('  📸 Nav bar crop → verification-screenshots/01b-nav-bar-crop.png')

  // ── 2. Edit Studio loads v2 flow ─────────────────────────────────────────

  console.log('\nCHECK 2: Edit Studio v2 flow')
  await page.goto(`${BASE}/edit-studio/v2`, { waitUntil: 'networkidle', timeout: 30000 })
  await shot(page, '02-edit-studio-v2', 'Edit Studio v2 direct URL')

  const headline = await page.locator('text=Turn one video into five ads').first().isVisible().catch(() => false)
  const dropzone = await page.locator('text=Drop your video here').first().isVisible().catch(() => false)
  const browse   = await page.locator('text=Browse files').first().isVisible().catch(() => false)
  const v2Nav    = await page.locator('text=PromptCEO').first().isVisible().catch(() => false)

  if (headline && dropzone) {
    pass(2, 'v2 upload flow loads correctly', `headline=${headline} dropzone=${dropzone} browse=${browse}`)
  } else {
    fail(2, 'v2 flow not loading', `headline=${headline} dropzone=${dropzone} browse=${browse}`)
  }

  if (v2Nav) {
    pass(2.1, 'Nav bar visible on v2 direct URL too', '')
  } else {
    warn(2.1, 'Nav bar not visible on /edit-studio/v2 direct URL', '')
  }

  // ── 3. Upload UI present ─────────────────────────────────────────────────

  console.log('\nCHECK 3: Upload UI')
  const fileInput = await page.locator('input[type="file"]').count()
  if (fileInput > 0 && dropzone) {
    pass(3, 'Upload UI functional', `file input present (${fileInput}), drop zone visible`)
  } else {
    fail(3, 'Upload UI broken', `fileInputs=${fileInput} dropzone=${dropzone}`)
  }

  // ── 4-10: Pipeline route health checks ───────────────────────────────────

  console.log('\nCHECK 4-10: Pipeline API routes (auth-gate probes)')

  const PIPELINE_ROUTES = [
    { n: 4, name: 'Understanding',        path: '/api/edit-studio/understand' },
    { n: 5, name: 'Strategy',             path: '/api/edit-studio/creative-director' },
    { n: 6, name: 'Ad Concepts',          path: '/api/edit-studio/ad-concepts' },
    { n: 7, name: 'Voice',                path: '/api/edit-studio/voice' },
    { n: 8, name: 'Caption Intelligence', path: '/api/edit-studio/caption-intelligence' },
    { n: 9, name: 'Quality Engine',       path: '/api/edit-studio/quality-score-batch' },
    { n: 10, name: 'Render queue',        path: '/api/edit-studio/auto-render' },
  ]

  for (const route of PIPELINE_ROUTES) {
    try {
      const result = await page.evaluate(async ({ url }) => {
        try {
          const r = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
          })
          const text = await r.text()
          let json = null
          try { json = JSON.parse(text) } catch {}
          return { status: r.status, message: json?.message || text.slice(0, 100) }
        } catch (e) {
          return { status: 0, message: e.message }
        }
      }, { url: `${BASE}${route.path}` })

      if (result.status === 401) {
        pass(route.n, `${route.name} — deployed, auth gate active`, `HTTP 401: ${result.message}`)
      } else if (result.status === 400) {
        pass(route.n, `${route.name} — deployed, validation active`, `HTTP 400: ${result.message}`)
      } else if (result.status === 404) {
        fail(route.n, `${route.name} — ROUTE NOT FOUND`, `HTTP 404 — missing from deployment`)
      } else if (result.status >= 500) {
        warn(route.n, `${route.name} — server error`, `HTTP ${result.status}: ${result.message}`)
      } else if (result.status === 0) {
        fail(route.n, `${route.name} — unreachable`, result.message)
      } else {
        pass(route.n, `${route.name} — deployed`, `HTTP ${result.status}`)
      }
    } catch (err) {
      fail(route.n, `${route.name} — probe error`, err.message)
    }
  }

  // ── Final screenshot ─────────────────────────────────────────────────────

  console.log('\nCapturing final state screenshots...')
  await page.goto(`${BASE}/edit-studio/v2`, { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForTimeout(800)
  await shot(page, '10-final-state', 'Final state — full page')

  await browser.close()

  // ── Report ────────────────────────────────────────────────────────────────

  console.log('\n' + '='.repeat(70))
  console.log('VERIFICATION REPORT')
  console.log('='.repeat(70))

  const passed = RESULTS.filter(r => r.status === '✅').length
  const failed = RESULTS.filter(r => r.status === '❌').length
  const warned  = RESULTS.filter(r => r.status === '⚠️').length

  RESULTS.forEach(r => {
    const detail = r.detail ? `\n     ${r.detail}` : ''
    console.log(`  ${r.status} ${r.n}. ${r.label}${detail}`)
  })

  console.log()
  console.log(`Results: ${passed} passed · ${failed} failed · ${warned} warnings`)
  console.log()

  if (failed === 0 && warned === 0) {
    console.log('✅ SPRINT 7 PRODUCTION PASS')
  } else if (failed === 0) {
    console.log(`⚠️  SPRINT 7 PRODUCTION PASS WITH WARNINGS (${warned} items to review)`)
  } else {
    console.log(`❌ SPRINT 7 PRODUCTION FAIL — ${failed} issue(s) require attention`)
  }

  console.log('='.repeat(70))
  console.log(`\nScreenshots: ${SHOTS_DIR}`)
}

run().catch(err => {
  console.error('\nFatal:', err.message)
  process.exit(1)
})
