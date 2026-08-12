import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, ShieldCheck } from "lucide-react";
import { formatPrice, useApp } from "@/lib/store";
import { isValidMoroccanPhone, submitOrder } from "@/lib/orders";

/**
 * items: [{ id, name: {fr, ar}, price, quantity }]
 * onSuccess: optional callback (used by the cart to empty itself)
 */
export default function OrderForm({ items, total, onSuccess, onCancel }) {
  const { t, lang } = useApp();
  const [form, setForm] = useState({ fullName: "", phone: "", city: "", address: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const update = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  async function handleSubmit(event) {
    event.preventDefault();
    if (loading) return;

    const nextErrors = {};
    if (form.fullName.trim().length < 3) nextErrors.fullName = t("order.errorName");
    if (!isValidMoroccanPhone(form.phone.trim())) nextErrors.phone = t("order.errorPhone");
    if (form.city.trim().length < 2) nextErrors.city = t("order.errorCity");
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    setSubmitError("");
    try {
      await submitOrder({
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        city: form.city.trim(),
        address: form.address.trim(),
        product: items.map((item) => `${item.name[lang]} x${item.quantity}`).join(" | "),
        productId: items.map((item) => item.id).join(","),
        quantity: items.reduce((sum, item) => sum + item.quantity, 0),
        total,
        language: lang,
      });
      setDone(true);
      if (onSuccess) onSuccess();
    } catch {
      setSubmitError(t("order.errorSubmit"));
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="fade-up border border-border bg-card p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
          <Check className="h-6 w-6 text-gold" strokeWidth={1.4} />
        </span>
        <h2 className="mt-5 text-2xl">{t("order.successTitle")}</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{t("order.successText")}</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center bg-foreground px-6 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-85"
        >
          {t("order.backHome")}
        </Link>
      </div>
    );
  }

  const inputClass =
    "w-full border border-border bg-card px-4 py-3 text-base outline-none transition-colors focus:border-foreground";

  return (
    <form onSubmit={handleSubmit} className="border border-border bg-card p-6 sm:p-8">
      <h2 className="text-2xl">{t("order.title")}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{t("order.subtitle")}</p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="eyebrow block" htmlFor="fullName">
            {t("order.fullName")}
          </label>
          <input id="fullName" className={`mt-2 ${inputClass}`} value={form.fullName} onChange={update("fullName")} />
          {errors.fullName && <p className="mt-1 text-xs text-destructive">{errors.fullName}</p>}
        </div>

        <div>
          <label className="eyebrow block" htmlFor="phone">
            {t("order.phone")}
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            dir="ltr"
            className={`mt-2 ${inputClass}`}
            value={form.phone}
            onChange={update("phone")}
            placeholder="06 12 34 56 78"
          />
          {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
        </div>

        <div>
          <label className="eyebrow block" htmlFor="city">
            {t("order.city")}
          </label>
          <input id="city" className={`mt-2 ${inputClass}`} value={form.city} onChange={update("city")} />
          {errors.city && <p className="mt-1 text-xs text-destructive">{errors.city}</p>}
        </div>

        <div>
          <label className="eyebrow block" htmlFor="address">
            {t("order.address")}
          </label>
          <input id="address" className={`mt-2 ${inputClass}`} value={form.address} onChange={update("address")} />
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-4">
        <h3 className="eyebrow">{t("order.summary")}</h3>
        <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between gap-4">
              <span>
                {item.name[lang]} × {item.quantity}
              </span>
              <span>{formatPrice(item.price * item.quantity, lang)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t border-border pt-3 text-base">
          <span>{t("cart.total")}</span>
          <span>{formatPrice(total, lang)}</span>
        </div>
      </div>

      {submitError && <p className="mt-4 text-sm text-destructive">{submitError}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full bg-foreground px-6 py-3.5 text-sm text-primary-foreground transition-opacity hover:opacity-85 disabled:opacity-60"
      >
        {loading ? t("order.sending") : t("order.submit")}
      </button>

      <p className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-gold" strokeWidth={1.4} />
        {t("product.cod")}
      </p>

      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="mt-3 w-full py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          {t("order.cancel")}
        </button>
      )}
    </form>
  );
}
