export const WORLD_CAPRI = {
  id: 'capri',
  name: 'Capri',
  description:
    'A cinematic Capri world of Italian island aristocracy — villa terrace mornings above the Tyrrhenian Sea, funicular rides into Capri Town, Via Camerelle boutique elegance at midday, Faraglioni rock boat trips and Marina Piccola swimming in the afternoon, golden-hour cocktails at the Piazzetta, and candlelit terrace dinners above the glittering sea with Vesuvius visible on the horizon.',

  geography: {
    country: 'Italy',
    region: 'Capri Town, Anacapri, Via Camerelle, Marina Grande, Marina Piccola, Faraglioni rocks, Blue Grotto, Villa San Michele gardens, La Piazzetta, and private villa terraces above the Tyrrhenian and Gulf of Naples',
  },

  identity: {
    archetype: 'high-status Capri woman',
    vibe: ['Italian island aristocracy', 'old European glamour meets Mediterranean warmth', 'the island where style was invented', 'lemon trees, white linen, and ancient Roman prestige', 'effortless Italian luxury above the bluest sea in the world'],
    tone: ['elegant', 'warm', 'golden', 'aristocratic', 'effortless', 'Italian', 'cinematic', 'timeless'],
    persona: ['completely at ease in the most refined island in Italy', 'wearing linen and gold in the most beautiful light in the Mediterranean', 'moving through Capri as if she has always been here', 'magnetically Italian-elegant in both private villa and public piazzetta settings', 'high-status without effort in the world\'s most naturally glamorous island'],
  },

  phaseOrder: ['wake', 'morning_refresh', 'getting_dressed', 'breakfast', 'late_morning', 'lunch', 'afternoon', 'reset', 'golden_hour', 'dinner', 'evening', 'night'],

  phases: {
    wake: { label: 'Wake', timeWindows: ['first Tyrrhenian Sea light entering a villa bedroom above the blue water', 'pale Italian island dawn in a Capri villa suite', 'early morning stillness above the sea before the funicular begins'], pacing: 'slow', subLocations: ['capri_villa', 'hotel_punta_tragara'] },
    morning_refresh: { label: 'Morning Refresh', timeWindows: ['bright villa bathroom with Italian morning sea light', 'Capri morning self-care above the Tyrrhenian', 'fresh lemon-scented island morning in a private villa suite'], pacing: 'slow', subLocations: ['capri_villa', 'hotel_punta_tragara'] },
    getting_dressed: { label: 'Getting Dressed', timeWindows: ['linen and gold Italian island morning dressing', 'bright Capri light in a villa wardrobe area', 'choosing island daywear in warm morning Italian sun'], pacing: 'slow', subLocations: ['capri_villa', 'hotel_punta_tragara'] },
    breakfast: { label: 'Breakfast', timeWindows: ['villa terrace breakfast above the Tyrrhenian Sea in morning gold', 'Hotel breakfast with full Faraglioni view in warm Italian morning', 'slow Capri café morning on a terrace above the sea'], pacing: 'slow', subLocations: ['capri_villa', 'hotel_punta_tragara'] },
    late_morning: { label: 'Late Morning', timeWindows: ['Via Camerelle boutique walk in bright Capri midmorning', 'La Piazzetta late morning café before the heat', 'funicular descent to Marina Grande in clear Italian light'], pacing: 'medium', subLocations: ['capri_town', 'via_camerelle'] },
    lunch: { label: 'Lunch', timeWindows: ['restaurant terrace lunch above the sea in Capri midday', 'slow Italian island lunch in the shade of a white umbrella', 'seafood and limoncello at a Marina Grande waterfront table'], pacing: 'slow', subLocations: ['capri_town', 'marina_grande'] },
    afternoon: { label: 'Afternoon', timeWindows: ['boat trip to the Faraglioni and Blue Grotto in afternoon sun', 'Marina Piccola swimming in turquoise water', 'Villa San Michele garden in warm afternoon island light'], pacing: 'medium', subLocations: ['faraglioni_boat', 'marina_piccola', 'villa_san_michele'] },
    reset: { label: 'Reset', timeWindows: ['villa afternoon cool-down before the Capri evening', 'hotel suite reset with Faraglioni view before dinner', 'pre-evening Capri private suite quiet above the blue sea'], pacing: 'slow', subLocations: ['capri_villa', 'hotel_punta_tragara'] },
    golden_hour: { label: 'Golden Hour', timeWindows: ['La Piazzetta at golden hour with the whole of Capri glowing', 'villa terrace above the Tyrrhenian as the sea turns liquid gold', 'Faraglioni rocks in warm amber evening light from a boat or terrace'], pacing: 'slow', subLocations: ['capri_town', 'capri_villa'] },
    dinner: { label: 'Dinner', timeWindows: ['candlelit terrace dinner above the Tyrrhenian with Vesuvius on the horizon', 'Capri Town restaurant in warm Italian evening light', 'Marina Grande seafood dinner by the water as the island quiets'], pacing: 'slow', subLocations: ['capri_villa', 'capri_town'] },
    evening: { label: 'Evening', timeWindows: ['La Piazzetta social evening scene after dinner', 'Capri Town slow after-dinner walk through lantern-lit lanes', 'villa terrace cocktail above the glowing sea at night'], pacing: 'slow', subLocations: ['capri_town', 'capri_villa'] },
    night: { label: 'Night', timeWindows: ['private villa terrace above the lit sea after midnight', 'quiet Capri Town lane in warm Italian island darkness', 'villa suite bedroom in deep Italian island night'], pacing: 'slow', subLocations: ['capri_villa', 'hotel_punta_tragara'] },
  },

  locations: [
    'private villa terrace above the Tyrrhenian Sea', 'Hotel Punta Tragara terrace with Faraglioni view', 'Via Camerelle boutique street in midday Italian sun', 'La Piazzetta social square at any hour', 'funicular between Marina Grande and Capri Town', 'Faraglioni rocks by boat in afternoon light', 'Marina Piccola turquoise cove swimming', 'Villa San Michele garden with Gulf of Naples view', 'candlelit Capri Town terrace dinner above the sea',
  ],

  subLocations: {
    capri_villa: {
      label: 'Capri Villa',
      realPlace: 'Private Villas, Capri',
      locations: ['villa terrace above the Tyrrhenian Sea with lemon trees', 'villa infinity pool above the blue water', 'villa bedroom with arched Italian window and sea view', 'villa garden with bougainvillea and sea light'],
      sceneGroups: {
        wake: ['waking in a Capri villa bedroom above the Tyrrhenian in pale Italian morning light', 'slow linen luxury morning in a private island villa above the sea', 'first golden Mediterranean light entering through arched villa windows'],
        morning_refresh: ['villa bathroom in warm Italian morning sea light', 'lemon-tree morning scent in a Capri villa suite', 'fresh self-care in a bright Italian island villa interior'],
        getting_dressed: ['linen and gold island dressing in a Capri villa wardrobe', 'choosing daywear in warm sea-light morning', 'mirror moment in an Italian villa above the Tyrrhenian'],
        breakfast: ['villa terrace breakfast above the sea with lemon trees and morning light', 'private Capri island breakfast with Vesuvius visible on the horizon', 'slow Italian island morning above the Tyrrhenian'],
        reset: ['villa pool afternoon cooldown above the sea', 'private Capri suite quiet before the island evening', 'pre-dinner villa terrace relaxation above the blue water'],
        golden_hour: ['villa terrace at golden hour — the Tyrrhenian Sea turning liquid gold below', 'lemon trees and warm amber Italian island light on a private terrace', 'the most beautiful golden hour private terrace view in the Mediterranean'],
        dinner: ['villa terrace candlelit dinner with Vesuvius and the sea below', 'private Capri island dinner above the glowing Tyrrhenian', 'intimate terrace meal in warm Italian island evening'],
        evening: ['villa terrace cocktail above the lit sea after dinner', 'private Capri evening above the quiet island night'],
        night: ['private villa bedroom in deep Italian island quiet above the sea', 'late villa terrace above the glowing Tyrrhenian after midnight'],
      },
    },

    hotel_punta_tragara: {
      label: 'Hotel Punta Tragara',
      realPlace: 'Punta Tragara, Capri',
      locations: ['Punta Tragara terrace with direct Faraglioni view', 'hotel pool above the sea with Faraglioni behind', 'hotel suite with full sea and rock panorama', 'Punta Tragara breakfast terrace in morning gold'],
      sceneGroups: {
        wake: ['waking in a Punta Tragara suite with the Faraglioni rocks directly ahead', 'Italian island luxury hotel morning above the Tyrrhenian'],
        morning_refresh: ['hotel suite bathroom with sea light and Faraglioni through the window', 'warm Italian morning in the best-positioned hotel suite in Capri'],
        breakfast: ['Punta Tragara terrace breakfast with Faraglioni as backdrop in morning gold', 'slow Italian hotel breakfast with the most beautiful view in Capri'],
        reset: ['hotel pool above the Faraglioni before the evening', 'Punta Tragara suite reset with the sea below'],
        night: ['Punta Tragara suite at night above the glowing sea with Faraglioni silhouette', 'private Italian island hotel quiet at the end of the Capri day'],
      },
    },

    capri_town: {
      label: 'Capri Town & La Piazzetta',
      realPlace: 'Capri Town, Capri',
      locations: ['La Piazzetta café table in bright Capri social square', 'Capri Town lane between white-washed buildings', 'after-dinner Piazzetta social scene', 'lantern-lit Capri Town evening walk'],
      sceneGroups: {
        late_morning: ['La Piazzetta morning café in warm Capri social square', 'Capri Town lane movement in bright Italian midmorning'],
        lunch: ['restaurant terrace above the town in Capri midday', 'La Piazzetta lunch table in the social center of the island'],
        golden_hour: ['La Piazzetta at golden hour — the whole island\'s social gathering point as it glows', 'Capri Town at the most beautiful moment of the Italian island day'],
        dinner: ['Capri Town candlelit terrace dinner in warm Italian evening', 'restaurant above the Piazzetta with sea visible beyond'],
        evening: ['La Piazzetta after-dinner social scene', 'Capri Town lantern-lit lane walk after dinner', 'Italian island social evening at its most effortlessly elegant'],
      },
    },

    via_camerelle: {
      label: 'Via Camerelle',
      realPlace: 'Via Camerelle, Capri',
      locations: ['Via Camerelle luxury boutique street in Capri midday', 'covered arcade boutique walk in Italian island sun', 'Capri fashion boutique interior in bright island light'],
      sceneGroups: {
        late_morning: ['Via Camerelle boutique walk in strong Capri midmorning light', 'luxury Italian island boutique exploration in the sun', 'Capri fashion and accessories in the most elegant island shopping street'],
      },
    },

    faraglioni_boat: {
      label: 'Faraglioni by Boat',
      realPlace: 'Faraglioni Rocks, Capri',
      locations: ['wooden boat below the Faraglioni rock arches', 'open sea between Capri and the Faraglioni in afternoon sun', 'boat swimming platform above turquoise Tyrrhenian water', 'private boat deck with full island coastal view'],
      sceneGroups: {
        afternoon: ['boat afternoon below the Faraglioni arches in turquoise water', 'swimming from a private boat in open Tyrrhenian blue', 'afternoon boat trip around the Capri coastline in full Italian sun'],
      },
    },

    marina_piccola: {
      label: 'Marina Piccola',
      realPlace: 'Marina Piccola, Capri',
      locations: ['Marina Piccola turquoise cove swimming platform', 'beach club sunbed above the cove water', 'Marina Piccola waterfront café', 'swimming in the clearest water in the Mediterranean'],
      sceneGroups: {
        afternoon: ['Marina Piccola swimming in turquoise Capri cove water', 'luxury beach club daybed above the cove', 'afternoon swim in the clearest Italian sea'],
      },
    },

    marina_grande: {
      label: 'Marina Grande',
      realPlace: 'Marina Grande, Capri',
      locations: ['Marina Grande waterfront seafood restaurant', 'port-side café with boats and island view', 'funicular departure point above the harbor'],
      sceneGroups: {
        lunch: ['Marina Grande seafood lunch at the waterfront', 'slow Italian island lunch by the port with boats beyond'],
      },
    },

    villa_san_michele: {
      label: 'Villa San Michele',
      realPlace: 'Anacapri, Capri',
      locations: ['Villa San Michele garden with Gulf of Naples panorama', 'Anacapri terrace garden in warm afternoon light', 'Villa San Michele loggia with ancient Roman artifacts'],
      sceneGroups: {
        afternoon: ['Villa San Michele garden above the Gulf of Naples in warm afternoon', 'Anacapri garden walk with the most elevated Capri view', 'terraced garden in warm Italian afternoon above the sea'],
      },
    },
  },

  sceneVariants: {
    wake: ['Capri villa bedroom above the Tyrrhenian in pale Italian dawn', 'Punta Tragara hotel suite with Faraglioni rocks ahead', 'slow linen island morning in a private Capri villa'],
    morning_refresh: ['villa bathroom above the sea in warm Italian morning', 'Punta Tragara suite self-care with sea light', 'lemon-scented fresh morning ritual in a Capri interior'],
    getting_dressed: ['linen and gold island dressing in a Capri villa', 'Italian island morning dressing with the sea behind', 'Via Camerelle-ready elegant island styling in warm light'],
    breakfast: ['villa terrace breakfast with lemon trees and Tyrrhenian below', 'Punta Tragara terrace breakfast with Faraglioni', 'slow Italian island café morning in Capri Town'],
    late_morning: ['Via Camerelle boutique walk in midmorning island sun', 'La Piazzetta café in warm Capri social morning', 'funicular ride between Marina Grande and Capri Town'],
    lunch: ['terrace restaurant above the town in Capri midday', 'Marina Grande seafood at the waterfront', 'slow Italian island lunch in warm shade and lemon tree light'],
    afternoon: ['Faraglioni boat trip below the rock arches', 'Marina Piccola turquoise cove swimming', 'Villa San Michele garden above the Gulf of Naples'],
    reset: ['villa terrace above the sea before the Capri evening', 'hotel suite with Faraglioni before dinner', 'private island calm in warm pre-golden-hour light'],
    golden_hour: ['La Piazzetta at golden hour — the whole island gathers', 'villa terrace above the liquid-gold Tyrrhenian', 'Faraglioni rocks in amber evening light'],
    dinner: ['candlelit villa terrace dinner with Vesuvius on the horizon', 'Capri Town restaurant above the Piazzetta in Italian evening', 'Marina Grande waterfront dinner as the island quiets'],
    evening: ['La Piazzetta after-dinner social scene', 'Capri Town lantern-lit lane walk', 'villa terrace cocktail above the glowing sea'],
    night: ['private villa above the lit Tyrrhenian after midnight', 'Capri Town quiet lane in warm Italian darkness', 'hotel suite in deep Italian island night'],
  },

  actionPools: {
    wake: ['slow Italian morning stretch in a villa bedroom above the sea', 'first view of the Tyrrhenian from a villa terrace at dawn', 'lying in linen before the Capri day begins'],
    morning_refresh: ['villa bathroom morning ritual with sea light', 'post-shower lemon-scented island morning', 'self-care in a warm Italian villa interior'],
    getting_dressed: ['choosing linen island daywear in a Capri villa', 'putting on Italian gold jewelry for the island day', 'mirror check above the Tyrrhenian in morning light'],
    breakfast: ['villa terrace breakfast with lemon tree and sea below', 'Punta Tragara terrace coffee with Faraglioni ahead', 'slow Capri café morning in the Piazzetta'],
    late_morning: ['Via Camerelle boutique exploration in midmorning', 'La Piazzetta social morning café pause', 'funicular ride with sea panorama opening below'],
    lunch: ['terrace restaurant above the sea in Italian island midday', 'Marina Grande waterfront seafood lunch', 'slow Italian island table in warm shadow and sea air'],
    afternoon: ['swimming from a boat below the Faraglioni arches', 'Marina Piccola turquoise cove swim', 'Villa San Michele garden walk above the Gulf'],
    reset: ['villa terrace rest before the golden hour', 'hotel pool cool-down above the sea', 'changing into evening styling in a warm villa interior'],
    golden_hour: ['La Piazzetta cocktail as the island turns gold', 'villa terrace above the liquid Tyrrhenian gold', 'boat approaching the Faraglioni in amber light'],
    dinner: ['villa terrace candlelit dinner above the sea', 'Capri Town restaurant in warm Italian evening', 'long slow Italian island dinner above the glowing water'],
    evening: ['La Piazzetta after-dinner social and people-watching', 'lantern-lit Capri Town lane walk', 'villa terrace late cocktail above the night sea'],
    night: ['private villa above the quiet island after midnight', 'Capri Town dark quiet lane', 'sleep above the Tyrrhenian in complete Italian island silence'],
  },

  environmentPools: {
    wake: ['villa bedroom with arched window, sea panorama, morning gold entering low through shutters', 'Punta Tragara suite above the Faraglioni in pale Italian dawn', 'white linen and sea light in a private Capri villa morning'],
    morning_refresh: ['villa bathroom — warm, lemon-scented, sea light through a small Italian window', 'Punta Tragara hotel bathroom with Tyrrhenian beyond the glass', 'bright Italian island suite bathroom in warm morning sea fill'],
    getting_dressed: ['Capri villa dressing area — white linen wardrobe, gold jewelry on the surface, sea behind', 'island mirror in an Italian villa with terrace door open to warm morning', 'warm light on open linen pieces and Italian island accessories'],
    breakfast: ['villa terrace — white tablecloth, espresso, lemon tree, Tyrrhenian below, Vesuvius on horizon', 'Punta Tragara breakfast terrace — Faraglioni rocks, morning gold, Italian service', 'Piazzetta café table in warm morning social Italian square'],
    late_morning: ['Via Camerelle covered boutique arcade in strong Capri midday light', 'La Piazzetta — white square, pastel architecture, Italian social morning', 'funicular car ascending or descending with full sea panorama opening'],
    lunch: ['Capri Town terrace restaurant — white tablecloth, sea view, Italian lunch setting', 'Marina Grande waterfront table — port, boats, Italian island midday warmth', 'outdoor café with lemon tree shade and the Tyrrhenian beyond the terrace edge'],
    afternoon: ['private wooden boat below the Faraglioni arches — turquoise, rock, sun', 'Marina Piccola cove — layered turquoise from shallow to deep, white pebble, Italian beach club', 'Villa San Michele loggia — Roman marble, Italian garden, Gulf of Naples panorama'],
    reset: ['villa terrace in shade before the golden hour — light warm, sea bright below', 'hotel suite with Faraglioni visible in late afternoon warmth', 'villa garden in warm afternoon with lemon trees casting long shadows'],
    golden_hour: ['La Piazzetta in amber Italian golden hour — pastel walls warm, social scene lit by the last sun', 'villa terrace above the Tyrrhenian turning liquid gold — the finest view in Italy', 'Faraglioni rocks in warm amber backlight from the setting Italian sun'],
    dinner: ['villa terrace at night — candles, Vesuvius glowing on the horizon, sea black below', 'Capri Town restaurant terrace — warm ambient lantern light, Italian evening elegance', 'Marina Grande waterfront dinner — boats, water reflections, warm Italian night air'],
    evening: ['La Piazzetta after dark — lanterns, social energy, Italian island night', 'Capri Town lane in warm after-dark lantern and restaurant glow', 'villa terrace above the lit sea — private, warm, Italian island night air'],
    night: ['villa bedroom in Italian island silence above the dark Tyrrhenian', 'Punta Tragara suite at night with Faraglioni silhouette in moonlight', 'Capri Town lane in deep warm summer Italian darkness'],
  },

  moodPools: {
    wake: ['slow Italian island morning luxury above the best sea in the world', 'the rare privilege of waking in a private villa above the Tyrrhenian', 'effortless Italian elegance beginning in linen and sea light'],
    morning_refresh: ['lemon-scented fresh Italian island morning energy', 'warm bright self-care with the Mediterranean below', 'composed Italian island preparation before the day opens'],
    getting_dressed: ['effortless Italian island styling energy — linen, gold, ease', 'the pleasure of dressing for the most naturally glamorous island', 'warm daywear anticipation before Via Camerelle and the Piazzetta'],
    breakfast: ['slow Italian island morning indulgence at the world\'s best breakfast terrace', 'the perfect Mediterranean morning — sea, coffee, lemon, gold light', 'private villa elevation at the most peaceful moment of the Capri day'],
    late_morning: ['Italian island boutique and social elegance', 'La Piazzetta morning — the world\'s most beautiful social square', 'Via Camerelle fashion-forward Italian island movement'],
    lunch: ['slow Italian island lunch pleasure — seafood, wine, sea air, no rush', 'the best lunch culture in the world, on the most beautiful island', 'warm Mediterranean midday indulgence at a terrace above everything'],
    afternoon: ['Faraglioni — the most cinematic boat experience in Italy', 'turquoise Marina Piccola cove swimming — pure Mediterranean freedom', 'Villa San Michele elevation and historical Italian garden beauty'],
    reset: ['villa or hotel private calm before the Capri evening opens', 'the quiet pleasure between an afternoon of beauty and an evening of elegance', 'warm pre-golden-hour private Italian island ease'],
    golden_hour: ['La Piazzetta at golden hour — the whole island\'s most beautiful and social moment', 'villa terrace liquid gold Tyrrhenian — the finest private sunset view in all Italy', 'Italian island golden hour: effortless, warm, ancient, eternal'],
    dinner: ['candlelit terrace dinner above the sea — the world\'s most romantic dinner setting', 'Italian island dinner elegance — slow, warm, beautiful, perfectly Italian', 'Capri Town evening charm in the lantern-lit social island night'],
    evening: ['La Piazzetta after dinner — the most civilized evening ritual in the Mediterranean', 'effortless Italian island social elegance in warm dark lanes', 'villa terrace private cocktail above the quiet sea — deeply satisfying'],
    night: ['deep Italian island quiet above the dark Tyrrhenian', 'private Capri evening — complete, beautiful, warm, ancient', 'the hush of one of the world\'s most aristocratic islands after midnight'],
  },

  cameraPools: {
    wake: ['85mm villa bedroom close, arched window and sea in pale background behind', '135mm intimate Italian morning close, golden sea light as soft rim fill', '35mm wide villa suite, Tyrrhenian panorama through open shutters behind'],
    morning_refresh: ['85mm villa bathroom, sea light through small window behind', '50mm Italian suite bathroom detail, warm morning fill', '135mm lemon detail or skincare close, warm villa interior behind'],
    getting_dressed: ['85mm villa wardrobe, open terrace door and sea behind', '50mm mirror shot, Italian linen and gold detail framing', '35mm wide villa dressing area, sea view dissolving behind'],
    breakfast: ['35mm wide villa terrace breakfast, Tyrrhenian filling background', '85mm seated espresso close, Faraglioni compressed softly behind', '50mm Piazzetta café table, pastel square architecture behind'],
    late_morning: ['50mm Via Camerelle boutique street, covered arcade receding behind', '85mm Piazzetta front-facing, Italian square social energy behind', '35mm funicular with sea panorama opening behind and below'],
    lunch: ['85mm terrace lunch, sea and Italian town behind in soft distance', '50mm Marina Grande waterfront table, port and boats behind', '35mm wide terrace, Tyrrhenian filling entire background'],
    afternoon: ['85mm boat close, Faraglioni arch and turquoise water behind', '50mm Marina Piccola swimming, cove and blue water behind', '35mm Villa San Michele garden, Gulf of Naples panorama behind'],
    reset: ['85mm villa terrace close, sea in warm late-afternoon bokeh behind', '135mm pre-golden-hour intimate, lemon tree detail in warm focus', '50mm hotel suite with Faraglioni visible through glass behind'],
    golden_hour: ['135mm Piazzetta backlit close, warm amber Italian square behind', '24mm wide villa terrace, liquid gold Tyrrhenian filling background', '85mm golden hour side profile, warm amber island light defining edge'],
    dinner: ['85mm villa terrace candlelit close, sea dark and Vesuvius glowing behind', '50mm Capri Town restaurant terrace, lantern glow behind in bokeh', '35mm wide terrace dinner, Italian evening sea panorama behind'],
    evening: ['35mm Piazzetta after dark, lantern glow and social energy behind', '85mm Capri Town lane close, warm amber lane light dissolving behind', '50mm villa terrace night, sea lights below in deep bokeh'],
    night: ['135mm villa bedroom close, moonlit sea visible through arched window', '85mm suite at night, warm lamp, Italian island dark beyond', '50mm terrace night close, ambient sea glow below in background'],
  },

  lightingPools: {
    wake: ['pale 5200K golden Mediterranean dawn entering through villa shutters, Tyrrhenian sea faint gold below', 'soft Italian island morning light bouncing off white villa surfaces into bedroom', 'first Capri daylight — warm already even at dawn, sea reflections multiplying the fill'],
    morning_refresh: ['clean 5500K Italian morning on white villa bathroom surfaces, sea light as secondary fill through window', 'warm bright bathroom in a Capri villa — no drama, just warm precise Italian morning light', 'lemon-gold morning light entering a small villa bathroom window, warm and directional'],
    getting_dressed: ['strong 5000K Italian island morning, white villa walls as giant reflectors, gold jewelry catching direct light', 'warm rich Mediterranean morning fill in a villa wardrobe area', 'Capri morning — the particular warm gold of Italian island daylight at its most beautiful'],
    breakfast: ['brilliant terrace morning at 5500K — sea reflection adding secondary warm fill from below', 'Piazzetta café in direct Italian morning sun, pastel walls multiplying warm ambient', 'Punta Tragara terrace at 5200K, Faraglioni adding mass to the background, sea as reflector below'],
    late_morning: ['5000K strong Italian midday on Via Camerelle white marble, shadow under the arcade protecting', 'Piazzetta in full Mediterranean sun — hard specular on sunglasses, fabrics bright', 'funicular in clear Capri midday — open panorama light, sea brilliant below'],
    lunch: ['terrace lunch in shade — warm 5000K sea reflections as fill, overhead filtered', 'Marina Grande waterfront at noon — sea surface as reflector, overhead direct, warm', 'Italian island outdoor lunch — shade protecting from overhead, sea fill surrounding'],
    afternoon: ['boat afternoon — brilliant 4800K overhead, turquoise water as moving reflector from below', 'Marina Piccola — shallow gradient water as layered reflector, direct Mediterranean sun overhead', 'Villa San Michele — garden filtered afternoon at 4500K, warm and rich in the trees'],
    reset: ['warm late-afternoon villa terrace shade at 4200K, sea still brilliant beyond in contrast', 'hotel suite pre-golden-hour interior — warm amber beginning to filter in from the west', 'villa interior in the still warm quiet before the light turns gold'],
    golden_hour: ['rich 2800K Italian golden hour — white villa walls and lemon trees turning amber, sea turning liquid gold', 'La Piazzetta in golden hour — pastel architecture amber, social square warm and cinematic', 'Faraglioni rocks backlit in warm amber low sun, Tyrrhenian gold behind'],
    dinner: ['villa terrace candlelight at 1800K, sea dark below, Vesuvius faint warm glow on horizon', 'Capri Town restaurant at 2700K warm ambient, lanterns as fill sources', 'Italian island evening — warm candleflame key, secondary ambient at 2500K from restaurant interior'],
    evening: ['Piazzetta after dark — lantern warm at 2500K, café lighting at 2700K, social Italian night', 'Capri Town lane — 2200K warm lanterns between deep warm shadow', 'villa terrace at night — single candle or lantern, sea below as dark ambient mirror'],
    night: ['villa bedroom — one warm bedside lamp at 2200K, sea moonlight as faint ambient through arched window', 'Punta Tragara suite in dark Italian island night, Faraglioni in moonlight beyond glass', 'Capri Town dark lane — warm restaurant glow from doorways, warm Italian summer night ambient'],
  },

  stylingPools: {
    wardrobe: {
      wake: ['white linen Capri morning slip', 'Italian island villa robe or silk nightwear', 'soft morning island negligee or robe'],
      morning_refresh: ['villa towel or Italian robe post-shower', 'fresh Capri morning minimal', 'linen dressing gown in Italian morning light'],
      getting_dressed: ['white or ivory linen Capri island dress', 'Via Camerelle Italian fashion — elevated, effortless', 'gold-detailed Italian island daywear'],
      breakfast: ['easy terrace morning linen look', 'Italian island breakfast elegance', 'Capri morning natural chic'],
      late_morning: ['Via Camerelle boutique fashion — Dolce & Gabbana, Gucci, Italian designer', 'La Piazzetta elegant island social styling', 'elevated Italian island daywear'],
      lunch: ['Italian island lunch dress or elegant linen set', 'terrace restaurant refined Mediterranean styling', 'Marina Grande casual luxury'],
      afternoon: ['Italian boat or beach swimwear and cover-up', 'Marina Piccola beach club luxury', 'Villa San Michele garden elegant island afternoon'],
      reset: ['villa pre-evening linen or silk transition look', 'private terrace ease before dinner', 'Italian island pre-dinner natural elegance'],
      golden_hour: ['Piazzetta golden hour look — Italian, warm, elevated', 'villa terrace gold-hour dress or elegant cover', 'Capri sunset Italian glamour'],
      dinner: ['Italian island evening dress — flowing, warm-toned, elegant', 'villa terrace dinner styling — linen, silk, Italian', 'Capri Town candlelit dinner Italian refinement'],
      evening: ['Piazzetta after-dinner Italian social elegance', 'Capri Town lane evening warm styling', 'late villa terrace Italian night ease'],
      night: ['Italian island silk nightwear', 'private villa linen night intimacy', 'Capri bedroom natural end-of-day styling'],
    },
    details: {
      wake: ['morning hair loose in Italian island light', 'bare natural skin in warm Capri morning', 'barefoot on cool villa tile'],
      morning_refresh: ['post-shower natural Italian skin', 'lemon-fresh minimal morning detail', 'Italian island morning self-care ease'],
      getting_dressed: ['Italian gold jewelry', 'sandal strap and linen detail', 'designer Italian island accessory'],
      breakfast: ['espresso cup on terrace table', 'light morning Italian accessory', 'effortless island breakfast ease'],
      late_morning: ['Italian designer sunglasses', 'Via Camerelle boutique detail', 'Capri sandal and linen accessory'],
      lunch: ['wine glass in Italian island light', 'seafood and white linen table detail', 'terrace lunch Italian accessory'],
      afternoon: ['wet hair post-Faraglioni swim', 'boat railing or turquoise cove detail', 'Italian sun on sea-wet skin'],
      reset: ['pre-dinner Italian styling touch', 'villa terrace lemon and light detail', 'Capri pre-evening natural ease'],
      golden_hour: ['golden hour light on gold Italian jewelry', 'wine or Aperol Spritz in warm sunset light', 'Capri island glamour golden touch'],
      dinner: ['Italian candle reflection in glassware', 'refined dinner jewelry in warm island light', 'Capri terrace dinner Italian finishing detail'],
      evening: ['Piazzetta social Italian elegance', 'after-dinner Italian lane warmth detail', 'villa night cocktail terrace touch'],
      night: ['Italian silk on warm skin', 'private island night natural detail', 'Capri bedroom intimate end-of-evening ease'],
    },
  },

  sensoryPools: {
    wake: ['warm sea air entering a villa bedroom through arched Italian shutters at dawn', 'lemon blossom scent from the villa garden below', 'the sound of the Tyrrhenian — faint, constant, below everything'],
    morning_refresh: ['lemon-scented villa bathroom morning in Italian island warmth', 'warm shower water and sea light and the smell of the Mediterranean morning', 'the luxury of a private Italian island villa morning — everything warm, beautiful, slow'],
    getting_dressed: ['smooth Italian linen against fresh morning skin', 'gold jewelry warm against summer-ready skin', 'the anticipation of a perfect Capri day — boat, Piazzetta, Via Camerelle, sea'],
    breakfast: ['espresso warmth and Italian pastry and the sea below all at once', 'lemon tree shade on the terrace, sea visible between the branches', 'the best breakfast view in the world — Tyrrhenian, gold, lemon, Italy'],
    late_morning: ['Via Camerelle — Italian perfume, white marble, fashion, strong sun', 'La Piazzetta social Italian morning energy — coffee, conversation, bella figura', 'the particular warmth of Italian island midmorning air'],
    lunch: ['cold Italian white wine against hot Mediterranean air', 'fresh seafood and lemon and the sea below the terrace all at once', 'the slow Italian island lunch — the finest expression of Mediterranean living'],
    afternoon: ['turquoise Faraglioni water and the arch of rock above you on the boat', 'Marina Piccola swimming — the clearest water in the Mediterranean on your skin', 'Villa San Michele garden — jasmine, history, Gulf of Naples from above'],
    reset: ['warm villa shade before the Capri evening', 'the particular pleasure of a pre-dinner Capri terrace pause', 'the Italian island luxury of having nowhere to be until the golden hour'],
    golden_hour: ['La Piazzetta — the whole island together in the golden light, Italian social perfection', 'villa terrace liquid-gold Tyrrhenian — the most beautiful sea view in Italy at its finest moment', 'warm Capri air in golden Italian sunset light'],
    dinner: ['candlelit Capri terrace — Vesuvius, sea, Italian cuisine, warm night air', 'Italian island dinner is always about slowness — wine, sea air, conversation, time', 'the complete sensory perfection of a Capri evening above the glowing water'],
    evening: ['La Piazzetta after dinner — elegant, warm, Italian, social, eternal', 'Capri Town lane in warm Italian evening air with lantern glow', 'villa terrace quiet above the dark warm sea'],
    night: ['deep Italian island quiet — the Tyrrhenian below, a lamp, warmth, silence', 'the scent of lemon and sea in a Capri bedroom after midnight', 'the hush of an aristocratic island that has been beautiful for 2000 years'],
  },

  exclusions: {
    premium: ['tourist ferry chaos', 'budget island experience', 'generic Mediterranean without Capri specificity', 'non-Italian architecture', 'low-status crowded beach energy without villa or private boat elevation'],
    hard: ['cold weather — Capri is summer only', 'winter grey sea', 'non-Italian language environment', 'urban non-island setting', 'rainy grey island day'],
  },

  routeRules: {
    worldIdentity: ['Capri is the world\'s most aristocratically beautiful island — every scene must feel earned and elegant', 'the identity is Italian effortlessness — never trying, always beautiful, always warm, always linen and gold', 'the Tyrrhenian Sea, the Faraglioni, La Piazzetta, and Via Camerelle are the world\'s defining elements'],
    humanFlow: ['mornings are private villa or hotel — slow, lemon-scented, Italian', 'late morning is Via Camerelle and La Piazzetta', 'afternoons are boat, beach, and garden — Italian freedom', 'golden hour belongs to La Piazzetta and the villa terrace', 'evenings are long slow Italian island dinners then Piazzetta social'],
    styling: ['Capri is the birthplace of the capri pant — Italian fashion elegance is everything here', 'linen, gold, silk, Italian designer — always effortless, never overdressed', 'eveningwear is flowing, warm-toned, and Italian — Dolce & Gabbana energy'],
  },

  realPlaces: [
    { id: 'hotel-punta-tragara', name: 'Hotel Punta Tragara', type: 'luxury hotel', vibe: 'Le Corbusier-designed villa converted to hotel — the Faraglioni rocks directly ahead, the finest position on Capri' },
    { id: 'la-piazzetta', name: 'La Piazzetta', type: 'central square', vibe: 'the living room of the island — everyone passes through, the most beautiful and social square in the Mediterranean' },
    { id: 'via-camerelle', name: 'Via Camerelle', type: 'luxury shopping street', vibe: 'the most fashionable shopping street in Italy — Dolce, Gucci, Hermès in a covered arcade above the sea' },
    { id: 'faraglioni', name: 'Faraglioni Rocks', type: 'iconic sea stacks', vibe: 'the defining image of Capri — three sea stacks rising from turquoise water, passing through the arch for luck' },
    { id: 'villa-san-michele', name: 'Villa San Michele', type: 'museum garden villa', vibe: 'Axel Munthe\'s masterpiece — Swedish doctor\'s vision of Italian paradise, Gulf of Naples panorama, ancient Roman artifacts' },
    { id: 'da-paolino', name: 'Da Paolino', type: 'legendary restaurant', vibe: 'dinner under lemon trees in Anacapri — the most cinematic and famous outdoor restaurant in Italy' },
  ],
}
