import { createFileRoute } from "@tanstack/react-router";
import About from "@/pages/About";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "À propos — ZINIEVA" },
      {
        name: "description",
        content: "ZINIEVA, marque marocaine de beauté et d'accessoires : moins de produits, mieux choisis.",
      },
      { property: "og:title", content: "À propos — ZINIEVA" },
      { property: "og:description", content: "Une sélection essentielle de beauté, pour elles et pour eux." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});
