'use client';

import Image from 'next/image';
import React from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Note: Swiper CSS is imported globally in _app.tsx

const workImages = [
  '/work/IMG_0087.jpg',
  '/work/IMG_0198.jpg',
  '/work/IMG_0549.jpg',
  '/work/IMG_0550.jpg',
  '/work/IMG_0684.jpg',
  '/work/IMG_0828.jpg',
  '/work/IMG_0868.jpg',
  '/work/IMG_0869.jpg',
  '/work/IMG_1392.jpg',
  '/work/IMG_1846.jpg',
  '/work/IMG_1985.PNG',
  '/work/IMG_2026.jpg',
  '/work/IMG_2027.jpg',
  '/work/IMG_2068.jpg',
  '/work/IMG_2255.jpg',
  '/work/IMG_2480.jpg',
  '/work/IMG_2544.jpg',
  '/work/IMG_2664.jpg',
  '/work/IMG_2667.jpg',
  '/work/IMG_2713.PNG',
  '/work/IMG_2845.jpg',
  '/work/IMG_2954.jpg',
  '/work/IMG_2955.jpg',
  '/work/IMG_3141.jpg',
  '/work/IMG_3143.jpg',
  '/work/IMG_3162.jpg',
  '/work/IMG_3164.jpg',
  '/work/IMG_9441.jpg',
  '/work/IMG_9708.jpg',
  '/work/IMG_9949.jpg',
];

const CustomerWorksSlider: React.FC = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 py-12'>
      <div className='flex items-center justify-center mb-8'>
        <h2 className='text-3xl font-bold'>Наши работы</h2>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        spaceBetween={16}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className='w-full'>
        {workImages.map((src, idx) => (
          <SwiperSlide key={idx}>
            <div className='relative w-full h-56 sm:h-64 md:h-72 lg:h-80 overflow-hidden rounded-lg'>
              <Image
                src={src}
                alt={`Работа ${idx + 1}`}
                fill
                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                className='object-cover'
                priority={idx < 2}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CustomerWorksSlider;
