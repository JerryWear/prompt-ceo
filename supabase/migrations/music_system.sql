-- ─────────────────────────────────────────────────────────────
-- Prompt CEO Music System
-- Run this in Supabase SQL Editor
-- ─────────────────────────────────────────────────────────────

-- 1. Music tracks catalogue
create table if not exists music_tracks (
  id                        uuid primary key default gen_random_uuid(),
  title                     text not null,
  artist                    text default 'Prompt CEO Music',
  full_file_url             text not null,
  preview_file_url          text not null,
  genre                     text,
  mood                      text,
  energy                    text,             -- 'low' | 'medium' | 'high' | 'explosive'
  bpm                       integer,
  duration_seconds          integer,
  tags                      text[],
  best_for                  text[],
  drop_time_seconds         integer,
  -- Timing columns for Phase 10
  intro_start_seconds       integer default 0,
  build_start_seconds       integer,
  best_hook_start_seconds   integer,
  best_hook_end_seconds     integer,
  best_payoff_start_seconds integer,
  best_payoff_end_seconds   integer,
  best_cta_start_seconds    integer,
  best_cta_end_seconds      integer,
  -- Licensing
  license_credits           integer default 2,
  is_premium                boolean default false,
  is_active                 boolean default true,
  created_at                timestamp with time zone default now()
);

-- 2. Music license log — one row per use
create table if not exists music_licenses (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null,
  track_id        uuid references music_tracks(id),
  project_type    text default 'ad_studio',
  usage_type      text,                      -- 'preview' | 'ad_use' | 'download'
  credits_charged integer default 2,
  created_at      timestamp with time zone default now()
);

-- 3. Ad projects (Phase 12 — save full ad + music together)
create table if not exists ad_projects (
  id                       uuid primary key default gen_random_uuid(),
  user_id                  uuid not null,
  product_name             text,
  campaign_name            text,
  selected_music_track_id  uuid references music_tracks(id),
  music_license_id         uuid references music_licenses(id),
  output                   jsonb,
  created_at               timestamp with time zone default now()
);

-- 4. RLS policies — users can only see their own licenses and projects
alter table music_licenses enable row level security;
alter table ad_projects    enable row level security;

create policy "Users see own licenses"
  on music_licenses for select
  using (auth.uid() = user_id);

create policy "Users insert own licenses"
  on music_licenses for insert
  with check (auth.uid() = user_id);

create policy "Users see own projects"
  on ad_projects for select
  using (auth.uid() = user_id);

create policy "Users insert own projects"
  on ad_projects for insert
  with check (auth.uid() = user_id);

-- music_tracks is public read (preview urls are safe, full urls are not exposed by default)
alter table music_tracks enable row level security;

create policy "Anyone can read active tracks"
  on music_tracks for select
  using (is_active = true);

-- ─────────────────────────────────────────────────────────────
-- Supabase Storage — run this in Storage settings or via API
-- Create bucket: music-tracks (private)
-- Folder structure:
--   music-tracks/full/track-001.mp3        ← paid/locked
--   music-tracks/previews/track-001-preview.mp3  ← free
-- ─────────────────────────────────────────────────────────────

