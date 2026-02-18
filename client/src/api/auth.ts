import type { LoginPayload, RegisterPayload } from '../types/auth';

const BASE_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (data: RegisterPayload) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if(!response.ok) {
    throw new Error(result.message || 'Registration failed')
  }

  return result;
}

export const loginUser = async (data: LoginPayload) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await response.json();

  if(!response.ok) {
  throw new Error(result.message || 'Login failed')
}

  return result;
}


export const googleAuth = async (accessToken: string) => {
  const res = await fetch(`${BASE_URL}/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accessToken }),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || 'Google auth failed');
  return result; // { token, role, ... }
};
