import { calcTotals, CartItem, CartTotals, useCart } from "@/features/cart";
import { Airflow, config, LoadingSpinner, PhoneNumber } from "@/shared";
import { formatRub, plural } from "@/shared/lib/format";
import { useSiteSettings } from "@/shared/lib/siteSettings";
import { PhoneInput } from "@/shared/ui/PhoneInput";
import { Checkbox, Input, Textarea } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  LuArrowRight,
  LuCheck,
  LuDrill,
  LuMessageCircle,
  LuPhone,
  LuRuler,
  LuShieldCheck,
  LuShoppingCart,
  LuTrash2,
} from "react-icons/lu";
import { z } from "zod";

type Step = 0 | 1 | 2;

const CONTACT_METHODS = ["Позвонить", "WhatsApp", "Telegram", "MAX"] as const;
const INSTALL_WHEN = [
  "Как можно скорее",
  "В будни",
  "На выходных",
  "Обсудим по телефону",
] as const;

const orderSchema = z.object({
  name: z.string().min(1, "Обязательное поле"),
  phone: z
    .string()
    .regex(
      /^\+7\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}$/,
      "Введите номер полностью",
    ),
  address: z.string().optional(),
  comment: z.string().optional(),
  privacyConsent: z
    .boolean()
    .refine((v) => v === true, {
      message: "Нужно согласие на обработку данных",
    }),
});
type OrderForm = z.infer<typeof orderSchema>;

const inputClassNames = {
  inputWrapper:
    "bg-white border-1 border-line rounded-2xl shadow-none data-[hover=true]:border-brand-300 group-data-[focus=true]:!border-brand-700 group-data-[focus=true]:ring-4 group-data-[focus=true]:ring-brand-700/10",
};

/* ---------------- Степпер ---------------- */
const Stepper: React.FC<{ step: Step }> = ({ step }) => (
  <ol className="flex items-center gap-2 text-sm font-bold">
    {["Корзина", "Контакты", "Готово"].map((t, i) => (
      <li key={t} className="flex items-center gap-2">
        {i > 0 && (
          <span
            className={`w-6 md:w-10 h-0.5 rounded ${i <= step ? "bg-brand-700" : "bg-line"}`}
          />
        )}
        <span
          className={`w-8 h-8 rounded-full grid place-items-center text-xs ${
            i < step
              ? "bg-brand-700 text-white"
              : i === step
                ? "bg-ink text-white"
                : "bg-white border border-line text-ink-3"
          }`}
        >
          {i < step ? <LuCheck className="w-3.5 h-3.5" /> : i + 1}
        </span>
        <span
          className={`${i === step ? "text-ink" : "text-ink-3 hidden sm:inline"}`}
        >
          {t}
        </span>
      </li>
    ))}
  </ol>
);

