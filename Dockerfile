# ==========================================================
# Stage 1: Build Next.js Static Frontend Assets
# ==========================================================
FROM node:20-alpine AS frontend-builder

WORKDIR /app

# Install npm dependencies
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# Copy frontend source files
COPY app ./app
COPY components ./components
COPY data ./data
COPY hooks ./hooks
COPY lib ./lib
COPY public ./public
COPY scripts ./scripts
COPY tailwind.config.ts ./
COPY postcss.config.js ./
COPY tsconfig.json ./
COPY next.config.ts ./

# Build Next.js app and export static assets to public/
RUN npm run build

# ==========================================================
# Stage 2: Production PHP Runtime
# ==========================================================
FROM php:8.3-cli-alpine

LABEL maintainer="Earn Academy"
LABEL description="Earn Academy Course Platform"

WORKDIR /var/www/html

# Install required system packages
RUN apk add --no-cache \
    curl \
    git \
    zip \
    unzip \
    libzip-dev \
    sqlite \
    sqlite-dev \
    bash

# Install PHP extensions required by Laravel
RUN docker-php-ext-install bcmath zip pcntl

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy composer files and install dependencies
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader --no-scripts

# Copy application source code
COPY . .

# Copy compiled frontend assets from Stage 1 into public/
COPY --from=frontend-builder /app/public ./public

# Finalize composer autoloading
RUN composer dump-autoload --optimize

# Setup entrypoint script
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Create required directories and set permissions
RUN mkdir -p database \
             storage/framework/cache/data \
             storage/framework/sessions \
             storage/framework/views \
             storage/logs \
             bootstrap/cache \
    && chmod -R 777 storage bootstrap/cache database

# Expose Laravel default port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8000/ || exit 1

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
