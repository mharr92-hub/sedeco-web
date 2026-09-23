import assert from "node:assert/strict";
import { localBusinessJsonLd, NAP_STREET_ADDRESS, OFFICE_PHONES } from "../src/lib/site";
import { panamaMobileMessage } from "../src/lib/validations/lead";
import {
  applyFirstTouchReferrer,
  attributionFromCookieHeader,
  attributionFromSearch,
  mergeTracking,
  referrerForLead,
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

const withReferrer = attributionFromCookieHeader(
  `sedeco_attribution=${encodeURIComponent(JSON.stringify({ gclid: "X", referrer: "https://www.google.com/aclk" }))}`,
);
assert.equal(withReferrer.gclid, "X");
assert.equal(withReferrer.referrer, "https://www.google.com/aclk");

const blankReferrer = attributionFromCookieHeader(
  `sedeco_attribution=${encodeURIComponent(JSON.stringify({ gclid: "X", referrer: "" }))}`,
);
assert.equal(blankReferrer.referrer, undefined);

const keptReferrer = applyFirstTouchReferrer(
  { gclid: "X", referrer: "https://www.google.com/aclk" },
  { utm_source: "google" },
  undefined,
);
assert.equal(keptReferrer.gclid, "X");
assert.equal(keptReferrer.utm_source, "google");
assert.equal(keptReferrer.referrer, "https://www.google.com/aclk");

const firstReferrer = applyFirstTouchReferrer(
  {},
  { gclid: "X" },
  "https://www.google.com/aclk",
);
assert.equal(firstReferrer.referrer, "https://www.google.com/aclk");

assert.equal(
  referrerForLead("https://www.sedeco.lat/casos", {
    referrer: "https://www.google.com/aclk",
  }),
  "https://www.google.com/aclk",
);
assert.equal(
  referrerForLead("https://news.example/story", {
    referrer: "https://www.google.com/aclk",
  }),
  "https://news.example/story",
);

assert.equal(panamaMobileMessage("+507 6550-8320"), undefined);
assert.equal(panamaMobileMessage("65508320"), undefined);
assert.equal(panamaMobileMessage("50765508320"), undefined);
assert.ok(panamaMobileMessage("3835175"));
assert.ok(panamaMobileMessage("12345678"));
assert.ok(panamaMobileMessage("6550832"));

const business = localBusinessJsonLd();
assert.equal(business["@type"], "LocalBusiness");
assert.equal(business.legalName, "Tanya Engineering, S.A.");
assert.equal(business.address.streetAddress, NAP_STREET_ADDRESS);
assert.deepEqual(business.telephone, [...OFFICE_PHONES]);
assert.equal(typeof business.image, "string");
assert.ok(business.image.startsWith("https://"));
assert.equal(business.geo["@type"], "GeoCoordinates");
assert.equal(typeof business.geo.latitude, "number");
assert.equal(typeof business.geo.longitude, "number");

const titles = [
  "SEDECO Panamá | sellado e impermeabilización",
  "Filtraciones y detección de fugas Panamá | SEDECO",
  "Restauración e impermeabilización de fachadas | SEDECO",
  "Pintura de edificios en Panamá | SEDECO",
  "Impermeabilización de azoteas y losas | SEDECO",
  "Pisos industriales en Panamá | SEDECO",
  "Reparación estructural en Panamá | SEDECO",
  "Mantenimiento de PH en Panamá | SEDECO",
  "Inspección boroscópica desagües Panamá | SEDECO",
  "Servicios · SEDECO Panamá",
  "Casos de obra en Panamá | SEDECO",
];
for (const title of titles) {
  assert.ok(title.length <= 60, title);
}

console.log("verify-audit: attribution, phone and NAP ok");
