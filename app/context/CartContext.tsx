"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
  id: number;
  quantity: number;
  size?: number;
}

interface WishlistItem {
  id: number;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  cartCount: number;
  wishlistCount: number;
  addToCart: (id: number, size?: number) => void;
  removeFromCart: (id: number, size?: number) => void;
  updateCartQuantity: (
    id: number,
    size: number | undefined,
    delta: number,
  ) => void;
  addToWishlist: (id: number) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const addToCart = (id: number, size?: number) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === id && item.size === size,
      );
      if (existing) {
        return prev.map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { id, size, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number, size?: number) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size)),
    );
  };

  const updateCartQuantity = (
    id: number,
    size: number | undefined,
    delta: number,
  ) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const addToWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.some((item) => item.id === id) ? prev : [...prev, { id }],
    );
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const isInWishlist = (id: number) => wishlist.some((item) => item.id === id);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        cartCount,
        wishlistCount,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export default CartProvider;
