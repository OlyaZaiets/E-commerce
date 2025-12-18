import type { Product } from '../types/products';
const BASE_URL = 'http://localhost:5000/api/products';
const token = () => localStorage.getItem('token');

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

export const deleteProduct = async (id: string): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });

  const result = await response.json();

  if(!response.ok) {
    throw new Error(result.message ||'Failed to delete product')
  }

  return result;
}

export const updateProductPrice = async (
  id: string,
  price: number
): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token()}`,
    },
    body: JSON.stringify({ price }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to update product price');
  }

  return result;
};

export const updateProduct = async (
  id: string,
  payload: Partial<Product>
): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token()}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to update product');
  }

  return result;
};
