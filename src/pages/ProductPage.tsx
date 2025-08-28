import { Button, Card, CardBody } from '@heroui/react';
import React from 'react';

const ProductPage: React.FC = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div>
          <h1 className='text-3xl font-bold mb-4'>Бризер Tion</h1>
          <p className='text-gray-600 mb-6'>
            Профессиональная система вентиляции с фильтрацией воздуха. Обеспечивает постоянный
            приток свежего воздуха в помещение.
          </p>

          <div className='mb-6'>
            <h3 className='text-xl font-semibold mb-2'>Характеристики:</h3>
            <ul className='list-disc list-inside space-y-1 text-gray-600'>
              <li>Производительность: до 120 м³/ч</li>
              <li>Уровень шума: до 25 дБ</li>
              <li>Площадь обслуживания: до 40 м²</li>
              <li>Фильтрация: HEPA + угольный фильтр</li>
            </ul>
          </div>

          <Button color='primary' size='lg' className='bg-[var(--secondary-color)] text-white'>
            Заказать установку
          </Button>
        </div>

        <Card>
          <CardBody>
            <h3 className='text-xl font-semibold mb-4'>Стоимость установки</h3>
            <p className='text-2xl font-bold text-[var(--secondary-color)] mb-4'>от 45 000 ₽</p>
            <p className='text-gray-600 mb-4'>
              В стоимость входит: бризер, установка, настройка, гарантия
            </p>
            <Button color='primary' className='w-full bg-[var(--secondary-color)] text-white'>
              Получить консультацию
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ProductPage;
