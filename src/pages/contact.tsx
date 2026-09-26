import { Adress, config, ContactFormCTA, MailAdress, PhoneNumber } from "@/shared";
import { useSocials } from "@/shared/ui/SocialLinks";
import { SiteBreadcrumbs } from "@/widgets";
import Head from "next/head";
import { LuClock, LuMail, LuMapPin, LuPhone } from "react-icons/lu";

export default function Contact() {
  const messengers = useSocials();
  return (
    <>
      <Head>
        <title>Контакты - Propritok</title>
        <meta name="description" content="Свяжитесь с нами для заказа бризеров" />
      </Head>

      <SiteBreadcrumbs pageTitle="Контакты" />

      <main className="mx-auto max-w-page px-5 md:px-8 pt-8 md:pt-12 pb-16 md:pb-24">
        <span className="eyebrow">Контакты</span>
        <h1 className="mt-4 text-[40px] leading-[1.02] md:text-display font-light tracking-[-0.045em]">
          Давайте <span className="font-extrabold">поговорим</span>
        </h1>

        <div className="mt-10 grid lg:grid-cols-12 gap-5">
          {/* Контакты — бенто */}
          <div className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-4 content-start">
            <div className="relative rounded-card bg-brand-700 text-white p-6 md:p-7 overflow-hidden card-hover">
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10 animate-breathe" />
              <span className="relative w-11 h-11 rounded-full bg-white/15 grid place-items-center">
                <LuPhone className="w-5 h-5" />
              </span>
              <PhoneNumber className="relative block mt-8 text-[28px] md:text-[34px] font-extrabold tracking-[-0.03em] tnum" />
              <div className="relative mt-4 flex gap-2">
                {messengers.map(({ href, label, bg, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Написать в ${label}`}
                    className={`${bg} w-10 h-10 rounded-full grid place-items-center text-white ring-2 ring-white/20 transition hover:-translate-y-0.5`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            <div className="rounded-card bg-white shadow-soft p-6 md:p-7 card-hover">
              <span className="w-11 h-11 rounded-full bg-brand-50 text-brand-700 grid place-items-center">
                <LuMail className="w-5 h-5" />
              </span>
              <MailAdress className="block mt-8 text-h4 md:text-[22px] font-bold break-all hover:text-brand-700" />
              <div className="mt-1 text-ink-3 text-sm">Пишите — ответим в рабочее время</div>
            </div>
            <div className="rounded-card bg-sand p-6 md:p-7 sm:col-span-2 lg:col-span-1 grid grid-cols-2 gap-4">
              <div>
                <span className="w-11 h-11 rounded-full bg-white text-brand-700 grid place-items-center">
                  <LuClock className="w-5 h-5" />
                </span>
                <div className="mt-5 font-bold">Режим работы</div>
                <div className="text-sm text-ink-2">
                  Пн–Пт {config.contact.workingHours.weekdays}
                  <br />
                  Сб–Вс {config.contact.workingHours.weekends}
                </div>
              </div>
              <div>
                <span className="w-11 h-11 rounded-full bg-white text-brand-700 grid place-items-center">
                  <LuMapPin className="w-5 h-5" />
                </span>
                <div className="mt-5 font-bold">Адрес</div>
                <div className="text-sm text-ink-2">
                  <Adress />
                </div>
              </div>
            </div>
            <div className="rounded-card border border-line p-6 text-sm text-ink-2 sm:col-span-2 lg:col-span-1">
              <div className="text-xs font-bold uppercase tracking-[0.12em] text-ink-3 mb-2">Реквизиты</div>
              <div className="flex flex-col gap-0.5">
                <span>ИП Смирнов Илья Вячеславович</span>
                <span>ОГРНИП: 318774600572015</span>
                <span>ИНН: 772301109753</span>
              </div>
            </div>
          </div>

          {/* Форма + карта */}
          <div className="lg:col-span-7 rounded-block bg-white shadow-soft overflow-hidden grid md:grid-cols-2">
            <div className="p-6 md:p-8">
              <h2 className="text-h3 font-bold tracking-[-0.02em]">Связаться с нами</h2>
              <p className="text-sm text-ink-3 mt-1 mb-6">Оставьте номер — перезвоним и ответим на вопросы</p>
              <ContactFormCTA showMessageField={5} action="Заявка со страницы Контакты" />
            </div>
            <div className="relative min-h-[360px] bg-brand-50">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=37.617635%2C55.755814&z=10"
                className="absolute inset-0 w-full h-full grayscale-[.6]"
                loading="lazy"
                title="Карта: Москва"
              />
              <div className="absolute left-4 right-4 bottom-4 glass shadow-glass rounded-2xl p-4 flex items-center gap-3 pointer-events-none">
                <span className="w-10 h-10 rounded-full bg-brand-700 text-white grid place-items-center shrink-0">
                  <LuMapPin className="w-[18px] h-[18px]" />
                </span>
                <span className="text-sm leading-tight">
                  <b className="block">Работаем по Москве</b>
                  <span className="text-ink-3">выезд на объект по договорённости</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