-- 5. Seed 10 placeholder tracks — replace URLs with your real Supabase storage URLs
insert into music_tracks (
  title, artist, genre, mood, energy, bpm, duration_seconds,
  tags, best_for, drop_time_seconds,
  intro_start_seconds, build_start_seconds,
  best_hook_start_seconds, best_hook_end_seconds,
  best_payoff_start_seconds, best_payoff_end_seconds,
  best_cta_start_seconds, best_cta_end_seconds,
  license_credits, is_premium,
  full_file_url, preview_file_url
) values
(
  'Midnight Power', 'Prompt CEO Music',
  'cinematic', 'dark luxury', 'high', 118, 180,
  array['luxury','dark','powerful','cinematic','motivational'],
  array['Luxury Ads','Fitness Reels','Product Launch','High Fashion'],
  17, 0, 9, 5, 17, 17, 30, 30, 45,
  2, false,
  'REPLACE_WITH_SUPABASE_FULL_URL/track-001.mp3',
  'REPLACE_WITH_SUPABASE_PREVIEW_URL/track-001-preview.mp3'
),
(
  'Golden Hour', 'Prompt CEO Music',
  'lifestyle', 'warm aspirational', 'medium', 95, 165,
  array['luxury','warm','golden','aspirational','lifestyle','beauty'],
  array['Beauty Ads','Lifestyle Reels','Wellness','Skincare'],
  12, 0, 6, 4, 12, 12, 22, 22, 35,
  2, false,
  'REPLACE_WITH_SUPABASE_FULL_URL/track-002.mp3',
  'REPLACE_WITH_SUPABASE_PREVIEW_URL/track-002-preview.mp3'
),
(
  'Drop Zone', 'Prompt CEO Music',
  'trap', 'aggressive energy', 'explosive', 140, 155,
  array['fitness','gym','aggressive','energy','pump','sport','workout'],
  array['Fitness Ads','Gym Reels','Supplement Brands','Sports'],
  8, 0, 4, 2, 8, 8, 15, 15, 25,
  2, false,
  'REPLACE_WITH_SUPABASE_FULL_URL/track-003.mp3',
  'REPLACE_WITH_SUPABASE_PREVIEW_URL/track-003-preview.mp3'
),
(
  'Clean Slate', 'Prompt CEO Music',
  'minimal', 'clean modern', 'low', 88, 150,
  array['minimal','clean','modern','tech','app','saas','corporate'],
  array['Tech Ads','App Launch','SaaS Brands','Clean Product Shots'],
  10, 0, 5, 3, 10, 10, 20, 20, 32,
  2, false,
  'REPLACE_WITH_SUPABASE_FULL_URL/track-004.mp3',
  'REPLACE_WITH_SUPABASE_PREVIEW_URL/track-004-preview.mp3'
),
(
  'Riviera', 'Prompt CEO Music',
  'deep house', 'luxury coastal', 'medium', 112, 190,
  array['luxury','coastal','summer','travel','fashion','exclusive','Riviera'],
  array['Luxury Reels','Travel Ads','Fashion Brands','Lifestyle'],
  16, 0, 8, 5, 16, 16, 28, 28, 42,
  2, false,
  'REPLACE_WITH_SUPABASE_FULL_URL/track-005.mp3',
  'REPLACE_WITH_SUPABASE_PREVIEW_URL/track-005-preview.mp3'
),
(
  'Inner Fire', 'Prompt CEO Music',
  'emotional cinematic', 'emotional transformation', 'medium', 78, 175,
  array['emotional','transformation','beauty','wellness','coaching','personal'],
  array['Beauty Transformation','Coaching Brands','Wellness','Weight Loss'],
  14, 0, 7, 4, 14, 14, 25, 25, 38,
  2, false,
  'REPLACE_WITH_SUPABASE_FULL_URL/track-006.mp3',
  'REPLACE_WITH_SUPABASE_PREVIEW_URL/track-006-preview.mp3'
),
(
  'Hustle Season', 'Prompt CEO Music',
  'hip hop', 'bold direct', 'high', 128, 160,
  array['bold','hustle','direct','sales','offer','conversion','ecommerce'],
  array['Ecommerce Ads','Flash Sales','Direct Response','Offer Pushes'],
  6, 0, 3, 2, 6, 6, 12, 12, 22,
  2, false,
  'REPLACE_WITH_SUPABASE_FULL_URL/track-007.mp3',
  'REPLACE_WITH_SUPABASE_PREVIEW_URL/track-007-preview.mp3'
),
(
  'Silk Road', 'Prompt CEO Music',
  'ambient luxury', 'premium soft', 'low', 72, 200,
  array['premium','soft','luxury','fashion','jewellery','high-end','silk'],
  array['Luxury Fashion','Jewellery Ads','High-End Beauty','Editorial'],
  18, 0, 9, 6, 18, 18, 32, 32, 48,
  2, true,
  'REPLACE_WITH_SUPABASE_FULL_URL/track-008.mp3',
  'REPLACE_WITH_SUPABASE_PREVIEW_URL/track-008-preview.mp3'
),
(
  'She Wins', 'Prompt CEO Music',
  'pop empowerment', 'feminine power', 'high', 122, 170,
  array['feminine','empowerment','confidence','beauty','fashion','lifestyle','women'],
  array['Women Brands','Beauty Ads','Fashion Reels','Empowerment Campaigns'],
  11, 0, 5, 3, 11, 11, 20, 20, 32,
  2, false,
  'REPLACE_WITH_SUPABASE_FULL_URL/track-009.mp3',
  'REPLACE_WITH_SUPABASE_PREVIEW_URL/track-009-preview.mp3'
),
(
  'Neon City', 'Prompt CEO Music',
  'synthwave', 'futuristic urban', 'high', 132, 165,
  array['futuristic','urban','tech','dark','neon','gaming','modern','edgy'],
  array['Tech Brands','Gaming Ads','Urban Fashion','Futuristic Products'],
  10, 0, 5, 3, 10, 10, 18, 18, 28,
  2, false,
  'REPLACE_WITH_SUPABASE_FULL_URL/track-010.mp3',
  'REPLACE_WITH_SUPABASE_PREVIEW_URL/track-010-preview.mp3'
);
