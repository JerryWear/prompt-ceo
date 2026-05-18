-- ─────────────────────────────────────────────────────────────
-- Music Intelligence Upgrade
-- Adds scoring columns and updates existing 6 tracks
-- Run this in Supabase SQL Editor
-- ─────────────────────────────────────────────────────────────

-- 1. Add intelligence columns to music_tracks
alter table public.music_tracks
  add column if not exists product_fit        text[]  default '{}',
  add column if not exists platform_fit       text[]  default '{}',
  add column if not exists campaign_fit       text[]  default '{}',
  add column if not exists visual_style_fit   text[]  default '{}',
  add column if not exists mood_fit           text[]  default '{}',
  add column if not exists start_energy       text,
  add column if not exists drop_strength      integer default 5,
  add column if not exists hook_strength      integer default 5,
  add column if not exists emotional_depth    integer default 5,
  add column if not exists luxury_score       integer default 5,
  add column if not exists commercial_score   integer default 5;

-- 2. Update existing tracks with full metadata

update music_tracks set
  product_fit       = array['fitness','sport','supplement','wellness','coaching'],
  platform_fit      = array['tiktok','instagram','youtube_shorts'],
  campaign_fit      = array['awareness','sales','traffic'],
  visual_style_fit  = array['lifestyle','cinematic','creator'],
  mood_fit          = array['energetic','happy','inspirational','upbeat','motivational','fast','positive'],
  start_energy      = 'high',
  drop_strength     = 7,
  hook_strength     = 8,
  emotional_depth   = 5,
  luxury_score      = 3,
  commercial_score  = 8
where title = 'Flying High';

update music_tracks set
  product_fit       = array['fitness','coaching','wellness','lifestyle','fashion'],
  platform_fit      = array['instagram','tiktok','youtube_shorts'],
  campaign_fit      = array['awareness','sales','leads','retargeting'],
  visual_style_fit  = array['lifestyle','cinematic','editorial'],
  mood_fit          = array['energetic','powerful','inspirational','motivational','love','emotional','confident'],
  start_energy      = 'high',
  drop_strength     = 8,
  hook_strength     = 8,
  emotional_depth   = 7,
  luxury_score      = 5,
  commercial_score  = 9
where title = 'Only Thing I Want';

update music_tracks set
  product_fit       = array['beauty','skincare','coaching','wellness','fashion','jewellery'],
  platform_fit      = array['instagram','facebook','shopify'],
  campaign_fit      = array['awareness','leads','retargeting','luxury'],
  visual_style_fit  = array['lifestyle','minimal','editorial'],
  mood_fit          = array['romantic','slow','emotional','calm','inspirational','warm','luxury','soft','feminine'],
  start_energy      = 'low',
  drop_strength     = 4,
  hook_strength     = 5,
  emotional_depth   = 9,
  luxury_score      = 7,
  commercial_score  = 6
where title = 'The Story';

update music_tracks set
  product_fit       = array['fitness','fashion','lifestyle','coaching','wellness'],
  platform_fit      = array['instagram','tiktok','youtube_shorts'],
  campaign_fit      = array['awareness','sales','traffic'],
  visual_style_fit  = array['lifestyle','cinematic','creator'],
  mood_fit          = array['upbeat','energetic','powerful','motivational','love','confident','bold'],
  start_energy      = 'high',
  drop_strength     = 8,
  hook_strength     = 7,
  emotional_depth   = 6,
  luxury_score      = 4,
  commercial_score  = 8
where title = 'Radical Love';

update music_tracks set
  product_fit       = array['fitness','lifestyle','fashion','coaching','beauty'],
  platform_fit      = array['instagram','tiktok','youtube_shorts'],
  campaign_fit      = array['awareness','sales','leads'],
  visual_style_fit  = array['lifestyle','editorial','creator'],
  mood_fit          = array['upbeat','romantic','powerful','motivational','dance','confident','warm','feminine'],
  start_energy      = 'high',
  drop_strength     = 7,
  hook_strength     = 8,
  emotional_depth   = 7,
  luxury_score      = 5,
  commercial_score  = 8
where title = 'Make You Believe';

update music_tracks set
  product_fit       = array['fitness','supplement','sport','tech','coaching'],
  platform_fit      = array['tiktok','youtube_shorts','instagram'],
  campaign_fit      = array['sales','traffic','awareness'],
  visual_style_fit  = array['cinematic','creator','lifestyle'],
  mood_fit          = array['powerful','upbeat','motivational','aggressive','energetic','bold','determination','explosive'],
  start_energy      = 'explosive',
  drop_strength     = 9,
  hook_strength     = 9,
  emotional_depth   = 4,
  luxury_score      = 2,
  commercial_score  = 9
where title = 'What It Takes';
