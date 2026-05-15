// ─────────────────────────────────────────────────────────────
// Prompt Engine v3 — Layer 05: Wardrobe / Style
//
// Responsibility: describe what the subject is wearing in a way
// consistent with the resolved world, environment family, phase,
// and plan level. Wardrobe must never contradict the action.
//
// Receives:  EngineInputV3, pipeline context (envFamily,
//            lockedWorldId, progressionLevel, plan, actionPhrase)
// Returns:   LayerResult where value = wardrobePhrase
//
// NOT allowed to:
//   - contradict the action context from layer 04
//   - exceed the explicit level set by plan
//   - write mood, location, or camera language
//   - produce lingerie or undress language on Soft plan
// ─────────────────────────────────────────────────────────────

import { makeLayerResult } from '../schemas/layerTypes.js'

// ─────────────────────────────────────────────────────────────
// WARDROBE POOLS
// Keyed: worldCategory → envFamily → progressionLevel → plan
//
// worldCategory groups worlds by their dominant wardrobe
// aesthetic. This avoids duplicating entries for every worldId.
//
// Categories:
//   luxury      — venice, paris, london, monaco, luxury_life,
//                 high_society_life, lake-como-private-escape
//   resort      — bali, luxury_yacht_riviera
//   creator     — private_creator, fanvue_creator,
//                 onlyfans_creator
//   athletic    — fitness_life, gym_influencer
// ─────────────────────────────────────────────────────────────

