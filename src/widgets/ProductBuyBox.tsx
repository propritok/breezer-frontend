'use client';

import { Product } from '@/entities/Product';
import { ContactCTAButton } from '@/features';
import { InstallId, useCart } from '@/features/cart';
import { useSiteSettings } from '@/shared/lib/siteSettings';
import { formatRub, parsePrice } from '@/shared/lib/format';
import Link from 'next/link';
import React, { useState } from 'react';
import { LuCheck, LuClock, LuHouse, LuShieldCheck, LuShoppingCart, LuSparkles, LuVolume1, LuWind } from 'react-icons/lu';
import { StockStatus } from './ProductCard';

interface ProductBuyBoxProps {
  product: Product;
}

// Правая колонка страницы товара: название, ключевые факты, цена, монтаж, покупка
const ProductBuyBox: React.FC<ProductBuyBoxProps> = ({ product }) => {
  const { add, items } = useCart();
  const { installOptions, installDiscount, discountedInstallPrice, defaultInstallId } = useSiteSettings();
  const [withInstall, setWithInstall] = useState(true);
  const [installId, setInstallId] = useState<InstallId>(defaultInstallId);

  const specs = product.specs;
  const price = parsePrice(product.price);
  const oldPrice = product.oldPrice && product.oldPrice > price ? product.oldPrice : 0;
  const install = withInstall ? discountedInstallPrice(installId) : 0;
  const name = product.modelNameEn || product.modelNameRu || 'Бризер';
  const inCart = items.some((i) => i.id === product.id);

  const facts = [
    specs?.roomAreaMaxM2 && { Icon: LuHouse, value: `${specs.roomAreaMaxM2} м²`, label: 'площадь' },
    specs?.airflowMaxM3h && { Icon: LuWind, value: `${specs.airflowMaxM3h}`, label: 'м³/ч' },
    specs?.filterClassMax && { Icon: LuSparkles, value: specs.filterClassMax, label: 'фильтр' },
    specs?.noiseLevelDb?.min && { Icon: LuVolume1, value: `${specs.noiseLevelDb.min} дБ`, label: 'мин. шум' },
  ].filter(Boolean) as { Icon: React.ComponentType<{ className?: string }>; value: string; label: string }[];

  const warranty = [
    specs?.warrantyInstallYears && `${specs.warrantyInstallYears} лет на монтаж`,
    specs?.warrantyDeviceYears && `${specs.warrantyDeviceYears} года на прибор`,
  ].filter(Boolean) as string[];

  return (
    <aside className='space-y-4 lg:sticky lg:top-28'>
      <div>
        <div className='flex items-center gap-3 flex-wrap'>
          {product.brand && (
            <span className='text-xs font-bold uppercase tracking-[0.14em] text-ink-3'>{product.brand}</span>
          )}
          <StockStatus inStock={product.inStock} />
        </div>
        <h1 className='mt-3 text-[34px] leading-[1.05] md:text-[44px] font-bold tracking-[-0.035em]'>{name}</h1>
        {product.modelNameRu && product.modelNameRu !== name && (
          <p className='mt-2 text-ink-2'>{product.modelNameRu}</p>
        )}
      </div>

      {facts.length > 0 && (
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
          {facts.map(({ Icon, value, label }) => (
            <div key={label} className='rounded-2xl bg-white shadow-soft p-3'>
              <Icon className='w-[18px] h-[18px] text-ink-3' />
              <div className='mt-2 font-extrabold text-[17px] leading-tight'>{value}</div>
              <div className='text-[11px] text-ink-3'>{label}</div>
            </div>
          ))}
        </div>
      )}

      <div className='rounded-card bg-white shadow-lift p-5 md:p-6'>
        {oldPrice > 0 && (
          <div className='flex items-center gap-2 mb-1'>
            <s className='text-ink-3 tnum'>{formatRub(oldPrice)}</s>
            <span className='h-6 px-2 rounded-full bg-sun-100 text-sun-700 text-xs font-bold inline-flex items-center'>
              −{Math.round((1 - price / oldPrice) * 100)}%
            </span>
          </div>
        )}
        <div
          className={`text-[40px] leading-none font-extrabold tracking-[-0.04em] tnum ${oldPrice ? 'text-[#C2410C]' : ''}`}>
          {price ? formatRub(price) : 'Цена по запросу'}
        </div>

        {/* Монтаж */}
        <div className={`mt-5 rounded-3xl transition-colors ${withInstall ? 'bg-brand-50' : 'bg-air'}`}>
          <button
            type='button'
            onClick={() => setWithInstall((v) => !v)}
            aria-pressed={withInstall}
            className='w-full flex items-center gap-4 p-4 text-left'>
            <span className={`switch ${withInstall ? 'switch-on' : ''}`} />
            <span className='flex-1 leading-tight'>
              <b className='block text-[15px]'>Нужен монтаж</b>
              <span className='text-sm text-ink-2'>Скидка {installDiscount}% при покупке бризера</span>
            </span>
            {withInstall && <b className='text-brand-700 tnum'>+{formatRub(install)}</b>}
          </button>
          <div
            className={`grid transition-[grid-template-rows] duration-500 ${
              withInstall ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            }`}>
            <div className='overflow-hidden'>
              <div className='px-4 pb-4 grid gap-2'>
                {installOptions.map((o) => {
                  const on = installId === o.id;
                  return (
                    <button
                      key={o.id}
                      type='button'
                      onClick={() => setInstallId(o.id)}
                      className={`flex items-center gap-3 rounded-2xl border bg-white px-3.5 py-3 text-left transition ${
                        on ? 'border-brand-700 ring-2 ring-brand-700/15' : 'border-line hover:border-brand-300'
                      }`}>
                      <span
                        className={`w-5 h-5 rounded-full shrink-0 bg-white transition-all ${
                          on ? 'border-[6px] border-brand-700' : 'border-2 border-line'
                        }`}
                      />
                      <span className='flex-1 text-sm font-semibold'>{o.name}</span>
                      <span className='text-right tnum shrink-0'>
                        <s className='block text-[11px] text-ink-3'>{formatRub(o.price)}</s>
                        <b className='text-sm'>{formatRub(discountedInstallPrice(o.id))}</b>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className='mt-5 flex flex-col gap-2'>
          <button
            type='button'
            onClick={() => add(product, withInstall ? installId : null)}
            disabled={!price}
            className='btn btn-primary w-full !h-auto min-h-14 py-3 !whitespace-normal text-center'>
            <LuShoppingCart className='w-5 h-5' />
            В корзину{withInstall ? ' с монтажом' : ''} · {formatRub(price + install)}
          </button>
          {inCart && (
            <Link href='/cart' className='btn btn-ghost w-full'>
              <LuCheck className='w-5 h-5' /> Уже в корзине — оформить
            </Link>
          )}
          <ContactCTAButton
            label='Получить консультацию'
            formButtonLabel='Получить консультацию'
            action={`хочет консультацию по id-[${product.id}]-${name}`}
            showMessageField
            ctaVariant='secondary'
            className='w-full h-12'
          />
        </div>

        <ul className='mt-4 pt-4 border-t border-line grid grid-cols-2 gap-3 text-sm text-ink-2'>
          {warranty.map((w) => (
            <li key={w} className='flex items-center gap-2'>
              <LuShieldCheck className='w-[18px] h-[18px] text-brand-700 shrink-0' />
              {w}
            </li>
          ))}
          <li className='flex items-center gap-2'>
            <LuClock className='w-[18px] h-[18px] text-brand-700 shrink-0' />
            Монтаж 1,5–2 часа
          </li>
          <li className='flex items-center gap-2'>
            <LuCheck className='w-[18px] h-[18px] text-brand-700 shrink-0' />
            Без онлайн-оплаты
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default ProductBuyBox;
