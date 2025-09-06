// Конфигурация приложения

export const config = {
  // Основные настройки
  app: {
    name: 'Propritok',
    description: 'Бризеры для вашего дома',
    version: '1.0.0',
  },

  // API настройки
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    timeout: 10000,
  },

  // PocketBase настройки
  pocketbase: {
    baseUrl: 'https://bp.propritok.ru/api',
    collections: {
      breezers: 'pbc_1529214369',
    },
  },

  // Настройки темы
  theme: {
    colors: {
      primary: '#FFFFFF',
      secondary: 'var(--secondary-color)',
      text: '#1a1a1a',
      textSecondary: '#666666',
      background: '#FFFFFF',
      backgroundSecondary: '#F8F9FA',
    },
  },

  // Настройки SEO
  seo: {
    defaultTitle: 'Propritok - Бризеры',
    defaultDescription: 'Купить и установить бризер для дома. Качественная вентиляция с гарантией.',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },

  // Настройки контактов
  contact: {
    phone: '+79295850880',
    email: 'info@propritok.ru',
    address: 'г. Москва',
    workingHours: {
      weekdays: '9:00 - 18:00',
      weekends: '10:00 - 16:00',
    },
  },
} as const;
