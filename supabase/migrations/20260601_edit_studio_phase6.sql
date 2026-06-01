-- Edit Studio Phase 6: AI Editor Engine cleanup storage
ALTER TABLE edit_projects
  ADD COLUMN IF NOT EXISTS editor_cleanup jsonb NOT NULL DEFAULT '{}';
