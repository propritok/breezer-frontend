import { ProductShort } from '@/entities/Product';
import { ContactCTAButton, Reviews } from '@/features';
import { PocketBaseReview, reviewsApi } from '@/shared';
import { productsApi } from '@/shared/api/products';
import { CustomerWorksSlider, FAQSection } from '@/widgets';
import { Button, Link } from '@heroui/react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

// Динамический импорт ProductCard для избежания проблем с гидратацией
const ProductCard = dynamic(() => import('@/widgets/ProductCard'), {
  ssr: false,
  loading: () => (
    <div className='h-64 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center'>
      <span className='text-gray-500'>Загрузка...</span>
    </div>
  ),
});

interface HomeProps {
  popularProducts: ProductShort[];
  reviews: PocketBaseReview[];
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const [popularProducts, reviews] = await Promise.all([
      productsApi.getPopular(),
      reviewsApi.getAll(),
    ]);

    return {
      props: {
        popularProducts,
        reviews,
      },
    };
  } catch (error) {
    console.error('Error fetching popular products:', error);
    return {
      props: {
        popularProducts: [],
        reviews: [],
      },
    };
  }
};

export default function Home({ popularProducts, reviews }: HomeProps) {
  return (
    <>
      <Head>
        <title>Propritok - Бризеры для вашего дома</title>
        <meta
          name='description'
          content='Купить и установить бризер для дома. Качественная вентиляция с гарантией.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='min-h-screen flex flex-col'>
        <main className='flex-grow'>
          <section className='bg-gradient-to-r from-[var(--secondary-color)] to-[#B8F0EE] py-20'>
            <div className='max-w-7xl mx-auto px-4'>
              <div className='text-center'>
                <h1 className='text-5xl font-bold text-white mb-6'>Чистый воздух в каждый дом</h1>
                <p className='text-xl text-white mb-8 max-w-2xl mx-auto'>
                  Бризеры для здорового микроклимата. Установка под ключ с гарантией качества.
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <Link href='/catalog' className='w-full sm:w-auto'>
                    <Button
                      size='lg'
                      className='bg-white text-[var(--secondary-color)] font-semibold  w-full sm:w-auto'>
                      Перейти в каталог
                    </Button>
                  </Link>

                  <ContactCTAButton
                    label='Получить консультацию'
                    size='lg'
                    variant='bordered'
                    className='border-white text-white'
                  />
                </div>
              </div>
            </div>
          </section>

          {/* <div className='max-w-7xl mx-auto px-4 py-8'>
            <div className='text-center mb-12'>
              <h1 className='text-4xl font-bold mb-4 font-Montserrat'>PROPRITOK</h1>
              <p className='text-lg mb-6 text-gray-600'>Бризеры для вашего дома</p>
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
          </div> */}

          {/* Гарантия */}
          <div className='max-w-7xl mx-auto px-4 py-12'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
              <div>
                <h2 className='text-3xl font-bold mb-6'>Гарантия</h2>
                <h3 className='text-xl font-semibold mb-4 text-[var(--secondary-color)]'>
                  Дышите спокойно: 5 лет гарантии на монтаж вашего бризера!
                </h3>
                <p className='text-gray-700 leading-relaxed'>
                  Мы понимаем, насколько важно, чтобы система вентиляции работала безупречно. Наша
                  команда квалифицированных специалистов выполняет монтаж бризеров в строгом
                  соответствии с техническими нормами и рекомендациями производителей. Мы настолько
                  уверены в качестве нашей работы, что предоставляем расширенную гарантию 5 лет на
                  монтаж.
                </p>
              </div>
              <div className='bg-gradient-to-br from-[var(--secondary-color)] to-[#B8F0EE] p-8 rounded-lg'>
                <div className='text-center text-white'>
                  <div className='text-6xl font-bold mb-4'>5</div>
                  <div className='text-xl font-semibold mb-2'>лет гарантии</div>
                  <div className='text-sm opacity-90'>на монтаж бризера</div>
                </div>
              </div>
            </div>
          </div>

          {/* Монтаж и стоимость */}
          <div className='max-w-7xl mx-auto px-4 py-12 bg-gray-50'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold mb-4'>Монтаж и стоимость</h2>
              <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
                Доверьте монтаж бризера профессионалам, которые используют только лучшее
                оборудование!
              </p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12'>
              <div>
                <h3 className='text-xl font-semibold mb-4'>Профессиональное оборудование HILTI</h3>
                <p className='text-gray-700 leading-relaxed mb-4'>
                  Наша команда имеет многолетний опыт работы с системами вентиляции и использует
                  профессиональный инструмент HILTI с пылеудалением, известный своей надежностью и
                  производительностью. Это позволяет нам выполнять монтаж бризеров максимально
                  аккуратно и чисто.
                </p>
                <p className='text-gray-700 leading-relaxed mb-4'>
                  Мы минимизируем количество пыли и строительного мусора во время работы, заботясь о
                  вашем комфорте и чистоте вашего дома.
                </p>
                <p className='text-gray-700 leading-relaxed'>
                  Благодаря современным технологиям HILTI, мы также снижаем уровень шума при
                  сверлении, делая процесс монтажа максимально комфортным для вас и ваших соседей.
                </p>
              </div>
              <div className='bg-white p-6 rounded-lg shadow-lg'>
                <h3 className='text-xl font-semibold mb-4 text-[var(--secondary-color)]'>
                  Основные позиции
                </h3>
                <div className='space-y-4'>
                  <div className='flex flex-col items-start sm:flex-row sm:justify-between sm:items-center gap-1 p-3 bg-gray-50 rounded'>
                    <span className='font-medium'>Монтаж Стандарт</span>
                    <span className='font-bold text-lg whitespace-nowrap'>9 500 ₽</span>
                  </div>
                  <div className='flex flex-col items-start sm:flex-row sm:justify-between sm:items-center gap-1 p-3 bg-gray-50 rounded'>
                    <span className='font-medium'>Монтаж с улучшенным утеплением канала</span>
                    <span className='font-bold text-lg whitespace-nowrap'>11 000 ₽</span>
                  </div>
                  <div className='flex flex-col items-start sm:flex-row sm:justify-between sm:items-center gap-1 p-3 bg-gray-50 rounded'>
                    <span className='font-medium'>Монтаж с выводом в откос</span>
                    <span className='font-bold text-lg whitespace-nowrap'>14 000 ₽</span>
                  </div>
                  <div className='flex flex-col items-start sm:flex-row sm:justify-between sm:items-center gap-1 p-3 bg-gray-50 rounded'>
                    <span className='font-medium'>Монтаж бризера на готовое отверстие</span>
                    <span className='font-bold text-lg whitespace-nowrap'>6 000 ₽</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Акция */}
            <div className='bg-gradient-to-r from-[var(--secondary-color)] to-[#B8F0EE] p-8 rounded-lg text-center'>
              <h3 className='text-2xl font-bold text-white mb-4'>Специальное предложение!</h3>
              <p className='text-xl text-white mb-6'>
                При покупке бризера - <span className='font-bold'>30% скидка на монтаж</span>
              </p>

              <ContactCTAButton
                label='Получить скидку'
                size='lg'
                className='bg-white text-[var(--secondary-color)] font-semibold'
              />
            </div>
          </div>

          {/* Слайдер работ заказчика */}
          <CustomerWorksSlider />

          {/* Популярные товары */}
          <div className='max-w-7xl mx-auto px-4 py-12'>
            <div className='flex items-center justify-center mb-8'>
              <h2 className='text-3xl font-bold'>Популярные товары</h2>
            </div>
            {popularProducts.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {popularProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className='text-center py-12'>
                <p className='text-gray-500 text-lg'>Товары временно недоступны</p>
              </div>
            )}
          </div>

          {/* FAQ секция */}
          <FAQSection title='Ответы на вопросы' maxQuestions={8} className='py-12 bg-gray-50' />

          <section id='reviews'>
            <Reviews reviews={reviews} />
          </section>
        </main>
      </div>
    </>
  );
}
