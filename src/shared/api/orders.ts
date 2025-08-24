import { Order } from '../../entities/Order';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const ordersApi = {
  // Создать заказ
  async create(orderData: Partial<Order>): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    return response.json();
  },

  // Получить заказы пользователя
  async getUserOrders(userId: string): Promise<Order[]> {
    const response = await fetch(`${API_BASE_URL}/orders?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user orders');
    }
    return response.json();
  },

  // Получить заказ по ID
  async getById(id: string): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }
    return response.json();
  },

  // Обновить статус заказа
  async updateStatus(id: string, status: Order['status']): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error('Failed to update order status');
    }
    return response.json();
  },
};
