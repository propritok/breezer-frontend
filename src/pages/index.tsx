import { ProductShort } from '@/entities/Product';
import { productsApi } from '@/shared/api/products';
import { CustomerWorksSlider } from '@/widgets';
import { Button, Card, CardBody, Input } from '@heroui/react';
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
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const allProducts = await productsApi.getAllShort();
    const popularProducts = allProducts.slice(0, 3); // Берем первые 3 продукта как популярные

    return {
      props: {
        popularProducts,
      },
    };
  } catch (error) {
    console.error('Error fetching popular products:', error);
    return {
      props: {
        popularProducts: [],
      },
    };
  }
};

export default function Home({ popularProducts }: HomeProps) {
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
          <section className='bg-gradient-to-r from-[var(--secondary-color)] to-[#B8F0EE] py-20'>
            <div className='max-w-7xl mx-auto px-4'>
              <div className='text-center'>
                <h1 className='text-5xl font-bold text-white mb-6'>Свежий воздух в каждом доме</h1>
                <p className='text-xl text-white mb-8 max-w-2xl mx-auto'>
                  Профессиональные бризеры для здорового микроклимата. Установка под ключ с
                  гарантией качества.
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <Button
                    size='lg'
                    className='bg-white text-[var(--secondary-color)] font-semibold'>
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
                  монтаж. Это значит, что в течение 5 лет вы можете быть спокойны за надежную работу
                  вашего бризера, а мы возьмем на себя ответственность за любые возможные проблемы,
                  связанные с установкой.
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
                  <div className='flex justify-between items-center p-3 bg-gray-50 rounded'>
                    <span className='font-medium'>Монтаж Стандарт</span>
                    <span className='font-bold text-lg'>9 500 ₽</span>
                  </div>
                  <div className='flex justify-between items-center p-3 bg-gray-50 rounded'>
                    <span className='font-medium'>Монтаж с улучшенным утеплением канала</span>
                    <span className='font-bold text-lg'>11 000 ₽</span>
                  </div>
                  <div className='flex justify-between items-center p-3 bg-gray-50 rounded'>
                    <span className='font-medium'>Монтаж с выводом в откос</span>
                    <span className='font-bold text-lg'>14 000 ₽</span>
                  </div>
                  <div className='flex justify-between items-center p-3 bg-gray-50 rounded'>
                    <span className='font-medium'>Монтаж бризера на готовое отверстие</span>
                    <span className='font-bold text-lg'>6 000 ₽</span>
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
              <Button size='lg' className='bg-white text-[var(--secondary-color)] font-semibold'>
                Получить скидку
              </Button>
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

          {/* Ответы на вопросы */}
          <div className='max-w-7xl mx-auto px-4 py-12 bg-gray-50'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold mb-4'>Ответы на вопросы</h2>
              <p className='text-lg text-gray-600'>
                Самые частые вопросы о бризерах и их установке
              </p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
              <div className='space-y-6'>
                <Card className='shadow-sm'>
                  <CardBody>
                    <h3 className='text-lg font-semibold mb-3 text-[var(--secondary-color)]'>
                      Что такое бризер и зачем он нужен?
                    </h3>
                    <p className='text-gray-700'>
                      Бризер — это компактная система приточной вентиляции, которая подает свежий
                      воздух в помещение, очищая его от пыли, аллергенов и вредных веществ. Он
                      особенно важен в современных герметичных домах, где естественная вентиляция
                      недостаточна.
                    </p>
                  </CardBody>
                </Card>

                <Card className='shadow-sm'>
                  <CardBody>
                    <h3 className='text-lg font-semibold mb-3 text-[var(--secondary-color)]'>
                      Какой бризер выбрать для квартиры?
                    </h3>
                    <p className='text-gray-700'>
                      Выбор зависит от площади помещения, количества жильцов и бюджета. Для
                      однокомнатной квартиры подойдет компактная модель, для больших помещений —
                      более мощная. Наши специалисты помогут подобрать оптимальный вариант.
                    </p>
                  </CardBody>
                </Card>

                <Card className='shadow-sm'>
                  <CardBody>
                    <h3 className='text-lg font-semibold mb-3 text-[var(--secondary-color)]'>
                      Сколько времени занимает установка?
                    </h3>
                    <p className='text-gray-700'>
                      Стандартная установка занимает 2-3 часа. Мы используем профессиональное
                      оборудование HILTI с пылеудалением, что позволяет минимизировать загрязнение и
                      шум. После установки бризер сразу готов к работе.
                    </p>
                  </CardBody>
                </Card>

                <Card className='shadow-sm'>
                  <CardBody>
                    <h3 className='text-lg font-semibold mb-3 text-[var(--secondary-color)]'>
                      Нужно ли разрешение на установку?
                    </h3>
                    <p className='text-gray-700'>
                      В большинстве случаев разрешение не требуется, так как мы устанавливаем бризер
                      в существующее вентиляционное отверстие или делаем небольшое отверстие в
                      стене. Но в некоторых случаях (памятники архитектуры, несущие стены) может
                      потребоваться согласование.
                    </p>
                  </CardBody>
                </Card>
              </div>

              <div className='space-y-6'>
                <Card className='shadow-sm'>
                  <CardBody>
                    <h3 className='text-lg font-semibold mb-3 text-[var(--secondary-color)]'>
                      Как часто нужно менять фильтры?
                    </h3>
                    <p className='text-gray-700'>
                      Частота замены зависит от качества воздуха и интенсивности использования.
                      Обычно фильтры меняют раз в 3-6 месяцев. Наши специалисты напомнят о
                      необходимости замены и помогут с обслуживанием.
                    </p>
                  </CardBody>
                </Card>

                <Card className='shadow-sm'>
                  <CardBody>
                    <h3 className='text-lg font-semibold mb-3 text-[var(--secondary-color)]'>
                      Бризер работает от электричества?
                    </h3>
                    <p className='text-gray-700'>
                      Да, бризер потребляет электроэнергию, но очень экономно — примерно как
                      лампочка. Современные модели оснащены энергосберегающими вентиляторами и могут
                      работать в автоматическом режиме.
                    </p>
                  </CardBody>
                </Card>

                <Card className='shadow-sm'>
                  <CardBody>
                    <h3 className='text-lg font-semibold mb-3 text-[var(--secondary-color)]'>
                      Можно ли установить зимой?
                    </h3>
                    <p className='text-gray-700'>
                      Да, установка возможна в любое время года. Бризеры оснащены системой подогрева
                      воздуха, поэтому зимой в помещение будет поступать теплый воздух. Мы работаем
                      круглый год.
                    </p>
                  </CardBody>
                </Card>

                <Card className='shadow-sm'>
                  <CardBody>
                    <h3 className='text-lg font-semibold mb-3 text-[var(--secondary-color)]'>
                      Что входит в гарантию?
                    </h3>
                    <p className='text-gray-700'>
                      Мы предоставляем 5 лет гарантии на монтаж и 2 года на оборудование. Гарантия
                      покрывает все работы по установке, а также возможные проблемы, связанные с
                      качеством монтажа.
                    </p>
                  </CardBody>
                </Card>
              </div>
            </div>

            <div className='text-center mt-12'>
              <p className='text-gray-600 mb-4'>Не нашли ответ на свой вопрос?</p>
              <Button size='lg' className='bg-[var(--secondary-color)] text-white font-semibold'>
                Задать вопрос специалисту
              </Button>
            </div>
          </div>

          {/* Отзывы */}
          <div className='max-w-7xl mx-auto px-4 py-12'>
            <div className='space-y-6'>
              <div className='flex items-center justify-between'>
                <h3 className='text-2xl font-semibold'>Отзывы клиентов</h3>
                <Button color='primary' className='bg-[var(--secondary-color)] text-white'>
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
            <Card className='bg-gradient-to-r from-[var(--secondary-color)] to-[#B8F0EE]'>
              <CardBody>
                <div className='text-center'>
                  <h3 className='text-2xl font-semibold text-white mb-2'>
                    Подпишитесь на рассылку
                  </h3>
                  <p className='text-white mb-6'>
                    Получайте первыми информацию о новых моделях, акциях и полезных статьях
                  </p>

                  <form className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
                    <Input
                      type='email'
                      placeholder='Введите ваш email'
                      variant='bordered'
                      className='flex-grow'
                    />
                    <Button className='bg-white text-[var(--secondary-color)] font-semibold'>
                      Подписаться
                    </Button>
                  </form>

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
