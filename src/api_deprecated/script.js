// === ПАРСЕР ДЛЯ СТРАНИЦЫ ТОВАРА c изображениями с сайта https://fresh-air.moscow/===

function absolutize(u) {
  try {
    return new URL(u, location.href).href;
  } catch {
    return null;
  }
}

// выбрать самый большой src из srcset
function pickLargestFromSrcset(srcset) {
  if (!srcset) return null;
  const items = srcset
    .split(",")
    .map((s) => s.trim())
    .map((s) => {
      const m = s.match(/(.+)\s+(\d+)(w|x)$/i);
      if (m) return { url: m[1].trim(), size: parseInt(m[2], 10) };
      return { url: s.split(" ")[0], size: 0 };
    });
  items.sort((a, b) => b.size - a.size);
  return items[0]?.url || null;
}

function unique(arr) {
  const seen = new Set();
  return arr.filter((x) => {
    const k = x.replace(/[#?].*$/, ""); // без query/hash для дедупа
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

async function collectImages() {
  const out = [];

  // 1) JSON-LD schema.org/Product
  document
    .querySelectorAll('script[type="application/ld+json"]')
    .forEach((s) => {
      try {
        const data = JSON.parse(s.textContent.trim());
        const nodes = Array.isArray(data) ? data : [data];
        nodes.forEach((n) => {
          if (n && (n["@type"] === "Product" || n.productID)) {
            const imgs = []
              .concat(n.image || [])
              .flat()
              .map(absolutize)
              .filter(Boolean);
            out.push(...imgs);
          }
        });
      } catch {}
    });

  // 2) OG изображение
  const og = document.querySelector(
    'meta[property="og:image"], meta[name="og:image"]'
  )?.content;
  if (og) out.push(absolutize(og));

  // 3) Явные <a href> на картинки (часто в галерее)
  document
    .querySelectorAll(
      ".product, .product-page, .gallery, .images, .swiper, .fotorama, .slick-slider, .purchase a[href]"
    )
    .forEach((aWrap) => {
      const href = aWrap.getAttribute("href");
      if (href && /\.(jpe?g|png|webp|gif)$/i.test(href))
        out.push(absolutize(href));
    });

  // 4) Все <img> в зонах товара (берем самый крупный вариант)
  document
    .querySelectorAll(
      ".product, .product-page, .gallery, .images, .swiper, .fotorama, .slick-slider, .purchase img"
    )
    .forEach((img) => {
      const dataSrc =
        img.getAttribute("data-src") ||
        img.getAttribute("data-large") ||
        img.getAttribute("data-original");
      const srcsetLargest = pickLargestFromSrcset(img.getAttribute("srcset"));
      const src = dataSrc || srcsetLargest || img.getAttribute("src");

      if (src && !/^data:image\//.test(src)) {
        const url = absolutize(src);
        if (url) out.push(url);
      }
    });

  // 5) Глобальный fallback (если сайт рендерит галерею вне ожидаемых контейнеров)
  if (out.length < 2) {
    document.querySelectorAll("img").forEach((img) => {
      const src = img.currentSrc || img.src || img.getAttribute("src");
      if (
        src &&
        /\.(jpe?g|png|webp)$/i.test(src) &&
        !/^data:image\//.test(src)
      ) {
        out.push(absolutize(src));
      }
    });
  }

  // очистка: дедуп, отсев мелких и служебных
  let imgs = unique(out.filter(Boolean));
  // попробовать отбросить очевидно маленькие (иконки), используя naturalWidth
  imgs = imgs.filter((url) => {
    // если картинка уже на странице — проверим naturalWidth
    const el = [...document.images].find(
      (i) => (i.currentSrc || i.src) === url
    );
    if (el && el.naturalWidth && el.naturalWidth < 200) return false;
    // иначе оставим (не всегда доступно)
    return true;
  });

  return imgs;
}

function parseProductPage() {
  const slug = window.location.pathname.split("/").filter(Boolean).pop();

  // цена
  const priceEl = document.querySelector(".pr-price-actual");
  const price = priceEl
    ? priceEl.textContent.trim().replace(/\s+/g, " ")
    : null;
  const inStock = /в наличии/i.test(document.body.innerText);

  // таблица характеристик
  const rows = document.querySelectorAll("#product-options table tr");
  const specs = {};
  rows.forEach((row) => {
    const key = row.querySelector("td:nth-child(1)")?.innerText.trim();
    const val = row.querySelector("td:nth-child(2)")?.innerText.trim();
    if (!key || !val) return;

    switch (key) {
      case "Название модели на английском":
        specs.modelNameEn = val;
        break;
      case "Название модели на русском":
        specs.modelNameRu = val;
        break;
      case "Бренд":
        specs.brand = val;
        break;
      case "Вид":
        specs.view = val;
        break;
      case "Тип":
        specs.type = val;
        break;
      case "Модификации":
        specs.modifications = val.split(",").map((s) => s.trim());
        break;
      case "Габариты (ВхШхГ) мм":
        specs.dimensionsMm = val;
        break;
      case "Производительность по воздуху, м.куб./час:":
        specs.airflowM3h = val.split("/").map(Number);
        break;
      case "Уровень шума, дБА (min…max)":
        const [min, max] = val.split("...").map((n) => parseInt(n, 10));
        specs.noiseLevelDb = { min, max };
        break;
      case "Возможные режимы работы":
        specs.modes = val
          .split(".")
          .map((s) => s.trim())
          .filter(Boolean);
        break;
      case "Отличительные особенности":
        specs.features = val;
        break;
      case "Доступные классы фильтрации":
        specs.filterClasses = val.split(",").map((s) => s.trim());
        break;
      case "Монтаж со скрытой проводкой":
        specs.hiddenWiring = /да/i.test(val);
        break;
      case "Количество скоростей":
        specs.speeds = Number(val);
        break;
      case "Срок гарантии на прибор":
        specs.warrantyDeviceYears = parseInt(val, 10);
        break;
      case "Срок гарантии на монтаж (лет)":
        specs.warrantyInstallYears = parseInt(val, 10);
        break;
      case "Подавление уличного шума. дБ":
        specs.noiseSuppressionDb = Number(val);
        break;
      case "Материал корпуса":
        specs.bodyMaterial = val;
        break;
      case "Вес, кг":
        specs.weightKg = val;
        break;
      case "Ночной режим":
        specs.nightMode = /да/i.test(val);
        break;
      case "Воздухообмен, м3":
      case "Производительность (приток), м3/час":
        specs.airflowMaxM3h = Number(val);
        break;
      case "Макс. площадь помещения, м2":
        specs.roomAreaMaxM2 = Number(val);
        break;
      case "Рекомендуемая площадь помещения, м2":
        specs.roomAreaRecM2 = Number(val);
        break;
      case "Макс. количество человек в помещении":
        specs.personsMax = Number(val);
        break;
      case "Рекомендуемое количество человек в помещении":
        specs.personsRec = Number(val);
        break;
      case "Нагреватель":
        specs.heater = /да|есть/i.test(val);
        break;
      case "Мощность нагревателя, Вт":
        specs.heaterPowerW = parseInt(val, 10);
        break;
      case "Мощность вентилятора, Вт":
        specs.fanPowerW = parseInt(val, 10);
        break;
      case "Максимальное годовое энергопотребление в теплом климате, Квт":
        specs.energyYearWarmKwh = parseInt(val, 10);
        break;
      case "Максимальное годовое энергопотребление в холодном климате, Квт":
        specs.energyYearColdKwh = parseInt(val, 10);
        break;
      case "Толщина стены (min..max), мм":
        specs.wallThicknessMm = val;
        break;
      case "Диаметр монтажного отверстия, мм":
        specs.mountingHoleMm = parseInt(val, 10);
        break;
      case "Диаметр воздуховодов, мм":
        specs.ductDiameterMm = parseInt(val, 10);
        break;
      case "Тип управления":
        specs.control = val.split(",").map((s) => s.trim());
        break;
      case "Наличие управления на корпусе прибора":
        specs.controlOnDevice = /да/i.test(val);
        break;
      case "Wi-Fi управление через смартфон":
        specs.wifi = /да/i.test(val);
        break;
      case "Пульт ДУ":
        specs.remoteControl = /да/i.test(val);
        break;
      case "Возможность объединения в кластер с центральным управлением":
        specs.clusterControl = /да/i.test(val);
        break;
      case "Режим рециркуляции":
        specs.recirculation = /да|есть/i.test(val);
        break;
      case "Режим подмеса комнатного воздуха":
        specs.mixing = /да/i.test(val);
        break;
      case "Наличие клапана":
        specs.valve = /да/i.test(val);
        break;
      case "Наличие дисплея":
        specs.display = val;
        break;
      case "Синхронизация с другими устройствами":
        specs.syncDevices = /да|есть/i.test(val);
        break;
      case "Возможность отключения нагревателя":
        specs.heaterOffOption = /да/i.test(val);
        break;
      case "Работа по расписанию":
        specs.schedule = /да/i.test(val);
        break;
      case "Датчик уровня СО2":
        (specs.sensors = specs.sensors || {}).co2 = /да/i.test(val);
        break;
      case "Датчик CO (угарный газ)":
        (specs.sensors = specs.sensors || {}).co = /да/i.test(val);
        break;
      case "Датчик качества воздуха":
        (specs.sensors = specs.sensors || {}).airQuality = /да/i.test(val);
        break;
      case "Датчик влажности":
        (specs.sensors = specs.sensors || {}).humidity = /да/i.test(val);
        break;
      case "Климат-контроль":
        specs.climateControl = /да/i.test(val);
        break;
      case "Индикация замены фильтра":
        specs.filterReplacementIndicator = /да/i.test(val);
        break;
      case "Таймер":
        specs.timer = /да/i.test(val);
        break;
      case "Защита от конденсата":
        specs.condensateProtection = /да/i.test(val);
        break;
      case "Защита от обмерзания":
        specs.freezeProtection = /да/i.test(val);
        break;
      case "Минимальный класс фильтра":
        specs.filterClassMin = val;
        break;
      case "Максимальный класс фильтра":
        specs.filterClassMax = val;
        break;
      case "Угольный фильтр":
        specs.carbonFilter = /да/i.test(val);
        break;
      case "Защита от аллергенов":
        specs.allergens = /да/i.test(val);
        break;
      case "Фильтрация пыльцы":
        specs.pollen = /да/i.test(val);
        break;
      case "Фильтрация пыли":
        specs.dust = /да/i.test(val);
        break;
      case "Фильтрация микроорганизмов":
        specs.microorganisms = /да/i.test(val);
        break;
      case "Наличие фотокалитического фильтра":
        specs.photocatFilter = /да/i.test(val);
        break;
      case "Нейтрализация микроогранизмов":
        specs.microorganismNeutralization = /да/i.test(val);
        break;
      case "Фильтрация вредных газов":
        specs.harmfulGases = /да/i.test(val);
        break;
      case "Размещение":
        specs.placement = val;
        break;
      case "Допустимая t уличного воздуха (min..max), С":
        specs.outdoorTempRange = val;
        break;
      case "Допустимая t в помещении (min..max), С":
        specs.indoorTempRange = val;
        break;
      case "Требования к отн. влажности в помещении (max), %":
        specs.maxHumidity = parseInt(val, 10);
        break;
      case "Питание В/Гц":
        specs.powerSupply = val;
        break;
      case "Эксплуатационное напряжение V":
        specs.voltage = parseInt(val, 10);
        break;
      case "Длина кабеля электропитания, м":
        specs.powerCableLengthM = parseInt(val, 10);
        break;
      case "Рекуперация":
        specs.recuperation = /да/i.test(val);
        break;
      case "Страна производства":
        specs.productionCountry = val;
        break;
    }
  });

  return (async () => {
    const images = await collectImages();

    const product = {
      id: slug,
      modelNameEn: specs.modelNameEn,
      modelNameRu: specs.modelNameRu,
      inStock,
      price,
      images,
      specs,
    };

    const productShort = {
      id: slug,
      modelNameEn: specs.modelNameEn,
      modelNameRu: specs.modelNameRu,
      inStock,
      price,
      images,
    };

    return { product, productShort };
  })();
}

// === Запуск ===
parseProductPage().then((result) => {
  console.log("Product:", result.product);
  console.log("ProductShort:", result.productShort);
});
