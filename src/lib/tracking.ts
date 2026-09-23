export const TRACKING_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
] as const;

export type TrackingParamKey = (typeof TRACKING_PARAM_KEYS)[number];

export type TrackingFields = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
};

const PARAM_TO_FIELD: Record<TrackingParamKey, keyof TrackingFields> = {
  utm_source: "utmSource",
  utm_medium: "utmMedium",
  utm_campaign: "utmCampaign",
  utm_term: "utmTerm",
  utm_content: "utmContent",
  gclid: "gclid",
  gbraid: "gbraid",
  wbraid: "wbraid",
};

const ATTRIBUTION_VALUE_MAX = 200;

/** First-party cookie and sessionStorage key for landing attribution. */
export const ATTRIBUTION_STORAGE_KEY = "sedeco_attribution";

/** 90 days. Click ids must survive in-site navigation and a later return. */
const ATTRIBUTION_MAX_AGE_SECONDS = 90 * 24 * 60 * 60;

export type AttributionParams = Partial<Record<TrackingParamKey, string>>;

function sanitizeAttributionValue(
  raw: string | null | undefined,
): string | undefined {
  if (!raw) return undefined;
  const value = raw.replace(/[\r\n]/g, "").trim().slice(0, ATTRIBUTION_VALUE_MAX);
  return value || undefined;
}

export function attributionFromSearch(
  search: string | Pick<URLSearchParams, "get">,
): AttributionParams {
  const params =
    typeof search === "string"
      ? new URLSearchParams(search.startsWith("?") ? search.slice(1) : search)
      : search;
  const out: AttributionParams = {};
  for (const key of TRACKING_PARAM_KEYS) {
    const value = sanitizeAttributionValue(params.get(key));
    if (value) out[key] = value;
  }
  return out;
}

function parseAttributionPayload(raw: string | null): AttributionParams {
  if (!raw) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }
    return attributionFromSearch({
      get: (key) => {
        const value = (parsed as Record<string, unknown>)[key];
        return typeof value === "string" ? value : null;
      },
    });
  } catch {
    return {};
  }
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const prefix = `${name}=`;
  for (const part of document.cookie.split(";")) {
    const trimmed = part.trim();
    if (!trimmed.startsWith(prefix)) continue;
    const encoded = trimmed.slice(prefix.length);
    try {
      return decodeURIComponent(encoded);
    } catch {
      return encoded;
    }
  }
  return null;
}

function readStoredAttribution(): AttributionParams {
  if (typeof window === "undefined") return {};
  let fromSession: AttributionParams = {};
  try {
    fromSession = parseAttributionPayload(
      window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY),
    );
  } catch {
    fromSession = {};
  }
  const fromCookie = parseAttributionPayload(readCookie(ATTRIBUTION_STORAGE_KEY));
  // Session wins inside this tab; the cookie covers a later visit or new tab.
  return { ...fromCookie, ...fromSession };
}

function persistAttribution(params: AttributionParams): void {
  if (typeof window === "undefined") return;
  if (Object.keys(params).length === 0) return;
  const payload = JSON.stringify(params);
  try {
    window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, payload);
  } catch {
    // Private mode or a blocked storage API should not break the form.
  }
  try {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${ATTRIBUTION_STORAGE_KEY}=${encodeURIComponent(payload)}; Path=/; Max-Age=${ATTRIBUTION_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
  } catch {
    // Ignore quota or disabled-cookie failures; sessionStorage may still hold it.
  }
}

/**
 * URL values win per key; stored values fill keys the current URL does not
 * have. Writes the cookie and sessionStorage only when this URL actually
 * carries attribution — a fresh visit must not invent a gclid.
 */
export function rememberAttribution(search: string): AttributionParams {
  const fromUrl = attributionFromSearch(search);
  const stored = readStoredAttribution();
  const resolved: AttributionParams = { ...stored, ...fromUrl };
  if (Object.keys(fromUrl).length > 0) {
    persistAttribution(resolved);
  }
  return resolved;
}

export function parseTrackingParams(
  params: Pick<URLSearchParams, "get">,
): TrackingFields {
  const out: TrackingFields = {};
  const attribution = attributionFromSearch(params);
  for (const key of TRACKING_PARAM_KEYS) {
    const value = attribution[key];
    if (value) out[PARAM_TO_FIELD[key]] = value;
  }
  return out;
}

export function trackingFromFormData(formData: FormData): TrackingFields {
  const params = new URLSearchParams();
  for (const key of TRACKING_PARAM_KEYS) {
    const value = formData.get(key);
    if (typeof value === "string" && value.trim()) {
      params.set(key, value.trim());
    }
  }
  return parseTrackingParams(params);
}

export function appendTrackingToUrl(
  path: string,
  params: Pick<URLSearchParams, "toString" | "get">,
): string {
  const next = new URLSearchParams();
  for (const key of TRACKING_PARAM_KEYS) {
    const value = params.get(key)?.trim();
    if (value) next.set(key, value);
  }
  const qs = next.toString();
  return qs ? `${path}?${qs}` : path;
}
