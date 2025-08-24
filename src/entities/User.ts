export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  role: 'customer' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: string;
  userId: string;
  avatar?: string;
  preferences: {
    newsletter: boolean;
    notifications: boolean;
  };
  orders: string[];
  reviews: string[];
}
