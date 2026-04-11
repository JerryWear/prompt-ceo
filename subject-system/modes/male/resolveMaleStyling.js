function normalizeBuild(buildRaw) {
  const val = String(buildRaw || '').toLowerCase()

  if (!val) return ''

  if (val.includes('bodybuilder')) return 'very muscular, dense athletic physique'
  if (val.includes('muscular')) return 'muscular, well-developed physique'
  if (val.includes('athletic')) return 'athletic, well-balanced build'
  if (val.includes('lean')) return 'lean, defined physique'

  return buildRaw
}

export function resolveMaleStyling({ subjectState = {} }) {
  const traits = subjectState?.subjectA?.extractedTraits || {}

  const age = String(traits.age || '').trim()
  const ethnicity = String(traits.ethnicity || '').trim()
  const build = normalizeBuild(traits.build || traits.body_shape)
  const eye = String(traits.eye_color || '').trim()
  const hair = String(traits.hair || '').trim()
  const facialHair = String(traits.facial_hair || '').trim()

  return [
    age,
    ethnicity,
    build,
    /\beyes\b/i.test(eye) ? eye : eye ? `${eye} eyes` : '',
    hair,
    facialHair,
  ]
    .map((x) => String(x || '').trim())
    .filter(Boolean)
    .join(', ')
}