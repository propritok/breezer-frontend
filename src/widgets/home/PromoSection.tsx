import { ContactCTAButton } from '@/features';
import { Airflow } from '@/shared';
import { useSiteSettings } from '@/shared/lib/siteSettings';
import { Reveal } from '@/shared/lib/useReveal';
import React from 'react';

// Акция «скидка на монтаж» (процент из админки): крупная цифра на бирюзовой волне
const PromoSection: React.FC = () => {
  const { installDiscount } = useSiteSettings();
  return (
  <section className='py-8 md:py-12'>
    <div className='mx-auto max-w-page px-5 md:px-8'>
      <Reveal className='relative rounded-block bg-white shadow-soft overflow-hidden'>
        <div className='absolute inset-y-0 right-0 w-full md:w-3/5 bg-brand-700 [clip-path:ellipse(130%_42%_at_50%_100%)] md:[clip-path:ellipse(80%_120%_at_100%_50%)]' />
        <Airflow className='absolute inset-0 w-full h-full' height={400} color='#fff' opacity={0.25} />
        <div className='relative grid md:grid-cols-2 gap-8 p-7 md:p-14 items-center'>
          <div>
            <span className='inline-flex h-8 px-3 rounded-full bg-sun-100 text-sun-700 text-xs font-bold items-center'>
              Специальное предложение
            </span>
            <h2 className='mt-5 text-[30px] leading-[1.1] md:text-[44px] font-bold tracking-[-0.03em]'>
              При покупке бризера — <span className='text-brand-700'>скидка на монтаж</span>
            </h2>
            <p className='mt-4 text-ink-2 max-w-[420px]'>
              Выбирайте любой бризер в каталоге: установка обойдётся на {installDiscount}% дешевле.
            </p>
          </div>
          <div className='flex flex-col md:items-end text-white pt-10 md:pt-0'>
            <div className='flex items-start leading-none'>
              <span className='text-[120px] md:text-[200px] font-extralight tracking-[-0.08em]'>{installDiscount}</span>
              <span className='text-[56px] md:text-[80px] font-bold mt-3 md:mt-6'>%</span>
            </div>
            <ContactCTAButton
              label='Получить скидку'
              formButtonLabel='Получить скидку'
              action={`Хочет скидку ${installDiscount}% на монтаж`}
              className='h-14 px-8 mt-4 bg-white text-brand-900 shadow-none hover:bg-white'
            />
          </div>
        </div>
      </Reveal>
    </div>
  </section>
  );
};

export default PromoSection;
