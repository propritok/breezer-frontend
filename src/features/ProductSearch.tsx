import { Button, Card, CardBody, Input } from '@heroui/react';
import React, { useState } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
}

const ProductSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const handleSearch = () => {
    // Здесь будет логика поиска
    console.log('Search:', { searchTerm, category });
  };

  return (
    <Card>
      <CardBody>
        <h3 className='text-xl font-semibold mb-4'>Поиск бризеров</h3>
        <div className='space-y-4'>
          <Input
            label='Поиск'
            placeholder='Введите название или характеристики'
            variant='bordered'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className='w-full p-3 border border-gray-300 rounded-lg'
            value={category}
            onChange={(e) => setCategory(e.target.value)}>
            <option value='all'>Все категории</option>
            <option value='tion'>Tion</option>
            <option value='ballu'>Ballu</option>
            <option value='vakio'>Vakio</option>
          </select>

          <Button color='primary' className='w-full bg-[#A0E7E5] text-white' onPress={handleSearch}>
            Найти
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductSearch;
