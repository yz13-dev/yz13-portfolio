# Используем официальный образ Bun
FROM oven/bun:1 as base

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json bun.lock ./

# Устанавливаем зависимости
RUN bun install --frozen-lockfile

# Копируем исходный код
COPY . .

# Создаем production образ
FROM base as production

ARG EDGE_CONFIG
ARG SUPABASE_URL

ENV EDGE_CONFIG=${EDGE_CONFIG}
ENV SUPABASE_URL=${SUPABASE_URL}

# Собираем приложение
RUN bun run build

# Создаем минимальный runtime образ
FROM oven/bun:1-alpine as runtime

WORKDIR /app

# Копируем standalone сборку из production образа
COPY --from=production /app/.next/standalone ./
COPY --from=production /app/.next/static ./.next/static
COPY --from=production /app/public ./public

# Открываем порт (Yandex Cloud использует 8080)
EXPOSE 8080

# Устанавливаем переменную окружения
ENV NODE_ENV=production
ENV PORT=8080

# Запускаем приложение
CMD ["bun", "server.js"]
