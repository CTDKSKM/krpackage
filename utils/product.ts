

import { Product } from '@/types';

export const getProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${process.env.VERCEL_URL}/api/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  };
  
  export const saveProducts = async (products: Product[]): Promise<void> => {
    const response = await fetch(`${process.env.VERCEL_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(products),
    });
    if (!response.ok) {
      throw new Error('Failed to save products');
    }
  };
