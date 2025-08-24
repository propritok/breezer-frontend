import { Footer, Header, SiteBreadcrumbs } from '@/widgets';
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import '../app/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HeroUIProvider>
      <NextThemesProvider
        attribute='class'
        defaultTheme='light'
        enableSystem={false}
        disableTransitionOnChange>
        <div suppressHydrationWarning>
          <Header />
          <SiteBreadcrumbs />
          <Component {...pageProps} />
          <Footer />
        </div>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
