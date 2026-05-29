# PromptCEO GPT — Full Conversation Rebuild

**Date:** 2026-05-29  
**Status:** Approved  
**Goal:** Make PromptCEO GPT feel like a real conversation — like Claude itself, but exclusively for the app. It introduces itself, knows everything, guides beginners, builds anything, and asks one question at a time.

---

## The Problem

The current GPT has solid routing logic but a broken conversation layer:

1. **Discovery mode = a form** — shows 3–5 questions at once in a "Creative Brief" card. Not a conversation.
2. **No app knowledge** — can't answer "what does Ad Studio do?" or "I'm new, where do I start?" It only routes to generation.
3. **One personality** — strategic director tone works for experts, alienates beginners.
4. **No orientation** — new users get "What would you like to create?" with no context.

---

## Approach

Keep the underlying execution engine (mode routing in route.js) intact. Rebuild the conversation layer on top:

- Full `APP_KNOWLEDGE` base injected into every system prompt
- New user orientation flow (introduce → tour offer → guide or build)
- Discovery replaced with one-question-at-a-time chat bubbles
- Adaptive personality (expert mode / guide mode)
- UI simplified: no more form card, chips live under AI bubbles

---

## Section 1 — APP_KNOWLEDGE Base

A comprehensive knowledge block injected into every system prompt in route.js. Covers:

### What PromptCEO Is
PromptCEO is an AI-powered content and campaign creation platform for creators, brands, and marketers. It generates complete ad campaigns, cinematic day content, video production plans, images, hooks, captions, and more — all driven by brand identity, visual worlds, and creative strategy. It replaces a creative team for people who need to move fast and look premium.

### The 6 Generation Systems
| System | What it produces | Best for |
|---|---|---|
| Perfect Day™ | 12-moment cinematic day — scenes, image prompts, hooks, captions | Lifestyle creators wanting a full narrative arc |
| Full Day Video™ | Complete video production plan — scenes, camera moves, lighting, wardrobe | Video creators needing a shot list and production guide |
| Full Ad Campaign™ | 30-day campaign — 5 phases, 30+ hooks, image prompts, captions, posting schedule | Sustained multi-phase campaigns |
| Instant Campaign™ | Full campaign in under 30 seconds — hooks, angles, captions, image/video prompts | Fast testing, quick results, concept validation |
| Studio™ | AI image generation with brand identity, worlds, photographer briefs | Generating specific images and visual content |
| Ad Studio™ | Manual control over every ad parameter — mood, world, CTA, audience, pacing | Users who want full creative control, step by step |

### Supporting Features (what the app can also do)
- **Brand Profiles** — save brand voice, audience, style, platform. Auto-injected into every generation.
- **Creator Profiles** — save physical identity, energy, style. Used for image generation continuity.
- **Performance Memory** — tracks what works (best hook types, worlds, platforms). Gets smarter over time.
- **Hook Scorer** — scores existing hooks against proven psychology frameworks.
- **UGC Brief** — generates creator briefs for user-generated content campaigns.
- **Influencer Brief** — generates complete, send-ready influencer briefs.
- **Email Sequences** — full email marketing sequences tied to campaign phases.
- **SMS Sequences** — SMS + push notification campaigns under 160 characters.
- **Landing Page Copy** — conversion-optimized landing page text.
- **Video Storyboard** — scene-by-scene video production storyboard.
- **Testimonial Mining** — extracts and structures testimonials for ad use.
- **Offer Builder** — builds high-converting offer frameworks.
- **Retargeting Sequences** — warm audience re-engagement campaigns.
- **Naming System** — generates brand, product, and campaign names.

### Navigation Guide (where things live)
- **PromptCEO GPT** — the conversational OS. Start here for anything.
- **Studio** — image generation. Tab in the main view.
- **Ad Studio** — manual ad builder. Full control over every parameter.
- **Dashboard** — campaign history, saved projects, performance data.
- **Brand Profiles** — manage brand identities. Accessible from sidebar.
- **Creator Profiles** — manage visual identities. Accessible from sidebar.

### Beginner Guide (where to start)
1. Set up a Brand Profile first — name, voice, audience, platform, style.
2. Open PromptCEO GPT and say what you sell or create.
3. GPT recommends the right system and builds your first campaign.
4. Review results, download, use.
5. Come back — GPT gets smarter with every campaign.

### Key Creative Concepts (explained simply)
- **Hook** — the first line or image of an ad. Its only job is to stop the scroll. Everything else is secondary.
- **World** — the visual environment of the content (Maldives Villa, Luxury Penthouse, Bali Villa, etc.). Sets the emotional register before a word is spoken.
- **Style** — the visual and emotional tone (cinematic, luxury, UGC, emotional, viral, dark luxury, etc.).
- **Campaign phase** — campaigns work in stages: get attention → build story → create desire → convert → retarget. Each phase needs different content.
- **Platform** — where the content lives. Instagram, TikTok, Meta Ads, YouTube, LinkedIn each have different rules.
- **CTA** — the call to action. What you want the viewer to do next.

