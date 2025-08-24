/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://propritok.ru',
  generateRobotsTxt: true, // опционально, можно отключить
  // ...другие опции
}