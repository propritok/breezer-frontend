'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { DEFAULT_SETTINGS, InstallOption, SiteSettings } from '../api/settings';

interface SiteSettingsValue extends SiteSettings {
  // Вид монтажа по коду; если код устарел (удалён в админке) — первый доступный вариант
  getInstall(id: string | null | undefined): InstallOption | undefined;
  // Цена монтажа со скидкой при покупке бризера
  discountedInstallPrice(id: string | null | undefined): number;
  defaultInstallId: string;
}

const SiteSettingsContext = createContext<SiteSettingsValue | null>(null);

export const SiteSettingsProvider: React.FC<{ value?: SiteSettings; children: React.ReactNode }> = ({
  value = DEFAULT_SETTINGS,
  children,
}) => {
  const ctx = useMemo<SiteSettingsValue>(() => {
    const options = value.installOptions.length ? value.installOptions : DEFAULT_SETTINGS.installOptions;
    const getInstall = (id: string | null | undefined) =>
      id ? options.find((o) => o.id === id) ?? options[0] : undefined;
    return {
      ...value,
      installOptions: options,
      getInstall,
      discountedInstallPrice: (id) => Math.round((getInstall(id)?.price ?? 0) * (1 - value.installDiscount / 100)),
      defaultInstallId: options[0].id,
    };
  }, [value]);

  return <SiteSettingsContext.Provider value={ctx}>{children}</SiteSettingsContext.Provider>;
};

export const useSiteSettings = (): SiteSettingsValue => {
  const ctx = useContext(SiteSettingsContext);
  if (!ctx) throw new Error('useSiteSettings должен использоваться внутри SiteSettingsProvider');
  return ctx;
};
