import { CartProvider, CartToast } from '@/features/cart';
import { CookieNotice, FloatingSocialButtons, Footer, Header } from '@/widgets';
import { HeroUIProvider } from '@heroui/react';
import { DEFAULT_SETTINGS, settingsApi, SiteSettings } from '@/shared/api/settings';
import { SiteSettingsProvider } from '@/shared/lib/siteSettings';
import NextApp, { type AppContext, type AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../app/styles/globals.css';

const YM_COUNTER_ID = 104071093;

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
  }
}

type PropritokAppProps = AppProps & { siteSettings?: SiteSettings };

export default function App({ Component, pageProps, siteSettings }: PropritokAppProps) {
  const router = useRouter();
  // Настройки из PocketBase приходят с первым серверным рендером и живут всю сессию
  const [settings] = useState<SiteSettings>(siteSettings ?? DEFAULT_SETTINGS);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      window.ym?.(YM_COUNTER_ID, 'hit', url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <HeroUIProvider>
      <Script id='yandex-metrika' strategy='afterInteractive'>
        {`
          (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YM_COUNTER_ID}', 'ym');

          ym(${YM_COUNTER_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
        `}
      </Script>
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${YM_COUNTER_ID}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=''
          />
        </div>
      </noscript>
      <SiteSettingsProvider value={settings}>
        <CartProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
          <FloatingSocialButtons />
          <CookieNotice />
          <CartToast />
        </CartProvider>
      </SiteSettingsProvider>
    </HeroUIProvider>
  );
}

// Скидка, цены монтажа и мессенджеры задаются в PocketBase (см. src/shared/api/settings.ts).
// Грузим на сервере; при клиентской навигации не перезапрашиваем — они уже в состоянии App
App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  if (typeof window !== 'undefined') return appProps;
  return { ...appProps, siteSettings: await settingsApi.get() };
};
