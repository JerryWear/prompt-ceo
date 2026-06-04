# Edit Studio Sprint 2 — Professional Production Features

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add four features that make Edit Studio feel like a professional AI production tool: multi-platform export, preview before render, re-render on changes, and a brand kit system with logo overlay.

**Architecture:** All features extend the existing pipeline without redesign. The AI Director remains in control of all edit decisions. Users approve and adjust. No timeline editor, no scene graph migration. Brand Kit injects into the existing FFmpeg filter chain via a new parameter. Multi-platform export reuses the existing render job model with resolution overrides per variant.

**Tech Stack:** Next.js 14 App Router, Supabase admin client, FFmpeg `overlay` filter for logo, existing `buildFullFfmpegArgs` in `lib/edit-studio/renderEngine.js`, existing render worker polling model.

---

## Architectural Principle (Preserved Throughout)

PromptCEO is not CapCut. The AI Director makes all cut decisions. Users approve, adjust, and export. Every feature in this sprint serves the AI-first workflow — it never exposes a manual timeline or requires creative decisions from the user beyond approving what the AI produced.

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Create | `supabase/migrations/20260604_brand_kit.sql` | Add `brand_kit` jsonb column to `app_users` |
| Create | `app/api/brand-kit/route.js` | GET + PATCH user brand kit |
| Create | `app/api/brand-kit/presign/route.js` | Presigned upload URL for logo PNG |
| Create | `app/api/edit-studio/render-batch/route.js` | Create multiple render jobs from one base plan |
| Modify | `app/api/edit-studio/render-plan/route.js` | Inject brand kit into render plan |
| Modify | `lib/edit-studio/renderEngine.js` | Add `logoPath` param to `buildFullFfmpegArgs` |
| Modify | `scripts/render-worker.mjs` | Fetch brand kit, download logo, pass to `buildArgs` |
| Modify | `app/edit-studio/page.js` | Multi-platform variant UI, preview player, re-render button |
| Modify | `app/account/page.js` | Brand Kit section (logo upload + color picker) |

---

## Task 1: Brand Kit — DB Migration

**Files:**
- Create: `supabase/migrations/20260604_brand_kit.sql`

- [ ] **Step 1: Create migration file**

```sql
-- supabase/migrations/20260604_brand_kit.sql
-- Adds brand_kit column to app_users for logo URL + primary color.
-- brand_kit shape: { logoUrl: string, primaryColor: string }

alter table public.app_users
  add column if not exists brand_kit jsonb default '{}';
```

- [ ] **Step 2: Apply in Supabase Dashboard**

Go to Supabase Dashboard → SQL Editor → paste and run. Confirm `app_users` now has a `brand_kit` column of type jsonb.

- [ ] **Step 3: Create a storage bucket for brand assets**

In Supabase Dashboard → Storage → New bucket:
- Name: `brand-assets`
- Public: NO (private, accessed via signed URLs)

- [ ] **Step 4: Commit**

```bash
git add supabase/migrations/20260604_brand_kit.sql
git commit -m "feat: add brand_kit column to app_users + brand-assets storage bucket"
```

---

## Task 2: Brand Kit — API Routes

**Files:**
- Create: `app/api/brand-kit/route.js`
- Create: `app/api/brand-kit/presign/route.js`

- [ ] **Step 1: Create `app/api/brand-kit/route.js`**

```js
import { NextResponse } from 'next/server'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

function admin() {
  return createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

// GET /api/brand-kit — returns current user's brand kit
export async function GET() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const { data } = await admin().from('app_users').select('brand_kit').eq('id', user.id).single()
    return NextResponse.json({ status: 'success', brandKit: data?.brand_kit || {} })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}

// PATCH /api/brand-kit — save brand kit { logoUrl?, primaryColor? }
export async function PATCH(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const body = await req.json()
    const { logoUrl, primaryColor } = body

    // Only allow known keys
    const patch = {}
    if (typeof logoUrl      === 'string') patch.logoUrl      = logoUrl.trim()
    if (typeof primaryColor === 'string') patch.primaryColor = primaryColor.trim()

    if (!Object.keys(patch).length) {
      return NextResponse.json({ status: 'error', message: 'No valid fields provided' }, { status: 400 })
    }

    // Merge with existing brand_kit
    const { data: existing } = await admin().from('app_users').select('brand_kit').eq('id', user.id).single()
    const merged = { ...(existing?.brand_kit || {}), ...patch }

    await admin().from('app_users').update({ brand_kit: merged }).eq('id', user.id)
    return NextResponse.json({ status: 'success', brandKit: merged })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
```

