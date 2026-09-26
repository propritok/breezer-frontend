"use client";

import { ContactCTAButton } from "@/features";
import { useCart } from "@/features/cart";
import { config, PhoneNumber } from "@/shared";
import Logo from "@/shared/ui/Logo";
import { Drawer, DrawerBody, DrawerContent, DrawerHeader } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LuMenu, LuPhone, LuShoppingCart, LuX } from "react-icons/lu";

type NavItem = { href: string; label: string };

const navItems: NavItem[] = [
  { href: "/catalog", label: "Каталог" },
  { href: "/workprocess", label: "Процесс работы" },
  { href: "/about", label: "О нас" },
  { href: "/contact", label: "Контакты" },
];

const phoneHref = `tel:${config.contact.phone}`;

const CartButton: React.FC = () => {
  const { totals, ready } = useCart();
  const count = ready ? totals.units : 0;
  return (
    <Link
      href="/cart"
      aria-label={count ? `Корзина, товаров: ${count}` : "Корзина"}
      className="relative w-11 h-11 md:w-12 md:h-12 rounded-full bg-white border border-line grid place-items-center hover:border-brand-700 hover:text-brand-700 transition"
    >
      <LuShoppingCart className="w-5 h-5" />
      {count > 0 && (
        <span
          key={count}
          className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-brand-700 text-white text-[11px] font-extrabold grid place-items-center ring-2 ring-white animate-[fadeIn_.4s_ease]"
        >
          {count}
        </span>
      )}
    </Link>
  );
};

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Блокируем скролл боди, когда открыт Drawer
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 px-3 md:px-6 pt-3">
      <div className="glass shadow-soft mx-auto max-w-page rounded-full h-16 pl-4 pr-2 md:pl-6 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Propritok — на главную">
          <Logo height={30} />
          <span className="font-extrabold tracking-[0.14em] text-[15px] text-ink">PROPRITOK</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8 mx-auto text-[15px] font-semibold text-ink-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link transition ${isActive(item.href) ? "active text-ink" : "hover:text-ink"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto lg:ml-0 flex items-center gap-2">
          <div className="hidden md:flex flex-col items-end leading-tight mr-2">
            <PhoneNumber className="font-extrabold text-[15px] tnum" />
            <span className="text-xs text-ink-3">Пн–Пт {config.contact.workingHours.weekdays}</span>
          </div>
          <a
            href={phoneHref}
            className="md:hidden w-11 h-11 rounded-full bg-brand-50 text-brand-700 grid place-items-center"
            aria-label="Позвонить"
          >
            <LuPhone className="w-[18px] h-[18px]" />
          </a>
          <CartButton />
          <ContactCTAButton
            label="Заявка"
            formButtonLabel="Заказать звонок"
            modalTitle="Заказать звонок"
            className="hidden sm:inline-flex h-12 min-w-0 px-5 rounded-full font-bold"
          />
          <button
            type="button"
            className="lg:hidden w-11 h-11 rounded-full bg-ink text-white grid place-items-center"
            aria-label="Открыть меню"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <LuMenu className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        closeButton={<>{null}</>}
        isOpen={open}
        onOpenChange={setOpen}
        placement="right"
        size="sm"
        className="lg:hidden rounded-l-[32px] bg-air"
      >
        <DrawerContent>
          <DrawerHeader className="px-6 pt-6">
            <div className="flex w-full items-center justify-between">
              <Link href="/" onClick={closeMenu} className="flex items-center gap-2">
                <Logo height={28} />
                <span className="font-extrabold tracking-[0.14em] text-sm text-ink">PROPRITOK</span>
              </Link>
              <button
                type="button"
                onClick={closeMenu}
                className="w-10 h-10 rounded-full bg-white border border-line grid place-items-center"
                aria-label="Закрыть меню"
              >
                <LuX className="w-5 h-5" />
              </button>
            </div>
          </DrawerHeader>

          <DrawerBody className="px-6 py-4 flex flex-col">
            <nav>
              <ul className="space-y-1">
                {[{ href: "/", label: "Главная" }, ...navItems, { href: "/cart", label: "Корзина" }].map(
                  (item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className={`block rounded-2xl px-4 py-3 text-[22px] font-bold tracking-[-0.02em] transition ${
                          isActive(item.href) ? "bg-white text-brand-700 shadow-soft" : "text-ink hover:bg-white"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <div className="mt-auto pt-6 space-y-3">
              <PhoneNumber className="block text-2xl font-extrabold tnum text-ink" />
              <p className="text-sm text-ink-3">
                Пн–Пт {config.contact.workingHours.weekdays}, Сб–Вс {config.contact.workingHours.weekends}
              </p>
              <ContactCTAButton
                label="Заказать звонок"
                formButtonLabel="Заказать звонок"
                modalTitle="Заказать звонок"
                className="w-full h-14 rounded-full font-bold"
              />
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </header>
  );
};

export default Header;
