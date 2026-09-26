import { Product } from '@/entities';
import { productsApi } from '@/shared/api/products';
import { Reveal } from '@/shared/lib/useReveal';
import {
  ProductDescription,
  ProductGallery,
  PromoConsultationCard,
  SiteBreadcrumbs,
} from '@/widgets';
import ProductBuyBox from '@/widgets/ProductBuyBox';
import { getSpecsRows, SpecsTable } from '@/widgets/SpecsTable';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

interface CatalogItemPageProps {
  product: Product;
}

export const getServerSideProps: GetServerSideProps<CatalogItemPageProps> = async ({
  params,
  res,
}) => {
  try {
    const id = params?.id as string;
    if (!id) {
      return {
        notFound: true,
      };
    }

    const product = await productsApi.getById(id);

    // Устанавливаем кеширование на 5 минут для снижения нагрузки на API
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60');

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      notFound: true,
    };
  }
};

export default function CatalogItemPage({ product }: CatalogItemPageProps) {
  const siteUrl = process.env.SITE_URL || 'https://propritok.ru';
  const productName = product?.modelNameEn || product?.modelNameRu || 'Бризер';
  const pageTitle = `${productName} — купить в Propritok`;
  const description =
    product?.description?.substring(0, 160) ||
    `Купить ${productName} в Propritok. Качественная вентиляция для дома.`;
  const canonicalUrl = `${siteUrl}/catalog/${product?.id}`;
  const specRows = getSpecsRows(product);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name='description' content={description} />
        <link rel='canonical' href={canonicalUrl} />

        {/* Open Graph */}
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={description} />
        <meta property='og:type' content='product' />
        <meta property='og:url' content={canonicalUrl} />
        <meta property='og:site_name' content='Propritok' />
        {product?.images?.[0] && <meta property='og:image' content={product.images[0]} />}

        {/* Robots */}
        <meta name='robots' content='index, follow' />
        <meta name='googlebot' content='index, follow' />
      </Head>
      <SiteBreadcrumbs pageTitle={product?.modelNameEn} />

      <main className='mx-auto max-w-page px-5 md:px-8 pt-6 pb-16'>
        <section className='grid lg:grid-cols-12 gap-6 lg:gap-10 items-start'>
          <div className='lg:col-span-7 min-w-0'>
            <ProductGallery images={product?.images || []} title={productName} />
          </div>
          <div className='lg:col-span-5 min-w-0'>
            <ProductBuyBox product={product} />
          </div>
        </section>

        {(product?.description || specRows.length > 0) && (
          <section className='mt-16 md:mt-24 grid lg:grid-cols-12 gap-8 lg:gap-10 items-start'>
            <div className='lg:col-span-8 min-w-0 space-y-16 md:space-y-20'>
              {product?.description && (
                <Reveal>
                  <ProductDescription product={product} />
                </Reveal>
              )}
              {specRows.length > 0 && (
                <Reveal>
                  <h2 className='text-[30px] md:text-[40px] font-bold tracking-[-0.03em] mb-6'>Характеристики</h2>
                  <SpecsTable rows={specRows} />
                </Reveal>
              )}
            </div>
            <Reveal delay={1} className='lg:col-span-4 lg:sticky lg:top-28'>
              <PromoConsultationCard
                title={`Сомневаетесь, подойдёт ли ${productName}?`}
                action={`хочет консультацию по id-[${product?.id}]-${productName}`}
              />
            </Reveal>
          </section>
        )}
      </main>
    </>
  );
}
