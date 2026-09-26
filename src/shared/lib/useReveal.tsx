'use client';

import React, { useEffect, useRef, useState } from 'react';

// Плавное появление секции при скролле (классы .reveal/.in в globals.css)
export const Reveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
}> = ({ children, className = '', delay = 0, as: Tag = 'div' }) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Component = Tag as any;
  return (
    <Component
      ref={ref}
      className={`reveal ${visible ? 'in' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay * 0.08}s` } : undefined}>
      {children}
    </Component>
  );
};
