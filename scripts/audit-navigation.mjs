/**
 * PromptCEO Navigation + UX Audit
 * Screenshots every main page, checks nav links, reports issues.
 * Usage: node scripts/audit-navigation.mjs (run from playwright-verify dir)
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SHOTS_DIR = join(__dirname, '..', 'audit-screenshots')
mkdirSync(SHOTS_DIR, { recursive: true })

const BASE = 'https://www.promptceo.io'

const PAGES = [
  { id: 'dashboard',    url: '/dashboard',                  label: 'Dashboard' },
  { id: 'studio',       url: '/prompt-engine-v3',           label: 'Studio (Prompt Engine v3)' },
  { id: 'edit-studio',  url: '/edit-studio',                label: 'Edit Studio (redirect target)' },
  { id: 'edit-v2',      url: '/edit-studio/v2',             label: 'Edit Studio v2' },
  { id: 'music',        url: '/music-studio',               label: 'Music Studio' },
  { id: 'account',      url: '/account',                    label: 'Account' },
  { id: 'brands-probe', url: '/brands',                     label: 'Brands (does page exist?)' },
  { id: 'ad-system',    url: '/prompt-engine-v3?view=ad_studio', label: 'Ad Studio' },
]

const NAV_LINKS = [
  { label: 'Dashboard',   href: '/dashboard' },
  { label: 'Studio',      href: '/prompt-engine-v3' },
  { label: 'Ad Studio',   href: '/prompt-engine-v3?view=ad_studio' },
  { label: 'Edit Studio', href: '/edit-studio/v2' },
  { label: 'Brands',      href: '/dashboard' },
  { label: 'Account',     href: '/account' },
]

async function auditPage(page, def) {
  const findings = []
  let finalUrl = ''

  try {
    const res = await page.goto(`${BASE}${def.url}`, { waitUntil: 'networkidle', timeout: 30000 })
    await page.waitForTimeout(1000)
    finalUrl = page.url()

    // Screenshot
    await page.screenshot({ path: join(SHOTS_DIR, `${def.id}.png`), fullPage: false })
    console.log(`  📸 ${def.label}`)

    // Check redirect
    if (finalUrl !== `${BASE}${def.url}` && !finalUrl.startsWith(`${BASE}${def.url}`)) {
      findings.push(`⚠️  Redirects to: ${finalUrl.replace(BASE, '')}`)
    }

    // Check for PromptCEO nav bar
    const hasNav = await page.locator('text=PROMPTCEO, text=PromptCEO').first().isVisible().catch(() => false)
    if (!hasNav) findings.push('❌ No PromptCEO nav bar')

    // Check for Dashboard link
    const hasDashLink = await page.locator('a[href="/dashboard"]').first().isVisible().catch(() => false)
    if (!hasDashLink) findings.push('❌ No Dashboard link')

    // Check for back/return action
    const hasBack = await page.locator('text=/back|return|← /i').first().isVisible().catch(() => false)
    if (!hasBack) findings.push('⚠️  No back/return action visible')

    // Check for empty state or 404
    const is404 = await page.locator('text=404, text=not found').first().isVisible().catch(() => false)
    if (is404) findings.push('❌ 404 page')

    // HTTP status
    const status = res?.status() ?? '?'
    if (status >= 400) findings.push(`❌ HTTP ${status}`)

    // Check for duplicate content (are two pages identical?)
    const title = await page.title()
    const h1 = await page.locator('h1').first().textContent().catch(() => null)

    return { id: def.id, label: def.label, url: def.url, finalUrl: finalUrl.replace(BASE, ''), status, title, h1, findings, ok: !findings.some(f => f.startsWith('❌')) }
  } catch (err) {
    console.log(`  ❌ FAILED to load: ${err.message.slice(0, 80)}`)
    return { id: def.id, label: def.label, url: def.url, finalUrl, status: 'ERR', title: null, h1: null, findings: [`❌ Load failed: ${err.message.slice(0, 100)}`], ok: false }
  }
}

async function run() {
  console.log('\n' + '='.repeat(70))
  console.log('PromptCEO Navigation + UX Audit')
  console.log('='.repeat(70) + '\n')

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()

  const results = []
  for (const def of PAGES) {
    console.log(`Auditing: ${def.label}`)
    const r = await auditPage(page, def)
    results.push(r)
    console.log(`  URL: ${r.url} → ${r.finalUrl}`)
    console.log(`  H1: "${r.h1 || '(none)'}"`)
    r.findings.forEach(f => console.log(`  ${f}`))
    console.log()
  }

  // ── Check for duplicate pages ───────────────────────────────────────────
  console.log('='.repeat(70))
  console.log('DUPLICATE / ROUTING ISSUES')
  console.log('='.repeat(70))

  // Group by final URL
  const byDest = {}
  results.forEach(r => {
    const dest = r.finalUrl
    if (!byDest[dest]) byDest[dest] = []
    byDest[dest].push(r.id)
  })
  Object.entries(byDest).forEach(([dest, ids]) => {
    if (ids.length > 1) {
      console.log(`⚠️  DUPLICATE: ${ids.join(' + ')} both land on ${dest}`)
    }
  })

  // ── Nav link audit ──────────────────────────────────────────────────────
  console.log('\n' + '='.repeat(70))
  console.log('NAV LINK AUDIT (from current edit-studio nav bar)')
  console.log('='.repeat(70))

  NAV_LINKS.forEach(link => {
    const target = results.find(r => r.url === link.href || r.finalUrl === link.href)
    if (!target) {
      console.log(`❌ "${link.label}" → ${link.href} — NO PAGE`)
    } else if (target.findings.some(f => f.includes('404'))) {
      console.log(`❌ "${link.label}" → ${link.href} — 404`)
    } else if (target.finalUrl !== link.href && !target.finalUrl.includes(link.href)) {
      console.log(`⚠️  "${link.label}" → ${link.href} redirects to ${target.finalUrl}`)
    } else {
      console.log(`✅ "${link.label}" → ${link.href} — OK`)
    }
  })

  // ── Summary ─────────────────────────────────────────────────────────────
  console.log('\n' + '='.repeat(70))
  console.log('PRIORITY ISSUES TO FIX')
  console.log('='.repeat(70))

  const allFindings = results.flatMap(r => r.findings.map(f => `[${r.id}] ${f}`))
  allFindings.forEach(f => console.log(f))

  console.log(`\nScreenshots saved: ${SHOTS_DIR}`)

  await browser.close()
}

run().catch(err => { console.error('Fatal:', err.message); process.exit(1) })
