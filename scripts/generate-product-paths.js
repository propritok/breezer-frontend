// Скрипт для генерации путей товаров для sitemap
const fs = require('fs');
const path = require('path');

// Простая функция для получения товаров из PocketBase
async function getProducts() {
  try {
    // Используем baseUrl из конфигурации
    const baseUrl = 'https://bp.propritok.ru/api';
    const response = await fetch(`${baseUrl}/collections/breezers/records`);

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Генерируем пути для товаров
async function generateProductPaths() {
  const products = await getProducts();
  const paths = products.map(product => ({
    loc: `/catalog/${product.id}`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.8,
  }));

  console.log(`Generated ${paths.length} product paths`);
  return paths;
}

module.exports = { generateProductPaths };
