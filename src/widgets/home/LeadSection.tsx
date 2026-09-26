import { Airflow, ContactFormCTA } from '@/shared';
import { useSiteSettings } from '@/shared/lib/siteSettings';
import { Reveal } from '@/shared/lib/useReveal';
import React from 'react';
import { LuCheck } from 'react-icons/lu';

// Финальный CTA: тёмная карточка с формой заявки
const LeadSection: React.FC = () => {
  const { installDiscount } = useSiteSettings();
  return (
  <section id='lead' className='py-16 md:py-24 scroll-mt-24'>
    <div className='mx-auto max-w-page px-5 md:px-8'>
      <Reveal className='relative rounded-block bg-brand-900 text-white overflow-hidden p-7 md:p-14 grid md:grid-cols-2 gap-10 items-center'>
        <Airflow className='absolute inset-0 w-full h-full' height={500} color='#8FD3CF' opacity={0.25} />
        <div className='absolute -right-24 -bottom-24 w-80 h-80 rounded-full bg-brand-700/60 blur-2xl animate-breathe' />
        <div className='relative'>
          <h2 className='section-title'>
            Подберём бризер <span className='font-light text-brand-300'>под вашу квартиру</span>
          </h2>
          <p className='mt-4 text-white/70 max-w-[420px]'>
            Оставьте номер — перезвоним, уточним площадь и&nbsp;стены, посчитаем монтаж с&nbsp;учётом скидки.
          </p>
          <ul className='mt-6 space-y-2 text-sm text-white/80'>
            {['Бесплатная консультация', `Скидка ${installDiscount}% на монтаж при покупке бризера`].map((t) => (
              <li key={t} className='flex items-center gap-2'>
                <LuCheck className='w-5 h-5 text-brand-300' />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className='relative rounded-card bg-white p-5 md:p-7 text-ink'>
          <ContactFormCTA buttonLabel='Жду звонка' action='Подбор бризера (главная)' />
        </div>
      </Reveal>
    </div>
  </section>
  );
};

export default LeadSection;
