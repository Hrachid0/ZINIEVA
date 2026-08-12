import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useApp } from "@/lib/store";

export default function FAQItem({ item }) {
  const { lang } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-start"
        aria-expanded={open}
      >
        <span className="text-base">{item.question[lang]}</span>
        {open ? (
          <Minus className="h-4 w-4 shrink-0 text-taupe" strokeWidth={1.4} />
        ) : (
          <Plus className="h-4 w-4 shrink-0 text-taupe" strokeWidth={1.4} />
        )}
      </button>
      {open && (
        <p className="fade-up pb-5 text-sm leading-relaxed text-muted-foreground">{item.answer[lang]}</p>
      )}
    </div>
  );
}
