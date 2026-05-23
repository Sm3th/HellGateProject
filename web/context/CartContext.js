import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return action.payload;

    case "ADD": {
      const { item } = action;
      const idx = state.findIndex(
        (x) => x.id === item.id && x.size === item.size && x.color === item.color
      );
      if (idx >= 0) {
        return state.map((x, i) =>
          i === idx ? { ...x, qty: x.qty + item.qty } : x
        );
      }
      return [...state, item];
    }

    case "REMOVE":
      return state.filter((_, i) => i !== action.index);

    case "INC":
      return state.map((x, i) => i === action.index ? { ...x, qty: x.qty + 1 } : x);

    case "DEC":
      return state.map((x, i) => i === action.index ? { ...x, qty: Math.max(1, x.qty - 1) } : x);

    case "CLEAR":
      return [];

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(reducer, []);

  // Hydrate from localStorage once on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("hg_cart");
      if (saved) dispatch({ type: "INIT", payload: JSON.parse(saved) });
    } catch {}
  }, []);

  // Persist whenever cart changes
  useEffect(() => {
    try { localStorage.setItem("hg_cart", JSON.stringify(cart)); } catch {}
  }, [cart]);

  const addItem  = useCallback((item) => dispatch({ type: "ADD", item }), []);
  const removeItem = useCallback((index) => dispatch({ type: "REMOVE", index }), []);
  const inc      = useCallback((index) => dispatch({ type: "INC", index }), []);
  const dec      = useCallback((index) => dispatch({ type: "DEC", index }), []);
  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const totalItems = useMemo(() => cart.reduce((s, x) => s + x.qty, 0), [cart]);
  const subtotal   = useMemo(() => cart.reduce((s, x) => s + x.price * x.qty, 0), [cart]);

  const value = useMemo(
    () => ({ cart, addItem, removeItem, inc, dec, clearCart, totalItems, subtotal }),
    [cart, addItem, removeItem, inc, dec, clearCart, totalItems, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
