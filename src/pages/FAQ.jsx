import FAQItem from "@/components/FAQItem";
import faq from "@/data/faq.json";
import { useApp } from "@/lib/store";

export default function FAQ() {
  const { t } = useApp();

  return (
    <div className="container-z py-12">
      <header className="max-w-xl">
        <p className="eyebrow">ZINIEVA</p>
        <h1 className="mt-2 text-4xl sm:text-5xl">{t("faq.title")}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{t("faq.subtitle")}</p>
      </header>

      <div className="mt-10 max-w-3xl border-t border-border">
        {faq.map((item) => (
          <FAQItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
