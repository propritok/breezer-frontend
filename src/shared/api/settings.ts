import { config } from '../config';

// Настройки сайта, которые редактируются в админке PocketBase:
//   settings       — одна запись: installDiscount (скидка на монтаж при покупке бризера, %)
//   install_prices — виды монтажа: code, title, hint, price, sort, active
//   socials        — мессенджеры: code (whatsapp | telegram | max), url, sort, active
// Если коллекции нет или PocketBase недоступен — используются значения по умолчанию ниже.

export interface InstallOption {
  id: string;
  name: string;
  price: number;
  hint: string;
}

export interface SocialLink {
  code: string;
  url: string;
}

export interface SiteSettings {
  installDiscount: number;
  installOptions: InstallOption[];
  socials: SocialLink[];
}

export const DEFAULT_SETTINGS: SiteSettings = {
  installDiscount: 20,
  installOptions: [
    { id: 'std', name: 'Стандарт', price: 10000, hint: 'Отверстие, канал, утепление, подключение' },
    { id: 'warm', name: 'С улучшенным утеплением канала', price: 12500, hint: 'Для угловых и холодных стен' },
    { id: 'slope', name: 'С выводом в откос', price: 15000, hint: 'Когда на фасад выходить нельзя' },
    { id: 'ready', name: 'На готовое отверстие', price: 6000, hint: 'Канал уже подготовлен' },
  ],
  // MAX временно отключён
  socials: [
    { code: 'whatsapp', url: config.contact.socials.whatsapp },
    { code: 'telegram', url: config.contact.socials.telegram },
  ],
};

interface PBList<T> {
  items: T[];
}

// null — коллекции нет / ошибка сети (берём значения по умолчанию)
async function fetchList<T>(collection: string, query = ''): Promise<T[] | null> {
  try {
    const res = await fetch(
      `${config.pocketbase.baseUrl}/collections/${collection}/records?perPage=100${query}`,
      { signal: AbortSignal.timeout(3000) },
    );
    if (!res.ok) return null;
    const data: PBList<T> = await res.json();
    return data.items;
  } catch {
    return null;
  }
}

async function load(): Promise<SiteSettings> {
  const [settings, prices, socials] = await Promise.all([
    fetchList<{ installDiscount?: number }>('settings'),
    fetchList<{ code: string; title: string; hint?: string; price: number }>(
      'install_prices',
      '&filter=(active=true)&sort=sort',
    ),
    fetchList<{ code: string; url: string }>('socials', '&filter=(active=true)&sort=sort'),
  ]);

  const discount = settings?.[0]?.installDiscount;
  const installOptions =
    prices && prices.length > 0
      ? prices.map((p) => ({ id: p.code, name: p.title, price: p.price, hint: p.hint ?? '' }))
      : DEFAULT_SETTINGS.installOptions;

  return {
    installDiscount:
      typeof discount === 'number' && discount >= 0 && discount < 100 ? discount : DEFAULT_SETTINGS.installDiscount,
    installOptions,
    // Если коллекция есть — показываем ровно то, что включено в админке (даже пустой список)
    socials: socials ? socials.filter((s) => s.url).map((s) => ({ code: s.code, url: s.url })) : DEFAULT_SETTINGS.socials,
  };
}

// Кэш на сервере, чтобы не ходить в PocketBase на каждый запрос страницы
const TTL_MS = 60_000;
let cache: { value: SiteSettings; at: number } | null = null;

export const settingsApi = {
  async get(): Promise<SiteSettings> {
    if (cache && Date.now() - cache.at < TTL_MS) return cache.value;
    const value = await load();
    cache = { value, at: Date.now() };
    return value;
  },
};
