export const STORY_WORLD_ROCKSTAR = {
  id: 'rockstar',
  name: 'Rockstar',
  description:
    'A cinematic world of stadium energy and hotel room mythology — the stage at 80,000, the backstage before and after, the tour bus and hotel suite between cities, the particular glamour of someone who owns a stage and knows it.',

  compatiblePlans: ['Fanvue', 'Unrestricted', 'Premium'],
  defaultPack: 'rockstar-editorial',
  defaultAgeRange: '20-38',

  world: {
    theme: 'Rock and roll celebrity — stadium, backstage, hotel mythology',
    status: 'she plays stadiums — the energy of someone who is watched by 80,000 people and walks offstage still in full control',
    tone: 'electric, powerful, slightly chaotic, glamorous in the most unconventional way, the energy of someone who lives louder than everyone around them',
    energy: 'stage adrenaline and hotel room 3am — the two extremes of the rockstar world, both equally magnetic and intentional',
  },

  pillars: [
    'stadium stage — spotlight, 80,000 people invisible beyond the light',
    'backstage — mirror, makeup, chaos, composure at the center',
    'tour bus interior — moving between cities in luxury',
    'hotel suite — the mythological rockstar room',
    'guitar or microphone as prop',
    'post-show champagne backstage in full stage look',
    'soundcheck — empty arena, lone figure on stage',
    'crowd from the stage — the sea of phones',
    'tour wardrobe — leather, studs, silk, all at once',
    'hotel corridor at 4am — still in stage look',
  ],

  recurringLocations: [
    'main stage under spotlight — crowd invisible beyond',
    'backstage dressing room — mirrors, flowers, chaos',
    'empty arena at soundcheck — the power of solitude on that scale',
    'tour bus interior — moving home',
    'luxury hotel suite — the mythology of one night per city',
    'post-show backstage with champagne',
    'hotel corridor at 3am',
    'tour wardrobe room',
    'private jet between cities',
    'stage wing — watching, waiting, about to walk out',
  ],

  wardrobeWorld: [
    'full stage look — whatever that means for her',
    'leather jacket over nothing much — the classic',
    'sequin and silk combined against all rules',
    'tour merch worn as luxury item',
    'post-show — still in stage look, slightly undone',
    'tour bus casual — the most expensive casual available',
    'sound check — minimal, off-duty, still magnetic',
    'hotel robe with stage makeup still on',
  ],

  chapters: [
    'stage-spotlight',
    'soundcheck-empty',
    'backstage-preparation',
    'stage-wing-waiting',
    'post-show-champagne',
    'hotel-suite-arrival',
    'tour-bus-night',
    'hotel-corridor',
    'private-jet',
    'morning-after-hotel',
  ],

  moodSignature: 'the particular magnetic quality of someone who stands in front of 80,000 people and is completely unafraid — that energy does not leave when the show ends',
  visualSignature: 'stage spotlight against dark, backstage mirror strip, tour bus window at night, hotel suite lamp and chaos, stadium scale vs intimate backstage contrast',
  colorSignature: 'stage white spotlight, backstage warm amber, tour bus moving night blue, hotel suite gold lamp, sequin and leather mixed color',
}
