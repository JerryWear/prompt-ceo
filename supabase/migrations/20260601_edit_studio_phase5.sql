-- Edit Studio Phase 5: AI Cut Engine
-- cut_plans stores all generated cut plans for the project.
-- selected_cut_plan stores the user's chosen plan with segment toggles.

ALTER TABLE edit_projects
  ADD COLUMN IF NOT EXISTS cut_plans       jsonb NOT NULL DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS selected_cut_plan jsonb;
