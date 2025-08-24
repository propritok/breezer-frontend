import { mockProductsShort } from '@/api/products';
import { ProductCard } from '@/widgets';
import { Button, Card, CardBody, Input } from "@heroui/react";
import Head from 'next/head';
import { useEffect, useState } from 'react';

const mockProducts = [
  {
    id: 'xiaomi-mijia-airfresh-1c',
    name: 'Xiaomi Mijia AirFresh 1C',
    description: 'Компактный бризер с HEPA-фильтрацией и Wi-Fi управлением',
    price: 'от 22 900 ₽',
    image: 'https://dummyimage.com/600x400/d6d6d6/ffffff',
  },
  {
    id: 'xiaomi-mijia-airfresh-2',
    name: 'Xiaomi Mijia AirFresh 2',
    description: 'Бризер с автоматическим контролем качества воздуха',
    price: 'от 27 900 ₽',
    image: 'https://dummyimage.com/600x400/d6d6d6/ffffff',
  },
  {
    id: 'tion-o2-standard',
    name: 'Tion O2 Standard',
    description: 'Популярный бризер с трёхступенчатой системой фильтрации',
    price: 'от 31 990 ₽',
    image: 'https://dummyimage.com/600x400/d6d6d6/ffffff',
  },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>Propritok - Профессиональные бризеры для вашего дома</title>
        <meta
          name='description'
          content='Купить и установить бризер для дома. Качественная вентиляция с гарантией.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='min-h-screen flex flex-col'>
        <main className='flex-grow'>
          <section className='bg-gradient-to-r from-[#A0E7E5] to-[#B8F0EE] py-20'>
            <div className='max-w-7xl mx-auto px-4'>
              <div className='text-center'>
                <h1 className='text-5xl font-bold text-white mb-6'>Свежий воздух в каждом доме</h1>
                <p className='text-xl text-white mb-8 max-w-2xl mx-auto'>
                  Профессиональные бризеры для здорового микроклимата. Установка под ключ с
                  гарантией качества.
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <Button size='lg' className='bg-white text-[#A0E7E5] font-semibold'>
                    Перейти в каталог
                  </Button>
                  <Button size='lg' variant='bordered' className='border-white text-white'>
                    Получить консультацию
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <div className='max-w-7xl mx-auto px-4 py-8'>
            <div className='text-center mb-12'>
              <h1 className='text-4xl font-bold mb-4'>Propritok</h1>
              <p className='text-lg mb-6 text-gray-600'>Профессиональные бризеры для вашего дома</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
              <Card>
                <CardBody>
                  <h3 className='text-xl font-semibold mb-2'>Качество</h3>
                  <p>Только проверенные производители и материалы</p>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <h3 className='text-xl font-semibold mb-2'>Установка</h3>
                  <p>Профессиональная установка под ключ</p>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <h3 className='text-xl font-semibold mb-2'>Сервис</h3>
                  <p>Гарантия и техническое обслуживание</p>
                </CardBody>
              </Card>
            </div>
          </div>

          {/* Популярные товары */}
          <div className='max-w-7xl mx-auto px-4 py-12'>
            <div className='flex items-center justify-center mb-8'>
              <h2 className='text-3xl font-bold'>Популярные товары</h2>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {mockProductsShort.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Отзывы */}
          <div className='max-w-7xl mx-auto px-4 py-12'>
            <div className='space-y-6'>
              <div className='flex items-center justify-between'>
                <h3 className='text-2xl font-semibold'>Отзывы клиентов</h3>
                <Button color='primary' className='bg-[#A0E7E5] text-white'>
                  Оставить отзыв
                </Button>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                <Card>
                  <CardBody>
                    <div className='flex items-center justify-between mb-2'>
                      <h4 className='font-semibold'>Анна Петрова</h4>
                      <span className='text-yellow-400 text-sm'>★★★★★</span>
                    </div>
                    <p className='text-sm text-gray-600 mb-2'>Бризер Tion O2</p>
                    <p className='text-gray-700 mb-3'>
                      Отличный бризер! Установили в спальне, теперь спим как младенцы.
                    </p>
                    <p className='text-xs text-gray-500'>2024-01-15</p>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <div className='flex items-center justify-between mb-2'>
                      <h4 className='font-semibold'>Михаил Иванов</h4>
                      <span className='text-yellow-400 text-sm'>★★★★★</span>
                    </div>
                    <p className='text-sm text-gray-600 mb-2'>Бризер Ballu Air Master</p>
                    <p className='text-gray-700 mb-3'>
                      Профессиональная установка, все сделали быстро и качественно.
                    </p>
                    <p className='text-xs text-gray-500'>2024-01-10</p>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <div className='flex items-center justify-between mb-2'>
                      <h4 className='font-semibold'>Елена Сидорова</h4>
                      <span className='text-yellow-400 text-sm'>★★★★☆</span>
                    </div>
                    <p className='text-sm text-gray-600 mb-2'>Бризер Vakio Base</p>
                    <p className='text-gray-700 mb-3'>
                      Хороший бризер, но немного шумный. В целом довольна покупкой.
                    </p>
                    <p className='text-xs text-gray-500'>2024-01-05</p>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>

          {/* Подписка на рассылку */}
          <div className='max-w-7xl mx-auto px-4 py-12'>
            <Card className='bg-gradient-to-r from-[#A0E7E5] to-[#B8F0EE]'>
              <CardBody>
                <div className='text-center'>
                  <h3 className='text-2xl font-semibold text-white mb-2'>
                    Подпишитесь на рассылку
                  </h3>
                  <p className='text-white mb-6'>
                    Получайте первыми информацию о новых моделях, акциях и полезных статьях
                  </p>

                  {mounted ? (
                    <form className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
                      <Input
                        type='email'
                        placeholder='Введите ваш email'
                        variant='bordered'
                        className='flex-grow'
                      />
                      <Button className='bg-white text-[#A0E7E5] font-semibold'>Подписаться</Button>
                    </form>
                  ) : (
                    <div className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
                      <Input
                        type='email'
                        placeholder='Введите ваш email'
                        variant='bordered'
                        className='flex-grow'
                        disabled
                      />
                      <Button className='bg-white text-[#A0E7E5] font-semibold' disabled>
                        Подписаться
                      </Button>
                    </div>
                  )}

                  <p className='text-xs text-white mt-4 opacity-80'>
                    Мы не будем спамить. Отписаться можно в любой момент.
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
