import { ContactCTAButton } from '@/features';
import { Airflow } from '@/shared';
import { useSiteSettings } from '@/shared/lib/siteSettings';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { LuArrowRight } from 'react-icons/lu';

// Фото Tion BIO X с вырезанным фоном (прозрачный webp)
const HERO_IMAGE = '/hero/breezer-bio-x.webp';

const facts = [
  { value: '18', unit: 'дБ', label: 'тише шёпота —\nможно спать', side: 'left', top: 'top-24' },
  { value: '1,5', unit: 'ч', label: 'монтаж HILTI\nбез пыли', side: 'left', top: 'top-64' },
  { value: '5', unit: 'лет', label: 'гарантии\nна монтаж', side: 'right', top: 'top-24' },
  { value: '2', unit: 'года', label: 'гарантии\nна бризер', side: 'right', top: 'top-64' },
] as const;

// Hero, вариант A «Тишина»: центр, один предмет, много воздуха, волны вокруг прибора
const HomeHero: React.FC = () => {
  const { installDiscount } = useSiteSettings();
  return (
  <section className='relative -mt-20 pt-28 md:pt-36 overflow-hidden bg-gradient-to-b from-white via-white to-air'>
    <div className='absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-brand-50 blur-3xl opacity-80 animate-breathe' />

    <div className='relative text-center'>
      <a
        href='#price'
        className='inline-flex items-center gap-2 h-9 pl-1.5 pr-4 rounded-full bg-white border border-line shadow-soft text-sm font-semibold text-ink-2 hover:border-brand-300 transition'>
        <span className='h-6 px-2.5 rounded-full bg-brand-700 text-white text-xs font-bold inline-flex items-center'>
          −{installDiscount}%
        </span>
        на монтаж при покупке бризера
      </a>
      <h1 className='mt-7 mx-auto max-w-[1040px] px-5 text-[44px] leading-[1] sm:text-[64px] md:text-[112px] md:leading-[0.95] font-extralight tracking-[-0.055em]'>
        Чистый воздух
        <br />
        <span className='font-bold'>в каждый дом</span>
      </h1>
      <p className='mt-6 mx-auto max-w-[480px] px-5 text-body-lg text-ink-2'>
        Бризеры для здорового микроклимата. Установка под ключ с&nbsp;гарантией качества.
      </p>
      <div className='mt-8 flex flex-col sm:flex-row gap-3 justify-center px-5'>
        <Link href='/catalog' className='btn btn-primary !h-14 !px-8'>
          Перейти в каталог <LuArrowRight className='arrow w-5 h-5' />
        </Link>
        <ContactCTAButton
          label='Получить консультацию'
          formButtonLabel='Получить консультацию'
          ctaVariant='secondary'
          className='h-14 px-7 sm:border-transparent sm:bg-transparent sm:text-brand-700 sm:hover:bg-brand-50'
        />
      </div>
    </div>

    {/* Прибор на волнах */}
    <div className='relative mt-10 md:mt-14 h-[330px] md:h-[460px]'>
      <Airflow className='absolute inset-0 w-full h-full' height={460} opacity={0.45} />
      <div className='absolute left-1/2 top-4 -translate-x-1/2 w-[300px] h-[300px] md:w-[440px] md:h-[440px]'>
        <span className='ring-wave' />
        <span className='ring-wave' />
        <span className='ring-wave' />
        <div className='absolute inset-10 rounded-full bg-gradient-to-b from-brand-50 to-white' />
        <div className='absolute inset-12 animate-drift'>
          <Image
            src={HERO_IMAGE}
            alt='Бризер Tion BIO X'
            fill
            priority
            sizes='(max-width: 768px) 210px, 340px'
            className='object-contain drop-shadow-[0_24px_30px_rgba(6,63,70,0.18)]'
          />
        </div>
      </div>
      {facts.map((f) => (
        <div
          key={f.label}
          className={`hidden md:block absolute ${f.top} ${
            f.side === 'left'
              ? 'left-[max(2rem,calc(50%-560px))] text-left'
              : 'right-[max(2rem,calc(50%-560px))] text-right'
          }`}>
          <div className='text-[64px] font-extralight tracking-[-0.05em] leading-none'>
            {f.value}
            <span className='text-2xl font-semibold tracking-normal ml-2.5'>{f.unit}</span>
          </div>
          <div className='text-sm text-ink-3 mt-2 whitespace-pre-line'>{f.label}</div>
        </div>
      ))}
    </div>

    {/* Факты на мобиле */}
    <dl className='md:hidden relative grid grid-cols-2 gap-2 px-5 pb-10 -mt-2'>
      {facts.map((f) => (
        <div key={f.label} className='rounded-2xl bg-white shadow-soft p-4'>
          <dt className='text-[28px] font-extralight tracking-[-0.04em] leading-none'>
            {f.value}
            <span className='text-base font-semibold tracking-normal ml-1.5'>{f.unit}</span>
          </dt>
          <dd className='text-xs text-ink-3 mt-1.5'>{f.label.replace('\n', ' ')}</dd>
        </div>
      ))}
    </dl>
  </section>
  );
};

export default HomeHero;
