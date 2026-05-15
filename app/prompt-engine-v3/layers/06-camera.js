
// ─────────────────────────────────────────────────────────────
// Prompt Engine v3 — Layer 06: Camera
//
// Upgraded with real cinematography vocabulary:
// lens direction, focal length, shot type, director grammar.
// Every phrase reads like a real shot list entry.
// ─────────────────────────────────────────────────────────────
 
import { makeLayerResult } from '../schemas/layerTypes.js'
 
// ─────────────────────────────────────────────────────────────
// CAMERA POOLS
// Keyed: envFamily → progressionLevel → array of options.
//
// Language rules:
//   - real lens focal lengths (24mm, 35mm, 50mm, 85mm, 135mm)
//   - real shot types (establishing, medium, close, extreme close)
//   - real camera positions (eye level, low angle, high angle)
//   - real depth of field language (shallow, deep, compressed)
//   - no atmospheric or mood language
//   - max 10 words per phrase
// ─────────────────────────────────────────────────────────────
 
const CAMERA_POOLS = {
  bedroom: {
    tease: [
      '35mm wide from doorway, deep focus, subject small in frame',
      '50mm over-shoulder from window side, soft background compression',
      '35mm medium from corner, eye-level, natural light falloff',
      '24mm establishing from entrance, full room depth visible',
    ],
    tension: [
      '85mm medium, chest height, shallow focus, background dissolved',
      '50mm side profile, eye level, shallow depth of field',
      '85mm low angle from bed edge, compression pulling background in',
      '50mm three-quarter, waist height, soft bokeh behind subject',
    ],
    payoff: [
      '135mm tight close-up, face height, extreme background compression',
      '85mm intimate over-shoulder, shallow focus, room dissolved',
      '135mm extreme close-up, razor-thin depth of field',
      '85mm profile close, subject filling left two-thirds of frame',
    ],
  },
 
  bathroom: {
    tease: [
      '35mm wide through doorway, marble depth receding behind subject',
      '50mm medium beside basin, eye level, mirror in background',
      '35mm over-shoulder mirror framing, reflection doubling depth',
      '24mm wide, full bathroom visible, subject at vanity',
    ],
    tension: [
      '85mm medium, shoulder height, marble wall compressed behind',
      '50mm side profile against marble, shallow depth of field',
      '85mm three-quarter beside bath, background softened',
      '50mm mirror close, reflection at same focal plane as subject',
    ],
    payoff: [
      '135mm tight mirror framing, face filling frame, tiles dissolved',
      '85mm low angle beneath mirror, upward compression',
      '135mm over-shoulder mirror, double-image shallow focus',
      '85mm extreme close, steam softening background geometry',
    ],
  },
 
  terrace: {
    tease: [
      '24mm wide establishing, full terrace depth, sky in upper third',
      '35mm interior over-shoulder outward, cityscape or sea receding',
      '35mm medium from terrace corner, railing leading to horizon',
      '24mm ultra-wide, architecture framing subject at centre',
    ],
    tension: [
      '50mm medium, railing in soft foreground, view compressed behind',
      '85mm side profile along railing, horizon line at shoulder height',
      '50mm low angle, terrace stone in foreground, sky above subject',
      '85mm medium, subject one-third of frame, view filling rest',
    ],
    payoff: [
      '135mm tight from terrace interior, subject compressed against view',
      '85mm close at railing edge, horizon dissolved in background',
      '135mm over-shoulder into interior, reverse compression',
      '85mm sunset backlit close, rim light defining subject edge',
    ],
  },
 
  pool: {
    tease: [
      '24mm wide from pool deck, full water surface and architecture',
      '35mm garden-side over-shoulder, pool receding to horizon',
      '35mm medium poolside, eye level, water surface visible',
      '24mm establishing, infinity edge bleeding into landscape',
    ],
    tension: [
      '50mm water-level medium, surface in sharp foreground',
      '85mm side profile at pool edge, water reflections behind',
      '50mm low angle from waterline, sky filling upper frame',
      '85mm medium, subject at edge, pool depth dissolved behind',
    ],
    payoff: [
      '135mm tight from pool edge, water completely dissolved',
      '85mm shoulder-height water framing, surface catching light',
      '135mm over-shoulder from pool interior, reverse angle',
      '85mm close at waterline, lens almost at surface',
    ],
  },
 
  kitchen: {
    tease: [
      '35mm wide from entrance, full counter depth visible',
      '35mm dining-side over-shoulder, kitchen receding behind',
      '24mm wide counter composition, architecture framing subject',
      '35mm medium, subject at counter, window light from side',
    ],
    tension: [
      '85mm medium at counter height, background tiles compressed',
      '50mm side profile, counter in foreground, window behind',
      '85mm three-quarter kitchen angle, shallow focus on subject',
      '50mm over counter, subject beyond foreground surface',
    ],
    payoff: [
      '135mm tight countertop framing, background completely dissolved',
      '85mm close from counter side, surface detail in foreground',
      '135mm over-shoulder kitchen depth, subject sharp, room soft',
      '85mm extreme close, steam or steam softening geometry behind',
    ],
  },
 
  lounge: {
    tease: [
      '35mm wide from entrance, full room depth, subject at far end',
      '35mm over-shoulder sofa framing, room receding behind',
      '24mm wide room composition, architecture as leading lines',
      '35mm medium wide, subject at left, room depth on right',
    ],
    tension: [
      '85mm medium seated, eye-level, background furniture compressed',
      '50mm side profile at sofa, shallow focus on subject',
      '85mm three-quarter coffee-table framing, room dissolved',
      '50mm low angle from floor level, subject elevated in frame',
    ],
    payoff: [
      '135mm tight seated close-up, room completely dissolved',
      '85mm low-angle subject framing, ceiling geometry above',
      '135mm over-shoulder subject focus, background painting soft',
      '85mm extreme close, ambient lamp glow framing face',
    ],
  },
 
  gym: {
    tease: [
      '24mm wide gym establishing, equipment receding to mirror wall',
      '35mm equipment-side medium, barbell in foreground',
      '35mm over-shoulder angle, weight rack receding behind',
      '24mm ultra-wide, mirror wall doubling depth of room',
    ],
    tension: [
      '50mm medium torso-height, equipment compressed behind',
      '85mm side profile beside equipment, shallow focus',
      '35mm floor-level low-angle, upward compression',
      '50mm three-quarter mirror angle, reflection in background',
    ],
    payoff: [
      '135mm tight post-set framing, gym completely dissolved',
      '85mm shoulder-height close angle, sweat catching light',
      '135mm mirror over-shoulder, reflection at same focal plane',
      '85mm extreme close, mirror wall multiplying background',
    ],
  },
 
  street: {
    tease: [
      '35mm wide establishing, architecture receding to vanishing point',
      '35mm doorway over-shoulder, street depth behind subject',
      '24mm medium-wide, subject at one-third, city filling frame',
      '35mm tracking angle, street leading lines pulling eye through',
    ],
    tension: [
      '85mm medium chest-height, street compressed behind subject',
      '50mm side profile, architecture in soft background',
      '85mm three-quarter tracking angle, shallow street focus',
      '50mm compressed depth, city geometry dissolved behind',
    ],
    payoff: [
      '135mm tight street close-up, city completely dissolved',
      '85mm compressed depth close framing, bokeh city lights',
      '135mm rear over-shoulder, subject sharp, street soft ahead',
      '85mm extreme close, architectural detail dissolved in bg',
    ],
  },
}
 
