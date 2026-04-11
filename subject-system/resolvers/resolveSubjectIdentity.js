import { buildSingleIdentityLead } from '../builders/buildSingleIdentityLead'
import { buildCoupleIdentityLead } from '../builders/buildCoupleIdentityLead'

export function resolveSubjectIdentity({
  characterMode,
  subjectState,
}) {
  if (characterMode === 'couple') {
    return buildCoupleIdentityLead({
      subjectA: subjectState?.subjectA || {},
      subjectB: subjectState?.subjectB || {},
    })
  }

  const subjectA = subjectState?.subjectA || {}

  const resolvedGender =
    String(subjectA?.gender || '').trim().toLowerCase() === 'male' ||
    String(characterMode || '').trim().toLowerCase() === 'male'
      ? 'male'
      : 'female'

  console.log('IDENTITY DEBUG → characterMode:', characterMode)
  console.log('IDENTITY DEBUG → subjectA.gender:', subjectA?.gender)
  console.log('IDENTITY DEBUG → resolvedGender:', resolvedGender)
  console.log('IDENTITY DEBUG → subjectA.identityName:', subjectA?.identityName)
  console.log('IDENTITY DEBUG → subjectA.imageDataUrl exists:', !!subjectA?.imageDataUrl)
  console.log('IDENTITY DEBUG → subjectA.sourceFileName:', subjectA?.sourceFileName)
  console.log('COUPLE DEBUG → subjectA:', subjectState?.subjectA)
  console.log('COUPLE DEBUG → subjectB:', subjectState?.subjectB)

  return buildSingleIdentityLead({
    gender: resolvedGender,
    subject: subjectA,
  })
}