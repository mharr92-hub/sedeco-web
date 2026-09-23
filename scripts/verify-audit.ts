import assert from "node:assert/strict";
import {
  attributionFromCookieHeader,
  attributionFromSearch,
  mergeTracking,
  resolveAttribution,
  trackingFieldsFromAttribution,
} from "../src/lib/tracking";

const fromUrl = attributionFromSearch("?gclid=X&utm_source=google&utm_medium=");
assert.deepEqual(fromUrl, { gclid: "X", utm_source: "google" });

const empty = attributionFromSearch("?gclid=&utm_source=");
assert.deepEqual(empty, {});

const stored = { gclid: "X", utm_source: "google" };
const afterNav = resolveAttribution(attributionFromSearch(""), stored);
assert.equal(afterNav.gclid, "X");

const partial = resolveAttribution(
  attributionFromSearch("?utm_campaign=brand"),
  stored,
);
assert.equal(partial.gclid, "X");
assert.equal(partial.utm_campaign, "brand");
assert.equal(partial.utm_source, "google");

const replaced = resolveAttribution(attributionFromSearch("?gclid=Y"), stored);
assert.equal(replaced.gclid, "Y");

const cookie = attributionFromCookieHeader(
  `other=1; sedeco_attribution=${encodeURIComponent(JSON.stringify({ gclid: "X", utm_source: "" }))}`,
);
assert.deepEqual(cookie, { gclid: "X" });

const merged = mergeTracking(
  trackingFieldsFromAttribution({ utm_source: "google" }),
  trackingFieldsFromAttribution({ gclid: "X", utm_source: "old" }),
);
assert.equal(merged.gclid, "X");
assert.equal(merged.utmSource, "google");

const formWins = mergeTracking(
  trackingFieldsFromAttribution({ gclid: "FROMURL" }),
  trackingFieldsFromAttribution({ gclid: "FROMCOOKIE" }),
);
assert.equal(formWins.gclid, "FROMURL");

console.log("verify-audit: attribution ok");
