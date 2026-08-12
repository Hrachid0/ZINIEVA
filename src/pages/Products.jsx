import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import ProductGrid from "@/components/ProductGrid";
import products from "@/data/products.json";
import categories from "@/data/categories.json";
import { useApp } from "@/lib/store";

export default function Products({ initialCategory = "", initialFilter = "" }) {
  const { t, lang } = useApp();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("default");
  const [filter, setFilter] = useState(initialFilter);

  const visible = useMemo(() => {
    const categoryId = categories.find((c) => c.slug === category)?.id;
    let list = products.filter((product) => {
      if (categoryId && product.categoryId !== categoryId) return false;
      if (filter === "featured" && !product.featured) return false;
      if (filter === "new" && !product.new) return false;
      if (filter === "bestSeller" && !product.bestSeller) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const haystack = `${product.name.fr} ${product.name.ar} ${product.shortDescription.fr}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
    if (sort === "priceAsc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "priceDesc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [search, category, sort, filter]);

  const filters = [
    { value: "featured", label: t("products.filterFeatured") },
    { value: "new", label: t("products.filterNew") },
    { value: "bestSeller", label: t("products.filterBest") },
  ];

  const selectClass =
    "w-full border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-foreground";

  return (
    <div className="container-z py-12">
      <header className="max-w-xl">
        <p className="eyebrow">ZINIEVA</p>
        <h1 className="mt-2 text-4xl sm:text-5xl">{t("products.title")}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{t("products.subtitle")}</p>
      </header>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 start-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.4} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("products.search")}
            className={`${selectClass} ps-11`}
            aria-label={t("products.search")}
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={selectClass}
          aria-label={t("products.allCategories")}
        >
          <option value="">{t("products.allCategories")}</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name[lang]}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className={selectClass}
          aria-label={t("products.sort")}
        >
          <option value="default">{t("products.sortDefault")}</option>
          <option value="priceAsc">{t("products.sortPriceAsc")}</option>
          <option value="priceDesc">{t("products.sortPriceDesc")}</option>
        </select>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {filters.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setFilter((prev) => (prev === item.value ? "" : item.value))}
            className={`border px-4 py-2 text-xs tracking-wide transition-colors ${
              filter === item.value
                ? "border-foreground bg-foreground text-primary-foreground"
                : "border-border hover:border-foreground"
            }`}
          >
            {item.label}
          </button>
        ))}
        <span className="ms-auto text-xs text-muted-foreground">
          {t("products.count", { count: visible.length })}
        </span>
      </div>

      <div className="mt-8">
        {visible.length > 0 ? (
          <ProductGrid products={visible} />
        ) : (
          <p className="py-16 text-center text-sm text-muted-foreground">{t("products.empty")}</p>
        )}
      </div>
    </div>
  );
}
