import { Button, Card, CardBody } from '@heroui/react';
import React from 'react';

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  product: string;
}

const Reviews: React.FC = () => {
  const reviews: Review[] = [
    {
      id: '1',
      name: 'Анна Петрова',
      rating: 5,
      text: 'Отличный бризер! Установили в спальне, теперь спим как младенцы. Воздух стал намного чище.',
      date: '2024-01-15',
      product: 'Бризер Tion O2',
    },
    {
      id: '2',
      name: 'Михаил Иванов',
      rating: 5,
      text: 'Профессиональная установка, все сделали быстро и качественно. Рекомендую!',
      date: '2024-01-10',
      product: 'Бризер Ballu Air Master',
    },
    {
      id: '3',
      name: 'Елена Сидорова',
      rating: 4,
      text: 'Хороший бризер, но немного шумный. В целом довольна покупкой.',
      date: '2024-01-05',
      product: 'Бризер Vakio Base',
    },
  ];

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h3 className='text-2xl font-semibold'>Отзывы клиентов</h3>
        <Button color='primary' className='bg-[var(--secondary-color)] text-white'>
          Оставить отзыв
        </Button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardBody>
              <div className='flex items-center justify-between mb-2'>
                <h4 className='font-semibold'>{review.name}</h4>
                <span className='text-yellow-400 text-sm'>{renderStars(review.rating)}</span>
              </div>

              <p className='text-sm text-gray-600 mb-2'>{review.product}</p>
              <p className='text-gray-700 mb-3'>{review.text}</p>
              <p className='text-xs text-gray-500'>{review.date}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
