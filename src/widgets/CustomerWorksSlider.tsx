"use client";

import { Reveal } from "@/shared/lib/useReveal";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

// Сначала самые «интерьерные» кадры, дальше остальные
const workImages = [
  "/work/IMG_3141.jpg",
  "/work/IMG_9708.jpg",
  "/work/IMG_2068.jpg",
  "/work/IMG_3164.jpg",
  "/work/IMG_9951.jpg",
  "/work/IMG_2480.jpg",
  "/work/IMG_1392.jpg",
  "/work/IMG_2255.jpg",
  "/work/IMG_3143.jpg",
  "/work/IMG_2845.jpg",
  "/work/IMG_9949.jpg",
  "/work/IMG_1846.jpg",
  "/work/IMG_0868.jpg",
  "/work/IMG_0198.jpg",
  "/work/IMG_2955.jpg",
  "/work/IMG_0549.jpg",
  "/work/IMG_0684.jpg",
  "/work/IMG_2027.jpg",
  "/work/IMG_3162.jpg",
  "/work/IMG_2544.jpg",
  "/work/IMG_2664.jpg",
  "/work/IMG_0828.jpg",
  "/work/IMG_2667.jpg",
  "/work/IMG_2954.jpg",
];

// Слайдер выполненных работ: нативный scroll-snap, карточки со смещением по высоте
const CustomerWorksSlider: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 800), behavior: "smooth" });
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <Reveal className="mx-auto max-w-page px-5 md:px-8 flex items-end justify-between gap-6 mb-8 md:mb-12">
        <div>
          <span className="eyebrow">Наши работы</span>
          <h2 className="mt-4 section-title">Уже дышат свободно</h2>
        </div>
        <div className="hidden md:flex gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Назад"
            className="w-14 h-14 rounded-full border border-line bg-white grid place-items-center hover:border-brand-700 hover:text-brand-700 transition"
          >
            <LuArrowLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Вперёд"
            className="w-14 h-14 rounded-full bg-ink text-white grid place-items-center hover:bg-brand-700 transition"
          >
            <LuArrowRight className="w-5 h-5" />
          </button>
        </div>
      </Reveal>

      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex gap-4 md:gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory px-5 md:px-[max(2rem,calc((100vw-1280px)/2+2rem))] pb-4"
      >
        {workImages.map((src, idx) => (
          <figure
            key={src}
            className={`group card-hover relative shrink-0 snap-start w-[78vw] sm:w-[360px] md:w-[380px] aspect-[3/4] rounded-card overflow-hidden bg-sand ${
              idx % 2 ? "md:mt-12" : ""
            }`}
          >
            <Image
              src={src}
              alt={`Установленный бризер, работа ${idx + 1}`}
              fill
              sizes="(max-width: 640px) 78vw, 380px"
              className="zoom object-cover"
              priority={idx < 2}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </figure>
        ))}
      </div>

      <div className="mx-auto max-w-page px-5 md:px-8 mt-6 flex items-center gap-3">
        <div className="h-1 flex-1 max-w-[240px] rounded-full bg-line overflow-hidden">
          <div
            className="h-full rounded-full bg-brand-700 transition-[width] duration-200"
            style={{ width: `${Math.max(10, progress * 100)}%` }}
          />
        </div>
        <span className="text-sm font-semibold text-ink-3 tnum">{workImages.length} объектов</span>
      </div>
    </section>
  );
};

export default CustomerWorksSlider;
