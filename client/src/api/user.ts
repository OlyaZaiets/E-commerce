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

export const updateProfile = async (data: any) => {
  const token = localStorage.getItem('token');

  const response = await fetch('http://localhost:5000/api/users/me', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

    if (!response.ok) {
    throw new Error(result.message || 'Failed to update profile');
  }

  return result;

}
