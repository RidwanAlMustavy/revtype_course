# Docker Setup Guide - Earn Academy

This project is fully containerized using a multi-stage Docker build combining:
- **Node.js (20 Alpine)**: Compiles and exports the Next.js static frontend into `public/`.
- **PHP 8.3 CLI Alpine**: Installs Composer dependencies, runs SQLite database migrations, and serves the Laravel application.

---

## Quick Start (with Docker Compose)

### 1. Start the Application
To build the image and start the container in the background:
```bash
docker compose up -d --build
```
*(or `docker-compose up -d --build`)*

The application will be accessible at:
👉 **[http://localhost:8000](http://localhost:8000)**

---

### 2. View Application Logs
To monitor live application logs:
```bash
docker compose logs -f
```

---

### 3. Stop the Application
To stop the running container:
```bash
docker compose down
```

To stop and remove persistent data volumes (resets SQLite database):
```bash
docker compose down -v
```

---

## Running Artisan & Composer Commands in Docker

You can execute Laravel Artisan commands inside the running container:

- **Run migrations**:
  ```bash
  docker compose exec app php artisan migrate
  ```
- **Clear cache**:
  ```bash
  docker compose exec app php artisan optimize:clear
  ```
- **Run tests**:
  ```bash
  docker compose exec app php artisan test
  ```
- **Open interactive bash shell**:
  ```bash
  docker compose exec app sh
  ```

---

## Standalone Docker Commands (without Compose)

### Build the Image:
```bash
docker build -t rcourse-app .
```

### Run the Container:
```bash
docker run -d --name rcourse-app -p 8000:8000 rcourse-app
```

---

## Data Persistence

The Docker setup persists data using named volumes:
- `sqlite-data`: Persists `/var/www/html/database/database.sqlite`
- `storage-data`: Persists `/var/www/html/storage` (logs, framework sessions, cache)
