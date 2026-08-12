import { createFileRoute } from "@tanstack/react-router";
import Product from "@/pages/Product";
import products from "@/data/products.json";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    const title = product ? `${product.name.fr} — ZINIEVA` : "Produit — ZINIEVA";
    const description = product ? product.shortDescription.fr : "Découvrez la sélection ZINIEVA.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/product/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/product/${params.slug}` }],
    };
  },
  component: ProductRoute,
});

function ProductRoute() {
  const { slug } = Route.useParams();
  return <Product slug={slug} />;
}
