# PromptCEO — Claude Operating Handbook

> This file is the permanent operating brain for all Claude Code sessions on this project.
> Every session starts here. Every decision gets made against it.
> Keep it current. Never delete it.

---

## Company Vision

PromptCEO is becoming the world's first **AI Creative Operating System** — a unified platform where creators, marketers, and businesses use AI not just as a writing tool but as a complete creative and business intelligence layer.

The long-term destination is **PromptCEO OS**: a platform where an AI Director (Jarvis) knows your brand, your audience, your assets, and your roadmap — and acts as a Creative Director, Growth Advisor, and Campaign Engineer simultaneously.

We are not building a prompt generator.
We are building the operating system for AI-native businesses.

---

## Current Session State
Last updated: 2026-06-13
Last completed: Jarvis Railway worker pipeline complete — workers/jarvis-render-worker.mjs created, submit-render + render-status API routes created, page.js wired to submit job + poll. compile-ad route kept intact.
In progress: none
Next atomic task: Deploy jarvis-render-worker to Railway as a new Worker service (separate from Edit Studio worker). Required env vars on Railway: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY. Also set JARVIS_SKIP_RUNWAY=true in Vercel dashboard.
DO NOT touch: renderEngine.js, webhook handler, ViralAnalyzer, workers/edit-render-worker.mjs

---

## Product Mission

Give creators and marketers the AI intelligence stack that only Fortune 500 companies with dedicated creative teams could previously afford.

Every feature should:
1. Save time that would otherwise be spent in briefs, decks, and agency back-and-forth
2. Produce output good enough to publish or pitch without heavy editing
3. Build institutional knowledge about the user's brand over time

---

## Product Philosophy

**Depth over breadth.** One feature that works perfectly beats five that work partially. Never ship half-finished flows.

**Memory compounds.** Every interaction should leave the user's profile richer than before. PromptCEO gets smarter the longer someone uses it.

**Simplicity is the interface; power is the engine.** Users see a clean, fast UI. Under the hood, multi-layer AI systems are running. Never expose the complexity.

**No feature orphans.** Every feature must connect to at least one other feature. Isolated tools are dead weight.

**Test before you trust.** Never ship image generation, video generation, Stripe integration, or Supabase writes without verifying the actual output.

---

## System Architecture

PromptCEO is a Next.js 16 / React 19 monorepo. All application code lives under `app/`. There is no separate backend service — everything runs as Next.js API routes or edge functions.

### Prompt Studio (`app/prompt-engine-v3/`, `app/prompt-v2/`)

The original product. Generates cinematic, structured prompts for AI image generators (Midjourney, FLUX, DALL-E). Built on a layered resolver system:

- `app/prompt-engine-v3/layers/` — 8 layers: subject, scene, environment, story, wardrobe, camera, lighting, mood
- `app/prompt-engine-v3/resolvers/` — worldResolver, styleResolver, moodResolver
- `app/prompt-engine-v3/ad-system/` — brand DNA, music recommendation, ad intelligence
- Story worlds live in `app/prompt-v2/story-worlds/` — each world is a JS module exporting structured prompt data

Key rule: **Never mutate a layer's output in a downstream layer.** Each layer reads from context, not from previous layer output.

### Ad Studio (`app/ad-system/`, API routes under `app/api/`)

Multi-phase ad creation system. Users build an ad through:
1. Brand DNA capture (`app/api/brand-dna/`)
2. Angle + hook generation (`app/api/generate-ad-text/`)
3. Image generation (`app/api/generate-image/` — OpenAI DALL-E 3)
4. Campaign sequencing (`app/api/campaign-sequencer/`)
5. Save/load projects (`app/api/save-ad-project/`, `app/api/load-ad-projects/`)

The Ad Studio and Prompt Studio share a **Campaign Brain** — a persistent object that carries `selectedAngle`, `selectedHook`, `brandDNA`, and `projectMemory` across the session.

### AI Director (`app/api/ai-director/`, `app/api/creative-director/`)

The intelligence layer sitting above all studios. The AI Director:
- Analyzes product + brand context
- Recommends angles, hooks, and creative approaches
- Injects `systemContext` into all downstream AI calls
- Powers the "Use This" buttons in the context bar

