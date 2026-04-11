export function resolveFemaleStyling({ subjectState = {} }) {
  const traits = subjectState?.subjectA?.extractedTraits || {}

  return [
    traits.age,
    traits.ethnicity,
    traits.body_shape,
    traits.eye_color,
    traits.hair,
  ]
    .map((x) => String(x || '').trim())
    .filter(Boolean)
    .join(', ')
}