-- supabase/migrations/20260605_brand_kit_v2.sql
-- Brand Kit v2: extends brand_kit jsonb shape on app_users.
-- No column changes needed — jsonb is schemaless.
-- New brand_kit fields:
--   introClipUrl  text  URL to branded intro video clip (MP4, max 10s)
--   outroClipUrl  text  URL to branded outro video clip (MP4, max 10s)
--   watermarkUrl  text  URL to transparent watermark PNG (top-left overlay)
--
-- Storage bucket 'brand-assets' already exists.
-- New storage paths:
--   {userId}/intro.mp4
--   {userId}/outro.mp4
--   {userId}/watermark.png

-- This migration is documentation only — no SQL to run.
select 1; -- no-op