// ─────────────────────────────────────────────────────────────
// WORLD CAMERA ADDITIONS
// World-specific cinematic signatures that override base pools
// for certain env/progression combinations.
// ─────────────────────────────────────────────────────────────
 
const WORLD_CAMERA_ADDITIONS = {
  venice: {
    terrace: {
      tease:   '24mm wide from the canal-side, water surface in lower foreground, palazzo receding',
      tension: '85mm medium against balustrade, canal dissolved in background compression',
      payoff:  '135mm close framing canal light behind subject, water completely soft',
    },
    street: {
      tease:   '35mm medium across the bridge, canal receding on both sides to fog',
      tension: '85mm side profile against palazzo wall, canal at 1.4 in background',
      payoff:  '135mm tight against stone wall, canal bokeh filling background',
    },
  },
  monaco: {
    terrace: {
      tease:   '24mm wide, harbor depth below subject, yachts receding to horizon',
      tension: '85mm medium at terrace rail, harbor compressed behind subject',
      payoff:  '135mm close, harbor lights dissolved, subject rim-lit by sea glow',
    },
    pool: {
      tease:   '24mm wide, infinity edge bleeding into Mediterranean horizon',
      tension: '50mm water-level medium, sea visible beyond pool edge',
      payoff:  '135mm tight at pool edge, sea completely dissolved behind subject',
    },
  },
  bali: {
    terrace: {
      tease:   '24mm wide across teak deck, jungle and sky in upper two-thirds',
      tension: '85mm medium at railing, jungle depth pulling soft behind subject',
      payoff:  '135mm close against railing, jungle dissolved at f/1.8',
    },
    pool: {
      tease:   '24mm wide from garden side, infinity edge bleeding into valley',
      tension: '50mm water-level medium, pool surface sharp, valley soft beyond',
      payoff:  '135mm tight at water level, Mediterranean surface in sharp foreground',
    },
  },
  luxury_yacht_riviera: {
    terrace: {
      tease:   '24mm wide from the stern, open sea filling entire background',
      tension: '85mm medium at rail, horizon sitting at shoulder height compressed',
      payoff:  '135mm close at rail, sea completely dissolved, rim light from horizon',
    },
    pool: {
      tease:   '24mm wide from swim platform, superyacht hull framing left side',
      tension: '50mm water-level, deck surface in foreground, sea beyond',
      payoff:  '135mm tight at waterline, Mediterranean surface in sharp foreground',
    },
  },
  paris: {
    terrace: {
      tease:   '35mm wide from balcony, Haussmann rooftops receding to horizon',
      tension: '85mm medium at balcony rail, city compressed behind subject',
      payoff:  '135mm close, Paris rooftops dissolved in golden background',
    },
    street: {
      tease:   '35mm medium on boulevard, avenue depth receding behind subject',
      tension: '85mm side profile against stone facade, street compressed',
      payoff:  '135mm tight, Parisian architecture dissolved in background',
    },
  },
  london: {
    street: {
      tease:   '35mm wide, Georgian architecture receding on both sides',
      tension: '85mm medium, London brick compressed behind subject',
      payoff:  '135mm tight, city dissolved, overcast light flattening background',
    },
  },
}
 
