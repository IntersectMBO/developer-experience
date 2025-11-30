# Multi-stage Dockerfile for Intersect MBO Developer Experience Portal
# Optimized for Docusaurus with Yarn, supporting both development and production builds

# Stage 1: Base image with Node.js
FROM node:18-alpine AS base

# Install system dependencies
RUN apk add --no-cache \
    git \
    python3 \
    make \
    g++ \
    && rm -rf /var/cache/apk/*

# Enable Corepack for Yarn 3+
RUN corepack enable

WORKDIR /app

# Copy package files
COPY website/package.json website/yarn.lock* website/package-lock.json* ./

# Stage 2: Dependencies installation
FROM base AS dependencies

# Install production dependencies with retry logic and network timeout settings
RUN yarn config set network-timeout 300000 && \
    yarn install --frozen-lockfile --production=false --network-timeout 300000 || \
    (sleep 5 && yarn install --frozen-lockfile --production=false --network-timeout 300000) || \
    (sleep 10 && yarn install --frozen-lockfile --production=false --network-timeout 300000)

# Stage 3: Development environment
FROM base AS development

# Copy dependencies from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy all source files
COPY website/ .

# Expose port for development server
EXPOSE 3000

# Set environment variable for hot reload
ENV CHOKIDAR_USEPOLLING=true
ENV FAST_REFRESH=true

# Default command for development
CMD ["yarn", "start", "--host", "0.0.0.0", "--port", "3000"]

# Stage 4: Build stage for production
FROM base AS builder

# Copy dependencies
COPY --from=dependencies /app/node_modules ./node_modules

# Copy source files
COPY website/ .

# Build the static site
RUN yarn build

# Stage 5: Production runtime with Nginx
FROM nginx:alpine AS production

# Copy custom nginx config
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    location / {
        try_files \$uri \$uri/ /index.html =404;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # No cache for HTML files
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
    }
}
EOF

# Copy built static files from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# Stage 6: Test environment (optional)
FROM development AS test

# Run tests (currently typecheck, can be extended)
CMD ["yarn", "typecheck"]
