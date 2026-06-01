# PromptCEO Edit Studio™ — Test Plan v0.1

Version: Edit Studio v0.1 Render Beta  
Last updated: 2026-06-01

---

## Setup Checklist

Before running tests, confirm:

- [ ] Local dev server running (`npm run dev`)
- [ ] Supabase project live and migrations applied (Phases 1–13)
- [ ] `OPENAI_API_KEY` set in `.env.local` (for Whisper + AI Director)
- [ ] `ANTHROPIC_API_KEY` set in `.env.local` (for AI Director enhanced analysis)
- [ ] `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` set
- [ ] Storage buckets created: `edit-studio-assets`, `edit-studio-exports`
- [ ] For render tests: `EDIT_STUDIO_RENDER_MODE=inline` and FFmpeg on PATH
- [ ] For worker tests: `EDIT_STUDIO_RENDER_MODE=queue` + worker running

---

## Test Suite

### T1 — Happy Path (full pipeline)

**Steps:**
1. Navigate to `/edit-studio`
2. Select platform: **Instagram Reel** | Goal: **Founder Update**
3. Drop a 20–30s `.mp4` video file
4. Enter project title
5. Click **Generate AI Edit** — wait ~2s for mock analysis
6. Switch to Transcript tab → click **Generate Transcript** → verify segments appear
7. Switch to AI Cut tab → click **Run AI Director Analysis** → verify Director Verdict
8. Click **Build AI Edit Plans** → verify 2 plan cards appear
9. Select the first plan → verify segment timeline shows
10. Click **Run AI Editor Cleanup** → verify removal items appear
11. Toggle one filler-word removal off → click **Apply Cleanup to Timeline**
12. Switch to Captions tab → click **Generate Captions** → verify rows appear
13. Switch to Music tab → click **Recommend Music** → verify scored tracks
14. Select "Drive Forward" → verify music bed controls appear
15. Switch to Export tab → verify Render Readiness checklist (all green or optional)
16. Click **Upload Source Video** → verify upload progress → green "uploaded" badge
17. Click **Prepare Render Plan** → verify render plan summary (segments, resolution, duration)
18. Click **Create Render Job** → verify job status card appears

**Expected (queue mode):** Status = `queued`, message explains worker  
**Expected (inline mode):** Status = `completed`, download buttons appear

**Pass criteria:** All 18 steps complete without error toast or console error.

---

### T2 — No API Key Fallback

**Setup:** Remove `OPENAI_API_KEY` and `ANTHROPIC_API_KEY` from `.env.local`

**Steps:**
1. Run T1 steps 1–7
2. After Generate Transcript: verify yellow "Mock transcript loaded for testing" warning
3. After Run AI Director: verify "AI provider unavailable. Mock director analysis loaded."
4. Continue through the pipeline

**Pass criteria:** All mock fallbacks display correctly. No unhandled errors. Pipeline completes to render plan.

---

### T3 — No FFmpeg Fallback (queue mode)

**Setup:** `EDIT_STUDIO_RENDER_MODE=queue` (or any machine without FFmpeg)

**Steps:**
1. Complete T1 up to Create Render Job
2. Click **Create Render Job**

**Expected:**
- Status card shows `queued`
- Message: "Render job queued. Production render worker will process it."
- Purple "You can leave this page and return later" panel visible
- `edit_render_jobs` table shows row with `status = 'queued'`

**Pass criteria:** No error. Job created. Correct messaging.

---

### T4 — Failed Render Recovery

