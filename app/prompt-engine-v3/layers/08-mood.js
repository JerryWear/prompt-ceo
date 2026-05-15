// ─────────────────────────────────────────────────────────────
// Prompt Engine v3 — Layer 08: Mood / Emotion
//
// Responsibility: describe the subject's internal emotional
// state and physical presence. Makes the subject feel like
// a person, not a prop. Must be grounded, specific, and
// consistent with time of day and environment.
//
// Receives:  EngineInputV3, pipeline context (narrativeTone
//            from 02, progressionLevel, timeOfDay from 07,
//            lockedWorldId, envFamily)
// Returns:   LayerResult where value = moodPhrase
//
// NOT allowed to:
//   - use single filler words alone (calm, elegant, confident)
//   - override any physical layer
//   - contradict the time of day
//   - produce more than 2 joined mood descriptors
// ─────────────────────────────────────────────────────────────

import { makeLayerResult } from '../schemas/layerTypes.js'

// ─────────────────────────────────────────────────────────────
// MOOD POOLS
// Keyed: progressionLevel → timeOfDay → envFamily → array.
//
// Mood phrase rules:
//   - minimum 4 words
//   - must describe a quality of presence, not a single adjective
//   - grounded in the body or the situation, not floating
//   - consistent with time of day (no late-night intimacy at
//     morning scenes)
//   - max 2 comma-joined descriptors per phrase
// ─────────────────────────────────────────────────────────────

