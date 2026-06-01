# PromptCEO Edit Studio — Render Worker
# Runs the FFmpeg render worker as a standalone container.
#
# Build:  docker build -f workers/Dockerfile -t edit-render-worker .
# Run:    docker run --env-file workers/.env edit-render-worker
#
# Platform notes:
#   Render.com  → paste this Dockerfile content, set build/run commands
#   Railway     → connect repo, set DOCKERFILE_PATH=workers/Dockerfile
#   Fly.io      → fly launch --dockerfile workers/Dockerfile

FROM node:20-slim

# Install FFmpeg (includes libass for subtitle rendering)
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    fonts-liberation \
    && rm -rf /var/lib/apt/lists/*

# Verify FFmpeg is available
RUN ffmpeg -version 2>&1 | head -1

WORKDIR /app

# Install only the worker's runtime dependencies
COPY workers/package.json ./
RUN npm install --omit=dev

# Copy worker and shared render engine (worker imports from lib/)
COPY workers/edit-render-worker.mjs ./
COPY workers/render-utils.mjs* ./
COPY lib/ ./lib/

# Create tmp directory for render working directories
RUN mkdir -p /tmp/edit-studio-renders

# Environment variables (override via --env-file or platform secrets)
ENV NODE_ENV=production
ENV EDIT_RENDER_POLL_INTERVAL_MS=5000
ENV EDIT_RENDER_STALE_TIMEOUT_MS=600000
ENV EDIT_RENDER_FFMPEG_TIMEOUT_MS=300000

CMD ["node", "edit-render-worker.mjs"]
