import { config } from "../config";

// Интерфейс для ответа PocketBase
interface PocketBaseResponse<T> {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  items: T[];
}

// Интерфейс для отзыва из PocketBase
export interface PocketBaseReview {
  collectionId: string;
  collectionName: string;
  id: string;
  customer: string; // имя клиента
  mark: number; // оценка
  review: string; // текст отзыва
  service?: string; // услуга/продукт (опционально)
  review_on_maps?: string; // ссылка на отзыв
  date?: string; // дата отзыва
  created: string;
  updated: string;
}

export const reviewsApi = {
  // Получить все отзывы
  async getAll(): Promise<PocketBaseReview[]> {
    const response = await fetch(
      `${config.pocketbase.baseUrl}/collections/reviews/records`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch reviews: ${response.status}`);
    }
    const data: PocketBaseResponse<PocketBaseReview> = await response.json();
    return data.items;
  },
};
