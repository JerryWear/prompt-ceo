export function createEmptyInteractionState() {
  return {
    enabled: false,

    relationshipType: 'romantic',
    pairingType: 'female_male',
    proximity: 'near',
    leadDynamic: 'balanced',
    gazeMode: 'shared',
    touchMode: 'light',
    bodyOrientation: 'side_by_side',

    emotionalTone: '',
    sceneIntensity: 'soft',

    lastUpdated: 0,
  }
}