import { Product } from '@/entities/Product';
import React from 'react';

interface ProductDescriptionProps {
  product?: Product;
  title?: string;
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({ product, title = 'Описание' }) => {
  const description = product?.description;

  if (!description) {
    return null;
  }

  const [lead, ...rest] = description.split(/\n\s*\n/);

  return (
    <div>
      <h2 className='text-[30px] leading-[1.1] md:text-[40px] font-bold tracking-[-0.03em]'>{title}</h2>
      <p className='mt-5 text-body-lg text-ink leading-relaxed'>{lead}</p>
      {rest.map((p, i) => (
        <p key={i} className='mt-4 text-ink-2 leading-relaxed whitespace-pre-line'>
          {p}
        </p>
      ))}
    </div>
  );
};
