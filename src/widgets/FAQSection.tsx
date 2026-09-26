import { ContactCTAButton, FAQ } from '@/features';
import { Reveal } from '@/shared/lib/useReveal';

interface FAQSectionProps {
  title?: string;
  maxQuestions?: number;
  className?: string;
}

// FAQ: слева заголовок и карточка «не нашли ответ», справа аккордеон
const FAQSection: React.FC<FAQSectionProps> = ({
  title = 'Частые вопросы',
  maxQuestions,
  className = '',
}) => {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className='mx-auto max-w-page px-5 md:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16'>
        <Reveal className='lg:col-span-4'>
          <span className='eyebrow'>Ответы на вопросы</span>
          <h2 className='mt-4 section-title'>{title}</h2>
          <div className='mt-8 hidden lg:block rounded-card bg-brand-900 text-white p-7 relative overflow-hidden'>
            <div className='absolute -right-16 -top-16 w-48 h-48 rounded-full bg-brand-700 animate-breathe' />
            <div className='relative'>
              <p className='text-h4 font-bold leading-snug'>Не нашли ответ? Перезвоним и&nbsp;подскажем</p>
              <ContactCTAButton
                label='Задать вопрос'
                formButtonLabel='Задать вопрос'
                showMessageField
                action='Вопрос из FAQ'
                className='mt-6 bg-white text-brand-900 shadow-none'
              />
            </div>
          </div>
        </Reveal>
        <Reveal className='lg:col-span-8' delay={1}>
          <FAQ maxQuestions={maxQuestions} />
        </Reveal>
      </div>
    </section>
  );
};

export default FAQSection;
