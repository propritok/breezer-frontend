"use client";

import { config } from "@/shared";
import { MaxBubbleIcon } from "@/shared/ui/SocialLinks";
import React from "react";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

const buttons = [
  {
    href: config.contact.socials.whatsapp,
    label: "Написать в WhatsApp",
    className: "bg-[#25D366]",
    iconClassName: "h-6 w-6",
    Icon: FaWhatsapp,
  },
  {
    href: config.contact.socials.telegram,
    label: "Написать в Telegram",
    className: "bg-[#229ED9]",
    iconClassName: "h-6 w-6",
    Icon: FaTelegramPlane,
  },
  {
    // Белый пузырь MAX на круге с фирменным градиентом — в стиле остальных кнопок
    href: config.contact.socials.max,
    label: "Написать в MAX",
    className: "bg-gradient-to-tr from-[#44ccff] via-[#5533ee] to-[#9933dd]",
    iconClassName: "h-6 w-6",
    Icon: MaxBubbleIcon,
  },
];

// Плавающие кнопки мессенджеров: видны на всех страницах, справа снизу
const FloatingSocialButtons: React.FC = () => {
  return (
    <div className="fixed bottom-5 right-4 md:bottom-6 md:right-6 z-40 flex flex-col gap-3">
      {buttons.map(({ href, label, className, iconClassName, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={`${className} flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110`}
        >
          <Icon className={iconClassName} />
        </a>
      ))}
    </div>
  );
};

export default FloatingSocialButtons;
