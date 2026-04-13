# Stage 1 — Build Angular app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependency files first (better Docker layer caching)
COPY package*.json ./
RUN npm install

# Copy source and build for production
COPY . .
RUN npm run build -- --configuration production

# Stage 2 — Serve with Nginx

FROM nginx:alpine

# Remove default nginx placeholder page
RUN rm -rf /usr/share/nginx/html/*

# Angular 17+  → dist/<project-name>/browser
# Angular 16   → dist/<project-name>
# Change 'taskflow' to match your project name in angular.json
COPY --from=builder /app/dist/taskflow/browser /usr/share/nginx/html

# Custom nginx config — required for Angular client-side routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
