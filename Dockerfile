# Multi-stage build for AfriSolve AI Academic Prototype
FROM node:22-bookworm-slim AS build

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install dependencies (including devDependencies for build)
RUN npm ci

# Copy source code and build config
COPY index.html vite.config.js ./
COPY src/ ./src/

# Build React client into dist/
RUN npm run build

# Runtime stage
FROM node:22-bookworm-slim AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5173
ENV HOST=0.0.0.0
ENV DATA_DIR=/app/data/postgres

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy server code, built client assets, and docs
COPY server/ ./server/
COPY --from=build /app/dist/ ./dist/
COPY docs/ ./docs/

# Create persistent data directory with restricted permissions
RUN mkdir -p /app/data/postgres && chmod 700 /app/data

# Declare persistent volume for embedded PostgreSQL database
VOLUME ["/app/data"]

ENV NODE_OPTIONS="--max-old-space-size=384"

CMD ["node", "server/index.js"]
