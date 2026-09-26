import { formatRub } from "@/shared/lib/format";
import { useSiteSettings } from "@/shared/lib/siteSettings";
import { Reveal } from "@/shared/lib/useReveal";
import Image from "next/image";
import React from "react";
import { LuDrill, LuLayers, LuRuler, LuThermometer } from "react-icons/lu";

// Остальные варианты по кругу берут оформление и иконку (их количество задаётся в админке)
const TILE_STYLES = [
  {
    span: "md:col-span-3",
    card: "bg-brand-50",
    icon: "bg-white",
    Icon: LuThermometer,
  },
  {
    span: "md:col-span-3",
    card: "bg-white shadow-soft",
    icon: "bg-brand-50",
    Icon: LuRuler,
  },
  { span: "md:col-span-4", card: "bg-sand", icon: "bg-white", Icon: LuLayers },
  {
    span: "md:col-span-4",
    card: "bg-white shadow-soft",
    icon: "bg-brand-50",
    Icon: LuLayers,
  },
];

const PriceValue: React.FC<{ value: number; big?: boolean }> = ({
  value,
  big,
}) => (
  <div
    className={`mt-5 font-extrabold tracking-[-0.04em] tnum leading-none ${
      big ? "text-[44px] md:text-[52px]" : "text-[34px]"
    }`}
  >
    {formatRub(value)}
  </div>
);

// Монтаж и стоимость: бенто-сетка с HILTI-карточкой и плитками прайса
const InstallPriceSection: React.FC = () => {
  const { installOptions, discountedInstallPrice } = useSiteSettings();
  const [main, ...rest] = installOptions;
  return (
    <section id="price" className="py-16 md:py-24 scroll-mt-24">
      <div className="mx-auto max-w-page px-5 md:px-8">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <span className="eyebrow">Монтаж и стоимость</span>
            <h2 className="mt-4 section-title max-w-[640px]">
              Чисто, тихо и&nbsp;профессионально
            </h2>
          </div>
          <p className="text-ink-2 max-w-[380px]">
            Доверьте монтаж бризера профессионалам, которые используют только
            лучшее оборудование.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {/* HILTI */}
          <Reveal className="md:col-span-5 md:row-span-2 relative rounded-card overflow-hidden min-h-[440px] md:min-h-[560px] bg-brand-950 text-white">
            <Image
              src="/work/IMG_1985.PNG"
              alt="Решётка бризера на фасаде"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent" />
            <div className="absolute top-5 left-5 glass-dark rounded-full h-10 px-4 inline-flex items-center gap-2 text-sm font-bold">
              <LuDrill className="w-5 h-5" />
              Инструмент HILTI
            </div>
            <div className="absolute bottom-0 inset-x-0 p-6 md:p-8">
              <h3 className="text-h3 md:text-[34px] font-bold tracking-[-0.03em] leading-tight">
                Сверлим с пылеудалением
              </h3>
              <p className="mt-3 text-white/75 max-w-[400px]">
                Профессиональный инструмент HILTI минимизирует пыль и
                строительный мусор, а ещё снижает шум при сверлении — комфортно
                вам и соседям.
              </p>
            </div>
          </Reveal>

          <Reveal
            delay={1}
            className="md:col-span-4 relative rounded-card bg-white shadow-soft p-6 md:p-8 card-hover overflow-hidden"
          >
            {/* Декоративное кольцо — под текстом и прижато в угол */}
            <svg
              className="absolute -right-16 -bottom-16 w-44 h-44 text-brand-50 pointer-events-none"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
              />
            </svg>
            <div className="relative">
              <span className="h-8 px-3 rounded-full bg-brand-700 text-white text-xs font-bold inline-flex items-center">
                Основной вариант
              </span>
              <h3 className="mt-10 md:mt-16 text-h4 font-bold">
                Монтаж {main.name}
              </h3>
              <p className="text-sm text-ink-3 mt-1">{main.hint}</p>
              <PriceValue value={main.price} big />
              <div className="mt-3 text-sm font-bold text-brand-700">
                с бризером — {formatRub(discountedInstallPrice(main.id))}
              </div>
            </div>
          </Reveal>

          {rest.map((o, i) => {
            const t = TILE_STYLES[i % TILE_STYLES.length];
            return (
              <Reveal
                key={o.id}
                delay={(i % 2) + 1}
                className={`${t.span} rounded-card p-6 md:p-7 card-hover ${t.card}`}
              >
                <span
                  className={`w-11 h-11 rounded-full text-brand-700 grid place-items-center ${t.icon}`}
                >
                  <t.Icon className="w-5 h-5" />
                </span>
                <h3 className="mt-8 font-bold text-[17px] leading-snug">
                  {o.name}
                </h3>
                {o.hint && <p className="text-sm text-ink-3 mt-1">{o.hint}</p>}
                <PriceValue value={o.price} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InstallPriceSection;
