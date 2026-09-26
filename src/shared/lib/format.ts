// PocketBase отдаёт цену числом, а productsApi превращает её в строку «57100 руб.»
export const parsePrice = (price?: string | number): number => {
  if (typeof price === 'number') return price;
  return Number(String(price ?? '').replace(/[^\d]/g, '')) || 0;
};

// 58140 → «58 140 ₽» с неразрывными пробелами, чтобы цена не переносилась
export const formatRub = (value: number): string =>
  `${Math.round(value).toLocaleString('ru-RU').replace(/[,\s]/g, ' ')} ₽`;

export const plural = (n: number, one: string, few: string, many: string): string => {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
  return many;
};
