-- ─────────────────────────────────────────────────────────────────────────────
-- Edit Studio — Phase 2: Persistent project system
-- Tables: edit_projects (primary), plus scaffolding for Phase 3+ processing
-- ─────────────────────────────────────────────────────────────────────────────

-- ── Primary table ─────────────────────────────────────────────────────────────
-- Stores all project data + workflow state as JSONB (denormalized for Phase 2 speed).
-- Phase 3 will move transcript/cuts into their child tables.

CREATE TABLE IF NOT EXISTS edit_projects (
  id                   uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title                text        NOT NULL DEFAULT 'Untitled Edit',
  platform             text,                      -- tiktok | instagram | youtube | linkedin | meta
  goal                 text,                      -- founder | demo | tutorial | launch | ugc | edu
  status               text        NOT NULL DEFAULT 'draft',
                                                  -- draft | uploaded | transcribed | analyzed | edited | exported
  source_video_name    text,
  source_video_size    bigint,
  source_video_type    text,
  source_video_url     text,                      -- Supabase Storage URL (wired in Phase 3)
  -- Workflow state (JSONB — will migrate to child tables in Phase 3)
  transcript_data      jsonb       NOT NULL DEFAULT '[]',
  ai_cuts_data         jsonb       NOT NULL DEFAULT '[]',
  caption_settings     jsonb       NOT NULL DEFAULT '{}',
  selected_music       jsonb,
  export_settings      jsonb       NOT NULL DEFAULT '{}',
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE edit_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own edit projects"
  ON edit_projects FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION update_edit_projects_ts()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER edit_projects_updated_at
  BEFORE UPDATE ON edit_projects
  FOR EACH ROW EXECUTE FUNCTION update_edit_projects_ts();

CREATE INDEX IF NOT EXISTS idx_edit_projects_user_updated
  ON edit_projects(user_id, updated_at DESC);

-- ── edit_assets ───────────────────────────────────────────────────────────────
-- Uploaded files and generated exports. Storage bucket: edit-studio-assets.
-- Populated in Phase 3 when real file upload + FFmpeg land.

CREATE TABLE IF NOT EXISTS edit_assets (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id   uuid        NOT NULL REFERENCES edit_projects(id) ON DELETE CASCADE,
  type         text        NOT NULL DEFAULT 'source_video', -- source_video | thumbnail | export
  name         text,
  size         bigint,
  mime_type    text,
  storage_path text,
  public_url   text,
  metadata     jsonb       NOT NULL DEFAULT '{}',
  created_at   timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE edit_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own edit assets"
  ON edit_assets FOR ALL
  USING  ((SELECT user_id FROM edit_projects WHERE id = project_id) = auth.uid())
  WITH CHECK ((SELECT user_id FROM edit_projects WHERE id = project_id) = auth.uid());
CREATE INDEX IF NOT EXISTS idx_edit_assets_project ON edit_assets(project_id);

-- ── edit_transcripts ─────────────────────────────────────────────────────────
-- Full transcript output from Whisper / AssemblyAI (Phase 3).

CREATE TABLE IF NOT EXISTS edit_transcripts (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id       uuid        NOT NULL REFERENCES edit_projects(id) ON DELETE CASCADE,
  provider         text        NOT NULL DEFAULT 'mock', -- mock | whisper | assemblyai
  language         text        NOT NULL DEFAULT 'en',
  segments         jsonb       NOT NULL DEFAULT '[]',
  duration_seconds numeric(10,3),
  word_count       integer,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE edit_transcripts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own edit transcripts"
  ON edit_transcripts FOR ALL
  USING  ((SELECT user_id FROM edit_projects WHERE id = project_id) = auth.uid())
  WITH CHECK ((SELECT user_id FROM edit_projects WHERE id = project_id) = auth.uid());
CREATE INDEX IF NOT EXISTS idx_edit_transcripts_project ON edit_transcripts(project_id);

-- ── edit_cut_suggestions ──────────────────────────────────────────────────────
-- AI-generated edit points with scores (Phase 4: AI Director).

CREATE TABLE IF NOT EXISTS edit_cut_suggestions (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id    uuid        NOT NULL REFERENCES edit_projects(id) ON DELETE CASCADE,
  suggestions   jsonb       NOT NULL DEFAULT '[]',
  applied_cuts  jsonb       NOT NULL DEFAULT '[]',
  model         text        NOT NULL DEFAULT 'mock',
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE edit_cut_suggestions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own edit cuts"
  ON edit_cut_suggestions FOR ALL
  USING  ((SELECT user_id FROM edit_projects WHERE id = project_id) = auth.uid())
  WITH CHECK ((SELECT user_id FROM edit_projects WHERE id = project_id) = auth.uid());
CREATE INDEX IF NOT EXISTS idx_edit_cuts_project ON edit_cut_suggestions(project_id);

-- ── edit_music_choices ────────────────────────────────────────────────────────
-- Selected track, caption config, export settings per project.

CREATE TABLE IF NOT EXISTS edit_music_choices (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id       uuid        NOT NULL REFERENCES edit_projects(id) ON DELETE CASCADE,
  caption_settings jsonb       NOT NULL DEFAULT '{}',
  selected_music   jsonb,
  export_settings  jsonb       NOT NULL DEFAULT '{}',
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE edit_music_choices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own edit music"
  ON edit_music_choices FOR ALL
  USING  ((SELECT user_id FROM edit_projects WHERE id = project_id) = auth.uid())
  WITH CHECK ((SELECT user_id FROM edit_projects WHERE id = project_id) = auth.uid());
CREATE INDEX IF NOT EXISTS idx_edit_music_project ON edit_music_choices(project_id);

-- ── edit_exports ──────────────────────────────────────────────────────────────
-- Completed export jobs (Phase 3: real FFmpeg rendering).

CREATE TABLE IF NOT EXISTS edit_exports (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id   uuid        NOT NULL REFERENCES edit_projects(id) ON DELETE CASCADE,
  status       text        NOT NULL DEFAULT 'pending', -- pending | processing | ready | failed
  output_url   text,
  settings     jsonb       NOT NULL DEFAULT '{}',
  error        text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE edit_exports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own edit exports"
  ON edit_exports FOR ALL
  USING  ((SELECT user_id FROM edit_projects WHERE id = project_id) = auth.uid())
  WITH CHECK ((SELECT user_id FROM edit_projects WHERE id = project_id) = auth.uid());
CREATE INDEX IF NOT EXISTS idx_edit_exports_project ON edit_exports(project_id);
