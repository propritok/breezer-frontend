/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
      },
    ],
  },
  env: {
    // Явно экспортируем переменные окружения для клиентской части
    NEXT_PUBLIC_MAIL_ADDRESS: process.env.NEXT_PUBLIC_MAIL_ADDRESS,
    NEXT_PUBLIC_MAIL_RECIPIENTS: process.env.NEXT_PUBLIC_MAIL_RECIPIENTS,
    NEXT_PUBLIC_TELEPHONE: process.env.NEXT_PUBLIC_TELEPHONE,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
};

export default nextConfig;