const WARDROBE_POOLS = {
  luxury: {
    bedroom: {
      tease: {
        Soft:         'ivory silk robe loosely tied, clean and understated',
        Fanvue:       'ivory silk robe worn open over a simple slip, draped without effort',
        Unrestricted: 'silk robe barely held at the waist, one shoulder dropping naturally',
      },
      tension: {
        Soft:         'short silk slip and bare feet, morning light catching the fabric',
        Fanvue:       'thin silk slip, one strap displaced, hem at mid-thigh',
        Unrestricted: 'silk slip ridden up, shoulder exposed, nothing adjusted',
      },
      payoff: {
        Soft:         'long satin nightdress, simple and restrained',
        Fanvue:       'dark satin chemise, low at the back, fabric moving with each step',
        Unrestricted: 'dark satin slip worn as the only layer, nothing added',
      },
    },
    bathroom: {
      tease: {
        Soft:         'thick hotel robe wrapped loosely, hair caught up in a towel',
        Fanvue:       'hotel robe open at the collar, towel at the waist',
        Unrestricted: 'robe dropped to the floor, one corner caught on the bath edge',
      },
      tension: {
        Soft:         'cotton robe tied at the waist, face freshly washed',
        Fanvue:       'robe hanging open at the chest, tied low at the hip',
        Unrestricted: 'nothing but a towel around the waist, edges loose',
      },
      payoff: {
        Soft:         'clean white robe, collar open, sleeves pushed to the elbow',
        Fanvue:       'thin robe worn off the shoulder, barely in place',
        Unrestricted: 'robe fully open, held only by one hand at the side',
      },
    },
    terrace: {
      tease: {
        Soft:         'linen shirt dress, minimal jewellery, hair loose in the morning air',
        Fanvue:       'light linen button-front dress, top two buttons open, no underlayer',
        Unrestricted: 'sheer linen slip over nothing, the light making everything visible',
      },
      tension: {
        Soft:         'tailored wide-leg trousers, silk blouse, understated and refined',
        Fanvue:       'silk cami tucked into high-waisted trousers, nothing beneath the cami',
        Unrestricted: 'linen trousers and a completely open shirt, fabric catching the breeze',
      },
      payoff: {
        Soft:         'silk midi dress, evening appropriate, single fine-chain necklace',
        Fanvue:       'satin slip dress worn as outerwear, no bra beneath',
        Unrestricted: 'floor-length slip dress, deeply cut, nothing underneath',
      },
    },
    lounge: {
      tease: {
        Soft:         'cashmere knit and tailored trousers, effortless high-status dressing',
        Fanvue:       'fitted cashmere top with a low neckline, tailored trousers',
        Unrestricted: 'oversized cashmere knit worn as a dress, nothing visible beneath',
      },
      tension: {
        Soft:         'silk blouse with the sleeves rolled, dark straight trousers',
        Fanvue:       'silk blouse with the lowest buttons left open, tucked loosely',
        Unrestricted: 'silk blouse completely undone, used as a layer over bare skin',
      },
      payoff: {
        Soft:         'tailored evening dress, structured and deliberate',
        Fanvue:       'backless evening dress with a deep front split',
        Unrestricted: 'minimal evening dress, practically nothing beneath the fabric',
      },
    },
    pool: {
      tease: {
        Soft:         'simple one-piece swimsuit, clean lines, minimal coverage',
        Fanvue:       'high-cut one-piece with thin straps and low back',
        Unrestricted: 'barely-there two-piece, coverage minimal and deliberate',
      },
      tension: {
        Soft:         'linen cover-up over a swimsuit, loosely belted',
        Fanvue:       'sheer cover-up over a strapless two-piece, the cover-up parted',
        Unrestricted: 'cover-up discarded at the pool edge, two-piece beneath',
      },
      payoff: {
        Soft:         'swimsuit with a towel wrapped at the hip, leaving the pool',
        Fanvue:       'wet two-piece, fabric clinging, cover-up not replaced',
        Unrestricted: 'wet minimal two-piece, nothing covering, nothing adjusted',
      },
    },
    street: {
      tease: {
        Soft:         'tailored coat over a silk blouse, dark trousers and pointed flats',
        Fanvue:       'structured blazer over a low-cut silk top, no blouse beneath',
        Unrestricted: 'oversized blazer worn as a dress with nothing visible underneath',
      },
      tension: {
        Soft:         'fitted midi dress and sunglasses, classic and controlled',
        Fanvue:       'fitted silk dress with a deep side split, sunglasses on',
        Unrestricted: 'silk slip dress worn outside, sheer in direct light',
      },
      payoff: {
        Soft:         'evening coat over a simple dress, refined and deliberate',
        Fanvue:       'long coat open over a backless dress, worn with nothing beneath',
        Unrestricted: 'long coat fully open, minimal dress beneath, moving in the night air',
      },
    },
    kitchen: {
      tease: {
        Soft:         'oversized knit and bare legs, morning hair loose',
        Fanvue:       'oversized knit worn short with bare legs, nothing beneath visible',
        Unrestricted: 'oversized shirt worn open, bare beneath, sleeves rolled',
      },
      tension: {
        Soft:         'fitted vest top and loose trousers, relaxed morning dressing',
        Fanvue:       'thin vest top and low-rise shorts, casual and aware',
        Unrestricted: 'thin vest with no support beneath, low-rise shorts',
      },
      payoff: {
        Soft:         'cotton dress, clean and simple, morning appropriate',
        Fanvue:       'fitted cotton dress with a low back and thin straps',
        Unrestricted: 'thin cotton slip, morning light visible through the fabric',
      },
    },
    gym: {
      tease: {
        Soft:         'high-waisted leggings and a fitted crop top, clean gym look',
        Fanvue:       'high-waisted leggings and a fitted sports bra, minimal coverage',
        Unrestricted: 'high-cut leggings and a cropped sports bra, nothing added',
      },
      tension: {
        Soft:         'compression shorts and a fitted training tee, focused and clean',
        Fanvue:       'compression shorts and a thin sports bra, training underway',
        Unrestricted: 'minimal compression shorts and a barely-there bra top',
      },
      payoff: {
        Soft:         'full leggings and training top, post-workout and composed',
        Fanvue:       'low-waisted leggings and a damp sports bra after the session',
        Unrestricted: 'low-waisted shorts and a wet sports bra, session finished',
      },
    },
  },
}

