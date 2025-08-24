import { mockProducts, mockProductsShort } from "@/api/products";
import { ProductCard } from "@/widgets";
import Head from "next/head";

export default function Catalog() {
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProductsShort.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
