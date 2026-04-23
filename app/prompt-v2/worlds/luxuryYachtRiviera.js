export const WORLD_LUXURY_YACHT_RIVIERA = {
  id: 'luxury_yacht_riviera',
  name: 'Luxury Yacht Riviera',
  country: 'Italy / Monaco / France',
  region: 'Amalfi Coast and Riviera',
  description:
    'A high-status Mediterranean yacht world built around one persistent superyacht per story across Amalfi Coast and Monaco.',

  geography: {
    country: 'Italy / Monaco / France',
    region: 'Amalfi Coast and Riviera',
  },
  identity: {
    archetype: 'adaptable high-status luxury yacht traveler',
    vibe: [
      'persistent superyacht continuity',
      'Mediterranean yacht prestige',
      'coastal high-status mobility',
      'sun-drenched elite travel life',
      'cinematic port-to-sea luxury',
    ],
    tone: [
      'expensive',
      'cinematic',
      'mobile',
      'elegant',
      'socially magnetic',
      'sunlit',
      'refined',
      'believable',
    ],
    persona: [
      'adaptable for female male or couple identity',
      'polished',
      'high-status',
      'socially visible',
      'relaxed but elite',
      'coastal and internationally mobile',
    ],
  },

  phaseOrder: [
    'wake',
    'morning_refresh',
    'getting_dressed',
    'breakfast',
    'late_morning',
    'lunch',
    'afternoon',
    'reset',
    'golden_hour',
    'dinner',
    'evening',
    'night',
  ],

  phases: {
    wake: {
      label: 'Wake',
      timeWindows: ['early morning', 'first light', 'sunrise'],
      pacing: 'slow',
      subLocations: [
        'master-cabin',
        'owners-suite',
        'amalfi-offshore-anchor',
        'monaco-harbor-dawn',
      ],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: ['early morning', 'soft morning light'],
      pacing: 'slow',
      subLocations: [
        'master-cabin',
        'spa-bathroom',
        'owners-suite',
        'aft-beach-club',
      ],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: ['morning', 'bright indoor morning'],
      pacing: 'slow',
      subLocations: [
        'wardrobe-suite',
        'master-cabin',
        'owners-suite',
        'upper-deck-lounge',
      ],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: ['morning', 'sunlit breakfast hour'],
      pacing: 'slow',
      subLocations: [
        'breakfast-deck',
        'sun-deck-lounge',
        'amalfi-offshore-anchor',
        'monaco-harbor-dawn',
        'capri-marina-grande',
      ],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: ['late morning', 'bright coastal day'],
      pacing: 'medium',
      subLocations: [
        'positano-anchor',
        'capri-marina-grande',
        'amalfi-harbor',
        'sorrento-marina-piccola',
        'monaco-port-hercule',
        'monte-carlo-waterfront',
        'villefranche-bay',
        'eir-zephyr-sailing-line',
      ],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: ['midday', 'sunny lunch hour'],
      pacing: 'slow',
      subLocations: [
        'nerano-seaside-lunch',
        'capri-la-fontelina',
        'amalfi-harbor',
        'monaco-yacht-club-lunch',
        'fontvieille-harbor',
        'villefranche-bay',
        'eze-coastal-stop',
      ],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: ['afternoon', 'hot summer sun'],
      pacing: 'medium',
      subLocations: [
        'aft-beach-club',
        'swim-platform',
        'sun-deck-lounge',
        'positano-anchor',
        'li-galli-islands',
        'fiordo-di-furore-yacht-stop',
        'capri-faraglioni-drift',
        'monaco-offshore-cruise',
        'cap-dail-cove',
        'villefranche-bay',
      ],
    },

    reset: {
      label: 'Reset',
      timeWindows: ['late afternoon', 'cool indoor reset'],
      pacing: 'slow',
      subLocations: [
        'spa-bathroom',
        'wardrobe-suite',
        'master-cabin',
        'owners-suite',
        'upper-deck-lounge',
      ],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: ['golden hour', 'sunset'],
      pacing: 'slow',
      subLocations: [
        'sunset-rail',
        'foredeck-sunpads',
        'capri-faraglioni-drift',
        'praiano-sunset-anchor',
        'monaco-offshore-cruise',
        'cap-ferrat-sunset-line',
        'eir-zephyr-sailing-line',
      ],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: ['early night', 'candlelit evening'],
      pacing: 'slow',
      subLocations: [
        'stern-dinner-deck',
        'amalfi-harbor',
        'capri-la-fontelina',
        'monaco-yacht-club-lunch',
        'monte-carlo-terrace-dinner',
        'cap-ferrat-private-cove',
      ],
    },

    evening: {
      label: 'Evening',
      timeWindows: ['night', 'warm summer night'],
      pacing: 'medium',
      subLocations: [
        'monaco-port-hercule',
        'casino-square-arrival',
        'monte-carlo-waterfront',
        'amalfi-harbor',
        'capri-marina-grande',
        'upper-deck-lounge',
        'stern-dinner-deck',
      ],
    },

    night: {
      label: 'Night',
      timeWindows: ['late night', 'end of day'],
      pacing: 'slow',
      subLocations: [
        'night-cabin',
        'master-cabin',
        'owners-suite',
        'monaco-harbor-dawn',
        'amalfi-offshore-anchor',
      ],
    },
  },

  locations: [
    'master suite aboard a charter-famous superyacht',
    'private owner cabin with panoramic sea windows',
    'marble yacht bathroom with polished fixtures',
    'wardrobe suite with laid-out resortwear and eveningwear',
    'aft breakfast deck above calm water',
    'upper deck lounge with Riviera horizon',
    'sun deck loungers under Mediterranean light',
    'swim platform at the stern above clear water',
    'foredeck sunpads facing open sea',
    'stern dinner deck with candlelit table setting',
    'sunset rail overlooking the Riviera glow',
    'offshore anchorage near Amalfi Coast cliffs',
    'Positano anchor line beneath pastel cliffside town',
    'Capri Marina Grande arrival zone',
    'Capri Faraglioni drift line',
    'La Fontelina coastal lunch stop in Capri',
    'Nerano seaside lunch terrace accessed from tender',
    'Fiordo di Furore yacht stop near hidden cove',
    'Li Galli Islands open-water leisure zone',
    'Praiano sunset anchor line',
    'Amalfi harbor arrival and waterfront promenade',
    'Sorrento Marina Piccola transfer point',
    'Port Hercules Monaco yacht arrival zone',
    'Monte Carlo waterfront promenade and sea-facing terraces',
    'Monaco Yacht Club lunch terrace',
    'Casino Square luxury arrival route',
    'Fontvieille harbor edge with polished marina life',
    'Cap d’Ail cove near the Riviera edge',
    'Villefranche-sur-Mer bay anchorage',
    'Eze coastal stop above the sea',
    'Cap Ferrat sunset sailing line',
  ],

  subLocations: {
    'master-cabin': {
      id: 'master-cabin',
      name: 'Master Cabin',
      mapAnchor: 'On Board the Same Superyacht',
      overlays: [
        'persistent yacht identity',
        'private onboard luxury',
        'same vessel across the whole story',
      ],
      locations: [
        'master suite aboard a charter-famous superyacht',
        'private owner cabin with panoramic sea windows',
        'quiet yacht bedroom with premium linen and sea view',
        'same superyacht master cabin preserved across the full story',
      ],
    },

    'owners-suite': {
      id: 'owners-suite',
      name: 'Owner Suite',
      mapAnchor: 'On Board the Same Superyacht',
      overlays: [
        'elite owner-level privacy',
        'high-status onboard retreat',
        'same yacht continuity',
      ],
      locations: [
        'private owner cabin with panoramic sea windows',
        'owner suite corridor opening into a luxury stateroom',
        'quiet upper-deck private suite aboard the same yacht',
        'same superyacht sleeping quarters with elevated privacy',
      ],
    },

    'spa-bathroom': {
      id: 'spa-bathroom',
      name: 'Spa Bathroom',
      mapAnchor: 'On Board the Same Superyacht',
      overlays: [
        'private self-care luxury',
        'yacht spa calm',
        'same vessel interior continuity',
      ],
      locations: [
        'marble yacht bathroom with polished fixtures',
        'spa-like ensuite with ocean light reflecting off chrome details',
        'walk-in yacht shower in a refined private suite',
        'bathroom inside the same superyacht with quiet morning polish',
      ],
    },

    'wardrobe-suite': {
      id: 'wardrobe-suite',
      name: 'Wardrobe Suite',
      mapAnchor: 'On Board the Same Superyacht',
      overlays: [
        'fashion preparation at sea',
        'private styling luxury',
        'persistent yacht identity',
      ],
      locations: [
        'wardrobe suite with laid-out resortwear and eveningwear',
        'dressing area inside the same luxury yacht suite',
        'private styling room with organized travel looks',
        'mirror-and-wardrobe corner aboard the same superyacht',
      ],
    },

    'breakfast-deck': {
      id: 'breakfast-deck',
      name: 'Breakfast Deck',
      mapAnchor: 'On Board the Same Superyacht',
      overlays: [
        'sunlit deck breakfast',
        'private morning yacht leisure',
        'same vessel story anchor',
      ],
      locations: [
        'aft breakfast deck above calm water',
        'morning table on the stern deck of the same yacht',
        'sunlit breakfast corner aboard a superyacht at anchor',
        'open-air breakfast deck with soft sea movement below',
      ],
    },

    'upper-deck-lounge': {
      id: 'upper-deck-lounge',
      name: 'Upper Deck Lounge',
      mapAnchor: 'On Board the Same Superyacht',
      overlays: [
        'elevated onboard leisure',
        'private lounge prestige',
        'high-status Riviera mobility',
      ],
      locations: [
        'upper deck lounge with Riviera horizon',
        'open-air lounge above the main deck with premium seating',
        'private upper-deck relaxation area aboard the same yacht',
        'yacht lounge facing coastlines and marinas across the Riviera',
      ],
    },

    'sun-deck-lounge': {
      id: 'sun-deck-lounge',
      name: 'Sun Deck Lounge',
      mapAnchor: 'On Board the Same Superyacht',
      overlays: [
        'open-sky yacht glamour',
        'sun-drenched leisure luxury',
        'high-visibility deck lifestyle',
      ],
      locations: [
        'sun deck loungers under Mediterranean light',
        'high deck sun lounge with panoramic coast views',
        'private sundeck aboard the same superyacht',
        'sun-soaked yacht top deck with elite leisure atmosphere',
      ],
    },

    'swim-platform': {
      id: 'swim-platform',
      name: 'Swim Platform',
      mapAnchor: 'On Board the Same Superyacht',
      overlays: [
        'water-level luxury access',
        'playful offshore leisure',
        'same yacht continuity at sea',
      ],
      locations: [
        'swim platform at the stern above clear water',
        'stern platform lowered close to the sea',
        'water access point on the same charter yacht',
        'teak swim platform with open sea and tender access',
      ],
    },

    'aft-beach-club': {
      id: 'aft-beach-club',
      name: 'Aft Beach Club',
      mapAnchor: 'On Board the Same Superyacht',
      overlays: [
        'beach-club energy at sea',
        'luxury yacht leisure zone',
        'sunlit aft-deck indulgence',
      ],
      locations: [
        'aft beach club area opening toward the water',
        'stern leisure zone with daybeds and sea access',
        'teak-and-cushion aft deck built for warm-water lounging',
        'same superyacht beach-club section with open Mediterranean light',
      ],
    },

    'foredeck-sunpads': {
      id: 'foredeck-sunpads',
      name: 'Foredeck Sunpads',
      mapAnchor: 'On Board the Same Superyacht',
      overlays: [
        'open-water front-deck glamour',
        'cinematic yacht bow leisure',
        'elite daytime visibility',
      ],
      locations: [
        'foredeck sunpads facing open sea',
        'front-deck lounging area above the waterline',
        'bow sunpads with uninterrupted Riviera horizon',
        'same yacht foredeck built for cinematic afternoon leisure',
      ],
    },

    'sunset-rail': {
      id: 'sunset-rail',
      name: 'Sunset Rail',
      mapAnchor: 'On Board the Same Superyacht',
      overlays: [
        'golden-hour yachting prestige',
        'cinematic rail-side stillness',
        'same vessel sunset continuity',
      ],
      locations: [
        'sunset rail overlooking the Riviera glow',
        'side rail on the same yacht in warm falling light',
        'golden-hour edge of deck above reflective water',
        'elevated yacht rail facing coastline and marina lights',
      ],
    },

    'stern-dinner-deck': {
      id: 'stern-dinner-deck',
      name: 'Stern Dinner Deck',
      mapAnchor: 'On Board the Same Superyacht',
      overlays: [
        'candlelit yacht dining',
        'refined onboard intimacy',
        'same yacht after-dark elegance',
      ],
      locations: [
        'stern dinner deck with candlelit table setting',
        'aft dining area on the same yacht under warm ambient light',
        'outdoor superyacht dinner table above dark water',
        'private evening dining deck with polished service and low glow',
      ],
    },

    'night-cabin': {
      id: 'night-cabin',
      name: 'Night Cabin',
      mapAnchor: 'On Board the Same Superyacht',
      overlays: [
        'private yacht night return',
        'deep after-dark softness',
        'same vessel bedtime continuity',
      ],
      locations: [
        'night cabin aboard the same superyacht',
        'quiet yacht bedroom after a long Riviera day',
        'soft-lit stateroom with cooled air and sea silence',
        'final private interior scene on the same vessel',
      ],
    },

    'amalfi-offshore-anchor': {
      id: 'amalfi-offshore-anchor',
      name: 'Amalfi Offshore Anchorage',
      mapAnchor: 'Off Amalfi Coast, Italy',
      overlays: [
        'Amalfi offshore prestige',
        'cliffside waterline luxury',
        'Mediterranean open-sea elegance',
      ],
      locations: [
        'offshore anchorage near Amalfi Coast cliffs',
        'calm morning water below the Amalfi coastline',
        'same yacht resting off a dramatic Italian shore',
        'private anchorage with cliffs, villas, and morning sea air',
      ],
    },

    'positano-anchor': {
      id: 'positano-anchor',
      name: 'Positano Anchor Line',
      mapAnchor: 'Positano, Amalfi Coast',
      overlays: [
        'iconic Amalfi yacht arrival',
        'pastel cliffside visibility',
        'luxury sea-to-town transition',
      ],
      locations: [
        'Positano anchor line beneath pastel cliffside town',
        'same yacht resting offshore from Positano',
        'waterline view toward stacked houses and terraces',
        'arrival zone below Positano with tender-ready positioning',
      ],
    },

    'capri-marina-grande': {
      id: 'capri-marina-grande',
      name: 'Capri Marina Grande',
      mapAnchor: 'Capri, Italy',
      overlays: [
        'Capri arrival prestige',
        'marina-side summer visibility',
        'fashionable island yacht life',
      ],
      locations: [
        'Capri Marina Grande arrival zone',
        'same yacht arriving near Capri harbor activity',
        'island marina line with polished tenders and summer traffic',
        'Capri sea-to-land arrival point with visible luxury energy',
      ],
    },

    'capri-faraglioni-drift': {
      id: 'capri-faraglioni-drift',
      name: 'Capri Faraglioni Drift',
      mapAnchor: 'Faraglioni, Capri',
      overlays: [
        'iconic rock-formation glamour',
        'cinematic yacht drift line',
        'open-water Capri prestige',
      ],
      locations: [
        'Capri Faraglioni drift line',
        'same yacht idling near the Faraglioni rocks',
        'open-water leisure zone beside Capri’s iconic stone formations',
        'golden sea track facing the Faraglioni in cinematic light',
      ],
    },

    'capri-la-fontelina': {
      id: 'capri-la-fontelina',
      name: 'La Fontelina Coastal Stop',
      mapAnchor: 'Capri, Italy',
      overlays: [
        'famous Capri lunch glamour',
        'sunlit coastal social prestige',
        'iconic island leisure stop',
      ],
      locations: [
        'La Fontelina coastal lunch stop in Capri',
        'seaside restaurant approach near Capri’s cliffs',
        'same yacht-linked stop for an elegant island lunch',
        'lunch terrace and swim-adjacent Capri leisure zone',
      ],
    },

    'nerano-seaside-lunch': {
      id: 'nerano-seaside-lunch',
      name: 'Nerano Seaside Lunch',
      mapAnchor: 'Nerano, Amalfi Coast',
      overlays: [
        'long-lunch coastal indulgence',
        'tender-to-table elegance',
        'Mediterranean yacht dining culture',
      ],
      locations: [
        'Nerano seaside lunch terrace accessed from tender',
        'same-yacht lunch stop at a refined Nerano restaurant',
        'white-tablecloth lunch terrace beside clear water',
        'midday anchorage-to-lunch scene in Nerano',
      ],
    },

    'fiordo-di-furore-yacht-stop': {
      id: 'fiordo-di-furore-yacht-stop',
      name: 'Fiordo di Furore Yacht Stop',
      mapAnchor: 'Fiordo di Furore, Amalfi Coast',
      overlays: [
        'hidden-cove yacht discovery',
        'dramatic cliff-and-water seclusion',
        'cinematic Mediterranean escape',
      ],
      locations: [
        'Fiordo di Furore yacht stop near hidden cove',
        'same yacht positioned near a narrow cliffside inlet',
        'stone-and-water discovery zone beneath dramatic rock',
        'quiet yacht-side stop beside one of the Amalfi coast’s hidden coves',
      ],
    },

    'li-galli-islands': {
      id: 'li-galli-islands',
      name: 'Li Galli Islands Leisure Zone',
      mapAnchor: 'Li Galli Islands, Amalfi Coast',
      overlays: [
        'open-water Amalfi prestige',
        'private island-adjacent glamour',
        'sun-soaked offshore escape',
      ],
      locations: [
        'Li Galli Islands open-water leisure zone',
        'same yacht drifting near the Li Galli islands',
        'clear-water leisure area between elite coastal stops',
        'high-status offshore swim and sun line near the islands',
      ],
    },

    'praiano-sunset-anchor': {
      id: 'praiano-sunset-anchor',
      name: 'Praiano Sunset Anchor',
      mapAnchor: 'Praiano, Amalfi Coast',
      overlays: [
        'sunset anchor-line romance',
        'private golden-hour calm',
        'Amalfi evening prestige at sea',
      ],
      locations: [
        'Praiano sunset anchor line',
        'same yacht facing the coast as the light turns gold',
        'private pre-dinner anchorage near Praiano',
        'warm evening sea line with coastline glow behind',
      ],
    },

    'amalfi-harbor': {
      id: 'amalfi-harbor',
      name: 'Amalfi Harbor',
      mapAnchor: 'Amalfi Town, Italy',
      overlays: [
        'historic harbor arrival',
        'old-town yacht visibility',
        'Italian port elegance',
      ],
      locations: [
        'Amalfi harbor arrival and waterfront promenade',
        'same yacht or tender arrival beside Amalfi’s historic harbor',
        'harbor-side entry point with stone waterfront and visible summer movement',
        'old-town sea arrival leading into Amalfi’s elegant public life',
      ],
    },

    'sorrento-marina-piccola': {
      id: 'sorrento-marina-piccola',
      name: 'Sorrento Marina Piccola',
      mapAnchor: 'Sorrento, Italy',
      overlays: [
        'transfer-point sophistication',
        'structured marina movement',
        'sunlit destination arrival',
      ],
      locations: [
        'Sorrento Marina Piccola transfer point',
        'same yacht-linked arrival line beside Sorrento’s marina activity',
        'coastal marina access route under bright Mediterranean light',
        'stylish sea-to-town transfer stop in Sorrento',
      ],
    },

    'monaco-port-hercule': {
      id: 'monaco-port-hercule',
      name: 'Port Hercules Monaco',
      mapAnchor: 'Monaco',
      overlays: [
        'Monaco marina prestige',
        'ultra-visible yacht status',
        'billionaire harbor energy',
      ],
      locations: [
        'Port Hercules Monaco yacht arrival zone',
        'same superyacht positioned among elite Monaco vessels',
        'Monaco harbor line with city architecture rising behind',
        'high-status marina arrival in one of the world’s most visible yacht settings',
      ],
    },

    'monaco-harbor-dawn': {
      id: 'monaco-harbor-dawn',
      name: 'Monaco Harbor Dawn',
      mapAnchor: 'Monaco',
      overlays: [
        'quiet Monaco morning prestige',
        'still-water superyacht calm',
        'private dawn before visibility rises',
      ],
      locations: [
        'Monaco harbor at dawn from the same yacht',
        'calm first-light harbor scene inside Port Hercules',
        'quiet elite marina before the day fully opens',
        'same superyacht in Monaco under pale morning architecture light',
      ],
    },

    'monte-carlo-waterfront': {
      id: 'monte-carlo-waterfront',
      name: 'Monte Carlo Waterfront',
      mapAnchor: 'Monte Carlo, Monaco',
      overlays: [
        'Riviera street-and-sea polish',
        'public-facing luxury movement',
        'elevated Monte Carlo visibility',
      ],
      locations: [
        'Monte Carlo waterfront promenade and sea-facing terraces',
        'same-yacht shore stop entering Monte Carlo’s polished waterfront',
        'Riviera walkway lined with luxury frontage and open sea views',
        'visible high-status promenade in Monte Carlo',
      ],
    },

    'monaco-yacht-club-lunch': {
      id: 'monaco-yacht-club-lunch',
      name: 'Monaco Yacht Club Lunch',
      mapAnchor: 'Yacht Club de Monaco, Monaco',
      overlays: [
        'club-level prestige',
        'formal-but-relaxed marina elegance',
        'Monaco daytime refinement',
      ],
      locations: [
        'Monaco Yacht Club lunch terrace',
        'sea-facing table near the harbor in Monaco',
        'same-yacht-linked lunch stop at an elite marina institution',
        'midday dining scene overlooking superyachts in Monaco',
      ],
    },

    'casino-square-arrival': {
      id: 'casino-square-arrival',
      name: 'Casino Square Arrival',
      mapAnchor: 'Casino Square, Monaco',
      overlays: [
        'landside prestige escalation',
        'Monaco social visibility',
        'ultra-luxury destination arrival',
      ],
      locations: [
        'Casino Square luxury arrival route',
        'shore-side transition from yacht world into Monaco iconography',
        'elegant arrival point near Casino Square with polished evening movement',
        'high-status Monaco land arrival with cinematic visibility',
      ],
    },

    'fontvieille-harbor': {
      id: 'fontvieille-harbor',
      name: 'Fontvieille Harbor',
      mapAnchor: 'Fontvieille, Monaco',
      overlays: [
        'quieter Monaco marina luxury',
        'refined harbor-side calm',
        'controlled elite visibility',
      ],
      locations: [
        'Fontvieille harbor edge with polished marina life',
        'same-yacht stop near Monaco’s more relaxed harbor zone',
        'waterfront harbor setting with refined architecture and calmer rhythm',
        'daytime or lunch transition point along Fontvieille',
      ],
    },

    'cap-dail-cove': {
      id: 'cap-dail-cove',
      name: 'Cap d’Ail Cove',
      mapAnchor: 'Cap d’Ail, France',
      overlays: [
        'Riviera cove privacy',
        'offshore glamour near Monaco',
        'clear-water afternoon escape',
      ],
      locations: [
        'Cap d’Ail cove near the Riviera edge',
        'same yacht anchored off Cap d’Ail in vivid afternoon light',
        'clear-water cove used for swim-platform leisure near Monaco',
        'quiet French Riviera sea stop with controlled exclusivity',
      ],
    },

    'villefranche-bay': {
      id: 'villefranche-bay',
      name: 'Villefranche Bay',
      mapAnchor: 'Villefranche-sur-Mer, France',
      overlays: [
        'beautiful bay anchorage',
        'French Riviera softness',
        'sunlit coastal anchoring prestige',
      ],
      locations: [
        'Villefranche-sur-Mer bay anchorage',
        'same yacht resting in a beautiful Riviera bay',
        'curved bay line with polished coastal architecture',
        'lunch or afternoon anchorage in soft French Mediterranean light',
      ],
    },

    'eze-coastal-stop': {
      id: 'eze-coastal-stop',
      name: 'Eze Coastal Stop',
      mapAnchor: 'Eze, France',
      overlays: [
        'elevated coastal prestige',
        'Riviera road-and-sea elegance',
        'romantic hillside luxury',
      ],
      locations: [
        'Eze coastal stop above the sea',
        'same-yacht-linked Riviera stop near Eze’s dramatic coastline',
        'elegant coastal access point beneath steep hillside beauty',
        'Mediterranean stop combining sea prestige and cliffside refinement',
      ],
    },

    'cap-ferrat-sunset-line': {
      id: 'cap-ferrat-sunset-line',
      name: 'Cap Ferrat Sunset Line',
      mapAnchor: 'Saint-Jean-Cap-Ferrat, France',
      overlays: [
        'sunset Riviera prestige',
        'sailing-line elegance',
        'elite coastal glow',
      ],
      locations: [
        'Cap Ferrat sunset sailing line',
        'same yacht tracing golden water along Cap Ferrat',
        'sunset route beside one of the Riviera’s most prestigious shorelines',
        'glowing evening waterline beneath Cap Ferrat villas',
      ],
    },

    'eir-zephyr-sailing-line': {
      id: 'eir-zephyr-sailing-line',
      name: 'Open Riviera Sailing Line',
      mapAnchor: 'Mediterranean Between Amalfi and Monaco',
      overlays: [
        'pure yacht mobility',
        'open-water narrative continuity',
        'same vessel in motion across the story',
      ],
      locations: [
        'open Riviera sailing line between major stops',
        'same yacht in active motion under full Mediterranean light',
        'water-only movement scene preserving the vessel identity',
        'offshore transition line where the yacht itself becomes the destination',
      ],
    },

    'monte-carlo-terrace-dinner': {
      id: 'monte-carlo-terrace-dinner',
      name: 'Monte Carlo Terrace Dinner',
      mapAnchor: 'Monte Carlo, Monaco',
      overlays: [
        'Monaco after-dark refinement',
        'terrace dining prestige',
        'high-status public elegance',
      ],
      locations: [
        'Monte Carlo terrace dinner above marina lights',
        'same-yacht-linked evening meal on land in Monaco',
        'candlelit dinner terrace with polished Monte Carlo glow',
        'refined sea-view restaurant scene in the Riviera night',
      ],
    },

    'cap-ferrat-private-cove': {
      id: 'cap-ferrat-private-cove',
      name: 'Cap Ferrat Private Cove',
      mapAnchor: 'Saint-Jean-Cap-Ferrat, France',
      overlays: [
        'quiet late-day Riviera luxury',
        'private cove refinement',
        'elite coastal intimacy',
      ],
      locations: [
        'private cove near Cap Ferrat under soft evening light',
        'same yacht set off a quieter prestigious Riviera edge',
        'intimate dinner-adjacent or evening anchorage near Cap Ferrat',
        'coastal cove for a softer elite transition into night',
      ],
    },
  },

  sceneGroups: {
    'master-cabin': [
      {
        id: 'wake-onboard',
        name: 'Wake Onboard',
        phases: ['wake'],
        scenes: [
          'waking up inside the same superyacht master cabin',
          'slow first-light moment in a private stateroom at sea',
          'lying in bed aboard the same yacht before the day begins',
          'quiet wake-up with sea light moving across luxury bedding',
        ],
      },
      {
        id: 'night-return-cabin',
        name: 'Night Return Cabin',
        phases: ['night'],
        scenes: [
          'returning to the same yacht cabin after a full Riviera day',
          'ending the story back inside the same vessel',
          'late-night private calm in a cooled superyacht cabin',
          'final onboard stillness with the harbor or sea beyond the windows',
        ],
      },
    ],

    'owners-suite': [
      {
        id: 'owner-suite-wake',
        name: 'Owner Suite Wake',
        phases: ['wake'],
        scenes: [
          'opening the day in the owner suite of the same yacht',
          'slow morning in a private upper-deck suite at sea',
          'first-light quiet in the owner quarters aboard the same vessel',
          'luxury wake-up scene preserved inside the same yacht identity',
        ],
      },
      {
        id: 'private-night-softness',
        name: 'Private Night Softness',
        phases: ['night'],
        scenes: [
          'withdrawing back into the owner suite at the end of the night',
          'private after-dark silence inside the same yacht',
          'soft final moment in the most secluded part of the vessel',
          'ending the story in elite private calm aboard the same superyacht',
        ],
      },
    ],

    'spa-bathroom': [
      {
        id: 'morning-routine-yacht',
        name: 'Morning Routine',
        phases: ['morning_refresh'],
        scenes: [
          'washing face in the same yacht’s marble bathroom',
          'post-sleep self-care in a private yacht ensuite',
          'stepping through a refined onboard shower and skincare routine',
          'quiet morning refresh inside the same vessel',
        ],
      },
      {
        id: 'reset-routine-yacht',
        name: 'Reset Routine',
        phases: ['reset'],
        scenes: [
          'cooling down after the sun in the same yacht bathroom',
          'afternoon-to-evening reset inside a spa-like onboard space',
          'freshening up after sea and sun before dinner',
          'private shower and grooming reset aboard the same yacht',
        ],
      },
    ],

    'wardrobe-suite': [
      {
        id: 'dressing-morning',
        name: 'Morning Dressing',
        phases: ['getting_dressed'],
        scenes: [
          'choosing the first outfit of the day aboard the same yacht',
          'getting dressed in a private wardrobe suite at sea',
          'styling into a polished Riviera daytime look',
          'mirror-side preparation before stepping into the day’s first destination',
        ],
      },
      {
        id: 'evening-change',
        name: 'Evening Change',
        phases: ['reset'],
        scenes: [
          'changing into a more elevated evening look aboard the same yacht',
          'pre-dinner styling transition in the yacht dressing area',
          'moving from sun-heavy leisurewear into polished night styling',
          'using private yacht calm to rebuild the mood before sunset and dinner',
        ],
      },
    ],

    'breakfast-deck': [
      {
        id: 'onboard-breakfast',
        name: 'Onboard Breakfast',
        phases: ['breakfast'],
        scenes: [
          'breakfast on the same yacht’s aft deck',
          'slow espresso and fruit above calm Mediterranean water',
          'quiet morning meal on board before moving into the world',
          'sunlit breakfast scene with the same vessel anchored in elegance',
        ],
      },
    ],

    'upper-deck-lounge': [
      {
        id: 'soft-onboard-pause',
        name: 'Soft Onboard Pause',
        phases: ['getting_dressed', 'reset', 'evening'],
        scenes: [
          'pausing in the upper deck lounge before heading ashore',
          'resting in elevated onboard calm between public destinations',
          'soft lounge stillness above the sea on the same yacht',
          'private high-status pause in an upper deck seating area',
        ],
      },
    ],

    'sun-deck-lounge': [
      {
        id: 'sun-deck-leisure',
        name: 'Sun Deck Leisure',
        phases: ['breakfast', 'afternoon'],
        scenes: [
          'resting on the same yacht’s sun deck in strong Mediterranean light',
          'moving through open-sky luxury leisure above the water',
          'sunlit yacht lounging before or after a destination stop',
          'high deck summer stillness on the same superyacht',
        ],
      },
    ],

    'swim-platform': [
      {
        id: 'swim-platform-transition',
        name: 'Swim Platform Transition',
        phases: ['afternoon'],
        scenes: [
          'stepping down to the swim platform of the same yacht',
          'transitioning from deck leisure into clear-water movement',
          'preparing to swim from the stern platform under strong sun',
          'water-level luxury access scene on the same superyacht',
        ],
      },
      {
        id: 'return-from-water',
        name: 'Return From Water',
        phases: ['afternoon'],
        scenes: [
          'coming back up from the water to the swim platform',
          'post-swim recovery on the stern teak platform',
          'ending a clear-water moment at the edge of the same yacht',
          'wet-skin-after-water transition into deck leisure',
        ],
      },
    ],

    'aft-beach-club': [
      {
        id: 'aft-club-leisure',
        name: 'Aft Club Leisure',
        phases: ['afternoon'],
        scenes: [
          'settling into the aft beach-club zone of the same yacht',
          'stretching out in a water-facing yacht leisure area',
          'afternoon warmth and relaxed prestige at the stern',
          'beach-club-at-sea scene built around the same vessel',
        ],
      },
    ],

    'foredeck-sunpads': [
      {
        id: 'foredeck-glamour',
        name: 'Foredeck Glamour',
        phases: ['golden_hour', 'afternoon'],
        scenes: [
          'lounging on the foredeck sunpads with open sea ahead',
          'bow-side glamour on the same yacht in high summer light',
          'front-deck stillness facing the coastline or open horizon',
          'cinematic foredeck pause on the same superyacht',
        ],
      },
    ],

    'sunset-rail': [
      {
        id: 'rail-golden-hour',
        name: 'Rail Golden Hour',
        phases: ['golden_hour'],
        scenes: [
          'holding the rail at golden hour on the same yacht',
          'quiet sunset stillness above glowing water',
          'watching the coast shift into evening from the side deck',
          'cinematic sunset pause preserving the same vessel across the story',
        ],
      },
    ],

    'stern-dinner-deck': [
      {
        id: 'onboard-dinner',
        name: 'Onboard Dinner',
        phases: ['dinner'],
        scenes: [
          'candlelit dinner on the stern deck of the same yacht',
          'slow elegant meal above darkening water',
          'warm table light and polished service on board',
          'refined evening dining scene anchored to the same superyacht',
        ],
      },
      {
        id: 'after-dinner-onboard',
        name: 'After Dinner Onboard',
        phases: ['evening'],
        scenes: [
          'lingering after dinner on the stern deck',
          'remaining in the warm after-dark atmosphere aboard the same yacht',
          'quiet conversation and soft light after the meal',
          'letting the onboard dinner scene naturally extend into evening',
        ],
      },
    ],

    'positano-anchor': [
      {
        id: 'positano-arrival',
        name: 'Positano Arrival',
        phases: ['late_morning'],
        scenes: [
          'approaching Positano on the same yacht',
          'anchoring below Positano’s cliffside town',
          'first clear view of Positano from the water',
          'sea-to-town arrival beneath pastel terraces and houses',
        ],
      },
      {
        id: 'positano-water-pause',
        name: 'Positano Water Pause',
        phases: ['afternoon'],
        scenes: [
          'remaining offshore from Positano in bright afternoon light',
          'taking in the coast from the anchored yacht below Positano',
          'leisure pause with the town rising above the waterline',
          'soft offshore glamour beneath Positano’s famous cliffs',
        ],
      },
    ],

    'capri-marina-grande': [
      {
        id: 'capri-arrival',
        name: 'Capri Arrival',
        phases: ['late_morning', 'breakfast'],
        scenes: [
          'arriving into Capri Marina Grande from the same yacht',
          'beginning a Capri stop with marina-side visibility',
          'coming into Capri with controlled summer prestige',
          'sea-to-island arrival with polished tenders and harbor motion',
        ],
      },
      {
        id: 'capri-evening-marina',
        name: 'Capri Evening Marina',
        phases: ['evening'],
        scenes: [
          'moving through Capri’s marina atmosphere after sunset',
          'lingering near the island harbor as the night warms up',
          'soft after-dark Capri visibility linked to the same yacht',
          'evening marina glow before returning on board',
        ],
      },
    ],

    'capri-faraglioni-drift': [
      {
        id: 'faraglioni-golden-hour',
        name: 'Faraglioni Golden Hour',
        phases: ['golden_hour'],
        scenes: [
          'drifting near the Faraglioni as the light turns gold',
          'watching Capri’s iconic rock formations from the same yacht',
          'golden-hour open-water stillness beside the Faraglioni',
          'cinematic Capri sea moment before the evening begins',
        ],
      },
      {
        id: 'faraglioni-afternoon',
        name: 'Faraglioni Afternoon',
        phases: ['afternoon'],
        scenes: [
          'cruising or idling near the Faraglioni in strong afternoon sun',
          'playful open-water leisure in one of Capri’s most iconic zones',
          'yacht-side movement beside the Faraglioni rocks',
          'clear-water prestige scene anchored to Capri’s signature coastline',
        ],
      },
    ],

    'capri-la-fontelina': [
      {
        id: 'fontelina-lunch',
        name: 'La Fontelina Lunch',
        phases: ['lunch', 'dinner'],
        scenes: [
          'long island-side lunch near La Fontelina',
          'seaside dining stop connected to the same yacht’s Capri route',
          'settling into a famous Capri coastal meal',
          'restaurant-and-sea leisure scene beside Capri rock and water',
        ],
      },
    ],

    'nerano-seaside-lunch': [
      {
        id: 'nerano-lunch',
        name: 'Nerano Lunch',
        phases: ['lunch'],
        scenes: [
          'arriving by tender for a long Nerano lunch',
          'seaside lunch in Nerano after a yacht morning',
          'lingering over a coastal Italian meal by the water',
          'refined lunch transition from yacht life into table-side Amalfi pleasure',
        ],
      },
      {
        id: 'nerano-table-pause',
        name: 'Nerano Table Pause',
        phases: ['lunch'],
        scenes: [
          'settled into an elegant Nerano table scene',
          'slow midday indulgence with sea breeze and white linen',
          'holding the lunch rhythm without rushing the story forward',
          'Mediterranean lunch atmosphere with the yacht waiting offshore',
        ],
      },
    ],

    'fiordo-di-furore-yacht-stop': [
      {
        id: 'furore-cove-arrival',
        name: 'Furore Cove Arrival',
        phases: ['afternoon'],
        scenes: [
          'discovering Fiordo di Furore from the same yacht',
          'approaching a dramatic hidden inlet by sea',
          'slowing near a cliff-cut cove along the Amalfi Coast',
          'water-level arrival into one of the coast’s most cinematic hidden spots',
        ],
      },
      {
        id: 'furore-water-leisure',
        name: 'Furore Water Leisure',
        phases: ['afternoon'],
        scenes: [
          'taking in the cove and water from just off the inlet',
          'offshore leisure beside dramatic rock walls',
          'quiet exploratory yacht moment near Fiordo di Furore',
          'sunlit cove-side prestige in a more hidden Amalfi setting',
        ],
      },
    ],

    'li-galli-islands': [
      {
        id: 'li-galli-leisure',
        name: 'Li Galli Leisure',
        phases: ['afternoon'],
        scenes: [
          'resting or drifting near the Li Galli islands',
          'open-water leisure in a prestigious offshore zone',
          'clear-water afternoon glamour near the islands',
          'same-yacht escape between major coastal stops',
        ],
      },
    ],

    'praiano-sunset-anchor': [
      {
        id: 'praiano-sunset',
        name: 'Praiano Sunset',
        phases: ['golden_hour'],
        scenes: [
          'anchoring near Praiano as the sky turns warm',
          'quiet pre-dinner moment off the coast of Praiano',
          'sunset pause on the same yacht near a glowing Amalfi shoreline',
          'private golden-hour anchor line with warm sea reflections',
        ],
      },
    ],

    'amalfi-harbor': [
      {
        id: 'amalfi-arrival',
        name: 'Amalfi Arrival',
        phases: ['late_morning', 'lunch'],
        scenes: [
          'coming into Amalfi harbor from the same yacht',
          'old-town sea arrival with visible summer movement',
          'harbor-side transition into Amalfi’s historic public energy',
          'arriving in Amalfi through a polished yacht-linked route',
        ],
      },
      {
        id: 'amalfi-evening',
        name: 'Amalfi Evening',
        phases: ['evening', 'dinner'],
        scenes: [
          'remaining in Amalfi as the harbor moves into night',
          'after-dark harbor elegance linked to the same yacht story',
          'soft waterfront movement under warm Italian night light',
          'letting the historic harbor hold the evening for a little longer',
        ],
      },
    ],

    'sorrento-marina-piccola': [
      {
        id: 'sorrento-transfer',
        name: 'Sorrento Transfer',
        phases: ['late_morning'],
        scenes: [
          'moving through Sorrento Marina Piccola from the same yacht',
          'structured sea-to-town transition in Sorrento',
          'using the marina as a polished transfer point',
          'Riviera-style arrival with bright port movement and control',
        ],
      },
    ],

    'monaco-port-hercule': [
      {
        id: 'monaco-arrival',
        name: 'Monaco Arrival',
        phases: ['late_morning', 'evening'],
        scenes: [
          'arriving into Port Hercules Monaco on the same yacht',
          'entering Monaco’s most visible yacht setting',
          'marina approach among elite vessels and architecture',
          'high-status harbor arrival with unmistakable Monaco energy',
        ],
      },
      {
        id: 'monaco-night-harbor',
        name: 'Monaco Night Harbor',
        phases: ['evening'],
        scenes: [
          'remaining in Port Hercules after dark',
          'after-dinner harbor atmosphere in Monaco',
          'moving through the glow of one of the world’s most famous marinas',
          'soft night visibility while the same yacht remains the anchor of the story',
        ],
      },
    ],

    'monaco-harbor-dawn': [
      {
        id: 'monaco-dawn-stillness',
        name: 'Monaco Dawn Stillness',
        phases: ['wake', 'breakfast', 'night'],
        scenes: [
          'quiet first light in Monaco harbor from the same yacht',
          'waking into Port Hercules before the day becomes visible',
          'private dawn aboard the yacht with Monaco rising outside',
          'slow harbor morning in an ultra-prestige setting',
        ],
      },
    ],

    'monte-carlo-waterfront': [
      {
        id: 'monte-carlo-stroll',
        name: 'Monte Carlo Stroll',
        phases: ['late_morning', 'evening'],
        scenes: [
          'walking through Monte Carlo’s waterfront atmosphere',
          'shore-side public movement after arriving from the same yacht',
          'Riviera promenade visibility with polished confidence',
          'elegant Monte Carlo exploration in a highly visible setting',
        ],
      },
    ],

    'monaco-yacht-club-lunch': [
      {
        id: 'club-lunch',
        name: 'Club Lunch',
        phases: ['lunch', 'dinner'],
        scenes: [
          'lunch at the Monaco Yacht Club terrace',
          'club-level dining scene overlooking the marina',
          'settling into refined Monaco midday elegance',
          'yacht-culture lunch with the same vessel continuity preserved',
        ],
      },
    ],

    'casino-square-arrival': [
      {
        id: 'casino-square-evening',
        name: 'Casino Square Evening',
        phases: ['evening'],
        scenes: [
          'arriving near Casino Square after coming ashore from the yacht',
          'elevating the story from marina life into Monaco iconography',
          'gliding into one of the Riviera’s most visible evening settings',
          'landside luxury arrival without losing the yacht-rooted continuity',
        ],
      },
    ],

    'fontvieille-harbor': [
      {
        id: 'fontvieille-lunch-stop',
        name: 'Fontvieille Lunch Stop',
        phases: ['lunch', 'late_morning'],
        scenes: [
          'pause near Fontvieille harbor during the day route',
          'using Monaco’s calmer marina zone for a softer luxury stop',
          'refined harbor movement away from heavier visibility',
          'quietly elite waterfront transition in Fontvieille',
        ],
      },
    ],

    'cap-dail-cove': [
      {
        id: 'cap-dail-afternoon',
        name: 'Cap d’Ail Afternoon',
        phases: ['afternoon'],
        scenes: [
          'anchoring off Cap d’Ail for clear-water afternoon leisure',
          'using a Riviera cove for a quieter water-side scene',
          'same yacht pause near Monaco in a more private sea setting',
          'sun-heavy cove leisure with refined French Riviera softness',
        ],
      },
    ],

    'villefranche-bay': [
      {
        id: 'villefranche-lunch-afternoon',
        name: 'Villefranche Bay Leisure',
        phases: ['lunch', 'afternoon'],
        scenes: [
          'anchoring in Villefranche bay for a beautiful daytime pause',
          'soft Riviera lunch or afternoon scene in a curved bay anchorage',
          'beautiful bay stillness with elite Mediterranean polish',
          'same-yacht leisure stop in one of the Riviera’s most visually appealing bays',
        ],
      },
    ],

    'eze-coastal-stop': [
      {
        id: 'eze-coastal-lunch',
        name: 'Eze Coastal Lunch',
        phases: ['lunch'],
        scenes: [
          'coastal stop beneath Eze during the day’s route',
          'Riviera lunch transition at a dramatic hillside-sea setting',
          'high-status midday stop near one of the coast’s most elevated landscapes',
          'softly romantic sea-linked lunch movement near Eze',
        ],
      },
    ],

    'cap-ferrat-sunset-line': [
      {
        id: 'cap-ferrat-sunset',
        name: 'Cap Ferrat Sunset',
        phases: ['golden_hour'],
        scenes: [
          'sailing past Cap Ferrat in the last warm light',
          'golden-hour Riviera glide along a prestigious shoreline',
          'same yacht cutting through sunset water near Cap Ferrat',
          'cinematic moving-water moment before dinner and night',
        ],
      },
    ],

    'eir-zephyr-sailing-line': [
      {
        id: 'open-water-transition',
        name: 'Open Water Transition',
        phases: ['late_morning', 'golden_hour'],
        scenes: [
          'open-water movement between major Riviera stops',
          'letting the same yacht carry the whole story forward',
          'offshore travel scene where the vessel becomes the world itself',
          'pure sailing-line continuity between coastlines and destinations',
        ],
      },
    ],

    'monte-carlo-terrace-dinner': [
      {
        id: 'monte-carlo-dinner',
        name: 'Monte Carlo Dinner',
        phases: ['dinner'],
        scenes: [
          'dinner on a Monte Carlo terrace after arriving from the yacht',
          'candlelit Monaco restaurant scene with polished sea-adjacent glow',
          'elegant evening meal in a visibly high-status setting',
          'after-sunset refinement on land while the yacht remains the central story anchor',
        ],
      },
    ],

    'cap-ferrat-private-cove': [
      {
        id: 'cap-ferrat-evening-cove',
        name: 'Cap Ferrat Evening Cove',
        phases: ['dinner', 'evening'],
        scenes: [
          'soft evening anchorage near a private Cap Ferrat cove',
          'quieter elite Riviera moment before the night fully closes',
          'letting the same yacht hold a more intimate evening line near Cap Ferrat',
          'private-cove elegance at the edge of the Riviera night',
        ],
      },
    ],
  },

  sceneVariants: {
    wake: [
      'waking up inside the same superyacht master cabin',
      'slow first-light moment in a private stateroom at sea',
      'opening the day aboard the same yacht before anyone else is visible',
      'quiet wake-up with harbor or open water beyond the windows',
      'lying in bed on the same vessel as the Mediterranean day begins',
    ],

    morning_refresh: [
      'washing face in the yacht’s marble bathroom',
      'post-sleep self-care inside a private onboard ensuite',
      'stepping through a shower and grooming routine at sea',
      'resetting into freshness in a spa-like yacht bathroom',
      'moving from sleep into polish aboard the same vessel',
    ],

    getting_dressed: [
      'choosing the first full look of the day in the yacht wardrobe suite',
      'buttoning into polished Riviera daywear aboard the same vessel',
      'styling into an elegant day identity before stepping ashore',
      'mirror-side preparation inside the same superyacht',
      'changing from private morning softness into visible luxury polish',
    ],

    breakfast: [
      'breakfast on the same yacht’s sunlit deck',
      'slow espresso and fruit above calm Mediterranean water',
      'quiet morning table scene before the first destination arrival',
      'light breakfast on board with coastlines or marinas ahead',
      'morning meal on the stern or breakfast deck of the same yacht',
    ],

    late_morning: [
      'approaching Positano or Capri from the same yacht',
      'arriving into Monaco or Amalfi with polished harbor visibility',
      'moving from yacht privacy into a visible destination setting',
      'late-morning sea-to-shore transition in the Riviera sun',
      'open-water travel or marina arrival on the same superyacht',
    ],

    lunch: [
      'long seaside lunch after arriving from the yacht',
      'club-level marina lunch in Monaco',
      'slow coastal lunch stop in Nerano Capri or along the Riviera',
      'white-tablecloth midday pause linked to the same vessel',
      'settling into an elegant lunch scene above the water',
    ],

    afternoon: [
      'sun-deck leisure on the same yacht under strong sun',
      'swim-platform movement into clear Mediterranean water',
      'offshore yacht pause near cliffs coves or bays',
      'resting at the aft beach-club zone after lunch',
      'playful open-water luxury around the same vessel',
    ],

    reset: [
      'returning inside the yacht to cool down after the sun',
      'private shower and wardrobe reset before evening',
      'changing into a more elevated pre-dinner look aboard the same vessel',
      'quiet indoor calm between the day route and the night route',
      'using the yacht as a private transformation space before sunset',
    ],

    golden_hour: [
      'holding the rail as the Riviera turns gold',
      'slow sailing line past cliffs marinas or prestigious shoreline',
      'sunset stillness on the same yacht before the evening begins',
      'pre-dinner pause at sea in cinematic warm light',
      'golden-hour leisure near Capri Praiano or Cap Ferrat',
    ],

    dinner: [
      'candlelit dinner on the stern deck of the same yacht',
      'elegant meal on shore in Monaco or along the coast',
      'refined evening dining scene after a full day of yacht movement',
      'wine and conversation with sea or marina light beyond',
      'slow luxurious dinner tied back to the same superyacht story',
    ],

    evening: [
      'walking through Monaco Amalfi or Capri after dark',
      'remaining in the warm after-dinner atmosphere aboard the yacht',
      'soft harbor or waterfront visibility at night',
      'late-evening continuation of the same yacht-rooted lifestyle',
      'night promenade or deck-lounge scene without losing continuity',
    ],

    night: [
      'returning to the same yacht cabin in quiet end-of-day calm',
      'final private stillness aboard the vessel after the Riviera route',
      'night routine inside a cooled stateroom with low light',
      'withdrawing from public visibility back into yacht privacy',
      'ending the story where it began on the same superyacht',
    ],
  },

  actionPools: {
    wake: [
      'resting in bed aboard the same yacht before getting up',
      'opening eyes to first light over harbor or water',
      'stretching slowly under luxury bedding at sea',
      'taking in the morning view from the cabin before moving',
    ],

    morning_refresh: [
      'washing face in cool yacht-bathroom light',
      'stepping into a warm shower onboard',
      'doing skincare and grooming in the mirror',
      'brushing hair and resetting for the day at sea',
    ],

    getting_dressed: [
      'choosing a polished Riviera outfit from the onboard wardrobe',
      'buttoning into fresh resortwear aboard the same vessel',
      'putting on jewelry accessories or finishing pieces before departure',
      'checking the final look in the yacht mirror before heading out',
    ],

    breakfast: [
      'sipping espresso on the breakfast deck',
      'eating fruit pastries or a light yacht breakfast outdoors',
      'sitting quietly over coffee with sea air moving around the vessel',
      'starting the day slowly on board before the first stop',
    ],

    late_morning: [
      'approaching a harbor or anchorage on the same yacht',
      'moving through a marina arrival with polished control',
      'stepping into a visible destination after sea travel',
      'cruising between Riviera and Amalfi stops in bright light',
      'taking a tender or shore-linked transition from the yacht',
    ],

    lunch: [
      'settling into a long seaside lunch after arriving from the yacht',
      'ordering lunch at a marina or coastal terrace',
      'lingering over a midday meal with the vessel still anchoring the story',
      'holding a table scene in elegant Mediterranean heat',
    ],

    afternoon: [
      'stretching out on the sun deck',
      'descending to the swim platform for water access',
      'resting at the aft beach club or foredeck',
      'cruising slowly past iconic coastline formations',
      'holding a relaxed offshore pause in a cove or bay',
    ],

    reset: [
      'returning inside the yacht after the heat',
      'taking an onboard shower before the evening',
      'retouching hair makeup or grooming in private',
      'changing from daywear or swimwear into a more elevated look',
      'resting quietly in the yacht before sunset plans',
    ],

    golden_hour: [
      'holding the rail during sunset',
      'walking a short deck line in warm light',
      'pausing for the view as sea and coast begin to glow',
      'standing at the edge of the yacht before dinner',
      'watching the last sun while the same vessel moves or drifts',
    ],

    dinner: [
      'sitting down for a candlelit dinner on board or ashore',
      'ordering wine and easing into the evening meal',
      'speaking softly across a glowing table scene',
      'settling into elegant nighttime dining linked to the same yacht story',
    ],

    evening: [
      'walking through softly lit marina or waterfront settings after dinner',
      'taking a late drink with harbor or sea views',
      'moving slowly through warm Riviera night air',
      'lingering in the after-dark atmosphere without rushing back',
    ],

    night: [
      'returning to the yacht in silence',
      'washing off the day before bed',
      'slipping into nightwear inside the same vessel',
      'ending the day in private cabin calm',
    ],
  },

  environmentPools: {
    wake: [
      'same superyacht master cabin with sea or harbor light entering',
      'private stateroom with panoramic windows over still water',
      'quiet owner suite aboard a charter-famous yacht',
      'soft yacht bedroom interior at first light',
      'luxury marine cabin with polished wood, linen, and calm horizon beyond',
    ],

    morning_refresh: [
      'marble yacht bathroom with refined chrome and pale morning light',
      'spa-like ensuite aboard the same superyacht',
      'walk-in yacht shower with mirrored detail and ocean glow',
      'private onboard bathroom with polished counters and fresh towel calm',
      'same-vessel grooming space designed like a floating luxury suite',
    ],

    getting_dressed: [
      'wardrobe suite inside the same yacht with resortwear laid out',
      'mirror-and-dressing corner aboard a high-status vessel',
      'private cabin dressing area with organized day and evening looks',
      'upper-deck interior styling space before shore arrival',
      'yacht wardrobe room with refined travel textures and polished finishes',
    ],

    breakfast: [
      'aft breakfast deck above calm Mediterranean water',
      'sunlit stern table scene aboard the same yacht',
      'open breakfast deck with soft sea movement and polished service',
      'same vessel anchored offshore or in harbor during breakfast hour',
      'morning deck setting with coastlines marinas or open water beyond',
    ],

    late_morning: [
      'Positano offshore arrival line beneath pastel cliffs',
      'Capri marina approach with island harbor movement',
      'Amalfi harbor entry in bright Mediterranean light',
      'Port Hercules Monaco with elite vessels and city architecture',
      'open sailing line between major coastal destinations',
    ],

    lunch: [
      'Nerano seaside lunch terrace reached from the yacht',
      'La Fontelina coastal table near Capri rock and water',
      'Monaco Yacht Club terrace overlooking the marina',
      'waterfront restaurant or harbor-side table in Amalfi or Monaco',
      'Mediterranean lunch setting where sea access and polished dining merge',
    ],

    afternoon: [
      'same yacht sun deck under strong Mediterranean sun',
      'swim platform over clear blue water',
      'aft beach-club leisure area facing the sea',
      'offshore anchorage near cliffs coves or famous coastal formations',
      'Riviera bay or Amalfi cove with open-water luxury atmosphere',
    ],

    reset: [
      'cool interior yacht suite after the afternoon heat',
      'spa bathroom and dressing area prepared for evening transformation',
      'private cabin calm before sunset and dinner',
      'upper-deck lounge used as a quiet between-worlds transition space',
      'same superyacht interior holding private late-afternoon stillness',
    ],

    golden_hour: [
      'sunset rail on the same yacht facing a glowing coastline',
      'foredeck or side deck in rich Mediterranean golden light',
      'Capri Faraglioni drift line under late sun',
      'Praiano or Cap Ferrat evening water route',
      'open Riviera sailing line with the whole world turning warm',
    ],

    dinner: [
      'stern dinner deck on the same superyacht under candlelight',
      'Monaco or Monte Carlo terrace table with polished sea-adjacent glow',
      'coastal dinner scene in Capri or along the Amalfi route',
      'same-yacht-linked candlelit evening meal with refined service',
      'intimate dinner atmosphere above darkening water or marina lights',
    ],

    evening: [
      'Port Hercules Monaco after dark',
      'Monte Carlo waterfront or Casino Square arrival route',
      'Capri marina or Amalfi harbor moving into night',
      'upper deck lounge or stern deck with warm ambient lighting',
      'Riviera waterfront setting where public glamour remains tied to the yacht',
    ],

    night: [
      'same-yacht cabin with low ambient lighting and cooled air',
      'private stateroom in Monaco harbor or open-water anchorage',
      'quiet onboard suite after a long yacht-and-shore day',
      'night bathroom or bedside corner inside the same vessel',
      'deep private marine interior calm after midnight',
    ],
  },

  moodPools: {
    wake: [
      'soft private morning calm on the same vessel',
      'quiet elite stillness before the day becomes visible',
      'rested yacht-life intimacy at first light',
    ],

    morning_refresh: [
      'clean fresh reset energy',
      'private self-care luxury at sea',
      'quiet onboard polish before entering the world',
    ],

    getting_dressed: [
      'controlled anticipation',
      'effortless high-status preparation',
      'visible-luxury intention forming in private',
    ],

    breakfast: [
      'slow indulgent yacht calm',
      'sunlit ease and marine elegance',
      'relaxed prestige before movement begins',
    ],

    late_morning: [
      'confident destination-entry energy',
      'mobile visible summer luxury',
      'public-facing polish without pressure',
    ],

    lunch: [
      'lingering coastal indulgence',
      'warm sociable refinement',
      'Mediterranean appetite and ease',
    ],

    afternoon: [
      'sun-soaked playful yacht glamour',
      'carefree offshore confidence',
      'luxury leisure in full open-water flow',
    ],

    reset: [
      'cool private regrouping',
      'fresh composure before the night route',
      'quiet transformation energy aboard the yacht',
    ],

    golden_hour: [
      'cinematic sunset magnetism',
      'elevated anticipation at sea',
      'romantic Riviera glow',
    ],

    dinner: [
      'refined candlelit intimacy',
      'elegant high-status connection',
      'slow luxurious after-sunset warmth',
    ],

    evening: [
      'softly social night prestige',
      'warm harbor-and-waterfront magnetism',
      'relaxed after-dark luxury visibility',
    ],

    night: [
      'withdrawn private softness',
      'deep yacht-cabin calm',
      'quiet end-of-day intimacy after movement and visibility',
    ],
  },

  cameraPools: {
    wake: [
      'soft side angle from bed level inside the yacht cabin',
      'intimate close framing with sea light entering from the windows',
      'wide stateroom composition with horizon beyond',
      'quiet over-shoulder cabin angle toward harbor or open water',
    ],

    morning_refresh: [
      'mirror-side close-up in the yacht bathroom',
      'elegant mid shot at the onboard vanity',
      'tight reflected detail framing during self-care',
      'soft luxury bathroom composition from behind',
    ],

    getting_dressed: [
      'mirror-framed dressing shot inside the yacht suite',
      'mid-length wardrobe styling angle',
      'editorial side profile while preparing on board',
      'refined interior fashion framing inside a superyacht',
    ],

    breakfast: [
      'wide breakfast-deck shot with water beyond',
      'soft seated three-quarter angle at the onboard table',
      'editorial deck-side composition with coastline depth',
      'sunlit yacht-breakfast framing with polished marine atmosphere',
    ],

    late_morning: [
      'arrival shot from the deck or tender facing the destination',
      'luxury travel editorial angle in motion through a marina or harbor',
      'sunlit public-arrival composition with yacht continuity implied',
      'wide destination framing with marina architecture and vessel presence',
    ],

    lunch: [
      'seated lunch framing with table detail and water beyond',
      'elegant restaurant side angle at a marina or seaside terrace',
      'editorial over-table composition with yacht-linked context',
      'wide lunch shot with coastal or harbor depth',
    ],

    afternoon: [
      'wide yacht-leisure shot under hard summer light',
      'water-level swim-platform composition',
      'foredeck or sundeck editorial framing with open sea',
      'sun-drenched full-body or body-length marine leisure angle',
    ],

    reset: [
      'quiet indoor mirror framing inside the yacht suite',
      'private cabin side-profile composition',
      'soft robe-and-vanity close-up onboard',
      'calm pre-evening interior editorial angle with polished surfaces',
    ],

    golden_hour: [
      'sunset backlit rail-side angle on the yacht',
      'wide deck shot with glowing coastline or marina beyond',
      'cinematic side profile in warm falling light',
      'slow editorial composition with late-sun water depth',
    ],

    dinner: [
      'candlelit seated portrait framing on board or ashore',
      'restaurant-side editorial composition with refined ambient light',
      'intimate dinner-table angle with warm glassware glow',
      'elegant evening shot with water or harbor lights behind',
    ],

    evening: [
      'night waterfront editorial framing',
      'soft-glow harbor or yacht-lounge composition',
      'walking-after-dark cinematic angle in Monaco Capri or Amalfi',
      'moody terrace or upper-deck shot with lights below',
    ],

    night: [
      'quiet bedroom ambient close-up inside the yacht',
      'soft side angle in low marine interior light',
      'private end-of-day suite framing on the same vessel',
      'intimate night composition with minimal glow and deep softness',
    ],
  },

  lightingPools: {
    wake: [
      'soft sunrise light entering the yacht cabin through sea-facing windows',
      'pale dawn light moving over bedding and polished interior surfaces',
      'first warm light of day with quiet harbor or open-water reflection',
      'low early-morning glow with gentle marine shadows',
    ],

    morning_refresh: [
      'clean reflected bathroom light on marble and chrome',
      'soft natural morning light inside a private yacht ensuite',
      'fresh clear post-sunrise light across polished surfaces',
      'bright but gentle onboard interior light with spa calm',
    ],

    getting_dressed: [
      'bright morning light filtering into the yacht wardrobe area',
      'clean daylight on fabric skin and polished finishes',
      'soft sunlit interior glow inside the same vessel',
      'crisp marine daylight in a luxury dressing space',
    ],

    breakfast: [
      'sunlit deck glow with water reflections moving upward',
      'warm bright marine morning light across tableware and teak',
      'clean Mediterranean breakfast sunlight over deck surfaces',
      'luminous yacht-breakfast-hour sunshine with coastal sparkle',
    ],

    late_morning: [
      'bright late-morning sun over harbors marinas and cliffside coastline',
      'clear Mediterranean daylight with crisp destination freshness',
      'open-air arrival brightness with elegant public contrast',
      'sun-forward Riviera travel light',
    ],

    lunch: [
      'high midday sun softened by terrace shade or club awnings',
      'bright overhead light with sea reflections and polished glass',
      'hot coastal sun balanced by cool restaurant shadow',
      'crisp midday yacht-linked lunch brightness',
    ],

    afternoon: [
      'strong summer sun with sharp reflective water light',
      'hard glamorous daylight across teak deck and skin',
      'sun-drenched marine glare in open-water luxury settings',
      'intense Mediterranean brightness at the peak of the day',
    ],

    reset: [
      'cool shaded interior light inside the yacht after the heat',
      'soft filtered late-afternoon glow in the suite',
      'quiet refined light during the private reset',
      'gentle interior brightness before golden hour begins',
    ],

    golden_hour: [
      'rich honey-gold sunlight across railings water and coastline',
      'warm sunset glow on skin fabric glass and deck surfaces',
      'golden Mediterranean backlight with yacht-side cinematic warmth',
      'late sun wrapping the vessel and shoreline in amber light',
    ],

    dinner: [
      'candlelight mixed with soft marine or terrace ambience',
      'warm restaurant or onboard table glow with intimate highlights',
      'golden dinner light against deepening sea or harbor darkness',
      'romantic evening low light with polished glass reflections',
    ],

    evening: [
      'warm after-dark harbor lighting with elegant marine shadows',
      'soft night glow from marinas waterfronts and yacht interiors',
      'ambient summer nightlife lighting in Monaco Amalfi or Capri',
      'refined Riviera night light with subtle warmth and controlled shine',
    ],

    night: [
      'dim yacht-cabin lighting with soft private warmth',
      'low intimate marine interior light at the end of the day',
      'quiet night glow with minimal highlights and deep calm',
      'soft onboard bedroom lighting after midnight',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'soft sleepwear aboard the yacht',
        'barefoot just-awake stateroom look',
        'luxury cabin morningwear',
        'quiet first-light yacht sleep styling',
      ],

      morning_refresh: [
        'white towel look in the yacht bathroom',
        'post-shower wrapped towel styling',
        'fresh private self-care look at sea',
        'clean spa-bathroom yacht styling',
      ],

      getting_dressed: [
        'light Riviera resortwear',
        'polished yacht daywear',
        'elevated coastal marina outfit',
        'refined Amalfi-to-Monaco daytime styling',
      ],

      breakfast: [
        'quiet luxury breakfast-deck outfit',
        'sunlit yacht morning look',
        'light polished marine day-start styling',
        'relaxed but elite breakfast-onboard outfit',
      ],

      late_morning: [
        'designer coastal daywear',
        'marina-arrival luxury look',
        'high-status destination street style',
        'visible yacht-to-shore daytime outfit',
      ],

      lunch: [
        'chic Mediterranean lunch styling',
        'marina-club midday look',
        'elegant warm-weather lunch outfit',
        'soft refined seaside restaurant ensemble',
      ],

      afternoon: [
        'luxury swimwear with cover-up',
        'yacht-ready swim styling',
        'sun-deck leisure outfit',
        'water-access afternoon look built for open-sea glamour',
      ],

      reset: [
        'fresh post-shower yacht reset look',
        'private pre-evening styling change',
        'robe towel or soft reset outfit',
        'elevated getting-ready-again moment on board',
      ],

      golden_hour: [
        'golden-hour yacht look',
        'pre-dinner sunset styling',
        'cinematic rail-side eveningwear',
        'soft sensual Riviera transition outfit',
      ],

      dinner: [
        'refined yacht dinner styling',
        'elegant Riviera night look',
        'high-status evening silhouette',
        'polished candlelit dinner outfit',
      ],

      evening: [
        'after-dinner polished nightlife look',
        'Monaco-and-marina evening styling',
        'warm-night coastal social outfit',
        'refined deck-or-waterfront after-dark fashion',
      ],

      night: [
        'silk or soft luxury nightwear',
        'private yacht bedtime styling',
        'quiet end-of-day cabin look',
        'soft intimate night routine outfit at sea',
      ],
    },

    details: {
      wake: [
        'sleep-soft hair and natural face',
        'barefoot just-awake ease aboard the yacht',
        'quiet private morning softness',
        'rested cabin styling with no public pressure',
      ],

      morning_refresh: [
        'fresh skin after showering',
        'clean brushed-back hair or damp post-shower texture',
        'minimal grooming glow in the mirror',
        'private self-care softness inside the yacht',
      ],

      getting_dressed: [
        'light jewelry watches or polished accessories',
        'crisp resort textures and refined finishing details',
        'clean destination-ready styling',
        'daytime luxury polish before stepping ashore',
      ],

      breakfast: [
        'effortless breakfast-deck polish',
        'minimal luxury accessories in morning light',
        'quiet yacht-life elegance',
        'fresh Mediterranean grooming before movement begins',
      ],

      late_morning: [
        'designer sunglasses and marina-ready accessories',
        'elevated yacht-arrival detail',
        'public-facing destination polish',
        'easy luxury movement-ready finishing touches',
      ],

      lunch: [
        'seaside lunch elegance',
        'club-level midday polish',
        'refined warm-weather dining detail',
        'restaurant-ready styling with marine sophistication',
      ],

      afternoon: [
        'salt-touched or wind-touched hair texture',
        'swimwear plus luxury cover-up detail',
        'sun-soaked yacht leisure polish',
        'water-side glamour finishing touches',
      ],

      reset: [
        'fresh hair and skin before evening',
        'private grooming detail in the yacht mirror',
        'transition from leisure into refined night elegance',
        'clean reset styling with controlled calm',
      ],

      golden_hour: [
        'glowing skin in sunset light',
        'fabric metal and hair catching golden reflections',
        'soft romantic evening polish',
        'pre-dinner yacht glamour with warmth',
      ],

      dinner: [
        'elevated evening styling detail',
        'refined jewelry and polished silhouette',
        'candlelight-ready finishing touches',
        'high-status Riviera dinner elegance',
      ],

      evening: [
        'after-dinner glamour still intact',
        'slightly softened night styling with polish preserved',
        'marina and waterfront prestige detail',
        'warm night elegance with movement',
      ],

      night: [
        'clean end-of-day skin',
        'hair down in private cabin calm',
        'soft nightwear texture and intimate stillness',
        'bedtime luxury detail aboard the yacht',
      ],
    },

    changeMoments: {
      wake: [
        'still in sleepwear aboard the yacht',
        'not yet changed for the visible part of the day',
        'lingering in the first private state of the morning',
      ],

      morning_refresh: [
        'wrapped in a towel after showering onboard',
        'between waking and dressing for the route ahead',
        'moving through a private freshening-up moment at sea',
      ],

      getting_dressed: [
        'mid-change in front of the yacht mirror',
        'choosing pieces for the first full look of the day',
        'halfway through building a polished daytime identity',
      ],

      breakfast: [
        'already changed into a completed yacht-morning look',
        'fully dressed for breakfast and the first destination',
        'wearing the first finished outfit of the day',
      ],

      late_morning: [
        'comfortably settled into visible daytime styling',
        'moving naturally through marinas harbors or promenades in full daywear',
        'wearing a practical but elite travel outfit',
      ],

      lunch: [
        'still in polished midday wear',
        'slightly more relaxed but still refined lunch styling',
        'wearing a composed restaurant-or-club look',
      ],

      afternoon: [
        'changed into swim or open-water leisure styling',
        'moved from marina wear into yacht leisurewear',
        'fully shifted into sun-and-water afternoon mode',
      ],

      reset: [
        'changing out of swimwear or sun-heavy clothing',
        'freshening up for sunset dinner and night visibility',
        'between open-water leisure and refined after-dark styling',
      ],

      golden_hour: [
        'now in elevated pre-dinner styling',
        'changed into a more cinematic sunset look',
        'wearing the second major outfit of the day',
      ],

      dinner: [
        'fully dressed for a refined evening scene',
        'in complete dinner styling aboard the yacht or ashore',
        'settled into a finished elegant night identity',
      ],

      evening: [
        'still in eveningwear after dinner',
        'night look softened slightly but still polished',
        'moving through the night in full elegant styling',
      ],

      night: [
        'changed out of eveningwear',
        'back in private yacht-night styling',
        'fully transitioned into end-of-day comfort aboard the vessel',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'cool premium bedding against skin as sea light enters the cabin',
      'the hush of a luxury vessel before the day fully opens',
      'soft air-conditioning and faint marine movement in the room',
      'the quiet privilege of waking inside the same superyacht',
    ],

    morning_refresh: [
      'warm water and cool marble surfaces in the yacht bathroom',
      'fresh skin after showering at sea',
      'clean chrome glass and towel softness in an enclosed luxury space',
      'the polished calm of a spa-like yacht ensuite',
    ],

    getting_dressed: [
      'the crisp feel of premium fabric against sun-warmed skin',
      'organized wardrobe calm inside the same vessel',
      'metal accessories catching clean morning light',
      'a ready-for-the-day feeling shaped by private marine luxury',
    ],

    breakfast: [
      'espresso warmth over moving water and morning air',
      'fruit citrus and pastry brightness on the deck table',
      'sunlight on teak silverware and glass',
      'the subtle rise and stillness of breakfast on a superyacht',
    ],

    late_morning: [
      'salt breeze and polished marina air',
      'bright sun over harbor stone piers and yacht hardware',
      'the movement from private deck life into visible destination energy',
      'open Mediterranean light across coastal or Riviera arrival scenes',
    ],

    lunch: [
      'cold drinks against midday warmth',
      'sea breeze moving through shaded tables or club terraces',
      'the richness of a slow coastal meal after yacht movement',
      'glass white linen and sunlight holding a refined midday atmosphere',
    ],

    afternoon: [
      'saltwater on skin under hard summer sun',
      'the heat of teak decking and yacht cushions',
      'bright sea glare and clear-water openness',
      'the loose pleasure of an elite afternoon built around the same vessel',
    ],

    reset: [
      'cool shade after hours in the open sun',
      'fresh skin and clean hair before the evening',
      'the comfort of stepping back into the yacht’s private world',
      'a calm polished feeling between public visibility and night elegance',
    ],

    golden_hour: [
      'honey-gold light on railings glass and skin',
      'warm air softening as the sun lowers over coastlines and marinas',
      'the glow of water metal and fabric at the best hour of the day',
      'the cinematic stillness of sunset from the same yacht',
    ],

    dinner: [
      'candlelight reflecting in glassware above dark water',
      'warm plates wine and evening air',
      'the intimacy of a refined meal after a day of movement',
      'marine or harbor elegance under the first depth of night',
    ],

    evening: [
      'warm stone and marina air still holding traces of the day’s heat',
      'soft music low conversation and night reflections',
      'the slow sensual rhythm of an elite Riviera evening',
      'lights scattered across harbors coastlines and the sea',
    ],

    night: [
      'cool sheets after a day of sun and salt',
      'clean skin and low private cabin light',
      'the hush of a yacht interior after midnight',
      'the deep exhale of returning fully to the vessel',
    ],
  },

  socialEnergyPools: {
    wake: [
      'fully private and unobserved onboard moment',
      'quiet yacht luxury with no outside presence yet',
      'intimate start to the day behind the privacy of the vessel',
    ],

    morning_refresh: [
      'private self-care energy',
      'completely personal and contained inside the yacht',
      'quiet inner reset before public visibility begins',
    ],

    getting_dressed: [
      'private preparation with visible intention',
      'alone or contained within the couple-space before being seen',
      'personal styling moment before stepping into destinations and marinas',
    ],

    breakfast: [
      'private deck calm',
      'softly secluded morning prestige',
      'peaceful onboard luxury without social pressure',
    ],

    late_morning: [
      'lightly public marina and harbor visibility',
      'seen but controlled in elite destination spaces',
      'high-status arrival energy without chaos',
    ],

    lunch: [
      'softly social and refined',
      'visible in a polished dining scene linked to yacht life',
      'warm public elegance with controlled exposure',
    ],

    afternoon: [
      'playful luxury in semi-private offshore spaces',
      'seen in glamorous sea settings when appropriate',
      'socially magnetic but still relaxed and fluid',
    ],

    reset: [
      'private again inside the yacht',
      'retreating from visibility before the evening',
      'quiet inward reset away from public attention',
    ],

    golden_hour: [
      'subtly visible and highly cinematic',
      'magnetic without excess effort',
      'the kind of moment that naturally draws eyes in a refined way',
    ],

    dinner: [
      'elegant public intimacy',
      'seen in a highly refined night setting',
      'socially elevated but emotionally focused',
    ],

    evening: [
      'softly social glamorous and alive',
      'visible in Monaco Amalfi Capri or on deck without losing control',
      'after-dark prestige with warm confidence',
    ],

    night: [
      'fully private again aboard the same yacht',
      'withdrawn from the public world',
      'quiet end-of-day intimacy inside the vessel',
    ],
  },

  atmospherePools: {
    wake: [
      'quiet marine dawn with the yacht and harbor still half-asleep',
      'fresh early calm before destination energy begins',
      'soft first-light stillness on the same vessel',
      'peaceful sunrise atmosphere carried by water and silence',
    ],

    morning_refresh: [
      'private indoor calm while the day slowly builds outside',
      'clean air-conditioned yacht quiet',
      'fresh interior stillness after waking',
      'low-noise elite morning atmosphere at sea',
    ],

    getting_dressed: [
      'intentional calm before public entry',
      'private preparation energy with coastlines waiting outside',
      'controlled yacht-suite quiet before movement begins',
      'soft pre-departure stillness on board',
    ],

    breakfast: [
      'easy Mediterranean morning with no rush at all',
      'peaceful deck breakfast atmosphere above water',
      'slow yacht-life start to a warm summer day',
      'private marine calm before the first destination arrival',
    ],

    late_morning: [
      'destination energy beginning to rise across harbors and promenades',
      'fashionable yacht-linked movement through visible elite spaces',
      'bright travel buzz without pressure or disorder',
      'open-air marina and coastline atmosphere with style',
    ],

    lunch: [
      'lazy upscale midday energy by sea or harbor',
      'refined lunch calm after polished yacht movement',
      'club terrace or coastal restaurant sophistication',
      'midday indulgence with soft social visibility',
    ],

    afternoon: [
      'open-water leisure mood in full effect',
      'playful yacht-day luxury under high summer brightness',
      'heat sea movement and offshore prestige shaping the story',
      'full marine glamour carried by the same vessel',
    ],

    reset: [
      'cool private pause between day route and night route',
      'retreat from public spaces back into the yacht’s calm',
      'quiet after-sun stillness indoors',
      'personal reset before the evening unfolds',
    ],

    golden_hour: [
      'cinematic marine hush as the sun drops',
      'romantic transition from bright heat to golden glow',
      'the sea and coastline softening into warmth',
      'elevated sunset atmosphere with visible prestige and softness',
    ],

    dinner: [
      'long elegant night beginning slowly',
      'refined candlelit intimacy above water or marina lights',
      'warm evening sophistication with no rush',
      'Mediterranean-and-Riviera dinner atmosphere at an elite level',
    ],

    evening: [
      'after-dark glamour with a controlled relaxed pulse',
      'harbor nightlife energy without chaos',
      'magnetic late-evening atmosphere along marinas decks and waterfronts',
      'slow stylish continuation of the day rather than a sharp switch',
    ],

    night: [
      'quiet final calm after a full yacht day',
      'deep private stillness inside the vessel',
      'soft intimate silence after midnight',
      'the sea or harbor fading quietly around the same yacht',
    ],
  },

  propPools: {
    wake: [
      'luxury bedding and cabin pillows',
      'sea-facing windows or curtains',
      'bedside table with water watch or sunglasses',
      'soft cabin lamp details inside the same yacht',
    ],

    morning_refresh: [
      'white towels and polished marble counter',
      'mirror and chrome bathroom fixtures',
      'skincare grooming and fragrance items',
      'glass shower details inside the yacht ensuite',
    ],

    getting_dressed: [
      'open wardrobe with organized day and night looks',
      'laid-out accessories watches or jewelry',
      'shoes sandals or polished footwear near the dressing area',
      'mirror and chair inside the onboard styling suite',
    ],

    breakfast: [
      'espresso cup silver tray and breakfast service',
      'fruit pastries juice and polished glassware',
      'linen napkins and marine breakfast table setup',
      'deck rail and sea movement just beyond the table',
    ],

    late_morning: [
      'tender dock details marina lines and polished harbor surfaces',
      'shopping bags sunglasses or phone in hand',
      'luxury storefront reflections or marina signage',
      'coastal railings stone steps and waterfront hardware',
    ],

    lunch: [
      'wine glasses chilled drinks and white table settings',
      'cutlery plates and polished lunch service',
      'club terrace or seaside table detail',
      'boats yachts or water visible beyond the dining line',
    ],

    afternoon: [
      'sun deck loungers cushions and towels',
      'swim-platform ladder or stern access details',
      'sunglasses hats cover-ups and cold drinks',
      'yacht railings teak decking and reflective water surfaces',
    ],

    reset: [
      'fresh towels on a chair or bed',
      'cosmetic bag or grooming kit near the mirror',
      'second outfit prepared for the evening',
      'water glass and soft interior lighting in the suite',
    ],

    golden_hour: [
      'drink glass catching sunset light',
      'railings and polished metal reflecting gold',
      'fabric moving in warm marine breeze',
      'glass and deck surfaces carrying evening reflections',
    ],

    dinner: [
      'candles polished glassware and dinner service',
      'white tablecloth or refined yacht-table setup',
      'wine bottle or poured glasses under low light',
      'soft ambient table lighting with water or marina beyond',
    ],

    evening: [
      'late drink glass or lounge table detail',
      'marina railings luxury street glow or yacht lounge furniture',
      'night reflections on polished surfaces',
      'harbor lights and deck ambience holding the scene together',
    ],

    night: [
      'bedside lamp or low cabin glow',
      'nightwear laid across a chair or bed edge',
      'dim bathroom mirror light',
      'soft bedding in a cooled private room',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'soft reclined posture in luxury bedding',
      'half-awake stretch with relaxed shoulders',
      'quiet body curl before leaving bed',
      'rested private posture facing window light or open water',
    ],

    morning_refresh: [
      'calm upright posture at the yacht sink',
      'soft shoulder line in the mirror',
      'relaxed stance after showering',
      'gentle self-care posture in a private onboard space',
    ],

    getting_dressed: [
      'one-leg weight shift while dressing',
      'composed posture in front of the mirror',
      'slow precise movement while adjusting clothing',
      'elegant upright stance with visible-confidence calm',
    ],

    breakfast: [
      'seated deck posture with easy elegance',
      'relaxed body angle toward the sea',
      'quiet breakfast stillness with one leg crossed or loosely set',
      'unhurried onboard luxury posture in morning light',
    ],

    late_morning: [
      'confident arrival posture through marinas and waterfronts',
      'light travel stride with relaxed control',
      'casual upright movement through high-status public spaces',
      'destination-editorial posture grounded in yacht continuity',
    ],

    lunch: [
      'seated restaurant posture with effortless polish',
      'soft lean toward the table in conversation',
      'relaxed arm placement during a long midday meal',
      'elegant lunch body language with no rush or tension',
    ],

    afternoon: [
      'sun-soaked stretched posture on deck loungers',
      'playful relaxed movement near the swim platform',
      'confident rail-side or foredeck stance with open chest',
      'easy leisure posture under strong marine sun',
    ],

    reset: [
      'quiet indoor stillness after hours in sun and salt air',
      'soft seated posture during the onboard reset',
      'private calm body language in front of the yacht mirror',
      'composed pause before the evening begins',
    ],

    golden_hour: [
      'slow rail-side lean in sunset light',
      'cinematic standing posture facing the horizon or coastline',
      'gentle turn of the body toward the last sun',
      'soft poised elegance with relaxed high-status calm',
    ],

    dinner: [
      'elegant seated candlelit posture',
      'subtle forward lean across the table',
      'composed evening posture with refined warmth',
      'still confident body language under low ambient light',
    ],

    evening: [
      'slow after-dinner walking posture',
      'magnetic relaxed stance in marina or waterfront settings',
      'confident softly social movement after dark',
      'elevated but easy body language at night',
    ],

    night: [
      'private softened posture at the end of the day',
      'quiet slow movement inside the yacht',
      'relaxed cabin stillness',
      'unwound intimate end-of-night body language',
    ],
  },

  facialExpressionPools: {
    wake: [
      'just-awake softness in the face',
      'calm sleepy expression with no performance',
      'quiet private morning gaze aboard the yacht',
      'rested expression in the first marine light',
    ],

    morning_refresh: [
      'fresh bare-faced calm',
      'focused mirror expression during self-care',
      'quiet reset expression with soft eyes',
      'composed post-shower stillness',
    ],

    getting_dressed: [
      'light anticipatory expression',
      'private getting-ready concentration',
      'soft confident mirror gaze',
      'subtle self-assured pre-arrival expression',
    ],

    breakfast: [
      'peaceful deck-side expression',
      'soft contentment over coffee',
      'quiet indulgent morning calm',
      'relaxed high-status ease before movement',
    ],

    late_morning: [
      'open confident travel expression',
      'light visible poise in public destinations',
      'bright social ease without forcing attention',
      'softly engaged arrival energy',
    ],

    lunch: [
      'warm midday ease',
      'relaxed sociable expression over lunch',
      'lingering pleasure in the meal and setting',
      'calm satisfied coastal mood',
    ],

    afternoon: [
      'sunlit playful confidence',
      'carefree open-water expression',
      'relaxed glamorous yacht-day mood',
      'open enjoyment in heat light and movement',
    ],

    reset: [
      'quiet inward calm',
      'fresh composed expression after showering',
      'private regrouping energy',
      'soft polished calm before the evening scene',
    ],

    golden_hour: [
      'romantic sunset softness',
      'cinematic reflective gaze',
      'quiet magnetism in warm deck light',
      'subtle anticipation before dinner and night visibility',
    ],

    dinner: [
      'warm intimate candlelit expression',
      'elegant flirtatious softness when appropriate',
      'refined evening composure',
      'slow luxurious dinner mood',
    ],

    evening: [
      'gently social after-dark confidence',
      'soft magnetic nightlife expression',
      'warm night glow in the face',
      'easy glamorous evening calm',
    ],

    night: [
      'private end-of-day softness',
      'quiet tired calm after a full route',
      'intimate low-energy expression',
      'deep relaxed nighttime stillness inside the yacht',
    ],
  },

  handDetailPools: {
    wake: [
      'hand resting on luxury bedding',
      'fingers brushing sheet edge or curtain',
      'one hand near the pillow in dawn light',
      'light touch against soft cabin linen',
    ],

    morning_refresh: [
      'hand at the sink edge',
      'fingers touching damp hair',
      'hand near the mirror during skincare',
      'soft towel held lightly after showering',
    ],

    getting_dressed: [
      'fingers adjusting fabric or fastening a detail',
      'hand on wardrobe door or mirror edge',
      'touching jewelry eyewear or clothing pieces',
      'light grip on sandals shoes or small accessories',
    ],

    breakfast: [
      'hand around an espresso cup',
      'fingers touching glass cutlery or fruit',
      'resting hand on the breakfast table',
      'one hand lifting a morning drink in deck light',
    ],

    late_morning: [
      'hand on a tender rail yacht rail or marina railing',
      'fingers holding sunglasses while arriving',
      'light hold on a small bag or phone',
      'one hand moving naturally through a visible destination space',
    ],

    lunch: [
      'hand near a wine or water glass',
      'fingers resting on table linen',
      'soft hand movement during conversation',
      'touching cutlery or plate edge during a long lunch',
    ],

    afternoon: [
      'hand on yacht rail lounger edge or swim-platform surface',
      'fingers brushing wet hair or eyewear',
      'one hand holding a cold drink in the sun',
      'casual open-water leisure hand placement',
    ],

    reset: [
      'hand on the bathroom counter',
      'fingers touching grooming items or accessories',
      'soft movement while changing outfits',
      'one hand resting near the mirror in private calm',
    ],

    golden_hour: [
      'hand holding a sunset drink',
      'fingers resting on the yacht rail',
      'light touch against fabric moving in warm breeze',
      'one hand catching the last sun at the edge of the deck',
    ],

    dinner: [
      'hand near candlelit glassware',
      'fingers lightly touching the table edge',
      'soft elegant dinner hand placement',
      'one hand lifting a wine glass under ambient light',
    ],

    evening: [
      'hand resting on a late drink glass',
      'fingers trailing along a railing chair or lounge edge',
      'casual polished hand movement after dinner',
      'subtle nightlife hand detail in warm after-dark light',
    ],

    night: [
      'hand near the bedside lamp or sheet fold',
      'fingers brushing nightwear fabric',
      'soft private hand placement in low yacht light',
      'one hand resting in calm end-of-day stillness',
    ],
  },

  movementEnergyPools: {
    wake: [
      'minimal movement slow and waking',
      'very soft start-of-day motion inside the yacht',
      'gentle private marine stillness',
      'unhurried first movement after sleep',
    ],

    morning_refresh: [
      'small careful self-care movements',
      'clean precise bathroom routine motion',
      'quiet controlled reset energy',
      'private low-intensity movement indoors',
    ],

    getting_dressed: [
      'deliberate styling movement',
      'measured elegant preparation',
      'small intentional fashion-focused motion',
      'controlled getting-ready energy before public visibility',
    ],

    breakfast: [
      'slow relaxed deck rhythm',
      'unhurried yacht-morning movement',
      'stillness broken only by small gestures',
      'calm seated breakfast energy above the water',
    ],

    late_morning: [
      'light active arrival energy',
      'casual destination movement with polish',
      'bright marina or harbor rhythm',
      'gentle travel motion through elite coastal spaces',
    ],

    lunch: [
      'slow long-meal rhythm',
      'minimal relaxed seated movement',
      'lingering midday ease',
      'low-intensity sociable lunch pace',
    ],

    afternoon: [
      'open playful marine motion',
      'looser leisure energy by deck and water',
      'sun-driven movement with offshore glamour',
      'full warm-weather relaxation rhythm around the same yacht',
    ],

    reset: [
      'movement slows down again indoors',
      'private yacht-reset pace with more stillness',
      'gentle cool-down rhythm',
      'measured transition into evening mode',
    ],

    golden_hour: [
      'slow cinematic movement in warm deck light',
      'gentle sunset pacing at sea',
      'elegant low-speed motion before dinner',
      'poised movement with romantic softness',
    ],

    dinner: [
      'contained refined dinner movement',
      'soft seated elegance with occasional gestures',
      'quiet intimate rhythm at the table',
      'slow luxurious candlelit pace',
    ],

    evening: [
      'easy polished after-dark movement',
      'unrushed harbor or waterfront pacing',
      'gentle confident motion in warm night air',
      'soft socially alive rhythm without chaos',
    ],

    night: [
      'movement nearly gone and deeply slowed',
      'private bedtime quiet aboard the same vessel',
      'last minimal motions before sleep',
      'soft end-of-day marine stillness',
    ],
  },

  transitionPools: {
    human: {
      wake: [
        'waking slowly aboard the same yacht',
        'starting the day inside the vessel',
        'coming into the morning with the yacht already anchoring the story',
      ],

      morning_refresh: [
        'heading into the yacht bathroom',
        'freshening up in private before the visible world begins',
        'moving into a contained onboard self-care routine',
      ],

      getting_dressed: [
        'getting dressed for the first destination of the day',
        'choosing what to wear before stepping into marinas and coastlines',
        'finishing the morning preparation on board',
      ],

      breakfast: [
        'settling into breakfast on deck',
        'starting the day properly above the water',
        'taking the first quiet pause before movement begins',
      ],

      late_morning: [
        'heading into the route of the day',
        'moving from yacht privacy into visible destination life',
        'carrying the same vessel identity into harbors marinas and coastal stops',
      ],

      lunch: [
        'slowing down for lunch after the morning movement',
        'taking a long midday break linked to the yacht journey',
        'settling into a seaside or marina meal',
      ],

      afternoon: [
        'moving into full yacht leisure mode',
        'following the heat into deck water and offshore scenes',
        'transitioning from polished lunch atmosphere into open-water pleasure',
      ],

      reset: [
        'returning inside the yacht to reset',
        'cooling down before the evening',
        'preparing the second version of the day aboard the same vessel',
      ],

      golden_hour: [
        'stepping back out for sunset',
        'moving into the most cinematic deck-and-water part of the day',
        'shifting from daylight leisure into evening glow while staying anchored to the same yacht',
      ],

      dinner: [
        'settling into dinner as the night grows more refined',
        'letting the evening become more intimate',
        'moving into candlelit elegance on board or ashore',
      ],

      evening: [
        'drifting into the late evening',
        'extending the night without breaking its softness',
        'following the after-dinner mood through harbor deck or waterfront scenes',
      ],

      night: [
        'ending the day slowly back on the yacht',
        'returning fully to the vessel',
        'winding down in soft private marine luxury',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'opening the day inside the same superyacht that will anchor the whole story',
      'beginning in complete privacy before any destination becomes visible',
      'using the yacht itself as the first expression of elite Mediterranean life',
      'letting the morning begin from ownership presence and calm rather than spectacle',
    ],

    morning_refresh: [
      'moving from sleep into polish inside the floating private world of the yacht',
      'turning the vessel into a self-care sanctuary before public visibility begins',
      'using onboard privacy to create the day’s first level of composure',
      'making private routine part of the luxury rather than a gap before it',
    ],

    getting_dressed: [
      'building the first visible identity of the day while staying rooted in the yacht',
      'preparing to enter coastal and Riviera spaces without losing the vessel continuity',
      'transforming cabin privacy into destination-ready confidence',
      'letting wardrobe and posture signal the transition from onboard calm into public prestige',
    ],

    breakfast: [
      'claiming the day slowly from the deck before the route unfolds',
      'making the yacht feel like the center of a world rather than a transport tool',
      'holding onto private marine calm before the social layer begins',
      'starting the visible luxury day from a place of ease and control',
    ],

    late_morning: [
      'moving into famous destinations while preserving the same yacht as the core identity object',
      'turning every harbor and arrival into an extension of the vessel’s prestige',
      'letting Positano Capri Amalfi and Monaco feel like stops within a larger luxury story',
      'using visible movement to make high-status travel feel coherent and real',
    ],

    lunch: [
      'slowing the route down for taste pleasure and refined midday atmosphere',
      'making lunch part of the yacht lifestyle rather than a break from it',
      'turning tender-to-table or marina-to-table movement into controlled social elegance',
      'holding the vessel in the background so the luxury continuity never breaks',
    ],

    afternoon: [
      'opening the story into full marine leisure and open-water freedom',
      'letting the yacht become both setting and symbol during the brightest part of the day',
      'shifting from structured destination movement into sun-driven relaxation',
      'making sea light deck space and water access carry the narrative forward',
    ],

    reset: [
      'withdrawing from public and offshore energy just long enough to evolve into evening form',
      'using the yacht as a transformation chamber between sun-heavy day life and refined night life',
      'cooling down and rebuilding the mood in private while the vessel holds continuity',
      'making the second half of the day feel earned through retreat and recalibration',
    ],

    golden_hour: [
      'arriving at the most cinematic threshold of the day from the same yacht',
      'turning the vessel into a sunset-stage of prestige movement and stillness',
      'letting famous coastlines and prestigious shorelines glow around a consistent marine identity',
      'moving from leisure into magnetism without losing realism or continuity',
    ],

    dinner: [
      'stepping fully into refined night energy while staying rooted in the same yacht story',
      'turning dinner into atmosphere presence and intimacy after a visible day of movement',
      'making candlelight and sea or harbor glow feel like the natural reward of the route',
      'using dinner to bring warmth and elegance to a world built on mobility and prestige',
    ],

    evening: [
      'extending the night through marinas decks and waterfronts without breaking the softness',
      'letting glamour remain relaxed and credible after the formal meal',
      'keeping the yacht as the silent center even when the setting becomes more public',
      'allowing Monaco Capri and Amalfi night energy to remain coherent within the same lifestyle line',
    ],

    night: [
      'returning everything back to the yacht in complete private control',
      'closing the story where it began so the vessel feels truly persistent and real',
      'ending the luxury route in softness rather than spectacle',
      'letting the final scene belong to the cabin the body and the same superyacht',
    ],
  },

  fallbackRules: {
    pacingProfile: {
      wake: 'slow',
      morning_refresh: 'slow',
      getting_dressed: 'slow',
      breakfast: 'slow',
      late_morning: 'medium',
      lunch: 'slow',
      afternoon: 'medium',
      reset: 'slow',
      golden_hour: 'slow',
      dinner: 'slow',
      evening: 'medium',
      night: 'slow',
    },

    repetitionBreakers: {
      avoidBackToBackSameLocation: true,
      avoidBackToBackSameEnvironment: true,
      avoidBackToBackSameStylingMood: true,
      avoidBackToBackSameCameraAngle: true,
      avoidBackToBackSameLightingStyle: true,
      encouragePhaseProgression: true,
      encourageIndoorOutdoorContrast: true,
      encouragePublicPrivateContrast: true,
      encourageDryWetContrast: true,
      encourageWardrobeEvolution: true,
    },

    worldDefaults: {
      allowSceneGroupFallbackToPhasePools: true,
      allowSubLocationFallbackToWorldPools: true,
      usePhaseSubLocationsBeforeGlobalSubLocations: true,
      preferSceneGroupsWhenPresent: true,
      preferPhaseMatchedSubLocations: true,
    },
  },

  exclusions: {
    premium: [
      'generic random vacation yacht energy',
      'cheap influencer boat feeling',
      'crowded spring-break atmosphere',
      'messy uncontrolled party-deck chaos',
      'budget marina clutter',
      'tropical island energy unrelated to Mediterranean or Riviera logic',
      'fishing-boat realism instead of elite yacht prestige',
      'dark heavy old-money stillness better suited to Lake Como than mobile yacht life',
      'fantasy-ocean unreality without real-world anchoring',
      'low-status cruise-ship atmosphere',
      'non-coastal urban settings unrelated to the route',
      'plain anonymous boat interiors without superyacht refinement',
    ],

    hard: [
      'snow',
      'winter coats',
      'storm default mood',
      'festival crowd energy',
      'nightclub chaos',
      'officewear',
      'business-meeting atmosphere',
      'studio backdrop feeling',
      'desert or jungle travel references',
      'mountain chalet energy',
      'cheap fast-fashion styling',
      'switching to a different yacht mid-story',
    ],
  },

  routeRules: {
    worldIdentity: [
      'Luxury Yacht Riviera must feel like one persistent yacht moving through Amalfi Coast and Monaco prestige zones',
      'the yacht is not a generic prop; it must feel like the same vessel across the entire story',
      'the world should combine private onboard life, visible marina arrivals, famous coastal stops, and refined night return',
    ],

    humanFlow: [
      'the day must evolve naturally from waking on the yacht to sleeping on the same yacht',
      'morning phases should feel private and onboard',
      'late morning should allow marina arrivals, harbor entries, tender transfers, and polished public visibility',
      'lunch should feel like a real coastal or club stop connected to the yacht route',
      'afternoon should allow sun deck, swim platform, cove, bay, and offshore leisure transitions',
      'reset must feel like returning into the yacht to cool down shower and change',
      'golden hour should use sailing lines rails foredecks or prestige sunset coastlines',
      'evening must feel more polished than afternoon and still tied back to the yacht',
      'night must return completely to onboard privacy',
    ],

    styling: [
      'use sleepwear towel looks resortwear marina daywear swimwear golden-hour styling dinnerwear and nightwear with clear progression',
      'wardrobe should evolve across the day and reflect yacht-to-shore transitions',
      'swimwear should not appear at dinner',
      'nightwear should only appear in night phase',
      'towel or robe moments should only appear in refresh or reset phases',
      'marina and Monaco scenes should feel more polished than pure offshore leisure scenes',
    ],

    atmosphere: [
      'keep the world Mediterranean expensive and believable',
      'maintain real-world yacht logic with decks marinas tenders harbor arrivals coves bays coastlines and waterfronts',
      'Amalfi should feel sunlit dramatic coastal and sensual while Monaco should feel more visible polished and socially prestigious',
      'water reflections sea air marine surfaces and harbor glow should shape the whole day naturally',
    ],
  },
}