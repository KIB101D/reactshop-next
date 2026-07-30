"use client";

import { createContext, useReducer } from "react";
import type { Product } from "../types";
import type { CartItem } from "../types";
import { showAddToCartToast } from "../utils/notifications";
import { showRemoveFromCartToast } from "../utils/notifications";

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  removeAllFromCart: () => void;
};

type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "INCREMENT"; payload: number }
  | { type: "DECREMENT"; payload: number }
  | { type: "CLEAR_CART" }
  | { type: "RESTORE_ITEM"; payload: CartItem };

export const CartContext = createContext<CartContextType | null>(null);
type CartProviderProps = {
  children: React.ReactNode;
};

function cartReducer(state: CartItem[], action: CartAction) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const product = action.payload;
      if (state.some((item) => item.id === product.id)) {
        return state.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...state, { ...product, quantity: 1 }];
    }

    case "REMOVE_FROM_CART":
      return state.filter((i) => i.id !== action.payload);

    case "INCREMENT":
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );

    case "DECREMENT":
      return state
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);

    case "CLEAR_CART":
      return [];

    case "RESTORE_ITEM":
      return [...state, action.payload];

    default:
      return state;
  }
}

export function CartProvider({ children }: CartProviderProps) {
  const initialState: CartItem[] = [];
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  function addToCart(product: Product) {
    dispatch({ type: "ADD_TO_CART", payload: product });
    showAddToCartToast(product);
  }

  function removeFromCart(productId: number) {
    const item = cart.find((i) => i.id === productId);
    if (!item) return;

    dispatch({ type: "REMOVE_FROM_CART", payload: productId });

    showRemoveFromCartToast(item, () => {
      dispatch({ type: "RESTORE_ITEM", payload: item });
    });
  }

  function increment(id: number) {
    dispatch({ type: "INCREMENT", payload: id });
  }

  function decrement(id: number) {
    dispatch({ type: "DECREMENT", payload: id });
  }

  function removeAllFromCart() {
    dispatch({ type: "CLEAR_CART" });
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increment,
        decrement,
        removeAllFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
