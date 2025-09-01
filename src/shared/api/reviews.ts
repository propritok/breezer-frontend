import { Review } from '../../entities/Review';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const reviewsApi = {
  // Получить отзывы продукта
  async getProductReviews(productId: string): Promise<Review[]> {
    const response = await fetch(`${API_BASE_URL}/reviews?productId=${productId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product reviews');
    }
    return response.json();
  },

  // Получить отзывы продукта
  async getReviews(): Promise<Review[]> {
    const response = await fetch(`${API_BASE_URL}/api/collections/reviews/records`);
    if (!response.ok) {
      throw new Error('Failed to fetch product reviews');
    }
    return response.json();
  },
};
