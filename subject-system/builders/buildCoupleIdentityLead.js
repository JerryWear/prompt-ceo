function getSubjectNoun(gender = 'female') {
  return String(gender || '').trim().toLowerCase() === 'male' ? 'man' : 'woman'
}

function hasSubjectImage(subject = {}) {
  return (
    !!String(subject?.imageDataUrl || '').trim() ||
    !!String(subject?.sourceFileName || '').trim()
  )
}

export function buildCoupleIdentityLead({
  subjectA = {},
  subjectB = {},
}) {
  const aName = String(subjectA?.identityName || '').trim()
  const bName = String(subjectB?.identityName || '').trim()

  const aGender =
  String(subjectA?.gender || '').trim().toLowerCase() === 'male'
    ? 'male'
    : 'female'

const bGender =
  String(subjectB?.gender || '').trim().toLowerCase() === 'female'
    ? 'female'
    : 'male'

  const aNoun = getSubjectNoun(aGender)
  const bNoun = getSubjectNoun(bGender)

  const aHasImage = hasSubjectImage(subjectA)
  const bHasImage = hasSubjectImage(subjectB)

  const aIdentity = (() => {
    if (aName && aHasImage) {
      return `${aName}, same exact ${aNoun} as the uploaded reference image, preserve identical facial identity, same person, same face`
    }

    if (aHasImage) {
      return `same exact ${aNoun} as the uploaded reference image, preserve identical facial identity, same person, same face`
    }

    if (aName) {
      return `${aName}, fixed recurring ${aNoun} identity, preserve the same person and the same face across every image`
    }

    return `consistent ${aNoun} identity, preserve the same person and the same face across every image`
  })()

  const bIdentity = (() => {
    if (bName && bHasImage) {
      return `${bName}, same exact ${bNoun} as the uploaded reference image, preserve identical facial identity, same person, same face`
    }

    if (bHasImage) {
      return `same exact ${bNoun} as the uploaded reference image, preserve identical facial identity, same person, same face`
    }

    if (bName) {
      return `${bName}, fixed recurring ${bNoun} identity, preserve the same person and the same face across every image`
    }

    return `consistent ${bNoun} identity, preserve the same person and the same face across every image`
  })()

  return [
    `subject A: ${aIdentity}`,
    `subject B: ${bIdentity}`,
    `consistent recurring couple identity, preserve the same two people across every image`,
  ]
    .map((part) => String(part || '').trim())
    .filter(Boolean)
    .join(', ')
}