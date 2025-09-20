import { FAQSection, SiteBreadcrumbs } from '@/widgets';
import Head from 'next/head';
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>О нас - Propritok</title>
        <meta
          name='description'
          content='Наша цель - чистый воздух в каждый дом!'
        />
      
      </Head>
    <div className='min-h-screen bg-white'>
      <SiteBreadcrumbs pageTitle='О компании' />

      <div className='max-w-4xl mx-auto px-4 py-8'>
        <h1 className='text-4xl font-bold mb-8 text-center'>
          О компании <span className='text-[var(--secondary-color)] uppercase'>PROPRITOK</span>
        </h1>

        {/* Приветствие */}
        <div className='mb-12'>
          <p className='text-xl text-gray-700 leading-relaxed mb-6'>
            Рады приветствовать вас на нашем сайте компании PROPRITOK. Мы занимаемся продажей
            бризеров и их профессиональным монтажом, выбирая нас вы можете быть уверены, что услуга
            будет оказана качественно и в точный срок.
          </p>
        </div>

        {/* История компании */}
        <div className='mb-12'>
          <h2 className='text-2xl font-bold mb-6 text-[var(--secondary-color)]'>Наша история</h2>
          <p className='text-lg text-gray-700 leading-relaxed mb-4'>
            Наш путь в сфере приточной вентиляции начался с практики установки бризеров в 2023 году.
            В течении двух лет мы собрали сильную команду профессионалов, наладили рабочие процессы,
            а так же довели установку и продажу бризеров до совершенства. В 2025 году основали
            компанию PROPRITOK.
          </p>
        </div>

        {/* Миссия и ценности */}
        <div className='mb-12 bg-gradient-to-r from-[var(--secondary-color)] to-[#B8F0EE] p-8 rounded-lg text-white'>
          <h2 className='text-2xl font-bold mb-4'>Наша цель - чистый воздух в каждый дом!</h2>
          <p className='text-lg mb-4'>Мы за экологичность, осознанные решения и комфорт.</p>
        </div>

        {/* О клиентах */}
        <div className='mb-12'>
          <h2 className='text-2xl font-bold mb-6 text-[var(--secondary-color)]'>
            Почему выбирают нас
          </h2>
          <p className='text-lg text-gray-700 leading-relaxed mb-6'>
            Наши клиенты выбирают нас, потому что заботятся о своем здоровье и своей семьи.
            Установка бризера отличное решение для людей с респираторными заболеваниями, онкологией,
            а так же семей с детьми, которым очень необходим ежедневный чистый воздух без
            аллергенов.
          </p>
        </div>

        {/* Преимущества бризеров */}
        <div className='mb-12'>
          <h2 className='text-2xl font-bold mb-6 text-[var(--secondary-color)]'>
            Преимущества приточной вентиляции
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='bg-gray-50 p-6 rounded-lg'>
              <h3 className='text-xl font-semibold mb-3 text-[var(--secondary-color)]'>
                Для многоквартирных домов
              </h3>
              <p className='text-gray-700 leading-relaxed'>
                Принудительный приток свежего воздуха помогает избежать многих проблем в
                многоквартирных домах и офисных помещениях. Вы забудете, что такое запах сигарет от
                соседей, духота на рабочем месте и другие неприятные мелочи.
              </p>
            </div>
            <div className='bg-gray-50 p-6 rounded-lg'>
              <h3 className='text-xl font-semibold mb-3 text-[var(--secondary-color)]'>
                Для загородных домов и новостроек
              </h3>
              <p className='text-gray-700 leading-relaxed'>
                А для жителей загородной жизни и тех, кто приобрел жилье в новостройках приятным
                бонусом к приточной очистки воздуха станет шумоподавление бризера. Никакие
                посторонние звуки не будут мешать вашему времяпрепровождению дома.
              </p>
            </div>
          </div>
        </div>

        {/* О качестве услуг */}
        <div className='mb-12'>
          <h2 className='text-2xl font-bold mb-6 text-[var(--secondary-color)]'>
            Наш подход к работе
          </h2>
          <p className='text-lg text-gray-700 leading-relaxed mb-6'>
            Мы гордимся тем, что беремся за сложные монтажи и всегда готовы предложить клиентам
            нестандартные решения и индивидуальный подход. Своевременно отреагировать на ваш запрос
            и оказать качественную услугу в намеченный срок.
          </p>
        </div>

        {/* Гарантии и поддержка */}
        <div className='bg-white border-2 border-[var(--secondary-color)] p-8 rounded-lg'>
          <h2 className='text-2xl font-bold mb-4 text-[var(--secondary-color)]'>
            Гарантии и поддержка
          </h2>
          <p className='text-lg text-gray-700 leading-relaxed'>
            PROPRITOK ценит каждого своего клиента и члена команды, мы за долгосрочное
            сотрудничество. Каждый клиент получает гарантию на монтаж в течении 5 лет и бережную
            поддержку от компании при возникновении спорных вопросов.
          </p>
        </div>
      </div>

      {/* FAQ секция */}
      <div className='mt-16'>
        <FAQSection title='Частые вопросы о нас' maxQuestions={4} className='py-12 bg-gray-50' />
      </div>
    </div>
    </>
  );
};

export default AboutPage;
