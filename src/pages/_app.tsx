import { Footer, Header, SiteBreadcrumbs } from '@/widgets';
import { HeroUIProvider } from '@heroui/react';
import type { AppProps } from 'next/app';
import '../app/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HeroUIProvider>
      <div>
        <Header />
        <SiteBreadcrumbs />
        <Component {...pageProps} />
        <Footer />
      </div>
    </HeroUIProvider>
  );
}
