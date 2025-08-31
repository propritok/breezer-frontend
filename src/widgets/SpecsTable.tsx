import { Product } from '@/entities';
import { Button } from '@heroui/react';
import React, { useState } from 'react';

interface SpecsTableProps {
  rows: SpecRow[];
}

export interface SpecRow {
  label: string;
  value: string;
}

const fieldLabels: Record<string, string> = {
  brand: 'Производитель',
  view: 'Вид',
  type: 'Тип',
  modifications: 'Модификации',
  dimensionsMm: 'Размеры (мм)',
  airflowM3h: 'Производительность (м³/ч)',
  noiseLevelDb: 'Уровень шума',
  modes: 'Режимы работы',
  features: 'Особенности',
  filterClasses: 'Фильтры',
  hiddenWiring: 'Скрытая проводка',
  speeds: 'Скорости',
  warrantyDeviceYears: 'Гарантия прибора',
  warrantyInstallYears: 'Гарантия монтажа',
  noiseSuppressionDb: 'Подавление шума (дБ)',
  bodyMaterial: 'Материал корпуса',
  weightKg: 'Вес (кг)',
  nightMode: 'Ночной режим',
  airflowMaxM3h: 'Макс. воздухообмен (м³/ч)',
  roomAreaMaxM2: 'Макс. площадь (м²)',
  roomAreaRecM2: 'Рекомендуемая площадь (м²)',
  personsMax: 'Макс. количество человек',
  personsRec: 'Рекомендуемое количество человек',
  heater: 'Нагреватель',
  heaterPowerW: 'Мощность нагревателя (Вт)',
  fanPowerW: 'Мощность вентилятора (Вт)',
  energyYearWarmKwh: 'Годовое потребление (теплый климат, кВт)',
  energyYearColdKwh: 'Годовое потребление (холодный климат, кВт)',
  wallThicknessMm: 'Толщина стены (мм)',
  mountingHoleMm: 'Диаметр монтажного отверстия (мм)',
  ductDiameterMm: 'Диаметр воздуховодов (мм)',
  control: 'Управление',
  controlOnDevice: 'Управление на корпусе',
  wifi: 'Wi-Fi',
  remoteControl: 'Пульт ДУ',
  clusterControl: 'Кластерное управление',
  recirculation: 'Рециркуляция',
  mixing: 'Подмес воздуха',
  valve: 'Клапан',
  display: 'Дисплей',
  syncDevices: 'Синхронизация',
  heaterOffOption: 'Отключение нагревателя',
  schedule: 'Работа по расписанию',
  climateControl: 'Климат-контроль',
  filterReplacementIndicator: 'Индикация замены фильтра',
  timer: 'Таймер',
  condensateProtection: 'Защита от конденсата',
  freezeProtection: 'Защита от обмерзания',
  filterClassMin: 'Мин. класс фильтра',
  filterClassMax: 'Макс. класс фильтра',
  carbonFilter: 'Угольный фильтр',
  allergens: 'Защита от аллергенов',
  pollen: 'Фильтрация пыльцы',
  dust: 'Фильтрация пыли',
  microorganisms: 'Фильтрация микроорганизмов',
  photocatFilter: 'Фотокаталитический фильтр',
  microorganismNeutralization: 'Нейтрализация микроорганизмов',
  harmfulGases: 'Фильтрация газов',
  placement: 'Размещение',
  outdoorTempRange: 'Температура уличного воздуха',
  indoorTempRange: 'Температура в помещении',
  maxHumidity: 'Макс. влажность (%)',
  powerSupply: 'Питание (В/Гц)',
  voltage: 'Напряжение (В)',
  powerCableLengthM: 'Длина кабеля (м)',
  recuperation: 'Рекуперация',
  productionCountry: 'Страна производства',
};

function formatValue(key: string, value: any): string {
  if (value === undefined || value === null) return '';

  if (typeof value === 'boolean') return value ? 'Да' : 'Нет';

  if (Array.isArray(value)) return value.join(' / ');

  if (typeof value === 'object' && key === 'noiseLevelDb') {
    return `${value.min ?? ''}${value.min && value.max ? '–' : ''}${value.max ?? ''} дБ`;
  }

  return String(value);
}

export function getSpecsRows(product?: Product): SpecRow[] {
  if (!product?.specs) return [];

  const rows: SpecRow[] = [];

  for (const [key, label] of Object.entries(fieldLabels)) {
    const val = (product.specs as any)[key];
    const formatted = formatValue(key, val);
    if (formatted) {
      rows.push({ label, value: formatted });
    }
  }

  // датчики отдельно (вложенный объект)
  const sensors = product.specs.sensors;
  if (sensors) {
    if (sensors.co2 !== undefined)
      rows.push({ label: 'Датчик CO₂', value: sensors.co2 ? 'Да' : 'Нет' });
    if (sensors.co !== undefined)
      rows.push({ label: 'Датчик CO', value: sensors.co ? 'Да' : 'Нет' });
    if (sensors.airQuality !== undefined)
      rows.push({
        label: 'Датчик качества воздуха',
        value: sensors.airQuality ? 'Да' : 'Нет',
      });
    if (sensors.humidity !== undefined)
      rows.push({
        label: 'Датчик влажности',
        value: sensors.humidity ? 'Да' : 'Нет',
      });
  }

  return rows;
}

export const SpecsTable: React.FC<SpecsTableProps> = ({ rows }) => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? rows : rows?.slice(0, 8);

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3'>
        {visible?.map((row) => (
          <div key={row.label} className='flex justify-between border-b py-2'>
            <span className='text-gray-600'>{row.label}</span>
            <span className='font-medium text-right'>{row.value}</span>
          </div>
        ))}
      </div>

      {rows?.length > 8 && (
        <div className='mt-4'>
          <Button size='sm' variant='bordered' onPress={() => setShowAll((v) => !v)}>
            {showAll ? 'Скрыть' : 'Показать ещё'}
          </Button>
        </div>
      )}
    </div>
  );
};
