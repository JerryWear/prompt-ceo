// ─────────────────────────────────────────────────────────────
// Prompt Engine v3 — Identity Resolver
// Produces one clean anchor phrase and resolves subject gender.
// The anchor phrase format is fixed by contract — this resolver
// does not invent language; it applies the exact rules.
//
// Phase 1 + Phase 2: fully implemented. This resolver does not
// need world data and is complete as written.
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// GENDER_NOUNS
// Single source of truth for gendered nouns used in anchor
// phrases. Extend here if new characterModes are added.
// ─────────────────────────────────────────────────────────────

const GENDER_NOUNS = {
  female: { noun: 'woman', adjective: 'female' },
  male:   { noun: 'man',   adjective: 'male'   },
}

function getGenderNouns(gender) {
  return GENDER_NOUNS[gender] || GENDER_NOUNS.female
}

// ─────────────────────────────────────────────────────────────
// resolveSubjectGender
// Derives the definitive gender string from input fields.
// Priority:
//   1. subjectGender field
//   2. characterMode (if 'male')
//   3. Default: 'female'
// ─────────────────────────────────────────────────────────────

function resolveSubjectGender(input) {
  const raw          = String(input?.subjectGender  || '').trim().toLowerCase()
  const characterMode = String(input?.characterMode || '').trim().toLowerCase()

  if (raw === 'male')        return 'male'
  if (raw === 'female')      return 'female'
  if (characterMode === 'male') return 'male'
  return 'female'
}

// ─────────────────────────────────────────────────────────────
// buildAnchorPhrase
// Applies the fixed anchor phrase rules from the contract.
//
// Rules (in priority order):
//   hasImage + name → "{name}, same exact {noun} as the uploaded reference image"
//   image only      → "same exact {noun} as the uploaded reference image"
//   name only       → "{name}, fixed recurring {noun} identity"
//   neither         → "consistent {noun} identity"
//
// For couple mode: both subjects are described in one phrase.
// Phase 1 handles couple mode with a simplified single phrase;
// Phase 2 will extend for dual-subject image references.
// ─────────────────────────────────────────────────────────────

function buildSingleAnchorPhrase(name, hasImage, gender) {
  const { noun } = getGenderNouns(gender)
  const cleanName = String(name || '').trim()

  if (cleanName && hasImage) {
    return `${cleanName}, same exact ${noun} as the uploaded reference image`
  }

  if (hasImage) {
    return `same exact ${noun} as the uploaded reference image`
  }

  if (cleanName) {
    return `${cleanName}, fixed recurring ${noun} identity`
  }

  return `consistent ${noun} identity`
}

function buildCoupleAnchorPhrase(input, resolvedGender) {
  const nameA      = String(input?.identityName                          || '').trim()
  const nameB      = String(input?.extractedTraits?.subjectB?.identity   || '').trim()
  const hasImageA  = !!input?.hasReferenceImage
  const { noun: nounA } = getGenderNouns(resolvedGender)
  const nounB      = resolvedGender === 'male' ? 'woman' : 'man'

  const pairLabel  = [nameA, nameB].filter(Boolean).join(' and ')

  if (hasImageA) {
    return pairLabel
      ? `${pairLabel}, same exact ${nounA} as the uploaded reference image paired with fixed recurring ${nounB} identity, preserve the same two people across every image`
      : `same exact ${nounA} as the uploaded reference image paired with fixed recurring ${nounB} identity, preserve the same two people across every image`
  }

  if (pairLabel) {
    return `${pairLabel}, fixed recurring couple identity, preserve the same two people across every image`
  }

  return `consistent recurring couple identity, preserve the same two people across every image`
}

// ─────────────────────────────────────────────────────────────
// buildTraitsPhrase
// Builds the physical traits suffix appended after the anchor
// phrase when useExtractedTraits is true.
// Traits are ordered: age → ethnicity → body_shape → eye_color → hair.
// Empty traits are skipped silently.
// ─────────────────────────────────────────────────────────────

