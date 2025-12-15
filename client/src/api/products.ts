import type { Product } from "../types/products";
const BASE_URL = 'http://localhost:5000/api/products';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(BASE_URL);

  const result = await response.json();
  if(!response.ok) {
    throw new Error(result.message || 'Failed to load products')
  }

  return result;
}

export const getProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/${id}`);

  const result = await response.json();
  if(!response.ok) {
    throw new Error(result.message || 'Failed to load product')
  }

  return result;
}