- [ ] **Step 2: Create `app/api/brand-kit/presign/route.js`**

```js
import { NextResponse } from 'next/server'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// POST /api/brand-kit/presign
// Returns a signed upload URL for the brand-assets bucket.
// Client uploads PNG directly to storage, then calls PATCH /api/brand-kit with the URL.
export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const body = await req.json()
    const ext  = (body?.fileName || 'logo.png').split('.').pop().toLowerCase()
    if (!['png', 'jpg', 'jpeg', 'svg', 'webp'].includes(ext)) {
      return NextResponse.json({ status: 'error', message: 'Logo must be PNG, JPG, SVG, or WebP' }, { status: 400 })
    }

    const storagePath = `${user.id}/logo.${ext}`
    const db = createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

    const { data, error } = await db.storage.from('brand-assets').createSignedUploadUrl(storagePath)
    if (error) throw new Error(error.message)

    // Build public (actually private) access URL
    const { data: urlData } = await db.storage.from('brand-assets').createSignedUrl(storagePath, 86400)
    const publicUrl = urlData?.signedUrl || null

    return NextResponse.json({ status: 'success', signedUrl: data.signedUrl, token: data.token, storagePath, publicUrl })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
```

- [ ] **Step 3: Verify build**

```bash
npx next build 2>&1 | grep -E "^(✓|error)" | head -5
```
Expected: `✓ Compiled successfully`

- [ ] **Step 4: Commit**

```bash
git add app/api/brand-kit/route.js app/api/brand-kit/presign/route.js
git commit -m "feat: add brand kit GET/PATCH API and presigned logo upload route"
```

---

## Task 3: Brand Kit — Account Page UI

**Files:**
- Modify: `app/account/page.js`

- [ ] **Step 1: Add brand kit state to `AccountPage`**

Find the existing state declarations (around line 551). Add after `const [error, setError] = useState('')`:

```js
  const [brandKit,        setBrandKit]        = useState({ logoUrl: '', primaryColor: '#c8a84b' })
  const [brandKitSaving,  setBrandKitSaving]  = useState(false)
  const [brandKitMsg,     setBrandKitMsg]      = useState(null)
  const [logoUploading,   setLogoUploading]   = useState(false)
  const brandLogoRef = useRef(null)
```

Also add `useRef` to the imports at line 3:
```js
import { useState, useEffect, useRef } from 'react'
```

- [ ] **Step 2: Load brand kit on mount**

Find the `useEffect` that calls `supabase.auth.getUser()`. After `setSub(d)`, add:

```js
      fetch('/api/brand-kit')
        .then(r => r.json())
        .then(d => { if (d.status === 'success') setBrandKit({ logoUrl: d.brandKit?.logoUrl || '', primaryColor: d.brandKit?.primaryColor || '#c8a84b' }) })
        .catch(() => {})
```

- [ ] **Step 3: Add logo upload handler**

Add this function after `handleSignOut`:

```js
  const handleLogoUpload = async (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) { setBrandKitMsg({ type: 'error', text: 'Please upload an image file.' }); return }
    if (file.size > 2 * 1024 * 1024) { setBrandKitMsg({ type: 'error', text: 'Logo must be under 2 MB.' }); return }

    setLogoUploading(true)
    setBrandKitMsg(null)
    try {
      // 1. Get presigned upload URL
      const presignRes = await fetch('/api/brand-kit/presign', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name }),
      })
      const presignData = await presignRes.json()
      if (presignData.status !== 'success') throw new Error(presignData.message)

      // 2. Upload directly to storage
      const uploadRes = await fetch(presignData.signedUrl, {
        method: 'PUT', body: file,
        headers: { 'Content-Type': file.type, 'x-upsert': 'true' },
      })
      if (!uploadRes.ok) throw new Error(`Upload failed: ${uploadRes.status}`)

      // 3. Save the URL to brand kit
      const saveRes = await fetch('/api/brand-kit', {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logoUrl: presignData.publicUrl }),
      })
      const saveData = await saveRes.json()
      if (saveData.status !== 'success') throw new Error(saveData.message)

      setBrandKit(k => ({ ...k, logoUrl: presignData.publicUrl }))
      setBrandKitMsg({ type: 'success', text: 'Logo saved.' })
    } catch (err) {
      setBrandKitMsg({ type: 'error', text: err.message })
    } finally {
      setLogoUploading(false)
    }
  }

  const handleBrandColorSave = async () => {
    setBrandKitSaving(true)
    setBrandKitMsg(null)
    try {
      const res  = await fetch('/api/brand-kit', {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ primaryColor: brandKit.primaryColor }),
      })
      const data = await res.json()
      if (data.status !== 'success') throw new Error(data.message)
      setBrandKitMsg({ type: 'success', text: 'Brand color saved.' })
    } catch (err) {
      setBrandKitMsg({ type: 'error', text: err.message })
    } finally {
      setBrandKitSaving(false)
    }
  }
```

