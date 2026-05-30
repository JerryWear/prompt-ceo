# Visual Intelligence System™ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a visual intelligence layer that injects cinematographic pacing + thumbnail psychology into image prompt generation, adds visual pacing as a 4th orchestration scoring dimension, and gives the Studio a Visual Profile selector with a scene rhythm arc for batch sequences.

**Architecture:** New `app/visual-system/psychology.js` defines all constants (VISUAL_PACING, THUMBNAIL_PSYCHOLOGY, STYLE_PACING_MAP, STAGE_PACING_PREFERENCE, SCENE_RHYTHM_ARCS). The generate-image route derives pacing from adStyle and appends a direction note to the final Grok prompt. The orchestration engine reads `campaignStage` from the request body and adds pacing-stage alignment as a 4th scoring boost. page.js gains a Visual Profile selector in the Studio left panel (setting `s.visualPacing`) and runBatch() injects scene rhythm arc descriptors per scene position.

**Tech Stack:** Next.js 14 App Router, React 18 (no new packages)

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `app/visual-system/psychology.js` | **Create** | All Visual Intelligence constants |
| `app/api/generate-image/route.js` | **Modify** | Append visual direction note to editPrompt before image API call |
| `app/api/orchestration-engine/route.js` | **Modify** | 4th scoring dimension (visual pacing × campaign stage) + output visualPacing |
| `app/prompt-engine-v3/page.js` | **Modify** | Visual Profile selector in Studio left panel + scene rhythm arc in runBatch() |

---

## Task 1: Create `app/visual-system/psychology.js`

**Files:**
- Create: `app/visual-system/psychology.js`

- [ ] **Step 1: Create directory and file**

```bash
mkdir app/visual-system
```

Create `app/visual-system/psychology.js`:

