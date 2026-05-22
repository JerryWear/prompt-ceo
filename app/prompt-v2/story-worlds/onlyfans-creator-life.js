export const STORY_WORLD_ONLYFANS_CREATOR_LIFE = {
  id: 'onlyfans_creator',
  name: 'OnlyFans Creator Life',

  description:
    'A cinematic world of creator intimacy, controlled desire, private luxury, and emotionally addictive digital presence — soft morning uploads from bed, mirror light in quiet apartments, late-night editing sessions after content shoots, exclusive private moments behind locked doors, and the psychological tension between public fantasy and the real woman living inside it. The real currency is not nudity. The real currency is access.',

  geography: {
    country:
      'Los Angeles, Miami, Dubai, London, Paris, modern luxury creator environments',

    region:
      'luxury apartment, private creator studio, penthouse bedroom, mirror bathroom, rooftop pool, editing desk, hotel suite, nightlife transition spaces',
  },

  identity: {
    archetype:
      'modern digital muse — emotionally addictive, visually controlled, impossible to fully access',

    vibe: [
      'the private woman behind the subscription wall',
      'the psychology of controlled access',
      'luxury intimacy built through distance',
      'the soft tension between performance and authenticity',
      'private moments transformed into addictive mythology',
    ],

    tone: [
      'intimate',
      'cinematic',
      'private',
      'emotionally magnetic',
      'controlled',
      'luxury-soft',
      'seductive',
    ],

    persona: [
      'the woman who understands attention as currency',
      'beautiful in the rare moments where the performance drops slightly',
      'emotionally addictive because she never gives complete access',
      'the creator whose private life feels more valuable than the actual content',
    ],
  },

  phaseOrder: [
    'wake',
    'morning_refresh',
    'getting_dressed',
    'content_planning',
    'late_morning',
    'shoot_session',
    'afternoon',
    'editing_reset',
    'golden_hour',
    'nightlife',
    'evening',
    'night',
  ],

  phases: {
    wake: {
      label: 'Wake',
      timeWindows: [
        'soft creator morning before the phone becomes active',
        'the private woman before the internet enters the room',
      ],
      pacing: 'slow',
      subLocations: ['bedroom-suite', 'hotel-bedroom'],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: [
        'mirror light and warm water before content begins',
        'quiet luxury bathroom ritual',
      ],
      pacing: 'slow',
      subLocations: ['marble-bathroom', 'mirror-vanity'],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: [
        'choosing the identity for the day',
        'the transition from private woman into creator presence',
      ],
      pacing: 'slow',
      subLocations: ['walk-in-closet', 'mirror-room'],
    },

    content_planning: {
      label: 'Content Planning',
      timeWindows: [
        'the psychology behind attraction and exclusivity',
        'private creator workflow before filming',
      ],
      pacing: 'slow',
      subLocations: ['editing-desk', 'creator-office'],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: [
        'soft natural light content windows',
        'private apartment intimacy before the day becomes louder',
      ],
      pacing: 'medium',
      subLocations: ['window-light-bedroom', 'balcony-suite'],
    },

    shoot_session: {
      label: 'Shoot Session',
      timeWindows: [
        'controlled intimacy inside cinematic lighting',
        'the creator becoming the fantasy fully',
      ],
      pacing: 'medium',
      subLocations: ['creator-studio', 'soft-light-set'],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: [
        'post-shoot softness and private decompression',
        'luxury creator life between uploads and attention',
      ],
      pacing: 'slow',
      subLocations: ['rooftop-pool', 'penthouse-lounge'],
    },

    editing_reset: {
      label: 'Editing Reset',
      timeWindows: [
        'private editing after the performance',
        'the real woman behind the uploaded version',
      ],
      pacing: 'slow',
      subLocations: ['editing-desk', 'low-light-office'],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: [
        'sunset creator mythology',
        'the most cinematic light for intimacy and exclusivity',
      ],
      pacing: 'slow',
      subLocations: ['balcony-suite', 'rooftop-sunset'],
    },

    nightlife: {
      label: 'Nightlife',
      timeWindows: [
        'private luxury nightlife and creator attention',
        'the woman everyone watches but nobody fully knows',
      ],
      pacing: 'medium',
      subLocations: ['private-lounge', 'city-night-drive'],
    },

    evening: {
      label: 'Evening',
      timeWindows: [
        'the quiet after digital performance',
        'soft intimacy after the world stops watching',
      ],
      pacing: 'slow',
      subLocations: ['hotel-bedroom', 'candle-bath'],
    },

    night: {
      label: 'Night',
      timeWindows: [
        'late-night scrolling, messaging, editing, and emotional distance',
        'the final private hours after the creator disappears offline',
      ],
      pacing: 'slow',
      subLocations: ['bedroom-suite', 'night-window'],
    },
  },

  locations: [
    'soft luxury bedroom before upload hours',
    'mirror bathroom in warm marble light',
    'private editing desk with city lights outside',
    'window-lit apartment intimacy',
    'creator studio with controlled soft lighting',
    'rooftop sunset overlooking the city',
    'late-night hotel suite after content creation',
    'private luxury nightlife transition spaces',
  ],

  subLocations: {
    'bedroom-suite': {
      id: 'bedroom-suite',
      name: 'Bedroom Suite',
      mapAnchor: 'luxury creator bedroom',
      category: 'private-intimacy',
      bestPhases: ['wake', 'night'],
      overlays: [
        'the private woman before the audience arrives',
        'soft sheets, natural light, and emotional access',
        'the room where intimacy becomes digital mythology',
      ],
      locations: [
        'luxury bedroom before morning uploads',
        'soft private suite in natural morning light',
        'late-night creator bedroom after the world logs off',
      ],
    },

    'marble-bathroom': {
      id: 'marble-bathroom',
      name: 'Marble Bathroom',
      mapAnchor: 'warm luxury bathroom',
      category: 'mirror-intimacy',
      bestPhases: ['morning_refresh'],
      overlays: [
        'mirror light and warm water before performance',
        'the most private version of the creator identity',
        'quiet luxury and feminine ritual',
      ],
      locations: [
        'warm marble bathroom beneath soft mirror lighting',
        'luxury bathroom ritual before content creation',
        'private mirror space in cinematic warmth',
      ],
    },

    'walk-in-closet': {
      id: 'walk-in-closet',
      name: 'Walk-In Closet',
      mapAnchor: 'luxury creator wardrobe room',
      category: 'identity-transition',
      bestPhases: ['getting_dressed'],
      overlays: [
        'choosing the version of herself the internet receives',
        'fashion as controlled emotional strategy',
        'the transition between private and public intimacy',
      ],
      locations: [
        'luxury wardrobe room before filming',
        'mirror-lined dressing space in soft daylight',
        'designer clothing and creator identity preparation',
      ],
    },

    'editing-desk': {
      id: 'editing-desk',
      name: 'Editing Desk',
      mapAnchor: 'private creator editing setup',
      category: 'behind-the-scenes',
      bestPhases: ['content_planning', 'editing_reset'],
      overlays: [
        'the real creator after the performance ends',
        'private editing and emotional detachment',
        'the psychology behind addictive digital intimacy',
      ],
      locations: [
        'low-light editing desk beside city windows',
        'creator workspace after filming',
        'private office glow beneath laptop light',
      ],
    },

    'window-light-bedroom': {
      id: 'window-light-bedroom',
      name: 'Window Light Bedroom',
      mapAnchor: 'natural-light luxury bedroom',
      category: 'soft-intimacy',
      bestPhases: ['late_morning'],
      overlays: [
        'natural light as the softest creator aesthetic',
        'quiet intimacy before nightlife and attention',
        'the illusion of emotional closeness',
      ],
      locations: [
        'window-lit bedroom in soft late-morning light',
        'natural daylight across luxury bedding',
        'quiet apartment intimacy before the city wakes fully',
      ],
    },

    'creator-studio': {
      id: 'creator-studio',
      name: 'Creator Studio',
      mapAnchor: 'private luxury filming studio',
      category: 'performance-space',
      bestPhases: ['shoot_session'],
      overlays: [
        'the fantasy becoming fully controlled',
        'lighting and camera shaping emotional addiction',
        'the creator as the center of attention economics',
      ],
      locations: [
        'soft-light creator studio setup',
        'private filming environment with cinematic lighting',
        'controlled content environment built around intimacy',
      ],
    },

    'rooftop-pool': {
      id: 'rooftop-pool',
      name: 'Rooftop Pool',
      mapAnchor: 'luxury rooftop pool',
      category: 'luxury-decompression',
      bestPhases: ['afternoon'],
      overlays: [
        'the soft luxury after digital performance',
        'sunlight, water, and emotional distance',
        'the creator life between uploads',
      ],
      locations: [
        'rooftop pool above the city skyline',
        'luxury afternoon sunlight beside water',
        'private rooftop softness after filming',
      ],
    },

    'rooftop-sunset': {
      id: 'rooftop-sunset',
      name: 'Rooftop Sunset',
      mapAnchor: 'golden hour rooftop',
      category: 'sunset-mythology',
      bestPhases: ['golden_hour'],
      overlays: [
        'the city turning cinematic beneath sunset light',
        'the creator at maximum visual mythology',
        'golden-hour intimacy and impossible access',
      ],
      locations: [
        'rooftop skyline during golden hour',
        'sunset over the city in warm cinematic light',
        'private rooftop overlooking evening architecture',
      ],
    },

    'private-lounge': {
      id: 'private-lounge',
      name: 'Private Lounge',
      mapAnchor: 'luxury nightlife lounge',
      category: 'nightlife-intimacy',
      bestPhases: ['nightlife'],
      overlays: [
        'everyone watching her without truly knowing her',
        'luxury nightlife as emotional theatre',
        'the creator existing between public desire and private distance',
      ],
      locations: [
        'private lounge beneath low warm lighting',
        'luxury nightlife environment with controlled intimacy',
        'exclusive evening environment in cinematic darkness',
      ],
    },

    'night-window': {
      id: 'night-window',
      name: 'Night Window',
      mapAnchor: 'late-night city apartment window',
      category: 'private-night',
      bestPhases: ['night'],
      overlays: [
        'the final quiet after digital performance',
        'city lights replacing human connection',
        'the creator alone after everyone logs off',
      ],
      locations: [
        'late-night apartment window above the city',
        'quiet luxury bedroom beneath city lights',
        'private night after the creator disappears offline',
      ],
    },
  },

    actionPools: {
    wake: ['waking before the phone becomes active', 'the private creator morning before the audience enters', 'soft morning stillness before the day becomes content'],
    morning_refresh: ['standing at the mirror before creator mode begins', 'warm bathroom ritual before filming', 'preparing the face and body before attention starts'],
    getting_dressed: ['choosing the version of herself the audience receives', 'building the day’s creator identity in the mirror', 'turning wardrobe into controlled access'],
    content_planning: ['planning the emotional rhythm of the day’s content', 'mapping tease, intimacy, and exclusivity before filming', 'turning private life into controlled digital desire'],
    late_morning: ['creating soft natural-light intimacy', 'using window light to make closeness feel real', 'building the illusion of private access'],
    shoot_session: ['filming controlled intimacy under soft cinematic light', 'becoming the fantasy without giving full access', 'turning camera presence into emotional addiction'],
    afternoon: ['decompressing after filming in luxury softness', 'moving through creator life between uploads', 'holding distance after giving just enough access'],
    editing_reset: ['editing the fantasy after the performance ends', 'choosing what the audience gets to see', 'turning private moments into controlled release'],
    golden_hour: ['using sunset light as the day’s most magnetic intimacy', 'turning the city into creator mythology', 'becoming visually unreachable in warm light'],
    nightlife: ['moving through luxury nightlife while everyone watches', 'being visible without becoming available', 'turning public attention into private power'],
    evening: ['softening after the digital performance', 'returning to private warmth after being watched', 'letting the fantasy quiet down'],
    night: ['editing, messaging, and disappearing offline', 'being alone after everyone wanted access', 'ending the day in private digital distance'],
  },

  environmentPools: {
    wake: ['soft luxury bedroom before the phone becomes active', 'quiet creator suite in morning light', 'private bedding and natural light before uploads'],
    morning_refresh: ['warm marble bathroom with mirror glow', 'private vanity space before filming', 'clean luxury bathroom in soft morning light'],
    getting_dressed: ['mirror-lined closet with lingerie, robes, and creator outfits', 'luxury wardrobe room before content mode', 'private dressing space where identity is selected'],
    content_planning: ['editing desk with phone, laptop, planner, and city light', 'private creator office before filming', 'quiet workflow corner where intimacy becomes strategy'],
    late_morning: ['window-lit bedroom with soft sheets and natural intimacy', 'balcony suite in clean daylight', 'private apartment light before the city becomes loud'],
    shoot_session: ['soft-light creator studio with controlled camera setup', 'private filming room built around intimacy', 'bedroom set shaped by camera, light, and access'],
    afternoon: ['rooftop pool after filming', 'penthouse lounge between uploads', 'sunlit apartment after content performance'],
    editing_reset: ['low-light editing desk after filming', 'laptop glow in private creator office', 'quiet room where the real woman edits the fantasy'],
    golden_hour: ['rooftop sunset above the city', 'balcony suite in golden light', 'warm skyline turning creator life mythological'],
    nightlife: ['private lounge under low warm light', 'luxury night drive through city glow', 'exclusive evening space built around being watched'],
    evening: ['hotel bedroom after the attention fades', 'candle bath in warm private light', 'soft suite after the digital performance ends'],
    night: ['bedroom window above city lights', 'late-night laptop glow beside soft bedding', 'private room after the creator disappears offline'],
  },

  moodPools: {
    wake: ['private softness before digital attention', 'the real woman before the creator appears', 'morning intimacy without performance'],
    morning_refresh: ['quiet preparation before desire becomes structured', 'soft feminine ritual before the camera', 'private calm before controlled seduction'],
    getting_dressed: ['identity selection as power', 'wardrobe as emotional strategy', 'the creator choosing how much access to give'],
    content_planning: ['seduction planned like business', 'intimacy shaped before it is released', 'emotional access controlled with precision'],
    late_morning: ['natural-light closeness that feels almost real', 'soft intimacy without full availability', 'the illusion of being invited inside'],
    shoot_session: ['controlled desire at full focus', 'fantasy built without surrendering full access', 'the camera as the subscriber’s imagined closeness'],
    afternoon: ['luxury decompression after performance', 'distance returning after intimacy', 'soft life between content and attention'],
    editing_reset: ['the real work behind the fantasy', 'control after exposure', 'private detachment after being watched'],
    golden_hour: ['maximum visual magnetism without full access', 'sunset as creator mythology', 'warm unreachable intimacy'],
    nightlife: ['being watched without being owned', 'public visibility with private distance', 'attention converted into status'],
    evening: ['soft post-performance quiet', 'private warmth after digital seduction', 'the creator becoming human again'],
    night: ['lonely digital intimacy', 'the quiet after everyone wanted access', 'private distance after the fantasy ends'],
  },

  cameraPools: {
    wake: ['85mm low-angle bedroom framing, soft sheets and morning light dissolved behind', '135mm intimate close-up at pillow height, natural light defining face edge'],
    morning_refresh: ['85mm mirror vanity close, reflection and face at equal focal depth', '50mm warm bathroom mid-shot with marble and mirror glow behind'],
    getting_dressed: ['85mm full-length mirror portrait, wardrobe depth compressed behind', '50mm dressing-room frame with outfit choices visible'],
    content_planning: ['50mm desk-level creator workflow shot, phone and laptop foreground', '85mm soft office portrait with screen glow and city blur'],
    late_morning: ['85mm window-light bedroom portrait, soft bedding and daylight behind', '50mm balcony suite shot with natural city depth'],
    shoot_session: ['85mm soft-light creator set portrait, camera-facing intimacy with background falloff', '50mm controlled studio wide with lights, bed, and creator setup'],
    afternoon: ['85mm rooftop pool portrait, water and skyline compressed behind', '50mm penthouse lounge frame with post-shoot softness'],
    editing_reset: ['135mm laptop-glow close-up, screen light as soft key', '85mm side-angle editing desk shot with city lights behind'],
    golden_hour: ['135mm rooftop sunset close, amber skyline dissolved behind', '85mm balcony golden-hour medium shot with warm rim light'],
    nightlife: ['85mm low-light lounge portrait with warm bokeh behind', '50mm night-drive cinematic frame with city glow and glass reflections'],
    evening: ['85mm candlelit bedroom portrait, soft amber falloff behind', '50mm bath-side warm frame with steam and mirror light'],
    night: ['135mm late-night close-up with laptop glow and city lights behind', '85mm night-window side angle with dark bedroom depth'],
  },

  lightingPools: {
    wake: ['soft 4800K morning light through bedroom curtains', 'warm natural creator-bedroom light before phone glow'],
    morning_refresh: ['clean 5200K mirror light softened by marble warmth', 'warm bathroom vanity glow with soft reflection'],
    getting_dressed: ['clean 5000K wardrobe light across fabric and skin', 'soft mirror-room daylight with luxury warmth'],
    content_planning: ['cool laptop light mixed with warm apartment ambient', 'soft desk light and phone glow before filming'],
    late_morning: ['natural 5200K window light across sheets and skin', 'soft daylight with gentle apartment shadows'],
    shoot_session: ['controlled 4300K softbox light built for flattering intimacy', 'warm cinematic key light with low shadow contrast'],
    afternoon: ['bright rooftop daylight reflecting from pool water', 'soft penthouse daylight after filming'],
    editing_reset: ['laptop-blue glow mixed with warm low ambient', 'dim creator-office light after performance'],
    golden_hour: ['rich amber sunset wrapping skin and city glass', 'warm 3000K skyline glow with soft rim light'],
    nightlife: ['low 2600K lounge practicals and city reflections', 'warm nightlife light with dark luxury falloff'],
    evening: ['single 2200K candle or bedside lamp warmth', 'soft amber bath light with steam diffusion'],
    night: ['cool laptop glow against warm bedroom darkness', 'city-light blue and low amber bedside light'],
  },

  sensoryPools: {
    wake: ['warm sheets, quiet phone screen, soft air before messages begin', 'the room before the audience exists', 'private morning softness with digital tension waiting nearby'],
    morning_refresh: ['warm water, mirror steam, skincare texture, quiet preparation', 'marble, robe, perfume, and clean skin before filming'],
    getting_dressed: ['fabric, straps, mirrors, perfume, and the choice of access', 'wardrobe as the first layer of controlled desire'],
    content_planning: ['phone buzz, laptop glow, notes, saved drafts, subscriber psychology', 'the quiet business of intimacy before the camera turns on'],
    late_morning: ['soft sheets, daylight, skin warmth, curtains moving slightly', 'natural light making the room feel privately accessible'],
    shoot_session: ['softbox warmth, camera lens, breath control, fabric movement', 'the controlled silence of filming intimacy alone'],
    afternoon: ['pool water, sun-warmed skin, post-shoot quiet, city heat', 'luxury softness after digital performance'],
    editing_reset: ['keyboard taps, screen glow, selected clips, emotional detachment', 'the real creator cutting the fantasy into release'],
    golden_hour: ['warm air, skyline haze, sun on skin, glass reflections', 'the city turning desire into mythology'],
    nightlife: ['low music, perfume, leather seats, warm lounge air, eyes watching', 'public attention held at distance'],
    evening: ['candle warmth, bath steam, quiet sheets, softened makeup', 'the fantasy dissolving back into private body heat'],
    night: ['late messages, laptop glow, city silence, unread desire', 'the creator alone after everyone wanted access'],
  },

  socialEnergyPools: {
    wake: ['completely private before the audience arrives', 'alone before the creator identity activates'],
    morning_refresh: ['private mirror ritual with no audience yet', 'alone before desire becomes visible'],
    getting_dressed: ['private identity selection before public release', 'alone with the mirror and the day’s persona'],
    content_planning: ['private business mind behind public intimacy', 'alone with strategy, phone, and emotional control'],
    late_morning: ['private-feeling intimacy designed to feel shared', 'one-to-one illusion without real access'],
    shoot_session: ['solo performance for imagined subscribers', 'intimacy directed toward an absent audience'],
    afternoon: ['low social visibility after filming', 'luxury distance between creator and audience'],
    editing_reset: ['completely private behind-the-scenes control', 'alone after performance while choosing what becomes visible'],
    golden_hour: ['visible but unreachable', 'the audience imagined, not present'],
    nightlife: ['public attention without availability', 'watched by many, known by none'],
    evening: ['private post-performance softness', 'the social mask slowly coming off'],
    night: ['alone with messages and digital desire', 'private after everyone logs off'],
  },

  atmospherePools: {
    wake: ['soft creator morning before performance', 'private luxury bedroom before digital attention', 'the quiet before the subscription world wakes up'],
    morning_refresh: ['mirror-light preparation atmosphere', 'warm marble bathroom ritual before creator mode', 'private feminine calm before content'],
    getting_dressed: ['wardrobe-as-identity atmosphere', 'private mirror transition into controlled access', 'the room where the creator is assembled'],
    content_planning: ['behind-the-scenes creator business atmosphere', 'intimacy strategy before filming', 'quiet digital seduction planning'],
    late_morning: ['natural-light intimacy atmosphere', 'soft bedroom closeness designed to feel personal', 'window-light creator softness'],
    shoot_session: ['controlled filming atmosphere', 'soft seduction environment with camera awareness', 'intimacy turned into production'],
    afternoon: ['post-shoot luxury decompression', 'sunlit distance after performance', 'the creator life between uploads'],
    editing_reset: ['private editing atmosphere after exposure', 'screen glow and emotional control', 'the real room behind the fantasy'],
    golden_hour: ['sunset creator mythology', 'warm skyline intimacy without access', 'the most magnetic light of the day'],
    nightlife: ['luxury attention atmosphere', 'dark lounge visibility with emotional distance', 'public desire under warm low light'],
    evening: ['soft post-performance intimacy', 'the quiet after digital attention', 'private warmth as the fantasy fades'],
    night: ['late-night creator isolation', 'messages, city lights, and private distance', 'the final quiet after the audience disappears'],
  },

  propPools: {
    wake: ['phone face-down beside soft sheets', 'white bedding, water glass, quiet notification glow'],
    morning_refresh: ['mirror, robe, skincare, perfume, marble counter'],
    getting_dressed: ['lingerie drawer, silk robe, heels, mirror, jewelry'],
    content_planning: ['phone, laptop, planner, ring light off to the side, saved drafts'],
    late_morning: ['curtains, sheets, phone tripod, coffee, soft pillows'],
    shoot_session: ['camera, tripod, softbox, bedding, robe, chair, mirror'],
    afternoon: ['pool towel, sunglasses, water glass, phone, sun oil'],
    editing_reset: ['laptop, phone, hard drive, notes, selected thumbnails'],
    golden_hour: ['balcony glass, champagne flute, phone, sunset reflection'],
    nightlife: ['car window, small clutch, perfume, lounge glass, city lights'],
    evening: ['candle, bath towel, robe, soft sheets, warm lamp'],
    night: ['laptop, phone, unread messages, city window, bedside lamp'],
  },

  bodyLanguagePools: {
    wake: ['soft private morning body language before performance', 'relaxed posture before the creator identity activates', 'half-awake stillness with quiet control'],
    morning_refresh: ['slow mirror-focused movement', 'calm self-care posture before filming', 'private preparation with controlled softness'],
    getting_dressed: ['deliberate mirror posture while choosing identity', 'slow wardrobe adjustment with awareness of future audience', 'controlled body language before content'],
    content_planning: ['leaning into the desk with focused creator control', 'quiet strategic posture over phone and laptop', 'businesslike calm behind intimate branding'],
    late_morning: ['soft window-light posture designed to feel natural', 'relaxed bedroom movement with controlled intimacy', 'stillness that feels private but intentional'],
    shoot_session: ['camera-aware movement without full surrender', 'slow controlled posing built around access and denial', 'performance softness with emotional distance'],
    afternoon: ['post-shoot relaxed luxury body language', 'sunlit decompression after being watched', 'distance returning into posture'],
    editing_reset: ['focused editing posture after performance', 'private stillness in screen glow', 'control returning through the body'],
    golden_hour: ['slow balcony stillness in warm light', 'unreachable sunset posture', 'soft confidence with emotional distance'],
    nightlife: ['public composure under attention', 'watched-but-unavailable body language', 'luxury nightlife movement with control'],
    evening: ['softened posture after the day’s performance', 'private warmth returning to the body', 'intimacy without audience'],
    night: ['quiet late-night stillness', 'alone-with-the-screen body language', 'private exhaustion after digital attention'],
  },

  facialExpressionPools: {
    wake: ['soft private morning expression before messages', 'natural face before creator mode', 'quiet intimacy without performance'],
    morning_refresh: ['focused mirror expression before filming', 'fresh private face in warm bathroom light', 'calm beauty ritual expression'],
    getting_dressed: ['mirror-assessing expression while choosing persona', 'controlled confidence before audience access', 'soft but strategic face'],
    content_planning: ['focused creator-business expression', 'quietly calculating emotional impact', 'calm control behind intimate content'],
    late_morning: ['soft natural-light eye contact', 'almost-private expression designed to feel personal', 'gentle closeness with controlled distance'],
    shoot_session: ['camera-aware seductive expression without full surrender', 'controlled intimacy through the eyes', 'fantasy-facing expression with emotional guard'],
    afternoon: ['relaxed post-shoot glow', 'soft distance after performance', 'luxury calm with private detachment'],
    editing_reset: ['neutral focused face in laptop glow', 'real expression after the fantasy is recorded', 'quiet control while selecting what becomes visible'],
    golden_hour: ['warm unreachable sunset expression', 'soft eye contact with golden distance', 'creator mythology face in amber light'],
    nightlife: ['watched-but-untouchable expression', 'public confidence with private distance', 'soft smile that gives nothing away'],
    evening: ['post-performance softness', 'private quiet after being watched', 'warm expression as the creator identity fades'],
    night: ['late-night private expression', 'alone after digital desire', 'soft tired face in screen glow'],
  },

  handDetailPools: {
    wake: ['fingers near phone on soft sheets', 'hand pulling sheet in morning light', 'hand turning off notification glow'],
    morning_refresh: ['hand on marble counter', 'fingers applying skincare', 'hand touching robe near mirror light'],
    getting_dressed: ['fingers adjusting silk robe', 'hand choosing lingerie or outfit', 'hand touching jewelry before filming'],
    content_planning: ['finger scrolling saved content drafts', 'hand writing content notes', 'hand holding phone above laptop glow'],
    late_morning: ['hand holding curtain near window light', 'fingers resting on white sheets', 'hand around morning coffee beside phone'],
    shoot_session: ['hand adjusting camera angle', 'fingers near robe tie', 'hand touching mirror edge during filming'],
    afternoon: ['hand holding sunglasses by pool', 'fingers trailing through water', 'hand lifting phone after upload'],
    editing_reset: ['hand on laptop trackpad', 'fingers selecting thumbnails', 'hand holding phone with unread messages'],
    golden_hour: ['hand on balcony glass', 'fingers around champagne flute', 'hand catching sunset light'],
    nightlife: ['hand on car window', 'fingers around lounge glass', 'hand adjusting small clutch'],
    evening: ['hand near candlelight', 'fingers touching bath water', 'hand pulling robe close'],
    night: ['hand on phone in dark room', 'fingers near laptop keyboard', 'hand resting beside city-lit window'],
  },

  movementEnergyPools: {
    wake: ['slow', 'private', 'pre-audience'],
    morning_refresh: ['ritual', 'soft', 'controlled'],
    getting_dressed: ['deliberate', 'identity-building', 'mirror-led'],
    content_planning: ['strategic', 'quiet', 'controlled'],
    late_morning: ['soft', 'natural-light', 'intimate'],
    shoot_session: ['controlled', 'camera-aware', 'seductive'],
    afternoon: ['decompressing', 'luxury-soft', 'distant'],
    editing_reset: ['focused', 'private', 'post-performance'],
    golden_hour: ['magnetic', 'slow', 'unreachable'],
    nightlife: ['visible', 'watched', 'controlled'],
    evening: ['softening', 'warm', 'post-digital'],
    night: ['late', 'private', 'isolated'],
  },

  transitionPools: {
    human: {
      wake: ['the private woman before the audience arrives', 'waking before the creator identity activates'],
      morning_refresh: ['mirror ritual before desire becomes content', 'the body preparing for controlled intimacy'],
      getting_dressed: ['choosing how much of herself the audience receives', 'wardrobe becoming emotional access control'],
      content_planning: ['strategy before seduction', 'the business mind behind private fantasy'],
      late_morning: ['natural light turning private life into illusion', 'the soft room becoming emotional access'],
      shoot_session: ['performance becoming intimacy', 'the fantasy being created under controlled light'],
      afternoon: ['distance returning after exposure', 'luxury decompression after filming'],
      editing_reset: ['the real woman cutting the fantasy into release', 'control returning after performance'],
      golden_hour: ['sunset turning creator life into mythology', 'beauty becoming unreachable in warm light'],
      nightlife: ['public visibility without availability', 'being watched without being known'],
      evening: ['the fantasy softening back into private life', 'the creator identity quieting down'],
      night: ['the final distance after digital intimacy', 'alone after everyone wanted access'],
    },
  },

  narrativeIntentPools: {
    wake: ['the private beginning before attention becomes the day’s economy', 'the creator before the audience, before the feed, before the fantasy'],
    morning_refresh: ['the self-care ritual as the hidden foundation of controlled desire', 'the mirror moment before intimacy becomes digital product'],
    getting_dressed: ['the transformation from private woman into controlled access', 'wardrobe as the first decision in the emotional economy of the day'],
    content_planning: ['the business of desire before anything is filmed', 'intimacy shaped strategically before it feels spontaneous'],
    late_morning: ['natural light used to make distance feel like closeness', 'the room becoming a believable private invitation'],
    shoot_session: ['the core performance — giving enough to create addiction without giving everything', 'the creator fully controlling fantasy, softness, and access'],
    afternoon: ['the post-performance distance that makes the next release more valuable', 'luxury quiet after the body has been turned into attention'],
    editing_reset: ['the real work behind the fantasy — selecting, cutting, withholding, releasing', 'control after exposure as the creator becomes editor of desire'],
    golden_hour: ['the most valuable light of the day — intimacy turned into mythology', 'sunset as emotional scarcity and visual power'],
    nightlife: ['public attention turned into private status', 'being seen by everyone while remaining emotionally unavailable'],
    evening: ['the soft return from digital performance into private warmth', 'the human underneath the creator identity reappearing'],
    night: ['the final truth of the creator world — everyone wants access, but she is alone with the screen', 'late-night distance after a full day of controlled intimacy'],
  },

  fallbackRules: {
    pacingProfile: { wake: 'slow', morning_refresh: 'slow', getting_dressed: 'slow', content_planning: 'slow', late_morning: 'medium', shoot_session: 'medium', afternoon: 'slow', editing_reset: 'slow', golden_hour: 'slow', nightlife: 'medium', evening: 'slow', night: 'slow' },
    repetitionBreakers: { avoidBackToBackSameLocation: true, avoidBackToBackSameLightingStyle: true, encourageWardrobeEvolution: true },
    worldDefaults: { allowSceneGroupFallbackToPhasePools: true, allowSubLocationFallbackToWorldPools: true, preferSceneGroupsWhenPresent: true },
  },

  exclusions: {
    premium: ['cheap webcam aesthetic', 'messy amateur room', 'explicit vulgar framing', 'low-effort influencer posing', 'public gym or office setting'],
    hard: ['teen-coded styling', 'school environments', 'medical or coercive scenarios', 'public nudity scenarios', 'violent or degrading content'],
  },

  routeRules: {
    worldIdentity: ['the OnlyFans Creator Life world must feel like controlled intimacy, private luxury, emotional access, and digital desire — never cheap explicit content', 'the real visual language is not nudity; it is access, distance, softness, and control'],
    humanFlow: ['the day moves from private woman to creator identity, into filming, editing, release, public attention, and late-night digital isolation', 'the audience is always psychologically present even when she is physically alone'],
    styling: ['wardrobe evolves from soft private morning to mirror-selected creator identity, controlled filming look, post-shoot luxury softness, nightlife visibility, and late-night private warmth'],
    atmosphere: ['soft bedroom light, marble mirror ritual, creator desk glow, controlled studio intimacy, rooftop sunset, warm nightlife, candle evening, and late-night screen isolation define the world'],
  },

  moodSignature:
    'controlled intimacy — the addictive emotional tension between access and distance, fantasy and the real woman behind it',

  visualSignature:
    'soft natural window light, mirror reflections, warm marble textures, cinematic bedroom lighting, laptop glow at night, rooftop sunset haze, luxury softness mixed with emotional distance',

  colorSignature:
    'warm cream and skin tones, marble white, sunset gold, laptop blue, candle amber, city-night black, luxury beige and muted blush',
}