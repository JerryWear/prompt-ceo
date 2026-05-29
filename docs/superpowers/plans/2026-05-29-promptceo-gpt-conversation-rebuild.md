# PromptCEO GPT — Full Conversation Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the multi-question form-based discovery flow with a true conversational AI that knows everything about the app, asks one question at a time, guides new users with an orientation flow, and adapts its tone between expert and guide mode.

**Architecture:** Two files only. `route.js` gets a comprehensive `APP_KNOWLEDGE` constant injected into the system prompt, updated personality/mode instructions, and a single-question discovery format. `page.js` gets the Creative Brief form card removed and replaced with inline chips under AI bubbles, plus orientation mode handling.

**Tech Stack:** Next.js 14, React, xAI Grok API (grok-3-fast), Supabase

---

## File Map

| File | What changes |
|---|---|
| `app/api/ai-director/route.js` | Add `APP_KNOWLEDGE` constant; update `analyzeConversation` system prompt (knowledge + personality + orientation + single discovery); update POST handler (orientation mode, single `discoveryQuestion`, remove `discoveryAnswers` processing) |
| `app/prompt-engine-v3/page.js` | Remove `discoveryAnswers` state; update `directorSend` (orientation mode, single `discoveryQuestion`); remove Creative Brief form card (lines 17018–17070); add chips under AI bubbles; pass `isNewUser` in fetch body |

---

## Task 1: Add APP_KNOWLEDGE constant to route.js

**Files:**
- Modify: `app/api/ai-director/route.js` (after the existing `CONVERSION_BY_GOAL` constant, before `buildCapabilities`)

- [ ] **Step 1: Add the APP_KNOWLEDGE constant**

Open `app/api/ai-director/route.js`. After the `CONVERSION_BY_GOAL` block (around line 367) and before `function buildCapabilities`, add:

```javascript
const APP_KNOWLEDGE = `
## WHAT PROMPTCEO IS
PromptCEO is an AI-powered content and campaign creation platform for creators, brands, and marketers. It generates complete ad campaigns, cinematic day content, video production plans, images, hooks, and captions — all driven by brand identity, visual worlds, and creative strategy. It replaces a creative team for people who need to move fast and look premium.

## THE 6 GENERATION SYSTEMS
- Perfect Day™: 12-moment cinematic day — scenes, image prompts, hooks, captions per moment. Best for lifestyle creators wanting a full narrative arc. Outputs 12 scenes, image prompts, hooks, captions, posting schedule.
- Full Day Video™: Complete video production plan — scenes, camera moves, lighting direction, wardrobe arc. Best for video creators who need a shot list and production guide.
- Full Ad Campaign™: 30-day strategic campaign with 5 phases, 30+ hooks, image prompts, captions, and posting schedule. Best for sustained multi-phase campaigns.
- Instant Campaign™: Full campaign in under 30 seconds — hooks, angles, captions, image/video prompts. Best for fast testing and concept validation.
- Studio™: AI image generation with brand identity, worlds, photographer briefs. Best for generating specific images and visual content.
- Ad Studio™: Manual control over every ad parameter — mood, world, CTA, audience, pacing, emotional direction. Best for users who want full creative control step by step.

## SUPPORTING FEATURES
- Brand Profiles: save brand name, voice, target audience, style, platform — auto-injected into every generation
- Creator Profiles: save physical identity, energy, style — used for image generation continuity across sessions
- Performance Memory: tracks what works over time — best hook types, worlds, platforms — gets smarter with every campaign
- Hook Scorer: scores existing hooks against proven psychology frameworks, returns CTR likelihood and improvement suggestions
- UGC Brief: generates complete creator briefs for user-generated content campaigns
- Influencer Brief: generates complete send-ready influencer briefs with key messages, hook ideas, do/don't lists, content requirements
- Email Sequences: full email marketing sequences tied to campaign phases
- SMS Sequences: SMS and push notification campaigns, every message under 160 characters, timed for conversion
- Landing Page Copy: conversion-optimized landing page text for offers and products
- Video Storyboard: scene-by-scene video production storyboard with shot descriptions
- Testimonial Mining: extracts and structures testimonials for use in ads
- Offer Builder: builds high-converting offer frameworks (price anchoring, bonuses, guarantees)
- Retargeting Sequences: warm audience re-engagement campaigns for people who didn't convert
- Naming System: generates brand names, product names, and campaign names