/* ---------------- Итог: sticky-карточка на десктопе и нижняя плашка на мобиле ---------------- */
const Summary: React.FC<{
  totals: CartTotals;
  cta: React.ReactNode;
  mobileCta: React.ReactNode;
}> = ({ totals: t, cta, mobileCta }) => {
  const { installDiscount } = useSiteSettings();
  return (
    <>
      <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-28 self-start">
        <div className="rounded-card bg-white shadow-lift p-6">
          <h2 className="text-h4 font-bold">Ваш заказ</h2>
          <dl className="mt-5 space-y-3 text-[15px]">
            <div className="flex justify-between">
              <dt className="text-ink-2">Бризеры · {t.units} шт</dt>
              <dd className="font-semibold tnum">{formatRub(t.goods)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-2">Монтаж · {t.installUnits} шт</dt>
              <dd className="font-semibold tnum">
                {t.install ? (
                  <>
                    <s className="text-ink-3 font-normal mr-1.5">
                      {formatRub(t.installFull)}
                    </s>
                    {formatRub(t.install)}
                  </>
                ) : (
                  "—"
                )}
              </dd>
            </div>
            {t.saving > 0 && (
              <div className="flex justify-between items-center rounded-2xl bg-sun-100 px-3 py-2 text-sun-700">
                <dt className="font-semibold text-sm">
                  Скидка {installDiscount}% на монтаж
                </dt>
                <dd className="font-extrabold tnum">−{formatRub(t.saving)}</dd>
              </div>
            )}
          </dl>
          <div className="mt-5 pt-5 border-t border-line flex items-end justify-between">
            <span className="font-bold">Итого</span>
            <span className="text-[34px] leading-none font-extrabold tracking-[-0.04em] tnum">
              {formatRub(t.total)}
            </span>
          </div>
          <div className="mt-5">{cta}</div>
          <div className="mt-4 flex gap-3 rounded-2xl bg-brand-50 p-3.5 text-sm text-ink-2">
            <LuShieldCheck className="w-[18px] h-[18px] text-brand-700 shrink-0 mt-0.5" />
            <span>
              Онлайн-оплаты нет. Мы перезвоним, подтвердим состав заказа и
              согласуем время.
            </span>
          </div>
        </div>
      </aside>
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 p-3">
        <div className="glass shadow-lift rounded-card p-3 pl-5 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-xs text-ink-3">
              {t.units} {plural(t.units, "товар", "товара", "товаров")}
              {t.saving > 0 && (
                <span className="text-sun-700 font-bold">
                  {" "}
                  · −{formatRub(t.saving)}
                </span>
              )}
            </div>
            <div className="text-[22px] font-extrabold tracking-[-0.03em] tnum">
              {formatRub(t.total)}
            </div>
          </div>
          {mobileCta}
        </div>
      </div>
    </>
  );
};

/* ---------------- Позиция корзины ---------------- */
const CartRow: React.FC<{ item: CartItem }> = ({ item }) => {
  const { setQty, setInstall, remove } = useCart();
  const {
    installOptions,
    installDiscount,
    getInstall,
    discountedInstallPrice,
    defaultInstallId,
  } = useSiteSettings();
  const on = !!item.install;
  const inst = getInstall(item.install);

  return (
    <article className="rounded-card bg-white shadow-soft overflow-hidden">
      <div className="p-4 md:p-5 flex gap-4">
        <Link
          href={`/catalog/${item.id}`}
          className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-b from-brand-50 to-white shrink-0 overflow-hidden"
        >
          {item.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.image}
              alt=""
              className="w-full h-full object-contain p-3 mix-blend-multiply"
            />
          )}
        </Link>
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              {item.brand && (
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-ink-3">
                  {item.brand}
                </span>
              )}
              <Link
                href={`/catalog/${item.id}`}
                className="mt-1 block font-bold text-[17px] md:text-h4 leading-snug hover:text-brand-700"
              >
                {item.name}
              </Link>
            </div>
            <button
              type="button"
              onClick={() => remove(item.id)}
              aria-label={`Удалить ${item.name}`}
              className="w-9 h-9 rounded-full text-ink-3 hover:bg-[#FBEAE6] hover:text-[#D2553F] grid place-items-center shrink-0 transition"
            >
              <LuTrash2 className="w-[18px] h-[18px]" />
            </button>
          </div>
          <div className="mt-auto pt-3 flex items-end justify-between gap-3">
            <div className="inline-flex items-center h-11 rounded-full border border-line bg-air/60">
              <button
                type="button"
                onClick={() => setQty(item.id, item.qty - 1)}
                disabled={item.qty < 2}
                aria-label="Уменьшить количество"
                className="w-11 h-11 grid place-items-center text-lg font-bold hover:text-brand-700 disabled:opacity-30"
              >
                −
              </button>
              <span className="w-6 text-center font-extrabold tnum">
                {item.qty}
              </span>
              <button
                type="button"
                onClick={() => setQty(item.id, item.qty + 1)}
                aria-label="Увеличить количество"
                className="w-11 h-11 grid place-items-center text-lg font-bold hover:text-brand-700"
              >
                +
              </button>
            </div>
            <div className="text-right">
              {item.qty > 1 && (
                <div className="text-xs text-ink-3 tnum">
                  {item.qty} × {formatRub(item.price)}
                </div>
              )}
              {item.oldPrice && item.oldPrice > item.price && (
                <s className="block text-xs text-ink-3 tnum">
                  {formatRub(item.oldPrice * item.qty)}
                </s>
              )}
              <div className="text-[20px] md:text-[22px] font-extrabold tracking-[-0.02em] tnum">
                {formatRub(item.price * item.qty)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Нужен монтаж? */}
      <div
        className={`border-t border-line transition-colors ${on ? "bg-brand-50/50" : ""}`}
      >
        <button
          type="button"
          onClick={() => setInstall(item.id, on ? null : defaultInstallId)}
          aria-pressed={on}
          className="w-full flex items-center gap-4 px-4 md:px-5 py-4 text-left"
        >
          <span className={`switch ${on ? "switch-on" : ""}`} />
          <span className="flex-1 leading-tight">
            <b className="block text-[15px]">Нужен монтаж</b>
            <span className="text-sm text-ink-3">
              {on
                ? `${inst?.name} · скидка ${installDiscount}% применена`
                : `Установим под ключ со скидкой ${installDiscount}%`}
            </span>
          </span>
          <span className="text-right shrink-0 tnum">
            {on ? (
              <>
                <s className="block text-xs text-ink-3">
                  {formatRub((inst?.price ?? 0) * item.qty)}
                </s>
                <b className="text-brand-700">
                  +{formatRub(discountedInstallPrice(item.install) * item.qty)}
                </b>
              </>
            ) : (
              <span className="text-sm font-bold text-brand-700">
                от{" "}
                {formatRub(
                  Math.min(
                    ...installOptions.map((o) => discountedInstallPrice(o.id)),
                  ),
                )}
              </span>
            )}
          </span>
        </button>
        <div
          className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${
            on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="px-4 md:px-5 pb-5 grid sm:grid-cols-2 gap-2">
              {installOptions.map((o) => {
                const selected = inst?.id === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setInstall(item.id, o.id)}
                    className={`text-left rounded-2xl border bg-white p-3.5 flex gap-3 items-start transition ${
                      selected
                        ? "border-brand-700 bg-brand-50 ring-4 ring-brand-700/10"
                        : "border-line hover:border-brand-300"
                    }`}
                  >
                    <span
                      className={`mt-0.5 w-5 h-5 rounded-full shrink-0 bg-white transition-all ${
                        selected
                          ? "border-[6px] border-brand-700"
                          : "border-2 border-line"
                      }`}
                    />
                    <span className="flex-1 min-w-0">
                      <b className="block text-sm">{o.name}</b>
                      <span className="block text-xs text-ink-3 mt-0.5">
                        {o.hint}
                      </span>
                    </span>
                    <span className="text-right shrink-0 tnum">
                      <s className="block text-[11px] text-ink-3">
                        {formatRub(o.price)}
                      </s>
                      <b className="text-sm">
                        {formatRub(discountedInstallPrice(o.id))}
                      </b>
                    </span>
                  </button>
                );
              })}
              <p className="sm:col-span-2 text-xs text-ink-3 flex items-center gap-1.5 mt-1">
                <LuMessageCircle className="w-3.5 h-3.5 shrink-0" />
                Не знаете, какой вариант? Оставьте «Стандарт» — уточним по фото
                стены.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

