import { ProductShort } from '@/entities/Product';
import { useCart } from '@/features/cart';
import { formatRub, parsePrice } from '@/shared/lib/format';
import Link from 'next/link';
import React from 'react';
import { LuShoppingCart } from 'react-icons/lu';

interface ProductCardProps {
  product: ProductShort;
}

export const StockStatus: React.FC<{ inStock?: boolean }> = ({ inStock }) =>
  inStock ? (
    <span className='inline-flex items-center gap-2 text-xs font-bold text-[#15855F]'>
      <span className='dot-live' />В наличии
    </span>
  ) : (
    <span className='inline-flex items-center gap-2 text-xs font-bold text-sun-700'>
      <span className='dot-order' />
      Под заказ
    </span>
  );

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { add } = useCart();

  if (!product) return null;

  const { id, images, modelNameEn, modelNameRu, price, oldPrice, brand, inStock, highlights } = product;
  const current = parsePrice(price);
  const discount = oldPrice && oldPrice > current ? Math.round((1 - current / oldPrice) * 100) : 0;
  const name = modelNameEn || modelNameRu;
  const href = `/catalog/${id}`;
  const chips = [
    highlights?.areaM2 && `до ${highlights.areaM2} м²`,
    highlights?.noiseMinDb && `от ${highlights.noiseMinDb} дБ`,
    highlights?.filter,
  ].filter(Boolean) as string[];

  return (
    <article className='group card-hover relative flex flex-col h-full rounded-card bg-white shadow-soft overflow-hidden'>
      <Link
        href={href}
        className='relative block aspect-[4/3.4] bg-gradient-to-b from-brand-50 to-white overflow-hidden'>
        {images?.[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={images[0]}
            alt={name}
            loading='lazy'
            className='zoom absolute inset-0 w-full h-full object-contain p-8 mix-blend-multiply'
          />
        ) : (
          <span className='absolute inset-0 grid place-items-center text-sm text-ink-3'>Нет изображения</span>
        )}
        {discount > 0 && (
          <span className='absolute left-4 top-4 h-7 px-2.5 inline-flex items-center rounded-full bg-sun-100 text-sun-700 text-xs font-bold'>
            −{discount}%
          </span>
        )}
      </Link>

      <div className='flex flex-col flex-1 p-5 pt-4'>
        <div className='flex items-center justify-between gap-2 mb-2'>
          <span className='text-xs font-bold uppercase tracking-[0.12em] text-ink-3'>{brand}</span>
          <StockStatus inStock={inStock} />
        </div>
        <Link
          href={href}
          className='font-bold text-[17px] leading-snug tracking-[-0.01em] text-ink hover:text-brand-700 transition min-h-[2.8em]'>
          {name}
        </Link>
        {chips.length > 0 && (
          <div className='flex flex-wrap gap-1.5 mt-3'>
            {chips.map((c) => (
              <span
                key={c}
                className='px-2.5 h-7 inline-flex items-center rounded-full bg-air text-xs font-semibold text-ink-2'>
                {c}
              </span>
            ))}
          </div>
        )}
        <div className='mt-auto pt-5 flex items-end justify-between gap-3'>
          <div>
            {discount > 0 && <s className='block text-sm text-ink-3 tnum'>{formatRub(oldPrice!)}</s>}
            <div className={`text-[22px] font-extrabold tracking-[-0.02em] tnum ${discount ? 'text-[#C2410C]' : ''}`}>
              {formatRub(current)}
            </div>
          </div>
          <button
            type='button'
            onClick={() => add(product)}
            className='btn btn-primary btn-sm !px-4'
            aria-label={`Добавить ${name} в корзину`}>
            <LuShoppingCart className='w-[18px] h-[18px]' />
            {inStock ? 'Купить' : 'Заказать'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
