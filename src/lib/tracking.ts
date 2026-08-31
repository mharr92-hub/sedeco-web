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

export function parseTrackingParams(
  params: Pick<URLSearchParams, "get">,
): TrackingFields {
  const out: TrackingFields = {};
  for (const key of TRACKING_PARAM_KEYS) {
    const value = params.get(key)?.trim();
    if (value) {
      out[PARAM_TO_FIELD[key]] = value.slice(0, 200);
    }
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
