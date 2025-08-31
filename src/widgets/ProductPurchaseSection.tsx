import { Product } from '@/entities/Product';
import React from 'react';

interface ProductPurchaseSectionProps {
  product?: Product;
  children?: React.ReactNode;
}

const ProductPurchaseSection: React.FC<ProductPurchaseSectionProps> = ({ product, children }) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='text-4xl font-bold text-[#0f766e]'>{product?.price || 'Цена не указана'}</div>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>{children}</div>
    </div>
  );
};

export default ProductPurchaseSection;
