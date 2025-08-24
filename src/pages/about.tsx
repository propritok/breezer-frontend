import { Card, CardBody } from "@heroui/react";
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>О компании Propritok</h1>

      <div className='mb-8'>
        <p className='text-lg text-gray-600 mb-4'>
          Мы специализируемся на продаже и установке систем вентиляции для частных домов и квартир.
          Наша миссия — обеспечить здоровый микроклимат в каждом доме.
        </p>
        <p className='text-lg text-gray-600'>
          Более 5 лет опыта в сфере вентиляции и тысячи довольных клиентов по всей России.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
        <Card>
          <CardBody>
            <h3 className='text-xl font-semibold mb-4'>Наши преимущества</h3>
            <ul className='space-y-2 text-gray-600'>
              <li>✓ Официальный дилер ведущих производителей</li>
              <li>✓ Профессиональная установка</li>
              <li>✓ Гарантия на оборудование и работы</li>
              <li>✓ Техническая поддержка 24/7</li>
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className='text-xl font-semibold mb-4'>Сертификаты</h3>
            <p className='text-gray-600'>
              Все наши специалисты имеют соответствующие сертификаты и регулярно проходят обучение у
              производителей оборудования.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
