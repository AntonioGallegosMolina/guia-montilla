/**
 * Fichas con URL propia. El resto vive solo en la página de categoría:
 * AdSense revisa todo el sitio y 400 páginas plantilla cuentan como
 * contenido generado / insuficiente.
 */
import { SLUG_EXTRA } from "./descriptions.mjs";

export const STANDALONE_CATEGORIES = new Set([
  "bodegas",
  "restaurantes",
  "alojamiento",
  "museos",
]);

export function isStandaloneListing(business) {
  if (!business?.slug) return false;
  if (business.featured) return true;
  if (SLUG_EXTRA[business.slug]) return true;
  return STANDALONE_CATEGORIES.has(business.category);
}

export function listingHref(business, base = "/") {
  const root = base.endsWith("/") ? base : `${base}/`;
  if (isStandaloneListing(business)) {
    return `${root}negocio/${business.slug}/`;
  }
  const cat = business.category || "negocios";
  return `${root}${cat}/#${business.slug}`;
}
