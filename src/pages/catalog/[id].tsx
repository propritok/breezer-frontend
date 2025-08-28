import { Product } from '@/entities';
import { ContactCTAButton } from '@/features';
import {
  ProductDescription,
  ProductGallery,
  ProductHeader,
  ProductInfoBadges,
  ProductPurchaseSection,
  ProductStatusChips,
  PromoConsultationCard,
} from '@/widgets';
import { getSpecsRows, SpecsTable } from '@/widgets/SpecsTable';
import { Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { mockProducts } from '../../api/products';

export default function CatalogItemPage() {
  const router = useRouter();
  const { id } = router.query;

  const product: Product | undefined = useMemo(() => {
    if (!id) return undefined;
    return mockProducts.find((p) => p.id === id);
  }, [id]);

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
        <meta
          name='description'
          content={`Купить ${product?.modelNameEn}. Описание, характеристики и заказ.`}
        />
      </Head>

      <div className='min-h-screen flex flex-col'>
        <main className='flex-grow'>
          <div className='max-w-7xl mx-auto px-4 py-8'>
            {/* Основной блок с товаром */}
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10'>
              {/* Галерея слева */}
              <div className='lg:col-span-6'>
                <ProductGallery images={product?.images} title={product?.modelNameEn} />
              </div>

              {/* Информация справа */}
              <div className='lg:col-span-6 flex flex-col gap-4'>
                <ProductHeader title={product?.modelNameEn} rating={product?.rating || 0} />

                <ProductStatusChips inStock={product?.inStock} />

                <ProductPurchaseSection price={product?.price}>
                  <ContactCTAButton
                    action={actionBuy}
                    label='Купить'
                    size='lg'
                    ctaVariant='accent'
                  />
                  <ContactCTAButton
                    size='lg'
                    action={actionConsult}
                    label='Получить консультацию'
                    ctaVariant='secondary'
                  />
                </ProductPurchaseSection>

                <Card>
                  <CardBody>
                    <div className='flex items-center gap-3'>
                      <span className='text-2xl'>🚚</span>
                      <div>
                        <div className='font-semibold'>Установим завтра</div>
                        <div className='text-sm text-gray-600'>
                          Быстрая доставка и монтаж по городу
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                <ProductInfoBadges />
              </div>
            </div>

            <ProductDescription description={product?.description} />

            <div className='mb-10'>
              <h2 className='text-2xl font-bold mb-4'>Характеристики</h2>
              <SpecsTable rows={getSpecsRows(product)} />
            </div>

            <PromoConsultationCard />
          </div>
        </main>
      </div>
    </>
  );
}
