import { productsApi } from '@/shared/api/products';
import { Button, Card, CardBody, Input } from '@heroui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const ProductSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    try {
      const results = await productsApi.search(searchTerm);
      // Здесь можно добавить логику для отображения результатов
      // Например, перенаправить на страницу каталога с параметрами поиска
      router.push(`/catalog?search=${encodeURIComponent(searchTerm)}`);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
            onKeyPress={handleKeyPress}
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

          <Button
            color='primary'
            className='w-full bg-[var(--secondary-color)] text-white'
            onPress={handleSearch}
            isLoading={isLoading}>
            {isLoading ? 'Поиск...' : 'Найти'}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductSearch;