// ─────────────────────────────────────────────────────────────
// DIRECTOR PRESET CAMERA OVERRIDES
// When a director preset is active, camera language shifts
// to match that director's visual grammar.
// ─────────────────────────────────────────────────────────────
 
const DIRECTOR_CAMERA = {
  kubrick: [
    '18mm ultra-wide one-point perspective, subject centred, geometry receding symmetrically',
    '24mm symmetrical wide, slow push-in framing, clinical precision',
    '18mm wide angle, corridors or architecture converging behind subject',
  ],
  wong: [
    '35mm step-printed motion blur, saturated background compression',
    '50mm blurred foreground bokeh, subject at emotional remove',
    '85mm shallow focus, colour bleeding at frame edges',
  ],
  coppola: [
    '50mm soft overexposed, hazy window light, distant observational framing',
    '35mm ethereal stillness, pastel architecture dissolved behind subject',
    '85mm dreamy shallow focus, subject half in shadow half in light',
  ],
  fincher: [
    '50mm desaturated, ultra-precise composition, slight upward low angle',
    '85mm controlled shadow depth, subject at exact geometric intersection',
    '35mm teal-orange grade, locked-off frame, zero camera movement implied',
  ],
  villeneuve: [
    '24mm epic wide, overwhelming negative space, subject small at centre',
    '35mm grand scale establishing, silence implied through composition',
    '50mm IMAX-quality depth, horizon line bisecting frame precisely',
  ],
  noe: [
    '24mm overhead bird-eye rotation, neon light saturating background',
    '14mm extreme wide confrontational, subject breaking fourth wall',
    '35mm strobe-adjacent framing, high contrast geometry behind subject',
  ],
}
 
// ─────────────────────────────────────────────────────────────
// pickFromWorldCamera
// ─────────────────────────────────────────────────────────────
 
function pickFromWorldCamera(worldObject, resolvedPhaseKey, progressionIndex) {
  if (!worldObject || !resolvedPhaseKey) return ''
  const pool = worldObject?.cameraPools?.[resolvedPhaseKey]
  if (!Array.isArray(pool) || !pool.length) return ''
  const idx = Math.abs(Number(progressionIndex) || 0)
  return pool[idx % pool.length] || ''
}
 
