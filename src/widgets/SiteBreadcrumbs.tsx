import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';

// Карта названий для сегментов URL
const segmentTitleMap: Record<string, string> = {
  catalog: 'Каталог',
  cart: 'Корзина',
  about: 'О нас',
  contact: 'Контакты',
  workprocess: 'Процесс работы',
  work: 'Работы',
  products: 'Продукты',
  services: 'Услуги',
};

// Функция для преобразования сегмента в читаемое название
function toTitle(segment: string): string {
  // Сначала проверяем маппинг
  const mapped = segmentTitleMap[segment];
  if (mapped) return mapped;

  // Если это ID продукта (число), возвращаем "Продукт"
  if (/^\d+$/.test(segment)) {
    return 'Продукт';
  }

  // Преобразуем kebab-case в читаемый текст
  const withSpaces = segment.replace(/-/g, ' ');
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}

const SiteBreadcrumbs: React.FC<{ pageTitle?: string }> = ({ pageTitle }) => {
  const pathname = usePathname();

  const crumbs = useMemo(() => {
    if (!pathname || pathname === '/') return [];

    const segments = pathname.split('/').filter(Boolean);
    const items: Array<{ label: string; href?: string }> = [];

    // Всегда добавляем "Главная"
    items.push({ label: 'Главная', href: '/' });

    let cumulative = '';
    segments.forEach((seg, index) => {
      cumulative += `/${seg}`;
      const isLast = index === segments.length - 1;

      // Если это последний элемент и есть pageTitle, используем его
      if (isLast && pageTitle) {
        items.push({ label: pageTitle, href: undefined });
      } else {
        // Иначе используем преобразованное название сегмента
        items.push({
          label: toTitle(seg),
          href: isLast ? undefined : cumulative,
        });
      }
    });

    return items;
  }, [pathname, pageTitle]);

  // Не показываем крошки на главной странице
  if (crumbs.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label='Хлебные крошки'
      className='mx-auto max-w-page px-5 md:px-8 pt-8 text-sm text-ink-3 flex items-center gap-2 flex-wrap'>
      {crumbs.map((crumb, idx) => (
        <React.Fragment key={`${crumb.label}-${idx}`}>
          {idx > 0 && <span aria-hidden='true'>/</span>}
          {crumb.href ? (
            <Link href={crumb.href} className='hover:text-brand-700 transition-colors'>
              {crumb.label}
            </Link>
          ) : (
            <span className='text-ink font-semibold'>{crumb.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default SiteBreadcrumbs;