function buildTraitsPhrase(traits = {}, gender = 'female') {
const rawAge = String(traits.age || '').trim()
  const cleanAge = gender === 'male' ? rawAge : rawAge
    .replace(/,\s*(peak feminine aesthetic|confident and visually magnetic|balanced,\s*feminine,\s*self-aware confidence|polished,\s*attractive,\s*socially powerful presence|refined,\s*composed,\s*high-value feminine presence|youthful,\s*soft feminine energy,\s*fresh and natural presence|playful,\s*social,\s*light confident energy|athletic,\s*energetic,\s*modern lifestyle confidence|confident,\s*expressive,\s*socially magnetic|self-aware confidence|visually magnetic|feminine energy|feminine presence)/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim()

  const parts = [
    cleanAge,
    String(traits.ethnicity   || '').trim(),
    String(traits.body_shape  || '').trim(),
    String(traits.build       || '').trim(),
    String(traits.eye_color   || '').trim(),
    String(traits.hair        || '').trim(),
    String(traits.facial_hair || '').trim(),
  ].filter(Boolean)

  if (gender === 'male') {
    return parts
      .map(p =>
        p
          .replace(/\bfeminine\b/gi,                              '')
          .replace(/\bfeminine\s+/gi,                            '')
          .replace(/\bbalanced,\s*feminine,\s*self-aware confidence\b/gi, 'self-assured confidence')
          .replace(/\bpeak feminine aesthetic\b/gi,              '')
          .replace(/\bhigh-value feminine presence\b/gi,         '')
          .replace(/\bpolished,\s*attractive,\s*socially powerful presence\b/gi, 'composed, high-status presence')
          .replace(/\brefined,\s*composed,\s*high-value feminine presence\b/gi,  'refined, composed presence')
          .replace(/\bself-aware confidence\b/gi,                'self-assured confidence')
          .replace(/\bvisually magnetic\b/gi,                    'quietly magnetic')
          .replace(/,\s*,+/g,                                    ', ')
          .replace(/\s{2,}/g,                                    ' ')
          .trim()
      )
      .filter(Boolean)
      .join(', ')
  }

  return parts.join(', ')
}

// ─────────────────────────────────────────────────────────────
// resolveIdentity — public function
// Takes the full EngineInputV3, returns ResolvedIdentityContext.
//
// ResolvedIdentityContext shape:
// {
//   anchorPhrase:    string,   // leads the final prompt
//   resolvedGender:  string,   // 'female' | 'male'
//   traitsPhrase:    string,   // physical descriptor suffix
//   fullIdentity:    string,   // anchor + traits joined
//   warnings:        string[],
// }
// ─────────────────────────────────────────────────────────────

export function resolveIdentity(input) {
  const warnings       = []
  const resolvedGender = resolveSubjectGender(input)
  const characterMode  = String(input?.characterMode || 'female').trim().toLowerCase()
  const hasImage       = !!input?.hasReferenceImage
  const name           = String(input?.identityName || '').trim()
  const useTraits      = !!input?.useExtractedTraits
  const traitsA        = input?.extractedTraits?.subjectA || {}

  // Build anchor phrase
  let anchorPhrase

  if (characterMode === 'couple') {
    anchorPhrase = buildCoupleAnchorPhrase(input, resolvedGender)
  } else {
    anchorPhrase = buildSingleAnchorPhrase(name, hasImage, resolvedGender)
  }

// Build traits phrase — single and couple modes
  let traitsPhrase = ''

  if (useTraits) {
    if (characterMode === 'couple') {
      // Build traits for both subjects
      const traitsB     = input?.extractedTraits?.subjectB || {}
      const nameA       = String(input?.identityName || '').trim()
      const nameB       = String(traitsB?.identity   || '').trim()
      const phraseA     = buildTraitsPhrase(traitsA, resolvedGender)
      const phraseB     = buildTraitsPhrase(traitsB, resolvedGender === 'male' ? 'female' : 'male')

if (phraseA && phraseB) {
        traitsPhrase = [phraseA, phraseB].filter(Boolean).join(', ')
      } else if (phraseA) {
        traitsPhrase = phraseA
      }
    } else {
      traitsPhrase = buildTraitsPhrase(traitsA, resolvedGender)
    }
  }

  // Warn if identity is completely anonymous
  if (!name && !hasImage) {
    warnings.push('identityResolver: no name and no reference image — using generic anchor phrase')
  }

  // Full identity = anchor + traits
  const fullIdentity = [anchorPhrase, traitsPhrase]
    .filter(Boolean)
    .join(', ')

  return {
    anchorPhrase,
    resolvedGender,
    traitsPhrase,
    fullIdentity,
    warnings,
  }
}