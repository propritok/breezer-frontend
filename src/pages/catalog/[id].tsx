import { Product } from "@/entities";
import { ContactCTAButton } from "@/features";
import { getSpecsRows, SpecsTable } from "@/widgets/SpecsTable";
import {
  ProductGallery,
  ProductHeader,
  ProductStatusChips,
  ProductPurchaseSection,
  ProductInfoBadges,
  PromoConsultationCard,
} from "@/widgets";
import { Button, Card, CardBody } from "@heroui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { mockProducts } from "../../api/products";

export default function CatalogItemPage() {
  const router = useRouter();
  const { id } = router.query;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const product: Product | undefined = useMemo(() => {
    if (!mounted || !id) return undefined;
    return mockProducts.find((p) => p.id === id);
  }, [id, mounted]);

  const pageTitle = `${product?.modelNameEn || ""} — купить в Propritok`;

  // Показываем загрузку пока не смонтирован
  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-6">
                  <div className="h-96 bg-gray-200 rounded"></div>
                </div>
                <div className="lg:col-span-6">
                  <div className="h-8 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={`Купить ${product?.modelNameEn}. Описание, характеристики и заказ.`}
        />
      </Head>

      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Основной блок с товаром */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
              {/* Галерея слева */}
              <div className="lg:col-span-6">
                <ProductGallery
                  images={product?.images}
                  title={product?.modelNameEn}
                />
              </div>

              {/* Информация справа */}
              <div className="lg:col-span-6 flex flex-col gap-4">
                <ProductHeader
                  title={product?.modelNameEn}
                  rating={product?.rating || 0}
                />

                <ProductStatusChips inStock={product?.inStock} />

                <ProductPurchaseSection price={product?.price}>
                  <ContactCTAButton label="Купить" size="lg" variant="flat" />
                  <ContactCTAButton
                    label="Получить консультацию"
                    size="lg"
                    variant="flat"
                  />
                </ProductPurchaseSection>

                <Card>
                  <CardBody>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🚚</span>
                      <div>
                        <div className="font-semibold">Установим завтра</div>
                        <div className="text-sm text-gray-600">
                          Быстрая доставка и монтаж по городу
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                <ProductInfoBadges />
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Характеристики</h2>
              <SpecsTable rows={getSpecsRows(product)} />
            </div>

            <PromoConsultationCard />
          </div>
        </main>
      </div>
    </>
  );
}
