import { Button, Card, CardBody, Input, Textarea } from "@heroui/react";
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>Контакты</h1>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div>
          <h2 className='text-2xl font-semibold mb-6'>Свяжитесь с нами</h2>

          <div className='space-y-4 mb-8'>
            <div>
              <h3 className='font-semibold mb-2'>Телефон:</h3>
              <p className='text-gray-600'>+7 (999) 123-45-67</p>
            </div>

            <div>
              <h3 className='font-semibold mb-2'>Email:</h3>
              <p className='text-gray-600'>info@propritok.ru</p>
            </div>

            <div>
              <h3 className='font-semibold mb-2'>Адрес:</h3>
              <p className='text-gray-600'>г. Москва, ул. Примерная, д. 123</p>
            </div>

            <div>
              <h3 className='font-semibold mb-2'>Режим работы:</h3>
              <p className='text-gray-600'>
                Пн-Пт: 9:00 - 18:00
                <br />
                Сб-Вс: 10:00 - 16:00
              </p>
            </div>
          </div>
        </div>

        <Card>
          <CardBody>
            <h3 className='text-xl font-semibold mb-4'>Оставить заявку</h3>
            <form className='space-y-4'>
              <Input label='Имя' placeholder='Введите ваше имя' variant='bordered' />
              <Input label='Телефон' placeholder='+7 (999) 123-45-67' variant='bordered' />
              <Input label='Email' placeholder='example@mail.com' variant='bordered' />
              <Textarea
                label='Сообщение'
                placeholder='Опишите ваши потребности'
                variant='bordered'
                minRows={3}
              />
              <Button color='primary' className='w-full bg-[#A0E7E5] text-white'>
                Отправить заявку
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;
