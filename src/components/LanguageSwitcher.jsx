import { useApp } from "@/lib/store";

export default function LanguageSwitcher() {
  const { lang, setLang } = useApp();

  return (
    <div className="flex items-center gap-1 text-xs tracking-widest">
      <button
        type="button"
        onClick={() => setLang("fr")}
        className={`px-1.5 py-1 transition-colors ${lang === "fr" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
        aria-pressed={lang === "fr"}
      >
        FR
      </button>
      <span className="text-border">|</span>
      <button
        type="button"
        onClick={() => setLang("ar")}
        className={`px-1.5 py-1 transition-colors ${lang === "ar" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
        aria-pressed={lang === "ar"}
      >
        AR
      </button>
    </div>
  );
}
