# Docker сборка для Breezer Frontend

## Проблемы и решения

### Исправленные проблемы:

1. **Синтаксическая ошибка в `src/api/script.js`** - была незакрытая функция
2. **Неправильная конфигурация PM2** - убрал PM2 и использую прямой запуск
3. **Оптимизированная сборка** - добавил многоэтапную сборку для production

## Переменные окружения

Для работы приложения необходимы следующие переменные окружения:

```bash
# Email configuration
MAIL_USER=your-email@yandex.ru
MAIL_PASSWORD=your-app-password
NEXT_PUBLIC_MAIL_ADDRESS=your-email@yandex.ru
NEXT_PUBLIC_MAIL_RECIPIENTS=[{"name":"Recipient Name","address":"recipient@example.com"}]

# Next.js configuration
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### Настройка GitHub Secrets

В GitHub репозитории добавьте следующие secrets:

- `MAIL_PASSWORD` - пароль приложения для Yandex
- `MAIL_USER` - email пользователя
- `NEXT_PUBLIC_MAIL_ADDRESS` - адрес отправителя
- `NEXT_PUBLIC_MAIL_RECIPIENTS` - JSON массив получателей

## Варианты сборки

### 1. Production сборка (рекомендуется)

```bash
# Сборка с многоэтапной оптимизацией
docker build -t breezer-frontend:latest .

# Запуск через docker-compose
docker-compose up -d
```

### 2. Простая сборка (для разработки)

```bash
# Использовать простой Dockerfile
docker build -f Dockerfile.simple -t breezer-frontend:dev .

# Запуск
docker run -p 3000:3000 breezer-frontend:dev
```

### 3. Локальная разработка

```bash
# Установка зависимостей
yarn install

# Запуск в режиме разработки
yarn dev

# Сборка для production
yarn build
```

## Конфигурация

### Next.js конфигурация

- Добавлен `output: 'standalone'` для оптимизированной сборки
- Отключена телеметрия Next.js
- Настроены изображения для внешних доменов

### Docker конфигурация

- Многоэтапная сборка для уменьшения размера образа
- Безопасный запуск от пользователя `nextjs`
- Оптимизированные слои для кэширования

## Мониторинг

### Логи контейнера

```bash
# Просмотр логов
docker-compose logs -f frontend

# Проверка статуса
docker-compose ps
```

### Пересборка

```bash
# Пересборка с новыми изменениями
docker-compose build --no-cache
docker-compose up -d
```

## Проблемы

Если возникают проблемы с памятью при сборке:

```bash
# Увеличить лимит памяти для Docker
# В Docker Desktop: Settings -> Resources -> Memory -> 4GB+
```

Если проблемы с правами доступа:

```bash
# Проверить права на файлы
chmod -R 755 .
```
