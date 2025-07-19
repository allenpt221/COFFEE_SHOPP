# Stage 1: Build the frontend
FROM node:18 AS builder

WORKDIR /app/frontend

# Copy frontend files and install dependencies
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Copy the rest of the frontend code and build
COPY frontend ./
RUN npm run build

# Stage 2: Set up backend and serve frontend
FROM node:18

WORKDIR /app

# Copy backend's package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy backend code
COPY backend ./backend

# Copy built frontend into backend or public directory
COPY --from=builder /app/frontend/dist ./frontend/dist

# Copy other backend folders
COPY backend/lib ./backend/lib
COPY backend/routers ./backend/routers

# Copy environment file

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Set working directory for server
WORKDIR /app/backend

# Expose and run
EXPOSE 5000
CMD ["node", "server.js"]
