# Интеграция с PocketBase

## Обзор

Проект успешно интегрирован с PocketBase API для получения данных о продуктах (бризерах). Все моки заменены на реальные запросы к API.

## Конфигурация

### PocketBase API

- **Base URL**: `https://bp.propritok.ru/api`
- **Collection ID**: `pbc_1529214369` (breezers)

### Конфигурация в коде

Настройки находятся в `src/shared/config/index.ts`:

```typescript
pocketbase: {
  baseUrl: 'https://bp.propritok.ru/api',
  collections: {
    breezers: 'pbc_1529214369',
  },
},
```

## API Endpoints

### Получение всех продуктов

```
GET /collections/breezers/records
```

### Получение продукта по ID

```
GET /collections/breezers/records/:id
```

### Изображения

Изображения доступны по URL:

```
https://bp.propritok.ru/api/files/{collectionId}/{recordId}/{filename}
```

## Структура данных

### PocketBase Product

```typescript
interface PocketBaseProduct {
  collectionId: string;
  collectionName: string;
  id: string;
  modelNameEn: string;
  modelNameRu: string;
  description: string;
  price: number;
  inStock: boolean;
  images: string[];
  spec: any;
  created: string;
  updated: string;
}
```

### Трансформация в Product

Данные автоматически трансформируются в формат приложения:

- Цена форматируется в рубли
- Изображения получают полные URL
- Спецификации сохраняются как есть

## Использование

### В компонентах

```typescript
import { productsApi } from '@/shared/api/products';

// Получить все продукты
const products = await productsApi.getAll();

// Получить короткие данные
const productsShort = await productsApi.getAllShort();

// Получить продукт по ID
const product = await productsApi.getById('product-id');

// Поиск продуктов
const searchResults = await productsApi.search('tion');
```

### В страницах

```typescript
// getServerSideProps для динамических данных
export const getServerSideProps: GetServerSideProps = async () => {
  const products = await productsApi.getAllShort();
  return { props: { products } };
};

// getStaticProps для статической генерации
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = await productsApi.getById(params?.id as string);
  return { props: { product } };
};
```

## Обработка ошибок

API включает обработку ошибок:

- Логирование ошибок в консоль
- Возврат пустых массивов при ошибках
- Graceful degradation для пользователей

## Тестирование

Для тестирования API создан endpoint:

```
GET /api/test-products
```

Возвращает первые 2 продукта для проверки работы интеграции.

## Обновленные компоненты

- ✅ `src/pages/catalog.tsx` - использует getServerSideProps
- ✅ `src/pages/catalog/[id].tsx` - использует getStaticProps/getStaticPaths
- ✅ `src/pages/index.tsx` - использует getServerSideProps
- ✅ `src/features/ProductSearch.tsx` - использует API для поиска
- ✅ `src/widgets/ProductHeader.tsx` - обновлен для работы с Product
- ✅ `src/widgets/ProductPurchaseSection.tsx` - обновлен для работы с Product
- ✅ `src/widgets/ProductStatusChips.tsx` - обновлен для работы с Product
- ✅ `src/widgets/ProductDescription.tsx` - обновлен для работы с Product

## Удаленные файлы

- ❌ `src/api/products.ts` - файл с моками удален

## Преимущества интеграции

1. **Реальные данные** - все данные теперь загружаются из PocketBase
2. **Автоматическое обновление** - изменения в CMS сразу отражаются на сайте
3. **SEO оптимизация** - используется SSG/SSR для лучшей индексации
4. **Производительность** - кэширование и оптимизация запросов
5. **Масштабируемость** - легко добавлять новые продукты через CMS
