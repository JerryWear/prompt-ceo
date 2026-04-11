export function resolveCoupleStyling({ subjectState = {} }) {
  const a = subjectState?.subjectA?.extractedTraits || {}
  const b = subjectState?.subjectB?.extractedTraits || {}

  const aBlock = [
    a.age,
    a.ethnicity,
    a.body_shape,
    a.eye_color,
    a.hair,
  ]
    .filter(Boolean)
    .join(', ')

  const bBlock = [
    b.age,
    b.ethnicity,
    b.build || b.body_shape,
    b.eye_color,
    b.hair,
    b.facial_hair,
  ]
    .filter(Boolean)
    .join(', ')

  if (aBlock && bBlock) {
    return `${aBlock} — paired with ${bBlock}`
  }

  return aBlock || bBlock || ''
}