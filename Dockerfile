# ---------- BUILD IMAGE (closest to Vercel) ----------
FROM node:20-bullseye AS builder

WORKDIR /app
RUN corepack enable

# Copy only lock + manifest for cache efficiency
COPY package.json pnpm-lock.yaml ./

# Install dependencies (this runs prisma generate via postinstall)
RUN pnpm install --frozen-lockfile

# Copy remaining project files
COPY . .

# Build Next.js (server bundles, .next output)
RUN pnpm run build


# ---------- RUNTIME IMAGE (small & clean) ----------
FROM node:20-bullseye AS runner

WORKDIR /app
RUN corepack enable

ENV NODE_ENV=production

# Copy minimal files needed to run the built Next.js app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/lib ./lib

# Start Next.js server
EXPOSE 3000
CMD ["pnpm", "start"]