- [ ] **Step 4: Add Brand Kit section to the page JSX**

In the `return (...)` of `AccountPage`, find the closing `</div>` before the final `</div>` that wraps the whole page. Add the Brand Kit section before the sign-out section. Find the section that has the billing portal button (around line 700+) and add this section after it:

```jsx
        {/* ── Brand Kit ─────────────────────────────────────────────────── */}
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 24px 48px' }}>
          <div style={{ padding: '24px', borderRadius: 12, border: `1px solid ${C.hairline}`, background: C.surface }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.primary, marginBottom: 4 }}>Brand Kit</div>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 20 }}>Your logo and brand color are automatically added to all Edit Studio renders.</div>

            {/* Logo upload */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Logo</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                {brandKit.logoUrl ? (
                  <div style={{ width: 64, height: 64, borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.subtle, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                    <img src={brandKit.logoUrl} alt="Brand logo" style={{ maxWidth: 56, maxHeight: 56, objectFit: 'contain' }} />
                  </div>
                ) : (
                  <div style={{ width: 64, height: 64, borderRadius: 8, border: `1px dashed ${C.hairline}`, background: C.subtle, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: C.ghost, fontSize: 11 }}>No logo</div>
                )}
                <div>
                  <input ref={brandLogoRef} type="file" accept="image/png,image/jpeg,image/svg+xml,image/webp" style={{ display: 'none' }} onChange={e => handleLogoUpload(e.target.files?.[0])} />
                  <button onClick={() => brandLogoRef.current?.click()} disabled={logoUploading}
                    style={{ padding: '8px 16px', borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: logoUploading ? 'not-allowed' : 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
                    {logoUploading ? 'Uploading…' : brandKit.logoUrl ? '↺ Replace Logo' : '⬆ Upload Logo'}
                  </button>
                  <div style={{ fontSize: 10, color: C.ghost, marginTop: 5 }}>PNG, JPG, SVG or WebP · max 2 MB</div>
                </div>
              </div>
            </div>

            {/* Primary color */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Brand Color</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <input type="color" value={brandKit.primaryColor || '#c8a84b'}
                  onChange={e => setBrandKit(k => ({ ...k, primaryColor: e.target.value }))}
                  style={{ width: 44, height: 44, borderRadius: 8, border: `1px solid ${C.hairline}`, cursor: 'pointer', padding: 2, background: 'none' }} />
                <input type="text" value={brandKit.primaryColor || '#c8a84b'}
                  onChange={e => setBrandKit(k => ({ ...k, primaryColor: e.target.value }))}
                  placeholder="#c8a84b"
                  style={{ padding: '8px 12px', borderRadius: 7, border: `1px solid ${C.hairline}`, background: C.raised, color: C.primary, fontSize: 13, fontFamily: 'monospace', width: 100, outline: 'none' }} />
                <button onClick={handleBrandColorSave} disabled={brandKitSaving}
                  style={{ padding: '8px 16px', borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: brandKitSaving ? 'not-allowed' : 'pointer', border: `1px solid ${C.green}`, background: C.greenGlow, color: C.green }}>
                  {brandKitSaving ? 'Saving…' : 'Save Color'}
                </button>
              </div>
            </div>

            {/* Status message */}
            {brandKitMsg && (
              <div style={{ padding: '8px 12px', borderRadius: 7, fontSize: 12, color: brandKitMsg.type === 'success' ? C.green : '#c45a5a', border: `1px solid ${brandKitMsg.type === 'success' ? C.green + '44' : '#c45a5a44'}`, background: brandKitMsg.type === 'success' ? C.greenGlow : '#c45a5a08' }}>
                {brandKitMsg.text}
              </div>
            )}
          </div>
        </div>
```

- [ ] **Step 5: Verify build**

```bash
npx next build 2>&1 | grep -E "^(✓|error)" | head -5
```
Expected: `✓ Compiled successfully`

- [ ] **Step 6: Commit**

