# PromptCEO Edit Studio™ — Phase 15 Deployment Guide
# v0.1 Render Beta

---

## Overview

Two services to deploy:

| Service | What it does | Where |
|---|---|---|
| **Next.js app** | Edit Studio UI + all API routes | Vercel |
| **Render Worker** | FFmpeg video rendering | Render.com / Railway / Fly.io / VPS |

---

## Step 1 — Push code to GitHub

```bash
# From the project root:
git add .
git commit -m "feat: PromptCEO Edit Studio™ v0.1 Render Beta (Phases 1–15)"
git push origin main
```

---

## Step 2 — Apply Supabase migrations

Run these in the Supabase SQL Editor **in order**:

1. `supabase/migrations/20260601_edit_studio.sql`
2. `supabase/migrations/20260601_edit_studio_phase4.sql`
3. `supabase/migrations/20260601_edit_studio_phase5.sql`
4. `supabase/migrations/20260601_edit_studio_phase6.sql`
5. `supabase/migrations/20260601_edit_studio_phase7.sql`
6. `supabase/migrations/20260601_edit_studio_phase8.sql`
7. `supabase/migrations/20260601_edit_studio_phase9.sql`
8. `supabase/migrations/20260601_edit_studio_phase10.sql`
9. `supabase/migrations/20260601_edit_studio_phase11.sql`
10. `supabase/migrations/20260601_edit_studio_phase12.sql`

> **Verify:** Tables `edit_projects`, `edit_render_jobs`, and related tables exist.
> Run: `SELECT table_name FROM information_schema.tables WHERE table_name LIKE 'edit_%';`

---

## Step 3 — Create Supabase Storage buckets

In the Supabase dashboard → Storage → New bucket:

| Bucket name | Public | File size limit |
|---|---|---|
| `edit-studio-assets` | No (private) | 2 GB |
| `edit-studio-exports` | No (private) | 2 GB |

Or run `supabase/migrations/20260601_edit_studio_phase10.sql` — it includes the bucket creation SQL.

> **If bucket SQL fails:** Create manually in the dashboard. The policies in that migration still need to be applied via SQL Editor.

---

## Step 4 — Deploy Next.js app to Vercel

