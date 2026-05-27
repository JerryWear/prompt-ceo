// Day World profiles for Perfect Day™
// Extended from story worlds — optimized for full-day cinematic sequences

export const DAY_WORLDS = {
  maldives_villa: {
    id: 'maldives_villa',
    name: 'Maldives Villa',
    environment: 'overwater bungalow, crystal turquoise water, infinity pool, private deck',
    palette: 'turquoise, white, sand, pale coral',
    texture: 'warm wood, woven rattan, white linen, glass',
    lighting: 'tropical natural light, strong sun, ocean reflection, golden hour over water',
    soundscape: 'gentle waves, distant birds, complete stillness',
    mood: 'aspirational escape, total luxury, untouched paradise',
    peakMoments: ['waking_up', 'breakfast', 'outdoor_walk', 'lunch', 'evening_rest'],
    style: 'aspirational_lifestyle',
    bestFor: ['travel brands', 'luxury lifestyle', 'personal brand', 'wellness'],
    visualTone: 'bright, airy, saturated ocean blues, clean whites',
    sceneVariations: {
      waking_up: 'overwater bungalow bedroom, glass floor, water visible below, morning light on pale linen',
      breakfast: 'outdoor deck table over water, fresh tropical fruit, coffee, ocean horizon',
      outdoor_walk: 'walking on the dock above crystal water, barefoot, towel over shoulder',
      lunch: 'open-air pavilion restaurant over water, fresh seafood or salad, cold drink',
      evening_rest: 'deck lounger at sunset, water turning gold, drink in hand, completely still',
    },
  },

  luxury_penthouse: {
    id: 'luxury_penthouse',
    name: 'Luxury Penthouse',
    environment: 'top-floor city apartment, floor-to-ceiling glass, city skyline, private terrace',
    palette: 'charcoal, warm gold, crisp white, dark steel',
    texture: 'polished concrete, leather, glass, brushed metal, marble',
    lighting: 'city light at night, clean daylight through glass, architectural lighting',
    soundscape: 'city hum far below, air conditioning, total silence inside',
    mood: 'high-status urban luxury, achievement, elevated above',
    peakMoments: ['waking_up', 'work_planning', 'evening_rest', 'bed_preparation'],
    style: 'luxury',
    bestFor: ['personal brand', 'coaching', 'saas', 'agency', 'luxury goods'],
    visualTone: 'dark rich tones, sharp architecture, glass and light, premium materials',
    sceneVariations: {
      waking_up: 'king bed facing floor-to-ceiling city view, white linen, morning city light flooding in',
      work_planning: 'minimal desk setup against glass wall, laptop, city behind, clean and powerful',
      evening_rest: 'sectional sofa with city lights behind, low lamp, premium simplicity',
      bed_preparation: 'bedside lamp, marble nightstand, premium skincare, city dark outside',
    },
  },

  coastal_house: {
    id: 'coastal_house',
    name: 'Coastal House',
    environment: 'cliffside home, ocean view, natural materials, outdoor terraces, wild garden',
    palette: 'white, terracotta, sea blue, sage green, sun-bleached wood',
    texture: 'natural stone, linen, driftwood, whitewash plaster, clay',
    lighting: 'Mediterranean natural light, warm and direct, deep shadows, sea glitter',
    soundscape: 'waves below, wind through grass, birds, distant boat',
    mood: 'organic luxury, grounded freedom, coastal intelligence',
    peakMoments: ['waking_up', 'breakfast', 'outdoor_walk', 'cooking', 'evening_rest'],
    style: 'aspirational_lifestyle',
    bestFor: ['wellness brands', 'personal brand', 'creator', 'food brands', 'lifestyle'],
    visualTone: 'warm naturals, sun-drenched, organic textures, bright with depth',
    sceneVariations: {
      waking_up: 'white bedroom, open window, sea visible, light gauze curtain moving, warm linen',
      breakfast: 'stone terrace table, fruit, bread, coffee, sea in background',
      outdoor_walk: 'cliff path overlooking sea, creator walking, wild plants, natural freedom',
      cooking: 'terracotta kitchen, natural materials, creator cooking with window view to sea',
      evening_rest: 'outdoor terrace at sunset, stone wall, sea golden, stillness',
    },
  },

  urban_apartment: {
    id: 'urban_apartment',
    name: 'Urban Apartment',
    environment: 'city loft, industrial chic, rooftop access, large windows, brick or concrete',
    palette: 'grey, warm black, wood tones, occasional bold accent',
    texture: 'exposed brick, raw concrete, hardwood, steel, glass',
    lighting: 'urban daylight, city glow at night, industrial pendant lights',
    soundscape: 'city traffic, sirens, footsteps, coffee shop below',
    mood: 'creative urban energy, hustle with aesthetic, authentic city life',
    peakMoments: ['morning_routine', 'work_planning', 'outdoor_walk', 'gym_fitness', 'home_transition'],
    style: 'ugc',
    bestFor: ['creator', 'personal brand', 'ecommerce', 'fashion', 'fitness'],
    visualTone: 'authentic, energetic, real city textures, honest and alive',
    sceneVariations: {
      morning_routine: 'industrial bathroom, exposed pipe, city window, intentional skincare',
      work_planning: 'large wooden desk, city window, multiple screens, notebooks, real creative work',
      outdoor_walk: 'city street level, moving through crowds, creator in their element',
      gym_fitness: 'urban gym or rooftop workout, city as backdrop, grit and environment together',
      home_transition: 'loft entry, keys dropped on industrial shelf, city noise fading as door closes',
    },
  },

  countryside_estate: {
    id: 'countryside_estate',
    name: 'Countryside Estate',
    environment: 'rolling hills, stone manor or farmhouse, formal gardens, orchards, morning mist',
    palette: 'deep green, cream, rich brown, slate grey, earth tones',
    texture: 'stone, heavy wool, old wood, copper, cotton',
    lighting: 'English or European countryside light, soft and diffused, mist, golden afternoon',
    soundscape: 'birdsong, distant sheep, wind in trees, gravel underfoot',
    mood: 'old money quiet, landed luxury, intellectual calm, heritage confidence',
    peakMoments: ['waking_up', 'breakfast', 'outdoor_walk', 'cooking', 'evening_rest'],
    style: 'high_status',
    bestFor: ['luxury brands', 'coaching', 'personal brand', 'high-ticket offers'],
    visualTone: 'muted naturals, depth of field, rich textures, timeless not trendy',
    sceneVariations: {
      waking_up: 'manor bedroom, heavy curtains pulled open to garden, mist on hills, old timber bed',
      breakfast: 'stone kitchen table, eggs, bread, coffee pot, garden window',
      outdoor_walk: 'through formal gardens or fields, wellington boots, unhurried, owner energy',
      cooking: 'aga or open kitchen, heavy pots, fresh vegetables from garden, real domestic luxury',
      evening_rest: 'library or drawing room, fireplace, leather chair, whiskey, books',
    },
  },

  dubai_highrise: {
    id: 'dubai_highrise',
    name: 'Dubai High-Rise',
    environment: 'ultra-luxury tower, desert skyline, pool terrace, supercars visible below',
    palette: 'gold, white, desert amber, night black, city lights',
    texture: 'marble, gold fixtures, glass, high-gloss surfaces, silk',
    lighting: 'intense desert sun, dramatic artificial light at night, gold everywhere',
    soundscape: 'air conditioning, distant traffic far below, pool water, silence at height',
    mood: 'extreme wealth display, global power, ambition fulfilled',
    peakMoments: ['waking_up', 'work_planning', 'gym_fitness', 'evening_rest'],
    style: 'dark_luxury',
    bestFor: ['luxury brands', 'high-ticket coaching', 'real estate', 'finance'],
    visualTone: 'gold tones, high contrast, dramatic architecture, unapologetic wealth',
    sceneVariations: {
      waking_up: 'ultra-luxury bedroom, city of Dubai waking below, gold accents, silk sheets',
      work_planning: 'glass desk against panoramic Dubai skyline, commanding and powerful',
      gym_fitness: 'private gym overlooking city or pool terrace workout, dramatic scale',
      evening_rest: 'infinity pool at night, Dubai lit below, total elevation from the world',
    },
  },

  tokyo_apartment: {
    id: 'tokyo_apartment',
    name: 'Tokyo Apartment',
    environment: 'modern Japanese minimal apartment, city grid view, clean lines, bonsai, precision',
    palette: 'white, grey, pale wood, moss green, cherry blossom pink',
    texture: 'shoji paper, pale timber, stone, clean glass, ceramic',
    lighting: 'diffused Japanese light, soft and even, dawn and dusk especially beautiful',
    soundscape: 'rain on glass, distant city, train passing, complete interior stillness',
    mood: 'disciplined calm, aesthetic precision, intelligent minimalism, cultural depth',
    peakMoments: ['morning_routine', 'breakfast', 'work_planning', 'cooking', 'bed_preparation'],
    style: 'cinematic',
    bestFor: ['personal brand', 'creator', 'saas', 'product', 'fashion'],
    visualTone: 'minimal, precise, every object chosen, negative space as beauty',
    sceneVariations: {
      morning_routine: 'minimal bathroom, single plant, precise ritual, no clutter, fog on window',
      breakfast: 'low table, matcha or coffee, single beautiful cup, window to city, intentional',
      work_planning: 'clean desk, one notebook, laptop, city visible, total focus environment',
      cooking: 'minimal kitchen, precise chopping, steam rising, few beautiful ingredients',
      bed_preparation: 'futon on floor or low platform, single lamp, night city glow, absolute stillness',
    },
  },

  paris_apartment: {
    id: 'paris_apartment',
    name: 'Paris Apartment',
    environment: 'Haussmann-era apartment, balcony overlooking roofline, high ceilings, art, warmth',
    palette: 'cream, warm gold, dark wood, dusty rose, sage, aged white',
    texture: 'parquet floor, plaster moulding, heavy curtains, marble mantle, linen',
    lighting: 'Parisian grey-white diffused light, warm lamp interior, balcony light dramatic',
    soundscape: 'street sounds from below, pigeons, distant accordion, café noise rising',
    mood: 'old world elegance, effortless taste, intellectual romance, lived-in luxury',
    peakMoments: ['breakfast', 'outdoor_walk', 'lunch', 'evening_rest', 'bed_preparation'],
    style: 'luxury',
    bestFor: ['fashion brands', 'luxury goods', 'personal brand', 'creator', 'beauty'],
    visualTone: 'warm and layered, textured, romantic architecture, timelessly beautiful',
    sceneVariations: {
      breakfast: 'balcony table, croissant, coffee, Parisian rooflines behind, morning light',
      outdoor_walk: 'Haussmann boulevard, creator in city, cafe terraces, natural urban elegance',
      lunch: 'bistro table on the street, wine, salad, watching Paris move',
      evening_rest: 'tall windows at dusk, lamps warming the room, Paris outside going golden',
      bed_preparation: 'high-ceiling bedroom, single lamp, parquet floor, old and new together',
    },
  },
}

export function getWorldById(id) {
  return DAY_WORLDS[id] || null
}

export function getWorldList() {
  return Object.values(DAY_WORLDS).map(w => ({
    id: w.id,
    name: w.name,
    mood: w.mood,
    style: w.style,
    bestFor: w.bestFor,
  }))
}

export function getWorldsForStyle(style) {
  return Object.values(DAY_WORLDS).filter(w => w.style === style)
}

export function getSceneForMoment(worldId, momentId) {
  const world = DAY_WORLDS[worldId]
  if (!world) return null
  return world.sceneVariations?.[momentId] || world.environment
}