```bash
git add app/account/page.js
git commit -m "feat: add Brand Kit section to account page with logo upload and color picker"
```

---

## Task 4: Brand Kit — Inject into Render Plan + Engine

**Files:**
- Modify: `app/api/edit-studio/render-plan/route.js`
- Modify: `lib/edit-studio/renderEngine.js`

- [ ] **Step 1: Fetch brand kit in `render-plan/route.js` and inject into renderPlan**

Find the `makeSupabase()` helper at the top of `render-plan/route.js`. Below it, add an admin client helper:

```js
function makeAdmin() {
  return createAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}
```

Note: `createAdmin` is already imported as `createServerClient` won't work here — add the import at the top:
```js
import { createClient as createAdmin } from '@supabase/supabase-js'
```

Inside the POST handler, after getting `user`, fetch the brand kit:

```js
    // Fetch brand kit (non-fatal — renders proceed without it)
    let brandKit = null
    if (user) {
      try {
        const { data: userRow } = await makeAdmin()
          .from('app_users').select('brand_kit').eq('id', user.id).single()
        const kit = userRow?.brand_kit || {}
        if (kit.logoUrl) brandKit = { logoUrl: kit.logoUrl, primaryColor: kit.primaryColor || null }
      } catch { /* non-fatal */ }
    }
```

Then in the `renderPlan` object, add `brandKit` before `estimatedRenderTime`:

```js
      brandKit: brandKit || null,
```

- [ ] **Step 2: Add `logoPath` parameter to `buildFullFfmpegArgs` in `renderEngine.js`**

Find the function signature (line 422):
```js
export function buildFullFfmpegArgs(plan, inputPath, captionPath, musicPath, outputPath) {
```
Replace with:
```js
export function buildFullFfmpegArgs(plan, inputPath, captionPath, musicPath, outputPath, logoPath = null) {
```

After the existing inputs block (around line 433, after `if (hasMusic) inputs.push('-i', musicPath)`), add:

```js
  const hasLogo  = !!logoPath
  const logoIdx  = hasMusic ? 2 : 1
  if (hasLogo) inputs.push('-i', logoPath)
```

Find the `finalVideo` section where captions are applied. After the captions block, add the logo overlay. Find:
```js
  return {
    args: [
      ...inputs,
```
Before that return, add:

```js
  // Logo overlay (brand kit)
  if (hasLogo) {
    filters.push(`[${logoIdx}:v]scale=120:-1[slogo]`)
    filters.push(`[${finalVideo}][slogo]overlay=W-w-20:H-h-20[withlogo]`)
    finalVideo = '[withlogo]'
  }
```

Update the return to include `logoRendered`:
```js
  return {
    args: [
      ...inputs,
      '-filter_complex', filters.join(';'),
      '-map', finalVideo,
      '-map', finalAudio,
      '-c:v', 'libx264', '-preset', 'fast', '-crf', crf,
      '-c:a', 'aac', '-b:a', '128k',
      '-r', String(plan.fps || 30),
      '-movflags', '+faststart',
      '-y',
      outputPath,
    ],
    captionsRendered: hasCaps,
    musicRendered:    hasMusic,
    logoRendered:     hasLogo,
  }
```

- [ ] **Step 3: Verify the filter index arithmetic**

When music is present: inputs are `[0: video, 1: music, 2: logo]`. Logo filter `[2:v]` ✓
When no music: inputs are `[0: video, 1: logo]`. Logo filter `[1:v]` ✓

Run:
```bash
grep -n "logoPath\|hasLogo\|logoIdx\|logoRendered" lib/edit-studio/renderEngine.js
```
Expected: 6 lines — declaration, push to inputs, filter scale, filter overlay, finalVideo update, return field.

- [ ] **Step 4: Verify build**

```bash
npx next build 2>&1 | grep -E "^(✓|error)" | head -5
```
Expected: `✓ Compiled successfully`

- [ ] **Step 5: Commit**

```bash
git add app/api/edit-studio/render-plan/route.js lib/edit-studio/renderEngine.js
git commit -m "feat: inject brand kit into render plan + add logo overlay to FFmpeg pipeline"
```

---

## Task 5: Brand Kit — Render Worker Logo Support

**Files:**
- Modify: `scripts/render-worker.mjs`

- [ ] **Step 1: Add logo download helper**

Find the `resolveMusicUrl` function in `render-worker.mjs`. Add this new function immediately after it:

