/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // Prevent Next.js from bundling native binaries — let Node resolve at runtime
  serverExternalPackages: ['ffmpeg-static', 'fluent-ffmpeg'],
};

export default nextConfig;
