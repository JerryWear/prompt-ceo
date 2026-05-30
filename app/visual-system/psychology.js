// Visual Intelligence System™ — cinematographic constants

export const VISUAL_PACING = {
  fast_cut: {
    label: 'Fast Cut',
    desc:  'High energy, rapid transitions — attention and retargeting phases',
    shotNote: 'dynamic rapid cuts, handheld energy, motion blur, kinetic framing',
  },
  cinematic: {
    label: 'Cinematic',
    desc:  'Slow, deliberate, wide shots — luxury and aspirational styles',
    shotNote: 'slow deliberate camera movement, wide establishing shots, golden hour lighting, deep depth of field',
  },
  tension: {
    label: 'Tension',
    desc:  'Building suspense, tight frames — desire escalation and emotional styles',
    shotNote: 'tight close-ups, shallow depth of field, high contrast lighting, compressed framing',
  },
  story_driven: {
    label: 'Story Driven',
    desc:  'Linear narrative flow — authentic UGC and conversion phases',
    shotNote: 'natural documentary-style framing, neutral lighting, observational camera',
  },
}

export const THUMBNAIL_PSYCHOLOGY = {
  eye_contact: {
    label: 'Eye Contact',
    desc:  'Direct gaze creates instant connection and stops scroll',
    compositionNote: 'subject making direct eye contact with camera, centered or rule-of-thirds placement',
  },
  tension_framing: {
    label: 'Tension Framing',
    desc:  'Off-balance composition creates curiosity and intrigue',
    compositionNote: 'asymmetric composition, leading lines toward edge of frame, subject partially cropped',
  },
  contrast_led: {
    label: 'Contrast Led',
    desc:  'Strong contrast drives attention to the key element',
    compositionNote: 'bold light/dark contrast or color contrast, isolated subject against stark background',
  },
  object_emphasis: {
    label: 'Object Emphasis',
    desc:  'Product or key object dominates the frame',
    compositionNote: 'product or object as hero, close-up with clean background, highlight texture and detail',
  },
  emotional_face: {
    label: 'Emotional Face',
    desc:  'Visible genuine emotion drives empathy and engagement',
    compositionNote: 'face showing genuine emotion, tight framing on expression, natural lighting',
  },
}

export const STYLE_PACING_MAP = {
  luxury:                 'cinematic',
  cinematic:              'cinematic',
  dark_luxury:            'tension',
  emotional:              'tension',
  ugc:                    'story_driven',
  soft_feminine:          'story_driven',
  corporate_authority:    'story_driven',
  viral:                  'fast_cut',
  high_energy:            'fast_cut',
  fitness_motivation:     'fast_cut',
  aspirational_lifestyle: 'cinematic',
  high_status:            'cinematic',
}

export const STAGE_PACING_PREFERENCE = {
  attention:            ['fast_cut', 'tension'],
  emotional_connection: ['story_driven', 'tension'],
  desire_escalation:    ['tension', 'cinematic'],
  conversion:           ['story_driven', 'cinematic'],
  retargeting:          ['fast_cut', 'tension'],
}

export const STAGE_THUMBNAIL_MAP = {
  attention:            'eye_contact',
  emotional_connection: 'emotional_face',
  desire_escalation:    'tension_framing',
  conversion:           'contrast_led',
  retargeting:          'eye_contact',
}

export const SCENE_RHYTHM_ARCS = {
  fast_cut:     [
    'explosive opener, dynamic motion, handheld energy',
    'rapid kinetic cuts, high energy movement',
    'peak intensity, maximum kinetic energy',
    'sustained momentum, sharp decisive framing',
    'strong closing energy, definitive final frame',
  ],
  cinematic:    [
    'wide establishing shot, environmental context revealed',
    'medium shot, subject entering the scene',
    'intimate framing, emotional close proximity',
    'wide with scale and aspiration restored',
    'final wide establishing, full world revealed',
  ],
  tension:      [
    'extreme close-up, compressed maximum tension',
    'tight medium shot, pressure building',
    'peak tension, claustrophobic framing',
    'slight release, medium shot breathing room',
    'final reveal, broader context unveiled',
  ],
  story_driven: [
    'wide observational establishing shot',
    'medium documentary framing, subject candid',
    'close intimate moment, genuine emotion visible',
    'reaction or consequence shot, natural response',
    'wide resolution, full context restored',
  ],
}
