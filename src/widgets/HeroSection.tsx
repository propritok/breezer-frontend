import { Button } from "@heroui/react";
import Link from 'next/link';
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className='bg-gradient-to-r from-[#A0E7E5] to-[#B8F0EE] py-20'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='text-center'>
          <h1 className='text-5xl font-bold text-white mb-6'>Свежий воздух в каждом доме</h1>
          <p className='text-xl text-white mb-8 max-w-2xl mx-auto'>
            Профессиональные бризеры для здорового микроклимата. Установка под ключ с гарантией
            качества.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/catalog'>
              <Button size='lg' className='bg-white text-[#A0E7E5] font-semibold'>
                Перейти в каталог
              </Button>
            </Link>
            <Link href='/contact'>
              <Button size='lg' variant='bordered' className='border-white text-white'>
                Получить консультацию
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