// Resort shares most luxury pool/terrace/bedroom logic with
// tropical fabric adjustments
WARDROBE_POOLS.resort = {
  ...WARDROBE_POOLS.luxury,
  bedroom: {
    tease: {
      Soft:         'thin white linen shirt worn as a cover-up, morning light behind it',
      Fanvue:       'thin white linen shirt buttoned once at the waist, nothing beneath',
      Unrestricted: 'white linen shirt open, worn over bare skin, moving in the island air',
    },
    tension: {
      Soft:         'silk sarong wrapped at the waist, simple and tropical',
      Fanvue:       'silk sarong tied low, top not added, relaxed and warm',
      Unrestricted: 'sarong loosely knotted, worn as the only layer',
    },
    payoff: {
      Soft:         'cotton slip dress, short and simple, barefoot',
      Fanvue:       'thin cotton slip worn without an underlayer in the villa warmth',
      Unrestricted: 'cotton slip barely covering, barefoot on warm stone',
    },
  },
  terrace: {
    tease: {
      Soft:         'white linen dress, thin straps and loose fit, sandals',
      Fanvue:       'sheer white linen dress over a minimal bikini, in the morning light',
      Unrestricted: 'sheer linen cover-up over a string bikini, nothing between the layers',
    },
    tension: {
      Soft:         'linen shorts and a tied cotton shirt, tropical and relaxed',
      Fanvue:       'linen shorts and a knotted cotton shirt open to the midriff',
      Unrestricted: 'linen shorts and an open shirt, bare beneath',
    },
    payoff: {
      Soft:         'maxi dress with thin straps, simple tropical elegance',
      Fanvue:       'open-back maxi dress, nothing beneath, breeze moving the fabric',
      Unrestricted: 'maxi dress split to the hip, no underlayer, barefoot',
    },
  },
}

// Creator wardrobe pools
WARDROBE_POOLS.creator = {
  bedroom: {
    tease: {
      Soft:         'oversized tee and cotton shorts, natural and unguarded',
      Fanvue:       'thin cami and boy shorts, simple and aware',
      Unrestricted: 'thin cami with no support beneath, boy shorts ridden up slightly',
    },
    tension: {
      Soft:         'cotton bralette and high-waisted shorts, comfortable and deliberate',
      Fanvue:       'lace bralette and high-waisted briefs, styled with intention',
      Unrestricted: 'lace bralette barely containing, high-cut briefs, nothing else',
    },
    payoff: {
      Soft:         'simple slip dress, short hem, no accessories',
      Fanvue:       'sheer bodysuit over minimal underwear, styled for the camera',
      Unrestricted: 'sheer bodysuit worn as the final layer, everything visible beneath',
    },
  },
  bathroom: WARDROBE_POOLS.luxury.bathroom,
  terrace: WARDROBE_POOLS.luxury.terrace,
  lounge: {
    tease: {
      Soft:         'fitted ribbed top and high-waisted joggers, casual and clean',
      Fanvue:       'cropped ribbed top and high-waisted shorts, intentionally simple',
      Unrestricted: 'crop top and high-cut shorts, nothing extra',
    },
    tension: {
      Soft:         'matching set: bralette and cycling shorts, composed',
      Fanvue:       'minimal matching set with a barely-there bralette',
      Unrestricted: 'bralette and thong brief worn as a set, nothing added',
    },
    payoff: {
      Soft:         'satin cami and shorts, simple evening-at-home dressing',
      Fanvue:       'satin cami worn loose with no underwear beneath, hem moving',
      Unrestricted: 'satin slip and nothing else, worn as an evening outfit',
    },
  },
  pool: WARDROBE_POOLS.luxury.pool,
  street: WARDROBE_POOLS.luxury.street,
  kitchen: WARDROBE_POOLS.luxury.kitchen,
  gym: WARDROBE_POOLS.luxury.gym,
}

