export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sedeco.lat";

/** Public canonical origin for service pages (www). */
export const CANONICAL_ORIGIN = "https://www.sedeco.lat";

/** Static 1200×630 share image (official lockup on white). */
export const OG_IMAGE_PATH = "/og-image.png";
export const OG_IMAGE_URL = `${CANONICAL_ORIGIN}${OG_IMAGE_PATH}`;

export const OG_IMAGE = {
  url: OG_IMAGE_URL,
  width: 1200,
  height: 630,
  alt: "SEDECO Panamá | sellado de concreto",
  type: "image/png",
} as const;

/**
 * The two WhatsApp contacts. Wherever the site shows WhatsApp as text or as a
 * link, both appear, each with its name.
 *
 * The single-button spots — header, sticky bar and floating button — have no
 * room for two, so they keep the first entry. `key` is what the analytics
 * event reports as the destination.
 *
 * Never write a name with "Ing." in front of it.
 */
export const WHATSAPP_CONTACTS = [
  {
    key: "christian",
    name: "Christian Mendoza",
    role: "Gerente",
    number: "50760388649",
    display: "+507 6038-8649",
  },
  {
    key: "mark",
    name: "Mark Harrick",
    role: "Presidente",
    number: "50765508320",
    display: "+507 6550-8320",
  },
] as const;

export type WhatsAppContact = (typeof WHATSAPP_CONTACTS)[number];

/** Destination of the single-button spots: header, sticky bar, FAB. */
export const PRIMARY_WHATSAPP = WHATSAPP_CONTACTS[0];

/**
 * Every phone and WhatsApp number on the site. This is the only place a
 * number may be written down — components read it from here, never inline.
 */
export const CONTACT = {
  /** Destination of the single-button spots. Both contacts: WHATSAPP_CONTACTS. */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? PRIMARY_WHATSAPP.number,
  whatsappDisplay:
    process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? PRIMARY_WHATSAPP.display,
  /** Main line: header, hero, footer. */
  telMain: "+507 6564-4080",
  telMainDisplay: "6564-4080",
  /** Landlines. Footer only. */
  telSecondary: ["+507 383-5175", "+507 383-5176"],
} as const;

/** Prefilled WhatsApp text when a component has nothing more specific. */
export const WHATSAPP_DEFAULT_MESSAGE =
  "Hola SEDECO, vi su página y quiero cotizar" as const;

export const WHATSAPP_NUMBER = CONTACT.whatsapp;
export const WHATSAPP_DISPLAY = CONTACT.whatsappDisplay;
export const PHONE_MAIN = CONTACT.telMain;
export const PHONE_MAIN_DISPLAY = CONTACT.telMainDisplay;
export const PHONE_OFFICE_PRIMARY = CONTACT.telSecondary[0];
export const PHONE_OFFICE_SECONDARY = CONTACT.telSecondary[1];

export const SITE_EMAIL =
  process.env.NEXT_PUBLIC_EMAIL ?? "mark@selladodeconcreto.com";

/** Public inspection SLA. Do not invent a paid vs free price. */
export const INSPECTION_SLA = "Le contactamos en horario hábil." as const;

/**
 * What is free and what is charged. Free quote when the client already knows
 * the job; diagnosis is billed by the hour and credited against the work.
 *
 * Only for the home hero, contact sections and next to the form — not in the
 * footer or /gracias, where it would repeat site-wide. Never publish a rate.
 */
export const OFFER_NOTE =
  "¿Ya tiene definido el trabajo? Visitamos, medimos y cotizamos sin costo. ¿No sabe de dónde viene el problema? La inspección y el diagnóstico con informe fotográfico se cobran por hora, según la ubicación. Le confirmamos la tarifa antes de la visita y se la descontamos si luego contrata el trabajo." as const;

/** Boroscope inspection is quoted separately, not billed by the hour. */
export const BOROSCOPE_NOTE =
  "Tiene un precio aparte. Se lo cotizamos antes de coordinar la visita." as const;

