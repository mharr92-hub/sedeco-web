export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sedeco.lat";

/** Public canonical origin for service pages (www). */
export const CANONICAL_ORIGIN = "https://www.sedeco.lat";

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "50765508320";

export const WHATSAPP_DISPLAY =
  process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "+507 6550-8320";

export const PHONE_OFFICE_PRIMARY = "+507 383-5175";
export const PHONE_OFFICE_SECONDARY =
  process.env.NEXT_PUBLIC_PHONE_OFFICE ?? "+507 383-5176";

export const SITE_EMAIL =
  process.env.NEXT_PUBLIC_EMAIL ?? "mark@selladodeconcreto.com";

export const LEGAL_ENTITY = "TANYA ENGINEERING, S.A.";
export const TRADE_NAME = "SEDECO Panamá";
export const LEGAL_NAME = `${LEGAL_ENTITY} / ${TRADE_NAME}`;
export const RUC = "155694261-2-2020";
export const LEGAL_UPDATED = "31 de agosto de 2026";

export const ADDRESS = {
  building: "RBS Tower",
  street: "Ave. Balboa y Ramón H. Jurado",
  locality: "Punta Paitilla, Ciudad de Panamá",
  suite: "Planta Baja, Oficina 103A",
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
