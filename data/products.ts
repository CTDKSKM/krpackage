import { Product } from '../types';

export const products: Product[] = [
  { modelName: 'DB400TDA', boxType: '본체(일반)박스' },
  // 더 많은 제품 추가...
];


export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch('/api/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const saveProducts = async (products: Product[]): Promise<void> => {
  const response = await fetch('/api/products', {
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
