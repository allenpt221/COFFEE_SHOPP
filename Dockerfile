# Stage 1: Build frontend
FROM node:18 AS builder

WORKDIR /app

# Copy package.json files and install all dependencies
COPY package.json package-lock.json ./
RUN npm install

# Build frontend
COPY frontend ./frontend
RUN cd frontend && npm install && npm run build

# Stage 2: Setup backend with frontend build
FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# Copy backend code
COPY backend ./backend

# Copy built frontend into backend/static folder
COPY --from=builder /app/frontend/dist ./frontend/dist

# Copy any other shared files (e.g., .env, lib, routes)
COPY lib ./lib
COPY router ./router

# Set environment variables (optional)
ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["node", "backend/server.js"]
