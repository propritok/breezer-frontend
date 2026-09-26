'use client';

import { formatRub } from '@/shared/lib/format';
import { useSiteSettings } from '@/shared/lib/siteSettings';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { LuCheck } from 'react-icons/lu';
import { useCart } from './CartContext';

// Всплывающее подтверждение после «В корзину»
const CartToast: React.FC = () => {
  const { lastAdded, dismissToast } = useCart();
  const { installDiscount } = useSiteSettings();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!lastAdded) return;
    setShown(true);
    const hide = setTimeout(() => setShown(false), 5000);
    const drop = setTimeout(dismissToast, 5500);
    return () => {
      clearTimeout(hide);
      clearTimeout(drop);
    };
  }, [lastAdded, dismissToast]);

  if (!lastAdded) return null;

  return (
    <div
      role='status'
      className={`fixed z-[60] left-3 right-3 top-20 md:left-auto md:right-6 md:top-24 md:w-[380px] glass shadow-lift rounded-card p-4 transition duration-500 ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'
      }`}>
      <div className='flex gap-3 items-center'>
        <div className='w-16 h-16 rounded-2xl bg-brand-50 shrink-0 overflow-hidden'>
          {lastAdded.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={lastAdded.image}
              alt=''
              className='w-full h-full object-contain p-1.5 mix-blend-multiply'
            />
          )}
        </div>
        <div className='flex-1 min-w-0'>
          <div className='text-xs font-bold text-[#15855F] flex items-center gap-1.5'>
            <LuCheck className='w-3.5 h-3.5' />
            Добавлено в корзину
          </div>
          <div className='font-bold text-[15px] truncate mt-0.5'>{lastAdded.name}</div>
          <div className='text-sm text-ink-2 tnum'>
            {formatRub(lastAdded.price)}{' '}
            {lastAdded.install && (
              <span className='text-brand-700 font-semibold'>+ монтаж −{installDiscount}%</span>
            )}
          </div>
        </div>
      </div>
      <div className='mt-3 grid grid-cols-2 gap-2'>
        <button type='button' onClick={() => setShown(false)} className='btn btn-secondary btn-sm'>
          Продолжить
        </button>
        <Link href='/cart' onClick={() => setShown(false)} className='btn btn-primary btn-sm'>
          Оформить заказ
        </Link>
      </div>
    </div>
  );
};

export default CartToast;
