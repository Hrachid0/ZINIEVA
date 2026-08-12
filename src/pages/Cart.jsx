import { useState } from "react";
import { Link } from "@tanstack/react-router";
import CartItem from "@/components/CartItem";
import OrderForm from "@/components/OrderForm";
import { formatPrice, useApp } from "@/lib/store";

export default function Cart() {
  const { t, lang, cart, subtotal, clearCart } = useApp();
  const [ordering, setOrdering] = useState(false);
  // Snapshot of the cart at checkout time (the cart is emptied on success).
  const [orderItems, setOrderItems] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);

  function startOrder() {
    setOrderItems(cart);
    setOrderTotal(subtotal);
    setOrdering(true);
  }

  if (ordering) {
    return (
      <div className="container-z max-w-2xl py-12">
        <OrderForm
          items={orderItems}
          total={orderTotal}
          onSuccess={clearCart}
          onCancel={() => setOrdering(false)}
        />
      </div>
    );
  }

  return (
    <div className="container-z py-12">
      <h1 className="text-4xl">{t("cart.title")}</h1>

      {cart.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-sm text-muted-foreground">{t("cart.empty")}</p>
          <Link
            to="/products"
            className="mt-6 inline-flex bg-foreground px-7 py-3.5 text-sm text-primary-foreground transition-opacity hover:opacity-85"
          >
            {t("cart.continue")}
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            <div className="mt-5 flex flex-wrap gap-4">
              <Link to="/products" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {t("cart.continue")}
              </Link>
              <button
                type="button"
                onClick={clearCart}
                className="text-sm text-muted-foreground transition-colors hover:text-destructive"
              >
                {t("cart.clear")}
              </button>
            </div>
          </div>

          <aside className="h-fit border border-border bg-card p-6">
            <h2 className="eyebrow">{t("order.summary")}</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("cart.subtotal")}</span>
                <span>{formatPrice(subtotal, lang)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("cart.shipping")}</span>
                <span>{t("cart.free")}</span>
              </div>
            </div>
            <div className="mt-4 flex justify-between border-t border-border pt-4 text-base">
              <span>{t("cart.total")}</span>
              <span>{formatPrice(subtotal, lang)}</span>
            </div>
            <button
              type="button"
              onClick={startOrder}
              className="mt-6 w-full bg-foreground px-6 py-3.5 text-sm text-primary-foreground transition-opacity hover:opacity-85"
            >
              {t("cart.orderNow")}
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">{t("product.cod")}</p>
          </aside>
        </div>
      )}
    </div>
  );
}
