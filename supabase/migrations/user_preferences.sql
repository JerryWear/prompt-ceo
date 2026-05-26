-- Build 1: PromptCEO Instant™ — user mode preference
ALTER TABLE app_users
  ADD COLUMN IF NOT EXISTS preferred_mode text CHECK (preferred_mode IN ('instant', 'studio'));
