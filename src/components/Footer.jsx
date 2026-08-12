import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import Logo from "./Logo";
import settings from "@/data/settings.json";
import { useApp } from "@/lib/store";

export default function Footer() {
  const { t, lang } = useApp();

  return (
    <footer className="mt-24 border-t border-border bg-secondary/50">
      <div className="container-z grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo className="h-10" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{t("footer.about")}</p>
        </div>

        <div>
          <h3 className="eyebrow">{t("footer.navigation")}</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
                {t("nav.home")}
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-muted-foreground transition-colors hover:text-foreground">
                {t("nav.products")}
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-muted-foreground transition-colors hover:text-foreground">
                {t("nav.about")}
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-muted-foreground transition-colors hover:text-foreground">
                {t("nav.faq")}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-muted-foreground transition-colors hover:text-foreground">
                {t("nav.contact")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">{t("footer.customer")}</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>{t("footer.delivery")} — {settings.delivery[lang]}</li>
            <li>{t("footer.cod")}</li>
            <li>
              <Link to="/faq" className="transition-colors hover:text-foreground">
                {t("footer.terms")}
              </Link>
            </li>
            <li>
              <Link to="/faq" className="transition-colors hover:text-foreground">
                {t("footer.privacy")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">{t("footer.social")}</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>
              <a
                href={settings.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.4} /> Instagram
              </a>
            </li>
            <li>
              <a
                href={settings.facebook}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Facebook className="h-4 w-4" strokeWidth={1.4} /> Facebook
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${settings.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.4} /> WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`tel:${settings.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Phone className="h-4 w-4" strokeWidth={1.4} /> {settings.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${settings.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4" strokeWidth={1.4} /> {settings.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-z py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {settings.brandName}. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
