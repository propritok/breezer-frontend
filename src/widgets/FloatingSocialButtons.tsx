"use client";

import { useSocials } from "@/shared/ui/SocialLinks";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LuMessageCircle, LuX } from "react-icons/lu";

// Плавающие кнопки мессенджеров: на десктопе раскрыты, на мобиле свёрнуты в одну кнопку-чат
const FloatingSocialButtons: React.FC = () => {
  const [open, setOpen] = useState(false);
  const buttons = useSocials();
  // В корзине на мобиле снизу закреплена плашка с итогом — поднимаемся над ней
  const onCart = usePathname() === "/cart";

  useEffect(() => {
    setOpen(window.innerWidth >= 768);
  }, []);

  if (buttons.length === 0) return null;

  return (
    <div
      className={`fixed right-4 md:right-6 z-40 flex flex-col items-end gap-2.5 ${
        onCart ? "bottom-28 lg:bottom-6" : "bottom-4 md:bottom-6"
      }`}
    >
      <div
        className={`flex flex-col gap-2.5 origin-bottom transition-all duration-300 ${
          open ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        {buttons.map(({ href, label, bg, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Написать в ${label}`}
            title={`Написать в ${label}`}
            className={`${bg} flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lift transition-transform hover:-translate-y-0.5 hover:scale-105`}
          >
            <Icon className="h-6 w-6" />
          </a>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Скрыть мессенджеры" : "Написать нам"}
        aria-expanded={open}
        className="relative w-14 h-14 rounded-full bg-brand-700 text-white shadow-glow grid place-items-center transition-transform hover:scale-105"
      >
        {!open && <span className="pulse-ring" />}
        {open ? <LuX className="w-6 h-6" /> : <LuMessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default FloatingSocialButtons;
