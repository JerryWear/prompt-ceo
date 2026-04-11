export function resolveInteractionModel({
  characterMode,
  interactionState = {},
}) {
  if (characterMode !== 'couple') {
    return {
      enabled: false,
      relationshipType: '',
      pairingType: '',
      proximity: '',
      leadDynamic: '',
      gazeMode: '',
      touchMode: '',
      bodyOrientation: '',
      emotionalTone: '',
      sceneIntensity: '',
    }
  }

  return {
    enabled: true,
    relationshipType: String(interactionState.relationshipType || 'romantic').trim(),
    pairingType: String(interactionState.pairingType || 'female_male').trim(),
    proximity: String(interactionState.proximity || 'near').trim(),
    leadDynamic: String(interactionState.leadDynamic || 'balanced').trim(),
    gazeMode: String(interactionState.gazeMode || 'shared').trim(),
    touchMode: String(interactionState.touchMode || 'light').trim(),
    bodyOrientation: String(interactionState.bodyOrientation || 'side_by_side').trim(),
    emotionalTone: String(interactionState.emotionalTone || '').trim(),
    sceneIntensity: String(interactionState.sceneIntensity || 'soft').trim(),
  }
}