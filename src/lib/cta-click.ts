import {
  attributionFromCookieHeader,
  attributionFromSearch,
  referrerForLead,
  resolveAttribution,
  trackingFieldsFromAttribution,
} from "./tracking";

export const CTA_TYPES = ["whatsapp", "tel"] as const;

export type CtaType = (typeof CTA_TYPES)[number];

export type CtaClickInsert = {
  cta_type: CtaType;
  landing_path: string | null;
  source: string | null;
  href: string;
  user_agent: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
};

const HREF_MAX = 2000;
const PATH_MAX = 200;
const SOURCE_MAX = 80;
const SEARCH_MAX = 2000;
const UA_MAX = 500;

const WHATSAPP_HREF =
  /^https:\/\/wa\.me\/\d{6,15}(?:\?[A-Za-z0-9._~%&=!*'()+-]*)?$/;
const TEL_HREF = /^tel:\+?\d{7,15}$/;

export function sanitizeCtaHref(
  ctaType: CtaType,
  raw: string,
): string | undefined {
  const value = raw.replace(/[\r\n]/g, "").trim().slice(0, HREF_MAX);
  if (ctaType === "whatsapp") {
    return WHATSAPP_HREF.test(value) ? value : undefined;
  }
  return TEL_HREF.test(value) ? value : undefined;
}

function sanitizePath(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const value = raw.replace(/[\r\n]/g, "").trim().slice(0, PATH_MAX);
  if (
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    /\s/.test(value)
  ) {
    return null;
  }
  return value;
}

function sanitizeSource(raw: unknown): string | null {
  if (raw == null || raw === "") return null;
  if (typeof raw !== "string") return null;
  const value = raw.trim().slice(0, SOURCE_MAX);
  if (!/^[a-z0-9_-]+$/.test(value)) return null;
  return value;
}

/**
 * Builds a cta_clicks row from the beacon body plus the request cookie.
 * URL attribution wins per key; the sedeco_attribution cookie fills the rest.
 * Returns null when the click is not a wa.me or tel: link we are willing to store.
 */
export function buildCtaClickInsert(input: {
  body: unknown;
  cookieHeader: string | null;
  userAgent: string | null;
  referer: string | null;
}): CtaClickInsert | null {
  if (!input.body || typeof input.body !== "object" || Array.isArray(input.body)) {
    return null;
  }
  const record = input.body as Record<string, unknown>;
  const ctaType = record.ctaType;
  if (ctaType !== "whatsapp" && ctaType !== "tel") return null;
  if (typeof record.href !== "string") return null;
  const href = sanitizeCtaHref(ctaType, record.href);
  if (!href) return null;

  const search =
    typeof record.search === "string" ? record.search.slice(0, SEARCH_MAX) : "";
  const stored = attributionFromCookieHeader(input.cookieHeader);
  const fromUrl = attributionFromSearch(search);
  const attribution = resolveAttribution(fromUrl, stored);
  const tracking = trackingFieldsFromAttribution(attribution);
  const referrer = referrerForLead(input.referer, {
    ...stored,
    ...attribution,
  });
  const userAgent = input.userAgent
    ?.replace(/[\r\n]/g, "")
    .trim()
    .slice(0, UA_MAX);

  return {
    cta_type: ctaType,
    landing_path: sanitizePath(record.landingPath),
    source: sanitizeSource(record.source),
    href,
    user_agent: userAgent || null,
    referrer: referrer ?? null,
    utm_source: tracking.utmSource ?? null,
    utm_medium: tracking.utmMedium ?? null,
    utm_campaign: tracking.utmCampaign ?? null,
    utm_term: tracking.utmTerm ?? null,
    utm_content: tracking.utmContent ?? null,
    gclid: tracking.gclid ?? null,
    gbraid: tracking.gbraid ?? null,
    wbraid: tracking.wbraid ?? null,
  };
}
