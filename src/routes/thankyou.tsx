import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/thankyou")({
  head: () => ({
    meta: [
      { title: "Merci — ZINIEVA" },
      { name: "description", content: "Votre commande a bien été enregistrée. Merci pour votre confiance." },
      { property: "og:title", content: "Merci — ZINIEVA" },
      { property: "og:description", content: "Merci pour votre commande chez ZINIEVA." },
      { property: "og:url", content: "/thankyou" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/thankyou" }],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  return (
    <div className="container-z flex min-h-[60vh] items-center justify-center py-16">
      <div className="max-w-xl border border-border bg-card p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
          <CheckCircle2 className="h-8 w-8 text-gold" strokeWidth={1.6} />
        </div>
        <h1 className="mt-6 text-3xl sm:text-4xl">Merci pour votre commande !</h1>
        <p className="mt-4 text-sm text-muted-foreground sm:text-base">
          Votre commande a bien été enregistrée. Nous vous contacterons prochainement pour confirmer les détails.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center bg-foreground px-6 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-85"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
