export function buildDeterministicSubjectPrompt({
  identityLead = '',
  subjectBlock = '',
  action = '',
  environment = '',
  mood = '',
  camera = '',
  lighting = '',
  time = '',
}) {
  const cleanPart = (value) => {
    let part = String(value || '').trim()
    if (!part) return ''

    part = part
      .replace(/\bbedroom or bathroom\b/gi, '')
      .replace(/\bapartment hallway or outdoor entrance\b/gi, '')
      .replace(/\s+,/g, ',')
      .replace(/,\s*,+/g, ', ')
      .replace(/\s+/g, ' ')
      .replace(/^,\s*|\s*,$/g, '')
      .trim()

    return part
  }

  const raw = [
    cleanPart(identityLead),
    cleanPart(subjectBlock),
    cleanPart(action),
    cleanPart(environment),
    cleanPart(mood),
    cleanPart(camera),
    cleanPart(lighting),
    cleanPart(time),
  ]
    .map((part) => String(part || '').trim())
    .filter(Boolean)
    .filter((part, index, arr) => arr.indexOf(part) === index)
    .join(', ')
    .replace(/\bbedroom or bathroom\b/gi, '')
    .replace(/\bapartment hallway or outdoor entrance\b/gi, '')
    .replace(/\s+,/g, ',')
    .replace(/,\s*,+/g, ', ')
    .replace(/\s+/g, ' ')
    .replace(/^,\s*|\s*,$/g, '')
    .trim()

  const hasCoupleIdentity =
    /subject a:/i.test(raw) || /subject b:/i.test(raw)

  if (!hasCoupleIdentity) {
    return raw
  }

  const subjectAIndex = raw.search(/subject a:/i)
  const stripped =
    subjectAIndex >= 0
      ? raw.slice(subjectAIndex).trim()
      : raw

  return stripped
    .replace(/\bbedroom or bathroom\b/gi, '')
    .replace(/\bapartment hallway or outdoor entrance\b/gi, '')
    .replace(/\s+,/g, ',')
    .replace(/,\s*,+/g, ', ')
    .replace(/\s+/g, ' ')
    .replace(/^,\s*|\s*,$/g, '')
    .trim()
}