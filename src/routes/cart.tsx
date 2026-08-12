import { createFileRoute } from "@tanstack/react-router";
import Cart from "@/pages/Cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Panier — ZINIEVA" },
      { name: "description", content: "Vérifiez votre panier et commandez avec paiement à la livraison." },
      { property: "og:title", content: "Panier — ZINIEVA" },
      { property: "og:description", content: "Commande simple, paiement à la livraison partout au Maroc." },
      { property: "og:url", content: "/cart" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
  component: Cart,
});
