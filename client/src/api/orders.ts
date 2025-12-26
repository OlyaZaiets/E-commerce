import type { OrderDetails, OrderHistoryItem } from "../types/orders";

const BASE_URL = 'http://localhost:5000/api/orders';
const token = () => localStorage.getItem('token');

export type CheckoutResponse = {
  orderId: string;
  orderNumber: string;
};

export const apiCheckout = async (): Promise<CheckoutResponse> => {
  const res = await fetch(`${BASE_URL}/checkout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Checkout failed");

  return result;
};

export const apiGetOrders = async (): Promise<OrderHistoryItem[]> => {
  const res = await fetch(`${BASE_URL}`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Failed to load orders");

  return result;
};

export const apiGetOrderById = async (id: string): Promise<OrderDetails> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Failed to load order");

  return result;
};