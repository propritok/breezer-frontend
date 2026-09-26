import { Airflow, config, MailAdress, PhoneNumber } from "@/shared";
import { useSocials } from "@/shared/ui/SocialLinks";
import Logo from "@/shared/ui/Logo";
import Link from "next/link";
import React from "react";

const columns = [
  {
    title: "Разделы",
    links: [
      { href: "/catalog", label: "Каталог бризеров" },
      { href: "/workprocess", label: "Процесс работы" },
      { href: "/about", label: "О нас" },
      { href: "/contact", label: "Контакты" },
    ],
  },
  {
    title: "Клиентам",
    links: [
      { href: "/cart", label: "Корзина" },
      { href: "/#reviews", label: "Отзывы" },
      { href: "/privacy", label: "Политика конфиденциальности" },
      { href: "/consent", label: "Согласие на обработку данных" },
    ],
  },
];

const Footer: React.FC = () => {
  const socials = useSocials();
  return (
    <footer className="relative mt-8 overflow-hidden rounded-t-[40px] md:rounded-t-[56px] bg-brand-950 text-white/80">
      <Airflow className="absolute inset-0 w-full h-full" height={500} opacity={0.18} />
      <div className="relative mx-auto max-w-page px-5 md:px-8 pt-16 md:pt-24 pb-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Logo height={34} />
              <span className="font-extrabold tracking-[0.14em] text-[15px] text-white">PROPRITOK</span>
            </Link>
            <p className="mt-6 text-2xl md:text-[32px] leading-tight font-light tracking-[-0.02em] text-white max-w-md">
              Дышите свободно.{" "}
              <span className="text-brand-300 font-semibold">Остальное мы&nbsp;возьмём на&nbsp;себя.</span>
            </p>
            <div className="mt-8 flex gap-2">
              {socials.map(({ href, label, bg, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Написать в ${label}`}
                  className={`${bg} w-11 h-11 rounded-full grid place-items-center text-white transition hover:-translate-y-0.5`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="md:col-span-2 text-sm">
              <div className="text-xs uppercase tracking-[0.14em] text-white/40 font-bold mb-4">{col.title}</div>
              <ul className="space-y-3 font-semibold">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-white transition">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-3 text-sm">
            <div className="text-xs uppercase tracking-[0.14em] text-white/40 font-bold mb-4">Связаться</div>
            <PhoneNumber className="block text-2xl font-extrabold text-white tnum tracking-[-0.02em]" />
            <MailAdress className="block mt-2 font-semibold hover:text-white" />
            <p className="mt-4 text-white/50">
              {config.contact.address}
              <br />
              Пн–Пт {config.contact.workingHours.weekdays}
              <br />
              Сб–Вс {config.contact.workingHours.weekends}
            </p>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col lg:flex-row gap-3 justify-between text-xs text-white/40">
          <span>&copy; {new Date().getFullYear()} PROPRITOK. Все права защищены.</span>
          <span className="flex flex-col md:flex-row gap-1 md:gap-4">
            <span>ИП Смирнов Илья Вячеславович</span>
            <span>ОГРНИП: 318774600572015</span>
            <span>ИНН: 772301109753</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
