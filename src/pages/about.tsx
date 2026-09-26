import { Reveal } from '@/shared/lib/useReveal';
import { FAQSection, SiteBreadcrumbs } from '@/widgets';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import { LuBuilding2, LuHouse, LuShieldCheck } from 'react-icons/lu';

const AboutPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>О нас - Propritok</title>
        <meta name='description' content='Наша цель - чистый воздух в каждый дом!' />
      </Head>

      <SiteBreadcrumbs pageTitle='О компании' />

      <main>
        {/* Интро */}
        <section className='mx-auto max-w-page px-5 md:px-8 pt-8 md:pt-12 pb-16 md:pb-24 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center'>
          <Reveal className='lg:col-span-6 relative h-[440px] md:h-[600px]'>
            <div className='absolute left-0 top-0 w-[68%] h-[80%] rounded-block overflow-hidden shadow-lift'>
              <Image src='/work/IMG_2068.jpg' alt='' fill sizes='(max-width: 1024px) 68vw, 34vw' className='object-cover' />
            </div>
            <div className='absolute right-0 bottom-0 w-[52%] h-[62%] rounded-block overflow-hidden shadow-lift border-[6px] border-air'>
              <Image src='/work/IMG_9949.jpg' alt='' fill sizes='(max-width: 1024px) 52vw, 26vw' className='object-cover' />
            </div>
            <div className='absolute left-4 bottom-6 md:left-8 md:bottom-10 glass shadow-glass rounded-3xl p-5 w-[210px] animate-drift'>
              <div className='text-[44px] font-extralight leading-none tracking-[-0.05em]'>
                2023<span className='text-brand-700 font-bold'>·</span>
              </div>
              <div className='text-sm text-ink-2 mt-1'>ставим бризеры с 2023 года</div>
            </div>
          </Reveal>
          <Reveal className='lg:col-span-6' delay={1}>
            <span className='eyebrow'>О компании</span>
            <h1 className='mt-4 text-[40px] leading-[1.02] md:text-h1 font-light tracking-[-0.04em]'>
              Наша цель — <span className='font-extrabold'>чистый воздух в&nbsp;каждый дом</span>
            </h1>
            <p className='mt-6 text-body-lg text-ink-2'>
              Рады приветствовать вас на сайте PROPRITOK. Мы занимаемся продажей бризеров и их профессиональным
              монтажом: выбирая нас, вы можете быть уверены, что услуга будет оказана качественно и в точный срок.
            </p>
            <p className='mt-4 text-ink-2'>Мы за экологичность, осознанные решения и комфорт.</p>
          </Reveal>
        </section>

        {/* История — крупные даты */}
        <section className='bg-white/60 py-16 md:py-24'>
          <div className='mx-auto max-w-page px-5 md:px-8'>
            <Reveal>
              <span className='eyebrow'>Наша история</span>
            </Reveal>
            <div className='mt-8 grid md:grid-cols-2 gap-5'>
              <Reveal className='rounded-card bg-air p-7 md:p-9'>
                <div className='text-[72px] md:text-[96px] font-extralight leading-none tracking-[-0.06em] text-grad'>2023</div>
                <p className='mt-4 text-ink-2 text-body-lg'>
                  Наш путь в сфере приточной вентиляции начался с практики установки бризеров. За два года мы собрали
                  сильную команду профессионалов, наладили рабочие процессы и довели установку и продажу бризеров до
                  совершенства.
                </p>
              </Reveal>
              <Reveal delay={1} className='rounded-card bg-brand-700 text-white p-7 md:p-9'>
                <div className='text-[72px] md:text-[96px] font-extralight leading-none tracking-[-0.06em]'>2025</div>
                <p className='mt-4 text-white/80 text-body-lg'>Основали компанию PROPRITOK.</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Почему выбирают + преимущества */}
        <section className='mx-auto max-w-page px-5 md:px-8 py-16 md:py-24 grid lg:grid-cols-12 gap-10'>
          <Reveal className='lg:col-span-5'>
            <span className='eyebrow'>Почему выбирают нас</span>
            <h2 className='mt-4 section-title'>Забота о&nbsp;здоровье — своём и&nbsp;семьи</h2>
            <p className='mt-5 text-ink-2 text-body-lg'>
              Установка бризера — отличное решение для людей с респираторными заболеваниями, онкологией, а также
              семей с детьми, которым очень необходим ежедневный чистый воздух без аллергенов.
            </p>
            <p className='mt-4 text-ink-2'>
              Мы гордимся тем, что берёмся за сложные монтажи и всегда готовы предложить нестандартные решения и
              индивидуальный подход — своевременно реагируем на запрос и выполняем работу в намеченный срок.
            </p>
          </Reveal>
          <div className='lg:col-span-7 grid sm:grid-cols-2 gap-4'>
            <Reveal delay={1} className='rounded-card bg-white shadow-soft p-6 md:p-7 card-hover'>
              <span className='w-11 h-11 rounded-full bg-brand-50 text-brand-700 grid place-items-center'>
                <LuBuilding2 className='w-5 h-5' />
              </span>
              <h3 className='mt-6 text-h4 font-bold'>Для многоквартирных домов</h3>
              <p className='mt-2 text-sm text-ink-2 leading-relaxed'>
                Принудительный приток свежего воздуха помогает избежать многих проблем в многоквартирных домах и
                офисах. Вы забудете, что такое запах сигарет от соседей, духота на рабочем месте и другие неприятные
                мелочи.
              </p>
            </Reveal>
            <Reveal delay={2} className='rounded-card bg-sand p-6 md:p-7 card-hover'>
              <span className='w-11 h-11 rounded-full bg-white text-brand-700 grid place-items-center'>
                <LuHouse className='w-5 h-5' />
              </span>
              <h3 className='mt-6 text-h4 font-bold'>Для загородных домов и новостроек</h3>
              <p className='mt-2 text-sm text-ink-2 leading-relaxed'>
                Приятным бонусом к приточной очистке воздуха станет шумоподавление бризера. Никакие посторонние
                звуки не будут мешать вашему отдыху дома.
              </p>
            </Reveal>
            <Reveal delay={1} className='sm:col-span-2 rounded-card bg-brand-900 text-white p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center'>
              <div className='flex items-end gap-2 shrink-0'>
                <span className='text-[88px] font-extralight leading-[0.8] tracking-[-0.06em]'>5</span>
                <span className='mb-2 font-bold leading-tight'>
                  лет
                  <br />
                  <span className='font-light text-white/70'>гарантии</span>
                </span>
              </div>
              <div>
                <h3 className='text-h4 font-bold flex items-center gap-2'>
                  <LuShieldCheck className='w-5 h-5 text-brand-300' /> Гарантии и поддержка
                </h3>
                <p className='mt-2 text-white/75'>
                  PROPRITOK ценит каждого клиента и члена команды — мы за долгосрочное сотрудничество. Каждый клиент
                  получает гарантию на монтаж 5 лет и бережную поддержку при возникновении спорных вопросов.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <FAQSection title='Частые вопросы о нас' maxQuestions={4} />
      </main>
    </>
  );
};

export default AboutPage;
