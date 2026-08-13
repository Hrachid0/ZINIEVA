const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwji-_nqrlwCcEE00BUlZNNltl58nq16FgYyudlbZ22YtRX7sP5dScB4i2rPW-TiZbx/exec";

/**
 * Sends an order to the Google Sheet.
 * Uses no-cors + urlencoded body so the browser never blocks the request.
 */
export async function submitOrder(order) {
  const body = new URLSearchParams({
    fullName: order.fullName,
    phone: order.phone,
    city: order.city,
    address: order.address || "",
    product: order.product,
    productId: String(order.productId),
    quantity: String(order.quantity),
    price: String(order.price),
    language: order.language,
    orderDate: new Date().toISOString(),
  });

  await fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    body: body.toString(),
  });

  return true;
}

export function isValidMoroccanPhone(phone) {
  const cleaned = phone.replace(/[\s.-]/g, "");
  return /^(?:\+212|00212|0)?[5-7]\d{8}$/.test(cleaned);
}
