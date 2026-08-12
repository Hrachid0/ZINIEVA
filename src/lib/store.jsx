import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import fr from "@/local/fr.json";
import ar from "@/local/ar.json";

const dictionaries = { fr, ar };

const LANG_KEY = "zinieva_lang";
const CART_KEY = "zinieva_cart";

const AppContext = createContext(null);

function get(obj, path) {
  return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
}

export function AppProvider({ children }) {
  const [lang, setLang] = useState("fr");
  const [cart, setCart] = useState([]);

  // Load persisted state after hydration (localStorage is browser-only).
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(LANG_KEY);
      if (savedLang === "fr" || savedLang === "ar") setLang(savedLang);
      const savedCart = localStorage.getItem(CART_KEY);
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* ignore */
    }
  }, [cart]);

  const t = useCallback(
    (key, vars) => {
      let value = get(dictionaries[lang], key) ?? get(dictionaries.fr, key) ?? key;
      if (vars && typeof value === "string") {
        Object.entries(vars).forEach(([k, v]) => {
          value = value.replace(`{${k}}`, String(v));
        });
      }
      return value;
    },
    [lang],
  );

  const addToCart = useCallback((product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.images[0],
          quantity,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const value = useMemo(() => {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return {
      lang,
      setLang,
      t,
      dir: lang === "ar" ? "rtl" : "ltr",
      cart,
      count,
      subtotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    };
  }, [lang, t, cart, addToCart, removeFromCart, updateQuantity, clearCart]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

export function formatPrice(price, lang) {
  const currency = lang === "ar" ? "درهم" : "MAD";
  return `${price} ${currency}`;
}

export function discountPercent(price, oldPrice) {
  if (!oldPrice || oldPrice <= price) return null;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}