1. Go to [vercel.com](https://vercel.com) → your project → Settings → Environment Variables
2. Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL         = https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY    = eyJ... (anon/public key)
SUPABASE_SERVICE_ROLE_KEY        = eyJ... (service role key — keep secret)
OPENAI_API_KEY                   = sk-...
ANTHROPIC_API_KEY                = sk-ant-...
EDIT_STUDIO_RENDER_MODE          = queue
```

3. Trigger a redeploy (or push to main, Vercel will auto-deploy)

> **Verify:** Visit `https://your-app.vercel.app/edit-studio` — the page loads and shows the Upload tab.

---

## Step 5 — Deploy render worker

### Option A: Render.com (recommended for first deploy)

1. [render.com](https://render.com) → New → Background Worker
2. Connect your GitHub repo
3. Set:
   - **Name:** `edit-render-worker`
   - **Root Directory:** *(leave blank — use project root)*
   - **Build Command:** `cd workers && npm install`
   - **Start Command:** `cd workers && node edit-render-worker.mjs`
   - **Instance Type:** Starter ($7/mo) — 512 MB RAM, 0.5 CPU

4. Add environment variables:
```
NEXT_PUBLIC_SUPABASE_URL      = https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY     = eyJ... (service role key)
EDIT_RENDER_WORKER_ID         = worker-render-01
EDIT_RENDER_POLL_INTERVAL_MS  = 5000
EDIT_RENDER_STALE_TIMEOUT_MS  = 600000
EDIT_RENDER_FFMPEG_TIMEOUT_MS = 300000
```

> **Important:** Render.com Starter instances do NOT include FFmpeg by default.
> Use the **Dockerfile** approach (Option C) to ensure FFmpeg is installed.

### Option B: Railway

1. [railway.app](https://railway.app) → New Project → Deploy from GitHub
2. Select your repo → Add service
3. Set **Start Command:** `cd workers && node edit-render-worker.mjs`
4. Add a nixpacks.toml in the workers directory:

```toml
# workers/nixpacks.toml
[phases.setup]
nixPkgs = ["ffmpeg", "nodejs_20"]
```

5. Add environment variables (same as Render.com above)

### Option C: Docker (any VPS / Render with Dockerfile)

```bash
# Build
docker build -f workers/Dockerfile -t edit-render-worker .

# Run with env file
cp workers/worker.env.example workers/.env
# Fill in workers/.env
docker run --env-file workers/.env edit-render-worker
```

For Render.com with Dockerfile: choose "Docker" as the environment type, set Dockerfile path to `workers/Dockerfile`.

### Option D: VPS with PM2

```bash
# SSH into your server
ssh user@your-server

# Install Node 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install FFmpeg
sudo apt-get install -y ffmpeg

# Clone/pull repo
git pull origin main

# Install worker deps
cd workers && npm install

# Create env file
cp worker.env.example .env
nano .env  # fill in your values

# Start with PM2
npm install -g pm2
pm2 start edit-render-worker.mjs --name edit-render-worker
pm2 save
pm2 startup
```

---

## Step 6 — Verify worker is running

Check worker logs:

**Render.com:** Dashboard → Service → Logs tab  
**Railway:** Dashboard → Deployment → Logs  
**VPS:** `pm2 logs edit-render-worker`

You should see:
```json
{"ts":"...","level":"info","message":"Render worker starting","workerId":"worker-render-01","pollIntervalMs":5000}
{"ts":"...","level":"info","message":"FFmpeg available"}
{"ts":"...","level":"info","message":"Database connected"}
{"ts":"...","level":"info","message":"Worker ready — polling for jobs"}
```

---

## Step 7 — First real render

1. Open `/edit-studio`
2. Upload a PromptCEO screen recording or talking-head video (< 500 MB)
3. Select platform + goal
4. Click **Next: Generate Transcript →**
5. In Transcript tab: click **Generate Transcript** — wait for Whisper
6. AI Cut tab: click **Run AI Director Analysis**
7. Click **Build AI Edit Plans** → select a plan
8. Click **Run AI Editor Cleanup** → apply
9. Captions tab: click **Generate Captions**
10. Music tab: click **Recommend Music** → select track → add a file URL
11. Export tab: click **Upload Source Video** → wait for upload
12. Click **Prepare Render Plan** → review the render plan
13. Click **Create Render Job**
14. Watch worker logs — job should move `queued → processing → completed`
15. Return to Edit Studio — status updates to `completed` via polling
16. Click **Download MP4**
17. Review the output

---

## Troubleshooting

| Problem | Likely cause | Fix |
|---|---|---|
| Worker keeps logging "No jobs" | Render mode still `inline` on app | Set `EDIT_STUDIO_RENDER_MODE=queue` in Vercel |
| Job fails: "No source video URL" | Source video not uploaded to storage | Use "Upload Source Video" button in Export tab |
| Job fails: "FFmpeg not found" | FFmpeg not installed in worker container | Use Docker image with FFmpeg or install via apt |
| Job fails: "libass/subtitle" | FFmpeg built without libass | Add `libass-dev` to Docker, or disable captions |
| Music skipped | No fileUrl on music track | Add a direct MP3/AAC URL in the Music tab |
| Whisper returns 413 | Video > 25 MB | Compress video or extract audio first |
| Captions not visible | Fonts not installed on worker server | Install `fonts-liberation` package |
| Download link expired | Signed URL is 1 hour | Re-open render status route to get fresh URL |

---

## Supabase RPC check

Verify the `claim_render_job` function exists:
```sql
SELECT proname FROM pg_proc WHERE proname = 'claim_render_job';
```

If it returns nothing, run the Phase 11 migration again.

---

## First render checklist

- [ ] App deployed and `/edit-studio` loads
- [ ] Storage buckets exist (both private)
- [ ] Worker deployed and showing "polling" in logs
- [ ] `edit_render_jobs` table has columns `worker_id`, `processing_started_at`, `render_details`
- [ ] Full pipeline ran without errors
- [ ] MP4 downloaded and plays correctly
- [ ] Duration matches selected edit plan
- [ ] Captions visible (if enabled)
- [ ] Music audible (if fileUrl set)

---

## Milestone

**PromptCEO Edit Studio™ v0.1 Render Beta**

Upload → Transcript → AI Director → Edit Plan → Captions → Music → Export → MP4

The first AI-native creative operating system for short-form video.
