-- Edit Studio Phase 10: Storage buckets for source videos and rendered exports
-- Note: storage bucket creation via SQL requires Supabase with storage schema access.
-- If this migration fails, create both buckets manually in the Supabase Storage dashboard.

-- Source videos (private — only the owner can read/write)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'edit-studio-assets',
  'edit-studio-assets',
  false,
  2147483648, -- 2 GB
  ARRAY['video/mp4', 'video/quicktime', 'video/webm', 'video/x-msvideo']
)
ON CONFLICT (id) DO NOTHING;

-- Rendered exports (private — signed URL for download)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'edit-studio-exports',
  'edit-studio-exports',
  false,
  2147483648, -- 2 GB
  ARRAY['video/mp4']
)
ON CONFLICT (id) DO NOTHING;

-- RLS: users can only access their own files (path prefix = their user_id)
CREATE POLICY "Users read own source videos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'edit-studio-assets' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users write own source videos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'edit-studio-assets' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users delete own source videos"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'edit-studio-assets' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users read own exports"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'edit-studio-exports' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Service role writes exports"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'edit-studio-exports');
