"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  image: string;
  unit: string;
  qty: number;
}

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  compare: string[];
  recent: string[];
  cartCount: number;
  subtotal: number;
  mounted: boolean;
  addToCart: (item: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  toggleCompare: (slug: string) => void;
  addRecent: (slug: string) => void;
}

const StoreContext = createContext<StoreState | null>(null);

function readLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCart(readLS<CartItem[]>("an_cart", []));
    setWishlist(readLS<string[]>("an_wishlist", []));
    setCompare(readLS<string[]>("an_compare", []));
    setRecent(readLS<string[]>("an_recent", []));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("an_cart", JSON.stringify(cart));
      localStorage.setItem("an_wishlist", JSON.stringify(wishlist));
      localStorage.setItem("an_compare", JSON.stringify(compare));
      localStorage.setItem("an_recent", JSON.stringify(recent));
    }
  }, [cart, wishlist, compare, recent, mounted]);

  const addToCart = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setCart((c) => {
      const i = c.findIndex((x) => x.slug === item.slug);
      if (i >= 0) {
        const copy = [...c];
        copy[i] = { ...copy[i], qty: copy[i].qty + qty };
        return copy;
      }
      return [...c, { ...item, qty }];
    });
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setCart((c) => (qty <= 0 ? c.filter((x) => x.slug !== slug) : c.map((x) => (x.slug === slug ? { ...x, qty } : x))));
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    setCart((c) => c.filter((x) => x.slug !== slug));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((w) => (w.includes(slug) ? w.filter((x) => x !== slug) : [...w, slug]));
  }, []);

  const toggleCompare = useCallback((slug: string) => {
    setCompare((c) => (c.includes(slug) ? c.filter((x) => x !== slug) : c.length >= 4 ? c : [...c, slug]));
  }, []);

  const addRecent = useCallback((slug: string) => {
    setRecent((r) => [slug, ...r.filter((x) => x !== slug)].slice(0, 8));
  }, []);

  const value = useMemo<StoreState>(
    () => ({
      cart,
      wishlist,
      compare,
      recent,
      mounted,
      cartCount: cart.reduce((s, x) => s + x.qty, 0),
      subtotal: cart.reduce((s, x) => s + x.qty * x.price, 0),
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      toggleCompare,
      addRecent,
    }),
    [cart, wishlist, compare, recent, mounted, addToCart, setQty, removeFromCart, clearCart, toggleWishlist, toggleCompare, addRecent]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const t = (localStorage.getItem("an_theme") as "light" | "dark") || "light";
    setTheme(t);
    if (t === "dark") document.documentElement.classList.add("dark");
  }, []);
  const toggle = useCallback(() => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      localStorage.setItem("an_theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  }, []);
  return { theme, toggle };
}
