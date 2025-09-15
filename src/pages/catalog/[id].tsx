import { Product } from '@/entities';
import { ContactCTAButton } from '@/features';
import { productsApi } from '@/shared/api/products';
import {
  ProductDescription,
  ProductGallery,
  ProductHeader,
  ProductInfoBadges,
  ProductPurchaseSection,
  ProductStatusChips,
  SiteBreadcrumbs,
} from '@/widgets';
import { getSpecsRows, SpecsTable } from '@/widgets/SpecsTable';
import { Card, CardBody } from '@heroui/react';
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
  const pageTitle = `${product?.modelNameEn || ''} — купить в Propritok`;

  const actionBuy = `хочет купить id-[${product?.id}]-${
    product?.modelNameEn || product?.modelNameRu
  }`;

  const actionConsult = `хочет консультацию по id-[${product?.id}]-${
    product?.modelNameEn || product?.modelNameRu
  }`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name='description' content={product?.description?.substring(0, 160) || ''} />
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={product?.description?.substring(0, 160) || ''} />
        {product?.images?.[0] && <meta property='og:image' content={product.images[0]} />}
      </Head>
      <SiteBreadcrumbs pageTitle={product?.modelNameEn} />
      <div className='min-h-screen flex flex-col'>
        <main className='flex-grow'>
          <div className='max-w-7xl mx-auto px-4 py-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
              {/* Левая колонка - галерея */}
              <div>
                <ProductGallery images={product?.images || []} />
              </div>

              {/* Правая колонка - информация о продукте */}
              <div className='space-y-6'>
                <ProductHeader product={product} />
                <ProductInfoBadges />
                <ProductStatusChips product={product} />
                <ProductPurchaseSection product={product}>
                  <ContactCTAButton
                    action={actionBuy}
                    className='w-[240px] bg-[var(--secondary-color)] text-white px-6 py-3'
                    size='lg'
                    label='Получить консультацию'
                    formButtonLabel='Получить консультацию'
                    showMessageField
                  />
                  {/* <ContactCTAButton
                    size='lg'
                    action={actionConsult}
                    label='Получить консультацию'
                    formButtonLabel='Получить консультацию'
                    showMessageField
                    ctaVariant='secondary'
                  /> */}
                </ProductPurchaseSection>

                {/* <PromoConsultationCard /> */}
              </div>
            </div>

            {/* Описание продукта */}
            <div className='mt-12'>
              <ProductDescription product={product} />
            </div>

            {/* Характеристики */}
            {product?.specs && (
              <div className='mt-12'>
                <Card>
                  <CardBody>
                    <h2 className='text-2xl font-bold mb-6'>Характеристики</h2>
                    <SpecsTable rows={getSpecsRows(product)} />
                  </CardBody>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
