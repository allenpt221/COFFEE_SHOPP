# Stage 1: Build frontend
FROM node:18 AS builder

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# Stage 2: Backend
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY backend ./backend
COPY --from=builder /app/frontend/dist ./frontend/dist

# Optional: If needed
COPY backend/lib ./backend/lib
COPY backend/routes ./backend/routes
COPY .env ./backend/.env

ENV NODE_ENV=production
ENV PORT=5000

WORKDIR /app/backend

EXPOSE 5000
CMD ["node", "server.js"]
