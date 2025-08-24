import { Button, Card, CardBody } from "@heroui/react";
import React from 'react';

const CatalogPage: React.FC = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>Каталог бризеров</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <Card>
          <CardBody>
            <h3 className='text-xl font-semibold mb-2'>Бризер Tion</h3>
            <p className='text-gray-600 mb-4'>Профессиональная система вентиляции</p>
            <Button color='primary' className='bg-[#A0E7E5] text-white'>
              Подробнее
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className='text-xl font-semibold mb-2'>Бризер Ballu</h3>
            <p className='text-gray-600 mb-4'>Компактная система очистки воздуха</p>
            <Button color='primary' className='bg-[#A0E7E5] text-white'>
              Подробнее
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className='text-xl font-semibold mb-2'>Бризер Vakio</h3>
            <p className='text-gray-600 mb-4'>Умная система вентиляции</p>
            <Button color='primary' className='bg-[#A0E7E5] text-white'>
              Подробнее
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default CatalogPage;
