import { Card, CardBody, Image } from "@heroui/react";
import React, { useEffect, useState } from 'react';

interface ProductGalleryProps {
  images?: string[];
  title?: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images = [], title = '' }) => {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!images.length) return null;

  // Не рендерим интерактивные элементы на сервере
  if (!mounted) {
    return (
      <Card>
        <CardBody className='p-0'>
          <Image
            removeWrapper
            src={images[0] || ''}
            alt={title}
            className='w-full h-[420px] object-cover rounded-t-medium'
          />
          <div className='p-4 grid grid-cols-5 gap-3'>
            {images.map((src, idx) => (
              <button
                key={src}
                className={`border rounded-medium overflow-hidden focus:outline-none ${
                  idx === 0 ? 'border-[#A0E7E5]' : 'border-transparent'
                }`}
                disabled>
                <Image
                  removeWrapper
                  src={src}
                  alt={`${title} ${idx + 1}`}
                  className='w-full h-20 object-cover'
                />
              </button>
            ))}
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody className='p-0'>
        <Image
          removeWrapper
          src={images[selectedImageIdx] || ''}
          alt={title}
          className='w-full h-[420px] object-cover rounded-t-medium'
        />
        <div className='p-4 grid grid-cols-5 gap-3'>
          {images.map((src, idx) => (
            <button
              key={src}
              onClick={() => setSelectedImageIdx(idx)}
              className={`border rounded-medium overflow-hidden focus:outline-none ${
                idx === selectedImageIdx ? 'border-[#A0E7E5]' : 'border-transparent'
              }`}>
              <Image
                removeWrapper
                src={src}
                alt={`${title} ${idx + 1}`}
                className='w-full h-20 object-cover'
              />
            </button>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductGallery;
