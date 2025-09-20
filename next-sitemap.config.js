/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://propritok.ru',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/test-amocrm/*'],
  additionalPaths: async (config) => {
    const result = [];

    try {
      // Используем скрипт для генерации путей товаров
      const { generateProductPaths } = require('./scripts/generate-product-paths.js');
      const productPaths = await generateProductPaths();
      result.push(...productPaths);
    } catch (error) {
      console.error('Error generating product pages for sitemap:', error);
    }

    return result;
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/test-amocrm/'],
      },
    ],
    additionalSitemaps: [
      `${process.env.SITE_URL || 'https://propritok.ru'}/sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    // Настройка приоритетов для разных типов страниц
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path === '/catalog') {
      priority = 0.9;
      changefreq = 'daily';
    } else if (path.startsWith('/catalog/')) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path === '/about' || path === '/contact') {
      priority = 0.6;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq,
      priority,
    };
  },
}