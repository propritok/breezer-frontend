#!/usr/bin/env node
/**
 * Импорт частых вопросов (questions) в PocketBase из questions.import.json.
 *
 * Запуск (Node 20+):
 *   PB_TOKEN=xxx node scripts/pb-import-questions.js
 *
 * Опции через переменные окружения:
 *   PB_TOKEN — токен суперюзера (обязательно)
 *   PB_URL   — адрес PocketBase, по умолчанию https://bp.propritok.ru
 *
 * Скрипт идемпотентен: вопросы, текст которых уже есть в базе, пропускаются.
 */

const fs = require('fs');
const path = require('path');

const PB_URL = (process.env.PB_URL || 'https://bp.propritok.ru').replace(/\/$/, '');
const TOKEN = process.env.PB_TOKEN;

if (!TOKEN) {
  console.error('Не задан PB_TOKEN. Запуск: PB_TOKEN=xxx node scripts/pb-import-questions.js');
  process.exit(1);
}

const DATA_FILE = path.join(__dirname, '..', 'questions.import.json');
const records = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

const headers = { Authorization: TOKEN, 'Content-Type': 'application/json' };

async function fetchExistingQuestions() {
  const existing = new Set();
  let page = 1;
  for (;;) {
    const res = await fetch(
      `${PB_URL}/api/collections/questions/records?page=${page}&perPage=200&fields=question`,
      { headers }
    );
    if (!res.ok) throw new Error(`Не удалось получить список вопросов: ${res.status} ${await res.text()}`);
    const data = await res.json();
    data.items.forEach((i) => existing.add(i.question.trim()));
    if (page >= data.totalPages) break;
    page++;
  }
  return existing;
}

(async () => {
  console.log(`PocketBase: ${PB_URL}`);
  const existing = await fetchExistingQuestions();
  console.log(`В базе уже ${existing.size} вопросов.`);

  let ok = 0,
    skipped = 0,
    failed = 0;

  for (const rec of records) {
    if (existing.has(rec.question.trim())) {
      console.log(`- ${rec.question}: уже есть, пропускаю`);
      skipped++;
      continue;
    }
    process.stdout.write(`+ ${rec.question}... `);
    const res = await fetch(`${PB_URL}/api/collections/questions/records`, {
      method: 'POST',
      headers,
      body: JSON.stringify(rec),
    });
    if (res.ok) {
      console.log('OK');
      ok++;
    } else {
      console.log(`ОШИБКА: HTTP ${res.status}: ${await res.text()}`);
      failed++;
    }
  }

  console.log(`\nГотово: создано ${ok}, пропущено ${skipped}, ошибок ${failed}.`);
  if (failed) process.exit(1);
})();