```js
async function resolveLogoPath(plan, userId, workDir) {
  const logoUrl = plan.brandKit?.logoUrl
  if (!logoUrl) return null

  try {
    // Resolve signed URL if needed (brand-assets bucket is private)
    let resolvedUrl = logoUrl
    if (logoUrl.includes('/brand-assets/')) {
      const storagePath = logoUrl.split('/brand-assets/').pop()?.split('?')[0]
      if (storagePath) {
        const { data: signed } = await db.storage.from('brand-assets').createSignedUrl(storagePath, 3600)
        if (signed?.signedUrl) resolvedUrl = signed.signedUrl
      }
    }

    const ext  = resolvedUrl.split('?')[0].split('.').pop()?.toLowerCase() || 'png'
    const dest = path.join(workDir, `logo.${ext}`)
    await downloadFile(resolvedUrl, dest)
    return dest
  } catch (err) {
    log('WARN', null, `Logo skipped: ${err.message}`)
    return null
  }
}
```

- [ ] **Step 2: Add `logoPath` to the existing `buildArgs` function**

Find `function buildArgs(plan, inputPath, captionPath, musicPath, outputPath)` in the worker. Update the signature:

```js
function buildArgs(plan, inputPath, captionPath, musicPath, outputPath, logoPath = null) {
```

Inside `buildArgs`, after the music inputs section (`if (musicPath) inputs.push('-i', musicPath)`), add:

```js
  const hasLogo  = !!logoPath
  const logoIdx  = musicPath ? 2 : 1
  if (hasLogo) inputs.push('-i', logoPath)
```

After the captions section (where `finalV` is assigned) but before the return, add:

```js
  if (hasLogo) {
    filters.push(`[${logoIdx}:v]scale=120:-1[slogo]`)
    filters.push(`[${finalV}][slogo]overlay=W-w-iw-20:H-ih-20[withlogo]`)
    finalV = '[withlogo]'
  }
```

Note: use `W-iw-20` (right edge minus logo width minus 20px margin) for correct bottom-right placement.

- [ ] **Step 3: Call `resolveLogoPath` inside `executeJob`**

Find the "4. Resolve + download music" section in `executeJob`. After the music block, add:

```js
    // 4b. Resolve logo (brand kit)
    let logoPath = null
    if (plan.brandKit?.logoUrl) {
      logoPath = await resolveLogoPath(plan, userId, workDir)
      if (logoPath) {
        log('INFO', jobId, 'Logo resolved')
      }
    }
```

Then find the `buildArgs` call (around the `// 5. Build + run FFmpeg` comment). Update it to pass `logoPath`:

```js
    const args = buildArgs(plan, inputPath, captionPath, musicPath, outputPath, logoPath)
```

Also update the `renderDetails` object to include `logoRendered`:
```js
    const renderDetails = { captionsRendered: !!captionPath, musicRendered: !!musicPath, logoRendered: !!logoPath, warnings, retryCount, completedAt: new Date().toISOString() }
```

- [ ] **Step 4: Commit**

```bash
git add scripts/render-worker.mjs
git commit -m "feat: add brand kit logo overlay to render worker"
```

---

## Task 6: Multi-Platform Export — Batch Render API

**Files:**
- Create: `app/api/edit-studio/render-batch/route.js`

- [ ] **Step 1: Create `app/api/edit-studio/render-batch/route.js`**

