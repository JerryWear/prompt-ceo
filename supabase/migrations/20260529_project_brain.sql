-- Project Brain™ — persistent per-project campaign intelligence
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS project_brain (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id            uuid NOT NULL UNIQUE REFERENCES projects(id) ON DELETE CASCADE,
  user_id               uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  campaign_stage        text NOT NULL DEFAULT 'attention'
                          CHECK (campaign_stage IN ('attention','emotional_connection','desire_escalation','conversion','retargeting')),
  fatigue_score         integer NOT NULL DEFAULT 0 CHECK (fatigue_score >= 0 AND fatigue_score <= 100),
  best_hook_types       text[] NOT NULL DEFAULT '{}',
  best_worlds           text[] NOT NULL DEFAULT '{}',
  best_styles           text[] NOT NULL DEFAULT '{}',
  best_platform         text,
  active_strategy       jsonb NOT NULL DEFAULT '{}',
  audience_temperature  text NOT NULL DEFAULT 'cold'
                          CHECK (audience_temperature IN ('cold','warming','hot','fatigued')),
  creator_energy        text NOT NULL DEFAULT 'aspirational'
                          CHECK (creator_energy IN ('polished','raw','energetic','calm','emotional','aspirational')),
  pacing_profile        text NOT NULL DEFAULT 'balanced'
                          CHECK (pacing_profile IN ('fast','balanced','slow','cinematic')),
  total_generations     integer NOT NULL DEFAULT 0,
  last_recommended_shift text,
  last_updated_at       timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_project_brain_user_id ON project_brain(user_id);
CREATE INDEX IF NOT EXISTS idx_project_brain_project_id ON project_brain(project_id);

ALTER TABLE project_brain ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own brain" ON project_brain
  FOR ALL USING (auth.uid() = user_id);
