import React from 'react';

// Утилиты для работы с данными

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Хук для проверки, что компонент смонтирован на клиенте
 * Используется для предотвращения ошибок гидратации
 */
export const useIsMounted = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};

/**
 * Хук для безопасного использования react-hook-form
 * Предотвращает ошибки гидратации с формами
 */
export const useSafeForm = <T extends Record<string, any>>(config: any) => {
  const mounted = useIsMounted();

  const form = React.useMemo(() => {
    if (!mounted) return null;
    // Здесь можно добавить дополнительную логику для форм
    return config;
  }, [mounted, config]);

  return { form, mounted };
};