// Athletic wardrobe — gym-appropriate, plan-aware
WARDROBE_POOLS.athletic = {
  gym: {
    tease: {
      Soft:         'high-waisted training leggings and a supportive sports bra, clean and focused',
      Fanvue:       'high-waisted leggings with a cropped bra, midriff visible, training ready',
      Unrestricted: 'high-cut training shorts and a minimal bra top, everything functional',
    },
    tension: {
      Soft:         'compression set in a dark solid colour, no skin above the waist',
      Fanvue:       'compression shorts and a damp sports bra mid-session',
      Unrestricted: 'compression shorts with a barely-there bra top, mid-session',
    },
    payoff: {
      Soft:         'full training kit, clean post-session, composed',
      Fanvue:       'low-waisted leggings and a wet sports bra after the final set',
      Unrestricted: 'low-waisted shorts and a translucent bra after the session',
    },
  },
  bedroom: WARDROBE_POOLS.luxury.bedroom,
  bathroom: {
    tease: {
      Soft:         'gym towel wrapped at the chest, freshly showered',
      Fanvue:       'gym towel wrapped low, just above the hip, post-shower',
      Unrestricted: 'towel dropped at the shower base, steam around the body',
    },
    tension: {
      Soft:         'athlete robe tied at the waist in the locker room',
      Fanvue:       'thin robe worn open over a sports bra, locker room setting',
      Unrestricted: 'nothing but the locker room steam and a towel on the bench nearby',
    },
    payoff: {
      Soft:         'clean training clothes back on, showered and ready',
      Fanvue:       'fresh outfit on, sports bra visible through the wet hair',
      Unrestricted: 'wet skin, towel discarded, post-shower and deliberate',
    },
  },
  terrace: {
    tease: {
      Soft:         'training shorts and a loose athletic tee, early morning warmup',
      Fanvue:       'training shorts and a cropped training tee tied at the midriff',
      Unrestricted: 'training shorts and a cropped top with no back, warm-up',
    },
    tension: {
      Soft:         'full-length leggings and a sports tank, mid-session',
      Fanvue:       'high-waisted leggings and a thin racerback, nothing beneath',
      Unrestricted: 'compression shorts and a barely-there racerback, heat rising',
    },
    payoff: {
      Soft:         'cool-down stretch in training kit, post-workout calm',
      Fanvue:       'post-session in damp leggings and a sports bra, outdoor air',
      Unrestricted: 'post-session in minimal wet kit, not yet changed',
    },
  },
  lounge: WARDROBE_POOLS.luxury.lounge,
  pool: WARDROBE_POOLS.luxury.pool,
  street: WARDROBE_POOLS.luxury.street,
  kitchen: WARDROBE_POOLS.luxury.kitchen,
}

// ─────────────────────────────────────────────────────────────
// WORLD_TO_CATEGORY
// Maps worldId to a wardrobe category.
// Any worldId not listed falls back to 'luxury'.
// ─────────────────────────────────────────────────────────────

const WORLD_TO_CATEGORY = {
  bali:                        'resort',
  'luxury_yacht_riviera':      'resort',
  venice:                      'luxury',
  paris:                       'luxury',
  london:                      'luxury',
  monaco:                      'luxury',
  'lake-como-private-escape':  'luxury',
  luxury_life:                 'luxury',
  high_society_life:           'luxury',
  private_creator:             'creator',
  fanvue_creator:              'creator',
  onlyfans_creator:            'creator',
  fitness_life:                'athletic',
  gym_influencer:              'athletic',
  'fitness_global_elite':      'athletic',
}

function getWardrobeCategory(lockedWorldId) {
  return WORLD_TO_CATEGORY[lockedWorldId] || 'luxury'
}

// ─────────────────────────────────────────────────────────────
// pickFromWorldStyling
// Reads real world stylingPools when available.
// World stylingPools shape (Venice/Bali pattern):
//   stylingPools.wardrobe[phaseKey][]   — wardrobe strings
//
// Returns empty string when world data is absent so the
// caller falls through to the v3 category pools.
// ─────────────────────────────────────────────────────────────

function pickFromWorldStyling(worldObject, resolvedPhaseKey, progressionIndex, plan) {
  if (!worldObject || !resolvedPhaseKey) return ''

  const wardrobePool = worldObject?.stylingPools?.wardrobe?.[resolvedPhaseKey]
  if (!Array.isArray(wardrobePool) || !wardrobePool.length) return ''

  const idx = Math.abs(Number(progressionIndex) || 0)

  // For Soft plan, try to pick a non-explicit entry (first half of pool)
  if (plan === 'Soft') {
    const softPool = wardrobePool.slice(0, Math.ceil(wardrobePool.length / 2))
    return softPool[idx % softPool.length] || wardrobePool[0] || ''
  }

  return wardrobePool[idx % wardrobePool.length] || ''
}

// ─────────────────────────────────────────────────────────────
// pickWardrobePhrase — resolves a single wardrobe phrase.
// Falls back through: exact match → lounge → empty.
// ─────────────────────────────────────────────────────────────

