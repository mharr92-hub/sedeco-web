export const ANALYTICS_EVENTS = [
  "lead_form_start",
  "lead_form_step_2",
  "lead_form_submit",
  "lead_submit",
  "form_step1",
  "form_submit",
  "whatsapp_click",
  "phone_click",
  "email_click",
  "project_view",
  "cta_hero_click",
  "cta_sticky_click",
  "cta_bottom_click",
  "form_error",
  "thank_you_view",
] as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];

export type AnalyticsPayload = {
  event: AnalyticsEvent;
  landing?: string;
  location?: string;
  problem?: string;
  source?: string;
  reason?: string;
  /** Catalog slug for integral service pages. Never a name, phone or email. */
  servicio?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** GTM container ID. Undefined unless NEXT_PUBLIC_GTM_ID is set at build time. */
export function getGtmContainerId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GTM_ID?.trim();
  return id || undefined;
}

/** Propiedad GA4 de SEDECO. Fallback si no hay NEXT_PUBLIC_GA4_ID en el entorno. */
const DEFAULT_GA4_ID = "G-1CWPNC75XE";

/**
 * GA4 measurement ID for gtag.js. Loads alongside GTM on purpose: the GTM
 * container carries no GA4 tag, so gtag is the only path into GA4. If a GA4
 * tag is ever added to the container, drop this so hits are not counted twice.
 */
export function getDirectGa4MeasurementId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA4_ID?.trim();
  return id || DEFAULT_GA4_ID;
}

/**
 * Send an event straight to GA4. Falls back to queueing on dataLayer when
 * gtag.js has not finished loading — gtag drains that queue on init.
 * Never pass personal data (name, phone, email) in params.
 */
export function gtagEvent(
  name: string,
  params: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
    return;
  }
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(["event", name, params]);
}

/**
 * Push a conversion event to dataLayer. GTM/GA4 (if configured) consume this.
 * Always pushes, even without GTM/GA4 IDs. Do not also send gtag event()
 * for the same conversion — that would double-count.
 */
export function track(payload: AnalyticsPayload): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: payload.event,
    landing: payload.landing,
    location: payload.location,
    problem: payload.problem,
    source: payload.source,
    reason: payload.reason,
    ...(payload.servicio ? { servicio: payload.servicio } : {}),
  });
}
