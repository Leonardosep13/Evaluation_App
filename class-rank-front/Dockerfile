FROM node:22-alpine

WORKDIR /app


RUN corepack enable && corepack prepare pnpm@latest --activate


COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,target=/root/.pnpm \
    CI=true pnpm install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev", "--host", "--port", "3000"]
