# Dockerfile
FROM node:lts AS builder
WORKDIR /app
COPY .env.local .
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM node:lts AS runner
WORKDIR /app
COPY .env.local .
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "run", "start"]
