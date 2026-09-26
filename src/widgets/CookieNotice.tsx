"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-notice-accepted";

// Уведомление об использовании cookie и Яндекс.Метрики (152-ФЗ).
// Рендерится только после маунта, чтобы не ломать гидрацию из-за localStorage
const CookieNotice: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      // localStorage недоступен (приватный режим и т.п.) — уведомление не показываем
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed left-3 right-20 bottom-3 md:left-6 md:right-auto md:bottom-6 md:max-w-[460px] z-50 glass shadow-glass rounded-3xl p-4 flex items-start gap-3">
      <div className="w-10 h-10 shrink-0 rounded-full bg-sun-100 grid place-items-center text-lg" aria-hidden="true">
        🍪
      </div>
      <div className="flex-1">
        <p className="text-[13px] leading-snug text-ink-2">
          Мы используем файлы cookie и сервис аналитики Яндекс.Метрика, чтобы сайт работал корректно и
          становился удобнее. Оставаясь на сайте, вы соглашаетесь с обработкой cookie. Подробнее — в{" "}
          <Link href="/privacy" className="text-brand-700 font-semibold underline underline-offset-2">
            политике конфиденциальности
          </Link>
          .
        </p>
        <button type="button" onClick={accept} className="btn btn-sm mt-3 bg-ink text-white hover:bg-brand-900">
          Хорошо
        </button>
      </div>
    </div>
  );
};

export default CookieNotice;
