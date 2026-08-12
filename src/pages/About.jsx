import { Link } from "@tanstack/react-router";
import { useApp } from "@/lib/store";

export default function About() {
  const { t } = useApp();

  return (
    <div>
      <div className="container-z grid items-center gap-12 py-14 lg:grid-cols-2">
        <div>
          <p className="eyebrow">ZINIEVA</p>
          <h1 className="mt-2 text-4xl sm:text-5xl">{t("about.title")}</h1>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
          </div>
          <Link
            to="/products"
            className="mt-8 inline-flex bg-foreground px-7 py-3.5 text-sm text-primary-foreground transition-opacity hover:opacity-85"
          >
            {t("about.cta")}
          </Link>
        </div>
        <img
          src="/images/hero.jpg"
          alt={t("about.title")}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover"
        />
      </div>
    </div>
  );
}
