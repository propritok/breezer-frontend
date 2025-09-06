// pages/reviews.tsx
import { PocketBaseReview } from '@/shared/api/reviews';
import { Card, CardBody } from '@heroui/react';
import { NextPage } from 'next';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface ReviewsPageProps {
  reviews: PocketBaseReview[];
}

const renderStars = (rating: number) => {
  const r = Math.max(0, Math.min(5, Math.round(rating)));
  return '★'.repeat(r) + '☆'.repeat(5 - r);
};

const ReviewsPage: NextPage<ReviewsPageProps> = ({ reviews = [] }) => {
  return (
    <div className='max-w-7xl mx-auto px-4 py-12'>
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <h3 className='text-2xl font-semibold'>Отзывы клиентов</h3>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={reviews.length > 3}
          spaceBetween={16}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className='w-full pb-9'>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <Card className='shadow-sm h-full'>
                  <CardBody>
                    <div className='flex items-center justify-between mb-2'>
                      <h4 className='font-semibold'>{review.customer}</h4>
                      <span className='text-yellow-400 text-sm'>{renderStars(review.mark)}</span>
                    </div>
                    {review.service && (
                      <p className='text-sm text-gray-600 mb-2'>{review.service}</p>
                    )}
                    <p className='text-gray-700 mb-3 max-h-[100px] overflow-y-auto'>
                      {review.review}
                    </p>
                    <p className='text-xs text-gray-500'>
                      {new Date(review.date || '').toLocaleDateString('ru-RU')}
                    </p>
                  </CardBody>
                </Card>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className='text-center py-12'>
                <p className='text-gray-500 text-lg'>Пока нет отзывов</p>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewsPage;
