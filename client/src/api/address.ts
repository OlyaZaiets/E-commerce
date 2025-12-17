import type { AddressInput } from "../schemas/addressSchema";
import type { Address } from "../types/address";

const BASE_URL = 'http://localhost:5000/api/users';
const token = () => localStorage.getItem('token');

export const getAddress = async (): Promise<Address | null> => {
  const res = await fetch(`${BASE_URL}/address`, {
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })

  const result = await res.json();

  if (!res.ok) throw new Error(result.message || 'Failed to load address');

  return result;

}

export const updateAddress = async (
  payload: AddressInput): Promise<Address> => {
  const res = await fetch(`${BASE_URL}/address`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token()}`
    },
    body: JSON.stringify(payload),
  })

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || 'Failed to update address');
  }

  return result;

}
