-- Subscription system migration
-- Replaces credit-based model with subscription tiers

ALTER TABLE app_users
  ADD COLUMN IF NOT EXISTS subscription_tier      text    NOT NULL DEFAULT 'free',
  ADD COLUMN IF NOT EXISTS subscription_status    text    NOT NULL DEFAULT 'inactive',
  ADD COLUMN IF NOT EXISTS stripe_customer_id     text,
  ADD COLUMN IF NOT EXISTS stripe_subscription_id text,
  ADD COLUMN IF NOT EXISTS subscription_period_end timestamptz,
  ADD COLUMN IF NOT EXISTS images_used_this_period integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS music_licenses_used_this_period integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS music_addon            boolean NOT NULL DEFAULT false;

-- Index for fast subscription lookups
CREATE INDEX IF NOT EXISTS app_users_stripe_customer_idx ON app_users (stripe_customer_id);
CREATE INDEX IF NOT EXISTS app_users_stripe_sub_idx ON app_users (stripe_subscription_id);
CREATE INDEX IF NOT EXISTS app_users_tier_idx ON app_users (subscription_tier, subscription_status);
