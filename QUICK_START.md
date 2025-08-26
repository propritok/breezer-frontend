# Быстрый запуск с Yarn

## Установка и запуск

```bash
# 1. Установить yarn глобально (если не установлен)
npm install -g yarn

# 2. Установить зависимости
yarn install

# 3. Запустить в режиме разработки
yarn dev
```

## Docker

```bash
# Сборка образа
docker build -t breezer-frontend .

# Запуск контейнера
docker run -p 3000:3000 breezer-frontend

# Или через docker-compose
docker-compose up
```

## Основные команды

```bash
yarn dev          # Запуск dev сервера
yarn build        # Сборка для продакшена
yarn start        # Запуск продакшен версии
yarn lint         # Проверка кода
```

## Проблемы с HeroUI

Если возникают проблемы с отображением компонентов:

1. Убедитесь, что используется yarn, а не npm
2. Очистите кэш: `yarn cache clean`
3. Переустановите зависимости: `rm -rf node_modules && yarn install`
