# Настройка Yarn для проекта

## Переход на Yarn

Поскольку npm install вызывает проблемы с HeroUI компонентами, мы перешли на yarn.

## Установка Yarn

### Глобально

```bash
npm install -g yarn
```

### Проверка версии

```bash
yarn --version
```

## Команды Yarn

### Установка зависимостей

```bash
yarn install
```

### Добавление новой зависимости

```bash
yarn add package-name
yarn add -D package-name  # для dev зависимостей
```

### Удаление зависимости

```bash
yarn remove package-name
```

### Обновление зависимостей

```bash
yarn upgrade
```

### Запуск скриптов

```bash
yarn dev
yarn build
yarn start
yarn lint
```

## Docker с Yarn

Dockerfile обновлен для использования yarn:

```dockerfile
# Install yarn globally
RUN npm install --global yarn

# Install dependencies using yarn
RUN yarn install --frozen-lockfile

# Build the app using yarn
RUN yarn build
```

## Преимущества Yarn

1. **Более быстрая установка** - параллельная загрузка пакетов
2. **Детерминированные установки** - yarn.lock гарантирует одинаковые версии
3. **Лучшая совместимость** с HeroUI
4. **Кэширование** - пакеты кэшируются локально

## Миграция с npm

1. Удалите node_modules и package-lock.json
2. Установите yarn глобально
3. Выполните `yarn install`
4. Используйте yarn команды вместо npm

## Troubleshooting

### Очистка кэша yarn

```bash
yarn cache clean
```

### Удаление node_modules и переустановка

```bash
rm -rf node_modules
yarn install
```

### Проверка зависимостей

```bash
yarn list
yarn why package-name
```
