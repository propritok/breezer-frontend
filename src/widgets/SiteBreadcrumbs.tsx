import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

const segmentTitleMap: Record<string, string> = {
  catalog: 'Каталог',
  about: 'О нас',
  contact: 'Контакты',
};

function toTitle(segment: string): string {
  const mapped = segmentTitleMap[segment];
  if (mapped) return mapped;
  const withSpaces = segment.replace(/-/g, ' ');
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}

const SiteBreadcrumbs: React.FC = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pathOnly = (router.asPath || '/').split('?')[0].split('#')[0];

  const crumbs = useMemo(() => {
    const segments = pathOnly.split('/').filter(Boolean);

    const items: Array<{ label: string; href?: string }> = [];
    items.push({ label: 'Главная', href: '/' });

    let cumulative = '';
    segments.forEach((seg, index) => {
      cumulative += `/${seg}`;
      const isLast = index === segments.length - 1;
      items.push({
        label: toTitle(seg),
        href: isLast ? undefined : cumulative,
      });
    });

    return items;
  }, [pathOnly]);

  // Не рендерим на сервере
  if (!mounted) {
    return null;
  }

  if (pathOnly === '/') {
    return null;
  }

  return (
    <div className='max-w-7xl mx-auto px-4 pt-4'>
      <Breadcrumbs>
        {crumbs.map((c, idx) => (
          <BreadcrumbItem key={`${c.label}-${idx}`} href={c.href}>
            {c.label}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default SiteBreadcrumbs;
