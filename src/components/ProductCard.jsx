import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { discountPercent, formatPrice, useApp } from "@/lib/store";

export default function ProductCard({ product }) {
  const { lang, t, addToCart } = useApp();
  const discount = discountPercent(product.price, product.oldPrice);

  return (
    <article className="group flex flex-col border border-border bg-card transition-shadow duration-300 hover:shadow-[0_18px_40px_-28px_rgba(32,32,32,0.5)]">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="relative block overflow-hidden bg-secondary"
      >
        <img
          src={product.images[0]}
          alt={product.name[lang]}
          loading="lazy"
          width={900}
          height={900}
          className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute start-3 top-3 flex flex-col gap-1">
          {product.new && (
            <span className="bg-foreground px-2 py-1 text-[10px] tracking-widest text-primary-foreground uppercase">
              {t("common.new")}
            </span>
          )}
          {discount && (
            <span className="bg-gold px-2 py-1 text-[10px] tracking-widest text-primary-foreground">
              {t("product.discount", { value: discount })}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link to="/product/$slug" params={{ slug: product.slug }} className="text-base leading-snug">
          {product.name[lang]}
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.shortDescription[lang]}</p>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-base">{formatPrice(product.price, lang)}</span>
          {product.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.oldPrice, lang)}
            </span>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => addToCart(product, 1)}
            className="inline-flex flex-1 items-center justify-center gap-2 bg-foreground px-3 py-2.5 text-sm text-primary-foreground transition-opacity hover:opacity-85"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={1.4} />
            {t("product.addToCart")}
          </button>
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="inline-flex items-center justify-center border border-border px-3 py-2.5 text-sm transition-colors hover:border-foreground"
          >
            {t("product.view")}
          </Link>
        </div>
      </div>
    </article>
  );
}
