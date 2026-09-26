#!/usr/bin/env node
/**
 * Настройка PocketBase для управления сайтом из админки:
 *   - коллекция settings        — одна запись: installDiscount (скидка на монтаж при покупке бризера, %)
 *   - коллекция install_prices  — виды монтажа: code, title, hint, price, sort, active
 *   - коллекция socials         — мессенджеры: code (whatsapp | telegram | max), url, sort, active
 *   - поле breezers.oldPrice    — старая цена (если больше текущей, на сайте она будет перечёркнута)
 *
 * Все коллекции открыты только на чтение (listRule/viewRule = ""), менять их может только суперюзер.
 *
 * Запуск (Node 18+):
 *   PB_TOKEN=xxx node scripts/pb-setup-settings.js
 *
 * Опции через переменные окружения:
 *   PB_TOKEN — токен суперюзера (обязательно)
 *   PB_URL   — адрес PocketBase, по умолчанию https://bp.propritok.ru
 *
 * Скрипт идемпотентен: существующие коллекции, поля и записи не трогает.
 */

const PB_URL = (process.env.PB_URL || 'https://bp.propritok.ru').replace(/\/$/, '');
const TOKEN = process.env.PB_TOKEN;

if (!TOKEN) {
  console.error('Не задан PB_TOKEN. Запуск: PB_TOKEN=xxx node scripts/pb-setup-settings.js');
  process.exit(1);
}

const headers = { Authorization: TOKEN, 'Content-Type': 'application/json' };

const api = async (method, path, body) => {
  const res = await fetch(`${PB_URL}/api${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  return { ok: res.ok, status: res.status, data };
};

const text = (name, required = false) => ({ name, type: 'text', required });
const number = (name, extra = {}) => ({ name, type: 'number', required: false, ...extra });
const bool = (name) => ({ name, type: 'bool', required: false });
const autodates = [
  { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
  { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
];

const COLLECTIONS = [
  {
    name: 'settings',
    fields: [number('installDiscount', { min: 0, max: 99 }), ...autodates],
    seed: [{ installDiscount: 20 }],
  },
  {
    name: 'install_prices',
    fields: [
      text('code', true),
      text('title', true),
      text('hint'),
      number('price', { required: true, min: 0 }),
      number('sort'),
      bool('active'),
      ...autodates,
    ],
    seed: [
      { code: 'std', title: 'Стандарт', hint: 'Отверстие, канал, утепление, подключение', price: 10000, sort: 1, active: true },
      { code: 'warm', title: 'С улучшенным утеплением канала', hint: 'Для угловых и холодных стен', price: 12500, sort: 2, active: true },
      { code: 'slope', title: 'С выводом в откос', hint: 'Когда на фасад выходить нельзя', price: 15000, sort: 3, active: true },
      { code: 'ready', title: 'На готовое отверстие', hint: 'Канал уже подготовлен', price: 6000, sort: 4, active: true },
    ],
  },
  {
    name: 'socials',
    fields: [text('code', true), { name: 'url', type: 'url', required: true }, number('sort'), bool('active'), ...autodates],
    seed: [
      { code: 'whatsapp', url: 'https://wa.me/79295850880', sort: 1, active: true },
      { code: 'telegram', url: 'https://t.me/+79295850880', sort: 2, active: true },
      // MAX временно выключен — включите галочку active, когда починится
      {
        code: 'max',
        url: 'https://max.ru/u/f9LHodD0cOK687ETvXAmHyHNUJZFXr81A_yFYyz6piZ3xmUyVhzNyeld29s',
        sort: 3,
        active: false,
      },
    ],
  },
];

async function ensureCollection({ name, fields, seed }) {
  const existing = await api('GET', `/collections/${name}`);
  if (existing.ok) {
    console.log(`= коллекция ${name} уже есть`);
  } else {
    const created = await api('POST', '/collections', {
      name,
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: null,
      updateRule: null,
      deleteRule: null,
      fields,
    });
    if (!created.ok) throw new Error(`Не удалось создать ${name}: ${created.status} ${JSON.stringify(created.data)}`);
    console.log(`+ создана коллекция ${name}`);
  }

  const records = await api('GET', `/collections/${name}/records?perPage=1`);
  if (records.ok && records.data.totalItems > 0) {
    console.log(`  записи в ${name} уже есть (${records.data.totalItems}), пропускаю заполнение`);
    return;
  }
  for (const rec of seed) {
    const r = await api('POST', `/collections/${name}/records`, rec);
    if (!r.ok) throw new Error(`Не удалось добавить запись в ${name}: ${r.status} ${JSON.stringify(r.data)}`);
  }
  console.log(`  добавлено записей: ${seed.length}`);
}

async function ensureOldPriceField() {
  const col = await api('GET', '/collections/breezers');
  if (!col.ok) throw new Error(`Не удалось получить коллекцию breezers: ${col.status}`);
  if (col.data.fields.some((f) => f.name === 'oldPrice')) {
    console.log('= поле breezers.oldPrice уже есть');
    return;
  }
  const r = await api('PATCH', '/collections/breezers', {
    fields: [...col.data.fields, { name: 'oldPrice', type: 'number', required: false, min: 0 }],
  });
  if (!r.ok) throw new Error(`Не удалось добавить поле oldPrice: ${r.status} ${JSON.stringify(r.data)}`);
  console.log('+ добавлено поле breezers.oldPrice');
}

(async () => {
  console.log(`PocketBase: ${PB_URL}`);
  for (const c of COLLECTIONS) await ensureCollection(c);
  await ensureOldPriceField();
  console.log('Готово. Сайт подхватит изменения в течение минуты (кэш настроек — 60 секунд).');
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