const MOOD_POOLS = {
  tease: {
    early_morning: {
      bedroom:  ['barely-awake calm, still holding the warmth of sleep',
                 'soft morning openness, not yet composed'],
      bathroom: ['quiet morning routine, fully present without effort',
                 'freshly awake, unhurried and self-contained'],
      terrace:  ['morning stillness, the day not yet begun',
                 'cool and quiet, the early air doing the work'],
      pool:     ['morning calm before the heat, deliberately slow',
                 'fresh and self-contained, the day not yet pressing'],
      kitchen:  ['unhurried morning focus, still in first-light ease',
                 'quiet and domestic, moving without performance'],
      lounge:   ['early stillness, private and unguarded',
                 'sleepy composure, not yet sharpened for the day'],
      gym:      ['pre-dawn discipline, the body moving before the mind is fully awake',
                 'focused morning energy, the session started without ceremony'],
      street:   ['quiet morning arrival, the city still half-asleep around her',
                 'calm morning transit, the streets giving her space'],
    },
    morning: {
      bedroom:  ['natural morning openness, unhurried and self-possessed',
                 'softly composed, the morning unfolding around her'],
      bathroom: ['clean morning energy, present and unperformed',
                 'morning clarity, fully at ease in private space'],
      terrace:  ['fresh morning composure, easy in herself',
                 'quietly alert, the morning air keeping everything clean'],
      pool:     ['morning light energy, open and unguarded',
                 'relaxed morning presence, no performance yet'],
      kitchen:  ['domestic ease, morning routine without friction',
                 'quiet self-containment, coffee and the morning'],
      lounge:   ['morning softness still in place, the day not yet demanded anything',
                 'relaxed and present, the morning comfortable around her'],
      gym:      ['morning training focus, clean and purposeful',
                 'disciplined calm, the session in full rhythm'],
      street:   ['morning composure on the move, unhurried and certain',
                 'bright morning awareness, the city waking with her'],
    },
    midday: {
      bedroom:  ['midday stillness, the room quiet and private',
                 'calm afternoon rest, the heat doing the work'],
      bathroom: ['midday self-care, deliberate and unhurried',
                 'clean midday focus, the routine its own reward'],
      terrace:  ['social ease at the height of the day, effortless',
                 'midday composure, light and confident'],
      pool:     ['sun-warmed ease, fully relaxed in the heat',
                 'midday leisure, nothing urgent anywhere'],
      kitchen:  ['midday focus, practical and self-sufficient',
                 'noon ease, the task moving through her hands calmly'],
      lounge:   ['midday social warmth, relaxed and present',
                 'easy midday confidence, the room hers without effort'],
      gym:      ['peak training focus, midday intensity in full effect',
                 'high-noon discipline, the session demanding everything'],
      street:   ['midday social confidence, at ease in the bustle',
                 'bright midday energy, moving through the city without friction'],
    },
    afternoon: {
      bedroom:  ['lazy afternoon ease, soft and self-aware',
                 'afternoon warmth settling into her posture'],
      bathroom: ['afternoon refresh, self-contained and deliberate',
                 'warm afternoon self-care, slow and private'],
      terrace:  ['warm afternoon leisure, open and confident',
                 'relaxed afternoon ease, the light doing the work'],
      pool:     ['afternoon poolside calm, the heat slowing everything',
                 'warm and unhurried, the afternoon around her like a robe'],
      kitchen:  ['afternoon domesticity, slow and self-possessed',
                 'warm afternoon quiet, doing only what she wants'],
      lounge:   ['relaxed afternoon presence, the room perfectly hers',
                 'soft afternoon ease, nothing required of her'],
      gym:      ['afternoon session intensity, the energy still building',
                 'warm training focus, the session moving well'],
      street:   ['afternoon social ease, moving through the city at her own pace',
                 'warm afternoon confidence, the light flattering everything'],
    },
    golden_hour: {
      bedroom:  ['golden hour softness, everything warm and private',
                 'the late light making her composure feel like a portrait'],
      bathroom: ['golden-hour warmth catching every surface, quietly sensual',
                 'late light in private space, the atmosphere naturally intimate'],
      terrace:  ['golden-hour ease, effortlessly at the centre of the light',
                 'the last of the sun making the moment feel deliberate'],
      pool:     ['warm golden energy, the water and light both perfect',
                 'golden-hour poolside ease, the evening not yet arrived'],
      kitchen:  ['golden-hour warmth in domestic space, soft and self-aware',
                 'late afternoon ease in the kitchen, amber and private'],
      lounge:   ['golden-hour intimacy beginning, the room turning warm',
                 'the last good light of the day in private space'],
      gym:      ['post-session glow in golden-hour light, earned and quiet',
                 'golden-hour training finish, the effort paying off in warmth'],
      street:   ['golden-hour confidence on the street, the city at its most flattering',
                 'warm golden city ease, moving through the best light of the day'],
    },
    evening: {
      bedroom:  ['evening composure, quietly deliberate',
                 'the room turned intimate by the hour'],
      bathroom: ['evening self-care ritual, private and intentional',
                 'quiet evening transformation, doing it for herself'],
      terrace:  ['evening elegance emerging, the air cooler now',
                 'composed evening presence, the city lights arriving'],
      pool:     ['evening pool calm, the day finishing well',
                 'dusk poolside ease, the light going soft and blue'],
      kitchen:  ['evening domesticity, the kitchen warm and private',
                 'quiet evening kitchen energy, self-sufficient and calm'],
      lounge:   ['evening presence building, the room turned for the night',
                 'evening social magnetism, unhurried and assured'],
      gym:      ['evening training composure, the session almost done',
                 'end-of-day discipline, the effort winding down controlled'],
      street:   ['evening social ease, the city lighting up around her',
                 'quiet evening confidence, the streets turning to her advantage'],
    },
    night: {
      bedroom:  ['night composure, private and certain',
                 'night-time ease, at home in the dark'],
      bathroom: ['night ritual, slow and self-directed',
                 'quiet night self-care, nothing rushed'],
      terrace:  ['night presence, the city below doing the work',
                 'composed night stillness on the terrace'],
      pool:     ['night pool calm, the water dark and private',
                 'quiet night energy, the heat of the day finally gone'],
      lounge:   ['night ease, the room hers and no one else\'s',
                 'quiet night composure, the evening winding toward its own end'],
      gym:      ['late-night training focus, the building empty around her',
                 'night session discipline, the quiet making it more intense'],
      street:   ['night city ease, moving through the quiet streets unhurried',
                 'composed night presence on the street, the city her backdrop'],
      kitchen:  ['late night kitchen calm, doing only what she wants',
                 'night-time domestic ease, the quiet making everything private'],
    },
    late_night: {
      bedroom:  ['late-night stillness, the room fully her own',
                 'deep night quiet, everything stripped to the private'],
      bathroom: ['late-night self-care, slow and private, no audience',
                 'deep quiet in the bathroom, the night giving her all the time she needs'],
      terrace:  ['late-night terrace calm, the city below fully resting',
                 'deep night open air, the world gone quiet around her'],
      pool:     ['the pool hers alone in late-night darkness, fully private',
                 'deep night pool ease, the water warm and quiet'],
      lounge:   ['late-night composure, the room down to its lowest register',
                 'the room at its most private, only her in it, the night outside'],
      gym:      ['late-night training, the building silent except for the work',
                 'deep-night discipline, the solitude adding its own intensity'],
      street:   ['late-night city ease, the streets empty and hers',
                 'deep night composure on empty streets, the city at rest around her'],
      kitchen:  ['late-night kitchen quiet, the stillness making it intimate',
                 'just her and the kitchen in the deep night, moving without hurry'],
    },
  },

  // ── TENSION tier ──────────────────────────────────────────
  tension: {
    early_morning: {
      bedroom:  ['the morning bringing a slow, deliberate awareness back into the body',
                 'half-awake control, the day starting on her terms'],
      bathroom: ['morning focus sharpening, the routine becoming intentional',
                 'precise morning self-possession, the mirror confirming everything'],
      terrace:  ['morning composure with an edge, the day already hers to direct',
                 'quiet morning authority beginning to arrive'],
      pool:     ['morning energy building, the water and the light working together',
                 'focused morning presence, not yet soft'],
      kitchen:  ['morning intention arriving, moving with purpose now',
                 'deliberate morning self-sufficiency, the day starting exactly right'],
      lounge:   ['morning social awareness building, beginning to occupy the room',
                 'the morning turning deliberate, presence emerging'],
      gym:      ['pre-dawn session intensity climbing, the body fully engaged',
                 'focused early training, the rhythm building without ceremony'],
      street:   ['morning city confidence arriving, the streets giving way',
                 'quiet morning authority on the move'],
    },
    morning: {
      bedroom:  ['morning self-possession with intention behind it',
                 'the composure of someone who decided exactly how the morning would go'],
      bathroom: ['precise self-care with quiet confidence, the mirror held',
                 'morning transformation with deliberate care'],
      terrace:  ['morning authority, comfortable and certain',
                 'morning presence with something magnetic behind it'],
      pool:     ['morning energy with a focused edge, the session about to begin',
                 'bright morning intensity, the water and the body in agreement'],
      kitchen:  ['morning precision, doing exactly what she meant to do',
                 'self-sufficient morning focus, the kitchen obeying her'],
      lounge:   ['morning social magnetism, the room beginning to respond',
                 'comfortable morning authority, occupying the space completely'],
      gym:      ['training intensity building, the session in full effect',
                 'focused morning power, the weights doing what she tells them'],
      street:   ['morning confidence with a magnetic edge, the city responsive',
                 'morning energy with direction, moving like the street is hers'],
    },
    midday: {
      bedroom:  ['midday intention, the private space used deliberately',
                 'warm composure with something building behind it'],
      bathroom: ['midday self-care with focus, knowing exactly what she\'s doing',
                 'deliberate midday ritual, the routine becoming something more'],
      terrace:  ['midday social authority, the light behind her and everything seen',
                 'noon confidence, effortless and magnetic'],
      pool:     ['midday pool energy with intention, the heat not slowing anything',
                 'warm midday power, the session and the sun both at their height'],
      kitchen:  ['midday precision in domestic space, self-contained and certain',
                 'noon authority in the kitchen, doing it exactly right'],
      lounge:   ['midday social magnetism, the room oriented toward her without effort',
                 'confident midday presence, commanding the space simply by being in it'],
      gym:      ['peak training power, midday session at full intensity',
                 'maximum midday focus, the body and the session completely aligned'],
      street:   ['midday city authority, the crowds parting without noticing they\'re doing it',
                 'noon social confidence, the street responding to her energy'],
    },
    afternoon: {
      bedroom:  ['warm afternoon intention, the private space used on her terms',
                 'afternoon sensuality with control behind it'],
      bathroom: ['afternoon self-transformation, deliberate and unhurried',
                 'warm afternoon self-care with magnetic focus'],
      terrace:  ['afternoon confidence building, the light going warm around her',
                 'late afternoon magnetism, easy and certain'],
      pool:     ['afternoon pool intensity, warm and building',
                 'late heat of the afternoon making everything more deliberate'],
      kitchen:  ['afternoon domestic authority, self-sufficient and magnetic',
                 'warm afternoon focus, the kitchen a private stage'],
      lounge:   ['afternoon social magnetism with depth behind it',
                 'warm afternoon authority, the room quietly orienting to her'],
      gym:      ['afternoon training power, the session finding its full rhythm',
                 'warm high-performance focus, body and session aligned'],
      street:   ['afternoon city magnetism, moving through the warmth with authority',
                 'late afternoon confidence on the street, easy and certain'],
    },
    golden_hour: {
      bedroom:  ['golden-hour intimacy building, warm and self-aware',
                 'the light and the hour making private space feel charged'],
      bathroom: ['golden-hour transformation, the light making it feel like a reveal',
                 'warm late light in private space, deliberate and building'],
      terrace:  ['golden-hour presence, magnetic and at ease in the best light',
                 'late sun building the scene around her without any effort from her'],
      pool:     ['golden-hour pool intensity, everything warm and deliberate',
                 'the best light of the day with the best body in it, no competition'],
      kitchen:  ['golden-hour domestic magnetism, the light making it cinematic',
                 'late afternoon warmth building in private space, deliberate focus'],
      lounge:   ['golden-hour social intensity, the room completely hers',
                 'the last good light arriving as her best hour begins'],
      gym:      ['golden-hour post-session intensity, the effort and the light aligned',
                 'warm training finish in golden light, earned and magnetic'],
      street:   ['golden-hour city presence, the light doing everything for her',
                 'late sun and moving confidence, the street at its most cinematic'],
    },
    evening: {
      bedroom:  ['evening tension building in private space, deliberate and self-aware',
                 'the hour making the room more intimate, the presence responding'],
      bathroom: ['evening self-preparation with focus and intention',
                 'deliberate evening transformation, the mirror confirming everything'],
      terrace:  ['evening social authority arriving, the city responding to the hour',
                 'composed evening magnetism, the air cooler and the presence warmer'],
      pool:     ['evening pool intensity, the water dark and deliberate',
                 'dusk water and deliberate presence, the two in agreement'],
      kitchen:  ['evening kitchen authority, self-contained and magnetic',
                 'deliberate evening domesticity, the kitchen a private stage'],
      lounge:   ['evening social tension building, the room turning toward her',
                 'evening presence with an edge, the hour making everything more charged'],
      gym:      ['evening training intensity, the session finishing with full commitment',
                 'end-of-day power, the last reps the strongest'],
      street:   ['evening city tension, moving through the darkening streets with authority',
                 'dusk social magnetism, the city lighting up for her'],
    },
    night: {
      bedroom:  ['night tension in private space, controlled and deliberate',
                 'the dark making the presence more certain, nothing performing'],
      bathroom: ['night self-possession in private space, completely on her terms',
                 'deliberate night ritual, the dark adding its weight to everything'],
      terrace:  ['night city tension, the lights below and the composure above',
                 'dark terrace authority, the city a backdrop for something private'],
      pool:     ['night pool tension, the water dark and the energy contained',
                 'deliberate night-water presence, controlled and building'],
      lounge:   ['night social intensity, the room reduced to its essentials around her',
                 'evening authority arrived fully, the night room completely hers'],
      gym:      ['late-night training intensity, the empty building amplifying the focus',
                 'night session power, nothing breaking the concentration'],
      street:   ['night city authority, the streets hers in the dark',
                 'late evening confidence on the empty streets, moving without hurry'],
      kitchen:  ['night kitchen tension, doing exactly what she wants in the quiet',
                 'deliberate late-night presence, the stillness making it more charged'],
    },
    late_night: {
      bedroom:  ['late-night intensity in private space, everything stripped to its core',
                 'deep night self-possession, the hour making it more deliberate'],
      bathroom: ['late-night private focus, the dark and the mirror and nothing else',
                 'deep night self-awareness, the quiet amplifying every movement'],
      terrace:  ['late-night open-air tension, the world asleep below and she above it',
                 'deep night terrace authority, the city silent and the presence charged'],
      pool:     ['late-night water tension, the pool dark and private and completely hers',
                 'deep night intensity at the water, controlled and self-directed'],
      lounge:   ['late-night private intensity, the room at its most essential',
                 'the deep night version of herself, in the quiet with full authority'],
      gym:      ['late-night training at maximum private intensity, nothing performing for anyone',
                 'deep night session, the building empty and the focus total'],
      street:   ['late-night city authority on empty streets, the night completely hers',
                 'deep night composure moving through the quiet city, owned and certain'],
      kitchen:  ['late-night kitchen presence, private and deliberate in the deep quiet',
                 'deep night domesticity, doing exactly what she wants with the stillness around her'],
    },
  },

  // ── PAYOFF tier ───────────────────────────────────────────
  payoff: {
    early_morning: {
      bedroom:  ['the early morning is hers — awake before the world, fully certain',
                 'pre-dawn self-possession, the stillness of the morning confirming everything'],
      bathroom: ['early morning self-mastery, the day beginning exactly as she decided',
                 'pre-dawn precision, the morning ritual a quiet form of control'],
      terrace:  ['early morning authority on the terrace, the city asleep below',
                 'pre-dawn composure with the world to herself'],
      pool:     ['the pool and the pre-dawn light and no one watching, entirely hers',
                 'early morning ownership of the space, the water and the quiet both responding'],
      kitchen:  ['the kitchen and the pre-dawn hour both entirely hers',
                 'early morning self-sufficiency, everything in place, everything under control'],
      lounge:   ['the room and the hour both hers, the morning not yet disturbed',
                 'pre-dawn private authority, the stillness confirming her presence'],
      gym:      ['the gym and the pre-dawn both entirely hers, the session owning the silence',
                 'early morning training mastery, the discipline and the solitude aligned'],
      street:   ['the street before the city wakes, moving through it like she owns it',
                 'pre-dawn city ownership, the morning pavement entirely responsive'],
    },
    morning: {
      bedroom:  ['morning mastery, the light and the space and the moment all under control',
                 'the morning established on her terms, present and certain'],
      bathroom: ['morning self-possession at its fullest, the reflection confirming everything',
                 'morning authority in private space, deliberately and completely hers'],
      terrace:  ['morning confidence at its peak, the view and the light and the presence all aligned',
                 'morning ownership of the terrace, the world below just beginning'],
      pool:     ['morning pool authority, the water and the light both responding',
                 'the morning session at its best — disciplined, warm, and entirely hers'],
      kitchen:  ['morning domestic mastery, the routine a form of private performance',
                 'the kitchen and the morning completely under her direction'],
      lounge:   ['morning social authority at its fullest, the room completely oriented to her',
                 'morning presence at maximum — the space responding without effort'],
      gym:      ['morning training at its peak, the body and the session and the discipline all one',
                 'the best morning session, the work and the self completely aligned'],
      street:   ['morning city ownership, the streets and the light responding to her completely',
                 'morning authority on the move, the city in full morning response'],
    },
    midday: {
     bedroom:  ['midday mastery in private space, the heat and the certainty both at their peak',
             'the room and the noon hour completely owned, nothing soft about either'],
     bathroom: ['midday self-possession complete — the light sharp and the authority sharper',
             'noon clarity in private space, the routine a form of total control'],
     terrace:  ['midday mastery on the terrace — the overhead light, the view, and the presence all commanding',
             'the terrace owned at the height of the day, the sun confirming everything'],
     pool:     ['midday pool mastery — the heat, the water, and the body all at their combined peak',
             'the pool at noon, completely owned — the light dazzling and the presence matching it'],
     kitchen:  ['midday domestic mastery — the kitchen and the noon hour both completely under her direction',
             'noon precision in private space, everything working the way she decided it would'],
     lounge:   ['midday room mastery — the space fully occupied, the light confirming her authority',
             'noon social command, the room completely oriented to her at the brightest hour'],
     gym:      ['midday training mastery — the body and the session both at absolute peak',
             'noon gym authority — the heat and the effort and the result all aligned at their highest point'],
     street:   ['midday city mastery — the streets at full brightness and she moving through them with complete ownership',
             'the city at noon and she at her best in it — the light and the confidence completely matched'],
},
    afternoon: {
      bedroom:  ['afternoon ownership of private space, sensual and certain',
                 'warm afternoon mastery, the room and the moment completely hers'],
      bathroom: ['afternoon self-transformation complete, certain and magnetic',
                 'warm afternoon authority in private space, fully arrived'],
      terrace:  ['afternoon presence at its peak, the view and the warmth and the confidence aligned',
                 'late afternoon ownership of the terrace, the light doing everything right'],
      pool:     ['afternoon pool mastery, the body and the water and the heat completely aligned',
                 'warm afternoon authority at the pool, the session finished and the calm earned'],
      kitchen:  ['afternoon domestic ownership, self-sufficient and magnetic in equal measure',
                 'warm afternoon kitchen authority, the routine a form of quiet power'],
      lounge:   ['afternoon social mastery, the room completely oriented to her without effort',
                 'warm afternoon presence at its peak — magnetic, certain, and entirely at ease'],
      gym:      ['afternoon training mastery, the session complete and the body confirmed',
                 'peak afternoon performance, the effort and the result completely aligned'],
      street:   ['afternoon city ownership, the streets and the warmth and the confidence completely aligned',
                 'late afternoon authority on the move, the city responding in full'],
    },
    golden_hour: {
      bedroom:  ['golden-hour mastery in private space — the light and the presence both at their peak',
                 'the best light of the day in the most private space, owned completely'],
      bathroom: ['golden-hour transformation complete — the light confirming everything',
                 'late golden light in private space, the atmosphere fully charged and certain'],
      terrace:  ['golden-hour mastery on the terrace — the view, the light, and the presence all perfect',
                 'the hour and the space and the confidence all at their peak simultaneously'],
      pool:     ['golden-hour pool mastery — the body, the water, and the light all in complete alignment',
                 'the perfect hour at the perfect place, owned without effort'],
      kitchen:  ['golden-hour domestic ownership — the light making private space feel like a portrait',
                 'late sun in the kitchen, the moment and the self completely aligned'],
      lounge:   ['golden-hour social mastery — the room, the light, and the presence all at their best',
                 'the last good light of the day owned completely, the room completely hers'],
      gym:      ['golden-hour post-session mastery — the work done, the light earned, the moment owned',
                 'the training and the golden hour both at their peak, aligned and complete'],
      street:   ['golden-hour city mastery — the light, the street, and the confidence all perfect',
                 'the city and the hour both at their best, and she moving through them with complete ownership'],
    },
    evening: {
      bedroom:  ['evening mastery in private space — the hour and the presence completely aligned',
                 'the room at its most intimate, occupied by someone entirely certain of that'],
      bathroom: ['evening self-possession complete — the transformation finished and confirmed',
                 'evening authority in private space, the ritual complete and the result owned'],
      terrace:  ['evening city mastery — the lights below, the air cool, the presence commanding',
                 'the terrace owned in the evening, the city a backdrop for someone entirely certain'],
      pool:     ['evening pool mastery — the water dark and the presence dominant',
                 'dusk pool authority, the session complete and the space fully owned'],
      kitchen:  ['evening domestic mastery — self-sufficient, magnetic, and completely at ease',
                 'evening kitchen authority, the private space a stage she fills completely'],
      lounge:   ['evening social mastery — the room entirely hers, the hour entirely right',
                 'evening presence at its peak, the room and the confidence fully aligned'],
      gym:      ['evening training mastery — the final set done with complete authority',
                 'end-of-day peak performance, the session finished and the body confirmed'],
      street:   ['evening city mastery — moving through the lit streets with complete authority',
                 'dusk social ownership, the city lighting up in response'],
    },
    night: {
      bedroom:  ['night mastery in private space — completely on her terms, completely certain',
                 'the dark and the quiet and the self completely aligned in private space'],
      bathroom: ['night self-possession complete — the ritual done, the result owned, the hour hers',
                 'private night authority, the dark confirming everything'],
      terrace:  ['night city mastery — the lights below and the authority above, completely owned',
                 'the terrace at night, hers completely — the city below a detail'],
      pool:     ['night pool mastery — the water dark and the ownership complete',
                 'private night pool authority — the darkness and the confidence both total'],
      lounge:   ['night room mastery — the space reduced to its essentials and all of them hers',
                 'the room at night, stripped to its core, owned without effort'],
      gym:      ['night training mastery — the building empty, the session total, the result owned',
                 'late-night training authority — solitude and discipline at their combined peak'],
      street:   ['night city mastery — the streets hers, the quiet confirming it',
                 'late-night city ownership, moving through the dark with complete authority'],
      kitchen:  ['night kitchen mastery — the quiet, the space, and the self all completely aligned',
                 'private night domestic authority, doing exactly what she wants in complete stillness'],
    },
    late_night: {
      bedroom:  ['the deepest private hour — late night in the bedroom, entirely hers',
                 'late-night bedroom mastery, the stillness and the self completely aligned'],
      bathroom: ['late-night private authority complete — the hour, the space, and the self all one',
                 'deep night self-possession in the most private space, entirely owned'],
      terrace:  ['the city asleep below and the presence above it — late-night terrace mastery',
                 'deep night open-air authority, the world resting and she at her most certain'],
      pool:     ['the pool dark and the night total and the ownership complete',
                 'late-night water mastery — the pool hers in the deep quiet, entirely'],
      lounge:   ['the room at its most private and she at her most certain — late night mastery',
                 'deep night room authority, the stillness amplifying the presence to its maximum'],
      gym:      ['late-night training mastery — the building empty and the discipline total',
                 'deep night session at absolute peak — no audience, no restraint, complete ownership'],
      street:   ['late-night city mastery — the streets empty and hers, moving through the dark with total authority',
                 'deep night ownership of the city — the quiet streets confirming everything'],
      kitchen:  ['the kitchen and the deep night and the self all completely hers',
                 'late-night domestic mastery — the stillness and the certainty in perfect alignment'],
    },
  },
}

