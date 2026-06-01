-- Edit Studio Phase 8: Music Intelligence
ALTER TABLE edit_projects
  ADD COLUMN IF NOT EXISTS music_intelligence  jsonb NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS selected_music_bed  jsonb NOT NULL DEFAULT '{}';
