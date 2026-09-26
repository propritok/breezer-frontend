#!/usr/bin/env node
/**
 * Импорт товаров (breezers) в PocketBase из breezers.import.json,
 * включая скачивание фото с сайта-донора и загрузку их в файловое поле images.
 *
 * Запуск (Node 18+, лучше 20+):
 *   PB_TOKEN=xxx node scripts/pb-import-breezers.js
 *
 * Опции через переменные окружения:
 *   PB_TOKEN   — токен суперюзера (обязательно)
 *   PB_URL     — адрес PocketBase, по умолчанию https://bp.propritok.ru
 *   SKIP_IMAGES=1 — импортировать без фото
 *
 * Скрипт идемпотентен: товары, у которых modelNameEn уже есть в базе, пропускаются.
 */

const fs = require('fs');
const path = require('path');

const PB_URL = (process.env.PB_URL || 'https://bp.propritok.ru').replace(/\/$/, '');
const TOKEN = process.env.PB_TOKEN;
const SKIP_IMAGES = process.env.SKIP_IMAGES === '1';

if (!TOKEN) {
  console.error('Не задан PB_TOKEN. Запуск: PB_TOKEN=xxx node scripts/pb-import-breezers.js');
  process.exit(1);
}

const DATA_FILE = path.join(__dirname, '..', 'breezers.import.json');
const records = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

const headers = { Authorization: TOKEN };

async function fetchExistingNames() {
  const names = new Set();
  let page = 1;
  for (; ;) {
    const res = await fetch(
      `${PB_URL}/api/collections/breezers/records?page=${page}&perPage=200&fields=modelNameEn`,
      { headers }
    );
    if (!res.ok) throw new Error(`Не удалось получить список товаров: ${res.status} ${await res.text()}`);
    const data = await res.json();
    data.items.forEach((i) => names.add(i.modelNameEn));
    if (page >= data.totalPages) break;
    page++;
  }
  return names;
}

async function downloadImage(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) {
      console.warn(`    ! фото ${url} -> HTTP ${res.status}, пропускаю`);
      return null;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const filename = decodeURIComponent(new URL(url).pathname.split('/').pop() || 'image.webp');
    const ext = filename.split('.').pop().toLowerCase();
    const mime =
      { webp: 'image/webp', jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', gif: 'image/gif', avif: 'image/avif' }[ext] ||
      'application/octet-stream';
    return new File([buf], filename, { type: mime });
  } catch (e) {
    console.warn(`    ! фото ${url} -> ${e.message}, пропускаю`);
    return null;
  }
}

async function createRecord(rec) {
  const form = new FormData();
  form.append('brand', rec.brand);
  form.append('modelNameEn', rec.modelNameEn);
  form.append('modelNameRu', rec.modelNameRu);
  form.append('description', rec.description);
  form.append('price', String(rec.price));
  form.append('inStock', String(rec.inStock));
  form.append('isPopular', String(rec.isPopular));
  form.append('spec', JSON.stringify(rec.spec));

  if (!SKIP_IMAGES) {
    for (const url of rec.imageUrls || []) {
      const file = await downloadImage(url);
      if (file) form.append('images', file);
    }
  }

  const res = await fetch(`${PB_URL}/api/collections/breezers/records`, {
    method: 'POST',
    headers,
    body: form,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
}

(async () => {
  console.log(`PocketBase: ${PB_URL}`);
  const existing = await fetchExistingNames();
  console.log(`В базе уже ${existing.size} товаров.`);

  let ok = 0,
    skipped = 0,
    failed = 0;

  for (const rec of records) {
    if (existing.has(rec.modelNameEn)) {
      console.log(`- ${rec.modelNameEn}: уже есть, пропускаю`);
      skipped++;
      continue;
    }
    process.stdout.write(`+ ${rec.modelNameEn} (${(rec.imageUrls || []).length} фото)... `);
    try {
      await createRecord(rec);
      console.log('OK');
      ok++;
    } catch (e) {
      console.log(`ОШИБКА: ${e.message}`);
      failed++;
    }
  }

  console.log(`\nГотово: создано ${ok}, пропущено ${skipped}, ошибок ${failed}.`);
  if (failed) process.exit(1);
})();
