export const STORY_CHAPTERS = [
  {
    id: 'morning-penthouse',
    worldId: 'luxury-life',
    name: 'Morning Penthouse',
    packId: 'luxury-lifestyle',
    summary:
      'A calm, high-status morning in a private luxury residence with skyline views and soft feminine control.',
    fields: {
      location: 'luxury penthouse overlooking city skyline',
      time: 'morning golden light',
      mood: 'calm, powerful, feminine presence',
    },
  },
  {
    id: 'airport-departure',
    worldId: 'luxury-life',
    name: 'Airport Departure',
    packId: 'luxury-lifestyle',
    summary:
      'Elegant departure energy, designer travel styling, and elite-access airport presence.',
    fields: {
      location: 'private terminal or luxury airport lounge',
      time: 'early morning or late afternoon',
      mood: 'composed, elegant, in-motion, high-value',
    },
  },
  {
    id: 'private-jet-window',
    worldId: 'luxury-life',
    name: 'Private Jet Window',
    packId: 'luxury-lifestyle',
    summary:
      'Quiet in-flight luxury with intimate exclusivity and aspirational travel framing.',
    fields: {
      location: 'private jet cabin by window seat',
      time: 'daylight above clouds',
      mood: 'private, elegant, aspirational, controlled',
    },
  },
  {
    id: 'hotel-arrival',
    worldId: 'luxury-life',
    name: 'Hotel Arrival',
    packId: 'luxury-lifestyle',
    summary:
      'A polished arrival moment in a five-star environment with premium visual tension.',
    fields: {
      location: 'five-star hotel suite entrance or lobby corridor',
      time: 'late afternoon',
      mood: 'fresh, glamorous, composed',
    },
  },
  {
    id: 'designer-shopping',
    worldId: 'luxury-life',
    name: 'Designer Shopping',
    packId: 'luxury-lifestyle',
    summary:
      'Confident luxury browsing with boutique elegance and social-status energy.',
    fields: {
      location: 'designer shopping district or luxury boutique interior',
      time: 'daytime',
      mood: 'stylish, social, elite, feminine',
    },
  },
  {
    id: 'rooftop-dinner',
    worldId: 'luxury-life',
    name: 'Rooftop Dinner',
    packId: 'luxury-lifestyle',
    summary:
      'An elegant evening meal with skyline atmosphere and controlled seduction.',
    fields: {
      location: 'luxury rooftop restaurant or skyline dinner terrace',
      time: 'sunset into evening',
      mood: 'elegant, magnetic, composed, desirable',
    },
  },
  {
  id: 'casino-night',
  worldId: 'luxury-life',
  name: 'Casino Night',
  packId: 'luxury-lifestyle',
  summary:
    'High-status nightlife with glamour, tension, and elite entertainment energy.',

  fields: {
    location: 'luxury casino interior with warm dramatic lighting',
    time: 'night',
    mood: 'bold, polished, exciting, high-value',
  },

  sceneVariants: [
  {
    name: 'Casino Entrance',
    fields: {
      pose: 'walking into casino, confident stride, composed posture',
      camera: 'slight low angle, cinematic entry framing',
      clothing: 'luxury evening coat over designer dress, polished high-status arrival styling',
    },
  },
  {
    name: 'Blackjack Table',
    fields: {
      pose: 'leaning slightly forward at table, focused expression',
      camera: 'mid-shot across table, shallow depth of field',
      clothing: 'refined luxury evening dress, elegant silhouette, premium casino styling',
    },
  },
  {
    name: 'Bar Moment',
    fields: {
      pose: 'holding drink, relaxed posture, slight body turn',
      camera: 'over-shoulder angle, warm ambient lighting',
      clothing: 'sleek cocktail dress, glamorous nightlife styling, refined feminine elegance',
    },
  },
  {
    name: 'Mirror Reflection',
    fields: {
      pose: 'subtle glance into mirror, composed expression',
      camera: 'reflection framing, soft cinematic blur',
      clothing: 'high-fashion evening look with polished luxury detailing',
    },
  },
  {
    name: 'Exit Walk',
    fields: {
      pose: 'walking out confidently, slow movement, controlled presence',
      camera: 'rear-follow shot, cinematic motion blur',
      clothing: 'luxury outerwear layered over evening outfit, elegant departure styling',
    },
  },
],
},
  {
    id: 'suite-unwind',
    worldId: 'luxury-life',
    name: 'Suite Unwind',
    packId: 'luxury-lifestyle',
    summary:
      'A private end-of-day luxury moment shifting into intimacy and softness.',
    fields: {
      location: 'luxury hotel suite, soft ambient lighting',
      time: 'night',
      mood: 'intimate, teasing, controlled',
    },
  },

   {
  id: 'gym-entry-energy',
  worldId: 'fitness-life',
  name: 'Gym Entry Energy',
  packId: 'fitness-influencer',
  summary:
    'A confident arrival and first impression inside a premium gym environment, blending movement, presence, and anticipation.',
  fields: {
    location: 'modern luxury gym entrance with clean architecture, glass panels, and premium fitness atmosphere',
    time: 'morning',
    mood: 'fresh, confident, feminine, high-value fitness presence',
    clothing: 'premium fitted gym set, flattering feminine activewear, clean athletic styling',
  },
  sceneVariants: [
    {
      name: 'Entrance Walk',
      fields: {
        pose: 'walking into gym, confident stride, upright posture',
        camera: 'cinematic entry framing, slight low angle',
      },
    },
    {
      name: 'Bag Adjust',
      fields: {
        pose: 'adjusting gym bag strap, relaxed confident posture',
        camera: 'mid-shot with clean architectural background',
      },
    },
    {
      name: 'Front Desk Pause',
      fields: {
        pose: 'brief pause near entrance, composed and aware presence',
        camera: 'editorial mid-shot with depth',
      },
    },
    {
      name: 'Stair Entry',
      fields: {
        pose: 'walking up stairs or platform, fluid confident motion',
        camera: 'low-angle cinematic motion shot',
      },
    },
    {
      name: 'Doorway Look',
      fields: {
        pose: 'slight turn back glance at entrance, calm expression',
        camera: 'over-shoulder framing',
      },
    },
  ],
},

{
  id: 'training-floor',
  worldId: 'fitness-life',
  name: 'Training Floor',
  packId: 'fitness-influencer',
  summary:
    'A dynamic training chapter capturing movement, effort, transitions, and full-body athletic presence.',
  fields: {
    location: 'high-end gym floor with racks, plates, mirrors, dumbbells, and premium equipment',
    time: 'daytime',
    mood: 'strong, sculpted, magnetic, athletic confidence',
    clothing: 'sculpting performance gymwear, glute-focused fitted activewear, premium training look',
  },
  sceneVariants: [
    {
      name: 'Machine Setup',
      fields: {
        pose: 'preparing machine, focused athletic posture',
        camera: 'mid-shot with equipment framing',
      },
    },
    {
      name: 'Rep Focus',
      fields: {
        pose: 'mid-repetition, controlled effort, visible muscle tension',
        camera: 'dynamic side angle, realistic gym depth',
      },
    },
    {
      name: 'Walking Between Sets',
      fields: {
        pose: 'walking across gym floor, calm controlled confidence',
        camera: 'cinematic side tracking shot',
      },
    },
    {
      name: 'Weight Rack Pause',
      fields: {
        pose: 'standing near weight rack, composed strong posture',
        camera: 'three-quarter gym floor framing',
      },
    },
    {
      name: 'Rest Between Sets',
      fields: {
        pose: 'resting lightly, relaxed arms, steady breathing',
        camera: 'soft editorial gym framing',
      },
    },
    {
      name: 'Plate Adjustment',
      fields: {
        pose: 'adjusting weights or equipment, focused body control',
        camera: 'close mid-shot with hands detail',
      },
    },
  ],
},

{
  id: 'mirror-confidence',
  worldId: 'fitness-life',
  name: 'Mirror Confidence',
  packId: 'fitness-influencer',
  summary:
    'A self-aware, body-confident chapter capturing reflection, presence, and feminine athletic identity.',
  fields: {
    location: 'luxury gym mirror area with flattering natural light and clean premium background',
    time: 'afternoon',
    mood: 'body-aware, confident, feminine, subtly seductive',
    clothing: 'sleek fitted gym set with polished feminine styling and premium silhouette',
  },
  sceneVariants: [
    {
      name: 'Front Reflection',
      fields: {
        pose: 'standing in front of mirror, relaxed confident posture',
        camera: 'mirror-framed front angle',
      },
    },
    {
      name: 'Side Turn',
      fields: {
        pose: 'slight side turn, waist and glute line emphasized',
        camera: 'three-quarter body framing',
      },
    },
    {
      name: 'Hair Adjustment',
      fields: {
        pose: 'adjusting hair, soft confident expression',
        camera: 'close-up mirror reflection',
      },
    },
    {
      name: 'Waistband Adjust',
      fields: {
        pose: 'subtle clothing adjustment, body-aware posture',
        camera: 'mid-body framing, polished aesthetic',
      },
    },
    {
      name: 'Phone Reflection',
      fields: {
        pose: 'casual reflection moment, self-aware presence',
        camera: 'mirror selfie-inspired angle, premium realism',
      },
    },
  ],
},

{
  id: 'recovery-glow',
  worldId: 'fitness-life',
  name: 'Recovery Glow',
  packId: 'fitness-influencer',
  summary:
    'A post-training chapter focused on calm confidence, glow, and relaxed but powerful feminine energy.',
  fields: {
    location: 'premium locker room or recovery area with warm lighting and polished modern surfaces',
    time: 'evening',
    mood: 'flushed, confident, sexy, accomplished',
    clothing: 'post-workout fitted activewear, slightly relaxed but still body-flattering premium gym styling',
  },
  sceneVariants: [
    {
      name: 'Locker Room Pause',
      fields: {
        pose: 'leaning lightly, relaxed post-session posture',
        camera: 'warm mid-shot with soft lighting',
      },
    },
    {
      name: 'Water Break',
      fields: {
        pose: 'holding water bottle, calm recovery moment',
        camera: 'editorial close mid-shot',
      },
    },
    {
      name: 'Bench Sit',
      fields: {
        pose: 'sitting on bench, relaxed confident posture',
        camera: 'cinematic indoor framing',
      },
    },
    {
      name: 'Hoodie On',
      fields: {
        pose: 'putting on hoodie or light layer, smooth motion',
        camera: 'lifestyle candid angle',
      },
    },
    {
      name: 'Exit Walk',
      fields: {
        pose: 'walking out of gym, composed confident energy',
        camera: 'rear-follow cinematic shot',
      },
    },
  ],
},

{
  id: 'private-morning',
  worldId: 'private-creator-life',
  name: 'Private Morning',
  packId: 'fanvue-creator',
  summary:
    'A fully private, unguarded morning routine with no performance — waking, body awareness, shower, and slow transition into the day in a natural intimate environment.',
  fields: {
    location: 'luxury hotel suite bedroom and bathroom with soft bedding, warm light, minimal decor',
    time: 'morning',
    mood: 'soft, unguarded, intimate, natural feminine presence',
    clothing: 'soft underwear or silk robe, minimal, relaxed, natural morning styling',
  },
  sceneVariants: [
    {
      name: 'Wake in Bed',
      fields: {
        pose: 'lying in bed slowly waking, slight movement under sheets, eyes adjusting, no awareness of being seen',
        camera: 'over-bed candid angle, soft natural framing',
      },
    },
    {
      name: 'Edge of Bed Stretch',
      fields: {
        pose: 'sitting at edge of bed, slow stretch, slight pause between movements, body waking gradually',
        camera: 'side profile soft morning shot',
      },
    },
    {
      name: 'Walk to Bathroom',
      fields: {
        pose: 'walking slowly across room, adjusting posture subtly, relaxed natural movement',
        camera: 'full-body lifestyle tracking shot',
      },
    },
    {
      name: 'Mirror Pause',
      fields: {
        pose: 'standing in front of mirror, quiet observation of face and body, subtle shift in stance',
        camera: 'mirror-framed mid shot',
      },
    },
    {
      name: 'Shower Routine',
      fields: {
        pose: 'standing under running water, minimal movement, calm breathing, fully present in moment',
        camera: 'soft silhouette through glass',
      },
    },
    {
      name: 'Post Shower Walk',
      fields: {
        pose: 'walking back into bedroom wrapped in towel or robe, adjusting hair slightly, unhurried',
        camera: 'soft indoor walking shot',
      },
    },
  ],
},

{
  id: 'private-tease',
  worldId: 'private-creator-life',
  name: 'Private Tease',
  packId: 'fanvue-creator',
  summary:
    'A controlled daytime creator flow with outfit selection, filming, reviewing content, and real-life moments like eating and resetting — balancing intimacy and strategy.',
  fields: {
    location: 'luxury bedroom and kitchen space with clean aesthetic and soft daylight',
    time: 'daytime',
    mood: 'playful, controlled, self-aware, selectively intimate',
    clothing: 'fitted lingerie-inspired outfit or soft aesthetic daywear, refined and intentional',
  },
  sceneVariants: [
    {
      name: 'Outfit Selection',
      fields: {
        pose: 'standing at wardrobe, holding clothing briefly, deciding what fits the tone',
        camera: 'mirror wardrobe framing',
      },
    },
    {
      name: 'Mirror Adjustment',
      fields: {
        pose: 'adjusting clothing in mirror, small posture corrections, testing angles',
        camera: 'three-quarter mirror shot',
      },
    },
    {
      name: 'Camera Setup',
      fields: {
        pose: 'setting up phone or camera, testing position with slight movements',
        camera: 'over-shoulder setup angle',
      },
    },
    {
      name: 'Recording Flow',
      fields: {
        pose: 'recording soft controlled clips, pausing between movements to evaluate',
        camera: 'medium close creator framing',
      },
    },
    {
      name: 'Content Review',
      fields: {
        pose: 'sitting and reviewing footage, slight head tilt, selective attention',
        camera: 'over-shoulder screen shot',
      },
    },
    {
      name: 'Kitchen Routine',
      fields: {
        pose: 'preparing light meal or drink, slow natural movement, grounded presence',
        camera: 'kitchen candid framing',
      },
    },
    {
      name: 'Eating Pause',
      fields: {
        pose: 'sitting and eating slowly, relaxed but aware posture, thinking between bites',
        camera: 'seated lifestyle shot',
      },
    },
    {
      name: 'Room Reset',
      fields: {
        pose: 'adjusting room and objects, preparing space for next phase',
        camera: 'wide interior framing',
      },
    },
  ],
},

{
  id: 'private-presence',
  worldId: 'private-creator-life',
  name: 'Private Presence',
  packId: 'fanvue-creator',
  summary:
    'An evening shift into slower, intentional presence — controlled filming, stronger eye contact, and grounded real-life moments like preparing a drink or meal.',
  fields: {
    location: 'luxury apartment interior with warm ambient lighting',
    time: 'evening',
    mood: 'controlled, magnetic, intentional, emotionally aware',
    clothing: 'refined fitted evening wear or elevated intimate styling',
  },
  sceneVariants: [
    {
      name: 'Mirror Control',
      fields: {
        pose: 'standing in front of mirror, holding eye contact with reflection, adjusting expression slowly',
        camera: 'mirror close mid shot',
      },
    },
    {
      name: 'Outfit Decision',
      fields: {
        pose: 'testing movement in outfit, slow controlled motion, evaluating visual impact',
        camera: 'full-body mirror framing',
      },
    },
    {
      name: 'Slow Recording',
      fields: {
        pose: 'recording slower clips, minimal movement, holding presence',
        camera: 'cinematic medium close shot',
      },
    },
    {
      name: 'Stillness Between Takes',
      fields: {
        pose: 'sitting still between takes, breathing steady, choosing not to move immediately',
        camera: 'intimate still framing',
      },
    },
    {
      name: 'Evening Drink',
      fields: {
        pose: 'preparing or holding drink, pausing before each sip, controlled movement',
        camera: 'lifestyle kitchen or lounge shot',
      },
    },
    {
      name: 'Return to Camera',
      fields: {
        pose: 'returning to filming with stronger presence, slower pacing, deliberate gaze',
        camera: 'low light cinematic framing',
      },
    },
    {
      name: 'End of Session',
      fields: {
        pose: 'sitting in stillness after filming, letting energy settle',
        camera: 'wide calm composition',
      },
    },
  ],
},

{
  id: 'private-night',
  worldId: 'private-creator-life',
  name: 'Private Night',
  packId: 'fanvue-creator',
  summary:
    'A controlled night phase focused on content release, emotional detachment, and full return to private self — including food, water, and sleep routines.',
  fields: {
    location: 'luxury bedroom and kitchen with low lighting and soft shadows',
    time: 'night',
    mood: 'detached, controlled, private, emotionally complete',
    clothing: 'minimal nightwear or soft intimate styling, relaxed and natural',
  },
  sceneVariants: [
    {
      name: 'Final Review',
      fields: {
        pose: 'lying or sitting while reviewing content, pausing before decisions',
        camera: 'close night framing with screen glow',
      },
    },
    {
      name: 'Content Release',
      fields: {
        pose: 'posting content after slight hesitation, controlled final action',
        camera: 'over-shoulder phone shot',
      },
    },
    {
      name: 'Reaction Watch',
      fields: {
        pose: 'watching reactions calmly, minimal expression change',
        camera: 'close-up interaction shot',
      },
    },
    {
      name: 'Unwind Movement',
      fields: {
        pose: 'removing layers slowly, no longer performing, relaxed motion',
        camera: 'soft silhouette shot',
      },
    },
    {
      name: 'Night Drink or Snack',
      fields: {
        pose: 'drinking water or light snack, standing still briefly between movements',
        camera: 'candid kitchen or bedside shot',
      },
    },
    {
      name: 'Bed Entry',
      fields: {
        pose: 'lying down and adjusting position slowly, body settling',
        camera: 'wide still composition',
      },
    },
    {
      name: 'Final Stillness',
      fields: {
        pose: 'eyes closing gradually, breathing slowing, fully withdrawn',
        camera: 'final cinematic close frame',
      },
    },
  ],
},
{
  id: 'fanvue-soft-morning-setup',
  worldId: 'fanvue-creator-life',
  name: 'Soft Morning Setup',
  packId: 'fanvue-creator',
  summary:
    'A calm feminine start to the day with soft premium atmosphere, light self-awareness, and aesthetic creator energy.',
  fields: {
    location: 'luxury bedroom or aesthetic suite with soft daylight and clean intimate styling',
    time: 'morning',
    mood: 'soft, feminine, calm, gently inviting',
    clothing: 'soft robe, fitted lounge set, or refined morningwear with subtle feminine styling',
  },
  sceneVariants: [
    {
      name: 'Bedside Light',
      fields: {
        pose: 'sitting softly at edge of bed, relaxed morning posture',
        camera: 'side-profile bedroom framing',
      },
    },
    {
      name: 'Curtain Open',
      fields: {
        pose: 'opening curtains slowly, feminine posture, natural movement',
        camera: 'backlit window reveal shot',
      },
    },
    {
      name: 'Morning Walk',
      fields: {
        pose: 'walking barefoot through room, calm soft presence',
        camera: 'tracking lifestyle angle',
      },
    },
    {
      name: 'Coffee Start',
      fields: {
        pose: 'holding coffee, relaxed posture, natural expression',
        camera: 'editorial morning mid-shot',
      },
    },
  ],
},
{
  id: 'fanvue-mirror-check',
  worldId: 'fanvue-creator-life',
  name: 'Mirror Check',
  packId: 'fanvue-creator',
  summary:
    'A self-aware but tasteful chapter focused on appearance, framing, and soft creator confidence.',
  fields: {
    location: 'luxury bathroom or vanity mirror area with clean warm light',
    time: 'late morning',
    mood: 'self-aware, polished, teasing, feminine',
    clothing: 'fitted loungewear, soft slip, or flattering creator-ready styling',
  },
  sceneVariants: [
    {
      name: 'Front Reflection',
      fields: {
        pose: 'standing in front of mirror, calm body-aware posture',
        camera: 'mirror-framed front angle',
      },
    },
    {
      name: 'Side Turn',
      fields: {
        pose: 'slight side turn, subtle body line emphasis',
        camera: 'three-quarter mirror framing',
      },
    },
    {
      name: 'Hair Adjust',
      fields: {
        pose: 'adjusting hair, relaxed feminine expression',
        camera: 'close reflection shot',
      },
    },
    {
      name: 'Vanity Lean',
      fields: {
        pose: 'leaning lightly near vanity, controlled softness',
        camera: 'editorial mid-shot',
      },
    },
  ],
},
{
  id: 'fanvue-content-planning',
  worldId: 'fanvue-creator-life',
  name: 'Content Planning',
  packId: 'fanvue-creator',
  summary:
    'A creator-focused chapter showing intention, planning, soft professionalism, and aesthetic control.',
  fields: {
    location: 'luxury suite desk, bed, or creative content corner with natural light',
    time: 'daytime',
    mood: 'focused, aesthetic, feminine, in control',
    clothing: 'clean fitted daywear or elevated content-creator loungewear',
  },
  sceneVariants: [
    {
      name: 'Phone Review',
      fields: {
        pose: 'holding phone, reviewing ideas, composed posture',
        camera: 'over-shoulder creator angle',
      },
    },
    {
      name: 'Notebook Moment',
      fields: {
        pose: 'sitting with notes or journal, focused expression',
        camera: 'editorial seated framing',
      },
    },
    {
      name: 'Desk Setup',
      fields: {
        pose: 'leaning over desk or setup space, calm precision',
        camera: 'clean medium shot',
      },
    },
    {
      name: 'Quiet Planning',
      fields: {
        pose: 'looking down thoughtfully, relaxed feminine stillness',
        camera: 'soft candid portrait angle',
      },
    },
  ],
},
{
  id: 'fanvue-camera-test',
  worldId: 'fanvue-creator-life',
  name: 'Camera Test',
  packId: 'fanvue-creator',
  summary:
    'A polished setup chapter built around camera awareness, trial framing, and subtle creator tease.',
  fields: {
    location: 'bedroom or indoor aesthetic content setup with tripod, mirror, or soft natural light',
    time: 'afternoon',
    mood: 'playful, focused, softly teasing, polished',
    clothing: 'flattering fitted outfit, aesthetic lounge styling, or soft premium creator look',
  },
  sceneVariants: [
    {
      name: 'Tripod Adjust',
      fields: {
        pose: 'adjusting tripod or phone, focused creator posture',
        camera: 'over-shoulder setup angle',
      },
    },
    {
      name: 'Test Framing',
      fields: {
        pose: 'checking framing, subtle smile, calm body awareness',
        camera: 'screen or mirror reflection angle',
      },
    },
    {
      name: 'Standing Reset',
      fields: {
        pose: 'stepping back into frame, relaxed controlled posture',
        camera: 'wide room composition',
      },
    },
    {
      name: 'Preview Glance',
      fields: {
        pose: 'looking toward camera setup, soft playful expression',
        camera: 'editorial creator mid-shot',
      },
    },
  ],
},
{
  id: 'fanvue-audience-engagement',
  worldId: 'fanvue-creator-life',
  name: 'Audience Engagement',
  packId: 'fanvue-creator',
  summary:
    'A warm, direct, and personality-led chapter focused on connection, charm, and soft premium access.',
  fields: {
    location: 'cozy luxury bedroom or aesthetic lounge area with inviting warm light',
    time: 'afternoon',
    mood: 'engaging, playful, connected, feminine',
    clothing: 'soft fitted outfit with approachable but flattering creator styling',
  },
  sceneVariants: [
    {
      name: 'Direct Look',
      fields: {
        pose: 'looking directly at camera, relaxed confidence',
        camera: 'close-up engagement framing',
      },
    },
    {
      name: 'Seated Connection',
      fields: {
        pose: 'sitting casually, open body language, soft expression',
        camera: 'mid-shot with depth',
      },
    },
    {
      name: 'Laugh Moment',
      fields: {
        pose: 'natural laugh or smile, spontaneous warm energy',
        camera: 'candid creator angle',
      },
    },
    {
      name: 'Phone Interaction',
      fields: {
        pose: 'holding phone, light engagement posture, subtle expression',
        camera: 'soft editorial crop',
      },
    },
  ],
},
{
  id: 'fanvue-private-aesthetic-reset',
  worldId: 'fanvue-creator-life',
  name: 'Private Aesthetic Reset',
  packId: 'fanvue-creator',
  summary:
    'A slower, more intimate but still tasteful transition chapter that resets the energy before evening content.',
  fields: {
    location: 'luxury suite, soft seating area, vanity corner, or quiet balcony with premium atmosphere',
    time: 'early evening',
    mood: 'calm, private, composed, softly intimate',
    clothing: 'elevated loungewear, soft robe, or minimal fitted evening-prep styling',
  },
  sceneVariants: [
    {
      name: 'Sofa Pause',
      fields: {
        pose: 'sitting softly on sofa, relaxed composed posture',
        camera: 'editorial lounge framing',
      },
    },
    {
      name: 'Vanity Reset',
      fields: {
        pose: 'standing at vanity, subtle prep movement',
        camera: 'mirror-side cinematic angle',
      },
    },
    {
      name: 'Balcony Breath',
      fields: {
        pose: 'standing by balcony, slow calm posture',
        camera: 'back-facing golden-hour framing',
      },
    },
    {
      name: 'Quiet Walk',
      fields: {
        pose: 'walking through suite with soft feminine flow',
        camera: 'tracking lifestyle shot',
      },
    },
  ],
},
{
  id: 'fanvue-evening-content-push',
  worldId: 'fanvue-creator-life',
  name: 'Evening Content Push',
  packId: 'fanvue-creator',
  summary:
    'A stronger creator chapter focused on final polished content, elevated femininity, and premium soft tease.',
  fields: {
    location: 'luxury apartment or suite with warm evening ambient lighting and aesthetic decor',
    time: 'evening',
    mood: 'confident, aesthetic, polished, subtly seductive',
    clothing: 'refined fitted evening loungewear or premium aesthetic creator outfit',
  },
  sceneVariants: [
    {
      name: 'Standing Light',
      fields: {
        pose: 'standing under warm light, composed feminine presence',
        camera: 'cinematic soft-light framing',
      },
    },
    {
      name: 'Pose Reset',
      fields: {
        pose: 'adjusting posture into frame, self-aware confidence',
        camera: 'mid-body editorial angle',
      },
    },
    {
      name: 'Close Expression',
      fields: {
        pose: 'soft close-up expression, subtle connection energy',
        camera: 'close-up cinematic crop',
      },
    },
    {
      name: 'Slow Movement',
      fields: {
        pose: 'slow movement through room, controlled feminine flow',
        camera: 'tracking evening shot',
      },
    },
  ],
},
{
  id: 'fanvue-night-tease',
  worldId: 'fanvue-creator-life',
  name: 'Night Tease',
  packId: 'fanvue-creator',
  summary:
    'A tasteful late-night chapter with stronger tease, softer shadows, and controlled premium intimacy.',
  fields: {
    location: 'dim luxury bedroom or evening suite interior with soft warm light and intimate mood',
    time: 'night',
    mood: 'teasing, controlled, intimate, magnetic',
    clothing: 'premium nightwear, silk styling, or refined lingerie-inspired aesthetic look',
  },
  sceneVariants: [
    {
      name: 'Lamp Glow',
      fields: {
        pose: 'standing near lamp, soft intimate posture',
        camera: 'warm close mid-shot',
      },
    },
    {
      name: 'Bedside Presence',
      fields: {
        pose: 'standing or sitting near bed, calm controlled energy',
        camera: 'editorial bedroom framing',
      },
    },
    {
      name: 'Shadow Turn',
      fields: {
        pose: 'slow turn through low light, composed body line',
        camera: 'cinematic night angle',
      },
    },
    {
      name: 'Close Connection',
      fields: {
        pose: 'subtle forward lean, direct but soft attention',
        camera: 'close-up intimate crop',
      },
    },
  ],
},

{
  id: 'of-slow-morning',
  worldId: 'onlyfans-creator-life',
  name: 'Slow Morning',
  packId: 'onlyfans-creator',
  summary:
    'A quiet private start with low-key body awareness, natural intimacy, and early control of the day’s energy.',
  fields: {
    location: 'luxury bedroom with soft bedding, muted light, and intimate premium atmosphere',
    time: 'morning',
    mood: 'private, soft, self-aware, restrained seduction',
    clothing: 'minimal luxury morningwear, fitted robe, or intimate soft-start styling',
  },
  sceneVariants: [
    {
      name: 'Bed Edge Pause',
      fields: {
        pose: 'sitting on edge of bed, calm private posture',
        camera: 'side bedroom framing',
      },
    },
    {
      name: 'Curtain Light',
      fields: {
        pose: 'standing at curtains, slow natural motion',
        camera: 'backlit morning silhouette angle',
      },
    },
    {
      name: 'Morning Stretch',
      fields: {
        pose: 'gentle stretch, soft body extension',
        camera: 'editorial intimate mid-shot',
      },
    },
    {
      name: 'Barefoot Walk',
      fields: {
        pose: 'walking slowly through room, calm feminine control',
        camera: 'tracking indoor shot',
      },
    },
  ],
},
{
  id: 'of-mirror-awareness',
  worldId: 'onlyfans-creator-life',
  name: 'Mirror Awareness',
  packId: 'onlyfans-creator',
  summary:
    'A body-aware and self-directed chapter built around reflection, visual control, and rising tease.',
  fields: {
    location: 'luxury bathroom or mirror area with warm flattering light and polished private styling',
    time: 'late morning',
    mood: 'aware, teasing, composed, visually intentional',
    clothing: 'refined intimate styling, fitted slip, or body-aware private look',
  },
  sceneVariants: [
    {
      name: 'Front Reflection',
      fields: {
        pose: 'standing in front of mirror, deliberate body awareness',
        camera: 'mirror-framed front angle',
      },
    },
    {
      name: 'Shoulder Turn',
      fields: {
        pose: 'slight shoulder turn, controlled line and expression',
        camera: 'three-quarter reflection crop',
      },
    },
    {
      name: 'Hair Sweep',
      fields: {
        pose: 'sweeping hair back, direct self-aware energy',
        camera: 'close cinematic mirror shot',
      },
    },
    {
      name: 'Vanity Lean',
      fields: {
        pose: 'leaning lightly on vanity, relaxed but intentional presence',
        camera: 'editorial mid-shot with depth',
      },
    },
  ],
},
{
  id: 'of-tease-setup',
  worldId: 'onlyfans-creator-life',
  name: 'Tease Setup',
  packId: 'onlyfans-creator',
  summary:
    'A setup chapter where the energy shifts from natural to intentionally seductive, while staying controlled and premium.',
  fields: {
    location: 'luxury bedroom or styled creator room with intimate framing and clean private atmosphere',
    time: 'afternoon',
    mood: 'teasing, deliberate, magnetic, in control',
    clothing: 'fitted intimate-style outfit with refined suggestive styling and strong silhouette',
  },
  sceneVariants: [
    {
      name: 'Camera Ready',
      fields: {
        pose: 'standing in frame, calm controlled readiness',
        camera: 'mid-body creator framing',
      },
    },
    {
      name: 'Slow Walk In',
      fields: {
        pose: 'walking slowly into frame, poised presence',
        camera: 'tracking cinematic shot',
      },
    },
    {
      name: 'Soft Pose Hold',
      fields: {
        pose: 'holding still in controlled body-aware posture',
        camera: 'editorial soft-light angle',
      },
    },
    {
      name: 'Look Back',
      fields: {
        pose: 'looking back over shoulder, subtle teasing control',
        camera: 'three-quarter intimate framing',
      },
    },
  ],
},
{
  id: 'of-private-control',
  worldId: 'onlyfans-creator-life',
  name: 'Private Control',
  packId: 'onlyfans-creator',
  summary:
    'A more inward and dominant chapter focused on calm ownership, visual confidence, and controlled feminine power.',
  fields: {
    location: 'dark luxury suite, quiet lounge, or private room with warm controlled lighting',
    time: 'evening',
    mood: 'controlled, calm, dominant, intimate',
    clothing: 'elevated intimate styling with strong body line and premium finish',
  },
  sceneVariants: [
    {
      name: 'Chair Sit',
      fields: {
        pose: 'seated with still powerful posture, calm expression',
        camera: 'editorial seated composition',
      },
    },
    {
      name: 'Standing Presence',
      fields: {
        pose: 'standing still, direct and composed body language',
        camera: 'cinematic mid-shot',
      },
    },
    {
      name: 'Slow Turn',
      fields: {
        pose: 'slow turn, controlled movement, strong self-awareness',
        camera: 'low cinematic framing',
      },
    },
    {
      name: 'Window Edge',
      fields: {
        pose: 'standing near window, quiet dominant presence',
        camera: 'shadowed side-angle shot',
      },
    },
  ],
},
{
  id: 'of-escalation',
  worldId: 'onlyfans-creator-life',
  name: 'Escalation',
  packId: 'onlyfans-creator',
  summary:
    'A stronger visual chapter where tension rises and the creator fully owns the frame and energy.',
  fields: {
    location: 'luxury interior with warm shadows, cinematic mood, and intimate visual depth',
    time: 'night',
    mood: 'intense, seductive, magnetic, controlled',
    clothing: 'bold intimate styling with refined but stronger visual impact',
  },
  sceneVariants: [
    {
      name: 'Forward Lean',
      fields: {
        pose: 'slight forward lean, intentional tension and presence',
        camera: 'close-up cinematic shot',
      },
    },
    {
      name: 'Walking Slow',
      fields: {
        pose: 'slow walk through frame, composed dominant movement',
        camera: 'low tracking angle',
      },
    },
    {
      name: 'Still Gaze',
      fields: {
        pose: 'holding still with direct gaze and control',
        camera: 'tight portrait framing',
      },
    },
    {
      name: 'Bedside Frame',
      fields: {
        pose: 'standing near bed, quiet controlled body language',
        camera: 'cinematic room composition',
      },
    },
  ],
},
{
  id: 'of-after-dark-presence',
  worldId: 'onlyfans-creator-life',
  name: 'After Dark Presence',
  packId: 'onlyfans-creator',
  summary:
    'A deep late-night chapter built around shadows, composure, and premium intimate dominance.',
  fields: {
    location: 'dark luxury bedroom or low-lit private interior with cinematic evening mood',
    time: 'late night',
    mood: 'after-dark, controlled, dominant, sensual',
    clothing: 'premium late-night intimate look with strong silhouette and polished finish',
  },
  sceneVariants: [
    {
      name: 'Low Light Stand',
      fields: {
        pose: 'standing in low light, still confident energy',
        camera: 'moody low-key framing',
      },
    },
    {
      name: 'Shadow Profile',
      fields: {
        pose: 'side profile in shadow, subtle movement',
        camera: 'cinematic silhouette angle',
      },
    },
    {
      name: 'Quiet Sit',
      fields: {
        pose: 'seated in dark atmosphere, composed body line',
        camera: 'editorial intimate crop',
      },
    },
    {
      name: 'Direct Attention',
      fields: {
        pose: 'subtle forward body angle, quiet magnetic presence',
        camera: 'close low-light portrait',
      },
    },
  ],
},
{
  id: 'of-payoff-energy',
  worldId: 'onlyfans-creator-life',
  name: 'Payoff Energy',
  packId: 'onlyfans-creator',
  summary:
    'The peak chapter of the sequence, centered on full confidence, strong visual dominance, and late-night creator payoff.',
  fields: {
    location: 'dark luxury bedroom or private premium set with deep intimate atmosphere',
    time: 'late night',
    mood: 'dominant, intense, confident, visually powerful',
    clothing: 'high-impact intimate styling with premium dramatic finish',
  },
  sceneVariants: [
    {
      name: 'Direct Power Look',
      fields: {
        pose: 'direct gaze, still powerful posture',
        camera: 'close-up dominant framing',
      },
    },
    {
      name: 'Shadow Framing',
      fields: {
        pose: 'partially lit silhouette, controlled movement',
        camera: 'low-light cinematic shot',
      },
    },
    {
      name: 'Centered Presence',
      fields: {
        pose: 'standing centered, fully controlled body language',
        camera: 'editorial full-body composition',
      },
    },
    {
      name: 'Final Hold',
      fields: {
        pose: 'holding a final confident pose with calm intensity',
        camera: 'cinematic still frame',
      },
    },
  ],
},
{
  id: 'of-night-reset',
  worldId: 'onlyfans-creator-life',
  name: 'Night Reset',
  packId: 'onlyfans-creator',
  summary:
    'A post-intensity final chapter that brings the energy down into private calm, controlled softness, and afterglow.',
  fields: {
    location: 'luxury bedroom or suite interior with very soft low night light and intimate silence',
    time: 'night',
    mood: 'settled, intimate, calm, privately powerful',
    clothing: 'soft luxury nightwear or relaxed intimate after-hours styling',
  },
  sceneVariants: [
    {
      name: 'Bedside Stillness',
      fields: {
        pose: 'sitting quietly near bed, relaxed private posture',
        camera: 'soft bedside framing',
      },
    },
    {
      name: 'Mirror Remove',
      fields: {
        pose: 'removing jewelry or finishing look-down reset',
        camera: 'mirror-side night angle',
      },
    },
    {
      name: 'Window Pause',
      fields: {
        pose: 'standing by window, private afterglow energy',
        camera: 'night silhouette framing',
      },
    },
    {
      name: 'Slow Exhale',
      fields: {
        pose: 'relaxed soft posture, end-of-night calm presence',
        camera: 'editorial intimate crop',
      },
    },
  ],
},

{
  id: 'gym-wake-and-prep',
  worldId: 'gym-influencer-life',
  name: 'Wake and Prep',
  packId: 'gym-influencer',
  summary:
    'A disciplined beginning focused on early intent, quiet energy, and preparing mentally for the session ahead.',
  fields: {
    location: 'bedroom, kitchen, or early-morning prep space with natural light and clean athletic atmosphere',
    time: 'morning',
    mood: 'focused, disciplined, calm, intentional',
    clothing: 'clean fitted activewear or simple pre-training outfit with strong athletic styling',
  },
  sceneVariants: [
    {
      name: 'Bed Edge Focus',
      fields: {
        pose: 'sitting at edge of bed, mentally preparing',
        camera: 'side-profile calm morning shot',
      },
    },
    {
      name: 'Coffee Prep',
      fields: {
        pose: 'holding coffee, relaxed but focused posture',
        camera: 'editorial morning lifestyle angle',
      },
    },
    {
      name: 'Bag Ready',
      fields: {
        pose: 'packing or adjusting gym bag, composed movement',
        camera: 'mid-shot prep framing',
      },
    },
    {
      name: 'Kitchen Pause',
      fields: {
        pose: 'standing calmly in kitchen, thoughtful pre-session presence',
        camera: 'soft daylight interior shot',
      },
    },
  ],
},
{
  id: 'gym-physique-check',
  worldId: 'gym-influencer-life',
  name: 'Physique Check',
  packId: 'gym-influencer',
  summary:
    'A self-aware and body-confident chapter centered on reflection, progress, and athletic feminine identity.',
  fields: {
    location: 'mirror area in bedroom, bathroom, or gym prep space with natural or flattering light',
    time: 'morning',
    mood: 'self-aware, confident, focused, athletic femininity',
    clothing: 'fitted activewear or minimal pre-workout styling with physique emphasis',
  },
  sceneVariants: [
    {
      name: 'Front Check',
      fields: {
        pose: 'standing in front of mirror, controlled body awareness',
        camera: 'front reflection framing',
      },
    },
    {
      name: 'Side Profile',
      fields: {
        pose: 'slight side turn, focused physique evaluation',
        camera: 'three-quarter mirror crop',
      },
    },
    {
      name: 'Waist Adjust',
      fields: {
        pose: 'subtle activewear adjustment, calm body presence',
        camera: 'mid-body reflection angle',
      },
    },
    {
      name: 'Hair Tie',
      fields: {
        pose: 'tying hair back, focused and composed expression',
        camera: 'close mirror detail shot',
      },
    },
  ],
},
{
  id: 'gym-arrival',
  worldId: 'gym-influencer-life',
  name: 'Gym Arrival',
  packId: 'gym-influencer',
  summary:
    'A strong arrival chapter showing confidence, routine, and visible gym presence before training begins.',
  fields: {
    location: 'modern premium gym entrance with clean architecture, machines, and luxury fitness atmosphere',
    time: 'morning',
    mood: 'confident, fresh, athletic, high-value gym energy',
    clothing: 'premium fitted gym set with polished feminine activewear styling',
  },
  sceneVariants: [
    {
      name: 'Entrance Walk',
      fields: {
        pose: 'walking into gym, confident stride, upright posture',
        camera: 'cinematic entry framing, slight low angle',
      },
    },
    {
      name: 'Bag Adjust',
      fields: {
        pose: 'adjusting gym bag strap, relaxed confident posture',
        camera: 'mid-shot with architectural depth',
      },
    },
    {
      name: 'Front Desk Pause',
      fields: {
        pose: 'brief pause near entrance, composed visible presence',
        camera: 'editorial arrival shot',
      },
    },
    {
      name: 'Doorway Look',
      fields: {
        pose: 'slight turn back glance, calm strong expression',
        camera: 'over-shoulder gym entry angle',
      },
    },
  ],
},
{
  id: 'gym-heavy-training',
  worldId: 'gym-influencer-life',
  name: 'Heavy Training',
  packId: 'gym-influencer',
  summary:
    'A main performance chapter built around strength, visible effort, and serious high-level training energy.',
  fields: {
    location: 'high-end gym floor with racks, plates, machines, mirrors, and premium equipment',
    time: 'daytime',
    mood: 'intense, strong, focused, high-performance',
    clothing: 'sculpting performance gymwear with strong athletic silhouette and premium training styling',
  },
  sceneVariants: [
    {
      name: 'Heavy Lift',
      fields: {
        pose: 'mid-lift, visible effort, strong controlled body tension',
        camera: 'side training angle with depth',
      },
    },
    {
      name: 'Setup Position',
      fields: {
        pose: 'preparing for movement, focused posture and intent',
        camera: 'editorial training-floor framing',
      },
    },
    {
      name: 'Machine Focus',
      fields: {
        pose: 'working through machine set, precise controlled motion',
        camera: 'mid-shot with equipment framing',
      },
    },
    {
      name: 'Plate Change',
      fields: {
        pose: 'adjusting plates or load, serious gym focus',
        camera: 'hands-and-body detail shot',
      },
    },
  ],
},
{
  id: 'gym-between-sets-content',
  worldId: 'gym-influencer-life',
  name: 'Between Sets Content',
  packId: 'gym-influencer',
  summary:
    'A chapter capturing the influencer side of training with phone moments, candid pauses, and public gym presence.',
  fields: {
    location: 'premium gym floor, mirror wall, or machine area with realistic active training background',
    time: 'afternoon',
    mood: 'confident, social, body-aware, composed',
    clothing: 'fitted influencer-ready activewear with polished premium gym styling',
  },
  sceneVariants: [
    {
      name: 'Phone Clip',
      fields: {
        pose: 'holding phone between sets, calm confident posture',
        camera: 'mirror or side-content angle',
      },
    },
    {
      name: 'Walking Reset',
      fields: {
        pose: 'walking across floor, composed between-set energy',
        camera: 'tracking gym lifestyle shot',
      },
    },
    {
      name: 'Mirror Glance',
      fields: {
        pose: 'quick glance in mirror, body-aware stillness',
        camera: 'editorial reflection crop',
      },
    },
    {
      name: 'Rest Pause',
      fields: {
        pose: 'brief rest position, steady breathing and controlled posture',
        camera: 'soft candid gym angle',
      },
    },
  ],
},
{
  id: 'gym-post-workout-pump',
  worldId: 'gym-influencer-life',
  name: 'Post Workout Pump',
  packId: 'gym-influencer',
  summary:
    'A confident and visibly athletic chapter focused on the immediate post-workout look, energy, and physique presence.',
  fields: {
    location: 'gym mirror area, machine space, or polished open gym floor with flattering light',
    time: 'late afternoon',
    mood: 'pumped, confident, magnetic, accomplished',
    clothing: 'post-session fitted activewear with physique-enhancing athletic styling',
  },
  sceneVariants: [
    {
      name: 'Mirror Pump',
      fields: {
        pose: 'standing in mirror after session, controlled confident posture',
        camera: 'mirror-framed athletic angle',
      },
    },
    {
      name: 'Side Flex',
      fields: {
        pose: 'slight side pose with visible training result energy',
        camera: 'three-quarter physique framing',
      },
    },
    {
      name: 'Hair Back',
      fields: {
        pose: 'pushing hair back, flushed but composed expression',
        camera: 'close editorial crop',
      },
    },
    {
      name: 'Still Presence',
      fields: {
        pose: 'standing still after training, strong body awareness',
        camera: 'clean premium gym composition',
      },
    },
  ],
},
{
  id: 'gym-recovery-glow',
  worldId: 'gym-influencer-life',
  name: 'Recovery Glow',
  packId: 'gym-influencer',
  summary:
    'A softer recovery chapter showing calm confidence, post-session femininity, and premium recovery atmosphere.',
  fields: {
    location: 'locker room, recovery zone, or polished gym exit area with warm modern surfaces',
    time: 'evening',
    mood: 'relaxed, glowing, confident, feminine',
    clothing: 'post-workout fitted activewear, hoodie layer, or relaxed premium recovery styling',
  },
  sceneVariants: [
    {
      name: 'Water Break',
      fields: {
        pose: 'holding water bottle, relaxed confident posture',
        camera: 'editorial close mid-shot',
      },
    },
    {
      name: 'Bench Sit',
      fields: {
        pose: 'sitting on bench, calm recovery posture',
        camera: 'cinematic indoor framing',
      },
    },
    {
      name: 'Hoodie On',
      fields: {
        pose: 'putting on hoodie or layer, smooth relaxed motion',
        camera: 'lifestyle candid angle',
      },
    },
    {
      name: 'Locker Pause',
      fields: {
        pose: 'leaning lightly, relaxed post-session presence',
        camera: 'warm recovery-area shot',
      },
    },
  ],
},
{
  id: 'gym-night-wind-down',
  worldId: 'gym-influencer-life',
  name: 'Night Wind Down',
  packId: 'gym-influencer',
  summary:
    'A final chapter built around end-of-day discipline, recovery mindset, and strong feminine stillness after performance.',
  fields: {
    location: 'home, bedroom, kitchen, or quiet post-training living space with warm end-of-day atmosphere',
    time: 'night',
    mood: 'settled, reflective, disciplined, calm',
    clothing: 'relaxed premium nightwear, hoodie, or soft post-training home styling',
  },
  sceneVariants: [
    {
      name: 'Kitchen Reset',
      fields: {
        pose: 'standing quietly in kitchen or prep area, calm recovery energy',
        camera: 'soft home lifestyle shot',
      },
    },
    {
      name: 'Bedside Sit',
      fields: {
        pose: 'sitting at bedside, end-of-day stillness',
        camera: 'side night composition',
      },
    },
    {
      name: 'Mirror Night Check',
      fields: {
        pose: 'brief end-of-day reflection, composed expression',
        camera: 'soft mirror framing',
      },
    },
    {
      name: 'Window Pause',
      fields: {
        pose: 'standing by window, quiet recovery mindset',
        camera: 'night silhouette angle',
      },
    },
  ],
},
]
