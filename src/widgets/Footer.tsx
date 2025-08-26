import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className='bg-gray-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div>
            <h3 className='text-xl font-bold text-[#A0E7E5] mb-4'>Propritok</h3>
            <p className='text-gray-400'>
              Профессиональные бризеры для вашего дома. Качество, надежность, комфорт.
            </p>
          </div>

          <div>
            <h4 className='font-semibold mb-4'>Услуги</h4>
            <ul className='space-y-2 text-gray-400'>
              <li>
                <Link href='/catalog' className='hover:text-[#A0E7E5]'>
                  Каталог бризеров
                </Link>
              </li>
              <li>
                <Link href='/installation' className='hover:text-[#A0E7E5]'>
                  Установка
                </Link>
              </li>
              <li>
                <Link href='/service' className='hover:text-[#A0E7E5]'>
                  Обслуживание
                </Link>
              </li>
              <li>
                <Link href='/warranty' className='hover:text-[#A0E7E5]'>
                  Гарантия
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-semibold mb-4'>Компания</h4>
            <ul className='space-y-2 text-gray-400'>
              <li>
                <Link href='/about' className='hover:text-[#A0E7E5]'>
                  О нас
                </Link>
              </li>
              <li>
                <Link href='/contact' className='hover:text-[#A0E7E5]'>
                  Контакты
                </Link>
              </li>
              <li>
                <Link href='/reviews' className='hover:text-[#A0E7E5]'>
                  Отзывы
                </Link>
              </li>
              <li>
                <Link href='/blog' className='hover:text-[#A0E7E5]'>
                  Блог
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-semibold mb-4'>Контакты</h4>
            <div className='space-y-2 text-gray-400'>
              <p>+79295850880</p>
              <p>info@propritok.ru</p>
              <p>г. Москва, ул. Примерная, д. 123</p>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
          <p>&copy; 2024 Propritok. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
