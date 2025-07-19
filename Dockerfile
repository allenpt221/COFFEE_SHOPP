# Stage 1: Build the frontend
FROM node:18 AS builder

WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

COPY frontend ./
RUN npm run build

# Stage 2: Set up backend and serve frontend
FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY backend ./backend
COPY --from=builder /app/frontend/dist ./frontend/dist
COPY backend/lib ./backend/lib
COPY backend/routes ./backend/routes

# ✅ Correct copy of .env
COPY .env ./backend/.env

ENV NODE_ENV=production
ENV PORT=5000

WORKDIR /app/backend

EXPOSE 5000
CMD ["node", "server.js"]
