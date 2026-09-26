import { ContactCTAButton } from '@/features';
import { useSocials } from '@/shared/ui/SocialLinks';
import Image from 'next/image';
import React from 'react';

interface PromoConsultationCardProps {
  title?: string;
  subtitle?: string;
  action?: string;
  image?: string;
}

// Промо-карточка «консультация» поверх фото выполненной работы
const PromoConsultationCard: React.FC<PromoConsultationCardProps> = ({
  title = 'Сомневаетесь, подойдёт ли модель?',
  subtitle = 'Проверим стены, площадь и место под розетку по фото — бесплатно.',
  action = 'Консультация со страницы товара',
  image = '/work/IMG_9951.jpg',
}) => {
  const messengers = useSocials();
  return (
    <div className='relative rounded-card overflow-hidden bg-brand-900 text-white min-h-[460px] flex flex-col'>
      <Image src={image} alt='' fill sizes='(max-width: 1024px) 100vw, 33vw' className='object-cover opacity-60' />
      <div className='absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/60 to-transparent' />
      <div className='relative p-6 md:p-7 mt-auto'>
        <h3 className='text-h3 font-bold leading-tight'>{title}</h3>
        <p className='mt-2 text-white/70 text-sm'>{subtitle}</p>
        <div className='mt-5 flex flex-col gap-2'>
          <ContactCTAButton
            label='Получить консультацию'
            formButtonLabel='Получить консультацию'
            action={action}
            showMessageField
            className='w-full h-12 bg-white text-brand-900 shadow-none'
          />
          {messengers.length > 0 && (
          <div className='grid gap-2' style={{ gridTemplateColumns: `repeat(${messengers.length}, minmax(0, 1fr))` }}>
            {messengers.map(({ href, label, bg, Icon }) => (
              <a
                key={label}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`Написать в ${label}`}
                className={`${bg} h-11 rounded-full grid place-items-center text-white transition hover:-translate-y-0.5`}>
                <Icon className='w-5 h-5' />
              </a>
            ))}
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromoConsultationCard;
