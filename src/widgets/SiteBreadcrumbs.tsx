import { BreadcrumbItem, Breadcrumbs } from '@heroui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';

// Карта названий для сегментов URL
const segmentTitleMap: Record<string, string> = {
  catalog: 'Каталог',
  about: 'О нас',
  contact: 'Контакты',
  certificates: 'Сертификаты',
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
  console.log('pageTitle', pageTitle);
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
    <div className='max-w-7xl mx-auto px-4 pt-4'>
      <Breadcrumbs>
        {crumbs.map((crumb, idx) => (
          <BreadcrumbItem key={`${crumb.label}-${idx}`}>
            {crumb.href ? (
              <Link
                href={crumb.href}
                className='text-gray-600 hover:text-[var(--secondary-color)] transition-colors'>
                {crumb.label}
              </Link>
            ) : (
              <span className='text-gray-900 font-medium'>{crumb.label}</span>
            )}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default SiteBreadcrumbs;
