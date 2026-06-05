# Edit Studio Render Worker — Railway Deployment Guide

The render worker polls Supabase for queued render jobs and executes them using FFmpeg.
It runs as a persistent background worker on Railway — never sleeps, no request timeouts.

---

## Step 1: Prerequisites

Before deploying, confirm:
- [ ] Railway account created at https://railway.app
- [ ] This repo is pushed to GitHub
- [ ] Supabase project is active
- [ ] `edit_render_jobs` table exists (from Edit Studio migrations)
- [ ] `edit-studio-exports` storage bucket exists in Supabase
- [ ] `brand-assets` storage bucket exists in Supabase

---

## Step 2: Create Railway Project

1. Log in to Railway → **New Project**
2. Select **Deploy from GitHub Repo**
3. Authorize Railway to access your GitHub if not already done
4. Select the `prompt-ceo` repository
5. Railway will detect `nixpacks.toml` automatically

---

## Step 3: Configure the Service

1. In the Railway project, click the service that was created
2. Go to **Settings → General**
3. Set **Service Type** to **Worker** (not Web — workers don't sleep)
4. The start command is already set by `nixpacks.toml`: `node scripts/render-worker.mjs`

---

## Step 4: Set Environment Variables

In Railway → Service → **Variables**, add these:

| Variable | Value | Where to find |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://yourproject.supabase.co` | Supabase → Settings → API → Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` (service role secret) | Supabase → Settings → API → service_role key |
| `POLL_INTERVAL_MS` | `5000` | Checks for new jobs every 5 seconds |
| `MAX_CONCURRENT` | `1` | Increase to 2+ for parallel renders |
| `MAX_RETRIES` | `3` | Retry failed jobs up to 3 times |
| `STALE_MINUTES` | `10` | Reset jobs stuck in processing after 10 min |

---

## Step 5: Deploy

1. Railway deploys automatically when you push to GitHub
2. Watch the **Logs** tab — you should see:
   ```
   INFO  [-------] Edit Studio render worker starting { poll: 5000, ... }
   INFO  [-------] FFmpeg found. Worker ready.
   ```
3. If you see `FFmpeg not found on PATH` — verify `nixpacks.toml` is at the project root

---

## Step 6: Verify FFmpeg and libass

After deploy, in Railway → Logs, look for the startup message. To verify libass (needed for caption burn-in):

1. Queue a test render with captions enabled in Edit Studio
2. In Railway Logs, watch for:
   ```
   INFO  [jobid] Running FFmpeg { segments: N, captions: true, music: false }
   INFO  [jobid] FFmpeg complete { outputMB: "X.X" }
   INFO  [jobid] Job complete { exportUrl: "https://..." }
   ```
3. Download the rendered MP4 — if captions appear burnt in, libass is working

---

## Step 7: Confirm Worker is Running

Use these admin API endpoints (requires admin account):

```bash
# Health check — queue depth, last renders, status
curl -H "Cookie: your-session-cookie" https://yourapp.com/api/admin/render-health

# Full stats — counts by status, avg duration, recent failures  
curl -H "Cookie: your-session-cookie" https://yourapp.com/api/admin/render-ops
```

Or use the Admin Panel in the PromptCEO app → Account → Render Ops tab.

Expected healthy response:
```json
{
  "status": "idle",
  "statusMessage": "Worker is idle — no jobs queued.",
  "queueSize": 0,
  "activeJobs": 0
}
```

---

## Step 8: End-to-End Test

1. Open Edit Studio → upload a short video (< 25 MB)
2. Run Transcript → AI Director → Select Cut Plan → Generate Captions → Select Music
3. On Export tab → Upload Source Video → Prepare Render Plan → Create Render Job
4. Watch Railway Logs for the job being picked up
5. The Edit Studio UI polls every 3s — within ~60s you should see "Render complete"
6. Download the MP4

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| Worker starts but `FFmpeg not found` | Check `nixpacks.toml` is at repo root, not in a subdirectory |
| Jobs stay `queued` forever | Verify `SUPABASE_SERVICE_ROLE_KEY` is correct and not the anon key |
| Caption rendering fails | `libass` is included in `ffmpeg-full` — if subtitles filter fails, check FFmpeg version |
| `Storage upload failed` | Verify `edit-studio-exports` bucket exists and is private in Supabase |
| `Brand kit logo skipped` | Verify `brand-assets` bucket exists |
| Worker crashes after N jobs | Check Railway memory limit — increase to 512MB+ for long videos |

---

## Scaling

- **More throughput:** Set `MAX_CONCURRENT=2` and increase Railway service memory
- **Redundancy:** Add a second Railway service pointing at the same worker file
- **Monitoring:** Use `/api/admin/render-health` on a cron to alert on stale queues
