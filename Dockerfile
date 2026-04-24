# syntax=docker/dockerfile:1.7

# ------------------------------------------------------------
# Stage 1 — build the static export with Node + pnpm
# ------------------------------------------------------------
FROM node:20-alpine AS builder

RUN corepack enable

WORKDIR /app

# Install deps first so the layer is cached when only source changes.
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy the rest of the source.
COPY . .

# Canonical site origin — baked into <meta> tags, sitemap.xml, OG image.
# Override with --build-arg NEXT_PUBLIC_SITE_URL=https://...
ARG NEXT_PUBLIC_SITE_URL=https://redick.butay.example
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}

RUN pnpm build

# ------------------------------------------------------------
# Stage 2 — serve the static output with Caddy
# ------------------------------------------------------------
FROM caddy:2-alpine AS runner

COPY --from=builder /app/out /srv
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80 443 443/udp
