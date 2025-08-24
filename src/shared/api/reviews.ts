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

  // Создать отзыв
  async create(reviewData: Partial<Review>): Promise<Review> {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });
    if (!response.ok) {
      throw new Error('Failed to create review');
    }
    return response.json();
  },

  // Получить отзывы пользователя
  async getUserReviews(userId: string): Promise<Review[]> {
    const response = await fetch(`${API_BASE_URL}/reviews?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user reviews');
    }
    return response.json();
  },

  // Обновить отзыв
  async update(id: string, reviewData: Partial<Review>): Promise<Review> {
    const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });
    if (!response.ok) {
      throw new Error('Failed to update review');
    }
    return response.json();
  },
};
