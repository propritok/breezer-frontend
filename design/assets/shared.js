/* Propritok redesign — shared markup (header, footer, product card, logo, icons) + motion. */

const PHONE = '+7 (929) 585-08-80';
const PHONE_HREF = 'tel:+79295850880';
const MAIL = 'propritok@yandex.ru';
const PB = 'https://bp.propritok.ru/api/files/pbc_1529214369/';
const WORK = (n) => `../public/work/IMG_${n}.jpg`;

/* ---------- Logo (same geometry as src/shared/ui/Logo.tsx, bg removed) ---------- */
function logoSVG(size = 44) {
  return `<svg class="logo" width="${size * 1.23}" height="${size}" viewBox="0 0 202 164" fill="none" aria-hidden="true">
    <rect class="cable" x="7.25" y="64.98" width="50.5" height="6.5" rx="3.25" fill="#2EB1B0"/>
    <rect class="cable" x="0.25" y="77.98" width="50.5" height="6.5" rx="3.25" fill="#2EB1B0"/>
    <rect class="cable" x="7.25" y="90.98" width="50.5" height="6.5" rx="3.25" fill="#2EB1B0"/>
    <path fill-rule="evenodd" fill="#2EB1B0" stroke="#109C93" stroke-width="2" d="M165.29 12C181.858 12 195.29 25.43 195.29 42V121.31C195.29 137.88 181.86 151.31 165.29 151.31H75.29C58.72 151.31 45.29 137.88 45.29 121.31V42C45.29 25.43 58.72 12 75.29 12H165.29ZM120.29 20.61C86.58 20.61 59.25 47.94 59.25 81.65C59.25 115.37 86.58 142.7 120.29 142.7C154 142.7 181.33 115.37 181.33 81.65C181.33 47.94 154 20.61 120.29 20.61Z"/>
    <g class="blades" fill="#2EB1B0" stroke="#109C93">
      <path d="M92.5 121.73C91.5 122.73 91.62 124.71 92 126.23C92.38 127.74 96.91 130.47 101.5 132.23C106.09 133.99 115.5 135.23 115.5 135.23C115.5 135.23 123.62 136.09 127.5 134.23C131.38 132.37 132.42 129.6 134 125.73C135.58 121.86 135.17 117.62 134.5 111.73C133.83 105.84 129 95.73 129 95.73L114.5 97.23C114.49 97.25 111.61 103.53 107.5 108.73C103.39 113.94 93.5 120.73 92.5 121.73Z"/>
      <path d="M79.7 53.51C78.7 52.51 76.71 52.62 75.2 53.01C73.68 53.39 70.96 57.92 69.2 62.51C67.44 67.1 66.2 76.51 66.2 76.51C66.2 76.51 65.34 84.63 67.2 88.51C69.06 92.38 71.83 93.43 75.7 95.01C79.57 96.58 83.81 96.17 89.7 95.51C95.59 94.84 105.7 90.01 105.7 90.01L104.2 75.51C104.2 75.51 97.91 72.62 92.7 68.51C87.48 64.39 80.7 54.51 79.7 53.51Z"/>
      <path d="M160 109.32C161 110.32 162.99 110.2 164.5 109.82C166.01 109.44 168.74 104.91 170.5 100.32C172.26 95.73 173.5 86.32 173.5 86.32C173.5 86.32 174.36 78.2 172.5 74.32C170.64 70.44 167.87 69.4 164 67.82C160.13 66.24 155.89 66.65 150 67.32C144.11 67.99 134 72.82 134 72.82L135.5 87.32C135.5 87.32 141.79 90.2 147 94.32C152.21 98.44 159 108.32 160 109.32Z"/>
      <path d="M148.59 41.43C149.59 40.43 149.47 38.44 149.09 36.93C148.71 35.41 144.18 32.68 139.59 30.93C135 29.17 125.59 27.93 125.59 27.93C125.59 27.93 117.47 27.07 113.59 28.93C109.71 30.78 108.67 33.56 107.09 37.43C105.52 41.3 105.93 45.53 106.59 51.43C107.26 57.32 112.09 67.43 112.09 67.43L126.59 65.93C126.59 65.93 129.48 59.64 133.59 54.43C137.71 49.21 147.59 42.43 148.59 41.43Z"/>
    </g>
    <path fill-rule="evenodd" fill="#2EB1B0" d="M120 64.73C129.39 64.73 137 72.34 137 81.73C137 91.12 129.39 98.73 120 98.73C110.61 98.73 103 91.12 103 81.73C103 72.34 110.61 64.73 120 64.73ZM120 74.73C116.13 74.73 113 77.86 113 81.73C113 85.59 116.13 88.73 120 88.73C123.87 88.73 127 85.59 127 81.73C127 77.86 123.87 74.73 120 74.73Z"/>
  </svg>`;
}
function logoFull(size = 36, dark = false) {
  return `<a href="home.html" class="flex items-center gap-2.5 shrink-0">${logoSVG(size)}
    <span class="font-extrabold tracking-[0.14em] text-[15px] ${dark ? 'text-white' : 'text-ink'}">PROPRITOK</span></a>`;
}

