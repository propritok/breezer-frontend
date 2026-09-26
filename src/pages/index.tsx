import { ProductShort } from '@/entities/Product';
import { Reviews } from '@/features';
import { PocketBaseReview, reviewsApi } from '@/shared';
import { productsApi } from '@/shared/api/products';
import { Reveal } from '@/shared/lib/useReveal';
import { CustomerWorksSlider, FAQSection, ProductCard } from '@/widgets';
import GuaranteeSection from '@/widgets/home/GuaranteeSection';
import HomeHero from '@/widgets/home/HomeHero';
import InstallPriceSection from '@/widgets/home/InstallPriceSection';
import LeadSection from '@/widgets/home/LeadSection';
import PromoSection from '@/widgets/home/PromoSection';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { LuArrowRight } from 'react-icons/lu';

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

const brands = ['TION', 'Ballu', 'Royal Clima', 'ZILON'];

export default function Home({ popularProducts, reviews }: HomeProps) {
  return (
    <>
      <Head>
        <title>Propritok - Бризеры для вашего дома</title>
        <meta
          name='description'
          content='Купить и установить бризер для дома. Качественная вентиляция с гарантией.'
        />
        <meta name='yandex-verification' content='5ed367577c1e6891' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <HomeHero />

        {/* Бренды */}
        <div className='border-y border-line/80 bg-white/40'>
          <div className='mx-auto max-w-page px-5 md:px-8 h-20 flex items-center gap-8 md:gap-16 overflow-x-auto no-scrollbar text-ink-3'>
            <span className='text-xs font-bold uppercase tracking-[0.14em] shrink-0'>Устанавливаем</span>
            {brands.map((b) => (
              <span key={b} className='text-2xl font-extrabold tracking-[-0.02em] shrink-0'>
                {b}
              </span>
            ))}
          </div>
        </div>

        <GuaranteeSection />
        <InstallPriceSection />
        <PromoSection />
        <CustomerWorksSlider />

        {/* Популярные товары */}
        <section className='py-16 md:py-24'>
          <div className='mx-auto max-w-page px-5 md:px-8'>
            <Reveal className='flex items-end justify-between gap-6 mb-8 md:mb-12'>
              <div>
                <span className='eyebrow'>Популярные товары</span>
                <h2 className='mt-4 section-title'>Выбор наших клиентов</h2>
              </div>
              <Link href='/catalog' className='hidden md:inline-flex btn btn-ghost'>
                Весь каталог <LuArrowRight className='arrow w-5 h-5' />
              </Link>
            </Reveal>
            {popularProducts.length > 0 ? (
              <Reveal
                delay={1}
                className='grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5'>
                {popularProducts.slice(0, 8).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </Reveal>
            ) : (
              <p className='text-center py-12 text-ink-3 text-lg'>Товары временно недоступны</p>
            )}
            <Link href='/catalog' className='md:hidden mt-6 btn btn-secondary w-full'>
              Смотреть весь каталог
            </Link>
          </div>
        </section>

        <FAQSection title='Частые вопросы' maxQuestions={8} />

        <div id='reviews' className='scroll-mt-24'>
          <Reviews reviews={reviews} />
        </div>

        <LeadSection />
      </main>
    </>
  );
}
