export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  type: 'general' | 'order' | 'support' | 'partnership';
  status: 'new' | 'read' | 'replied' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  type: string;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  active: boolean;
  subscribedAt: Date;
  unsubscribedAt?: Date;
}
