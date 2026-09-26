import { ContactCTAButton } from "@/features";
import { Airflow } from "@/shared";
import { Reveal } from "@/shared/lib/useReveal";
import { SiteBreadcrumbs } from "@/widgets";
import Head from "next/head";
import React from "react";
import { LuDrill, LuHeart, LuMessageCircle, LuPhone, LuRuler } from "react-icons/lu";

type Stage = {
  title: string;
  lead?: string;
  points: { title?: string; text: string }[];
  Icon: React.ComponentType<{ className?: string }>;
  tone: "light" | "dark" | "mist";
};

const stages: Stage[] = [
  {
    title: "Заявка",
    Icon: LuMessageCircle,
    tone: "light",
    points: [
      { text: "Вы принимаете решение дышать чистым воздухом ежедневно" },
      { text: "Знакомитесь с доступными моделями бризеров на нашем сайте" },
      { text: "Оставляете заявку на консультацию, с указанием удобного способа связи" },
    ],
  },
  {
    title: "Звонок менеджера",
    lead: "С вами связывается наш менеджер и отвечает на все интересующие вопросы.",
    Icon: LuPhone,
    tone: "mist",
    points: [
      {
        title: "Помощь в выборе",
        text: "Помогает определиться с моделью бризера и их количеством, исходя из ваших пожеланий и возможностей установки в помещении",
      },
      {
        title: "Информация и согласование",
        text: "Рассказывает о возможных вариантах оплаты/предоплаты, гарантий на монтаж и устройства, дополнительных возможностей монтажа. Согласовывает дату и время для консультации с инженером.",
      },
    ],
  },
  {
    title: "Консультация инженера",
    lead: "Индивидуальная консультация инженера по техническим вопросам монтажа.",
    Icon: LuRuler,
    tone: "light",
    points: [
      { text: "По фото и видео определяет техническую возможность реализации монтажа" },
      { text: "Составление сметы монтажных работ" },
      { text: "Составление технического задания для мастера" },
      { text: "Выбор даты монтажа и установки бризера" },
    ],
  },
  {
    title: "Монтаж",
    lead: "Оказание услуг по смете",
    Icon: LuDrill,
    tone: "dark",
    points: [
      { text: "Выезд мастера на объект в заранее согласованный день и по предварительному звонку" },
      { text: "Выполнение качественного монтажа" },
      { text: "Установка и подключение бризера" },
      { text: "Демонстрация устройства" },
      { text: "Подписание акта работ и гарантийных талонов" },
    ],
  },
  {
    title: "Чистый воздух",
    Icon: LuHeart,
    tone: "mist",
    points: [{ text: "Оплата монтажных работ" }, { text: "Радость от притока чистого воздуха" }],
  },
];

const toneClass: Record<Stage["tone"], string> = {
  light: "bg-white shadow-soft",
  mist: "bg-brand-50",
  dark: "bg-brand-900 text-white",
};

const WorkProcessPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Процесс работы - PROPRITOK</title>
        <meta
          name="description"
          content="Узнайте, как происходит установка бризера от PROPRITOK. 5 простых этапов от заявки до чистого воздуха в вашем доме."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SiteBreadcrumbs pageTitle="Процесс работы" />

      <main className="relative overflow-hidden">
        <div className="absolute -top-20 -left-40 w-[520px] h-[520px] rounded-full bg-brand-100 blur-3xl opacity-60 animate-breathe" />
        <div className="relative mx-auto max-w-page px-5 md:px-8 pt-8 md:pt-12 pb-16 md:pb-24">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <span className="eyebrow">Процесс работы</span>
              <h1 className="mt-4 text-[40px] leading-[1.02] md:text-display font-light tracking-[-0.045em]">
                От заявки до&nbsp;<span className="font-extrabold">первого вдоха</span>
              </h1>
            </div>
            <p className="lg:col-span-5 text-body-lg text-ink-2">
              Мы делаем процесс установки бризера максимально простым и прозрачным. От первого звонка до чистого
              воздуха в вашем доме — всего 5 этапов.
            </p>
          </div>

          {/* Таймлайн */}
          <ol className="relative mt-14 md:mt-20 space-y-6 md:space-y-8">
            <span className="absolute left-6 md:left-7 top-4 bottom-4 w-0.5 bg-gradient-to-b from-brand-700 via-brand-300 to-line" />
            {stages.map((s, i) => {
              const dark = s.tone === "dark";
              return (
                <Reveal as="li" key={s.title} className="relative pl-16 md:pl-28">
                  <span
                    className={`absolute left-0 top-0 w-12 h-12 md:w-14 md:h-14 rounded-full grid place-items-center z-10 ${
                      dark ? "bg-brand-700 text-white shadow-glow" : "bg-white text-brand-700 shadow-soft"
                    }`}
                  >
                    <s.Icon className="w-6 h-6" />
                  </span>
                  <div className={`rounded-card p-5 md:p-8 card-hover ${toneClass[s.tone]}`}>
                    <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-10">
                      <div className="md:w-[280px] shrink-0">
                        <span className={`text-xs font-bold tnum ${dark ? "text-brand-300" : "text-ink-3"}`}>
                          Этап 0{i + 1}
                        </span>
                        <h2 className="mt-2 text-h3 font-bold tracking-[-0.02em]">{s.title}</h2>
                        {s.lead && (
                          <p className={`mt-2 ${dark ? "text-white/70" : "text-ink-2"}`}>{s.lead}</p>
                        )}
                      </div>
                      <ul
                        className={`flex-1 grid gap-3 ${
                          s.points.some((p) => p.title) ? "sm:grid-cols-2" : "sm:grid-cols-2"
                        }`}
                      >
                        {s.points.map((p) => (
                          <li
                            key={p.text}
                            className={`rounded-2xl p-4 ${dark ? "bg-white/10" : s.tone === "mist" ? "bg-white" : "bg-air"}`}
                          >
                            {p.title && <b className="block mb-1">{p.title}</b>}
                            <span className={dark ? "text-white/85" : "text-ink-2"}>{p.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ol>

          {/* CTA */}
          <Reveal className="relative mt-16 md:mt-24 rounded-block bg-brand-900 text-white overflow-hidden p-8 md:p-14 text-center">
            <Airflow className="absolute inset-0 w-full h-full" height={400} color="#8FD3CF" opacity={0.25} />
            <div className="relative">
              <h2 className="section-title">Готовы начать?</h2>
              <p className="mt-4 text-white/70 max-w-[560px] mx-auto">
                Оставьте заявку на консультацию, и мы проведём вас через весь процесс — от первого звонка до чистого
                воздуха в вашем доме.
              </p>
              <ContactCTAButton
                formButtonLabel="Перезвоните мне"
                action="Заявка со страницы Процесс работы"
                label="Оставить заявку"
                className="mt-8 h-14 px-8 bg-white text-brand-900 shadow-none"
              />
            </div>
          </Reveal>
        </div>
      </main>
    </>
  );
};

export default WorkProcessPage;