// ─────────────────────────────────────────────────────────────
// NARRATIVE TONE INTEGRATION
// When a narrativeTone is present from layer 02, the mood
// phrase is inflected — the tone is appended as a short
// qualifying phrase if it adds dimensionality and doesn't
// simply repeat what the mood already says.
// ─────────────────────────────────────────────────────────────

function integrateTone(moodPhrase, narrativeTone) {
  if (!narrativeTone || !moodPhrase) return moodPhrase

  const moodLower = moodPhrase.toLowerCase()
  const toneLower = narrativeTone.toLowerCase()

  // Detect overlap — if the tone adds nothing new, skip it
  const toneWords  = toneLower.split(/[\s,]+/).filter(w => w.length > 3)
  const toneAlreadyPresent = toneWords.filter(Boolean).every(w => moodLower.includes(w))
  if (toneAlreadyPresent) return moodPhrase

  // Append tone as a light qualifier, not a full sentence
  return `${moodPhrase} — ${narrativeTone}`
}

// ─────────────────────────────────────────────────────────────
// pickFromWorldMood
// Reads real world moodPools[phaseKey] when available.
// World moodPools are flat string arrays (Venice/Bali pattern).
// Returns empty string when absent so caller falls through.
// ─────────────────────────────────────────────────────────────

