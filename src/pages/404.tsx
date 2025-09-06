import { Button } from '@heroui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Custom404: NextPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Страница не найдена - Propritok</title>
        <meta
          name='description'
          content='Запрашиваемая страница не найдена. Вернитесь на главную страницу Propritok.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
        <div className='max-w-2xl mx-auto text-center'>
          <div className='bg-white rounded-lg shadow-sm p-8 md:p-12'>
            {/* 404 Number */}
            <div className='mb-8'>
              <h1 className='text-8xl md:text-9xl font-bold text-[var(--secondary-color)] mb-4'>
                404
              </h1>
              <div className='w-24 h-1 bg-[var(--secondary-color)] mx-auto rounded-full'></div>
            </div>

            {/* Error Message */}
            <div className='mb-8'>
              <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4'>
                Страница не найдена
              </h2>
              <p className='text-lg text-gray-600 mb-6'>
                К сожалению, запрашиваемая страница не существует или была перемещена.
              </p>
              <p className='text-gray-500'>
                Проверьте правильность URL или воспользуйтесь навигацией ниже.
              </p>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center mb-8'>
              <Button
                onClick={handleGoHome}
                size='lg'
                className='bg-[var(--secondary-color)] text-white font-semibold px-8'>
                На главную
              </Button>
              <Button
                onClick={handleGoBack}
                size='lg'
                variant='bordered'
                className='border-[var(--secondary-color)] text-[var(--secondary-color)] font-semibold px-8'>
                Назад
              </Button>
            </div>

            {/* Quick Links */}
            <div className='border-t border-gray-200 pt-8'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>Популярные разделы</h3>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <Link
                  href='/catalog'
                  className='block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
                  <div className='text-[var(--secondary-color)] font-medium mb-1'>
                    Каталог товаров
                  </div>
                  <div className='text-sm text-gray-600'>Посмотрите наши бризеры</div>
                </Link>
                <Link
                  href='/contact'
                  className='block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
                  <div className='text-[var(--secondary-color)] font-medium mb-1'>Контакты</div>
                  <div className='text-sm text-gray-600'>Свяжитесь с нами</div>
                </Link>
                <Link
                  href='/about'
                  className='block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
                  <div className='text-[var(--secondary-color)] font-medium mb-1'>О компании</div>
                  <div className='text-sm text-gray-600'>Узнайте больше о нас</div>
                </Link>
                <Link
                  href='/workprocess'
                  className='block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
                  <div className='text-[var(--secondary-color)] font-medium mb-1'>
                    Процесс работы
                  </div>
                  <div className='text-sm text-gray-600'>Как мы работаем</div>
                </Link>
              </div>
            </div>

            {/* Help Section */}
          
          </div>
        </div>
      </div>
    </>
  );
};

export default Custom404;
