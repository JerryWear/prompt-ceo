import { resolveFemaleMood } from '../modes/female/resolveFemaleMood'
import { resolveMaleMood } from '../modes/male/resolveMaleMood'
import { resolveCoupleMood } from '../modes/couple/resolveCoupleMood'

export function resolveSubjectMood({
  characterMode,
  subjectState,
  interactionModel,
  worldSceneOutput,
}) {
  if (characterMode === 'male') {
    return resolveMaleMood({ subjectState, worldSceneOutput })
  }

  if (characterMode === 'couple') {
    return resolveCoupleMood({ subjectState, interactionModel, worldSceneOutput })
  }

  return resolveFemaleMood({ subjectState, worldSceneOutput })
}