// ─────────────────────────────────────────────────────────────
// pickCameraPhrase
// ─────────────────────────────────────────────────────────────
 
function pickCameraPhrase(
  envFamily,
  progressionLevel,
  progressionIndex,
  lockedWorldId,
  worldObject,
  resolvedPhaseKey,
  cameraOverride,
  directorPreset,
) {
  // Priority 1: chapter camera override
  if (cameraOverride) return cameraOverride
 
  // Priority 2: director preset camera grammar
  if (directorPreset && directorPreset !== 'none' && DIRECTOR_CAMERA[directorPreset]) {
    const pool = DIRECTOR_CAMERA[directorPreset]
    const idx  = Math.abs(Number(progressionIndex) || 0) % pool.length
    return pool[idx]
  }
 
  // Priority 3: real world cameraPools[phaseKey]
  const worldCamera = pickFromWorldCamera(worldObject, resolvedPhaseKey, progressionIndex)
  if (worldCamera) return worldCamera
 
  // Priority 4: world-specific cinematic signature
  const worldAddition = WORLD_CAMERA_ADDITIONS[lockedWorldId]?.[envFamily]
  if (worldAddition) {
    const levelCamera = worldAddition[progressionLevel]
    if (levelCamera) return levelCamera
  }
 
  // Priority 5: env/progression pool
  const family   = CAMERA_POOLS[envFamily]  || CAMERA_POOLS['lounge']
  const tierPool = family[progressionLevel] || family['tease']
  if (!Array.isArray(tierPool) || !tierPool.length) return ''
  const idx = Math.abs(Number(progressionIndex) || 0) % tierPool.length
  return tierPool[idx] || ''
}
 
// ─────────────────────────────────────────────────────────────
// resolveCameraLayer — public layer function
// ─────────────────────────────────────────────────────────────
 
export function resolveCameraLayer(input, context = {}) {
  const warnings         = []
  const envFamily        = String(context?.envFamily        || 'lounge')
  const lockedWorldId    = String(context?.lockedWorldId    || '')
  const progressionLevel = String(context?.progressionLevel || 'tease')
  const progressionIndex = Math.abs(Number(input?.progressionIndex) || 0)
  const worldObject      = context?.worldObject             || null
  const resolvedPhaseKey = String(context?.resolvedPhaseKey || '')
  const cameraOverride   = String(context?.cameraOverride   || '')
  const directorPreset   = String(input?.directorPreset     || 'none')
 
  const cameraPhrase = pickCameraPhrase(
    envFamily,
    progressionLevel,
    progressionIndex,
    lockedWorldId,
    worldObject,
    resolvedPhaseKey,
    cameraOverride,
    directorPreset,
  )
 
  if (!cameraPhrase) {
    warnings.push(
      `cameraLayer: no phrase resolved for envFamily '${envFamily}' ` +
      `phase '${resolvedPhaseKey}' — camera empty`
    )
  }
 
  // Derive frameType from upgraded language
  let frameType = 'mid'
  if (cameraPhrase) {
    const c = cameraPhrase.toLowerCase()
    if (/24mm|ultra-wide|establishing|wide/.test(c))    frameType = 'wide'
    else if (/135mm|extreme close|tight/.test(c))        frameType = 'close'
    else if (/85mm|shallow|compressed/.test(c))          frameType = 'compressed'
    else if (/over.shoulder/.test(c))                    frameType = 'over-shoulder'
    else if (/profile|side/.test(c))                     frameType = 'profile'
    else if (/50mm|medium/.test(c))                      frameType = 'mid'
  }
 
  const worldUsed = !!(worldObject?.cameraPools?.[resolvedPhaseKey])
  const source = cameraPhrase
    ? (cameraOverride         ? 'chapter-override'
      : directorPreset !== 'none' ? `director:${directorPreset}`
      : worldUsed             ? `world-camera:${resolvedPhaseKey}`
      : `env-pool:${envFamily}-${progressionLevel}`)
    : 'empty'
 
  return {
    ...makeLayerResult(cameraPhrase, source, warnings),
    contextAdditions: { cameraPhrase, frameType },
  }
}