export const STORY_WORLD_AFTER_DARK = {
  id: 'after-dark',
  name: 'After Dark',
  description:
    'A cinematic world of late-night luxury — VIP club back rooms, penthouse after-parties, 3am hotel corridors, champagne and silk, the electric private world that only exists after midnight. Glamorous, slightly reckless, entirely intentional.',

  compatiblePlans: ['Fanvue', 'Unrestricted', 'Premium'],
  defaultPack: 'nightlife-luxury',
  defaultAgeRange: '22-35',

  world: {
    theme: 'After-midnight luxury — the world that exists when the city quiets down',
    status: 'the most interesting person in a room that only exists after midnight',
    tone: 'electric, slightly dangerous, glamorous, late-night warm, champagne-loose, still in control but thrillingly close to the edge',
    energy: 'the 3am energy of someone who knows exactly where they are and chose to be there — desire and glamour and low light and late',
  },

  pillars: [
    'VIP booth in a dark club — colored light, champagne',
    'penthouse after-party — skyline, scattered glasses, open balcony',
    'hotel corridor at 3am — quiet, low amber light, heels in hand',
    'private jet at night — interior lit, darkness outside',
    'casino floor — roulette, evening gown, controlled',
    'limousine or luxury car interior at night',
    'hotel room — unmade, warm lamp, midnight energy',
    'rooftop at 2am — city below, champagne, warm night air',
    'back room or private lounge — exclusive, intimate',
    'morning after — sunrise through curtains, silk, the night visible',
  ],

  recurringLocations: [
    'VIP club booth with colored ambient light',
    'penthouse party — floor-to-ceiling glass, scattered luxury',
    'hotel corridor at 3am in amber light',
    'luxury car interior at night',
    'casino — evening gown and focused energy',
    'hotel room at midnight — lamp, silk, intentional',
    'rooftop at 2am — city below and warm night air',
    'private jet interior — night outside, warm inside',
    'after-party private lounge',
    'hotel sunrise through sheer curtains',
  ],

  wardrobeWorld: [
    'evening gown — still perfect at 3am',
    'cocktail dress with something slightly undone',
    'silk slip dress on the hotel carpet',
    'tailored suit with the jacket removed',
    'luxury streetwear that belongs in both club and penthouse',
    'barely-there evening look — the bravest dress in the room',
    'silk robe in a hotel room at midnight',
    'the morning-after look — perfectly disheveled',
  ],

  chapters: [
    'vip-arrival',
    'casino-floor',
    'penthouse-party',
    'hotel-corridor',
    'rooftop-2am',
    'private-jet-night',
    'luxury-car-window',
    'midnight-hotel-room',
    'morning-after-sunrise',
    'private-lounge',
  ],

  moodSignature: 'glamorous recklessness in perfect control — she is the most alive person in any room after midnight, and she knows how this story ends',
  visualSignature: 'warm low ambient light, colored club glow, champagne and silk and night city, slow movement in late-night spaces, the particular beauty of 3am',
  colorSignature: 'warm amber hotel light, blue-violet club glow, champagne gold, night city electric below, morning rose sunrise through curtains',
}