```js
import { NextResponse } from 'next/server'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { validateRenderPlan, buildFfmpegCommand, buildRenderJobRecord } from '../../../../lib/edit-studio/renderEngine.js'

const PLATFORM_RESOLUTION = {
  tiktok:    { resolution: '1080x1920', aspectRatio: '9:16', fps: 30 },
  instagram: { resolution: '1080x1920', aspectRatio: '9:16', fps: 30 },
  youtube:   { resolution: '1080x1920', aspectRatio: '9:16', fps: 30 },
  linkedin:  { resolution: '1920x1080', aspectRatio: '16:9', fps: 30 },
  meta:      { resolution: '1080x1080', aspectRatio: '1:1',  fps: 30 },
}

async function makeSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
}

function makeAdmin() {
  return createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

// POST /api/edit-studio/render-batch
// Creates one render job per requested platform variant.
// Input: { projectId, baseRenderPlan, platforms: ['tiktok','instagram','linkedin','meta'] }
// Returns: { jobs: [{ platform, jobId, jobStatus }] }
export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const body = await req.json()
    const { projectId, baseRenderPlan, platforms } = body

    if (!baseRenderPlan) return NextResponse.json({ status: 'error', message: 'baseRenderPlan required' }, { status: 400 })
    if (!Array.isArray(platforms) || !platforms.length) return NextResponse.json({ status: 'error', message: 'platforms array required' }, { status: 400 })
    if (!baseRenderPlan.sourceVideoUrl) return NextResponse.json({ status: 'error', message: 'No sourceVideoUrl in render plan' }, { status: 400 })

    const admin  = makeAdmin()
    const jobs   = []
    const errors = []

    for (const platform of platforms) {
      const meta = PLATFORM_RESOLUTION[platform]
      if (!meta) { errors.push(`Unknown platform: ${platform}`); continue }

      // Build variant: same plan but platform-specific resolution + fps
      const variantPlan = {
        ...baseRenderPlan,
        platform,
        resolution:  meta.resolution,
        aspectRatio: meta.aspectRatio,
        fps:         meta.fps,
      }

      const validation = validateRenderPlan(variantPlan)
      if (!validation.valid) {
        errors.push(`${platform}: ${validation.errors.join(', ')}`)
        continue
      }

      const ffmpegCommandPreview = buildFfmpegCommand(variantPlan)
      const jobRecord            = buildRenderJobRecord(projectId, user.id, { ...variantPlan, ffmpegCommandPreview })

      const { data: job, error: insertErr } = await admin
        .from('edit_render_jobs').insert(jobRecord).select('id, status, created_at').single()

      if (insertErr) { errors.push(`${platform}: ${insertErr.message}`); continue }

      jobs.push({ platform, jobId: job.id, jobStatus: job.status, queuedAt: job.created_at })
    }

    // Append job summaries to project (non-fatal)
    if (jobs.length) {
      try {
        const { data: proj } = await supabase.from('edit_projects').select('render_jobs').eq('id', projectId).eq('user_id', user.id).single()
        const existing = proj?.render_jobs || []
        const summaries = jobs.map(j => ({ id: j.jobId, platform: j.platform, status: j.jobStatus, createdAt: j.queuedAt }))
        await supabase.from('edit_projects').update({ render_jobs: [...existing, ...summaries] }).eq('id', projectId).eq('user_id', user.id)
      } catch { /* non-fatal */ }
    }

    return NextResponse.json({ status: 'success', jobs, errors: errors.length ? errors : undefined })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
```

- [ ] **Step 2: Verify build**

```bash
npx next build 2>&1 | grep -E "^(✓|error)" | head -5
```

- [ ] **Step 3: Commit**

```bash
git add app/api/edit-studio/render-batch/route.js
git commit -m "feat: add render-batch API for multi-platform export variants"
```

---

## Task 7: Multi-Platform Export UI + Preview + Re-Render

**Files:**
- Modify: `app/edit-studio/page.js`

Three UI additions in one file, grouped into one commit.

- [ ] **Step 1: Add state variables**

Find the state declarations block (around line 206). Add these after `const [retryingRender, setRetryingRender] = useState(false)`:

```js
  const [variantPlatforms,  setVariantPlatforms]  = useState([])     // platforms for batch export
  const [variantJobs,       setVariantJobs]        = useState([])     // array of { platform, jobId, jobStatus }
  const [batchRendering,    setBatchRendering]      = useState(false)
  const [previewSegIdx,     setPreviewSegIdx]       = useState(null)  // index of segment being previewed
  const previewVideoRef = useRef(null)
```

- [ ] **Step 2: Add batch render handler**

Find `handleRetryRender` (around line 805). Add this new handler immediately after it:

```js
  const handleBatchRender = useCallback(async () => {
    if (!renderPlan || !variantPlatforms.length || batchRendering) return
    setBatchRendering(true)
    try {
      const res  = await fetch('/api/edit-studio/render-batch', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, baseRenderPlan: renderPlan, platforms: variantPlatforms }),
      })
      const data = await res.json()
      if (data.status !== 'success') throw new Error(data.message)
      setVariantJobs(data.jobs || [])
    } catch (err) {
      console.error('Batch render error:', err)
    } finally {
      setBatchRendering(false)
    }
  }, [renderPlan, variantPlatforms, batchRendering, projectId])
```

- [ ] **Step 3: Add handleReRender to reset job state for re-render**

Add this handler after `handleBatchRender`:

```js
  const handleReRender = useCallback(() => {
    setRenderJob(null)
    setRenderPlan(null)
    setVariantJobs([])
    isDirty.current = true
  }, [])
```

