import { ProductShort } from '@/entities/Product';
import { Button, Card, CardBody, CardFooter, Image } from '@heroui/react';
import { useRouter } from 'next/router';
import React from 'react';

interface ProductCardProps {
  product: ProductShort;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  if (!product) return null;

  const { id, images, modelNameEn, price } = product;

  const handleOpen = () => {
    router.push(`/catalog/${id}`);
  };

  return (
    <Card isPressable onPress={handleOpen} className='h-full'>
      <CardBody className='p-0 flex flex-col'>
        {images ? (
          <Image
            src={images[0]}
            alt={modelNameEn}
            removeWrapper
            className='w-full h-48 object-contain rounded-t-medium'
          />
        ) : (
          <div className='w-full h-48 bg-gray-200 rounded-t-medium flex items-center justify-center'>
            <span className='text-gray-500'>Нет изображения</span>
          </div>
        )}

        <div className='p-6 flex flex-col gap-2 flex-1'>
          <h3 className='text-xl font-semibold'>{modelNameEn}</h3>
          {/* {description && (
            <p className="text-gray-600 text-sm">{description}</p>
          )} */}
          <span className='mt-2 text-2xl font-bold text-[#A0E7E5]'>{price}</span>
        </div>
      </CardBody>
      <CardFooter className='pt-0 px-6 pb-6'>
        <Button color='primary' className='bg-[#A0E7E5] text-white w-full' onPress={handleOpen}>
          Смотреть
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
