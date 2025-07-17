# Dockerfile (for backend)

FROM node:18

WORKDIR /app

# Install backend dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy backend code
COPY backend/ ./backend

WORKDIR /app/backend

CMD ["node", "server.js"]
