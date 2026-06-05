# Edit Studio Render Worker — Railway Deployment Guide

The render worker polls Supabase for queued render jobs and executes them using FFmpeg.
It runs as a persistent background worker on Railway — never sleeps, no request timeouts.

> **IMPORTANT:** This is a Next.js project but Railway must NOT build the Next.js app.
> The `nixpacks.toml` file explicitly overrides the build phase with `cmds = []` to
> skip `npm run build` entirely. If Railway tries to build Next.js, deployment will fail
> because of unrelated API route issues (`/api/create-checkout`, etc.).
> The render worker is a standalone Node.js script — it only needs `npm install`.

---

## Exact Railway Service Settings

| Setting | Value | Notes |
|---|---|---|
| **Service Type** | Worker | NOT Web — workers stay alive, no sleep |
| **Root Directory** | *(leave empty)* | Repo root |
| **Build Command** | *(leave completely blank)* | nixpacks.toml handles everything |
| **Start Command** | *(leave completely blank)* | nixpacks.toml sets `node scripts/render-worker.mjs` |

> Do NOT set a custom Build Command in Railway's settings panel. If you set one,
> it overrides nixpacks.toml. Leave Build Command blank and let nixpacks.toml control
> the entire build process.

---

## Step 1: Prerequisites

Before deploying, confirm:
- [ ] Railway account created at https://railway.app
- [ ] This repo pushed to GitHub with the updated `nixpacks.toml` (containing `[phases.build] cmds = []`)
- [ ] Supabase project is active
- [ ] `edit_render_jobs` table exists (from Edit Studio migrations)
- [ ] `edit-studio-exports` storage bucket exists in Supabase (private)
- [ ] `brand-assets` storage bucket exists in Supabase (private)

---

## Step 2: Create Railway Project

1. Log in to Railway → **New Project**
2. Select **Deploy from GitHub Repo**
3. Authorize Railway if prompted
4. Select the `prompt-ceo` repository

---

## Step 3: Configure the Service (Critical)

After the initial deploy attempt (which may fail — that is OK):

1. Click the service → **Settings → General**
2. **Service Type → Worker** (not Web)
3. **Build Command** → leave completely blank
4. **Start Command** → leave completely blank
5. **Root Directory** → leave blank

Then: **Deploy → Redeploy** to trigger a fresh build with correct settings.

---

## Step 4: Set Environment Variables

Railway → Service → **Variables** → Add each:

| Variable | Value | Where to find |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://yourproject.supabase.co` | Supabase → Settings → API → Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` (long key) | Supabase → Settings → API → `service_role` secret |
| `POLL_INTERVAL_MS` | `5000` | Checks for new jobs every 5 seconds |
| `MAX_CONCURRENT` | `1` | Start with 1, increase for parallel renders |
| `MAX_RETRIES` | `3` | Retry failed jobs up to 3 times |
| `STALE_MINUTES` | `10` | Reset stuck jobs after 10 minutes |

> ⚠️ Use the `service_role` key, NOT the `anon` key. The anon key causes all
> DB queries to fail silently due to RLS.

---

## Step 5: Verify Build Logs

In Railway → **Build** tab after deploying. You should see:

```
=== Nixpacks Build ===
✓ Installing ffmpeg-full (includes libass, libx264, aac)
✓ Installing nodejs_20
✓ npm install
✓ Build phase: skipped (cmds = [])
Starting: node scripts/render-worker.mjs
```

**If you see `npm run build` anywhere → the nixpacks.toml override did not apply:**
1. Confirm `nixpacks.toml` is at the repo root (same level as `package.json`)
2. Confirm `[phases.build]` section exists with `cmds = []`
3. Confirm Build Command in Railway Settings is blank
4. Push to GitHub and redeploy

---

## Step 6: Verify Worker Startup

Railway → **Logs** tab:

```
2026-06-05T... INFO  [-------] Edit Studio render worker starting { poll: 5000, ... }
2026-06-05T... INFO  [-------] FFmpeg found. Worker ready.
```

If you see `FFmpeg not found on PATH` → nixpacks setup failed. Redeploy.
If you see `Missing required env vars` → check the Variables tab.

---

## Step 7: End-to-End Test

1. Open Edit Studio → upload a short video (< 25 MB)
2. Transcript → AI Director → Cut Plan → Captions → Music → Upload Source → Prepare Plan → Create Job
3. Watch Railway Logs:
   ```
   INFO  [uuid] Job started
   INFO  [uuid] Downloading source video
   INFO  [uuid] Running FFmpeg { segments: 3, captions: true }
   INFO  [uuid] FFmpeg complete { outputMB: "4.2" }
   INFO  [uuid] Uploaded to storage
   INFO  [uuid] Job complete { exportUrl: "https://..." }
   ```
4. Edit Studio shows "✓ Render complete" → download the MP4

---

## Monitoring

Admin endpoints (requires admin PromptCEO account):
```
GET /api/admin/render-health    — Health status, queue size, last renders
GET /api/admin/render-ops       — Counts, avg duration, recent failures
```
Or: Account → Render Ops tab in the PromptCEO app.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| Railway runs `npm run build` and fails | nixpacks.toml not at repo root, or Build Command field is set in Railway — clear it |
| `FFmpeg not found on PATH` | Nixpacks setup failed — verify `nixPkgs = ["ffmpeg-full"]` in nixpacks.toml |
| Jobs stay `queued` forever | Wrong Supabase key — must be `service_role`, not `anon` |
| `Storage upload failed` | Create `edit-studio-exports` private bucket in Supabase Storage |
| Worker crashes repeatedly | Increase Railway memory to 512 MB+ for large videos |
| `Brand kit logo skipped` | Create `brand-assets` private bucket in Supabase Storage |