function pickWardrobePhrase(lockedWorldId, envFamily, progressionLevel, plan, worldObject, resolvedPhaseKey, progressionIndex) {
  // Priority 1: real world stylingPools[phaseKey]
  const worldWardrobe = pickFromWorldStyling(worldObject, resolvedPhaseKey, progressionIndex, plan)
  if (worldWardrobe) return worldWardrobe

  // Priority 2: v3 category pools keyed by world → envFamily → progression → plan
  const category  = getWardrobeCategory(lockedWorldId)
  const poolSet   = WARDROBE_POOLS[category] || WARDROBE_POOLS.luxury
  const envPool   = poolSet[envFamily]        || poolSet['lounge']
  if (!envPool) return ''

  const levelPool = envPool[progressionLevel] || envPool['tease']
  if (!levelPool) return ''

  if (plan === 'Unrestricted' && levelPool.Unrestricted) return levelPool.Unrestricted
  if (plan === 'Fanvue'       && levelPool.Fanvue)       return levelPool.Fanvue
  return levelPool.Soft || ''
}

// ─────────────────────────────────────────────────────────────
// ACTION CONSISTENCY CHECK
// Certain action patterns imply certain wardrobe contexts.
// This prevents placing a dinner-gown wardrobe on a post-gym
// shower scene, or placing athletic wear in a candlelit salon.
// ─────────────────────────────────────────────────────────────

function checkWardrobeActionConsistency(wardrobePhrase, actionPhrase, envFamily) {
  const warnings = []
  if (!wardrobePhrase || !actionPhrase) return warnings

  const w = wardrobePhrase.toLowerCase()
  const a = actionPhrase.toLowerCase()

  // Formal wear at gym or pool is a contradiction
  if ((envFamily === 'gym' || envFamily === 'pool') &&
      /evening dress|tailored coat|silk blouse|cashmere/.test(w)) {
    warnings.push(
      `wardrobeLayer: formal wardrobe ('${wardrobePhrase.slice(0, 40)}…') ` +
      `placed in envFamily '${envFamily}' — check pool assignment`
    )
  }

  // Swimwear in street or kitchen is a contradiction
  if ((envFamily === 'street' || envFamily === 'kitchen') &&
      /bikini|swimsuit|two-piece/.test(w)) {
    warnings.push(
      `wardrobeLayer: swimwear placed in envFamily '${envFamily}' — ` +
      `check pool assignment`
    )
  }

  return warnings
}

// ─────────────────────────────────────────────────────────────
// resolveWardrobeLayer — public layer function
// ─────────────────────────────────────────────────────────────

export function resolveWardrobeLayer(input, context = {}) {
  const warnings        = []
  const envFamily       = String(context?.envFamily        || 'lounge')
  const lockedWorldId   = String(context?.lockedWorldId    || '')
  const progressionLevel= String(context?.progressionLevel || 'tease')
  const progressionIndex= Math.abs(Number(input?.progressionIndex) || 0)
  const actionPhrase    = String(context?.actionPhrase     || '')
  const worldObject     = context?.worldObject             || null
  const resolvedPhaseKey= String(context?.resolvedPhaseKey || '')

  // Plan is always Unrestricted in v3 — set at input level
  const plan = String(input?.plan || 'Unrestricted')

  const wardrobePhrase = pickWardrobePhrase(
    lockedWorldId,
    envFamily,
    progressionLevel,
    plan,
    worldObject,
    resolvedPhaseKey,
    progressionIndex
  )

  const consistencyWarnings = checkWardrobeActionConsistency(wardrobePhrase, actionPhrase, envFamily)
  warnings.push(...consistencyWarnings)

  if (!wardrobePhrase) {
    warnings.push(
      `wardrobeLayer: no wardrobe resolved for worldId '${lockedWorldId}' ` +
      `envFamily '${envFamily}' phase '${resolvedPhaseKey}' — wardrobe empty`
    )
  }

  const worldUsed = !!(worldObject?.stylingPools?.wardrobe?.[resolvedPhaseKey])
  const source    = wardrobePhrase
    ? (worldUsed ? `world-styling:${resolvedPhaseKey}` : `category:${getWardrobeCategory(lockedWorldId)}-${envFamily}`)
    : 'empty'

  return {
    ...makeLayerResult(wardrobePhrase, source, warnings),
    contextAdditions: { wardrobePhrase },
  }
}