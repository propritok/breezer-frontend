# Propritok - Сайт для покупки и установки бризеров

Проект построен на Next.js + TypeScript с использованием архитектуры Feature-Sliced Design (FSD) и UI-кита @heroui/react.

## 🎨 Цветовая схема

- **Основной цвет**: Белый (#FFFFFF)
- **Вторичный цвет**: Мятный (#A0E7E5)

## 🏗️ Архитектура FSD

Проект организован по принципу Feature-Sliced Design с следующими слоями:

### 📁 Структура проекта

```
src/
├── app/                    # Слой приложения
│   ├── App.tsx            # Главный компонент приложения
│   ├── index.ts           # Экспорты приложения
│   └── styles/
│       └── globals.css    # Глобальные стили
│
├── pages/                  # Слой страниц
│   ├── index.ts           # Экспорты страниц
│   ├── HomePage.tsx       # Главная страница
│   ├── CatalogPage.tsx    # Страница каталога
│   ├── ProductPage.tsx    # Страница продукта
│   ├── AboutPage.tsx      # Страница о компании
│   └── ContactPage.tsx    # Страница контактов
│
├── widgets/                # Слой виджетов
│   ├── index.ts           # Экспорты виджетов
│   ├── Header.tsx         # Шапка сайта
│   ├── Footer.tsx         # Подвал сайта
│   ├── ProductCard.tsx    # Карточка продукта
│   ├── ContactForm.tsx    # Форма контактов
│   └── HeroSection.tsx    # Главная секция
│
├── features/               # Слой фич
│   ├── index.ts           # Экспорты фич
│   ├── ProductSearch.tsx  # Поиск продуктов
│   ├── OrderForm.tsx      # Форма заказа
│   ├── Calculator.tsx     # Калькулятор
│   ├── Reviews.tsx        # Отзывы
│   └── Newsletter.tsx     # Подписка на рассылку
│
├── entities/               # Слой сущностей
│   ├── index.ts           # Экспорты сущностей
│   ├── Product.ts         # Интерфейсы продуктов
│   ├── User.ts            # Интерфейсы пользователей
│   ├── Order.ts           # Интерфейсы заказов
│   ├── Review.ts          # Интерфейсы отзывов
│   └── Contact.ts         # Интерфейсы контактов
│
└── shared/                 # Слой общих ресурсов
    ├── index.ts           # Экспорты shared
    ├── ui/                # UI компоненты
    │   ├── index.ts
    │   ├── CustomButton.tsx
    │   ├── CustomInput.tsx
    │   ├── CustomCard.tsx
    │   └── LoadingSpinner.tsx
    ├── lib/               # Библиотеки
    │   ├── index.ts
    │   ├── utils.ts       # Утилиты
    │   ├── constants.ts   # Константы
    │   └── validation.ts  # Валидация
    ├── api/               # API
    │   ├── index.ts
    │   ├── products.ts    # API продуктов
    │   ├── orders.ts      # API заказов
    │   ├── users.ts       # API пользователей
    │   ├── reviews.ts     # API отзывов
    │   └── contacts.ts    # API контактов
    └── config/            # Конфигурация
        └── index.ts       # Настройки приложения
```

## 🚀 Запуск проекта

```bash
# Установка зависимостей
yarn install

# Запуск в режиме разработки
yarn dev

# Сборка для продакшена
yarn build

# Запуск продакшен версии
yarn start
```

## 📦 Основные зависимости

- **Next.js 14** - React фреймворк
- **TypeScript** - Типизация
- **@heroui/react** - UI компоненты
- **Tailwind CSS** - Стилизация
- **next-themes** - Темная/светлая тема
- **Yarn** - Менеджер пакетов

## 🎯 Основные функции

- ✅ Каталог бризеров
- ✅ Детальные страницы продуктов
- ✅ Калькулятор подбора бризера
- ✅ Формы заказа и контактов
- ✅ Система отзывов
- ✅ Подписка на рассылку
- ✅ Адаптивный дизайн

## 🔧 Настройка

1. Скопируйте `.env.example` в `.env.local`
2. Настройте переменные окружения
3. Запустите проект

## 📝 Лицензия

MIT