```javascript
// Visual Intelligence System™ — cinematographic constants

// 4 pacing profiles
export const VISUAL_PACING = {
  fast_cut: {
    label: 'Fast Cut',
    desc:  'High energy, rapid transitions — attention and retargeting phases',
    shotNote: 'dynamic rapid cuts, handheld energy, motion blur, kinetic framing',
  },
  cinematic: {
    label: 'Cinematic',
    desc:  'Slow, deliberate, wide shots — luxury and aspirational styles',
    shotNote: 'slow deliberate camera movement, wide establishing shots, golden hour lighting, deep depth of field',
  },
  tension: {
    label: 'Tension',
    desc:  'Building suspense, tight frames — desire escalation and emotional styles',
    shotNote: 'tight close-ups, shallow depth of field, high contrast lighting, compressed framing',
  },
  story_driven: {
    label: 'Story Driven',
    desc:  'Linear narrative flow — authentic UGC and conversion phases',
    shotNote: 'natural documentary-style framing, neutral lighting, observational camera',
  },
}

// 5 thumbnail psychology archetypes
export const THUMBNAIL_PSYCHOLOGY = {
  eye_contact: {
    label: 'Eye Contact',
    desc:  'Direct gaze creates instant connection and stops scroll',
    compositionNote: 'subject making direct eye contact with camera, centered or rule-of-thirds placement',
  },
  tension_framing: {
    label: 'Tension Framing',
    desc:  'Off-balance composition creates curiosity and intrigue',
    compositionNote: 'asymmetric composition, leading lines toward edge of frame, subject partially cropped',
  },
  contrast_led: {
    label: 'Contrast Led',
    desc:  'Strong contrast drives attention to the key element',
    compositionNote: 'bold light/dark contrast or color contrast, isolated subject against stark background',
  },
  object_emphasis: {
    label: 'Object Emphasis',
    desc:  'Product or key object dominates the frame',
    compositionNote: 'product or object as hero, close-up with clean background, highlight texture and detail',
  },
  emotional_face: {
    label: 'Emotional Face',
    desc:  'Visible genuine emotion drives empathy and engagement',
    compositionNote: 'face showing genuine emotion, tight framing on expression, natural lighting',
  },
}

// Which visual pacing maps to each ad style
export const STYLE_PACING_MAP = {
  luxury:                 'cinematic',
  cinematic:              'cinematic',
  dark_luxury:            'tension',
  emotional:              'tension',
  ugc:                    'story_driven',
  soft_feminine:          'story_driven',
  corporate_authority:    'story_driven',
  viral:                  'fast_cut',
  high_energy:            'fast_cut',
  fitness_motivation:     'fast_cut',
  aspirational_lifestyle: 'cinematic',
  high_status:            'cinematic',
}

// Which pacing is preferred at each campaign stage (first is strongest preference)
export const STAGE_PACING_PREFERENCE = {
  attention:            ['fast_cut', 'tension'],
  emotional_connection: ['story_driven', 'tension'],
  desire_escalation:    ['tension', 'cinematic'],
  conversion:           ['story_driven', 'cinematic'],
  retargeting:          ['fast_cut', 'tension'],
}

// Which thumbnail psychology fits each campaign stage
export const STAGE_THUMBNAIL_MAP = {
  attention:            'eye_contact',
  emotional_connection: 'emotional_face',
  desire_escalation:    'tension_framing',
  conversion:           'contrast_led',
  retargeting:          'eye_contact',
}

// Scene rhythm arcs — 5 descriptors per pacing type, indexed by normalized scene position (0–4)
// Used by runBatch() to vary shot direction across a sequence
export const SCENE_RHYTHM_ARCS = {
  fast_cut:     [
    'explosive opener, dynamic motion, handheld energy',
    'rapid kinetic cuts, high energy movement',
    'peak intensity, maximum kinetic energy',
    'sustained momentum, sharp decisive framing',
    'strong closing energy, definitive final frame',
  ],
  cinematic:    [
    'wide establishing shot, environmental context revealed',
    'medium shot, subject entering the scene',
    'intimate framing, emotional close proximity',
    'wide again, scale and aspiration restored',
    'final wide establishing, full world revealed',
  ],
  tension:      [
    'extreme close-up, compressed maximum tension',
    'tight medium shot, pressure building',
    'peak tension, claustrophobic framing',
    'slight release, medium shot breathing room',
    'final reveal, broader context unveiled',
  ],
  story_driven: [
    'wide observational establishing shot, candid',
    'medium documentary framing, subject natural',
    'close intimate moment, genuine emotion visible',
    'reaction or consequence shot, natural response',
    'wide resolution, full context restored',
  ],
}
```

- [ ] **Step 2: Verify file exists**

Run: `ls app/visual-system/`
Expected: `psychology.js` listed

- [ ] **Step 3: Commit**

```bash
git add app/visual-system/psychology.js
git commit -m "feat: Add visual-system/psychology.js — Visual Intelligence constants (pacing, thumbnail, rhythm arcs)"
```

---

## Task 2: Update `app/api/generate-image/route.js`

**Files:**
- Modify: `app/api/generate-image/route.js`

After all three mode branches have set `editPrompt` (just before the `// ── Call Grok image API ──` comment at line ~470), inject a visual direction note derived from `adStyle` → STYLE_PACING_MAP (inlined) and optionally `body.thumbnailPsychology` (if explicitly passed).

The injection goes between `editPrompt` being set and the `xaiPayload` construction. This does NOT break any existing mode — it just appends to `editPrompt`.

- [ ] **Step 1: Read lines 465–477 of `app/api/generate-image/route.js`**

Confirm the exact text just before the `// ── Call Grok image API ──` comment. You should see the closing `}` of the director mode branch then the comment. The find string for the edit is shown in the next step.

- [ ] **Step 2: Add the visual direction injection block**

Find this exact line:
```javascript
    // ── Call Grok image API ───────────────────────────────────────────────────
    const xaiPayload = {
```

Add BEFORE it:

