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

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "50765508320";

export const WHATSAPP_DISPLAY =
  process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "+507 6550-8320";

export const PHONE_OFFICE_PRIMARY = "+507 383-5175";
export const PHONE_OFFICE_SECONDARY =
  process.env.NEXT_PUBLIC_PHONE_OFFICE ?? "+507 383-5176";

export const SITE_EMAIL =
  process.env.NEXT_PUBLIC_EMAIL ?? "mark@selladodeconcreto.com";

/** Public inspection SLA. Do not invent a paid vs free price. */
export const INSPECTION_SLA = "Le contactamos en horario hábil." as const;

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
  PHONE_OFFICE_PRIMARY,
  PHONE_OFFICE_SECONDARY,
  WHATSAPP_DISPLAY,
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

export function whatsappHref(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
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
    logo: `${CANONICAL_ORIGIN}/sedeco-logo.png`,
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