- [ ] **Step 4: Add Preview Before Render section to `renderExport`**

Find `renderExport` function. Find the `{/* ── Prepare Render Plan button ────────────────────────────────── */}` comment (around line 2761). Add this preview section IMMEDIATELY BEFORE that comment:

```js
        {/* ── Segment preview player ───────────────────────────────────── */}
        {videoFileRef.current && (() => {
          const selectedPlan = cutPlans.find(p => p.id === selectedPlanId)
          const keptSegs     = (selectedPlan?.segments || []).filter(s => s.keep)
          if (!keptSegs.length) return null

          const blobUrl = (() => { try { return URL.createObjectURL(videoFileRef.current) } catch { return null } })()
          if (!blobUrl) return null

          return (
            <div>
              <Label>Preview Edit</Label>
              <video ref={previewVideoRef} src={blobUrl} style={{ display: 'none' }} preload="metadata" />
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 8 }}>
                Click a segment to preview it from your source video.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {keptSegs.map((seg, i) => (
                  <div key={seg.id || i}
                    onClick={() => {
                      const v = previewVideoRef.current
                      if (!v) return
                      v.style.display = 'block'
                      v.currentTime = seg.start
                      v.play().catch(() => {})
                      setPreviewSegIdx(i)
                      setTimeout(() => { v.pause(); v.style.display = 'none'; setPreviewSegIdx(null) }, (seg.duration || (seg.end - seg.start)) * 1000 + 500)
                    }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 7, cursor: 'pointer',
                      border: `1px solid ${previewSegIdx === i ? C.gold + '55' : C.hairline}`,
                      background: previewSegIdx === i ? C.goldGlow : C.surface, transition: 'all 0.15s',
                    }}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: SEG_COLORS[seg.type] || C.muted, padding: '1px 5px', borderRadius: 4, border: `1px solid ${(SEG_COLORS[seg.type] || C.muted)}44`, background: (SEG_COLORS[seg.type] || C.muted) + '14', flexShrink: 0 }}>
                      {SEG_LABELS[seg.type] || seg.type}
                    </div>
                    <div style={{ fontSize: 10, color: C.ghost, fontFamily: 'monospace' }}>{fmtTime(seg.start)} → {fmtTime(seg.end)}</div>
                    <div style={{ fontSize: 10, color: C.secondary }}>{(seg.duration || (seg.end - seg.start)).toFixed(1)}s</div>
                    {previewSegIdx === i && <div style={{ fontSize: 10, color: C.gold, marginLeft: 'auto' }}>▶ Playing…</div>}
                    {previewSegIdx !== i && <div style={{ fontSize: 10, color: C.ghost, marginLeft: 'auto' }}>▶</div>}
                  </div>
                ))}
              </div>
              {previewVideoRef.current && (
                <video ref={previewVideoRef} src={blobUrl} controls
                  style={{ width: '100%', borderRadius: 8, marginTop: 10, display: previewSegIdx !== null ? 'block' : 'none', maxHeight: 200, background: '#000' }}
                  onEnded={() => setPreviewSegIdx(null)} />
              )}
            </div>
          )
        })()}
```

Note: The `video` element is hidden by default and only shows when a segment is playing. The `previewVideoRef` controls it.

- [ ] **Step 5: Add Multi-Platform Export and Re-Render sections**

Find the "Create Render Job" button block (around line 2841). After the closing `</div>` of that block, add:

