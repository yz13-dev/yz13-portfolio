# Docker для Portfolio

Этот проект настроен для работы с Docker для удобной разработки и развертывания.

## Требования

- Docker
- Docker Compose

## Быстрый старт

### Сборка и запуск с Docker Compose

```bash
# Сборка и запуск
docker-compose up --build

# Запуск в фоновом режиме
docker-compose up -d --build

# Остановка
docker-compose down
```

### Сборка с Docker

```bash
# Сборка образа
docker build -t yz13-portfolio .

# Запуск контейнера
docker run -p 3000:3000 yz13-portfolio
```

## Структура Docker

### Dockerfile
- Использует многоэтапную сборку для оптимизации размера образа
- Base stage: установка зависимостей
- Production stage: сборка приложения с `output: 'standalone'`
- Runtime stage: минимальный образ с автономной сборкой Next.js

### .dockerignore
Исключает ненужные файлы из Docker контекста для ускорения сборки.

### docker-compose.yml
- Настраивает порт 3000
- Включает health check
- Автоматический перезапуск при сбоях

## Переменные окружения

При необходимости добавьте переменные окружения в `docker-compose.yml`:

```yaml
environment:
  - NODE_ENV=production
  - NEXT_PUBLIC_API_URL=https://api.example.com
```

## Health Check

Приложение включает health check endpoint по адресу `/api/health`, который используется Docker для мониторинга состояния контейнера.

## Полезные команды

```bash
# Просмотр логов
docker-compose logs -f

# Пересборка без кэша
docker-compose build --no-cache

# Очистка неиспользуемых образов
docker system prune -a

# Просмотр использования ресурсов
docker stats
``` 