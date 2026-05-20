-- Music popularity upgrade
-- Adds: featured flag, genre tag, play_count, campaign_count view

-- 1. Add featured + genre to music_tracks
ALTER TABLE music_tracks
  ADD COLUMN IF NOT EXISTS featured      boolean  NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS genre         text,
  ADD COLUMN IF NOT EXISTS play_count    integer  NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS artist_name   text;

-- 2. Index for fast featured-first ordering
CREATE INDEX IF NOT EXISTS music_tracks_featured_idx ON music_tracks (featured DESC, created_at DESC);

-- 3. View: campaign_count per track (how many times licensed)
CREATE OR REPLACE VIEW music_track_stats AS
SELECT
  t.id,
  t.title,
  t.featured,
  t.play_count,
  COUNT(l.id) AS campaign_count
FROM music_tracks t
LEFT JOIN music_licenses l ON l.track_id = t.id
GROUP BY t.id, t.title, t.featured, t.play_count;

-- 4. Mark your own tracks as featured (update titles to match yours)
-- Run this after confirming track titles in your library:
-- UPDATE music_tracks SET featured = true, artist_name = 'Your Name' WHERE id IN (...);
