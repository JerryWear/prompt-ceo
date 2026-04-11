import { resolveFemaleAction } from '../modes/female/resolveFemaleAction'
import { resolveMaleAction } from '../modes/male/resolveMaleAction'
import { resolveCoupleAction } from '../modes/couple/resolveCoupleAction'

export function resolveSubjectAction({
  characterMode,
  subjectState,
  interactionModel,
  worldSceneOutput,
}) {
  if (characterMode === 'male') {
    return resolveMaleAction({ subjectState, worldSceneOutput })
  }

  if (characterMode === 'couple') {
    return resolveCoupleAction({ subjectState, interactionModel, worldSceneOutput })
  }

  return resolveFemaleAction({ subjectState, worldSceneOutput })
}