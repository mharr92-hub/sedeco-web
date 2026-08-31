export const ANALYTICS_EVENTS = [
  "lead_form_start",
  "lead_form_submit",
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
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/** GTM container ID. Undefined unless NEXT_PUBLIC_GTM_ID is set at build time. */
export function getGtmContainerId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GTM_ID?.trim();
  return id || undefined;
}

/**
 * Direct GA4 measurement ID for gtag.js.
 * Returns undefined when GTM is set so GA4 is not injected twice.
 */
export function getDirectGa4MeasurementId(): string | undefined {
  if (getGtmContainerId()) return undefined;
  const id = process.env.NEXT_PUBLIC_GA4_ID?.trim();
  return id || undefined;
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
  });
}
