export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  title: string;
  text: string;
  images?: string[];
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewStats {
  productId: string;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}
