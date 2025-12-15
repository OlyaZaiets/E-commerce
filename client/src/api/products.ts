import type { Product } from "../types/products";

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch('http://localhost:5000/api/products');

  const result = await response.json();
  if(!response.ok) {
    throw new Error(result.message || 'Failed to load products')
  }

  return result;
}