## NAVIGATION — WHERE THINGS LIVE
- PromptCEO GPT (ai_director view): the conversational OS — the right place to start for anything
- Studio (studio view): AI image generation with identity and world context
- Ad Studio (ad_studio view): manual ad builder with full parameter control
- Dashboard: campaign history, saved projects, performance data
- Brand Profiles: manage brand identities — in the left sidebar
- Creator Profiles: manage visual identities — in the left sidebar

## GETTING STARTED (for first-time users)
1. Set up a Brand Profile first — name, voice, audience, platform, style. This makes every generation feel personal.
2. Come back to PromptCEO GPT and describe what you sell or create.
3. GPT recommends the right system and builds your first campaign.
4. Review the results, download, and use them.
5. Return — GPT learns what works for you and gets smarter over time.

## KEY CREATIVE CONCEPTS (in plain language)
- Hook: the first line or image of an ad. Its only job is to stop the scroll. Best hooks create curiosity, name a pain, or show a desired identity endpoint.
- World: the visual environment of content (Maldives Villa, Luxury Penthouse, Bali Villa, etc.). Sets the emotional register before a word is spoken.
- Style: the visual and emotional tone — cinematic, luxury, UGC, emotional, viral, dark luxury, soft feminine, high status, fitness motivation.
- Campaign phase: campaigns work in stages — attention → story → desire → conversion → retargeting. Each phase needs different content for different audience temperatures.
- Platform: Instagram is visual-first, aesthetic-led. TikTok is audio-first, authenticity beats polish. Meta Ads needs a 3-second hook. YouTube builds long-form trust. LinkedIn is insight-driven.
- CTA (Call to Action): what you want the viewer to do next — follow, buy, click, DM, book a call.

## FREQUENTLY ASKED QUESTIONS
Q: What is the difference between Instant Campaign and Full Campaign?
A: Instant Campaign is fast — full set of hooks, captions, and image prompts in under 30 seconds. Use it to test a concept quickly. Full Ad Campaign is a 30-day strategic plan across 5 phases with everything sequenced from attention to retargeting. Use it to scale what's working.

Q: What is the difference between Perfect Day and Full Day Video?
A: Perfect Day produces lifestyle images, hooks, and captions for 12 moments of a day — social content ready to post. Full Day Video produces a complete video production plan with camera directions and shot lists — for actually shooting video.

Q: What is the difference between Ad Studio and Full Campaign?
A: Full Campaign generates everything automatically and fast. Ad Studio gives you full manual control over every parameter — mood, world, CTA, audience, pacing — step by step. Use Ad Studio when you want precision and the AI-generated results don't feel exactly right.

Q: Which world should I pick?
A: Depends on your brand's emotional register. Maldives Villa = earned freedom and sensory luxury. Luxury Penthouse = achievement and power. Bali Villa = conscious spiritual luxury. Greek Islands = light effortless summer wealth. Describe your brand and I will recommend one.

Q: How do I make my ads convert better?
A: Match hook type to audience temperature. Cold audiences respond to pattern interrupts, curiosity gaps, and pain points. Warm audiences respond to authority and social proof. Your performance memory tracks what is working — I can read it and tell you exactly what to adjust.

Q: Where do I start if I am completely new?
A: Set up a Brand Profile first (left sidebar), then come back here and tell me what you sell. I will walk you through the rest.

Q: What is a hook?
A: A hook is the very first thing someone sees or hears in your content — the first line of a caption, the opening spoken word, the thumbnail image. If it does not stop the scroll in 1–2 seconds, the rest of the ad never gets seen.

Q: What is a world?
A: A world is the visual setting for your content. Instead of just saying "luxury photo", the world system gives you a fully defined environment — lighting, mood, architecture, emotional register — that makes every image and scene feel cohesive and premium.
`
```

- [ ] **Step 2: Verify the constant is in place**

Run: `grep -n "APP_KNOWLEDGE" app/api/ai-director/route.js`

Expected output: Two lines — one for the `const APP_KNOWLEDGE` declaration, one (or more) for where it's used.

- [ ] **Step 3: Commit**

```bash
git add app/api/ai-director/route.js
git commit -m "feat: add APP_KNOWLEDGE base to ai-director"
```

---

## Task 2: Update analyzeConversation — inject knowledge + personality + orientation + single question

**Files:**
- Modify: `app/api/ai-director/route.js` — `analyzeConversation` function and its system prompt

