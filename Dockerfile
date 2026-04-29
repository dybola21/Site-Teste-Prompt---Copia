# Stage 1: Build the application
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# Install dependencies using npm ci for clean and reliable builds
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the Vite application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Remove default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 3000 (matching our nginx.conf)
EXPOSE 3000

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
