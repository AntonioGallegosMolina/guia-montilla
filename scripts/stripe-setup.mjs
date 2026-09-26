/**
 * Crea un Payment Link de Stripe para el plan Destacado (29 €/mes).
 * Requiere STRIPE_SECRET_KEY en el entorno (sk_live_... o sk_test_...).
 *
 * Uso: STRIPE_SECRET_KEY=sk_test_... node scripts/stripe-setup.mjs
 */
const key = process.env.STRIPE_SECRET_KEY?.trim();
if (!key) {
  console.log(`
Stripe — plan Destacado Guía Montilla

1. Entra en https://dashboard.stripe.com/products
2. Producto: "Guía Montilla — Destacado" · 29 EUR · Recurrente mensual
3. Crea un Enlace de pago y copia la URL (https://buy.stripe.com/...)
4. GitHub → Settings → Secrets → PUBLIC_STRIPE_PAYMENT_LINK_DESTACADO
   o en local: PUBLIC_STRIPE_PAYMENT_LINK_DESTACADO=... en .env

Opcional: export STRIPE_SECRET_KEY=sk_... && node scripts/stripe-setup.mjs
para crear producto + enlace por API.
`);
  process.exit(0);
}

const headers = {
  Authorization: `Bearer ${key}`,
  "Content-Type": "application/x-www-form-urlencoded",
};

async function stripePost(path, body) {
  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    method: "POST",
    headers,
    body: new URLSearchParams(body).toString(),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message ?? res.statusText);
  return json;
}

const product = await stripePost("/products", {
  name: "Guía Montilla — Plan Destacado",
  description: "Posición prioritaria en tu categoría + etiqueta Destacado en guiamontilla.es",
});

const price = await stripePost("/prices", {
  product: product.id,
  unit_amount: "2900",
  currency: "eur",
  "recurring[interval]": "month",
});

const link = await stripePost("/payment_links", {
  "line_items[0][price]": price.id,
  "line_items[0][quantity]": "1",
  allow_promotion_codes: "true",
});

console.log("\n✓ Payment Link creado:\n");
console.log(link.url);
console.log("\nAñade a GitHub Secret: PUBLIC_STRIPE_PAYMENT_LINK_DESTACADO=" + link.url);
