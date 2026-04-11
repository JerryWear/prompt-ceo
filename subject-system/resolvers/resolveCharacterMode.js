export function resolveCharacterMode(subjectState = {}) {
  const mode = String(subjectState?.characterMode || '').trim()

  if (mode === 'male') return 'male'
  if (mode === 'couple') return 'couple'
  return 'female'
}