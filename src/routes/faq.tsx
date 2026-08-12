import { createFileRoute } from "@tanstack/react-router";
import FAQ from "@/pages/FAQ";
import faq from "@/data/faq.json";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Questions fréquentes — ZINIEVA" },
      { name: "description", content: "Livraison, paiement à la livraison, commandes : toutes les réponses." },
      { property: "og:title", content: "Questions fréquentes — ZINIEVA" },
      { property: "og:description", content: "Tout ce qu'il faut savoir avant de commander chez ZINIEVA." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.question.fr,
            acceptedAnswer: { "@type": "Answer", text: item.answer.fr },
          })),
        }),
      },
    ],
  }),
  component: FAQ,
});
