/**
 * Pagos online — Stripe Payment Links (sitio estático, sin backend).
 * Crear en Stripe → Productos → Enlace de pago → pegar URL en GitHub Secret / .env
 */
export const PAYMENTS = {
  /** Plan Destacado 29 €/mes (suscripción o pago único según configures el enlace) */
  stripeDestacado:
    (import.meta.env.PUBLIC_STRIPE_PAYMENT_LINK_DESTACADO as string | undefined)?.trim() ?? "",
  stripeBanner:
    (import.meta.env.PUBLIC_STRIPE_PAYMENT_LINK_BANNER as string | undefined)?.trim() ?? "",
  stripePatrocinio:
    (import.meta.env.PUBLIC_STRIPE_PAYMENT_LINK_PATROCINIO as string | undefined)?.trim() ?? "",
};

export function hasStripeCheckout(): boolean {
  return Boolean(PAYMENTS.stripeDestacado);
}
