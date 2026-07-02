import React, { createContext, useContext } from 'react';
import { useGetCart, Cart, getGetCartQueryKey } from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from './AuthContext';

interface CartContextType {
  cartCount: number;
  cart: Cart | undefined;
  isLoading: boolean;
  refetchCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const queryClient = useQueryClient();
  
  const { data: cart, isLoading } = useGetCart({
    query: {
      queryKey: getGetCartQueryKey(),
      enabled: isLoggedIn,
      // Refetch every 30s while logged in to stay fresh after mutations
      refetchInterval: isLoggedIn ? 30000 : false,
    }
  });

  const cartCount = cart?.itemCount ?? 0;

  const refetchCart = () => {
    queryClient.invalidateQueries({ queryKey: getGetCartQueryKey() });
  };

  return (
    <CartContext.Provider value={{ cartCount, cart, isLoading, refetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

