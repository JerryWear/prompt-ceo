# Edit Studio Render Worker — Railway Deployment Guide

The render worker polls Supabase for queued render jobs and executes them using FFmpeg.

---

## ⚠️ Why We Use a Dockerfile (Not Nixpacks)

This is a Next.js project. Railway's nixpacks auto-detector sees `package.json` with
`"build": "next build"` and runs it regardless of `nixpacks.toml` overrides or custom
Build Commands set in the Railway UI. The full Next.js build fails on unrelated API routes
(`/api/create-checkout` etc.) which have no relation to the render worker.

**Solution:** `Dockerfile.worker` at the repo root. When Railway is pointed at this file,
Docker builds instead of nixpacks — complete control, no auto-detection.

---

## Exact Railway Service Settings

| Setting | Value |
|---|---|
| **Service Type** | `Worker` |
| **Docker File Path** | `Dockerfile.worker` |
| **Build Command** | *(leave blank — Docker handles it)* |
| **Start Command** | *(leave blank — CMD in Dockerfile handles it)* |
| **Root Directory** | *(leave blank)* |

---

## Step 1: Prerequisites

- [ ] Railway account at https://railway.app
- [ ] Repo pushed to GitHub (with `Dockerfile.worker` present)
- [ ] `edit_render_jobs` table in Supabase (from Edit Studio migrations)
- [ ] `edit-studio-exports` private bucket in Supabase Storage
- [ ] `brand-assets` private bucket in Supabase Storage

---

## Step 2: Create Railway Project

1. Railway → **New Project → Deploy from GitHub Repo**
2. Select the `prompt-ceo` repository
3. Railway will create a service — the initial deploy may fail (expected)

---

## Step 3: Switch to Docker + Worker Settings (Critical)

In Railway → Service → **Settings**:

1. **Docker File Path** → type exactly: `Dockerfile.worker`
   *(This is the single most important setting — it bypasses nixpacks entirely)*
2. **Service Type** → `Worker`
3. **Build Command** → leave completely blank
4. **Start Command** → leave completely blank
5. **Root Directory** → leave blank

Click **Save** → then **Deploy → Redeploy**.

---

## Step 4: Set Environment Variables

Railway → Service → **Variables** → add each:

| Variable | Value | Source |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://yourproject.supabase.co` | Supabase → Settings → API → Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` (service role secret) | Supabase → Settings → API → `service_role` key |
| `POLL_INTERVAL_MS` | `5000` | How often to poll (milliseconds) |
| `MAX_CONCURRENT` | `1` | Parallel renders |
| `MAX_RETRIES` | `3` | Retries per failed job |
| `STALE_MINUTES` | `10` | Reset stuck jobs after N minutes |

> ⚠️ Must be the `service_role` key (long `eyJ...`), NOT the `anon` key.

---

## Step 5: Verify Build Logs

Railway → **Build** tab should show Docker build output:

```
=> FROM node:20-slim
=> RUN apt-get install -y ffmpeg
=> ✓ FFmpeg with subtitles/libass filter confirmed
=> COPY package.json ...
=> RUN npm install
=> COPY scripts/render-worker.mjs
```

**You should NOT see `npm run build` or `next build` anywhere.**

If you do see `npm run build`:
1. Confirm "Docker File Path" = `Dockerfile.worker` is saved in Railway Settings
2. Confirm `Dockerfile.worker` was pushed to GitHub before deploying
3. Redeploy

---

## Step 6: Verify Worker Startup

Railway → **Logs** tab:

```
INFO  [-------] Edit Studio render worker starting { poll: 5000, maxConcurrent: 1 }
INFO  [-------] FFmpeg found. Worker ready.
```

**If `FFmpeg not found`:** The Docker build failed — check the Build tab for errors.

**If `Missing required env vars`:** Check that both Supabase env vars are set in Variables.

---

## Step 7: End-to-End Test

1. Edit Studio → Upload video → full pipeline → Create Render Job
2. Railway Logs (within ~30s):
   ```
   INFO  [uuid] Job started
   INFO  [uuid] Downloading source video
   INFO  [uuid] Running FFmpeg { segments: N, captions: true }
   INFO  [uuid] FFmpeg complete { outputMB: "X.X" }
   INFO  [uuid] Uploaded to storage
   INFO  [uuid] Job complete
   ```
3. Edit Studio shows "✓ Render complete" → download works

---

## Verify libass (Caption Burn-in)

The `Dockerfile.worker` verifies libass at build time:
```
✓ FFmpeg with subtitles/libass filter confirmed
```

If captions don't appear in the rendered MP4:
1. Check the build log for the libass verification line
2. If it's missing, Railway may have a restricted Docker environment — contact Railway support

---

## Monitoring

Admin endpoints (requires admin account):
```
GET /api/admin/render-health   — Health, queue size, last renders
GET /api/admin/render-ops      — Counts, avg duration, failures
```
Or: Account → Render Ops tab.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Build runs `npm run build` | Docker File Path not set | Set "Docker File Path" = `Dockerfile.worker` in Railway Settings |
| `FFmpeg not found` | Docker build failed | Check Railway Build tab for Docker errors |
| Jobs stay `queued` forever | Wrong Supabase key | Must be `service_role`, not `anon` |
| `Storage upload failed` | Bucket missing | Create `edit-studio-exports` private bucket in Supabase |
| Captions missing from MP4 | libass verification failed | Check build log for `✓ subtitles/libass filter confirmed` |
| Worker OOM crash | Video too large | Increase Railway memory to 512 MB+ in service settings |