```javascript
    // ── Visual Intelligence™ — inject pacing + thumbnail direction ─────────
    {
      const stylePacingMap = {
        luxury: 'cinematic', cinematic: 'cinematic', dark_luxury: 'tension',
        emotional: 'tension', ugc: 'story_driven', soft_feminine: 'story_driven',
        corporate_authority: 'story_driven', viral: 'fast_cut', high_energy: 'fast_cut',
        fitness_motivation: 'fast_cut', aspirational_lifestyle: 'cinematic', high_status: 'cinematic',
      }
      const pacingNotes = {
        fast_cut:     'dynamic rapid cuts, handheld energy, motion blur, kinetic framing',
        cinematic:    'slow deliberate camera movement, wide shots, golden hour lighting, deep depth of field',
        tension:      'tight close-ups, shallow depth of field, high contrast lighting, compressed framing',
        story_driven: 'natural documentary-style framing, neutral lighting, observational camera',
      }
      const thumbNotes = {
        eye_contact:     'subject making direct eye contact with camera, centered or rule-of-thirds',
        tension_framing: 'asymmetric composition, leading lines toward frame edge',
        contrast_led:    'bold light/dark contrast, isolated subject against stark background',
        object_emphasis: 'product as hero, tight framing, highlight texture and detail',
        emotional_face:  'face showing genuine emotion, tight framing on expression, natural lighting',
      }
      const adStyle      = clean(body?.adConfig?.adStyle) || ''
      const pacing       = body?.visualPacing || stylePacingMap[adStyle] || 'cinematic'
      const thumbnailPsy = body?.thumbnailPsychology
      const dirParts     = []
      if (pacingNotes[pacing]) dirParts.push(`Visual pacing: ${pacingNotes[pacing]}`)
      if (thumbnailPsy && thumbNotes[thumbnailPsy]) dirParts.push(`Thumbnail composition: ${thumbNotes[thumbnailPsy]}`)
      if (dirParts.length) editPrompt += '\n\nVisual direction: ' + dirParts.join('. ')
    }

```

- [ ] **Step 3: Commit**

```bash
git add app/api/generate-image/route.js
git commit -m "feat: generate-image — inject visual pacing + thumbnail direction into editPrompt"
```

---

## Task 3: Update `app/api/orchestration-engine/route.js`

**Files:**
- Modify: `app/api/orchestration-engine/route.js`

Three sub-edits:
1. Extract `campaignStage` from request body (line 176)
2. Add `STYLE_PACING_MAP` + `STAGE_PACING_PREFERENCE` constants after the existing `STYLE_LABELS` block (~line 169)
3. Add pacing scoring boost in the scoring loop (after the existing signal boost at line 238)
4. Add `visualPacing` field to `top3.push({...})` output

- [ ] **Step 1: Extract campaignStage from request body**

Find:
```javascript
    const { type, goal: hintGoal, style, productName, brandProfile, creatorProfile, projectId } = await req.json()
```

Replace with:
```javascript
    const { type, goal: hintGoal, style, productName, brandProfile, creatorProfile, projectId, campaignStage } = await req.json()
```

- [ ] **Step 2: Add visual intelligence constants after STYLE_LABELS**

Find:
```javascript
const STYLE_LABELS = {
  luxury: 'Luxury', cinematic: 'Cinematic', ugc: 'UGC', emotional: 'Emotional', viral: 'Viral',
  dark_luxury: 'Dark Luxury', high_energy: 'High Energy', soft_feminine: 'Soft Feminine',
  corporate_authority: 'Authority', fitness_motivation: 'Fitness', high_status: 'High Status',
  aspirational_lifestyle: 'Aspirational',
}
```