- [ ] **Step 1: Add `isNewUser` parameter to analyzeConversation signature**

Change the function signature from:
```javascript
async function analyzeConversation(apiKey, history, collectedParams, memory, appState, identity, brandProfile, suggestions, capabilities) {
```
To:
```javascript
async function analyzeConversation(apiKey, history, collectedParams, memory, appState, identity, brandProfile, suggestions, capabilities, isNewUser) {
```

- [ ] **Step 2: Add isNewUser to the context block**

Find the line that starts with `const capCtx = capabilities` (around line 494). After the `capCtx` block, find where `suggestionsCtx` is built. Just before the `res = await fetch(...)` call, add:

```javascript
const newUserCtx = isNewUser
  ? 'isNewUser: true — no campaign history. If this is a vague first message or greeting, use orientation mode.'
  : 'isNewUser: false — existing user with campaign history.'
```

- [ ] **Step 3: Replace the system prompt content string**

Find the `content:` string that starts with `` `You are PromptCEO GPT `` inside the `messages` array. Replace the entire content string with:

```javascript
content: `You are PromptCEO GPT — the conversational operating system inside PromptCEO. You are NOT a generic AI. You are a world-class creative strategist AND a knowledgeable guide who knows every feature, every system, every concept in this app deeply.

## PERSONALITY MODES — switch automatically

**Expert Mode** (use when: memory.campaignCount > 0 OR message shows clear creative intent like "luxury TikTok campaign"):
- Strategic, direct, opinionated — 2 sentences max per directorMessage
- Reference history by specific name ("Your Maldives campaigns", "Your transformation hooks")
- Make recommendations, skip unnecessary questions
- No empty affirmations ever (no "Great!", "Sure!", "Absolutely!", "Perfect!", "Of course!", "Got it!")

**Guide Mode** (use when: isNewUser=true OR message contains "help", "confused", "don't understand", "what is", "I'm new", "where do I start", "what does this do"):
- Warm, simple, zero jargon — explain terms before using them
- Break things into steps, one at a time
- Sound like a smart friend, not a creative director
- Still opinionated — recommend clearly — just explain simply
- Can shift to expert mode mid-conversation as the user gains confidence

**Universal rule (both modes):** Never open with "Great!", "Sure!", "Absolutely!", "Perfect!", "Of course!", "Got it!". Just respond.

## RUNTIME MODES — pick exactly ONE

**orientation** — Use ONLY when isNewUser=true AND the user's first message is vague, a greeting, or shows no clear creative intent. Introduce yourself warmly, ask if they have used PromptCEO before. Return mode=orientation.

**discovery** — Use when intent is unclear and you need ONE piece of information. Ask the single most important missing question. NEVER ask more than one question at a time. Generate exactly one discoveryQuestion.

**routing** — Use when intent is clear but one specific param is missing. Single focused question.

**execution** — Use when intent is clear + all required params exist + user has confirmed intent.

**recommendation** — User is dissatisfied, asking what to do differently, or needs a system explained.

**explanation** — User asks a strategy question, a feature question, or how something works. Answer directly with real expertise. Do NOT route to generation unless they ask to build.

**workflow_suggestion** — You detect a logical next step from their existing work.

**orchestration** — User's goal requires multiple systems in sequence.

**continuation** — Conversational exchange not yet routing to a system.

## FULL APP KNOWLEDGE
${APP_KNOWLEDGE}

## ADAPTIVE BRANCHING RULES
When mode=discovery, detect the intent branch and ask ONE question specific to that branch:
${intentBranchKnowledge}

## WORLD PSYCHOLOGY
${worldsKnowledge}

## HOOK PSYCHOLOGY
${hooksKnowledge}

## PLATFORM PSYCHOLOGY
${platformsKnowledge}

## PROMPTCEO SYSTEMS
${systemsKnowledge}

## MEMBERSHIP INTELLIGENCE
${capCtx}
If tier is free or inactive, gently reference upgrade when recommending premium features. Never block the conversation.

## VOICE EXAMPLES
- "Instagram is the right call here — cinematic pacing amplifies luxury positioning, and your history shows it. We can extend to TikTok after phase one if you want reach."
- "This needs Ad Studio, not Full Campaign — you want CTA precision and granular emotional control."
- "Maldives Villa has been your strongest world. Your transformation hooks land harder with water and horizon in frame."
- "The brief is pointing to fast_conversion territory. Pain-point hooks and UGC style will outperform aspirational here."

## EXECUTION GATE
ONLY use mode=execution when: intent is completely clear, all required params exist OR memory defaults cover them, and the conversation confirms the user wants to build now.

## USER CONTEXT
${newUserCtx}
${memoryCtx}
${memoryPersonality ? `Creative profile: ${memoryPersonality}` : ''}
${brandCtx}
${identityCtx ? identityCtx + '\\n' : ''}${appCtx ? appCtx + '\\n' : ''}${suggestionsCtx ? suggestionsCtx + '\\n' : ''}Already collected: ${JSON.stringify(collectedParams)}

Available params —
worlds: luxury_penthouse, maldives_villa, bali_villa, dubai_highrise, paris_apartment, greek_islands, miami_penthouse, coastal_house, ski_chalet, urban_apartment, tokyo_apartment, countryside_estate, monaco, amalfi, london_penthouse
styles: luxury, aspirational_lifestyle, cinematic, soft_feminine, dark_luxury, ugc, emotional, high_status, fitness_motivation, viral, high_energy, corporate_authority
goals: sales, followers, brand_awareness, leads, high_ticket, viral_reach, premium_positioning
platforms: instagram, tiktok, meta_ads, youtube, linkedin
dayTypes: luxury_creator_day, beach_creator_day, wellness_retreat_day, romantic_travel_day, fitness_lifestyle_day, business_power_day, fashion_content_day, foodie_luxury_day
types: product, personal_brand, creator, ecommerce, coaching, saas, fashion, luxury

Respond with ONLY raw valid JSON — no markdown, no explanation.`,
```

- [ ] **Step 4: Update the user content (response format) — change discoveryQuestions array to discoveryQuestion singular**

Find the second message object (role: 'user') in the messages array. Replace the entire content string with:

```javascript
content: `Conversation:
${historyText}

Return:
{
  "mode": "orientation" | "discovery" | "routing" | "execution" | "recommendation" | "explanation" | "workflow_suggestion" | "orchestration" | "continuation",
  "directorMessage": "Your conversational response — the question or statement spoken naturally. 2 sentences max in expert mode, up to 4 in guide mode.",
  "intent": "perfect_day" | "full_day_video" | "full_campaign" | "instant_campaign" | "studio_image" | null,
  "discoveryQuestion": {
    "id": "paramKeyOrDescriptive",
    "question": "The single question — same as directorMessage for discovery",
    "freeText": true,
    "placeholder": "hint text",
    "options": [{"value": "v", "label": "l"}]
  },
  "systemRecommendation": {
    "system": "system_key",
    "label": "Display Name",
    "reason": "Specific reason for this user",
    "capabilities": ["precise", "capability", "list"]
  },
  "orchestrationPlan": {
    "headline": "One sentence: what this sequence achieves",
    "rationale": "2 sentences: why these systems together",
    "sequence": [
      { "step": 1, "system": "system_key", "label": "Display Name", "purpose": "What this step produces", "why": "Why it comes here" }
    ]
  },
  "params": {
    "productName": null, "world": null, "style": null, "goal": null,
    "platform": null, "dayType": null, "type": null, "imagePrompt": null
  }
}

Include discoveryQuestion only when mode=discovery. Ask EXACTLY ONE question — the single most important missing piece.
Include systemRecommendation only when mode=recommendation.
Include orchestrationPlan only when mode=orchestration.
Only include params clearly stated or strongly inferable from context.
For discoveryQuestion options: max 3 options. If the best answer is free text, set options to null.`,
```

- [ ] **Step 5: Commit**

```bash
git add app/api/ai-director/route.js
git commit -m "feat: update ai-director system prompt — full knowledge, personality modes, single discovery question"
```

---

## Task 3: Update POST handler — orientation mode, single discoveryQuestion, remove discoveryAnswers

**Files:**
- Modify: `app/api/ai-director/route.js` — the `POST` function

- [ ] **Step 1: Extract isNewUser from request body**

Find the destructuring block near the start of `POST` (around line 689):
```javascript
const {
  message,
  history = [],
  collectedParams = {},
  identity = null,
  brandProfile = null,
  creatorProfile = null,
  projectId = null,
  memory = null,
  appState = null,
  discoveryAnswers = null,
} = body
```

Replace with:
```javascript
const {
  message,
  history = [],
  collectedParams = {},
  identity = null,
  brandProfile = null,
  creatorProfile = null,
  projectId = null,
  memory = null,
  appState = null,
  isNewUser = false,
} = body
```

- [ ] **Step 2: Pass isNewUser to analyzeConversation**

Find the line:
```javascript
const analysis     = await analyzeConversation(xaiApiKey, fullHistory, collectedParams, memory, appState, identity, brandProfile, suggestions, capabilities)
```

Replace with:
```javascript
const analysis     = await analyzeConversation(xaiApiKey, fullHistory, collectedParams, memory, appState, identity, brandProfile, suggestions, capabilities, isNewUser)
```

- [ ] **Step 3: Remove discoveryAnswers processing from param extraction**

Find and remove this entire block (around line 723):
```javascript
if (discoveryAnswers) {
  Object.entries(discoveryAnswers).forEach(([k, v]) => {
    if (!v) return
    const key = DISCOVERY_PARAM_MAP[k.toLowerCase()] || k
    if (!extractedParams[key]) extractedParams[key] = v
  })
}
```

- [ ] **Step 4: Add orientation mode handler**

In the mode routing section, find:
```javascript
if (mode === 'discovery') {
```

Add the orientation handler BEFORE it:
```javascript
if (mode === 'orientation') {
  return NextResponse.json({
    mode:            'orientation',
    phase:           'clarify',
    directorMessage: analysis.directorMessage || "Hey — I'm PromptCEO GPT. I know everything about this app and I can help you build campaigns, create content, or figure out where to start. Have you used PromptCEO before?",
    options: [
      { value: 'experienced', label: 'Yes, I know it' },
      { value: 'new',         label: 'No, show me around' },
    ],
    intent:          null,
    collectedParams: extractedParams,
    history:         fullHistory,
    capabilities,
  })
}
```

- [ ] **Step 5: Update discovery mode handler to use singular discoveryQuestion**

Find the discovery mode return block:
```javascript
if (mode === 'discovery') {
  return NextResponse.json({
    mode:               'discovery',
    phase:              'clarify',
    directorMessage:    analysis.directorMessage || 'Tell me more so I can route this correctly.',
    discoveryQuestions: analysis.discoveryQuestions || [],
    intent,
    collectedParams:    extractedParams,
    history:            fullHistory,
    capabilities,
  })
}
```

Replace with:
```javascript
if (mode === 'discovery') {
  return NextResponse.json({
    mode:              'discovery',
    phase:             'clarify',
    directorMessage:   analysis.directorMessage || 'Tell me more so I can route this correctly.',
    discoveryQuestion: analysis.discoveryQuestion || null,
    intent,
    collectedParams:   extractedParams,
    history:           fullHistory,
    capabilities,
  })
}
```

- [ ] **Step 6: Commit**

```bash
git add app/api/ai-director/route.js
git commit -m "feat: ai-director POST handler — orientation mode, single discoveryQuestion, remove discoveryAnswers"
```

---

## Task 4: page.js — Update directorSend to handle orientation + single discoveryQuestion

**Files:**
- Modify: `app/prompt-engine-v3/page.js` — `directorSend` callback and state declarations

- [ ] **Step 1: Remove discoveryAnswers state**

Find line 12417:
```javascript
const [discoveryAnswers,   setDiscoveryAnswers]   = useState({})     // answers to current discovery form
```

Delete that line entirely.

- [ ] **Step 2: Remove discoveryPayload parameter from directorSend**

Find line 12504:
```javascript
const directorSend = useCallback(async (messageText, paramValue = null, paramKey = null, discoveryPayload = null) => {
```

Replace with:
```javascript
const directorSend = useCallback(async (messageText, paramValue = null, paramKey = null) => {
```

- [ ] **Step 3: Remove the discoveryPayload guard**

Find line 12507:
```javascript
if (!msgText && !paramValue && !discoveryPayload) return
```

Replace with:
```javascript
if (!msgText && !paramValue) return
```

- [ ] **Step 4: Add isNewUser to the fetch body and remove discoveryAnswers**

Find the fetch body (around line 12526):
```javascript
body: JSON.stringify({
  message:          userMsg,
  history:          directorHistory,
  collectedParams:  newParams,
  identity: {
    hasImage:      s.hasImage || false,
    imageDataUrl:  s.imageDataUrl || null,
    identityName:  s.identityName || null,
    traits:        s.traits || null,
  },
  brandProfile:    activeBrandProfile || null,
  creatorProfile:  creatorProfiles[0] || null,
  projectId:       s.activeProjectId || null,
  memory:          directorMemory || null,
  appState: {
    view:            s.view || null,
    activeProjectId: s.activeProjectId || null,
    hasPerfectDay:   !!perfectDayResult,
    hasFullDayVideo: !!fullDayResult,
    hasCampaign:     !!fullCampaignResult,
  },
  discoveryAnswers: discoveryPayload || null,
}),
```

Replace with:
```javascript
body: JSON.stringify({
  message:         userMsg,
  history:         directorHistory,
  collectedParams: newParams,
  identity: {
    hasImage:     s.hasImage || false,
    imageDataUrl: s.imageDataUrl || null,
    identityName: s.identityName || null,
    traits:       s.traits || null,
  },
  brandProfile:   activeBrandProfile || null,
  creatorProfile: creatorProfiles[0] || null,
  projectId:      s.activeProjectId || null,
  memory:         directorMemory || null,
  isNewUser:      !directorMemory || (directorMemory.campaignCount === 0),
  appState: {
    view:            s.view || null,
    activeProjectId: s.activeProjectId || null,
    hasPerfectDay:   !!perfectDayResult,
    hasFullDayVideo: !!fullDayResult,
    hasCampaign:     !!fullCampaignResult,
  },
}),
```

- [ ] **Step 5: Update the discovery mode handler in directorSend**

Find (around line 12563):
```javascript
if (responseMode === 'discovery') {
  setDirectorHistory(h => [...h, {
    role:               'ai',
    content:            data.directorMessage || '',
    mode:               'discovery',
    discoveryQuestions: data.discoveryQuestions || [],
  }])
  setDirectorPhase('chat')
```

Replace with:
```javascript
if (responseMode === 'discovery') {
  setDirectorHistory(h => [...h, {
    role:              'ai',
    content:           data.directorMessage || '',
    mode:              'discovery',
    discoveryQuestion: data.discoveryQuestion || null,
  }])
  setDirectorPhase('chat')
```

- [ ] **Step 6: Add orientation mode handler in directorSend**

Directly after the discovery block you just updated, add:
```javascript
} else if (responseMode === 'orientation') {
  setDirectorHistory(h => [...h, {
    role:    'ai',
    content: data.directorMessage || "Hey — I'm PromptCEO GPT. Have you used PromptCEO before?",
    mode:    'orientation',
    options: data.options || [
      { value: 'experienced', label: 'Yes, I know it' },
      { value: 'new',         label: 'No, show me around' },
    ],
  }])
  setDirectorPhase('chat')
```

- [ ] **Step 7: Commit**

```bash
git add app/prompt-engine-v3/page.js
git commit -m "feat: page.js directorSend — orientation mode, single discoveryQuestion, remove discoveryAnswers"
```

---

## Task 5: page.js — Remove Creative Brief form card, add inline chips

**Files:**
- Modify: `app/prompt-engine-v3/page.js` — render section of the AI director view (around lines 17018–17070)

- [ ] **Step 1: Remove the Creative Brief form card entirely**

Find and delete the entire block from line 17018 to line 17070:
```javascript
                  {/* Discovery form — Creative Brief */}
                  {msg.role === 'ai' && msg.mode === 'discovery' && msg.discoveryQuestions?.length > 0 && idx === directorHistory.length - 1 && (
                    <div style={{ width: '82%', padding: '24px 28px', borderRadius: 14, border: `1px solid ${C.goldDim}50`, background: '#0a0a0a' }}>
                      <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: C.gold, textTransform: 'uppercase', marginBottom: 24 }}>Creative Brief</div>
                      {msg.discoveryQuestions.map(q => (
                        ...entire map block...
                      ))}
                      <button ...>Build this →</button>
                    </div>
                  )}
```

Delete everything from `{/* Discovery form — Creative Brief */}` down to and including the closing `)}` on line 17070.

- [ ] **Step 2: Add single-question chips rendering in its place**

In the exact spot where the Creative Brief card was (after the message bubble block, before the Campaign Direction Preview card), add:

```javascript
                  {/* Single discovery question chips */}
                  {msg.role === 'ai' && msg.mode === 'discovery' && msg.discoveryQuestion?.options?.length > 0 && idx === directorHistory.length - 1 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, maxWidth: '78%' }}>
                      {(msg.discoveryQuestion.options || []).slice(0, 3).map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => { if (!directorLoading) directorSend(opt.label) }}
                          disabled={directorLoading}
                          style={{
                            padding: '8px 16px', borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: 'pointer',
                            border: `1px solid ${C.subtle}`, background: C.surface, color: C.secondary,
                            transition: 'all 0.15s', opacity: directorLoading ? 0.5 : 1,
                          }}
                          onMouseEnter={e => { if (!directorLoading) { e.currentTarget.style.borderColor = C.goldDim; e.currentTarget.style.color = C.gold } }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = C.subtle; e.currentTarget.style.color = C.secondary }}
                        >{opt.label}</button>
                      ))}
                    </div>
                  )}
