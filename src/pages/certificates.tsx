'use client';

import { Card, CardBody } from '@heroui/react';
import Image from 'next/image';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import React, { useEffect } from 'react';

const mockCertificates = [
  {
    src: 'https://dummyimage.com/1600x1067&text=1',
    width: 1600,
    height: 1067,
    alt: 'Сертификат 1',
  },
  {
    src: 'https://dummyimage.com/1600x1067&text=2',
    width: 1600,
    height: 1067,
    alt: 'Сертификат 2',
  },
  {
    src: 'https://dummyimage.com/1600x1067&text=3',
    width: 1600,
    height: 1067,
    alt: 'Сертификат 3',
  },
  {
    src: 'https://dummyimage.com/1600x1067&text=4',
    width: 1600,
    height: 1067,
    alt: 'Сертификат 4',
  },
  {
    src: 'https://dummyimage.com/1600x1067&text=5',
    width: 1600,
    height: 1067,
    alt: 'Сертификат 5',
  },
  {
    src: 'https://dummyimage.com/1600x1067&text=6',
    width: 1600,
    height: 1067,
    alt: 'Сертификат 6',
  },
];

const CertificatesPage: React.FC = () => {
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '#cert-gallery', // контейнер с <a>
      children: 'a',
      bgOpacity: 0.9,
      pswpModule: () => import('photoswipe'),
    });

    lightbox.init();
    return () => lightbox.destroy();
  }, []);

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Сертификаты</h1>
      <p className='text-gray-600 mb-8'>
        Здесь представлены сертификаты и награды. Нажмите на изображение, чтобы увеличить.
      </p>

      <div
        id='cert-gallery'
        className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4'>
        {mockCertificates.map((img, index) => (
          <a
            key={index}
            href={img.src}
            data-pswp-width={img.width}
            data-pswp-height={img.height}
            className='group block'>
            <Card shadow='sm' className='overflow-hidden'>
              <CardBody className='p-0'>
                <div className='relative w-full h-40 sm:h-44 md:h-48 lg:h-52'>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes='(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 25vw'
                    className='object-cover transition-transform duration-300'
                    priority={index < 4}
                  />
                </div>
              </CardBody>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CertificatesPage;
