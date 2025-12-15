const BASE_URL = 'http://localhost:5000/api/users';
const token = () => localStorage.getItem('token');

export const addToWishlist = async (productId: string) => {
  const res = await fetch(`${BASE_URL}/wishlist/${productId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });

  if (!res.ok) throw new Error('Failed to add to wishlist');
  return res.json();
};

export const removeFromWishlist = async (productId: string) => {
  const res = await fetch(`${BASE_URL}/wishlist/${productId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
  return res.json();
};

export const getWishlist = async () => {
  const res = await fetch(`${BASE_URL}/wishlist`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });

  if (!res.ok) throw new Error('Failed to load wishlist');

  return res.json();
};
