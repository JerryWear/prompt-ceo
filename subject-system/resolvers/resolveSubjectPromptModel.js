import { resolveCharacterMode } from './resolveCharacterMode'
import { resolveInteractionModel } from './resolveInteractionModel'
import { resolveSubjectIdentity } from './resolveSubjectIdentity'
import { resolveSubjectAction } from './resolveSubjectAction'
import { resolveSubjectMood } from './resolveSubjectMood'
import { resolveSubjectCamera } from './resolveSubjectCamera'
import { resolveSubjectStyling } from './resolveSubjectStyling'

export function resolveSubjectPromptModel({
  subjectState,
  interactionState,
  worldSceneOutput,
}) {
  const characterMode = resolveCharacterMode(subjectState)

  const interactionModel = resolveInteractionModel({
    characterMode,
    interactionState,
  })

  const baseIdentityLead = resolveSubjectIdentity({
    characterMode,
    subjectState,
  })

  const buildDirectCoupleIdentityLead = () => {
    const subjectA = subjectState?.subjectA || {}
    const subjectB = subjectState?.subjectB || {}

    const aName = String(subjectA?.identityName || '').trim()
    const bName = String(subjectB?.identityName || '').trim()

    const aGender =
      String(subjectA?.gender || 'female').trim().toLowerCase() === 'male'
        ? 'male'
        : 'female'

    const bGender =
      String(subjectB?.gender || 'male').trim().toLowerCase() === 'female'
        ? 'female'
        : 'male'

    const aNoun = aGender === 'male' ? 'man' : 'woman'
    const bNoun = bGender === 'male' ? 'man' : 'woman'

    const aHasImage =
      !!String(subjectA?.imageDataUrl || '').trim() ||
      !!String(subjectA?.sourceFileName || '').trim()

    const bHasImage =
      !!String(subjectB?.imageDataUrl || '').trim() ||
      !!String(subjectB?.sourceFileName || '').trim()

    const aIdentity = aHasImage
      ? `${aName ? `${aName}, ` : ''}same exact ${aNoun} as the uploaded reference image, preserve identical facial identity, same person, same face`
      : aName
        ? `${aName}, fixed recurring ${aNoun} identity, preserve the same person and the same face across every image`
        : `consistent ${aNoun} identity, preserve the same person and the same face across every image`

    const bIdentity = bHasImage
      ? `${bName ? `${bName}, ` : ''}same exact ${bNoun} as the uploaded reference image, preserve identical facial identity, same person, same face`
      : bName
        ? `${bName}, fixed recurring ${bNoun} identity, preserve the same person and the same face across every image`
        : `consistent ${bNoun} identity, preserve the same person and the same face across every image`

    return [
      `subject A: ${aIdentity}`,
      `subject B: ${bIdentity}`,
      `consistent recurring couple identity, preserve the same two people across every image`,
    ].join(', ')
  }

  const identityLead =
    characterMode === 'couple'
      ? buildDirectCoupleIdentityLead()
      : baseIdentityLead

  const action = resolveSubjectAction({
    characterMode,
    subjectState,
    interactionModel,
    worldSceneOutput,
  })

  const mood = resolveSubjectMood({
    characterMode,
    subjectState,
    interactionModel,
    worldSceneOutput,
  })

  const camera = resolveSubjectCamera({
    characterMode,
    subjectState,
    interactionModel,
    worldSceneOutput,
  })

  const subjectBlock = resolveSubjectStyling({
    characterMode,
    subjectState,
    interactionModel,
    worldSceneOutput,
  })

  return {
    characterMode,
    identityLead,
    subjectBlock,
    action,
    environment: String(worldSceneOutput?.environment || '').trim(),
    mood,
    camera,
    lighting: String(worldSceneOutput?.lighting || '').trim(),
    time: String(worldSceneOutput?.time || '').trim(),
    metadata: {
      worldId: String(worldSceneOutput?.worldId || '').trim(),
      sceneFamily: '',
      subjectCount: characterMode === 'couple' ? 2 : 1,
      relationshipType: interactionModel.relationshipType || '',
    },
  }
}