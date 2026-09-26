import { Reveal } from '@/shared/lib/useReveal';
import React from 'react';
import { LuCheck } from 'react-icons/lu';

const points = ['2 года на бризер от производителя', 'Монтаж по нормам и рекомендациям производителя'];

// Гарантия: огромная «5» с «дышащими» кольцами
const GuaranteeSection: React.FC = () => (
  <section className='relative py-20 md:py-32'>
    <div className='mx-auto max-w-page px-5 md:px-8 grid md:grid-cols-12 gap-10 items-center'>
      <Reveal className='md:col-span-6 relative flex items-center justify-center md:justify-start min-h-[300px]'>
        <div className='absolute w-[300px] h-[300px] md:w-[460px] md:h-[460px] rounded-full border border-brand-200 animate-breathe' />
        <div
          className='absolute w-[220px] h-[220px] md:w-[340px] md:h-[340px] rounded-full border border-brand-200/70 animate-breathe'
          style={{ animationDelay: '-2s' }}
        />
        <div
          className='absolute w-[140px] h-[140px] md:w-[220px] md:h-[220px] rounded-full bg-brand-50 animate-breathe'
          style={{ animationDelay: '-4s' }}
        />
        <div className='relative flex items-end md:pl-16'>
          <span className='text-[220px] md:text-[360px] leading-[0.8] font-extralight tracking-[-0.08em] text-grad select-none'>
            5
          </span>
          <span className='mb-6 md:mb-10 ml-2 text-h4 md:text-h3 font-bold leading-tight'>
            лет
            <br />
            <span className='font-light text-ink-2'>гарантии</span>
          </span>
        </div>
      </Reveal>
      <Reveal className='md:col-span-6' delay={1}>
        <span className='eyebrow'>Гарантия</span>
        <h2 className='mt-4 section-title'>
          Дышите спокойно — <span className='font-light'>5&nbsp;лет гарантии на&nbsp;монтаж</span>
        </h2>
        <p className='mt-5 text-body-lg text-ink-2 max-w-[520px]'>
          Мы понимаем, насколько важно, чтобы вентиляция работала безупречно. Монтируем строго по техническим
          нормам и рекомендациям производителей — и настолько уверены в качестве, что даём расширенную
          гарантию 5&nbsp;лет.
        </p>
        <ul className='mt-8 grid sm:grid-cols-2 gap-3'>
          {points.map((p) => (
            <li key={p} className='flex items-center gap-3 rounded-2xl bg-white shadow-soft p-4'>
              <span className='w-10 h-10 rounded-full bg-brand-50 text-brand-700 grid place-items-center shrink-0'>
                <LuCheck className='w-5 h-5' />
              </span>
              <span className='text-sm font-semibold'>{p}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);

export default GuaranteeSection;
