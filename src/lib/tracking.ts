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

/** Click ids plus the first external referrer captured with them. */
export type StoredAttribution = AttributionParams & {
  referrer?: string;
};

const SITE_HOSTS = new Set([
  "www.sedeco.lat",
  "sedeco.lat",
  "localhost",
  "127.0.0.1",
]);

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

function sanitizeReferrer(raw: string | null | undefined): string | undefined {
  if (!raw) return undefined;
  const value = raw.replace(/[\r\n]/g, "").trim().slice(0, 500);
  if (!value || !/^https?:\/\//i.test(value)) return undefined;
  return value;
}

export function isSiteReferrer(raw: string | null | undefined): boolean {
  if (!raw) return true;
  try {
    return SITE_HOSTS.has(new URL(raw).hostname);
  } catch {
    return false;
  }
}

function parseAttributionPayload(raw: string | null): StoredAttribution {
  if (!raw) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }
    const record = parsed as Record<string, unknown>;
    const params: StoredAttribution = attributionFromSearch({
      get: (key) => {
        const value = record[key];
        return typeof value === "string" ? value : null;
      },
    });
    const referrer = sanitizeReferrer(
      typeof record.referrer === "string" ? record.referrer : null,
    );
    if (referrer && !isSiteReferrer(referrer)) params.referrer = referrer;
    return params;
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

function readStoredAttribution(): StoredAttribution {
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

function persistAttribution(params: StoredAttribution): void {
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
 * URL values win per key. Stored values fill keys the current URL does not
 * have. Empty URL values are already dropped, so they cannot wipe a gclid.
 */
export function resolveAttribution(
  fromUrl: AttributionParams,
  stored: AttributionParams,
): AttributionParams {
  return { ...stored, ...fromUrl };
}

/**
 * Keeps the first external referrer. A later URL with no referrer, or an
 * empty one, does not wipe it. A new click id can replace it.
 */
export function applyFirstTouchReferrer(
  stored: StoredAttribution,
  fromUrl: AttributionParams,
  externalReferrer: string | undefined,
): StoredAttribution {
  const resolved: StoredAttribution = resolveAttribution(fromUrl, stored);
  if (stored.referrer) resolved.referrer = stored.referrer;
  const newClick =
    (fromUrl.gclid !== undefined && fromUrl.gclid !== stored.gclid) ||
    (fromUrl.gbraid !== undefined && fromUrl.gbraid !== stored.gbraid) ||
    (fromUrl.wbraid !== undefined && fromUrl.wbraid !== stored.wbraid);
  if (externalReferrer && (!resolved.referrer || newClick)) {
    resolved.referrer = externalReferrer;
  }
  return resolved;
}

/** Same-site form posts keep the ad referrer stored with the click id. */
export function referrerForLead(
  headerReferrer: string | null | undefined,
  stored: StoredAttribution,
): string | undefined {
  const header = headerReferrer?.trim() || undefined;
  if (stored.referrer && isSiteReferrer(header)) return stored.referrer;
  return header;
}

export function trackingFieldsFromAttribution(
  attribution: AttributionParams,
): TrackingFields {
  const out: TrackingFields = {};
  for (const key of TRACKING_PARAM_KEYS) {
    const value = attribution[key];
    if (value) out[PARAM_TO_FIELD[key]] = value;
  }
  return out;
}

/** Form fields win. The cookie only fills keys the form did not send. */
export function mergeTracking(
  primary: TrackingFields,
  fallback: TrackingFields,
): TrackingFields {
  const out: TrackingFields = { ...fallback };
  for (const key of Object.keys(primary) as (keyof TrackingFields)[]) {
    const value = primary[key]?.trim();
    if (value) out[key] = value;
  }
  return out;
}

export function attributionFromCookieHeader(
  cookieHeader: string | null,
): StoredAttribution {
  if (!cookieHeader) return {};
  const prefix = `${ATTRIBUTION_STORAGE_KEY}=`;
  for (const part of cookieHeader.split(";")) {
    const trimmed = part.trim();
    if (!trimmed.startsWith(prefix)) continue;
    const encoded = trimmed.slice(prefix.length);
    try {
      return parseAttributionPayload(decodeURIComponent(encoded));
    } catch {
      return parseAttributionPayload(encoded);
    }
  }
  return {};
}

/**
 * URL values win per key; stored values fill keys the current URL does not
 * have. Writes the cookie and sessionStorage only when this URL actually
 * carries attribution — a fresh visit must not invent a gclid.
 */
function currentExternalReferrer(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const referrer = sanitizeReferrer(document.referrer);
  if (!referrer || isSiteReferrer(referrer)) return undefined;
  return referrer;
}

export function rememberAttribution(search: string): StoredAttribution {
  const fromUrl = attributionFromSearch(search);
  const stored = readStoredAttribution();
  const resolved = applyFirstTouchReferrer(
    stored,
    fromUrl,
    currentExternalReferrer(),
  );
  if (Object.keys(fromUrl).length > 0) {
    persistAttribution(resolved);
  }
  return resolved;
}

export function parseTrackingParams(
  params: Pick<URLSearchParams, "get">,
): TrackingFields {
  return trackingFieldsFromAttribution(attributionFromSearch(params));
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
