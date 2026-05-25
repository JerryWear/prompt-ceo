-- ─────────────────────────────────────────────────────────────
-- Publishing System
-- Scheduled posts + platform OAuth token storage
-- ─────────────────────────────────────────────────────────────

-- Ensure user_integrations has publishing columns
CREATE TABLE IF NOT EXISTS user_integrations (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE user_integrations
  ADD COLUMN IF NOT EXISTS runway_api_key        text,
  ADD COLUMN IF NOT EXISTS instagram_access_token text,
  ADD COLUMN IF NOT EXISTS instagram_user_id      text,
  ADD COLUMN IF NOT EXISTS instagram_username     text,
  ADD COLUMN IF NOT EXISTS instagram_connected_at timestamptz,
  ADD COLUMN IF NOT EXISTS tiktok_access_token    text,
  ADD COLUMN IF NOT EXISTS tiktok_refresh_token   text,
  ADD COLUMN IF NOT EXISTS tiktok_open_id         text,
  ADD COLUMN IF NOT EXISTS tiktok_username        text,
  ADD COLUMN IF NOT EXISTS tiktok_connected_at    timestamptz;

ALTER TABLE user_integrations ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'user_integrations' AND policyname = 'Users manage own integrations'
  ) THEN
    CREATE POLICY "Users manage own integrations"
      ON user_integrations FOR ALL
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS idx_user_integrations_user_id ON user_integrations(user_id);

-- Scheduled posts table
CREATE TABLE IF NOT EXISTS scheduled_posts (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id       uuid        REFERENCES projects(id) ON DELETE SET NULL,
  platform         text        NOT NULL CHECK (platform IN ('instagram', 'tiktok', 'both')),
  content_type     text        NOT NULL DEFAULT 'image' CHECK (content_type IN ('image', 'video', 'reel', 'story')),
  media_url        text        NOT NULL,
  caption          text,
  hashtags         text[],
  scheduled_at     timestamptz,
  published_at     timestamptz,
  status           text        NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'published', 'failed', 'cancelled')),
  platform_post_id text,
  error_message    text,
  ig_media_id      text,
  tiktok_video_id  text,
  source           text        DEFAULT 'studio', -- studio | ad_studio
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE scheduled_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own scheduled posts"
  ON scheduled_posts FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION update_scheduled_posts_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER scheduled_posts_updated_at
  BEFORE UPDATE ON scheduled_posts
  FOR EACH ROW EXECUTE FUNCTION update_scheduled_posts_updated_at();

CREATE INDEX IF NOT EXISTS idx_scheduled_posts_user_id   ON scheduled_posts(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_scheduled_posts_status    ON scheduled_posts(status, scheduled_at) WHERE status = 'scheduled';
CREATE INDEX IF NOT EXISTS idx_scheduled_posts_project   ON scheduled_posts(project_id);
