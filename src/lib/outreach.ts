export const OUTREACH_PRICE = 29;
export const DAILY_VISITS = 1000;

/** Prioridad comercial para el listado */
export const CATEGORY_PRIORITY = [
  "bodegas",
  "restaurantes",
  "bares-cafes",
  "alojamiento",
  "alimentacion",
  "belleza",
  "comercios",
  "cultura-ocio",
  "salud",
  "profesionales",
  "motor",
  "monumentos",
  "museos",
  "parques",
  "educacion",
  "rutas",
] as const;

const SEARCH_TERM: Record<string, string> = {
  bodegas: "bodegas Montilla",
  restaurantes: "restaurantes Montilla",
  "bares-cafes": "bares Montilla",
  alimentacion: "tiendas Montilla",
  alojamiento: "hoteles Montilla",
  monumentos: "monumentos Montilla",
  museos: "museos Montilla",
  parques: "parques Montilla",
  "cultura-ocio": "planes Montilla",
  rutas: "rutas Montilla",
  comercios: "comercios Montilla",
  salud: "farmacia Montilla",
  belleza: "peluquería Montilla",
  profesionales: "gestoría Montilla",
  motor: "taller Montilla",
  educacion: "colegios Montilla",
};

export type BusinessRow = {
  id: string;
  slug: string;
  name: string;
  category: string;
  phone: string;
  featured?: boolean;
};

export type CategoryRow = { id: string; name: string };

export type OutreachLead = {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryLabel: string;
  phone: string;
  phoneDisplay: string;
  isMobile: boolean;
  listingUrl: string;
  message: string;
  waUrl: string;
  priority: number;
};

export function normalizePhoneE164(phone: string): string | null {
  let digits = phone.replace(/\D/g, "");
  if (!digits) return null;
  // 00 international prefix
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.length === 9 && /^[67]/.test(digits)) return `34${digits}`;
  if (digits.length === 9 && /^[89]/.test(digits)) return `34${digits}`;
  if (digits.length === 11 && digits.startsWith("34")) return digits;
  if (digits.length === 12 && digits.startsWith("034")) return digits.slice(1);
  if (digits.length >= 10 && digits.length <= 15) return digits;
  return null;
}

export function isSpanishMobile(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  const local = digits.startsWith("34")
    ? digits.slice(2)
    : digits.startsWith("0034")
      ? digits.slice(4)
      : digits;
  return local.length === 9 && /^[67]/.test(local);
}

export function buildSearchTerm(categoryId: string, categoryLabel: string): string {
  return SEARCH_TERM[categoryId] ?? `${categoryLabel.toLowerCase()} Montilla`;
}

export function buildOutreachMessage(opts: {
  businessName: string;
  searchTerm: string;
  listingUrl: string;
  siteUrl: string;
  categoryLabel: string;
  rankInCategory: number;
  totalInCategory: number;
  contactName?: string;
}): string {
  const {
    businessName,
    searchTerm,
    listingUrl,
    siteUrl,
    categoryLabel,
    rankInCategory,
    totalInCategory,
    contactName = "Antonio",
  } = opts;
  const host = siteUrl.replace(/\/$/, "").replace(/^https?:\/\//, "");
  const payUrl = `${siteUrl.replace(/\/$/, "")}/para-negocios/`;

  return `Hola, buenos días. Soy ${contactName} de Guía Montilla.

Tenemos ya a *${businessName}* en ${host} — guía local con tráfico de búsquedas tipo «${searchTerm}».

Ahora en *${categoryLabel}* hay *${totalInCategory} fichas*; la vuestra sale en la posición *${rankInCategory}* (orden alfabético). Con *Destacado* (${OUTREACH_PRICE} €/mes, sin permanencia) pasáis arriba del todo:
• Primero al buscar «${searchTerm}»
• Etiqueta Destacado en la ficha
• Más visibilidad en home y rutas

Vuestra ficha:
${listingUrl}

Planes y pago online:
${payUrl}

¿Os encaja? Lo activamos en 24 h laborables.`;
}

/** Enlace WhatsApp fiable (api.whatsapp.com + phone sin +) */
export function buildWaUrl(phoneE164: string, message: string): string {
  const phone = phoneE164.replace(/\D/g, "");
  const text = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${phone}&text=${text}`;
}

export function buildOutreachLeads(
  businesses: BusinessRow[],
  categories: CategoryRow[],
  siteUrl: string
): OutreachLead[] {
  const catMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));
  const base = siteUrl.replace(/\/$/, "");
  const priorityIndex = Object.fromEntries(CATEGORY_PRIORITY.map((id, i) => [id, i]));

  const byCategory = new Map<string, BusinessRow[]>();
  for (const b of businesses) {
    const list = byCategory.get(b.category) ?? [];
    list.push(b);
    byCategory.set(b.category, list);
  }
  for (const list of byCategory.values()) {
    list.sort(
      (a, b) =>
        Number(b.featured) - Number(a.featured) ||
        a.name.localeCompare(b.name, "es"),
    );
  }

  return businesses
    .filter((b) => b.phone && !b.featured)
    .map((b) => {
      const e164 = normalizePhoneE164(b.phone);
      const categoryLabel = catMap[b.category] ?? b.category;
      const searchTerm = buildSearchTerm(b.category, categoryLabel);
      const catList = byCategory.get(b.category) ?? [];
      const rankInCategory = Math.max(1, catList.findIndex((x) => x.id === b.id) + 1);
      const totalInCategory = catList.length;
      // Fichas viven en /negocio/{slug}/ — no en /{categoria}/{slug}/
      const listingUrl = `${base}/negocio/${b.slug}/`;
      const message = buildOutreachMessage({
        businessName: b.name,
        searchTerm,
        listingUrl,
        siteUrl: base,
        categoryLabel,
        rankInCategory,
        totalInCategory,
      });

      return {
        id: b.id,
        slug: b.slug,
        name: b.name,
        category: b.category,
        categoryLabel,
        phone: b.phone,
        phoneDisplay: b.phone,
        isMobile: isSpanishMobile(b.phone),
        listingUrl,
        message,
        waUrl: e164 ? buildWaUrl(e164, message) : "",
        priority: priorityIndex[b.category] ?? 99,
      };
    })
    .filter((l) => l.waUrl && l.isMobile)
    .sort((a, b) => a.priority - b.priority || a.name.localeCompare(b.name, "es"));
}
