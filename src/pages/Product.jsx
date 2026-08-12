import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Minus, Plus, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import ProductGallery from "@/components/ProductGallery";
import OrderForm from "@/components/OrderForm";
import ProductGrid from "@/components/ProductGrid";
import products from "@/data/products.json";
import { discountPercent, formatPrice, useApp } from "@/lib/store";

export default function Product({ slug }) {
  const { t, lang, addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [ordering, setOrdering] = useState(false);
  const [added, setAdded] = useState(false);
  const orderRef = useRef(null);

  const product = products.find((p) => p.slug === slug);

  useEffect(() => {
    setQuantity(1);
    setOrdering(false);
  }, [slug]);

  if (!product) {
    return (
      <div className="container-z py-24 text-center">
        <h1 className="text-3xl">{t("product.notFound")}</h1>
        <Link to="/products" className="mt-6 inline-block text-sm underline">
          {t("product.back")}
        </Link>
      </div>
    );
  }

  const discount = discountPercent(product.price, product.oldPrice);
  const related = products.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id,
  );

  function handleAdd() {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  function handleOrder() {
    setOrdering(true);
    setTimeout(() => orderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  return (
    <div className="container-z py-10">
      <nav className="text-xs text-muted-foreground">
        <Link to="/products" className="transition-colors hover:text-foreground">
          {t("nav.products")}
        </Link>
        <span className="mx-2">/</span>
        <span>{product.name[lang]}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} alt={product.name[lang]} />

        <div>
          <h1 className="text-4xl leading-tight">{product.name[lang]}</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {product.shortDescription[lang]}
          </p>

          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            <span className="text-2xl">{formatPrice(product.price, lang)}</span>
            {product.oldPrice && (
              <span className="text-base text-muted-foreground line-through">
                {formatPrice(product.oldPrice, lang)}
              </span>
            )}
            {discount && (
              <span className="bg-gold px-2 py-1 text-[11px] text-primary-foreground">
                {t("product.discount", { value: discount })}
              </span>
            )}
          </div>

          <p className="mt-3 text-xs text-taupe">
            {product.available ? t("product.available") : t("product.unavailable")}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center border border-border">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-3"
                aria-label="-"
              >
                <Minus className="h-3.5 w-3.5" strokeWidth={1.4} />
              </button>
              <span className="min-w-10 text-center text-sm">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-3"
                aria-label="+"
              >
                <Plus className="h-3.5 w-3.5" strokeWidth={1.4} />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              disabled={!product.available}
              className="inline-flex flex-1 items-center justify-center gap-2 border border-foreground px-6 py-3.5 text-sm transition-colors hover:bg-foreground hover:text-primary-foreground disabled:opacity-50"
            >
              {added ? (
                <Check className="h-4 w-4" strokeWidth={1.4} />
              ) : (
                <ShoppingBag className="h-4 w-4" strokeWidth={1.4} />
              )}
              {added ? t("product.added") : t("product.addToCart")}
            </button>
          </div>

          {/* <button
            type="button"
            onClick={handleOrder}
            disabled={!product.available}
            className="mt-3 w-full bg-foreground px-6 py-4 text-sm text-primary-foreground transition-opacity hover:opacity-85 disabled:opacity-50"
          >
            {t("product.orderNow")}
          </button> */}
          <div ref={orderRef} className="mt-14 max-w-2xl scroll-mt-24">
            {
              <OrderForm
                items={[{ id: product.id, name: product.name, price: product.price, quantity }]}
                total={product.price * quantity}
                onCancel={() => setOrdering(false)}
              />
            }
          </div>

          <div className="mt-4 flex flex-wrap gap-5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-gold" strokeWidth={1.4} />
              {t("product.cod")}
            </span>
            <span className="inline-flex items-center gap-2">
              <Truck className="h-4 w-4 text-gold" strokeWidth={1.4} />
              {t("home.why2")}
            </span>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <h2 className="eyebrow">{t("product.description")}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {product.description[lang]}
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 text-2xl">{t("home.featured")}</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
