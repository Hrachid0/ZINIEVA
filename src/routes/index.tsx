import { createFileRoute } from "@tanstack/react-router";
import Home from "@/pages/Home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZINIEVA — Beauté & compléments au Maroc | Paiement à la livraison" },
      {
        name: "description",
        content:
          "ZINIEVA : soins, parfums et compléments sélectionnés pour elles et pour eux. Livraison partout au Maroc, paiement à la livraison.",
      },
      { property: "og:title", content: "ZINIEVA — La beauté, simplement." },
      {
        property: "og:description",
        content: "Une sélection premium de produits de beauté et compléments, livrée partout au Maroc.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});