function pickFromWorldMood(worldObject, resolvedPhaseKey, progressionIndex) {
  if (!worldObject || !resolvedPhaseKey) return ''
  const pool = worldObject?.moodPools?.[resolvedPhaseKey]
  if (!Array.isArray(pool) || !pool.length) return ''
  const idx = Math.abs(Number(progressionIndex) || 0)
  return pool[idx % pool.length] || ''
}

// ─────────────────────────────────────────────────────────────
// pickMoodPhrase
// ─────────────────────────────────────────────────────────────

function pickMoodPhrase(progressionLevel, timeOfDay, envFamily, progressionIndex, worldObject, resolvedPhaseKey) {
  // Priority 1: real world moodPools[phaseKey]
  const worldMood = pickFromWorldMood(worldObject, resolvedPhaseKey, progressionIndex)
  if (worldMood) return worldMood

  // Priority 2: v3 internal pool (progressionLevel × timeOfDay × envFamily)
  const levelPools = MOOD_POOLS[progressionLevel] || MOOD_POOLS['tease']
  const timePools  = levelPools[timeOfDay]        || levelPools['afternoon']
  const envPool    = timePools[envFamily]          || timePools['lounge']

  if (!Array.isArray(envPool) || !envPool.length) return ''
  const idx = Math.abs(Number(progressionIndex) || 0) % envPool.length
  return envPool[idx] || ''
}

