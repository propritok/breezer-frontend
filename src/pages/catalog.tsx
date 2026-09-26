import { ProductBrand, ProductShort } from '@/entities/Product';
import { ContactCTAButton } from '@/features';
import { Airflow } from '@/shared';
import { productsApi } from '@/shared/api/products';
import { parsePrice, plural } from '@/shared/lib/format';
import { useSiteSettings } from '@/shared/lib/siteSettings';
import { ProductCard } from '@/widgets';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { LuChevronDown, LuHouse, LuMessageCircle, LuSearch, LuSparkles, LuVolume1, LuX } from 'react-icons/lu';

interface CatalogProps {
  products: ProductShort[];
  brands?: ProductBrand[];
}

function getUniqueByBrand(arr: ProductBrand[] = []): ProductBrand[] {
  const seen = new Set<string>();
  return arr.filter((item) => {
    if (!item.brand || seen.has(item.brand)) return false;
    seen.add(item.brand);
    return true;
  });
}

export const getServerSideProps: GetServerSideProps<CatalogProps> = async ({ res }) => {
  try {
    const products = await productsApi.getAllShort();
    const brands = getUniqueByBrand(await productsApi.getAllBrands());

    // Устанавливаем кеширование на 5 минут для снижения нагрузки на API
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60');

    return {
      props: {
        products,
        brands,
      },
    };
  } catch (error) {
    console.error('Error fetching products for catalog:', error);
    return {
      props: {
        products: [],
        brands: [],
      },
    };
  }
};

// Фильтры по характеристикам — по полям highlights из PocketBase
const FEATURE_FILTERS = [
  { id: 'small', label: 'До 40 м²', Icon: LuHouse, test: (p: ProductShort) => !!p.highlights?.areaM2 && p.highlights.areaM2 <= 40 },
  { id: 'quiet', label: 'Тихие ≤ 20 дБ', Icon: LuVolume1, test: (p: ProductShort) => !!p.highlights?.noiseMinDb && p.highlights.noiseMinDb <= 20 },
  { id: 'hepa', label: 'HEPA-фильтр', Icon: LuSparkles, test: (p: ProductShort) => /^H1\d/i.test(p.highlights?.filter ?? '') },
  { id: 'stock', label: 'В наличии', Icon: null, test: (p: ProductShort) => !!p.inStock },
] as const;

type SortId = 'default' | 'price-asc' | 'price-desc';
const SORTS: { id: SortId; label: string }[] = [
  { id: 'default', label: 'По умолчанию' },
  { id: 'price-asc', label: 'Сначала дешевле' },
  { id: 'price-desc', label: 'Сначала дороже' },
];

const PromoTile: React.FC = () => (
  <div className='relative rounded-card bg-brand-900 text-white p-7 overflow-hidden flex flex-col min-h-[420px] min-[480px]:col-span-2 lg:col-span-1'>
    <Airflow className='absolute inset-0 w-full h-full' width={400} height={500} color='#8FD3CF' opacity={0.3} />
    <div className='absolute -right-10 -top-10 w-40 h-40 rounded-full bg-brand-700 animate-breathe' />
    <span className='relative w-12 h-12 rounded-full bg-white/10 grid place-items-center'>
      <LuMessageCircle className='w-6 h-6' />
    </span>
    <h3 className='relative mt-auto text-h3 font-bold leading-tight tracking-[-0.02em]'>Не знаете, какой выбрать?</h3>
    <p className='relative mt-3 text-white/70 text-sm'>
      Подберём модель под площадь, стены и бюджет — бесплатно.
    </p>
    <ContactCTAButton
      label='Подобрать бризер'
      formButtonLabel='Подобрать бризер'
      action='Подбор бризера (каталог)'
      showMessageField
      className='relative mt-6 self-start bg-white text-brand-900 shadow-none'
    />
  </div>
);

