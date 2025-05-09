# Etapa 1: build do TypeScript
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: imagem final (somente com o que precisa pra rodar)
FROM node:20

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

RUN npm install --omit=dev

# Gere o client do Prisma no container
RUN npx prisma generate

ENV NODE_ENV=production

CMD ["node", "dist/index.js"]
