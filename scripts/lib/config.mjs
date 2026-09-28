export const RSS_SOURCES = [
  {
    id: "montilla-digital",
    name: "Montilla Digital",
    url: "https://www.montilladigital.com/feeds/posts/default?alt=rss",
  },
];

/** Fuentes para la sección Noticias (todas las entradas, sin filtro de agenda). */
export const NEWS_RSS_SOURCES = [
  {
    id: "montilla-digital",
    name: "Montilla Digital",
    url: "https://www.montilladigital.com/feeds/posts/default?alt=rss",
  },
  {
    id: "ayto-montilla",
    name: "Ayuntamiento de Montilla",
    url: "https://www.montilla.es/feed/",
  },
];

export const EVENT_KEYWORDS = [
  "feria", "fiesta", "concierto", "exposición", "exposicion", "taller",
  "programa", "evento", "carrera", "maratón", "maraton", "teatro",
  "mercadillo", "romería", "romeria", "procesión", "procesion",
  "inaugura", "presenta", "celebra", "organiza", "actividad",
  "voluntariado", "olimpiadas", "campeonato", "festival",
];

export const OPINION_SKIP = [/\[/, /opinión/i, /editorial/i, /negro sobre blanco/i, /harina de otro/i, /diario de/i, /relatos/i];

/** Apuestas, casinos online y spam SEO en feeds locales — no republicar en Guía Montilla. */
export const NEWS_SKIP = [
  /casino/i,
  /apuestas/i,
  /tragaperras/i,
  /tragamonedas/i,
  /soft2bet/i,
  /ginja\s*casino/i,
  /pinco\s*casino/i,
  /bono de bienvenida/i,
  /giros gratis/i,
  /juego online/i,
  /plataforma de apuestas/i,
  /ginjacasino/i,
  /casinos online/i,
  /casinos sin licencia/i,
  /jugabet/i,
  /depósitos y retiros en/i,
];

export const MAX_EVENTS = 30;
export const MAX_AGE_DAYS = 60;

export const MAX_NEWS = 80;
export const MAX_NEWS_AGE_DAYS = 90;