The Creative Director adds a human-voice layer: it writes director notes, suggests campaign evolution, and reasons about why a creative direction will or won't work for a specific audience.

### PromptCEO OS (`app/api/os-memory/`, `app/api/orchestration-engine/`)

The operating system layer. Stores user memory across sessions:
- `os-memory/write` — persists product decisions, audience insights, brand data
- `os-memory/recent` — retrieves the last N memory entries for context injection
- `orchestration-engine` — multi-step campaign planning that sequences multiple AI calls with dependencies

OS memory is stored in Supabase. Schema: `os_memory` table with `user_id`, `memory_type`, `content`, `created_at`.

### Project Brain (`app/api/project-brain/[id]/`, `app/api/projects/`)

Per-project persistent intelligence. Every ad project has a Brain that:
- Tracks what's been tried and what worked
- Stores the `brandDNA` for that project
- Feeds into campaign sequencing and evolution
- Powers the performance reasoning endpoint

### Campaign Evolution (`app/api/campaign-timeline/`, `app/api/campaign-journey/`, `app/api/iterate-campaign/`, `app/api/adapt-campaign/`)

After an ad campaign is created, Campaign Evolution:
- Tracks performance signals (`app/api/performance-logs/`, `app/api/performance-insights/`)
- Suggests iterations based on what's working
- Generates next-phase creative (`app/api/campaign-next-phase/`)
- Produces A/B test recommendations (`app/api/ab-test-insight/`)

### Edit Studio (`app/edit-studio/`, API routes under `app/api/edit-studio/`)

Full video editing pipeline. Users upload raw footage and get back a cut MP4. Pipeline:
1. Upload source video (`upload-source`)
2. Transcription via OpenAI Whisper (`transcribe`) — 25MB file limit
3. AI Director analysis (`analyze`) — identifies best moments
4. Edit plan generation (`render-plan`)
5. Caption generation (`captions`)
6. Music selection (`music` — integrates with Music Studio)
7. FFmpeg render (`render`) — produces final MP4
8. Status polling (`render-status`)

Edit Studio state is stored in Supabase: `edit_projects` table. Jobs are ephemeral — do not rely on in-memory state between API calls.

Known issue: **render-status polling can enter a phantom loop** if the job record isn't cleaned up on completion. Always check job `status` field before returning "in progress".

### Music Intelligence (`app/music-studio/`, `app/api/music-studio/`, `app/lib/music/`)

AI-powered music library with smart recommendations:
- `app/lib/music/scorer.js` — shared scorer, `recommendMusicForAd(adContext)` returns tracks sorted by `whyFits` score
- `app/api/music-studio/recommend/` — recommendation endpoint
- `app/api/music-studio/intelligence/` — Soundtrack Intelligence™: campaign-memory-aware picks
- `app/api/music-studio/log-usage/` — writes to `music_usage_logs` table
- `app/api/music-studio/licenses/` — licensing workflow

Music tracks are seeded in Supabase `music_tracks` table. Default tab is Recommendations (not Browse).

### Future Jarvis Layer

Jarvis does not exist as code yet. It is the planned evolution of the AI Director into a full operating intelligence that spans all studios. See `docs/superpowers/jarvis-architecture.md` for the blueprint.

---

## Data Layer

**Supabase** is the only database. No other storage except Supabase and local filesystem (for render temp files).

Key tables:
| Table | Purpose |
|-------|---------|
| `users` | Auth (via Supabase Auth) |
| `os_memory` | Cross-session AI memory |
| `ad_projects` | Saved ad campaigns |
| `edit_projects` | Edit Studio jobs |
| `full_day_projects` | Perfect Day™ projects |
| `music_tracks` | Music library |
| `music_usage_logs` | Track usage analytics |
| `performance_logs` | Ad performance data |
| `brand_profiles` | Per-user brand DNA |
| `creator_profiles` | Creator personas |
| `client_brands` | Agency client brands |
| `affiliate_applications` | Affiliate program |

**Never write raw SQL migrations** — always use Supabase migrations or the Supabase Studio UI for schema changes.