/* ---------- Icons (1.75 stroke, lucide-like) ---------- */
const I = (d, s = 20, extra = '') =>
  `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" ${extra}>${d}</svg>`;
const ic = {
  arrow: (s) => I('<path d="M5 12h14M13 6l6 6-6 6"/>', s, 'class="arrow"'),
  arrowL: (s) => I('<path d="M19 12H5M11 6l-6 6 6 6"/>', s),
  phone: (s) => I('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>', s),
  mail: (s) => I('<rect x="2" y="4" width="20" height="16" rx="3"/><path d="m22 7-10 6L2 7"/>', s),
  clock: (s) => I('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>', s),
  pin: (s) => I('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>', s),
  shield: (s) => I('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>', s),
  wind: (s) => I('<path d="M17.7 7.7A2.5 2.5 0 1 1 19.5 12H2M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2"/>', s),
  volume: (s) => I('<path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/>', s),
  drill: (s) => I('<path d="M3 7h10v6H3z"/><path d="M13 9h5l3 1-3 1h-5M6 13l-1 7h4l1-7"/>', s),
  sparkle: (s) => I('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>', s),
  thermo: (s) => I('<path d="M14 4v10.5a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>', s),
  home: (s) => I('<path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>', s),
  filter: (s) => I('<path d="M3 5h18M6 12h12M10 19h4"/>', s),
  search: (s) => I('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>', s),
  check: (s) => I('<path d="M20 6 9 17l-5-5"/>', s),
  star: (s) => `<svg width="${s || 16}" height="${s || 16}" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>`,
  menu: (s) => I('<path d="M4 8h16M4 16h10"/>', s),
  cart: (s) => I('<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L22 7H6"/>', s),
  layers: (s) => I('<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>', s),
  chat: (s) => I('<path d="M21 12a8 8 0 0 1-11.8 7L3 21l2-6.2A8 8 0 1 1 21 12Z"/>', s),
  ruler: (s) => I('<path d="M21.3 8.7 8.7 21.3a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4Z"/><path d="m7.5 10.5 2 2M10.5 7.5l2 2M13.5 4.5l2 2M4.5 13.5l2 2"/>', s),
  plus: (s) => I('<path d="M12 5v14M5 12h14"/>', s),
  heart: (s) => I('<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/>', s),
  truck: (s) => I('<path d="M1 3h15v13H1zM16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>', s),
};
/* Messenger glyphs */
const msg = {
  wa: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5 0-1 .3-3.4-.7a11.6 11.6 0 0 1-4.5-4c-.4-.5-1-1.6-1-2.9s.7-2 1-2.3c.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.5l.9 2.1c0 .2.1.4 0 .6l-.4.6-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.4 1.8 2.2 1.2 1.1 2.2 1.4 2.5 1.6.3.1.5.1.7-.1l1-1.2c.2-.3.4-.3.7-.2l2 1c.3.1.5.2.5.3.1.1.1.8-.1 1.4Z"/></svg>`,
  tg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M21.6 4.2 18.4 19.4c-.2 1-.9 1.3-1.7.8l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2L6.1 13.2 1.4 11.7c-1-.3-1-1 .2-1.5L20.3 3c.9-.3 1.6.2 1.3 1.2Z"/></svg>`,
  max: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.1A9 9 0 1 0 12 3Z" fill="#fff"/><path d="M8 15.5V9l4 4 4-4v6.5" stroke="#5B3DF5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

/* ---------- Airflow decorative SVG ---------- */
function airflow({ w = 1440, h = 600, color = '#2EB1B0', op = 0.35, cls = '' } = {}) {
  const lines = [0.2, 0.34, 0.48, 0.62, 0.78].map((k, i) => {
    const y = h * k, a = 40 + i * 14;
    return `<path stroke-width="${1.2 + (i % 2) * 0.8}" d="M-40 ${y} C ${w * 0.2} ${y - a}, ${w * 0.35} ${y + a}, ${w * 0.55} ${y} S ${w * 0.85} ${y - a}, ${w + 40} ${y + a / 2}"/>`;
  }).join('');
  return `<svg class="airflow pointer-events-none ${cls}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" stroke="${color}" style="opacity:${op}">${lines}</svg>`;
}

/* ---------- Products (from breezers.import.json) ---------- */
const PRODUCTS = [
  { id: 'biox', brand: 'Tion', name: 'Tion BIO X Standard', price: 58140, old: 61200, img: 'https://bp.propritok.ru/api/files/pbc_1529214369/qa7wspzic1tsovz/brbxbreezer_bio_xperspective001_7kvi9nlknh.webp', stock: true, area: 50, db: 19, air: 160, filter: 'E11 + AK', heater: true, tag: 'Хит' },
  { id: '4s', brand: 'Tion', name: 'Tion 4S Family', price: 77199, img: 'https://bp.propritok.ru/api/files/pbc_1529214369/cqsxmkwq4dc4sem/breezer_4s_1000x1000_wko2t2agmi.jpeg', stock: true, area: 40, db: 19, air: 140, filter: 'H13', heater: true },
  { id: 'rcb150', brand: 'Royal Clima', name: 'Royal Clima BREZZA RCB 150 LUX', price: 52000, img: 'https://bp.propritok.ru/api/files/pbc_1529214369/n1cpcs4wmmg0r0a/brezza_01_r28qian8xg.png', stock: false, area: 40, db: 20, air: 150, filter: '5 ступеней', heater: true },
  { id: 'asp100', brand: 'Ballu', name: 'Ballu ONEAIR ASP-100', price: 33490, img: 'https://bp.propritok.ru/api/files/pbc_1529214369/hksbu1omceirx4y/src_epr7756cmj.jpeg', stock: true, area: 30, db: 19, air: 120, filter: 'H13', heater: true, tag: 'Новинка' },
  { id: 'lite', brand: 'Tion', name: 'Tion Breezer Lite', price: 38199, img: 'https://bp.propritok.ru/api/files/pbc_1529214369/zmk65vk5balklqd/orig_x3vxxcqbc8.webp', stock: true, area: 23, db: 18, air: 100, filter: 'H11', heater: true },
  { id: 'asp200', brand: 'Ballu', name: 'Ballu ONEAiR Home Pro ASP-200', price: 53990, img: 'https://bp.propritok.ru/api/files/pbc_1529214369/zbr3vfzkpu6vfpy/src_acnp70r5xu.jpeg', stock: false, area: 75, db: 19, air: 200, filter: 'H11 + уголь', heater: false },
  { id: 'magic', brand: 'Tion', name: 'Tion 4S Magic', price: 97200, img: 'https://bp.propritok.ru/api/files/pbc_1529214369/hv07i0sheiqg2rz/breezer_4s_1000x1000_bl4uh7d7vv.jpeg', stock: true, area: 40, db: 19, air: 140, filter: 'H13', heater: true },
  { id: 'zeav', brand: 'Zilon', name: 'EASYAIR by ZILON Zeav 135', price: 31190, img: 'https://bp.propritok.ru/api/files/pbc_1529214369/1e3gv7gk8ra4sl0/bitovaya_vent_ustanovka_zeav_01_ydndo4j789.png', stock: true, area: 35, db: 20, air: 135, filter: 'F7', heater: true },
  { id: 'o2', brand: 'Tion', name: 'Tion O2 Standart', price: 50100, img: 'https://bp.propritok.ru/api/files/pbc_1529214369/gg486134p3y5ofl/51589114_s6hm4nditp.jpgB.webp', stock: true, area: 40, db: 32, air: 120, filter: 'H11 + AK', heater: true },
  { id: 'asp80', brand: 'Ballu', name: 'Ballu ONEAiR Compact ASP-80', price: 18990, img: 'https://bp.propritok.ru/api/files/pbc_1529214369/g87slcsdt5fmxda/src_daih8t6ylv.jpeg', stock: true, area: 15, db: 24, air: 80, filter: 'H13', heater: true },
  { id: 'rcb75', brand: 'Royal Clima', name: 'Royal Clima BREZZA RCB 75 XS', price: 22650, img: 'https://bp.propritok.ru/api/files/pbc_1529214369/llk8y4s1islm84m/brezza_xs_01_x3rw1y82m1.png', stock: false, area: 37, db: 24, air: 75, filter: 'F7 + уголь', heater: true },
];
const rub = (n) => n.toLocaleString('ru-RU').replace(/[,\s]/g, ' ') + ' ₽';
const imgFallback = `this.onerror=null;this.src='data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#EEF8F6"/><rect x="55" y="45" width="90" height="110" rx="22" fill="#fff" stroke="#BFE6E3" stroke-width="2"/><circle cx="100" cy="100" r="26" fill="none" stroke="#2EB1B0" stroke-width="3"/></svg>')}'`;

function statusChip(stock, dark) {
  return stock
    ? `<span class="inline-flex items-center gap-2 text-xs font-bold ${dark ? 'text-white' : 'text-[#15855F]'}"><span class="dot-live"></span>В наличии</span>`
    : `<span class="inline-flex items-center gap-2 text-xs font-bold text-[#A86A12]"><span class="dot-order"></span>Под заказ · 3–5 дней</span>`;
}

/* Product card — maps to HeroUI <Card isPressable> + <Image> + <Chip> + <Button> */
function productCard(p) {
  return `<article class="group card-hover relative flex flex-col rounded-xl bg-white shadow-soft overflow-hidden">
    <a href="product.html" class="relative block aspect-[4/3.4] bg-gradient-to-b from-brand-50 to-white overflow-hidden">
      <img src="${p.img}" onerror="${imgFallback}" alt="${p.name}" class="zoom absolute inset-0 w-full h-full object-contain p-8 mix-blend-multiply" loading="lazy"/>
      <div class="absolute left-4 top-4 flex gap-1.5">
        ${p.tag ? `<span class="px-2.5 h-7 inline-flex items-center rounded-full bg-ink text-white text-xs font-bold">${p.tag}</span>` : ''}
        ${p.old ? `<span class="px-2.5 h-7 inline-flex items-center rounded-full bg-sun-100 text-[#A86A12] text-xs font-bold">−${Math.round((1 - p.price / p.old) * 100)}%</span>` : ''}
      </div>
      <button class="absolute right-4 top-4 w-9 h-9 rounded-full glass grid place-items-center text-ink-2 hover:text-brand-700 transition" aria-label="В избранное">${ic.heart(16)}</button>
    </a>
    <div class="flex flex-col flex-1 p-5 pt-4">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-bold uppercase tracking-[0.12em] text-ink-3">${p.brand}</span>
        ${statusChip(p.stock)}
      </div>
      <a href="product.html" class="font-bold text-[17px] leading-snug tracking-[-0.01em] text-ink hover:text-brand-700 transition min-h-[2.8em]">${p.name}</a>
      <div class="flex flex-wrap gap-1.5 mt-3">
        <span class="px-2.5 h-7 inline-flex items-center gap-1 rounded-full bg-air text-xs font-semibold text-ink-2">до ${p.area} м²</span>
        <span class="px-2.5 h-7 inline-flex items-center gap-1 rounded-full bg-air text-xs font-semibold text-ink-2">от ${p.db} дБ</span>
        <span class="px-2.5 h-7 inline-flex items-center gap-1 rounded-full bg-air text-xs font-semibold text-ink-2">${p.filter}</span>
      </div>
      <div class="mt-auto pt-5 flex items-end justify-between gap-3">
        <div>
          ${p.old ? `<div class="text-xs text-ink-3 line-through tnum">${rub(p.old)}</div>` : ''}
          <div class="text-[22px] font-extrabold tracking-[-0.02em] tnum">${rub(p.price)}</div>
        </div>
        <button onclick="addToCart('${p.id}')" class="btn btn-primary btn-sm !px-4" aria-label="В корзину">${ic.cart(18)}<span class="hidden sm:inline">${p.stock ? 'Купить' : 'Заказать'}</span></button>
      </div>
    </div>
  </article>`;
}

/* ---------- Cart (localStorage; in Next.js → zustand/context + same shape) ---------- */
const INSTALL = [
  { id: 'std', name: 'Стандарт', price: 9500, hint: 'Отверстие, канал, утепление, подключение' },
  { id: 'warm', name: 'С улучшенным утеплением', price: 11000, hint: 'Для угловых и холодных стен' },
  { id: 'slope', name: 'С выводом в откос', price: 14000, hint: 'Когда на фасад выходить нельзя' },
  { id: 'ready', name: 'На готовое отверстие', price: 6000, hint: 'Канал уже подготовлен' },
];
const INSTALL_DISCOUNT = 0.3;
const instPrice = (id) => Math.round((INSTALL.find((i) => i.id === id)?.price || 0) * (1 - INSTALL_DISCOUNT));
const getCart = () => JSON.parse(localStorage.getItem('pp_cart') || '[]');
const setCart = (c) => { localStorage.setItem('pp_cart', JSON.stringify(c)); document.querySelectorAll('[data-cart-count]').forEach((b) => { const n = cartCount(); b.textContent = n; b.classList.toggle('hidden', !n); b.animate([{ transform: 'scale(1.5)' }, { transform: 'scale(1)' }], { duration: 350, easing: 'cubic-bezier(.2,.7,.2,1)' }); }); };
const cartCount = () => { try { return getCart().reduce((a, i) => a + i.qty, 0); } catch { return 0; } };
function addToCart(id, install = 'std') {
  const c = getCart(); const row = c.find((r) => r.id === id);
  if (row) row.qty++; else c.push({ id, qty: 1, install });
  setCart(c); cartToast(PRODUCTS.find((p) => p.id === id));
}
/* Toast after "Купить" — HeroUI addToast / custom Popover */
function cartToast(p) {
  document.getElementById('cart-toast')?.remove();
  document.body.insertAdjacentHTML('beforeend', `<div id="cart-toast" class="fixed z-[60] left-3 right-3 top-20 md:left-auto md:right-6 md:top-24 md:w-[380px] glass shadow-lift rounded-xl p-4 transition duration-500" style="opacity:0;transform:translateY(-12px)">
    <div class="flex gap-3 items-center">
      <div class="w-16 h-16 rounded-md bg-brand-50 shrink-0 overflow-hidden"><img src="${p.img}" class="w-full h-full object-contain p-1.5 mix-blend-multiply" /></div>
      <div class="flex-1 min-w-0"><div class="text-xs font-bold text-[#15855F] flex items-center gap-1.5">${ic.check(14)}Добавлено в корзину</div><div class="font-bold text-[15px] truncate mt-0.5">${p.name}</div><div class="text-sm text-ink-2 tnum">${rub(p.price)} <span class="text-brand-700 font-semibold">+ монтаж −30%</span></div></div>
    </div>
    <div class="mt-3 grid grid-cols-2 gap-2"><button onclick="this.closest('#cart-toast').remove()" class="btn btn-secondary btn-sm">Продолжить</button><a href="cart.html" class="btn btn-primary btn-sm">Оформить заказ</a></div>
  </div>`);
  const t = document.getElementById('cart-toast');
  requestAnimationFrame(() => { t.style.opacity = 1; t.style.transform = 'none'; });
  clearTimeout(window.__tt); window.__tt = setTimeout(() => { t.style.opacity = 0; setTimeout(() => t.remove(), 500); }, 5000);
}

/* ---------- Header (HeroUI <Navbar shouldHideOnScroll={false} isBlurred>) ---------- */
function header(active = '') {
  const nav = [['Каталог', 'catalog.html'], ['Процесс работы', 'pages.html#process'], ['О нас', 'pages.html#about'], ['Контакты', 'pages.html#contacts']];
  return `<header class="sticky top-0 z-50 px-3 md:px-6 pt-3">
    <div class="glass shadow-soft mx-auto max-w-page rounded-full h-16 pl-4 pr-2 md:pl-6 flex items-center gap-4">
      ${logoFull(30)}
      <nav class="hidden lg:flex items-center gap-8 mx-auto text-[15px] font-semibold text-ink-2">
        ${nav.map(([t, h]) => `<a href="${h}" class="nav-link ${active === t ? 'active text-ink' : 'hover:text-ink'} transition">${t}</a>`).join('')}
      </nav>
      <div class="ml-auto lg:ml-0 flex items-center gap-2">
        <a href="${PHONE_HREF}" class="hidden md:flex flex-col items-end leading-tight mr-2">
          <span class="font-extrabold text-[15px] tnum">${PHONE}</span>
          <span class="text-xs text-ink-3 flex items-center gap-1.5"><span class="dot-live !w-1.5 !h-1.5"></span>Ежедневно 9:00–21:00</span>
        </a>
        <a href="${PHONE_HREF}" class="md:hidden w-11 h-11 rounded-full bg-brand-50 text-brand-700 grid place-items-center" aria-label="Позвонить">${ic.phone(18)}</a>
        <a href="cart.html" class="group relative w-11 h-11 md:w-12 md:h-12 rounded-full bg-white border border-line grid place-items-center hover:border-brand-700 hover:text-brand-700 transition" aria-label="Корзина">
          ${ic.cart(20)}
          <span data-cart-count class="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-brand-700 text-white text-[11px] font-extrabold grid place-items-center ring-2 ring-white ${cartCount() ? '' : 'hidden'}">${cartCount()}</span>
        </a>
        <a href="#lead" class="hidden sm:inline-flex btn btn-primary btn-sm !h-12 !px-5">Заявка</a>
        <button class="lg:hidden w-11 h-11 rounded-full bg-ink text-white grid place-items-center" aria-label="Меню">${ic.menu(18)}</button>
      </div>
    </div>
  </header>`;
}

/* ---------- Footer ---------- */
function footer() {
  return `<footer class="bg-brand-950 text-white/80 relative overflow-hidden mt-8 rounded-t-2xl md:rounded-t-[56px]">
    ${airflow({ h: 500, color: '#2EB1B0', op: 0.18, cls: 'absolute inset-0 w-full h-full' })}
    <div class="relative mx-auto max-w-page px-5 md:px-8 pt-16 md:pt-24 pb-10">
      <div class="grid gap-12 md:grid-cols-12">
        <div class="md:col-span-5">
          ${logoFull(34, true)}
          <p class="mt-6 text-2xl md:text-[32px] leading-tight font-light tracking-[-0.02em] text-white max-w-md">Дышите свободно. <span class="text-brand-300 font-semibold">Остальное мы&nbsp;возьмём на&nbsp;себя.</span></p>
          <div class="mt-8 flex gap-2">
            <a class="float-btn w-11 h-11 rounded-full bg-[#25D366] grid place-items-center" href="#" aria-label="WhatsApp">${msg.wa}</a>
            <a class="float-btn w-11 h-11 rounded-full bg-[#2AABEE] grid place-items-center" href="#" aria-label="Telegram">${msg.tg}</a>
            <a class="float-btn w-11 h-11 rounded-full bg-[#5B3DF5] grid place-items-center" href="#" aria-label="MAX">${msg.max}</a>
          </div>
        </div>
        <div class="md:col-span-2 text-sm">
          <div class="text-xs uppercase tracking-[0.14em] text-white/40 font-bold mb-4">Разделы</div>
          <ul class="space-y-3 font-semibold">
            <li><a class="hover:text-white" href="catalog.html">Каталог</a></li><li><a class="hover:text-white" href="pages.html#process">Процесс работы</a></li>
            <li><a class="hover:text-white" href="pages.html#about">О нас</a></li><li><a class="hover:text-white" href="pages.html#contacts">Контакты</a></li>
          </ul>
        </div>
        <div class="md:col-span-2 text-sm">
          <div class="text-xs uppercase tracking-[0.14em] text-white/40 font-bold mb-4">Бренды</div>
          <ul class="space-y-3 font-semibold"><li>Tion</li><li>Ballu</li><li>Royal Clima</li><li>Zilon</li></ul>
        </div>
        <div class="md:col-span-3 text-sm">
          <div class="text-xs uppercase tracking-[0.14em] text-white/40 font-bold mb-4">Связаться</div>
          <a href="${PHONE_HREF}" class="block text-2xl font-extrabold text-white tnum tracking-[-0.02em]">${PHONE}</a>
          <a href="mailto:${MAIL}" class="block mt-2 font-semibold hover:text-white">${MAIL}</a>
          <p class="mt-4 text-white/50">Москва и Московская область<br/>Ежедневно 9:00–21:00</p>
        </div>
      </div>
      <div class="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-3 justify-between text-xs text-white/40">
        <span>© 2026 Propritok. Бризеры с установкой под ключ</span>
        <span class="flex gap-6"><a href="#" class="hover:text-white">Политика конфиденциальности</a><a href="#" class="hover:text-white">Согласие на обработку данных</a></span>
      </div>
    </div>
  </footer>`;
}

/* ---------- Floating messengers + cookie ---------- */
function floaters() {
  return `<div class="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-40 flex flex-col items-end gap-2.5" id="fab">
    <div class="flex flex-col gap-2.5 transition-all duration-300 origin-bottom ${innerWidth < 768 ? 'scale-0' : ''}" id="fab-list">
      <a class="float-btn w-12 h-12 rounded-full bg-[#5B3DF5] shadow-lift grid place-items-center" href="#" aria-label="MAX">${msg.max}</a>
      <a class="float-btn w-12 h-12 rounded-full bg-[#2AABEE] shadow-lift grid place-items-center" href="#" aria-label="Telegram">${msg.tg}</a>
      <a class="float-btn w-12 h-12 rounded-full bg-[#25D366] shadow-lift grid place-items-center" href="#" aria-label="WhatsApp">${msg.wa}</a>
    </div>
    <button class="float-btn relative w-14 h-14 rounded-full bg-brand-700 text-white shadow-glow grid place-items-center" aria-label="Написать нам" onclick="document.getElementById('fab-list').classList.toggle('scale-0')">
      <span class="pulse-ring"></span>${ic.chat(24)}
    </button>
  </div>
  <div id="cookie" class="fixed left-3 right-3 bottom-3 md:left-6 md:right-auto md:bottom-6 md:max-w-[420px] z-40 glass shadow-glass rounded-lg p-4 pr-4 flex items-center gap-4">
    <div class="w-10 h-10 shrink-0 rounded-full bg-sun-100 grid place-items-center text-lg">🍪</div>
    <p class="text-sm text-ink-2 leading-snug">Используем cookie, чтобы сайт работал лучше. <a href="#" class="text-brand-700 font-semibold underline underline-offset-2">Подробнее</a></p>
    <button onclick="this.parentElement.remove()" class="btn btn-sm !h-10 bg-ink text-white hover:bg-brand-900 shrink-0">Ок</button>
  </div>`;
}

/* ---------- Mount + motion ---------- */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-slot]').forEach((el) => {
    const s = el.dataset.slot;
    if (s === 'header') el.outerHTML = header(el.dataset.active);
    if (s === 'footer') el.outerHTML = footer();
    if (s === 'floaters' && !new URLSearchParams(location.search).has('nofloat')) el.outerHTML = floaters();
    if (s === 'products') el.innerHTML = PRODUCTS.slice(+el.dataset.from || 0, +el.dataset.to || 4).map(productCard).join('');
    if (s === 'airflow') el.outerHTML = airflow({ h: +el.dataset.h || 600, color: el.dataset.color, op: +el.dataset.op || 0.35, cls: el.className });
  });
  document.querySelectorAll('[data-i]').forEach((el) => { el.innerHTML = ic[el.dataset.i](el.dataset.s ? +el.dataset.s : el.dataset.i === 'star' ? 18 : 20); });
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  // ?static → show everything immediately (for screenshots / frames)
  if (new URLSearchParams(location.search).has('static')) document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
});
