export const getProfile = async () => {
  const token = localStorage.getItem('token');

  const response = await fetch('http://localhost:5000/api/users/me', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to load profile');
  }

  return result;
};
