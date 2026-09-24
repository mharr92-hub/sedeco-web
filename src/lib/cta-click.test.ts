import assert from "node:assert/strict";
import test from "node:test";
import { buildCtaClickInsert } from "./cta-click";
import { ATTRIBUTION_STORAGE_KEY } from "./tracking";

function cookie(payload: Record<string, string>): string {
  return `${ATTRIBUTION_STORAGE_KEY}=${encodeURIComponent(JSON.stringify(payload))}`;
}

test("whatsapp click keeps gclid from the landing URL", () => {
  const row = buildCtaClickInsert({
    body: {
      ctaType: "whatsapp",
      href: "https://wa.me/50765508320?text=Hola%2C%20filtraci%C3%B3n",
      landingPath: "/filtraciones",
      source: "ads_filtraciones",
      search: "?gclid=TEST&utm_source=google",
    },
    cookieHeader: null,
    userAgent: "Mozilla/5.0",
    referer: "https://www.google.com/",
  });
  assert.ok(row);
  assert.equal(row.cta_type, "whatsapp");
  assert.equal(row.gclid, "TEST");
  assert.equal(row.utm_source, "google");
  assert.equal(row.landing_path, "/filtraciones");
  assert.equal(row.source, "ads_filtraciones");
  assert.equal(row.referrer, "https://www.google.com/");
});

test("cookie gclid fills a click after the query string is gone", () => {
  const row = buildCtaClickInsert({
    body: {
      ctaType: "tel",
      href: "tel:+5073835175",
      landingPath: "/filtraciones",
      source: "ads_filtraciones",
      search: "",
    },
    cookieHeader: cookie({
      gclid: "FROM_COOKIE",
      referrer: "https://www.google.com/aclk",
    }),
    userAgent: "Mozilla/5.0",
    referer: "https://www.sedeco.lat/filtraciones",
  });
  assert.ok(row);
  assert.equal(row.cta_type, "tel");
  assert.equal(row.gclid, "FROM_COOKIE");
  assert.equal(row.href, "tel:+5073835175");
  assert.equal(row.referrer, "https://www.google.com/aclk");
});

test("URL gclid wins over an older cookie", () => {
  const row = buildCtaClickInsert({
    body: {
      ctaType: "tel",
      href: "tel:+5073835175",
      landingPath: "/impermeabilizacion-panama",
      search: "?gclid=TEST",
    },
    cookieHeader: cookie({ gclid: "OLD" }),
    userAgent: null,
    referer: null,
  });
  assert.ok(row);
  assert.equal(row.gclid, "TEST");
});

test("rejects anything that is not a wa.me or tel link", () => {
  assert.equal(
    buildCtaClickInsert({
      body: {
        ctaType: "whatsapp",
        href: "https://evil.example/wa.me/50765508320",
        landingPath: "/filtraciones",
      },
      cookieHeader: null,
      userAgent: null,
      referer: null,
    }),
    null,
  );
  assert.equal(
    buildCtaClickInsert({
      body: {
        ctaType: "lead",
        href: "tel:+5073835175",
        nombre: "falso",
        telefono: "60000000",
        mensaje: "no es un lead",
      },
      cookieHeader: null,
      userAgent: null,
      referer: null,
    }),
    null,
  );
});