---

## External Services

| Service | Purpose | Key Files |
|---------|---------|-----------|
| OpenAI | Text generation (GPT-4o), image gen (DALL-E 3), transcription (Whisper) | Most API routes |
| xAI (Grok) | Alternative model for specific reasoning tasks | `XAI_API_KEY` |
| Stripe | Billing, subscriptions, credits, webhooks | `app/api/checkout/`, `app/api/webhook/` |
| RunwayML | AI video generation | `app/api/runway/` |
| HeyGen | Avatar video generation | `app/api/heygen/` |
| Synthesia | Presentation video generation | `app/api/synthesia/` |
| Supabase | Database + Auth + Storage | Throughout |

---

## Membership Plans

Users are gated by plan. Always respect these limits when writing features.

| Plan | Key Capabilities |
|------|-----------------|
| **Creator** | Prompt Studio, basic Ad Studio, limited generations |
| **Studio Pro** | Full Ad Studio, AI Director, Campaign Evolution |
| **Pro** | All Studio Pro + advanced analytics, Edit Studio |
| **Agency** | All Pro + client brand management, team features, white-label |
| **Music Add-on** | Music Studio access (add-on to any plan) |

Credit system: Users purchase credit packs ($50/$100/$250/$500) for generation bursts above plan limits.

**Never remove a membership gate without explicit instruction.** Check `app/api/subscription/` for the current gate logic.

---

## AI Model Usage

| Model | Use Case |
|-------|---------|
| `gpt-4o` | Primary generation: prompts, ad copy, campaign text |
| `gpt-4o-mini` | Fast auxiliary tasks: scoring, tagging, short summaries |
| `dall-e-3` | Image generation |
| `whisper-1` | Audio transcription (Edit Studio) |
| Grok (xAI) | Reasoning-heavy tasks, market analysis |

**Never default to a weaker model** to save tokens unless there is a latency reason. The quality difference is visible to users.

---

## Development Rules

1. **Never break existing systems.** Test any shared utility (scorer, worldResolver, campaignBrain) before modifying it. Check all consumers with grep before changing a function signature.

2. **Preserve backward compatibility.** API routes are called by the frontend with specific request shapes. Do not change request/response shapes without updating all callers.

3. **Respect membership limits.** Every AI generation endpoint must check the user's plan before calling an external API.

4. **Protect user data.** Never log API keys, tokens, or user PII. Supabase service role key is server-only — never expose it to the client.

5. **Document architectural decisions.** If you make a non-obvious architectural choice, add a brief comment in the code and update this file if it affects system-level understanding.

6. **No orphaned files.** If you create a new utility, wire it up to something. No dead code.

7. **Edit Studio temp files.** Render temp files go in the OS temp directory. Always clean them up after the render completes or fails. Never write large files to the repo.

8. **Stripe webhooks are critical.** Never modify `app/api/webhook/route.js` without verifying the Stripe signature check still works. A broken webhook breaks all subscription management.

9. **Supabase RLS matters.** New tables must have Row Level Security policies. Never create a public table without explicit review.

10. **Test the golden path.** After any feature change, manually verify the user-facing flow works end-to-end, not just the API in isolation.

---

## Code Conventions

- **Framework:** Next.js 16 App Router. All routes use `export async function GET/POST()`.
- **No pages router.** Everything is under `app/`.
- **API responses:** Always `return NextResponse.json({ ... })`. Never `res.json()`.
- **Error handling:** API routes return `{ error: string }` with appropriate status codes. Client-side shows the `error` field to users.
- **Environment variables:** Server-side vars in `.env.local`. Client-side vars prefixed with `NEXT_PUBLIC_`. Never read server vars in client components.
- **Imports:** Use absolute imports from project root. `@/` alias is available.
- **No TypeScript yet.** This codebase is JavaScript. Do not convert files to TypeScript without discussion.
- **Styling:** CSS Modules (`*.module.css`) per page/component. No Tailwind. No inline styles except for dynamic values.

---

## Current Priorities (as of 2026-06-14)