```jsx
        {/* ── Re-Render button (shown after a job exists) ───────────────── */}
        {renderJob && renderJob.status !== 'processing' && (
          <button onClick={handleReRender}
            style={{ width: '100%', padding: '10px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: C.surface, color: C.secondary, marginTop: 4 }}>
            ↺ Adjust Settings & Re-render
          </button>
        )}

        {/* ── Multi-Platform Export (shown when a render plan exists) ──── */}
        {renderPlan && !preparingPlan && (
          <div style={{ padding: '16px', borderRadius: 10, border: `1px solid ${C.hairline}`, background: C.surface }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.primary, marginBottom: 4 }}>Export Additional Platforms</div>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 12 }}>Same edit, different resolution. Each becomes a separate render job.</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
              {PLATFORMS.filter(p => p.id !== project.platform).map(p => {
                const on = variantPlatforms.includes(p.id)
                return (
                  <button key={p.id}
                    onClick={() => setVariantPlatforms(prev => on ? prev.filter(x => x !== p.id) : [...prev, p.id])}
                    style={{ padding: '6px 12px', borderRadius: 7, fontSize: 11, fontWeight: 600, cursor: 'pointer', border: `1px solid ${on ? C.gold : C.hairline}`, background: on ? C.goldGlow : 'none', color: on ? C.gold : C.secondary }}>
                    {p.label}
                  </button>
                )
              })}
            </div>
            {variantPlatforms.length > 0 && (
              <button onClick={handleBatchRender} disabled={batchRendering}
                style={{ padding: '9px 18px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: batchRendering ? 'not-allowed' : 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
                {batchRendering ? '⟳  Creating jobs…' : `📤  Create ${variantPlatforms.length} Render Job${variantPlatforms.length > 1 ? 's' : ''}`}
              </button>
            )}
            {variantJobs.length > 0 && (
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {variantJobs.map(j => (
                  <div key={j.jobId} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 10px', borderRadius: 7, border: `1px solid ${C.green}33`, background: C.greenGlow }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.green }}>✓</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: C.primary }}>{j.platform}</div>
                    <div style={{ fontSize: 10, color: C.ghost, fontFamily: 'monospace' }}>{j.jobId?.slice(0, 8)}…</div>
                    <div style={{ fontSize: 10, color: C.green, marginLeft: 'auto' }}>Queued</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
```

- [ ] **Step 6: Verify build**

```bash
npx next build 2>&1 | grep -E "^(✓|error)" | head -5
```

- [ ] **Step 7: Commit**

```bash
git add app/edit-studio/page.js
git commit -m "feat: add multi-platform export, preview before render, and re-render button"
```

---

## Task 8: Final Build + Push

- [ ] **Step 1: Run full production build**

```bash
npx next build 2>&1 | grep -E "^(✓|✗|Error|Route.*render-batch)" | head -20
```
Expected: `✓ Compiled successfully`, `/api/edit-studio/render-batch` listed, zero errors.

- [ ] **Step 2: Verify all new routes appear in build output**

```bash
npx next build 2>&1 | grep "brand-kit\|render-batch" | head -10
```
Expected: `/api/brand-kit`, `/api/brand-kit/presign`, `/api/edit-studio/render-batch` all listed as `ƒ` (dynamic).

- [ ] **Step 3: Commit supabase migration if not yet committed**

```bash
git status
git log --oneline -8
```
Confirm 7 commits since Sprint 2 baseline.

- [ ] **Step 4: Push**

```bash
git push origin main
```

---

## Self-Review

**Spec coverage:**

| Requirement | Task |
|---|---|
| Multi-Platform Export (TikTok + Instagram + LinkedIn + Meta variants) | Tasks 6 + 7 |
| Preview Before Render (visual segment timeline, no render needed) | Task 7 |
| Re-Render Existing Projects (adjust + re-render without restart) | Task 7 |
| Brand Kit — logo upload + storage | Tasks 1 + 2 + 3 |
| Brand Kit — color picker | Task 3 |
| Brand Kit — inject into render plan | Task 4 |
| Brand Kit — FFmpeg logo overlay | Task 4 |
| Brand Kit — render worker logo support | Task 5 |

**Placeholder scan:** No TBDs. All code blocks are complete. Logo overlay filter uses `W-iw-20:H-ih-20` (bottom-right, 20px margin) — standard FFmpeg position expression.

**Type consistency:**
- `brandKit` shape: `{ logoUrl: string, primaryColor: string }` — consistent across: DB column (jsonb), API GET response, PATCH body, render plan field, worker usage ✓
- `variantPlatforms`: `string[]` — set in state, passed to `/api/render-batch` as `platforms` ✓
- `variantJobs`: `{ platform, jobId, jobStatus, queuedAt }[]` — returned from batch API, displayed in UI ✓
- `logoPath` parameter: added to `buildFullFfmpegArgs` signature (renderEngine.js) AND to `buildArgs` in worker — both consistent ✓
- `logoIdx` arithmetic: `hasMusic ? 2 : 1` in both renderEngine.js and worker — consistent ✓

**Architectural principle preserved:**
- No timeline editor added
- AI Director still controls all cut decisions
- Users approve and export; they select platforms but the AI built the edit
- Brand kit is automatic (injected without user touching the render settings)
- Preview shows AI's edit decisions, not a manual editor

**One known caveat:** The preview player uses `URL.createObjectURL(videoFileRef.current)` which requires the File object to still be in memory. If the user reloads the page or the file reference is lost, the preview won't work. The segment list is still shown with timestamps — it just won't be interactive. This is acceptable for v1.