**Setup:** `EDIT_STUDIO_RENDER_MODE=inline`, FFmpeg available, but **no source video URL** (don't upload to storage)

**Steps:**
1. Complete T1 steps 1–17 (skip step 16 — don't upload source)
2. Click **Create Render Job**

**Expected:**
- Status = `failed`
- Error: "No source video URL. Upload the source video to storage first."
- Retry Render button visible
- Copy Error button visible

**Steps continued:**
3. Click **Copy Error** → paste into text editor → verify JSON structure
4. Upload source video (step 16)
5. Click **Retry Render**

**Expected:** New job created; status moves to processing/completed

**Pass criteria:** Failure shows clearly. Retry works. No duplicate job IDs.

---

### T5 — Reload Project

**Setup:** Complete T1 through step 14 (music selected). Note the project ID.

**Steps:**
1. Reload the page (`F5`)
2. Click `☰` to open Recent Projects
3. Click **Open** on the saved project

**Expected state restored:**
- [ ] Project title + platform + goal
- [ ] Source video name (file ref lost — expected; re-upload needed for render)
- [ ] Transcript segments
- [ ] AI Director analysis
- [ ] Cut plans + selected plan
- [ ] Editor cleanup
- [ ] Caption timeline
- [ ] Music intelligence + selected music bed
- [ ] Render plan (if prepared)
- [ ] Render job (status + exportUrl if completed)

**Pass criteria:** All state items above restore correctly. Step bar reflects correct progress.

---

### T6 — Duplicate Project

**Steps:**
1. Open Recent Projects sidebar
2. Click **Copy** on any project
3. Verify a new project appears with "(copy)" suffix
4. Open the copy → verify all state is correct (no linkage to original)

**Pass criteria:** Copy creates independent project. Changes to copy don't affect original.

---

### T7 — Local Inline Render (full output)

**Setup:** `EDIT_STUDIO_RENDER_MODE=inline`, FFmpeg installed, `ANTHROPIC_API_KEY` and `OPENAI_API_KEY` set

**Steps:**
1. Complete T1 full happy path including source upload
2. Create Render Job
3. Wait for completion (< 60s for 30s video)

**Expected:**
- Status = `completed`
- Render details show: ✓ Video cuts, ✓/⚠ Captions, ✓/⚠ Music
- Download MP4 button appears
- Click Download → verify MP4 plays

**Pass criteria:** Real MP4 downloads. Plays correctly. Duration matches edit plan.

---

### T8 — Worker Render

**Setup:** `EDIT_STUDIO_RENDER_MODE=queue`, render worker running (`node workers/edit-render-worker.mjs`)

**Steps:**
1. Create a render job (T1 through Create Render Job)
2. Observe worker logs in terminal:
   - `"level":"info","message":"Job claimed"`
   - `"level":"info","message":"Downloading source video"`
   - `"level":"info","message":"FFmpeg started"`
   - `"level":"info","message":"Upload started"`
   - `"level":"info","message":"Job completed"`
3. Return to Edit Studio page (or leave it open — polling updates automatically)
4. Verify status changes from `queued` → `processing` → `completed`

**Pass criteria:** Worker claims job. Renders. Uploads. Download appears in UI.

---

### T9 — Caption Rendering

**Setup:** `EDIT_STUDIO_RENDER_MODE=inline`, FFmpeg with libass support

**Steps:**
1. Generate captions (T1 step 12)
2. Select "Bold TikTok" preset in Captions tab
3. Complete render

**Inspect output MP4:**
- Captions should appear uppercase at center screen
- Font: Arial Black, large

**Expected Render Details:** `✓ Captions`

**Pass criteria:** Captions visible in rendered MP4. Correct preset style.

---

### T10 — Music Skipped (no fileUrl)

**Setup:** Select a music track that has no `fileUrl`/`trackUrl` property

**Steps:**
1. Select any music track
2. Note: mock tracks don't have `fileUrl` set
3. Render the project

**Expected:**
- Render completes
- Render Details: `⚠ Music bed — Music skipped: No music file URL in selected music bed.`

**Pass criteria:** Render succeeds. Warning shown. No crash.

---

### T11 — Pipeline Health Panel

**Steps:**
1. Open Edit Studio at any state
2. Press `Ctrl+D` → health panel appears below nav
3. Verify all green/grey indicators match actual state
4. Complete one more workflow step
5. Verify health panel updates
6. Press `Ctrl+D` again → panel closes

**Pass criteria:** Health panel shows accurate state. Keyboard shortcut works.

---

### T12 — Mobile Layout Check

**Steps:**
1. Open Chrome DevTools → responsive mode → 375×812 (iPhone 14)
2. Navigate through all 6 steps
3. Verify: nav doesn't overflow, step bar is readable, buttons are tappable

**Pass criteria:** No horizontal scroll. All interactive elements accessible. Upload zone visible.

---

## Known Limitations (v0.1 Render Beta)

| Limitation | Phase |
|---|---|
| Source video must be re-uploaded after page reload (File object not persisted) | Phase 10+ |
| Music tracks need `fileUrl` set to render — mock tracks don't have it | Phase 12B |
| Per-word highlighted captions not yet rendered | Phase 12B |
| Caption fonts depend on server having Arial / Arial Black / Georgia installed | Phase 12B |
| Renders > 60s may timeout on Vercel (use worker for longer content) | Phase 11 |
| No publishing/sharing yet | Phase 14+ |
| No drag-to-reorder segments | Phase 14+ |

---

## Regression Checklist (run after each phase)

- [ ] Existing PromptCEO Studio (`/prompt-engine-v3`) still loads
- [ ] Existing Ad Studio still loads and generates
- [ ] `/edit-studio` route loads without console errors
- [ ] Recent Projects sidebar opens and lists projects
- [ ] Upload → mock Generate AI Edit flow still works end-to-end
- [ ] All 6 step tabs are accessible after mock analysis

---

## Error Code Reference

| Code | Route | Meaning |
|---|---|---|
| `TRANSCRIBE_FATAL` | `/transcribe` | Unhandled error in transcription route |
| `ANALYZE_FATAL` | `/analyze` | Unhandled error in analysis route |
| `RENDER_FATAL` | `/render` | Unhandled error in render route |
| — | — | More codes added as routes are hardened |
