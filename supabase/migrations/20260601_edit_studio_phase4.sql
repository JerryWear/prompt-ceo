-- Edit Studio Phase 4: AI Director analysis storage
-- Adds a director_analysis JSONB column to edit_projects.
-- Stores the full strategic analysis output from claude-opus-4-8.

ALTER TABLE edit_projects
  ADD COLUMN IF NOT EXISTS director_analysis jsonb;
