import { resolveFemaleCamera } from '../modes/female/resolveFemaleCamera'
import { resolveMaleCamera } from '../modes/male/resolveMaleCamera'
import { resolveCoupleCamera } from '../modes/couple/resolveCoupleCamera'

export function resolveSubjectCamera({
  characterMode,
  subjectState,
  interactionModel,
  worldSceneOutput,
}) {
  if (characterMode === 'male') {
    return resolveMaleCamera({ subjectState, worldSceneOutput })
  }

  if (characterMode === 'couple') {
    return resolveCoupleCamera({ subjectState, interactionModel, worldSceneOutput })
  }

  return resolveFemaleCamera({ subjectState, worldSceneOutput })
}