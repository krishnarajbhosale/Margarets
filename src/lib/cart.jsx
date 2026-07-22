import { createContext, useCallback, useContext, useMemo, useState } from "react";

/**
 * Cart state for the marketplace — UI-only, held in React state (no backend,
 * no persistence needed per spec). Clean actions (add / remove / updateQty /
 * clear) so a real checkout API can hook into the same surface later.
 *
 * An item is { product, qty }.
 */

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  const add = useCallback((product, qty = 1) => {
    if (!product?.inStock) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { product, qty }];
    });
    setOpen(true); // surface the drawer so the add is never a "dead" click
  }, []);

  const remove = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.product.id !== id));
  }, []);

  const updateQty = useCallback((id, qty) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.product.id !== id)
        : prev.map((i) => (i.product.id === id ? { ...i, qty } : i))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.product.price * i.qty, 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, count, subtotal, open, setOpen, add, remove, updateQty, clear }),
    [items, count, subtotal, open, add, remove, updateQty, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}

export const formatPrice = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(n);
