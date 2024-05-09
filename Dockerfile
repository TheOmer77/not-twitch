FROM node:20.10.0-alpine3.19

WORKDIR /app
COPY package*.json .
COPY prisma prisma
RUN corepack enable pnpm && pnpm install

CMD ["pnpm", "run", "/dev|db:studio/"]