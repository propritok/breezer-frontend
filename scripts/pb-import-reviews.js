#!/usr/bin/env node
/**
 * Импорт отзывов (reviews) в PocketBase из reviews.import.json.
 *
 * Запуск (Node 20+):
 *   PB_TOKEN=xxx node scripts/pb-import-reviews.js
 *
 * Опции через переменные окружения:
 *   PB_TOKEN — токен суперюзера (обязательно)
 *   PB_URL   — адрес PocketBase, по умолчанию https://bp.propritok.ru
 *
 * Скрипт идемпотентен (upsert): отзыв ищется по имени клиента —
 * если найден, запись обновляется данными из дампа, если нет — создаётся.
 */

const fs = require('fs');
const path = require('path');

const PB_URL = (process.env.PB_URL || 'https://bp.propritok.ru').replace(/\/$/, '');
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uSWQiOiJwYmNfMzE0MjYzNTgyMyIsImV4cCI6MTc4NTY2MzkxNiwiaWQiOiJlbjBmenQxcHRtM2ZocG4iLCJyZWZyZXNoYWJsZSI6dHJ1ZSwidHlwZSI6ImF1dGgifQ.EResVUrxvPh6NIDKduoU5HTJ_tnmY4MQixoXt_jOFiA';

if (!TOKEN) {
  console.error('Не задан PB_TOKEN. Запуск: PB_TOKEN=xxx node scripts/pb-import-reviews.js');
  process.exit(1);
}

const DATA_FILE = path.join(__dirname, '..', 'reviews.import.json');
const records = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

const headers = { Authorization: TOKEN, 'Content-Type': 'application/json' };

async function fetchExisting() {
  const byCustomer = new Map();
  let page = 1;
  for (;;) {
    const res = await fetch(
      `${PB_URL}/api/collections/reviews/records?page=${page}&perPage=200`,
      { headers }
    );
    if (!res.ok) throw new Error(`Не удалось получить список отзывов: ${res.status} ${await res.text()}`);
    const data = await res.json();
    data.items.forEach((i) => byCustomer.set((i.customer || '').trim(), i));
    if (page >= data.totalPages) break;
    page++;
  }
  return byCustomer;
}

(async () => {
  console.log(`PocketBase: ${PB_URL}`);
  const existing = await fetchExisting();
  console.log(`В базе уже ${existing.size} отзывов.`);

  let created = 0,
    updated = 0,
    failed = 0;

  for (const rec of records) {
    const found = existing.get((rec.customer || '').trim());
    const url = found
      ? `${PB_URL}/api/collections/reviews/records/${found.id}`
      : `${PB_URL}/api/collections/reviews/records`;
    process.stdout.write(`${found ? '~ обновляю' : '+ создаю'} ${rec.customer} (${rec.date})... `);
    const res = await fetch(url, {
      method: found ? 'PATCH' : 'POST',
      headers,
      body: JSON.stringify(rec),
    });
    if (res.ok) {
      console.log('OK');
      found ? updated++ : created++;
    } else {
      console.log(`ОШИБКА: HTTP ${res.status}: ${await res.text()}`);
      failed++;
    }
  }

  console.log(`\nГотово: создано ${created}, обновлено ${updated}, ошибок ${failed}.`);
  if (failed) process.exit(1);
})();
