import { Contact } from '../../entities/Contact';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const contactsApi = {
  // Отправить контактную форму
  async submitForm(contactData: Partial<Contact>): Promise<Contact> {
    const response = await fetch(`${API_BASE_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });
    if (!response.ok) {
      throw new Error('Failed to submit contact form');
    }
    return response.json();
  },

  // Подписаться на рассылку
  async subscribeToNewsletter(email: string): Promise<{ success: boolean }> {
    const response = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      throw new Error('Failed to subscribe to newsletter');
    }
    return response.json();
  },

  // Отписаться от рассылки
  async unsubscribeFromNewsletter(email: string): Promise<{ success: boolean }> {
    const response = await fetch(`${API_BASE_URL}/newsletter/unsubscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      throw new Error('Failed to unsubscribe from newsletter');
    }
    return response.json();
  },
};
