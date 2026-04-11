export function buildSingleIdentityLead({
  gender = 'female',
  subject = {},
}) {
  const cleanName = String(subject?.identityName || '').trim()
  const hasImage =
  !!String(subject?.imageDataUrl || '').trim() ||
  !!String(subject?.sourceFileName || '').trim()

  const noun = gender === 'male' ? 'man' : 'woman'

  if (cleanName && hasImage) {
    return `${cleanName}, same exact ${noun} as the uploaded reference image, preserve identical facial identity, same person, same face`
  }

  if (hasImage) {
    return `same exact ${noun} as the uploaded reference image, preserve identical facial identity, same person, same face`
  }

  if (cleanName) {
    return `${cleanName}, fixed recurring ${noun} identity, preserve the same person and the same face across every image`
  }

  return `consistent ${noun} identity, preserve the same person and the same face across every image`
}