import { ProductShort } from "@/entities/Product";
import { productsApi } from "@/shared/api/products";
import { CatalogFilters } from "@/features";
import { useMemo, useState } from "react";

import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
const ProductCard = dynamic(() => import("@/widgets/ProductCard"), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
      <span className="text-gray-500">Загрузка...</span>
    </div>
  ),
});
interface CatalogProps {
  products: ProductShort[];
}

export const getServerSideProps: GetServerSideProps<
  CatalogProps
> = async () => {
  try {
    const products = await productsApi.getAllShort();
    return {
      props: {
        products,
      },
    };
  } catch (error) {
    console.error("Error fetching products for catalog:", error);
    return {
      props: {
        products: [],
      },
    };
  }
};

export default function Catalog({ products }: CatalogProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const brands = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.brand) set.add(p.brand);
    });
    return Array.from(set).sort();
  }, [products]);

  const filtered = useMemo(() => {
    if (selectedBrands.length === 0) return products;
    return products.filter((p) =>
      p.brand ? selectedBrands.includes(p.brand) : false
    );
  }, [products, selectedBrands]);
  return (
    <>
      <Head>
        <title>Каталог бризеров - Propritok</title>
        <meta
          name="description"
          content="Каталог профессиональных бризеров для дома"
        />
      </Head>

      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Каталог</h1>

            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Товары временно недоступны
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                  <CatalogFilters
                    brands={brands}
                    selectedBrands={selectedBrands}
                    onChangeBrands={setSelectedBrands}
                  />
                </div>

                <section className="lg:col-span-3">
                  {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filtered.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500">
                        Нет товаров по выбранным производителям
                      </p>
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
