-- ── Jarvis Foundation — Memory + Events + Semantic Recall ────────────────────
-- Phase 1: The memory layer everything else is built on top of.
--
-- BEFORE RUNNING:
--   1. Enable the pgvector extension in Supabase Studio:
--      Dashboard → Database → Extensions → Search "vector" → Enable
--   2. Run this migration in Supabase SQL Editor
--
-- If pgvector is not enabled, the tables still create fine.
-- The embedding column accepts null — recall falls back to recency order.
-- ─────────────────────────────────────────────────────────────────────────────

-- Enable vector extension (no-op if already enabled; fails gracefully if unavailable)
CREATE EXTENSION IF NOT EXISTS vector;

-- ── jarvis_memory ─────────────────────────────────────────────────────────────
-- Semantic long-term memory for each user.
-- Every meaningful creative decision, brand rule, and result gets a row here.

CREATE TABLE IF NOT EXISTS jarvis_memory (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  memory_type  text        NOT NULL,   -- 'brand'|'campaign'|'instruction'|'asset'|'result'|'performance'
  content      text        NOT NULL,   -- human-readable summary Jarvis can reason about
  embedding    vector(1536),           -- OpenAI text-embedding-3-small; null until async embed runs
  metadata     jsonb       NOT NULL DEFAULT '{}',
  importance   float       NOT NULL DEFAULT 1.0,  -- Jarvis-controlled weighting
  created_at   timestamptz NOT NULL DEFAULT now(),
  expires_at   timestamptz             -- null = permanent; set for time-sensitive context
);

CREATE INDEX IF NOT EXISTS idx_jarvis_memory_user     ON jarvis_memory(user_id);
CREATE INDEX IF NOT EXISTS idx_jarvis_memory_type     ON jarvis_memory(user_id, memory_type);
CREATE INDEX IF NOT EXISTS idx_jarvis_memory_recent   ON jarvis_memory(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_jarvis_memory_import   ON jarvis_memory(user_id, importance DESC);

-- ── jarvis_events ─────────────────────────────────────────────────────────────
-- Complete audit log of every meaningful action in every studio.
-- Events are the raw signal; memories are the processed knowledge.

CREATE TABLE IF NOT EXISTS jarvis_events (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type   text        NOT NULL,
  source       text        NOT NULL DEFAULT 'unknown',  -- 'ad_studio'|'edit_studio'|'music_studio'|'prompt_studio'|'jarvis'
  payload      jsonb       NOT NULL DEFAULT '{}',
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_jarvis_events_user    ON jarvis_events(user_id);
CREATE INDEX IF NOT EXISTS idx_jarvis_events_type    ON jarvis_events(user_id, event_type);
CREATE INDEX IF NOT EXISTS idx_jarvis_events_source  ON jarvis_events(user_id, source);
CREATE INDEX IF NOT EXISTS idx_jarvis_events_recent  ON jarvis_events(created_at DESC);

-- ── RLS ───────────────────────────────────────────────────────────────────────

ALTER TABLE jarvis_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE jarvis_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users own Jarvis memory" ON jarvis_memory;
CREATE POLICY "Users own Jarvis memory"
  ON jarvis_memory FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users own Jarvis events" ON jarvis_events;
CREATE POLICY "Users own Jarvis events"
  ON jarvis_events FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ── Semantic recall function ──────────────────────────────────────────────────
-- Called by app/lib/jarvis/memory.js → recallMemory()
-- Returns top-K memories ordered by cosine similarity to a query embedding.

CREATE OR REPLACE FUNCTION match_jarvis_memory(
  p_user_id       uuid,
  p_embedding     vector(1536),
  p_match_count   int   DEFAULT 10,
  p_threshold     float DEFAULT 0.60,
  p_memory_type   text  DEFAULT NULL
)
RETURNS TABLE (
  id           uuid,
  memory_type  text,
  content      text,
  metadata     jsonb,
  importance   float,
  similarity   float,
  created_at   timestamptz
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  SELECT
    m.id,
    m.memory_type,
    m.content,
    m.metadata,
    m.importance,
    (1 - (m.embedding <=> p_embedding))::float AS similarity,
    m.created_at
  FROM jarvis_memory m
  WHERE
    m.user_id    = p_user_id
    AND m.embedding IS NOT NULL
    AND (m.expires_at IS NULL OR m.expires_at > now())
    AND (p_memory_type IS NULL OR m.memory_type = p_memory_type)
    AND (1 - (m.embedding <=> p_embedding)) > p_threshold
  ORDER BY m.embedding <=> p_embedding
  LIMIT p_match_count;
END;
$$;

-- ── ivfflat vector index ──────────────────────────────────────────────────────
-- Only created if pgvector is enabled (DO block catches the error silently).

DO $$
BEGIN
  EXECUTE 'CREATE INDEX IF NOT EXISTS idx_jarvis_memory_vec
    ON jarvis_memory USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 100)';
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'pgvector index skipped (extension not enabled): %', SQLERRM;
END;
$$;
