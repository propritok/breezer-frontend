import { Product, ProductShort } from '../../entities/Product';
import { config } from '../config';

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
  collectionId: string;
  collectionName: string;
  id: string;
  modelNameEn: string;
  modelNameRu: string;
  description: string;
  price: number;
  inStock: boolean;
  images: string[];
  spec: any;
  created: string;
  updated: string;
}

// Функция для преобразования изображений PocketBase в полные URL
const getImageUrl = (collectionId: string, recordId: string, filename: string): string => {
  return `${config.pocketbase.baseUrl}/files/${collectionId}/${recordId}/${filename}`;
};

// Функция для преобразования продукта из PocketBase в наш формат
const transformPocketBaseProduct = (pbProduct: PocketBaseProduct): Product => {
  return {
    id: pbProduct.id,
    modelNameEn: pbProduct.modelNameEn,
    modelNameRu: pbProduct.modelNameRu,
    description: pbProduct.description,
    inStock: pbProduct.inStock,
    price: `${pbProduct.price.toLocaleString('ru-RU')} руб.`,
    images: pbProduct.images.map((filename) =>
      getImageUrl(pbProduct.collectionId, pbProduct.id, filename),
    ),
    specs: pbProduct.spec,
  };
};

// Функция для преобразования в ProductShort
const transformToProductShort = (product: Product): ProductShort => {
  return {
    id: product.id,
    modelNameEn: product.modelNameEn,
    modelNameRu: product.modelNameRu,
    inStock: product.inStock,
    price: product.price,
    images: product.images,
  };
};

export const productsApi = {
  // Получить все продукты
  async getAll(): Promise<Product[]> {
    try {
      const response = await fetch(`${config.pocketbase.baseUrl}/collections/breezers/records`);

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }

      const data: PocketBaseResponse<PocketBaseProduct> = await response.json();
      return data.items.map(transformPocketBaseProduct);
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Получить продукт по ID
  async getById(id: string): Promise<Product> {
    try {
      const response = await fetch(
        `${config.pocketbase.baseUrl}/collections/breezers/records/${id}`,
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.status}`);
      }

      const pbProduct: PocketBaseProduct = await response.json();
      return transformPocketBaseProduct(pbProduct);
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Получить короткие данные всех продуктов
  async getAllShort(): Promise<ProductShort[]> {
    try {
      const products = await this.getAll();
      return products.map(transformToProductShort);
    } catch (error) {
      console.error('Error fetching products short:', error);
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
          product.description?.toLowerCase().includes(searchTerm),
      );
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },
};
