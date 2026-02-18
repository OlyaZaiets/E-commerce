const BASE_URL = import.meta.env.VITE_API_URL;
// const BASE_URL = 'http://localhost:5000/api/users';
const token = () => localStorage.getItem('token');

export const addToWishlist = async (productId: string) => {
  const res = await fetch(`${BASE_URL}/users/wishlist/${productId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });

  if (!res.ok) throw new Error('Failed to add to wishlist');
  return res.json();
};

export const removeFromWishlist = async (productId: string) => {
  const res = await fetch(`${BASE_URL}/users/wishlist/${productId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
  return res.json();
};

export const getWishlist = async () => {
  const res = await fetch(`${BASE_URL}/users/wishlist`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });

  if (!res.ok) throw new Error('Failed to load wishlist');

  return res.json();
};
