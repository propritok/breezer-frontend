import { ContactCTAButton } from '@/features';
import { Airflow } from '@/shared';
import { useSocials } from '@/shared/ui/SocialLinks';
import React from 'react';
import { LuMessageCircle } from 'react-icons/lu';

interface PromoConsultationCardProps {
  title?: string;
  subtitle?: string;
  action?: string;
}

// Промо-карточка «консультация»: фирменный бирюзовый фон с потоками воздуха
const PromoConsultationCard: React.FC<PromoConsultationCardProps> = ({
  title = 'Сомневаетесь, подойдёт ли модель?',
  subtitle = 'Проверим стены, площадь и место под розетку по фото — бесплатно.',
  action = 'Консультация со страницы товара',
}) => {
  const messengers = useSocials();
  return (
    <div className='relative rounded-card overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white min-h-[460px] flex flex-col'>
      <Airflow className='absolute inset-0 w-full h-full' width={400} height={500} color='#fff' opacity={0.3} />
      <div className='absolute -right-16 -top-16 w-56 h-56 rounded-full bg-white/10 animate-breathe' />
      <div
        className='absolute -left-20 bottom-24 w-48 h-48 rounded-full bg-brand-500/30 blur-2xl animate-breathe'
        style={{ animationDelay: '-3s' }}
      />
      <span className='relative m-6 md:m-7 w-12 h-12 rounded-full bg-white/15 grid place-items-center'>
        <LuMessageCircle className='w-6 h-6' />
      </span>
      <div className='relative p-6 md:p-7 mt-auto'>
        <h3 className='text-h3 font-bold leading-tight'>{title}</h3>
        <p className='mt-2 text-white/80 text-sm'>{subtitle}</p>
        <div className='mt-5 flex flex-col gap-2'>
          <ContactCTAButton
            label='Получить консультацию'
            formButtonLabel='Получить консультацию'
            action={action}
            showMessageField
            className='w-full h-12 bg-white text-brand-900 shadow-none'
          />
          {messengers.length > 0 && (
            <div
              className='grid gap-2'
              style={{ gridTemplateColumns: `repeat(${messengers.length}, minmax(0, 1fr))` }}>
              {messengers.map(({ href, label, bg, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={`Написать в ${label}`}
                  className={`${bg} h-11 rounded-full grid place-items-center text-white ring-1 ring-white/20 transition hover:-translate-y-0.5`}>
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
