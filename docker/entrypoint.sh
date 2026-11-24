#!/bin/sh
set -e

# Ensure .env file exists
if [ ! -f .env ]; then
    echo "Creating .env from .env.example..."
    cp .env.example .env
fi

# Ensure SQLite database exists with proper permissions
if [ ! -f database/database.sqlite ]; then
    echo "Creating database/database.sqlite..."
    mkdir -p database
    touch database/database.sqlite
fi
chmod -R 777 database

# Ensure storage directories exist and are writable
mkdir -p storage/framework/cache/data \
         storage/framework/sessions \
         storage/framework/views \
         storage/logs \
         bootstrap/cache
chmod -R 777 storage bootstrap/cache

# Generate APP_KEY if empty or missing
if ! grep -q "^APP_KEY=base64:" .env 2>/dev/null; then
    echo "Generating application key..."
    php artisan key:generate --force
fi

# Run database migrations
echo "Running database migrations..."
php artisan migrate --force

# Execute the main container command
echo "Starting application..."
exec "$@"
