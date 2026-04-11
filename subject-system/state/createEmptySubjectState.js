export function createEmptySubjectState() {
  return {
    characterMode: 'female',

    subjectA: {
      enabled: true,
      role: 'primary',
      gender: 'female',

      identityName: '',
      imageDataUrl: '',
      sourceFileName: '',

      extractionStatus: 'idle',
      extractionMode: 'server',
      useExtractedTraits: false,

      extractedTraits: {
        identity: '',
        age: '',
        ethnicity: '',
        body_shape: '',
        eye_color: '',
        hair: '',
        facial_hair: '',
        build: '',
      },

      stylingLocks: {
        faceLocked: false,
        bodyLocked: false,
        hairLocked: false,
      },

      lastUpdated: 0,
    },

    subjectB: {
      enabled: false,
      role: 'partner',
      gender: 'male',

      identityName: '',
      imageDataUrl: '',
      sourceFileName: '',

      extractionStatus: 'idle',
      extractionMode: 'server',
      useExtractedTraits: false,

      extractedTraits: {
        identity: '',
        age: '',
        ethnicity: '',
        body_shape: '',
        eye_color: '',
        hair: '',
        facial_hair: '',
        build: '',
      },

      stylingLocks: {
        faceLocked: false,
        bodyLocked: false,
        hairLocked: false,
      },

      lastUpdated: 0,
    },
  }
}