export default function Catalog({ products, brands }: CatalogProps) {
  const router = useRouter();
  const { installDiscount } = useSiteSettings();
  const [query, setQuery] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [sort, setSort] = useState<SortId>('default');

  // Поддержка ссылок вида /catalog?search=tion
  useEffect(() => {
    if (typeof router.query.search === 'string') setQuery(router.query.search);
  }, [router.query.search]);

  const toggle = (list: string[], set: (v: string[]) => void, v: string) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = products.filter((p) => {
      if (selectedBrands.length && !(p.brand && selectedBrands.includes(p.brand))) return false;
      if (q && ![p.modelNameEn, p.modelNameRu, p.brand].some((s) => s?.toLowerCase().includes(q))) return false;
      return FEATURE_FILTERS.every((f) => !features.includes(f.id) || f.test(p));
    });
    if (sort === 'price-asc') result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    if (sort === 'price-desc') result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    return result;
  }, [products, selectedBrands, features, query, sort]);

  const brandCount = (b: string) => products.filter((p) => p.brand === b).length;
  const hasFilters = selectedBrands.length > 0 || features.length > 0 || query.length > 0;
  const resetFilters = () => {
    setSelectedBrands([]);
    setFeatures([]);
    setQuery('');
  };

  return (
    <>
      <Head>
        <title>Каталог бризеров - Propritok</title>
        <meta name='description' content='Каталог бризеров для дома' />
      </Head>

      <main>
        {/* Заголовок + поиск */}
        <section className='relative pt-8 md:pt-12 pb-8 overflow-hidden'>
          <div className='absolute -top-40 right-0 w-[520px] h-[520px] rounded-full bg-brand-100 blur-3xl opacity-60 animate-breathe' />
          <div className='relative mx-auto max-w-page px-5 md:px-8'>
            <nav className='text-sm text-ink-3 flex items-center gap-2'>
              <Link href='/' className='hover:text-brand-700'>
                Главная
              </Link>
              <span>/</span>
              <span className='text-ink font-semibold'>Каталог</span>
            </nav>
            <div className='mt-6 flex flex-col lg:flex-row lg:items-end justify-between gap-8'>
              <div>
                <h1 className='text-[40px] leading-[1.02] md:text-display font-light tracking-[-0.045em]'>
                  Каталог <span className='font-extrabold'>бризеров</span>
                </h1>
                <p className='mt-4 text-ink-2 text-body-lg max-w-[520px]'>
                  {products.length} {plural(products.length, 'модель', 'модели', 'моделей')} с установкой под ключ
                  и скидкой {installDiscount}% на монтаж.
                </p>
              </div>
              <label className='group relative w-full lg:w-[440px]'>
                <span className='sr-only'>Поиск по каталогу</span>
                <LuSearch className='absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-3 group-focus-within:text-brand-700' />
                <input
                  type='search'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder='Поиск по модели, например «Tion 4S»'
                  className='w-full h-16 rounded-full bg-white shadow-soft border border-line pl-14 pr-6 text-[16px] font-semibold outline-none focus:border-brand-700 focus:ring-4 focus:ring-brand-700/10 transition placeholder:font-medium placeholder:text-ink-3'
                />
              </label>
            </div>
          </div>
        </section>

        {products.length === 0 ? (
          <p className='text-center py-24 text-ink-3 text-lg'>Товары временно недоступны</p>
        ) : (
          <>
            {/* Фильтры */}
            <section className='sticky top-[84px] z-30'>
              <div className='mx-auto max-w-page px-5 md:px-8'>
                <div className='glass shadow-soft rounded-card p-3 md:p-4 space-y-3'>
                  <div className='flex items-center gap-2 overflow-x-auto no-scrollbar'>
                    <span className='text-xs font-bold uppercase tracking-[0.12em] text-ink-3 shrink-0 w-20 hidden md:block'>
                      Бренд
                    </span>
                    <button
                      type='button'
                      onClick={() => setSelectedBrands([])}
                      className={`chip ${selectedBrands.length === 0 ? 'chip-on' : ''}`}>
                      Все <span className='text-xs opacity-60'>{products.length}</span>
                    </button>
                    {brands?.map(({ brand }) => (
                      <button
                        key={brand}
                        type='button'
                        onClick={() => toggle(selectedBrands, setSelectedBrands, brand)}
                        className={`chip ${selectedBrands.includes(brand) ? 'chip-on' : ''}`}>
                        {brand} <span className='text-xs opacity-60'>{brandCount(brand)}</span>
                      </button>
                    ))}
                    <label className='ml-auto shrink-0 hidden md:flex items-center gap-2 text-sm font-semibold text-ink-2 pl-4'>
                      Сортировка:
                      <span className='relative'>
                        <select
                          value={sort}
                          onChange={(e) => setSort(e.target.value as SortId)}
                          className='appearance-none h-10 pl-4 pr-9 rounded-full bg-white border border-line font-semibold text-ink outline-none focus:border-brand-700 cursor-pointer'>
                          {SORTS.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                        <LuChevronDown className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4' />
                      </span>
                    </label>
                  </div>
                  <div className='flex items-center gap-2 overflow-x-auto no-scrollbar'>
                    <span className='text-xs font-bold uppercase tracking-[0.12em] text-ink-3 shrink-0 w-20 hidden md:block'>
                      Подбор
                    </span>
                    {FEATURE_FILTERS.map(({ id, label, Icon }) => {
                      const on = features.includes(id);
                      return (
                        <button
                          key={id}
                          type='button'
                          onClick={() => toggle(features, setFeatures, id)}
                          className={`chip ${on ? 'chip-on' : ''}`}>
                          {Icon && <Icon className='w-4 h-4' />}
                          {label}
                          {on && <LuX className='w-3.5 h-3.5 opacity-80' />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* Сетка */}
            <section className='py-8 md:py-12'>
              <div className='mx-auto max-w-page px-5 md:px-8'>
                <div className='flex items-center justify-between mb-6 text-sm'>
                  <span className='text-ink-2'>
                    <b className='text-ink'>
                      {filtered.length} {plural(filtered.length, 'модель', 'модели', 'моделей')}
                    </b>
                    {hasFilters && ' по выбранным фильтрам'}
                  </span>
                  {hasFilters && (
                    <button type='button' onClick={resetFilters} className='text-brand-700 font-semibold hover:underline'>
                      Сбросить фильтры
                    </button>
                  )}
                </div>
                {filtered.length > 0 ? (
                  <div className='grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5'>
                    {filtered.map((product, i) => (
                      <React.Fragment key={product.id}>
                        {i === 5 && <PromoTile />}
                        <ProductCard product={product} />
                      </React.Fragment>
                    ))}
                    {filtered.length <= 5 && <PromoTile />}
                  </div>
                ) : (
                  <div className='rounded-block bg-white shadow-soft py-16 px-6 text-center'>
                    <p className='text-h4 font-bold'>Ничего не нашлось</p>
                    <p className='mt-2 text-ink-2'>Попробуйте изменить запрос или сбросить фильтры</p>
                    <button type='button' onClick={resetFilters} className='btn btn-secondary mt-6'>
                      Сбросить фильтры
                    </button>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}