// ─────────────────────────────────────────────────────────────
// resolveMoodLayer — public layer function
// ─────────────────────────────────────────────────────────────

export function resolveMoodLayer(input, context = {}) {
  const warnings        = []
  const envFamily       = String(context?.envFamily        || 'lounge')
  const progressionLevel= String(context?.progressionLevel || 'tease')
  const timeOfDay       = String(context?.timeOfDay        || 'afternoon')
  const narrativeTone   = String(context?.narrativeTone    || '')
  const progressionIndex= Math.abs(Number(input?.progressionIndex) || 0)
  const worldObject     = context?.worldObject             || null
  const resolvedPhaseKey= String(context?.resolvedPhaseKey || '')

  const rawMoodPhrase = pickMoodPhrase(
    progressionLevel,
    timeOfDay,
    envFamily,
    progressionIndex,
    worldObject,
    resolvedPhaseKey
  )

  if (!rawMoodPhrase) {
    warnings.push(
      `moodLayer: no phrase resolved for progressionLevel '${progressionLevel}' ` +
      `timeOfDay '${timeOfDay}' envFamily '${envFamily}' phase '${resolvedPhaseKey}' — mood empty`
    )
  }

  const moodPhrase = rawMoodPhrase ? integrateTone(rawMoodPhrase, narrativeTone) : ''

  const worldUsed = !!(worldObject?.moodPools?.[resolvedPhaseKey])
  const source    = moodPhrase
    ? (worldUsed ? `world-mood:${resolvedPhaseKey}` : `v3-pool:${progressionLevel}-${timeOfDay}-${envFamily}`)
    : 'empty'

  return {
    ...makeLayerResult(moodPhrase, source, warnings),
    contextAdditions: { moodPhrase },
  }
}