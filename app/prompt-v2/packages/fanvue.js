export const FANVUE_PACKAGE = {
  id: 'fanvue',
  name: 'Fanvue',
  description:
    'A cinematic escalation package designed for tease, tension, and payoff pacing with premium influencer realism.',

  structure: {
    arrival: {
      allowedLevels: ['tease'],
      tone: [
        'suggestive but restrained',
        'soft curiosity with quiet intention',
        'playful allure without full reveal',
      ],
    },

    social: {
      allowedLevels: ['tease', 'tension'],
      tone: [
        'confident public magnetism',
        'social power with controlled flirtation',
        'elevated presence with subtle invitation',
      ],
    },

    private: {
      allowedLevels: ['tension', 'payoff'],
      tone: [
        'slower intimacy with controlled body language',
        'private energy with rising tension',
        'deliberate sensual stillness',
      ],
    },

    night: {
      allowedLevels: ['tension', 'payoff'],
      tone: [
        'dark luxury with intimate control',
        'cinematic night tension',
        'high-status private payoff energy',
      ],
    },
  },

  tease: [
    'glancing back with soft intent',
    'subtle body turn that invites attention',
    'small revealing movement without full exposure',
    'playful pause mid-motion',
    'quiet eye contact with restrained energy',
  ],

  tension: [
    'holding the gaze longer than expected',
    'slow deliberate repositioning of the body',
    'controlled pose with stronger presence',
    'lingering movement that builds anticipation',
    'quiet confidence with visible intent',
  ],

  payoff: [
    'fully settled sensual confidence',
    'calm dominant stillness in the frame',
    'complete ownership of attention and mood',
    'final composed pose with magnetic control',
    'strong cinematic payoff through posture and gaze',
  ],

  captions: {
    tease: [
      'caught in a softer moment',
      'just enough to keep the mind going',
      'not everything needs to be given away',
    ],
    tension: [
      'the pause always says more',
      'closer now',
      'some moments are meant to build slowly',
    ],
    payoff: [
      'when the mood fully lands',
      'nothing rushed, everything intentional',
      'this is where the energy peaks',
    ],
  },
}