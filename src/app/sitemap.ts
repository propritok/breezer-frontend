import type { MetadataRoute } from "next";

// Динамическая карта сайта: пересобирается не чаще раза в час,
// товары подтягиваются из PocketBase — деплой при добавлении товара не нужен
export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://propritok.ru";
const PB_URL = "https://bp.propritok.ru/api";

interface BreezerRecord {
  id: string;
  updated: string;
}

async function getProducts(): Promise<BreezerRecord[]> {
  try {
    const response = await fetch(
      `${PB_URL}/collections/breezers/records?perPage=500&fields=id,updated&sort=-updated`,
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) {
      throw new Error(`PocketBase responded ${response.status}`);
    }
    const data = await response.json();
    return data.items ?? [];
  } catch (error) {
    console.error("sitemap: не удалось получить товары из PocketBase:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/catalog`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/workprocess`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const products = await getProducts();
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/catalog/${product.id}`,
    lastModified: new Date(product.updated),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}
