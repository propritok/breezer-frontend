import { Footer, Header, SiteBreadcrumbs } from '@/widgets';
import { HeroUIProvider } from '@heroui/react';
import type { AppProps } from 'next/app';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../app/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HeroUIProvider>
      <div className='pt-16'>
        <Header />
        <SiteBreadcrumbs />
        <Component {...pageProps} />
        <Footer />
      </div>
    </HeroUIProvider>
  );
}
