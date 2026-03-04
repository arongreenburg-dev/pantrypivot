FROM node:20-slim

WORKDIR /app

# Install deps first (better caching)
COPY package*.json ./
RUN npm ci

# Copy the rest of the app
COPY . .

# Build the Vite app
RUN npm run build

# Cloud Run listens on PORT
ENV PORT=8080
EXPOSE 8080

# Serve the built static site
CMD ["npx","serve","dist","-l","8080"]
