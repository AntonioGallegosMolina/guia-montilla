/** Configuración global del sitio — cambia SITE_URL al publicar */
export const SITE = {
  name: "Guía Montilla",
  tagline: "Directorio local de Montilla-Moriles",
  url: import.meta.env.SITE_URL ?? "https://guiamontilla.es",
  locale: "es_ES",
  email: "info@guiamontilla.es",
  phone: "621 19 18 16",
  emailNegocios: "info@guiamontilla.es",
  twitter: "@guiamontilla",
};

export const LEGAL = {
  owner: "Guía Montilla",
  url: "https://guiamontilla.es",
  email: "info@guiamontilla.es",
  privacyEmail: "info@guiamontilla.es",
  phone: "621 19 18 16",
  country: "España",
  developer: "Kyvera Digital",
  developerUrl: "https://kyveradigital.es",
};

export const SEO = {
  defaultTitle: "Guía Montilla — Bodegas, mesas, rutas y todo el pueblo",
  defaultDescription:
    "La guía de Montilla (Córdoba): bodegas Montilla-Moriles, restaurantes, monumentos, comercios, senderismo y noticias. Fotos, horarios y cómo llegar.",
  ogImage: "/images/og-default.jpg",
};

/** Monetización: patrocinios locales + AdSense (solo tras consentimiento). */
export const ADS = {
  enabled: true,
  adsenseClient:
    (import.meta.env.PUBLIC_ADSENSE_CLIENT as string | undefined) ??
    "ca-pub-6122031427972119",
  /** IDs de unidades display (AdSense → Anuncios → Por unidad). Vacío = no renderiza unidad manual. */
  slots: {
    blogAside: (import.meta.env.PUBLIC_ADSENSE_SLOT_BLOG_ASIDE as string | undefined) ?? "",
    inContent: (import.meta.env.PUBLIC_ADSENSE_SLOT_IN_CONTENT as string | undefined) ?? "",
    categoryMid: (import.meta.env.PUBLIC_ADSENSE_SLOT_CATEGORY_MID as string | undefined) ?? "",
    homeBelowFold: (import.meta.env.PUBLIC_ADSENSE_SLOT_HOME as string | undefined) ?? "",
  },
};

export type AdPlacement = keyof typeof ADS.slots;
