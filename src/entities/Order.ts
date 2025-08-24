export interface Order {
  id: string;
  userId: string;
  products: OrderProduct[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  installationRequired: boolean;
  installationAddress: string;
  installationDate?: Date;
  paymentMethod: 'card' | 'cash' | 'transfer';
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderProduct {
  productId: string;
  quantity: number;
  price: number;
  name: string;
}

export interface OrderStatus {
  id: string;
  orderId: string;
  status: string;
  comment?: string;
  createdAt: Date;
}
