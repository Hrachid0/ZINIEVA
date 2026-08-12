import { Link } from "@tanstack/react-router";
import { PackageCheck, Sparkles, Truck, Wallet } from "lucide-react";
import ProductGrid from "@/components/ProductGrid";
import products from "@/data/products.json";
import categories from "@/data/categories.json";
import { useApp } from "@/lib/store";

function Section({ eyebrow, title, children, action }) {
  return (
    <section className="container-z mt-20">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 className="mt-2 text-3xl sm:text-4xl">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export default function Home() {
  const { t, lang } = useApp();
  const featured = products.filter((p) => p.featured);
  const newArrivals = products.filter((p) => p.new);
  const bestSellers = products.filter((p) => p.bestSeller);

  const why = [
    { icon: Wallet, title: t("home.why1"), text: t("home.why1Text") },
    { icon: Truck, title: t("home.why2"), text: t("home.why2Text") },
    { icon: Sparkles, title: t("home.why3"), text: t("home.why3Text") },
    { icon: PackageCheck, title: t("home.why4"), text: t("home.why4Text") },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-secondary/60">
        <div className="container-z grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div className="fade-up">
            <p className="eyebrow">ZINIEVA — Maroc</p>
            <h1 className="mt-4 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">{t("home.heroTitle")}</h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              {t("home.heroSubtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="bg-foreground px-7 py-3.5 text-sm text-primary-foreground transition-opacity hover:opacity-85"
              >
                {t("home.ctaPrimary")}
              </Link>
              <Link
                to="/products"
                search={{ filter: "new" }}
                className="border border-foreground px-7 py-3.5 text-sm transition-colors hover:bg-foreground hover:text-primary-foreground"
              >
                {t("home.ctaSecondary")}
              </Link>
            </div>
            <p className="mt-6 text-xs tracking-wide text-taupe">
              {t("home.why1")} · {t("home.why2")}
            </p>
          </div>

          <div className="fade-up">
            <img
              src="/images/hero.jpg"
              alt={t("home.heroTitle")}
              width={1600}
              height={1104}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <Section eyebrow="01" title={t("home.categories")}>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to="/products"
              search={{ category: category.slug }}
              className="group relative block overflow-hidden border border-border"
            >
              <img
                src={category.image}
                alt={category.name[lang]}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-card/90 px-4 py-3 text-sm">
                {category.name[lang]}
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Featured */}
      <Section
        eyebrow="02"
        title={t("home.featured")}
        action={
          <Link to="/products" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            {t("home.viewAll")}
          </Link>
        }
      >
        <ProductGrid products={featured} />
      </Section>

      {/* New arrivals */}
      <Section eyebrow="03" title={t("home.new")}>
        <ProductGrid products={newArrivals} />
      </Section>

      {/* Best sellers */}
      <Section eyebrow="04" title={t("home.bestSellers")}>
        <ProductGrid products={bestSellers} />
      </Section>

      {/* Why ZINIEVA */}
      <section className="mt-24 border-y border-border bg-secondary/60 py-16">
        <div className="container-z">
          <h2 className="text-3xl sm:text-4xl">{t("home.whyTitle")}</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((item) => (
              <div key={item.title}>
                <item.icon className="h-6 w-6 text-gold" strokeWidth={1.2} />
                <h3 className="mt-4 text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-z mt-24">
        <div className="bg-foreground px-6 py-16 text-center text-primary-foreground sm:px-16">
          <h2 className="text-3xl sm:text-4xl">{t("home.ctaTitle")}</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-primary-foreground/70">{t("home.ctaText")}</p>
          <Link
            to="/products"
            className="mt-8 inline-flex bg-background px-8 py-3.5 text-sm text-foreground transition-opacity hover:opacity-85"
          >
            {t("home.ctaPrimary")}
          </Link>
        </div>
      </section>
    </div>
  );
}
