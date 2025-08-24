import { Button } from "@heroui/react";
import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className='bg-white shadow-sm border-b'>
      <div className='max-w-7xl mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Link href='/' className='text-2xl font-bold text-[#A0E7E5]'>
              Propritok
            </Link>
          </div>

          <nav className='hidden md:flex items-center space-x-8'>
            <Link href='/' className='text-gray-700 hover:text-[#A0E7E5] transition-colors'>
              Главная
            </Link>
            <Link href='/catalog' className='text-gray-700 hover:text-[#A0E7E5] transition-colors'>
              Каталог
            </Link>
            <Link href='/about' className='text-gray-700 hover:text-[#A0E7E5] transition-colors'>
              О нас
            </Link>
            <Link href='/contact' className='text-gray-700 hover:text-[#A0E7E5] transition-colors'>
              Контакты
            </Link>
          </nav>

          <div className='flex items-center space-x-4'>
            <Button color='primary' className='bg-[#A0E7E5] text-white'>
              Заказать звонок
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
