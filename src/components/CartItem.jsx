import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice, useApp } from "@/lib/store";

export default function CartItem({ item }) {
  const { lang, t, updateQuantity, removeFromCart } = useApp();

  return (
    <div className="flex gap-4 border-b border-border py-5">
      <Link to="/product/$slug" params={{ slug: item.slug }} className="shrink-0">
        <img
          src={item.image}
          alt={item.name[lang]}
          loading="lazy"
          className="h-24 w-24 border border-border object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between gap-3">
        <div className="flex items-start justify-between gap-3">
          <Link to="/product/$slug" params={{ slug: item.slug }} className="text-base">
            {item.name[lang]}
          </Link>
          <button
            type="button"
            onClick={() => removeFromCart(item.id)}
            aria-label={t("cart.remove")}
            className="p-1 text-muted-foreground transition-colors hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" strokeWidth={1.4} />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center border border-border">
            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="px-3 py-2"
              aria-label="-"
            >
              <Minus className="h-3.5 w-3.5" strokeWidth={1.4} />
            </button>
            <span className="min-w-8 text-center text-sm">{item.quantity}</span>
            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-3 py-2"
              aria-label="+"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={1.4} />
            </button>
          </div>
          <span className="text-base">{formatPrice(item.price * item.quantity, lang)}</span>
        </div>
      </div>
    </div>
  );
}