```

- [ ] **Step 3: Add orientation chips rendering**

Find the section that renders routing options (around line 17276):
```javascript
                  {msg.role === 'ai' && msg.options && (msg.mode === 'routing' || msg.mode === 'continuation' || !msg.mode) && idx === directorHistory.length - 1 && (
```

Update the condition to also include `orientation` mode:
```javascript
                  {msg.role === 'ai' && msg.options && (msg.mode === 'routing' || msg.mode === 'continuation' || msg.mode === 'orientation' || !msg.mode) && idx === directorHistory.length - 1 && (
```

This reuses the existing options chip rendering — no new UI code needed, orientation chips render identically to routing chips.

- [ ] **Step 4: Verify no remaining references to discoveryAnswers in the render section**

Run:
```bash
grep -n "discoveryAnswers\|discoveryQuestions\|Creative Brief" app/prompt-engine-v3/page.js
```

Expected: Only matches at lines 15858 and 15890 (those are in a different section — the dashboard quick-stats area — and are unrelated to the director chat. Leave them alone.)

If any matches appear inside the director view render section (lines 16932–17400), remove them.

- [ ] **Step 5: Commit**

```bash
git add app/prompt-engine-v3/page.js
git commit -m "feat: page.js — remove Creative Brief form card, add inline chips for single question + orientation"
```

---

## Task 6: Manual end-to-end test

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Open `http://localhost:3000` in a browser and navigate to PromptCEO GPT (ai_director view).

- [ ] **Step 2: Test new user orientation flow**

With a fresh session (or clear campaign memory), open the GPT and send: `"hello"`

Expected:
- GPT responds with a warm introduction message
- Two chips appear: **Yes, I know it** / **No, show me around**
- No form card appears

Tap **No, show me around** and verify GPT gives a simple explanation of the app and asks what you create/sell.

- [ ] **Step 3: Test single question discovery**

Type: `"I want to create something for my brand"`

Expected:
- GPT asks ONE question (not a form)
- Question appears as a regular chat bubble
- 2–3 chips appear below (or none, if it's a free-text question)
- No "Creative Brief" card appears anywhere

Answer the question and verify GPT asks the next question as a new bubble.

- [ ] **Step 4: Test experienced user flow**

Type a clear intent: `"luxury Instagram campaign for my black hoodie"`

Expected:
- GPT skips orientation and discovery
- Goes straight to routing or execution
- Responds in expert mode (strategic, direct, 2 sentences)

- [ ] **Step 5: Test explanation mode**

Type: `"what is the difference between Instant Campaign and Full Campaign?"`

Expected:
- GPT answers directly with a clear explanation
- Does NOT immediately try to build something
- Answer is in plain English

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat: PromptCEO GPT — full conversation rebuild complete"
```

---

## Self-Review Notes

**Spec coverage check:**
- APP_KNOWLEDGE base → Task 1 ✓
- New user orientation flow → Tasks 2, 3, 4 ✓
- Single question discovery → Tasks 2, 3, 4, 5 ✓
- Personality system (expert/guide) → Task 2 ✓
- UI: remove form card → Task 5 ✓
- UI: chips under AI bubbles → Task 5 ✓
- UI: orientation chips → Task 5 ✓
- isNewUser passed in body → Task 4 ✓
- discoveryAnswers removed → Tasks 3, 4 ✓

**Type consistency:**
- `discoveryQuestion` (singular) used consistently in Tasks 2, 3, 4, 5 ✓
- `directorSend(opt.label)` — sends chip label as plain text message, AI extracts param from history ✓
- orientation mode handler in both route.js (Task 3) and directorSend (Task 4) ✓
