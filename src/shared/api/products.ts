import { Product } from '../../entities/Product';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const productsApi = {
  // Получить все продукты
  async getAll(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },

  // Получить продукт по ID
  async getById(id: string): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return response.json();
  },

  // Получить продукты по категории
  async getByCategory(category: string): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products?category=${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products by category');
    }
    return response.json();
  },

  // Поиск продуктов
  async search(query: string): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to search products');
    }
    return response.json();
  },
};