/* ---------------- Пустая корзина ---------------- */
const EmptyCart: React.FC = () => {
  const { installDiscount } = useSiteSettings();
  return (
    <div className="relative rounded-block bg-white shadow-soft overflow-hidden py-20 md:py-28 px-6 text-center">
      <Airflow
        className="absolute inset-0 w-full h-full"
        height={400}
        opacity={0.3}
      />
      <div className="relative mx-auto w-28 h-28 rounded-full bg-brand-50 grid place-items-center text-brand-700 animate-breathe">
        <LuShoppingCart className="w-10 h-10" />
      </div>
      <h2 className="relative mt-8 text-h3 font-bold">
        Здесь пока только свежий воздух
      </h2>
      <p className="relative mt-2 text-ink-2 max-w-[420px] mx-auto">
        Выберите бризер в каталоге — монтаж добавим одной галочкой и со скидкой{" "}
        {installDiscount}%.
      </p>
      <Link href="/catalog" className="relative btn btn-primary mt-8">
        Перейти в каталог <LuArrowRight className="arrow w-5 h-5" />
      </Link>
    </div>
  );
};

/* ---------------- Сообщение для менеджера ---------------- */
const buildOrderMessage = (
  items: CartItem[],
  t: CartTotals,
  pricing: ReturnType<typeof useSiteSettings>,
  extra: { contact: string; when: string; address?: string; comment?: string },
) => {
  const lines = items.map((i, n) => {
    const inst = pricing.getInstall(i.install);
    const installLine = inst
      ? `монтаж «${inst.name}» ${formatRub(pricing.discountedInstallPrice(i.install) * i.qty)} (со скидкой ${pricing.installDiscount}%)`
      : "без монтажа";
    return `${n + 1}. ${i.name} × ${i.qty} — ${formatRub(i.price * i.qty)}; ${installLine} [id-${i.id}]`;
  });
  return [
    "Состав заказа:",
    ...lines,
    "",
    `Бризеры: ${formatRub(t.goods)}`,
    `Монтаж: ${formatRub(t.install)} (скидка ${formatRub(t.saving)})`,
    `ИТОГО: ${formatRub(t.total)}`,
    "",
    `Адрес: ${extra.address || "не указан"}`,
    t.installUnits ? `Когда удобно монтировать: ${extra.when}` : "",
    `Способ связи: ${extra.contact}`,
    extra.comment ? `Комментарий: ${extra.comment}` : "",
  ]
    .filter((l) => l !== "")
    .join("\n")
    .replace(/ /g, " ");
};

