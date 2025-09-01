// Константы приложения

export const APP_NAME = 'Propritok';
export const APP_DESCRIPTION = 'Бризеры для вашего дома';

export const COLORS = {
  primary: '#FFFFFF',
  secondary: 'var(--secondary-color)',
  text: '#1a1a1a',
  textSecondary: '#666666',
  background: '#FFFFFF',
  backgroundSecondary: '#F8F9FA',
} as const;

export const ROUTES = {
  home: '/',
  catalog: '/catalog',
  product: '/product',
  about: '/about',
  contact: '/contact',
  cart: '/cart',
  checkout: '/checkout',
} as const;

export const PRODUCT_CATEGORIES = [
  { id: 'tion', name: 'Tion', slug: 'tion' },
  { id: 'ballu', name: 'Ballu', slug: 'ballu' },
  { id: 'vakio', name: 'Vakio', slug: 'vakio' },
] as const;

export const ORDER_STATUSES = {
  pending: 'Ожидает подтверждения',
  confirmed: 'Подтвержден',
  processing: 'В обработке',
  shipped: 'Отправлен',
  delivered: 'Доставлен',
  cancelled: 'Отменен',
} as const;

export const CONTACT_TYPES = {
  general: 'Общий вопрос',
  order: 'Вопрос по заказу',
  support: 'Техническая поддержка',
  partnership: 'Партнерство',
} as const;
