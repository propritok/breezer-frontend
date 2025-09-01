import { Button, Card, CardBody } from '@heroui/react';
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold mb-4'>PROPRITOK</h1>
        <p className='text-lg mb-6 text-gray-600'>Профессиональные бризеры для вашего дома</p>
        <Button color='primary' size='lg' className='bg-[var(--secondary-color)] text-white'>
          Перейти в каталог
        </Button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
        <Card>
          <CardBody>
            <h3 className='text-xl font-semibold mb-2'>Качество</h3>
            <p>Только проверенные производители и материалы</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h3 className='text-xl font-semibold mb-2'>Установка</h3>
            <p>Профессиональная установка под ключ</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h3 className='text-xl font-semibold mb-2'>Сервис</h3>
            <p>Гарантия и техническое обслуживание</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