Add after it:
```javascript
const STYLE_PACING_MAP = {
  luxury: 'cinematic', cinematic: 'cinematic', dark_luxury: 'tension',
  emotional: 'tension', ugc: 'story_driven', soft_feminine: 'story_driven',
  corporate_authority: 'story_driven', viral: 'fast_cut', high_energy: 'fast_cut',
  fitness_motivation: 'fast_cut', aspirational_lifestyle: 'cinematic', high_status: 'cinematic',
}
const STAGE_PACING_PREFERENCE = {
  attention:            ['fast_cut', 'tension'],
  emotional_connection: ['story_driven', 'tension'],
  desire_escalation:    ['tension', 'cinematic'],
  conversion:           ['story_driven', 'cinematic'],
  retargeting:          ['fast_cut', 'tension'],
}
```

- [ ] **Step 3: Add visual pacing scoring boost in the scoring loop**

Find:
```javascript
        // Signal boost: styles with high engagement weight score higher
        if (topSignalStyles[0] === style) score += 25
        else if (topSignalStyles[1] === style) score += 15
        else if (topSignalStyles.includes(style)) score += 8
        combos.push({ type, goal, style, score })
```

Add the visual pacing boost BEFORE `combos.push`:
```javascript
        // Signal boost: styles with high engagement weight score higher
        if (topSignalStyles[0] === style) score += 25
        else if (topSignalStyles[1] === style) score += 15
        else if (topSignalStyles.includes(style)) score += 8
        // Visual pacing boost: styles whose pacing aligns with the campaign stage score higher
        if (campaignStage) {
          const preferredPacings = STAGE_PACING_PREFERENCE[campaignStage] || []
          const stylePacing = STYLE_PACING_MAP[style] || ''
          if (preferredPacings[0] === stylePacing) score += 20
          else if (preferredPacings.includes(stylePacing)) score += 12
        }
        combos.push({ type, goal, style, score })
```

- [ ] **Step 4: Add visualPacing to top3.push output**

Find:
```javascript
          fromCampaignHistory: topCampStyles.includes(c.style),
          fromSignalData: topSignalStyles.includes(c.style),
```

Add after it:
```javascript
          fromCampaignHistory: topCampStyles.includes(c.style),
          fromSignalData: topSignalStyles.includes(c.style),
          visualPacing: STYLE_PACING_MAP[c.style] || 'cinematic',
```

- [ ] **Step 5: Commit**

```bash
git add app/api/orchestration-engine/route.js
git commit -m "feat: Orchestration-engine — visual pacing as 4th scoring dimension, output visualPacing per recommendation"
```

---

## Task 4: Update `app/prompt-engine-v3/page.js`

**Files:**
- Modify: `app/prompt-engine-v3/page.js`

Two changes:
1. Add Visual Profile selector panel in the Studio left column (after the Custom Worlds Panel, ~line 14887)
2. In `runBatch()` (~line 13231), after the shot direction injection, inject a scene rhythm arc note per scene position

**Key landmarks (verify line numbers with Read before editing):**
- End of Custom Worlds panel in Studio left column: `</Panel>` closing tag after line ~14887
- `runBatch()` shot direction injection: `r = { ...r, finalPrompt: \`${r.finalPrompt}, ${shotDir.prefix.toLowerCase()}\` }` around line 13235

---

### 4a — Visual Profile selector in Studio

The Studio left column (`s.view === 'studio'` block) already has a `Panel` component available. The selector uses `set('visualPacing', value)` and reads `s.visualPacing || 'cinematic'`. The thumbnail psychology hint reads from `projectBrain?.campaign_stage` (already in PromptCEOPage scope).

- [ ] **Step 1: Add Visual Profile panel after the Custom Worlds panel**

Read lines 14885–14892 to confirm the exact closing tag text for the Custom Worlds panel. The closing is `              </Panel>` followed by a blank line and `              <Panel title="Scene Presets"...`.

Find:
```javascript
              </Panel>

              <Panel title="Scene Presets" hint="Save & restore complete studio setups" accent={C.violet} defaultOpen={false}>
```

