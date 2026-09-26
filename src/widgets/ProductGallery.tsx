import { Airflow } from '@/shared';
import React, { useState } from 'react';

interface ProductGalleryProps {
  images?: string[];
  title?: string;
}

// Галерея: вертикальные миниатюры + крупное фото на «дышащем» круге
const ProductGallery: React.FC<ProductGalleryProps> = ({ images = [], title = '' }) => {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  if (!images.length) return null;

  return (
    <div className={`grid gap-3 md:gap-4 ${images.length > 1 ? 'grid-cols-[64px_minmax(0,1fr)] md:grid-cols-[88px_minmax(0,1fr)]' : ''}`}>
      {images.length > 1 && (
        <div className='flex flex-col gap-3'>
          {images.map((src, idx) => (
            <button
              key={src}
              type='button'
              onClick={() => setSelectedImageIdx(idx)}
              aria-label={`Фото ${idx + 1}`}
              className={`aspect-square rounded-2xl bg-white shadow-soft overflow-hidden transition hover:-translate-y-0.5 ${
                idx === selectedImageIdx ? 'ring-2 ring-brand-700 ring-offset-2 ring-offset-air' : ''
              }`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt='' className='w-full h-full object-contain p-2 mix-blend-multiply' />
            </button>
          ))}
        </div>
      )}
      <div className='relative aspect-square rounded-block bg-gradient-to-b from-brand-50 via-white to-white shadow-soft overflow-hidden'>
        <Airflow className='absolute inset-0 w-full h-full' opacity={0.25} />
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full bg-brand-100/60 animate-breathe' />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[selectedImageIdx]}
          alt={title}
          className='relative w-full h-full object-contain p-10 md:p-16 mix-blend-multiply'
        />
      </div>
    </div>
  );
};

export default ProductGallery;
