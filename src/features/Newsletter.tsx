import { Button, Card, CardBody, Input } from "@heroui/react";
import React, { useState, useEffect } from 'react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика подписки на рассылку
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <Card className='bg-gradient-to-r from-[#A0E7E5] to-[#B8F0EE]'>
      <CardBody>
        <div className='text-center'>
          <h3 className='text-2xl font-semibold text-white mb-2'>Подпишитесь на рассылку</h3>
          <p className='text-white mb-6'>
            Получайте первыми информацию о новых моделях, акциях и полезных статьях
          </p>

          <form
            onSubmit={handleSubmit}
            className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
            <Input
              type='email'
              placeholder='Введите ваш email'
              variant='bordered'
              value={mounted ? email : ''}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='flex-grow'
            />
            <Button type='submit' className='bg-white text-[#A0E7E5] font-semibold'>
              Подписаться
            </Button>
          </form>

          <p className='text-xs text-white mt-4 opacity-80'>
            Мы не будем спамить. Отписаться можно в любой момент.
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default Newsletter;
