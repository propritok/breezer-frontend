import { User } from '../../entities/User';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const usersApi = {
  // Получить пользователя по ID
  async getById(id: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return response.json();
  },

  // Обновить профиль пользователя
  async updateProfile(id: string, userData: Partial<User>): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to update user profile');
    }
    return response.json();
  },

  // Создать пользователя
  async create(userData: Partial<User>): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    return response.json();
  },
};
