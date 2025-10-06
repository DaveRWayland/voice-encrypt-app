# Build:
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci --only=production

COPY src ./src
COPY keys ./keys

RUN npm run build

# Producción:

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/keys ./keys
COPY package*.json ./

EXPOSE 3000

ENV NODE_ENV=production

# Run the application:
CMD ["npm", "start"]
