export interface Product {
  id?: string;
  modelNameEn?: string;
  modelNameRu?: string;
  rating?: number; // 0..5
  inStock?: boolean;
  price?: string;
  images?: string[];
  specs?: {
    brand?: string;
    view?: string;
    type?: string;
    modifications?: string[];
    dimensionsMm?: string;
    airflowM3h?: number[];
    noiseLevelDb?: { min?: number; max?: number };
    modes?: string[];
    features?: string;
    filterClasses?: string[];
    hiddenWiring?: boolean;
    speeds?: number;
    warrantyDeviceYears?: number;
    warrantyInstallYears?: number;
    noiseSuppressionDb?: number;
    bodyMaterial?: string;
    weightKg?: number;
    nightMode?: boolean;
    airflowMaxM3h?: number;
    roomAreaMaxM2?: number;
    roomAreaRecM2?: number;
    personsMax?: number;
    personsRec?: number;
    heater?: boolean;
    heaterPowerW?: number;
    fanPowerW?: number;
    energyYearWarmKwh?: number;
    energyYearColdKwh?: number;
    wallThicknessMm?: string;
    mountingHoleMm?: number;
    ductDiameterMm?: number;
    control?: string[];
    controlOnDevice?: boolean;
    wifi?: boolean;
    remoteControl?: boolean;
    clusterControl?: boolean;
    recirculation?: boolean;
    mixing?: boolean;
    valve?: boolean;
    display?: string;
    syncDevices?: boolean;
    heaterOffOption?: boolean;
    schedule?: boolean;
    sensors?: {
      co2?: boolean;
      co?: boolean;
      airQuality?: boolean;
      humidity?: boolean;
    };
    climateControl?: boolean;
    filterReplacementIndicator?: boolean;
    timer?: boolean;
    condensateProtection?: boolean;
    freezeProtection?: boolean;
    filterClassMin?: string;
    filterClassMax?: string;
    carbonFilter?: boolean;
    allergens?: boolean;
    pollen?: boolean;
    dust?: boolean;
    microorganisms?: boolean;
    photocatFilter?: boolean;
    microorganismNeutralization?: boolean;
    harmfulGases?: boolean;
    placement?: string;
    outdoorTempRange?: string;
    indoorTempRange?: string;
    maxHumidity?: number;
    powerSupply?: string;
    voltage?: number;
    powerCableLengthM?: number;
    recuperation?: boolean;
    productionCountry?: string;
  };
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
}

export interface ProductBrand {
  id: string;
  name: string;
  logo: string;
  description: string;
}

export interface ProductShort {
  id?: string;
  modelNameEn?: string;
  modelNameRu?: string;
  rating?: number; // 0..5
  inStock?: boolean;
  price?: string;
  images?: string[];
}