1. **Performance Memory** — SHIPPED. Full loop: save button in Ad Studio → `performance_memory` table → `getPerformanceContext()` injected into `generate-ad-text` system prompt. Files: `app/lib/jarvis/performanceInjector.js`, `app/api/jarvis/performance-memory/save/`, `app/api/jarvis/performance-memory/patterns/`.
2. **Viral Content Analyzer** — SHIPPED. Text-paste interface in Ad Studio (Hooks tab) + Jarvis Studio (intake screen). API route `app/api/jarvis/analyze-viral/route.js`. Component `app/components/jarvis/ViralAnalyzer.js`. Studio Pro+ gate.
3. **Jarvis Studio story-first pipeline** — SHIPPED. Assessment → Story (5-act) → Storyboard → Previews → Runway clips → FFmpeg compile with caption overlays.
4. **Edit Studio v0.2:** UX rebuild after v0.1 production render validated
4. **Campaign Intelligence:** Next evolution of Campaign Brain with cross-project learning
5. **Music Studio Phase 3:** Credit transactions + usage analytics
6. **Jarvis Foundation:** Architecture defined, no implementation yet
7. **Memory Layer:** pgvector architecture designed, not yet implemented

---

## Technical Debt Register

| Area | Issue | Priority |
|------|-------|---------|
| Edit Studio | Phantom job loop on render completion | High |
| Edit Studio | 25MB Whisper file limit — large files silently truncated | High |
| Webhook handler | Downgrade / trial edge cases not fully validated | Medium |
| Memory system | File-based MEMORY.md will hit 200-line index limit | Medium |
| HeyGen + Synthesia | API keys absent from `.env.local` — may be failing silently in production | Medium |
| npm global dir | Was missing — fixed 2026-06-03 | Low (resolved) |
| API routes | 130+ routes with no automated test coverage | High (long-term) |

---

## Long-Term Roadmap

### Phase A — Operating System Foundation (current)
- GitHub MCP + Playwright MCP + CLAUDE.md
- Jarvis v1 architecture
- Memory layer upgrade to pgvector
- Edit Studio v0.2 UX rebuild

### Phase B — Intelligence Deepening
- Cross-project Campaign Brain (learns from all user campaigns)
- Performance Memory (auto-applies what worked in past campaigns)
- Video Intelligence (frame-level analysis, not just transcript)
- Audience Intelligence (who responds to what)

### Phase C — Platform Expansion
- Jarvis v1 launch (AI that talks back, not just generates)
- Multi-user workspaces (Agency plan teams)
- White-label mode for Agency clients
- API access tier (developers building on PromptCEO)

### Phase D — PromptCEO OS
- Full Jarvis operating system
- Third-party integrations (Meta Ads API, TikTok Ads API, Google Ads)
- Real-time performance feedback loop
- Cross-platform asset publishing
- PromptCEO as a B2B product for creative agencies

---

## MCP Servers (Active)

| Server | Package | Purpose |
|--------|---------|---------|
| `context7` | Built-in via plugin | Real-time framework docs (Next.js, Supabase, Stripe) |
| `playwright` | `@playwright/mcp@latest` | Browser automation, UI testing, screenshot verification |
| `github` | `@modelcontextprotocol/server-github` | Repo access, PR management, commit history |
| `memory` | `@modelcontextprotocol/server-memory` | Persistent knowledge graph across Claude Code sessions |
| `firecrawl` | `firecrawl-mcp` | Competitor research, landing page audits, structured web scraping |

Config location: `C:\Users\Work\.claude\settings.json`
Firecrawl API key active — 1,000 credits/month, resets 2026-07-04.

---

## Repository

- **GitHub:** `https://github.com/JerryWear/prompt-ceo`
- **Branch strategy:** Single `main` branch. Feature work in named branches, merge via PR.
- **Deployment:** Vercel (inferred from Next.js stack)
- **Local dev:** `npm run dev` — Next.js dev server on `localhost:3000`

---

## Session Startup Checklist

When starting a new session on this project:
1. Check `MEMORY.md` for recent architectural decisions
2. Check `docs/superpowers/plans/` for any in-progress implementation plans
3. Check git status for any uncommitted work
4. If continuing a feature: read the relevant plan file before touching code
