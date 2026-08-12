import { createFileRoute } from "@tanstack/react-router";
import Products from "@/pages/Products";

type ProductsSearch = { category?: string | undefined; filter?: string | undefined };

export const Route = createFileRoute("/products")({
  validateSearch: (search: Record<string, unknown>): ProductsSearch => ({
    category: typeof search["category"] === "string" ? search["category"] : undefined,
    filter: typeof search["filter"] === "string" ? search["filter"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Nos produits — ZINIEVA" },
      {
        name: "description",
        content:
          "Découvrez la sélection ZINIEVA : soins du visage, parfums unisexes, rituels homme et compléments. Paiement à la livraison au Maroc.",
      },
      { property: "og:title", content: "Nos produits — ZINIEVA" },
      { property: "og:description", content: "Soins, parfums et compléments sélectionnés avec soin." },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsRoute,
});

function ProductsRoute() {
  const search = Route.useSearch();
  return <Products initialCategory={search.category ?? ""} initialFilter={search.filter ?? ""} />;
}
