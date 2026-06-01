-- Edit Studio Phase 7: AI Caption Timeline storage
ALTER TABLE edit_projects
  ADD COLUMN IF NOT EXISTS caption_timeline jsonb NOT NULL DEFAULT '[]';
