import { Product } from "@/entities";
import { ContactCTAButton } from "@/features";
import { productsApi } from "@/shared/api/products";
import {
  ProductDescription,
  ProductGallery,
  ProductHeader,
  ProductInfoBadges,
  ProductPurchaseSection,
  ProductStatusChips,
  PromoConsultationCard,
  SiteBreadcrumbs,
} from "@/widgets";
import { getSpecsRows, SpecsTable } from "@/widgets/SpecsTable";
import { Card, CardBody } from "@heroui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

interface CatalogItemPageProps {
  product: Product;
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const products = await productsApi.getAll();
    const paths = products.map((product) => ({
      params: { id: product.id },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error generating static paths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps: GetStaticProps<CatalogItemPageProps> = async ({
  params,
}) => {
  try {
    const id = params?.id as string;
    if (!id) {
      return {
        notFound: true,
      };
    }

    const product = await productsApi.getById(id);

    return {
      props: {
        product,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      notFound: true,
    };
  }
};

export default function CatalogItemPage({ product }: CatalogItemPageProps) {
  const router = useRouter();
  // Show loading state while fallback is being generated
  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  const pageTitle = `${product?.modelNameEn || ""} — купить в Propritok`;

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
          name="description"
          content={product?.description?.substring(0, 160) || ""}
        />
        <meta property="og:title" content={pageTitle} />
        <meta
          property="og:description"
          content={product?.description?.substring(0, 160) || ""}
        />
        {product?.images?.[0] && (
          <meta property="og:image" content={product.images[0]} />
        )}
      </Head>
      <SiteBreadcrumbs pageTitle={product?.modelNameEn} />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Левая колонка - галерея */}
              <div>
                <ProductGallery images={product?.images || []} />
              </div>

              {/* Правая колонка - информация о продукте */}
              <div className="space-y-6">
                <ProductHeader product={product} />
                <ProductInfoBadges />
                <ProductStatusChips product={product} />
                <ProductPurchaseSection product={product}>
                  <ContactCTAButton
                    action={actionBuy}
                    size="lg"
                    label="Купить"
                    ctaVariant="accent"
                  />
                  <ContactCTAButton
                    size="lg"
                    action={actionConsult}
                    label="Получить консультацию"
                    formButtonLabel="Получить консультацию"
                    showMessageField
                    ctaVariant="secondary"
                  />
                </ProductPurchaseSection>

                <PromoConsultationCard />
              </div>
            </div>

            {/* Описание продукта */}
            <div className="mt-12">
              <ProductDescription product={product} />
            </div>

            {/* Характеристики */}
            {product?.specs && (
              <div className="mt-12">
                <Card>
                  <CardBody>
                    <h2 className="text-2xl font-bold mb-6">Характеристики</h2>
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
