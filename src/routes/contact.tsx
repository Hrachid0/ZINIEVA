import { createFileRoute } from "@tanstack/react-router";
import Contact from "@/pages/Contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ZINIEVA" },
      { name: "description", content: "Contactez ZINIEVA par téléphone, WhatsApp ou e-mail. Réponse rapide." },
      { property: "og:title", content: "Contact — ZINIEVA" },
      { property: "og:description", content: "Une question sur une commande ? Nous répondons rapidement." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});