Add BEFORE it:
```javascript
              </Panel>

              <Panel title="Visual Profile" hint="Cinematographic pacing applied to every scene in the batch" accent={C.violet} defaultOpen={false}>
                {(() => {
                  const PACING_OPTIONS = [
                    { id: 'fast_cut',     label: 'Fast Cut',     desc: 'High energy, rapid transitions' },
                    { id: 'cinematic',    label: 'Cinematic',    desc: 'Slow, deliberate, wide shots' },
                    { id: 'tension',      label: 'Tension',      desc: 'Tight frames, building pressure' },
                    { id: 'story_driven', label: 'Story Driven', desc: 'Natural narrative flow' },
                  ]
                  const STAGE_THUMB = {
                    attention:            { label: 'Eye Contact',     desc: 'Direct gaze stops scroll' },
                    emotional_connection: { label: 'Emotional Face',  desc: 'Genuine emotion drives empathy' },
                    desire_escalation:    { label: 'Tension Framing', desc: 'Off-balance creates curiosity' },
                    conversion:           { label: 'Contrast Led',    desc: 'Bold contrast focuses attention' },
                    retargeting:          { label: 'Eye Contact',     desc: 'Direct gaze re-engages audience' },
                  }
                  const active = s.visualPacing || 'cinematic'
                  const thumbHint = projectBrain?.campaign_stage ? STAGE_THUMB[projectBrain.campaign_stage] : null
                  return (
                    <>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, marginBottom: 8 }}>
                        {PACING_OPTIONS.map(p => (
                          <button key={p.id} onClick={() => set('visualPacing', p.id)} style={{
                            padding: '6px 8px', borderRadius: 4, textAlign: 'left', cursor: 'pointer',
                            border: `1px solid ${active === p.id ? C.violet : C.hairline}`,
                            background: active === p.id ? '#05020e' : C.raised,
                            transition: 'all 0.12s',
                          }}>
                            <div style={{ fontSize: 9, fontWeight: 700, color: active === p.id ? C.violet : C.primary }}>{p.label}</div>
                            <div style={{ fontSize: 7, color: C.muted, marginTop: 2, lineHeight: 1.3 }}>{p.desc}</div>
                          </button>
                        ))}
                      </div>
                      {thumbHint && (
                        <div style={{ padding: '5px 8px', borderRadius: 4, background: C.goldDim, border: `1px solid ${C.goldHairline || '#3a2e0a'}`, fontSize: 8, color: C.gold }}>
                          <span style={{ fontWeight: 700 }}>★ {projectBrain.campaign_stage.replace(/_/g, ' ')} phase</span>
                          {' → '}{thumbHint.label}: {thumbHint.desc}
                        </div>
                      )}
                    </>
                  )
                })()}
              </Panel>

              <Panel title="Scene Presets" hint="Save & restore complete studio setups" accent={C.violet} defaultOpen={false}>
```

---

### 4b — Scene rhythm arc in runBatch()

- [ ] **Step 2: Read lines 13228–13245 to confirm the exact text around the shot direction injection in runBatch()**

Confirm you see this pattern:
```javascript
        // Inject smart shot direction into the final prompt
        const shotDir = getShotDirection(i, total)
        if (r.finalPrompt && shotDir) {
          r = {
            ...r,
            finalPrompt: `${r.finalPrompt}, ${shotDir.prefix.toLowerCase()}`,
            _shotZone: shotDir.zone,
          }
        }
        // Inject visual anchor consistency if set
        if (s.visualAnchor?.description && r.finalPrompt) {
```

- [ ] **Step 3: Add scene rhythm arc injection after the shot direction block**

Find:
```javascript
        // Inject visual anchor consistency if set
        if (s.visualAnchor?.description && r.finalPrompt) {
          r = { ...r, finalPrompt: `${r.finalPrompt}. Visual continuity: ${s.visualAnchor.description}` }
        }
```

