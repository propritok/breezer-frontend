import { ProductBrand, ProductShort } from '@/entities/Product';
import { productsApi } from '@/shared/api/products';
import { useMemo, useState } from 'react';

import BubbleFilters from '@/features/BubbleFilters';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
const ProductCard = dynamic(() => import('@/widgets/ProductCard'), {
  ssr: false,
  loading: () => (
    <div className='h-64 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center'>
      <span className='text-gray-500'>Загрузка...</span>
    </div>
  ),
});
interface CatalogProps {
  products: ProductShort[];
  brands?: ProductBrand[];
}

function getUniqueByBrand(arr: ProductBrand[] = []): ProductBrand[] {
  const seen = new Set<string>();
  return arr.filter((item) => {
    if (seen.has(item.brand)) return false;
    seen.add(item.brand);
    return true;
  });
}

export const getServerSideProps: GetServerSideProps<CatalogProps> = async () => {
  try {
    const products = await productsApi.getAllShort();
    const brands = getUniqueByBrand(await productsApi.getAllBrands());

    return {
      props: {
        products,
        brands,
      },
    };
  } catch (error) {
    console.error('Error fetching products for catalog:', error);
    return {
      props: {
        products: [],
        brands: [],
      },
    };
  }
};

export default function Catalog({ products, brands }: CatalogProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const filtered = useMemo(() => {
    if (selectedBrands.length === 0) return products;
    return products.filter((p) => (p.brand ? selectedBrands.includes(p.brand) : false));
  }, [products, selectedBrands]);

  return (
    <>
      <Head>
        <title>Каталог бризеров - Propritok</title>
        <meta name='description' content='Каталог профессиональных бризеров для дома' />
      </Head>

      <div className='min-h-screen flex flex-col'>
        <main className='flex-grow'>
          <div className='max-w-7xl mx-auto px-4 py-8'>
            <h1 className='text-3xl font-bold mb-8'>Каталог</h1>

            {products.length === 0 ? (
              <div className='text-center py-12'>
                <p className='text-gray-500 text-lg'>Товары временно недоступны</p>
              </div>
            ) : (
              <div>
                <div className='mb-5'>
                  <BubbleFilters
                    items={brands?.map((b) => b.brand) || []}
                    selected={selectedBrands}
                    onChange={setSelectedBrands}
                  />
                </div>

                <section className='lg:col-span-3'>
                  {filtered.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                      {filtered.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <div className='text-center py-12'>
                      <p className='text-gray-500'>Нет товаров по выбранным производителям</p>
                    </div>
                  )}
                </section>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
