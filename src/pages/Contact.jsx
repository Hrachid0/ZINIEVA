import { useState } from "react";
import { Facebook, Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import settings from "@/data/settings.json";
import { useApp } from "@/lib/store";

export default function Contact() {
  const { t } = useApp();
  const [sent, setSent] = useState(false);

  const inputClass =
    "w-full border border-border bg-card px-4 py-3 text-base outline-none transition-colors focus:border-foreground";

  return (
    <div className="container-z py-12">
      <header className="max-w-xl">
        <p className="eyebrow">ZINIEVA</p>
        <h1 className="mt-2 text-4xl sm:text-5xl">{t("contact.title")}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{t("contact.subtitle")}</p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="space-y-5 text-sm">
          <a
            href={`tel:${settings.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-3 border border-border bg-card p-5 transition-colors hover:border-foreground"
          >
            <Phone className="h-5 w-5 text-gold" strokeWidth={1.4} />
            <span>
              <span className="eyebrow block">{t("contact.phone")}</span>
              <span dir="ltr">{settings.phone}</span>
            </span>
          </a>
          <a
            href={`https://wa.me/${settings.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 border border-border bg-card p-5 transition-colors hover:border-foreground"
          >
            <MessageCircle className="h-5 w-5 text-gold" strokeWidth={1.4} />
            <span>
              <span className="eyebrow block">{t("contact.whatsapp")}</span>
              <span dir="ltr">+{settings.whatsapp}</span>
            </span>
          </a>
          <a
            href={`mailto:${settings.email}`}
            className="flex items-center gap-3 border border-border bg-card p-5 transition-colors hover:border-foreground"
          >
            <Mail className="h-5 w-5 text-gold" strokeWidth={1.4} />
            <span>
              <span className="eyebrow block">{t("contact.email")}</span>
              <span dir="ltr">{settings.email}</span>
            </span>
          </a>

          <div>
            <h2 className="eyebrow">{t("contact.follow")}</h2>
            <div className="mt-3 flex gap-3">
              <a
                href={settings.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="border border-border p-3 transition-colors hover:border-foreground"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.4} />
              </a>
              <a
                href={settings.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="border border-border p-3 transition-colors hover:border-foreground"
              >
                <Facebook className="h-4 w-4" strokeWidth={1.4} />
              </a>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="border border-border bg-card p-6 sm:p-8"
        >
          {sent ? (
            <p className="py-10 text-center text-sm">{t("contact.sent")}</p>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="eyebrow block" htmlFor="c-name">
                  {t("contact.formName")}
                </label>
                <input id="c-name" required className={`mt-2 ${inputClass}`} />
              </div>
              <div>
                <label className="eyebrow block" htmlFor="c-email">
                  {t("contact.formEmail")}
                </label>
                <input id="c-email" type="email" required className={`mt-2 ${inputClass}`} />
              </div>
              <div>
                <label className="eyebrow block" htmlFor="c-message">
                  {t("contact.formMessage")}
                </label>
                <textarea id="c-message" rows={5} required className={`mt-2 ${inputClass}`} />
              </div>
              <button
                type="submit"
                className="w-full bg-foreground px-6 py-3.5 text-sm text-primary-foreground transition-opacity hover:opacity-85"
              >
                {t("contact.send")}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
