import { PocketBaseReview } from '@/shared/api/reviews';
import { plural } from '@/shared/lib/format';
import { Reveal } from '@/shared/lib/useReveal';
import React from 'react';
import { LuStar } from 'react-icons/lu';

interface ReviewsProps {
  reviews: PocketBaseReview[];
}

const Stars: React.FC<{ value: number; className?: string }> = ({ value, className = 'text-sun-500' }) => {
  const r = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div className={`flex gap-0.5 ${className}`} aria-label={`Оценка ${r} из 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <LuStar key={i} className={`w-4 h-4 ${i < r ? 'fill-current' : 'opacity-30'}`} />
      ))}
    </div>
  );
};

const formatDate = (date?: string) => (date ? new Date(date).toLocaleDateString('ru-RU') : '');

// Отзывы: карточка со средней оценкой + горизонтальная лента, каждый 3-й отзыв — акцентный
const Reviews: React.FC<ReviewsProps> = ({ reviews = [] }) => {
  if (reviews.length === 0) return null;

  const avg = reviews.reduce((a, r) => a + (r.mark || 0), 0) / reviews.length;

  return (
    <section className='py-16 md:py-24 bg-white/60'>
      <div className='mx-auto max-w-page px-5 md:px-8 grid lg:grid-cols-12 gap-5'>
        <Reveal className='lg:col-span-4 rounded-card bg-air p-7 md:p-9 flex flex-col'>
          <span className='eyebrow'>Отзывы клиентов</span>
          <span className='mt-6 text-[96px] md:text-[120px] font-extralight leading-[0.85] tracking-[-0.06em] tnum'>
            {avg.toFixed(1).replace('.', ',')}
          </span>
          <Stars value={avg} className='mt-4 text-sun-500' />
          <p className='mt-3 text-ink-2'>
            Средняя оценка по {reviews.length} {plural(reviews.length, 'отзыву', 'отзывам', 'отзывам')} клиентов
          </p>
        </Reveal>

        <div className='lg:col-span-8 min-w-0'>
          <div className='flex gap-4 md:gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 -mx-5 px-5 lg:mx-0 lg:px-0'>
            {reviews.map((review, i) => {
              const accent = i % 3 === 1;
              return (
                <figure
                  key={review.id}
                  className={`snap-start shrink-0 w-[85%] sm:w-[340px] rounded-card p-6 md:p-7 flex flex-col card-hover ${
                    accent ? 'bg-brand-700 text-white' : 'bg-white shadow-soft'
                  }`}>
                  <Stars value={review.mark} className={accent ? 'text-sun-300' : 'text-sun-500'} />
                  <blockquote className='mt-4 text-[16px] leading-relaxed max-h-[180px] overflow-y-auto no-scrollbar'>
                    «{review.review}»
                  </blockquote>
                  <figcaption className='mt-auto pt-6 flex items-center gap-3'>
                    <span
                      className={`w-11 h-11 rounded-full grid place-items-center font-bold shrink-0 ${
                        accent ? 'bg-white/15' : 'bg-brand-100 text-brand-800'
                      }`}>
                      {review.customer?.[0]?.toUpperCase()}
                    </span>
                    <span className='min-w-0'>
                      <b className='block truncate'>{review.customer}</b>
                      <span className={`text-sm ${accent ? 'text-white/60' : 'text-ink-3'}`}>
                        {[review.service, formatDate(review.date)].filter(Boolean).join(' · ')}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
