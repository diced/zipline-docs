# syntax=docker.io/docker/dockerfile:1
FROM node:24-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable && \
  apk add --no-cache libc6-compat

WORKDIR /zipline

FROM base AS builder

RUN apk add --no-cache git

COPY package.json pnpm-lock.yaml .npmrc* source.config.* tsconfig.json ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --frozen-lockfile --ignore-scripts

COPY next.config.* proxy.ts postcss.config.* tailwind.config.* ./
COPY src ./src
COPY public ./public
COPY scripts ./scripts
COPY .git ./.git

RUN pnpm rebuild

ENV NEXT_TELEMETRY_DISABLED=1

RUN --mount=type=secret,id=GITHUB_TOKEN \
  GITHUB_TOKEN=$(cat /run/secrets/GITHUB_TOKEN) pnpm run gen:openapi
RUN pnpm run build

FROM base AS runner

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nextjs

COPY --from=builder /zipline/public ./public
COPY --from=builder --chown=nextjs:nodejs /zipline/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /zipline/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /zipline/openapi.json ./

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
