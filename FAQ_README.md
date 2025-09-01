# FAQ Component - Часто задаваемые вопросы

## Описание

Компонент FAQ для отображения часто задаваемых вопросов в удобной сетке. Вопросы отображаются зеленым цветом, а ответы черным внутри карточек. Интегрирован в главную страницу сайта и загружает данные из API `/api/collections/questions/records`.

## Архитектура (FSD)

```
src/
├── shared/
│   └── api/
│       └── questions.ts          # API для работы с вопросами
├── features/
│   └── FAQ.tsx                   # Бизнес-логика FAQ
└── widgets/
    └── FAQSection.tsx            # UI виджет
```

## Использование

### Базовое использование

```tsx
import { FAQSection } from '@/widgets';

<FAQSection />;
```

### С кастомными параметрами

```tsx
<FAQSection
  title='Наши ответы на вопросы'
  maxQuestions={5}
  showToggle={true}
  className='my-custom-class'
/>
```

## API

### questionsApi.getQuestions()

Получает все вопросы из `/api/collections/questions/records`

### questionsApi.getQuestionsWithParams(params)

Получает вопросы с параметрами:

- `page` - номер страницы
- `perPage` - количество на странице
- `sort` - сортировка
- `filter` - фильтрация

## Пропсы

### FAQSection

| Проп           | Тип      | По умолчанию                 | Описание                         |
| -------------- | -------- | ---------------------------- | -------------------------------- |
| `title`        | `string` | `'Часто задаваемые вопросы'` | Заголовок секции                 |
| `maxQuestions` | `number` | `undefined`                  | Максимальное количество вопросов |
| `className`    | `string` | `''`                         | Дополнительные CSS классы        |

### FAQ (feature)

| Проп           | Тип      | По умолчанию                 | Описание                         |
| -------------- | -------- | ---------------------------- | -------------------------------- |
| `title`        | `string` | `'Часто задаваемые вопросы'` | Заголовок секции                 |
| `maxQuestions` | `number` | `undefined`                  | Максимальное количество вопросов |

## Структура данных

```typescript
interface Question {
  id: string;
  question: string;
  answer: string;
  created: string;
  updated: string;
}

interface QuestionsResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: Question[];
}
```

## Особенности

1. **Автоматическая загрузка** - вопросы загружаются при монтировании компонента
2. **Skeleton loading** - показывается во время загрузки
3. **Обработка ошибок** - отображается сообщение об ошибке при неудачной загрузке
4. **Сеточный дизайн** - вопросы отображаются в удобной сетке
5. **Адаптивность** - корректно работает на всех устройствах
6. **Цветовое оформление** - зеленые вопросы и черные ответы

## Примеры интеграции

### На главной странице

```tsx
// src/pages/index.tsx
import { FAQSection } from '@/widgets';

export default function Home() {
  return (
    <div>
      {/* Другие секции... */}

      {/* FAQ секция */}
      <FAQSection title='Ответы на вопросы' maxQuestions={8} className='py-12 bg-gray-50' />

      {/* Другие секции... */}
    </div>
  );
}
```

### В составе другой страницы

```tsx
import { FAQSection } from '@/widgets';

const AboutPage: React.FC = () => {
  return (
    <div>
      <h1>О нас</h1>
      <p>Информация о компании...</p>

      <FAQSection title='Частые вопросы о нас' maxQuestions={3} className='mt-16' />
    </div>
  );
};
```

## Стилизация

Компонент использует Tailwind CSS классы и может быть кастомизирован через:

1. **CSS переменные** - для цветов и размеров
2. **Tailwind классы** - через проп `className`
3. **CSS модули** - при необходимости глубокой кастомизации

## Технические детали

- **React 18+** - использует современные хуки
- **TypeScript** - полная типизация
- **Next.js App Router** - совместимость с новой архитектурой
- **HeroUI** - интеграция с компонентами HeroUI
- **Fetch API** - для HTTP запросов
