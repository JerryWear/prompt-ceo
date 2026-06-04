# Edit Studio Render Worker

Processes queued video render jobs from the `edit_render_jobs` table.

## Requirements

- Node.js 18+
- FFmpeg on PATH (`ffmpeg -version` must work)
- `@supabase/supabase-js` installed in the project

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | — | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | — | Service role key (from Supabase Settings → API) |
| `POLL_INTERVAL_MS` | No | 5000 | How often to check for new jobs (ms) |
| `MAX_CONCURRENT` | No | 1 | Max simultaneous renders |
| `MAX_RETRIES` | No | 3 | Max retry attempts per job before marking failed |
| `STALE_MINUTES` | No | 10 | Minutes before a 'processing' job is considered stale and reset |

## Running

```bash
# Copy project .env.local vars into your environment, then:
node scripts/render-worker.mjs

# With PM2 (persistent):
pm2 start scripts/render-worker.mjs --name edit-studio-worker
pm2 save

# With custom config:
POLL_INTERVAL_MS=3000 MAX_RETRIES=2 node scripts/render-worker.mjs
```

## Deployment

Deploy to any server with FFmpeg installed. Recommended options:
- **Railway** — add a service pointing at this repo, set env vars, runs automatically
- **Fly.io** — `fly launch` with a Dockerfile that installs ffmpeg
- **Render.com** — background worker service

## How it works

1. On boot, recovers any jobs stuck in 'processing' from a previous crash
2. Polls `edit_render_jobs` every `POLL_INTERVAL_MS` for status='queued' jobs
3. For each job: downloads source → generates caption ASS file → downloads music → runs FFmpeg → uploads MP4 to Supabase Storage
4. Sets `export_url` on completion; the Edit Studio UI polls render-status and shows the download button
5. On failure: retries up to `MAX_RETRIES` times, then marks the job failed with an error message
6. Music tracks with relative `/api/stream-track/` URLs are resolved directly via Supabase by `trackId`