export const OFFICE_HOURS = {
  days: "Mo-Fr",
  opens: "08:00",
  closes: "17:00",
  timeZone: "America/Panama",
  label: "Lunes a viernes, 08:00–17:00 (hora de Panamá)",
} as const;

export const LEGAL_ENTITY = "Tanya Engineering, S.A.";
export const TRADE_NAME = "SEDECO Panamá";
export const LEGAL_NAME = `${LEGAL_ENTITY} / ${TRADE_NAME}`;
export const RUC = "155694261-2-2020";
export const LEGAL_UPDATED = "31 de agosto de 2026";

/** Single NAP line. Footer, legal pages and JSON-LD must use this string. */
export const NAP_STREET_ADDRESS =
  "RBS Tower, Ave. Balboa y Ramón H. Jurado, Planta Baja, Oficina 103A, Punta Paitilla";

export const NAP_LOCALITY = "Ciudad de Panamá";

export const OFFICE_PHONES = [
  CONTACT.telMain,
  ...CONTACT.telSecondary,
  CONTACT.whatsappDisplay,
] as const;

/**
 * Published pin for RBS Tower, Panama City.
 * Source: https://pa.near-place.com/rbs-tower-panama-city/en (fetched 2026-09-23).
 */
export const OFFICE_GEO = {
  latitude: 8.9777693,
  longitude: -79.5158156,
} as const;

export const ADDRESS = {
  building: "RBS Tower",
  street: "Ave. Balboa y Ramón H. Jurado",
  locality: NAP_LOCALITY,
  suite: "Planta Baja, Oficina 103A",
  line: NAP_STREET_ADDRESS,
} as const;

export const GUARANTEE_LINE =
  "garantía por escrito según sistema y alcance contratado" as const;

export const GUARANTEE_TOOLTIP =
  "Aplican términos y condiciones según sistema y alcance contratado." as const;

export function whatsappHref(
  message: string = WHATSAPP_DEFAULT_MESSAGE,
): string {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Same prefilled message, addressed to one of the two contacts. */
export function whatsappHrefFor(
  contact: WhatsAppContact,
  message: string = WHATSAPP_DEFAULT_MESSAGE,
): string {
  return `https://wa.me/${contact.number}?text=${encodeURIComponent(message)}`;
}

/** Maps a wa.me href back to the contact key, for the analytics event. */
export function whatsappContactKey(href: string): string | undefined {
  return WHATSAPP_CONTACTS.find((c) => href.includes(c.number))?.key;
}

/** Prefilled text for a service card: base message plus the service name. */
export function whatsappServiceMessage(service: string): string {
  return `${WHATSAPP_DEFAULT_MESSAGE}: ${service}`;
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function leadSubmitErrorMessage(): string {
  return `No pudimos registrar su solicitud. Escríbanos por WhatsApp al ${WHATSAPP_DISPLAY} o a ${SITE_EMAIL}.`;
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${CANONICAL_ORIGIN}/#localbusiness`,
    name: TRADE_NAME,
    legalName: LEGAL_ENTITY,
    image: OG_IMAGE_URL,
    logo: `${CANONICAL_ORIGIN}/sedeco-logo.svg`,
    url: CANONICAL_ORIGIN,
    email: SITE_EMAIL,
    telephone: [...OFFICE_PHONES],
    address: {
      "@type": "PostalAddress",
      streetAddress: NAP_STREET_ADDRESS,
      addressLocality: NAP_LOCALITY,
      addressCountry: "PA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: OFFICE_GEO.latitude,
      longitude: OFFICE_GEO.longitude,
    },
    areaServed: ["Ciudad de Panamá", "Colón"],
    openingHours: `${OFFICE_HOURS.days} ${OFFICE_HOURS.opens}-${OFFICE_HOURS.closes}`,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: OFFICE_HOURS.opens,
      closes: OFFICE_HOURS.closes,
    },
  };
}