/* ---------------- Страница ---------------- */
export default function CartPage() {
  const { items, totals, ready, clear } = useCart();
  const pricing = useSiteSettings();
  const [step, setStep] = useState<Step>(0);
  const [contact, setContact] = useState<string>(CONTACT_METHODS[0]);
  const [when, setWhen] = useState<string>(INSTALL_WHEN[0]);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [placed, setPlaced] = useState<{
    items: CartItem[];
    totals: CartTotals;
  } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<OrderForm>({
    resolver: zodResolver(orderSchema),
    // Чекбокс согласия обязан быть пустым по умолчанию (152-ФЗ)
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      comment: "",
      privacyConsent: false,
    },
  });

  const go = (s: Step) => {
    setStep(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (data: OrderForm) => {
    setSending(true);
    setSendError(null);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          action: `Заказ из корзины на ${formatRub(totals.total).replace(/ /g, " ")}`,
          message: buildOrderMessage(items, totals, pricing, {
            contact,
            when,
            address: data.address,
            comment: data.comment,
          }),
        }),
      });
      const result = await response.json();
      if (!result?.success) throw new Error(result?.message);
      setPlaced({ items, totals });
      clear();
      go(2);
    } catch {
      setSendError(
        "Не удалось отправить заказ. Попробуйте ещё раз или позвоните нам.",
      );
    } finally {
      setSending(false);
    }
  };

  const shownTotals = placed?.totals ?? totals;
  const title =
    step === 2 ? (
      <>
        Заказ <span className="font-extrabold">принят</span>
      </>
    ) : step === 1 ? (
      <>
        Оформление <span className="font-extrabold">заказа</span>
      </>
    ) : (
      <>
        Корзина{" "}
        {items.length > 0 && (
          <span className="font-extrabold">{totals.units}</span>
        )}
      </>
    );

  const chip = (value: string, current: string, set: (v: string) => void) => (
    <button
      key={value}
      type="button"
      onClick={() => set(value)}
      className={`chip ${current === value ? "chip-on" : ""}`}
    >
      {value}
    </button>
  );

  return (
    <>
      <Head>
        <title>Корзина — Propritok</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main className="mx-auto max-w-page px-5 md:px-8 pt-8 md:pt-12 pb-32 lg:pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <nav className="text-sm text-ink-3 flex items-center gap-2">
              <Link href="/" className="hover:text-brand-700">
                Главная
              </Link>
              <span>/</span>
              <span className="text-ink font-semibold">Корзина</span>
            </nav>
            <h1 className="mt-4 text-[40px] leading-[1.02] md:text-h1 font-light tracking-[-0.04em]">
              {title}
            </h1>
          </div>
          {(items.length > 0 || step === 2) && <Stepper step={step} />}
        </div>

        <div className="mt-8 md:mt-10">
          {!ready ? (
            <div className="py-24 grid place-items-center">
              <LoadingSpinner size="lg" />
            </div>
          ) : step === 2 && placed ? (
            /* ---------- Шаг 3: готово ---------- */
            <div className="grid lg:grid-cols-12 gap-5">
              <div className="lg:col-span-7 relative rounded-block bg-brand-900 text-white overflow-hidden p-8 md:p-12">
                <Airflow
                  className="absolute inset-0 w-full h-full"
                  height={500}
                  color="#8FD3CF"
                  opacity={0.25}
                />
                <div className="relative w-24 h-24">
                  <span className="pulse-ring" />
                  <div className="absolute inset-0 rounded-full bg-brand-700 grid place-items-center shadow-glow">
                    <LuCheck className="w-10 h-10" />
                  </div>
                </div>
                <h2 className="relative mt-8 section-title">
                  Спасибо!{" "}
                  <span className="font-light text-brand-300">
                    Заказ отправлен
                  </span>
                </h2>
                <p className="relative mt-4 text-white/70 max-w-[460px]">
                  Мы свяжемся с вами в рабочее время (Пн–Пт{" "}
                  {config.contact.workingHours.weekdays}), подтвердим состав
                  заказа и согласуем время
                  {placed.totals.installUnits ? " монтажа" : " доставки"}.
                </p>
                <div className="relative mt-8 flex flex-wrap gap-3">
                  <Link href="/catalog" className="btn btn-light">
                    Вернуться в каталог
                  </Link>
                  <span className="btn border border-white/30 text-white hover:bg-white/10">
                    <LuPhone className="w-[18px] h-[18px]" />
                    <PhoneNumber />
                  </span>
                </div>
              </div>
              <div className="lg:col-span-5 rounded-block bg-white shadow-soft p-6 md:p-8">
                <b className="text-h4">Что дальше</b>
                <ol className="mt-6 relative space-y-6">
                  <span className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-brand-700 to-line" />
                  {[
                    { Icon: LuPhone, t: "Звонок", d: "уточним детали заказа" },
                    {
                      Icon: LuRuler,
                      t: "Подтверждение",
                      d: "модель, тип монтажа, дата",
                    },
                    {
                      Icon: LuDrill,
                      t: placed.totals.installUnits
                        ? "Доставка и монтаж"
                        : "Доставка",
                      d: placed.totals.installUnits
                        ? "1,5–2 часа, HILTI с пылеудалением"
                        : "по договорённости",
                    },
                    {
                      Icon: LuShieldCheck,
                      t: "Гарантия",
                      d: "5 лет на монтаж",
                    },
                  ].map(({ Icon, t, d }, n) => (
                    <li key={t} className="relative flex gap-4">
                      <span
                        className={`w-10 h-10 rounded-full grid place-items-center shrink-0 z-10 ${
                          n
                            ? "bg-white border border-line text-ink-3"
                            : "bg-brand-700 text-white"
                        }`}
                      >
                        <Icon className="w-[18px] h-[18px]" />
                      </span>
                      <span>
                        <b className="block">{t}</b>
                        <span className="text-sm text-ink-3">{d}</span>
                      </span>
                    </li>
                  ))}
                </ol>
                <div className="mt-8 pt-6 border-t border-line flex justify-between items-end">
                  <span className="text-ink-2">Сумма заказа</span>
                  <span className="text-h3 font-extrabold tnum">
                    {formatRub(shownTotals.total)}
                  </span>
                </div>
              </div>
            </div>
          ) : items.length === 0 ? (
            <EmptyCart />
          ) : step === 0 ? (
            /* ---------- Шаг 1: корзина ---------- */
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
              <div className="lg:col-span-8 min-w-0 space-y-4">
                {items.map((item) => (
                  <CartRow key={item.id} item={item} />
                ))}
                <Link href="/catalog" className="btn btn-ghost">
                  ← Продолжить покупки
                </Link>
              </div>
              <Summary
                totals={totals}
                cta={
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className="btn btn-primary w-full !h-14"
                  >
                    Перейти к оформлению{" "}
                    <LuArrowRight className="arrow w-5 h-5" />
                  </button>
                }
                mobileCta={
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className="btn btn-primary !h-12 !px-5"
                  >
                    Оформить <LuArrowRight className="arrow w-4 h-4" />
                  </button>
                }
              />
            </div>
          ) : (
            /* ---------- Шаг 2: контакты ---------- */
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
              <form
                id="order"
                onSubmit={handleSubmit(onSubmit)}
                className="lg:col-span-8 min-w-0 space-y-4"
                noValidate
              >
                <section className="rounded-card bg-white shadow-soft p-5 md:p-7">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-ink text-white grid place-items-center text-sm font-bold">
                      1
                    </span>
                    <h2 className="text-h4 font-bold">Контакты</h2>
                  </div>
                  <div className="mt-5 grid sm:grid-cols-2 gap-3">
                    <Input
                      {...register("name")}
                      label="Имя"
                      variant="bordered"
                      isInvalid={!!errors.name}
                      errorMessage={errors.name?.message}
                      classNames={inputClassNames}
                    />
                    <PhoneInput
                      control={control}
                      name="phone"
                      error={errors.phone?.message}
                    />
                  </div>
                  <div className="mt-5 text-sm font-semibold text-ink-2">
                    Как удобнее связаться?
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {CONTACT_METHODS.map((m) => chip(m, contact, setContact))}
                  </div>
                </section>

                <section className="rounded-card bg-white shadow-soft p-5 md:p-7">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-ink text-white grid place-items-center text-sm font-bold">
                      2
                    </span>
                    <h2 className="text-h4 font-bold">
                      {totals.installUnits ? "Адрес монтажа" : "Адрес доставки"}
                    </h2>
                  </div>
                  <div className="mt-5">
                    <Input
                      {...register("address")}
                      label="Улица, дом, квартира"
                      variant="bordered"
                      classNames={inputClassNames}
                    />
                  </div>
                  {totals.installUnits > 0 && (
                    <>
                      <div className="mt-5 text-sm font-semibold text-ink-2">
                        Когда удобно провести монтаж?
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {INSTALL_WHEN.map((w) => chip(w, when, setWhen))}
                      </div>
                      <div className="mt-4 rounded-2xl bg-brand-50 p-4 flex gap-3 text-sm text-ink-2">
                        <LuDrill className="w-[18px] h-[18px] text-brand-700 shrink-0" />
                        <span>
                          Монтаж {totals.installUnits}{" "}
                          {plural(
                            totals.installUnits,
                            "бризера",
                            "бризеров",
                            "бризеров",
                          )}
                          . Работаем инструментом HILTI с пылеудалением — чисто
                          и тихо.
                        </span>
                      </div>
                    </>
                  )}
                </section>

                <section className="rounded-card bg-white shadow-soft p-5 md:p-7">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-ink text-white grid place-items-center text-sm font-bold">
                      3
                    </span>
                    <h2 className="text-h4 font-bold">Комментарий</h2>
                    <span className="text-sm text-ink-3">необязательно</span>
                  </div>
                  <div className="mt-5">
                    <Textarea
                      {...register("comment")}
                      label="Тип стен, этаж, пожелания по месту установки"
                      variant="bordered"
                      minRows={3}
                      classNames={inputClassNames}
                    />
                  </div>
                  <div className="mt-5 flex items-start gap-1">
                    <Checkbox
                      {...register("privacyConsent")}
                      isInvalid={!!errors.privacyConsent}
                      classNames={{ wrapper: "after:bg-brand-700" }}
                      aria-label="Согласие на обработку персональных данных"
                    />
                    <span className="text-sm text-ink-2 pt-0.5">
                      Я даю{" "}
                      <a
                        href="/consent"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-brand-700"
                      >
                        согласие на обработку персональных данных
                      </a>{" "}
                      и принимаю{" "}
                      <a
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-brand-700"
                      >
                        политику конфиденциальности
                      </a>
                    </span>
                  </div>
                  {errors.privacyConsent && (
                    <p className="mt-2 text-sm text-[#D2553F]">
                      {errors.privacyConsent.message}
                    </p>
                  )}
                </section>

                <section className="rounded-card bg-air border border-line p-5 md:p-6">
                  <div className="flex items-center justify-between">
                    <b>Состав заказа</b>
                    <button
                      type="button"
                      onClick={() => go(0)}
                      className="text-sm font-semibold text-brand-700 hover:underline"
                    >
                      Изменить
                    </button>
                  </div>
                  <ul className="mt-3 divide-y divide-line">
                    {items.map((i) => {
                      const inst = pricing.getInstall(i.install);
                      return (
                        <li key={i.id} className="py-3 flex items-center gap-3">
                          {i.image && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={i.image}
                              alt=""
                              className="w-12 h-12 rounded-xl bg-white object-contain p-1"
                            />
                          )}
                          <span className="flex-1 min-w-0">
                            <b className="block text-sm truncate">
                              {i.name} × {i.qty}
                            </b>
                            <span
                              className={`text-xs ${inst ? "text-brand-700 font-semibold" : "text-ink-3"}`}
                            >
                              {inst
                                ? `✓ Монтаж: ${inst.name.toLowerCase()}`
                                : "Без монтажа"}
                            </span>
                          </span>
                          <span className="text-sm font-bold tnum">
                            {formatRub(calcTotals([i], pricing).total)}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </section>

                {sendError && (
                  <p className="rounded-2xl bg-[#FBEAE6] text-[#B2432F] p-4 text-sm font-semibold">
                    {sendError}
                  </p>
                )}
              </form>
              <Summary
                totals={totals}
                cta={
                  <button
                    form="order"
                    type="submit"
                    disabled={sending}
                    className="btn btn-primary w-full !h-14"
                  >
                    {sending ? "Отправляем…" : "Оформить заказ"}{" "}
                    <LuArrowRight className="arrow w-5 h-5" />
                  </button>
                }
                mobileCta={
                  <button
                    form="order"
                    type="submit"
                    disabled={sending}
                    className="btn btn-primary !h-12 !px-5"
                  >
                    {sending ? "…" : "Заказать"}
                  </button>
                }
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
