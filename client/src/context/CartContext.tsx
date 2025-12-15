import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import type { Product } from '../types/products';
import { useAuth } from './useAuth';
import { apiAddToCart, apiGetCart, apiRemoveFromCart, apiUpdateQuantity } from '../api/cart';

interface CartItem  {
  productId: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  cartCount: number;
  refreshCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { isLoggedInUser } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);

  const refreshCart = async () => {
    if(!isLoggedInUser) return setCart([]);
    const data = await apiGetCart()
    setCart(data.items);
  }
  
  useEffect(() => {
    refreshCart();
  }, [isLoggedInUser]);



  const addToCart = async (productId: string) => {
    await apiAddToCart(productId);
    await refreshCart()
  };
  
  const updateQuantity = async (productId: string, quantity: number) => {
    await apiUpdateQuantity(productId, quantity);
    await refreshCart()
  };
  
  const removeFromCart = async (productId: string) => {
    await apiRemoveFromCart(productId);
    await refreshCart();
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext)!;
