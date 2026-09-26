'use client';

import { ProductShort } from '@/entities/Product';
import { parsePrice } from '@/shared/lib/format';
import { useSiteSettings } from '@/shared/lib/siteSettings';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { InstallId } from './install';

export interface CartItem {
  id: string;
  name: string;
  brand?: string;
  image?: string;
  price: number;
  oldPrice?: number;
  inStock?: boolean;
  qty: number;
  install: InstallId | null;
}

export interface CartTotals {
  units: number;
  goods: number;
  installUnits: number;
  install: number;
  installFull: number;
  saving: number;
  total: number;
}

interface CartContextValue {
  items: CartItem[];
  totals: CartTotals;
  ready: boolean;
  lastAdded: CartItem | null;
  add(product: ProductShort, install?: InstallId | null): void;
  setQty(id: string, qty: number): void;
  setInstall(id: string, install: InstallId | null): void;
  remove(id: string): void;
  clear(): void;
  dismissToast(): void;
}

const STORAGE_KEY = 'propritok-cart';
const CartContext = createContext<CartContextValue | null>(null);

type InstallPricing = Pick<ReturnType<typeof useSiteSettings>, 'getInstall' | 'discountedInstallPrice'>;

export const calcTotals = (items: CartItem[], pricing: InstallPricing): CartTotals => {
  const t = items.reduce(
    (acc, i) => {
      acc.units += i.qty;
      acc.goods += i.price * i.qty;
      if (i.install) {
        acc.installUnits += i.qty;
        acc.install += pricing.discountedInstallPrice(i.install) * i.qty;
        acc.installFull += (pricing.getInstall(i.install)?.price ?? 0) * i.qty;
      }
      return acc;
    },
    { units: 0, goods: 0, installUnits: 0, install: 0, installFull: 0 },
  );
  return { ...t, saving: t.installFull - t.install, total: t.goods + t.install };
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [lastAdded, setLastAdded] = useState<CartItem | null>(null);
  const pricing = useSiteSettings();

  // localStorage читаем только после маунта, чтобы не ломать гидрацию
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {
      // повреждённые данные или недоступный localStorage — начинаем с пустой корзины
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, ready]);

  const add = useCallback((product: ProductShort, installId?: InstallId | null) => {
    if (!product.id) return;
    // По умолчанию кладём с первым видом монтажа из админки
    const install = installId === undefined ? pricing.defaultInstallId : installId;
    const next: CartItem = {
      id: product.id,
      name: product.modelNameEn || product.modelNameRu || 'Бризер',
      brand: product.brand,
      image: product.images?.[0],
      price: parsePrice(product.price),
      ...(product.oldPrice ? { oldPrice: product.oldPrice } : {}),
      inStock: product.inStock,
      qty: 1,
      install,
    };
    setItems((prev) => {
      const existing = prev.find((i) => i.id === next.id);
      if (existing) return prev.map((i) => (i.id === next.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, next];
    });
    setLastAdded({ ...next });
  }, [pricing.defaultInstallId]);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)));
  }, []);

  const setInstall = useCallback((id: string, install: InstallId | null) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, install } : i)));
  }, []);

  const remove = useCallback((id: string) => setItems((prev) => prev.filter((i) => i.id !== id)), []);
  const clear = useCallback(() => setItems([]), []);
  const dismissToast = useCallback(() => setLastAdded(null), []);

  const value = useMemo(
    () => ({
      items,
      totals: calcTotals(items, pricing),
      ready,
      lastAdded,
      add,
      setQty,
      setInstall,
      remove,
      clear,
      dismissToast,
    }),
    [items, pricing, ready, lastAdded, add, setQty, setInstall, remove, clear, dismissToast],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart должен использоваться внутри CartProvider');
  return ctx;
};
