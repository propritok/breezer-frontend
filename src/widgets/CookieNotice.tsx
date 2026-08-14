"use client";

import { Button } from "@heroui/react";
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
    <div className="fixed bottom-4 left-4 right-20 md:right-auto md:max-w-md z-50 rounded-lg bg-gray-900 text-white shadow-xl p-4">
      <p className="text-sm leading-relaxed text-gray-200">
        Мы используем файлы cookie и сервис аналитики Яндекс.Метрика, чтобы сайт
        работал корректно и становился удобнее. Оставаясь на сайте, вы
        соглашаетесь с обработкой cookie. Подробнее — в{" "}
        <Link
          href="/privacy"
          className="underline text-[var(--secondary-color)]"
        >
          политике конфиденциальности
        </Link>
        .
      </p>
      <Button
        size="sm"
        onPress={accept}
        className="mt-3 bg-[var(--secondary-color)] text-white"
      >
        Хорошо
      </Button>
    </div>
  );
};

export default CookieNotice;
