import { Product } from '@/entities/Product';
import { Chip } from '@heroui/react';
import React from 'react';

interface ProductStatusChipsProps {
  product?: Product;
}

const ProductStatusChips: React.FC<ProductStatusChipsProps> = ({ product }) => {
  const inStock = product?.inStock;

  return (
    <div className='flex flex-wrap gap-2'>
      {inStock ? (
        <Chip color='success' variant='flat'>
          В наличии
        </Chip>
      ) : (
        <Chip color='warning' variant='flat'>
          Ожидается
        </Chip>
      )}
    </div>
  );
};

export default ProductStatusChips;
