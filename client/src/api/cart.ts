const BASE_URL = 'http://localhost:5000/api/cart';
const token = () => localStorage.getItem('token');

export const apiGetCart = async () => {
  const res = await fetch(`${BASE_URL}`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });

  if (!res.ok) throw new Error('Failed to load cart');

  return res.json();
};

export const apiAddToCart = async (productId: string) => {
  const res = await fetch(`${BASE_URL}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token()}`,
    },
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) throw new Error('Failed to add item to cart');

  return res.json();
};

export const apiUpdateQuantity = async (productId: string, quantity: number) => {
  const res = await fetch(`${BASE_URL}/${productId}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token()}`,
  },
  body: JSON.stringify({ quantity }),
  });

  if (!res.ok) throw new Error('Failed to update quantity');

  return res.json();

}

export const apiRemoveFromCart = async (productId: string) => {
  const res = await fetch(`${BASE_URL}/remove/${productId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });

  if (!res.ok) throw new Error('Failed to remove item');

  return res.json();
};


