import { resolveFemaleStyling } from '../modes/female/resolveFemaleStyling'
import { resolveMaleStyling } from '../modes/male/resolveMaleStyling'
import { resolveCoupleStyling } from '../modes/couple/resolveCoupleStyling'

export function resolveSubjectStyling({
  characterMode,
  subjectState,
  interactionModel,
  worldSceneOutput,
}) {
  if (characterMode === 'male') {
    return resolveMaleStyling({ subjectState, worldSceneOutput })
  }

  if (characterMode === 'couple') {
    return resolveCoupleStyling({ subjectState, interactionModel, worldSceneOutput })
  }

  return resolveFemaleStyling({ subjectState, worldSceneOutput })
}