Add BEFORE it:
```javascript
        // Inject scene rhythm arc for Visual Intelligence™
        {
          const rhythmArcs = {
            fast_cut:     ['explosive opener, dynamic motion, handheld energy', 'rapid kinetic energy, high movement', 'peak intensity, maximum kinetic energy', 'sustained momentum, sharp decisive framing', 'strong closing energy, definitive final frame'],
            cinematic:    ['wide establishing shot, environmental context revealed', 'medium shot, subject entering the scene', 'intimate framing, emotional close proximity', 'wide with scale and aspiration', 'final wide, full world revealed'],
            tension:      ['extreme close-up, compressed maximum tension', 'tight medium shot, pressure building', 'peak tension, claustrophobic framing', 'slight release, medium shot breathing room', 'final reveal, broader context unveiled'],
            story_driven: ['wide observational establishing shot', 'medium documentary framing, candid', 'close intimate moment, genuine emotion', 'reaction or consequence shot', 'wide resolution, full context restored'],
          }
          const pacing     = s.visualPacing || 'cinematic'
          const arc        = rhythmArcs[pacing] || rhythmArcs.cinematic
          const arcIdx     = Math.min(Math.floor((i / Math.max(total - 1, 1)) * (arc.length - 1)), arc.length - 1)
          const rhythmNote = arc[arcIdx]
          if (r.finalPrompt && rhythmNote) {
            r = { ...r, finalPrompt: `${r.finalPrompt}, ${rhythmNote}` }
          }
        }
        // Inject visual anchor consistency if set
        if (s.visualAnchor?.description && r.finalPrompt) {
          r = { ...r, finalPrompt: `${r.finalPrompt}. Visual continuity: ${s.visualAnchor.description}` }
        }
```

- [ ] **Step 4: Commit**

```bash
git add app/prompt-engine-v3/page.js
git commit -m "feat: Visual Intelligence — Visual Profile selector in Studio, scene rhythm arc in batch generation"
```

---

## Self-Review

**Spec coverage:**
- ✅ New file `app/visual-system/psychology.js` — VISUAL_PACING, THUMBNAIL_PSYCHOLOGY, SCENE_RHYTHM_ARCS, STYLE_PACING_MAP, STAGE_PACING_PREFERENCE, STAGE_THUMBNAIL_MAP
- ✅ Image prompt generation appends visual profile (generate-image route injects pacing note + thumbnail note to editPrompt)
- ✅ Orchestration engine adds visual pacing as 4th scoring dimension (STAGE_PACING_PREFERENCE alignment boost)
- ✅ Batch generation follows scene rhythm arc (runBatch() injects arc position descriptor per scene)
- ✅ UI: Visual Profile selector in Studio (4-option grid, sets s.visualPacing)
- ✅ Thumbnail psychology hint in Studio panel (derived from projectBrain.campaign_stage)

**Placeholder scan:** None. All code is complete.

**Type consistency:**
- `SCENE_RHYTHM_ARCS` keys: `fast_cut`, `cinematic`, `tension`, `story_driven` — match `STYLE_PACING_MAP` values — match `s.visualPacing` options in the UI selector — consistent throughout.
- `STAGE_PACING_PREFERENCE` keys match `project_brain.campaign_stage` valid values (attention, emotional_connection, desire_escalation, conversion, retargeting) — consistent with Build 2 PHASES.
- `STYLE_PACING_MAP` style keys match the 12 STYLES in orchestration-engine STYLES array — complete coverage.

**Edge cases handled:**
- `s.visualPacing` undefined → defaults to 'cinematic' everywhere
- `total === 1` in runBatch() → `arcIdx` = 0 (first arc position) — safe
- `campaignStage` not in orchestration request → pacing boost is skipped entirely
- `adStyle` not in STYLE_PACING_MAP in generate-image → defaults to 'cinematic' pacing
- `projectBrain` null in Studio → thumbnail psychology hint not shown (conditional rendering)
