import { Product, ProductBrand, ProductHighlights, ProductShort } from "../../entities/Product";
import { config } from "../config";

// Интерфейс для ответа PocketBase
interface PocketBaseResponse<T> {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  items: T[];
}

// Интерфейс для продукта из PocketBase
interface PocketBaseProduct {
  brand: string;
  collectionId: string;
  collectionName: string;
  id: string;
  modelNameEn: string;
  modelNameRu: string;
  description: string;
  price: number;
  oldPrice?: number;
  inStock: boolean;
  images: string[];
  spec: any;
  created: string;
  updated: string;
}

// Функция для преобразования изображений PocketBase в полные URL
const getImageUrl = (
  collectionId: string,
  recordId: string,
  filename: string
): string => {
  return `${config.pocketbase.baseUrl}/files/${collectionId}/${recordId}/${filename}`;
};

// Старая цена нужна только если она больше текущей (иначе скидки нет). Без undefined — Next не сериализует его в props
const pickOldPrice = (p: PocketBaseProduct) =>
  p.oldPrice && p.oldPrice > p.price ? { oldPrice: p.oldPrice } : {};

// Функция для преобразования продукта из PocketBase в наш формат
const transformPocketBaseProduct = (pbProduct: PocketBaseProduct): Product => {
  return {
    id: pbProduct.id,
    modelNameEn: pbProduct.modelNameEn,
    modelNameRu: pbProduct.modelNameRu,
    description: pbProduct.description,
    inStock: pbProduct.inStock,
    price: `${pbProduct.price} руб.`,
    ...pickOldPrice(pbProduct),
    images: pbProduct.images.map((filename) =>
      getImageUrl(pbProduct.collectionId, pbProduct.id, filename)
    ),
    specs: pbProduct.spec,
    brand: pbProduct?.brand,
  };
};

// Ключевые характеристики для карточки в каталоге (без undefined — иначе Next не сериализует props)
const pickHighlights = (spec: any): ProductHighlights => {
  const h: ProductHighlights = {};
  if (spec?.roomAreaMaxM2) h.areaM2 = spec.roomAreaMaxM2;
  if (spec?.noiseLevelDb?.min) h.noiseMinDb = spec.noiseLevelDb.min;
  if (spec?.filterClassMax) h.filter = spec.filterClassMax;
  if (spec?.airflowMaxM3h) h.airflowM3h = spec.airflowMaxM3h;
  return h;
};

// Функция для преобразования в ProductShort
const transformToProductShort = (product: PocketBaseProduct): ProductShort => {
  return {
    highlights: pickHighlights(product.spec),
    id: product.id,
    modelNameEn: product.modelNameEn,
    modelNameRu: product.modelNameRu,
    inStock: product.inStock,
    price: `${product.price} руб.`,
    ...pickOldPrice(product),
    images: product.images.map((filename) =>
      getImageUrl(product.collectionId, product.id, filename)
    ),
    brand: product?.brand,
  };
};

export const productsApi = {
  // Получить все продукты
  async getAll(): Promise<Product[]> {
    try {
      const response = await fetch(
        `${config.pocketbase.baseUrl}/collections/breezers/records`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }

      const data: PocketBaseResponse<PocketBaseProduct> = await response.json();
      return data.items.map(transformPocketBaseProduct);
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  // Получить продукт по ID
  async getById(id: string): Promise<Product> {
    try {
      const response = await fetch(
        `${config.pocketbase.baseUrl}/collections/breezers/records/${id}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.status}`);
      }

      const pbProduct: PocketBaseProduct = await response.json();
      return transformPocketBaseProduct(pbProduct);
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  },

  async getPopular(): Promise<ProductShort[]> {
    try {
      const response = await fetch(
        `${config.pocketbase.baseUrl}/collections/breezers/records?filter=(isPopular=true)`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }

      const data: PocketBaseResponse<PocketBaseProduct> = await response.json();
      return data.items.map((product) => transformToProductShort(product));
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  },

  // Получить короткие данные всех продуктов
  async getAllShort(): Promise<ProductShort[]> {
    try {
      const response = await fetch(
        `${config.pocketbase.baseUrl}/collections/breezers/records`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }

      const data: PocketBaseResponse<PocketBaseProduct> = await response.json();
      return data.items.map(transformToProductShort);
    } catch (error) {
      console.error("Error fetching products short:", error);
      throw error;
    }
  },

  // Получить все бренды
  async getAllBrands(): Promise<ProductBrand[]> {
    try {
      const response = await fetch(
        `${config.pocketbase.baseUrl}/collections/breezers/records?fields=brand`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }

      const data: PocketBaseResponse<ProductBrand> = await response.json();
      return data.items;
    } catch (error) {
      console.error("Error fetching products short:", error);
      throw error;
    }
  },

  // Поиск продуктов (базовая реализация)
  async search(query: string): Promise<Product[]> {
    try {
      const allProducts = await this.getAll();
      const searchTerm = query.toLowerCase();

      return allProducts.filter(
        (product) =>
          product.modelNameEn?.toLowerCase().includes(searchTerm) ||
          product.modelNameRu?.toLowerCase().includes(searchTerm) ||
          product.description?.toLowerCase().includes(searchTerm)
      );
    } catch (error) {
      console.error("Error searching products:", error);
      throw error;
    }
  },
};
