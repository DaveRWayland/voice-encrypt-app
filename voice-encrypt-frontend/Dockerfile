# Build:
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Nginx:
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
