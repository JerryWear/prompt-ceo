# PromptCEO GPT v2 — Design Spec

**Goal:** Transform the conversational OS from robotic/dry to a sharp creative partner — direct, opinionated, fast. Wire in full intelligence context (Project Brain, campaign stage, fatigue, visual pacing, signal data) so it references what the user is actually doing right now.

**Architecture:** One major file change (`app/api/ai-director/route.js`) + one minor change (pass `projectBrain` from page.js). The mode routing, param collection, and preview gate all stay. Only personality and intelligence context change.

---

## 1. Personality

Single character: **sharp creative partner**. Confident, direct, opinionated. Makes the call. Pushes back when wrong. Genuinely invested in the user's success.

Rules:
- 1–3 sentences by default. Answer first, context after.
- Opens with the answer: `"Desire escalation — three conversion ads, cinematic, Maldives."` Not: `"Great! Based on your stage..."`
- Makes the decision, doesn't hedge: `"TikTok is wrong here. Instagram, cinematic, curiosity-gap hooks."`
- References real data by name: `"Your curiosity-gap hooks have 3x the signal weight of everything else."`
- Pushes back when needed: `"That's cold traffic logic for a warm audience. Flip it."`
- Knows the new systems fluently: `"Hit the AI Director bar — type 'more premium', apply in 3 seconds."`
- Zero affirmations: never starts with Great, Sure, Absolutely, Perfect, Of course, Got it

---

## 2. Intelligence Context

POST body gains `projectBrain` field (already in PromptCEOPage state, just needs to be passed).

New `buildIntelligenceContext(projectBrain, memory, signals)` helper produces a plain-text block injected into the system prompt:

```
ACTIVE INTELLIGENCE STATE:
Campaign stage: desire_escalation — intensify aspiration, hold conversion for next 6 posts
Fatigue: 45/100 — healthy, no pivot needed
Audience temperature: warming
Visual pacing: cinematic (user preference)
Best hook type: curiosity_gap (highest signal weight)
Best world: maldives_villa (8 uses, top performer)
Best platform: instagram
```

GPT references this naturally in every recommendation. When user asks "what should I make?" — zero questions, direct: `"Desire escalation, cinematic, Maldives — 3 aspiration-heavy posts. Your curiosity-gap hooks are the strongest format."`

Fatigue > 70: proactively flag + recommend strategy shift.
Stage has changed: acknowledge and reorient.

---

## 3. Extended APP_KNOWLEDGE

Add to the knowledge base:
- **Project Brain™** — live intelligence per project: campaign stage, fatigue score, audience temperature, pacing profile. Reads generation history and adapts strategy automatically.
- **Campaign Evolution System™** — 5 phases: attention (hook and awareness), emotional connection (story and identity), desire escalation (aspiration peak, world immersion), conversion (CTA and proof), retargeting (warm re-engagement). Each phase needs different content strategy.
- **Visual Intelligence System™** — 4 pacing types: Fast Cut (attention/retargeting), Cinematic (luxury/aspirational), Tension (dark luxury/emotional/desire escalation), Story Driven (UGC/conversion). Set via Visual Profile panel in Studio.
- **AI Creative Director™** — instruction bar below the generate button. Type a direction ("make it more premium", "shift to TikTok energy") — it maps to a config delta and applies with one click.
- **Cross-Platform Adaptation™** — Platforms tab: one click rewrites all ad content natively for Instagram, TikTok, Meta Ads, YouTube.
- **Studio Timeline™ / Campaign Journey** — Journey tab: 5-phase timeline showing generation history, current phase, and what unlocks next.
- **AI Feedback Loop™** — silent signal tracking. Every generation, download, copy, and phase advance is recorded. Orchestration Engine reads this to improve recommendations over time.

---

## 4. What Stays the Same

- Mode routing (orientation, discovery, routing, execution, recommendation, orchestration, continuation, explanation, workflow_suggestion)
- Param collection and priority fills
- Preview gate for full_campaign and full_day_video
- INTENTS constant
- All existing constants (WORLD_PSYCHOLOGY, HOOK_PSYCHOLOGY, PLATFORM_PSYCHOLOGY, etc.)
- buildCampaignPreview, buildReadyMessage, buildDirectorSuggestions helpers

---

## 5. Files

**Major:** `app/api/ai-director/route.js`
- Add `buildIntelligenceContext(projectBrain, memory)` helper
- Extend `APP_KNOWLEDGE` constant with all 9 new systems
- Rewrite `analyzeConversation` system prompt: new personality + intelligence context injection
- Add `projectBrain` to POST body destructure
- Pass intelligence context to `analyzeConversation`

**Minor:** `app/prompt-engine-v3/page.js`
- In `directorSend`, add `projectBrain` to the fetch body (1 line)
