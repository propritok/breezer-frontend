import { productsApi } from '@/shared/api/products';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const products = await productsApi.getAllShort();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
    return NextResponse.json([], { status: 500 });
  }
}