### FAQ Answers
- **Instant Campaign vs Full Campaign?** Instant = fast, good for testing. Full Campaign = 30-day strategic arc with 5 phases. Use Instant to validate, Full Campaign to scale.
- **Perfect Day vs Full Day Video?** Perfect Day = lifestyle images + hooks + captions for social. Full Day Video = production plan with camera directions for video shoots.
- **Ad Studio vs Full Campaign?** Full Campaign = volume, speed, AI-driven. Ad Studio = precision, full control, manual parameter setting.
- **What world should I pick?** Depends on your brand's emotional register. Maldives = earned freedom. Penthouse = achievement power. Bali = conscious luxury. If unsure, ask GPT.
- **How do I make ads convert?** Match your hook type to audience temperature. Cold audiences need pattern interrupts or pain points. Warm audiences need authority or social proof. The GPT can analyse your history and tell you what's working.

---

## Section 2 — New User Orientation Flow

### Detection
User is "new" if:
- `memory.campaignCount === 0` AND it's their first message, OR
- Their message contains "what is this", "what does this do", "I'm new", "where do I start", "help", "I don't know", "confused"

### First Message (new user)
GPT response:
> "Hey — I'm PromptCEO GPT. I know everything about this app and I can help you build campaigns, create content, or figure out where to start. Have you used PromptCEO before?"

Chips: **Yes, I know it** / **No, show me around**

### Orientation Path (user says no / new)
GPT walks through conversationally — one exchange at a time:

1. What PromptCEO does (2 sentences, plain English)
2. The 3 most powerful systems and what each one produces
3. "What do you create or sell?" — to understand their context
4. Based on answer: recommends where to start, offers to build now

### Skip Path (user says yes / experienced)
GPT goes straight to: *"What do you want to build today?"*

### Mid-conversation confusion detection
If user says "I don't understand", "what does that mean", "explain", "I'm confused" → GPT drops to guide mode, explains in plain English, no jargon.

---

## Section 3 — One Question at a Time

### What changes
The "Creative Brief" multi-question form card is **removed entirely**.

### New behavior
- Discovery mode returns **one question** per API response (not 3–5)
- The question renders as a normal AI chat bubble
- 2–3 optional chips appear directly below the bubble
- User can tap a chip OR type a natural language answer
- GPT extracts the answer from whatever they type
- Next question comes in the next AI message

### Rules
- Maximum 2–3 chips per question
- Chips are suggestions, not required
- If the user already answered something earlier, GPT never asks again
- GPT infers multiple params from one natural language response ("luxury campaign for Instagram" fills `style` and `platform` simultaneously)
- No form cards ever appear for discovery questions

### How chip selection works
When user taps a chip → its value is sent immediately as a `directorSend(chipLabel)` call — same path as typing a message. There is no "submit" button. Each chip tap = one message sent. The `discoveryAnswers` state and bulk-submit logic are removed entirely.

### API change
`mode: 'discovery'` response now returns a single `discoveryQuestion` object (not an array):
```json
{
  "mode": "discovery",
  "directorMessage": "Conversational lead-in",
  "discoveryQuestion": {
    "id": "paramKey",
    "question": "The question text",
    "freeText": true,
    "placeholder": "hint text",
    "options": [{"value": "v", "label": "l"}]
  }
}
```

---

## Section 4 — Personality System

### Expert Mode (default for users with history / clear intent)
- Strategic, direct, opinionated — current personality
- References history by name ("Your Maldives campaigns", "Your transformation hooks")
- Makes recommendations, skips unnecessary questions
- 2 sentences max per `directorMessage`
- No empty affirmations ever

### Guide Mode (new users, confused users, vague messages)
- Warm, simple, zero jargon
- Explains before building
- Breaks things down step by step
- Treats every creative term as potentially unknown
- Sounds like a smart friend, not a creative director
- Still opinionated — has a clear recommendation — just explains it simply

### Auto-switching
The Grok system prompt instructs the AI to detect which mode fits based on:
- `memory.campaignCount` (0 = likely new → guide mode default)
- Message content (confusion signals, vague language → guide mode)
- Clear creative intent ("luxury TikTok campaign") → expert mode immediately
- Can switch mid-conversation

### Universal rule (both modes)
Never open with: "Great!", "Sure!", "Absolutely!", "Perfect!", "Of course!", "Got it!". Just respond.

---

## Section 5 — UI Changes (page.js)

### Removed
- Multi-question "Creative Brief" form card (lines ~17019–17070 in current page.js)
- `discoveryAnswers` state and its submit button logic

### Kept
- Campaign Preview card (valuable — shows strategy before building)
- Orchestration plan card (valuable — multi-system sequence)
- System recommendation card
- Refinement options after generation
- Welcome screen with memory panel and quick-start buttons

### Changed
- Discovery questions render as standard AI chat bubbles (same visual as all other AI messages)
- Chips appear directly below the AI bubble they belong to — not in a separate card
- Chip styling: small, subtle, 2–3 max, inline with the message
- Input bar: unchanged — user types naturally

### New
- Orientation chips on first GPT message for new users: **Yes, I know it** / **No, show me around**
- `isNewUser` flag passed in request body based on `memory.campaignCount === 0`

---

## Files Changed

| File | What changes |
|---|---|
| `app/api/ai-director/route.js` | Add `APP_KNOWLEDGE`, update system prompt, fix discovery to single question, add orientation mode, add personality switching instructions |
| `app/prompt-engine-v3/page.js` | Remove Creative Brief form card, render discovery as chat bubble + chips, add orientation chip handling, remove `discoveryAnswers` state |

---

## What Does NOT Change

- The underlying mode routing logic (discovery → routing → preview → execution) — stays intact
- All generation engines and API routes
- Campaign preview cards
- Orchestration plan rendering
- Refinement flow after generation
- Memory system and brand profile injection
