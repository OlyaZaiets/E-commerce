// src/context/WishlistContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { getWishlist, addToWishlist, removeFromWishlist } from '../api/wishlist';
import type { Product } from '../types/products';
import { useAuth } from './useAuth';

interface WishlistContextType {
  wishlist: string[];
  wishlistProducts: Product[];
  wishlistCount: number;
  toggleWishlist: (id: string) => Promise<void>;
  refreshWishlist: () => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const { token } = useAuth();



  const refreshWishlist = () => {
    getWishlist().then((items: Product[]) => {
      setWishlist(items.map(item => item._id));
      setWishlistProducts(items);
    });
  };

  const toggleWishlist = async (productId: string) => {
    if (wishlist.includes(productId)) {
      await removeFromWishlist(productId);
      refreshWishlist();
    } else {
      await addToWishlist(productId);
      refreshWishlist();
    }
  };

  const clearWishlist = () => {
  setWishlist([]);
  setWishlistProducts([]);
  };

  useEffect(() => {
  if (token) {
    // user logged in → load wishlist
    refreshWishlist();
  } else {
    // user logged out → clear wishlist
    clearWishlist();
  }
}, [token]);



  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistProducts,
        wishlistCount: wishlist.length,
        toggleWishlist,
        refreshWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext)!;
