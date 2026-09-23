import type { Metadata } from "next";
import sitemap from "../src/app/sitemap";
import { metadata as homeMetadata } from "../src/app/(marketing)/page";
import { metadata as casosMetadata } from "../src/app/(marketing)/casos/page";
import { metadata as serviciosMetadata } from "../src/app/(marketing)/servicios/page";
import { metadata as privacidadMetadata } from "../src/app/(marketing)/privacidad/page";
import { metadata as terminosMetadata } from "../src/app/(marketing)/terminos/page";
import { getAdsLanding } from "../src/lib/data/ads-landings";
import { getAllCases } from "../src/lib/data/cases";
import { CANONICAL_ORIGIN } from "../src/lib/site";
import {
  getServicePage,
  LEAD_PAGE_SLUGS,
  type LeadPageSlug,
} from "../src/lib/data/service-pages";

/** Same suffix as `title.template` in src/app/layout.tsx. */
const TITLE_SUFFIX = " · SEDECO Panamá";

type Row = {
  url: string;
  title: string;
  description: string;
};

function asPath(url: string): string {
  if (url === CANONICAL_ORIGIN || url === `${CANONICAL_ORIGIN}/`) return "/";
  return url.slice(CANONICAL_ORIGIN.length) || "/";
}

function resolveTitle(title: Metadata["title"]): string {
  if (!title) return "";
  if (typeof title === "string") return `${title}${TITLE_SUFFIX}`;
  if ("absolute" in title && title.absolute) return title.absolute;
  if ("default" in title && title.default) return title.default;
  return "";
}

function resolveDescription(description: Metadata["description"]): string {
  return typeof description === "string" ? description : "";
}

function metaForPath(path: string): { title: string; description: string } {
  if (path === "/") {
    return {
      title: resolveTitle(homeMetadata.title),
      description: resolveDescription(homeMetadata.description),
    };
  }
  if (path === "/casos") {
    return {
      title: resolveTitle(casosMetadata.title),
      description: resolveDescription(casosMetadata.description),
    };
  }
  if (path === "/servicios") {
    return {
      title: resolveTitle(serviciosMetadata.title),
      description: resolveDescription(serviciosMetadata.description),
    };
  }
  if (path === "/privacidad") {
    return {
      title: resolveTitle(privacidadMetadata.title),
      description: resolveDescription(privacidadMetadata.description),
    };
  }
  if (path === "/terminos") {
    return {
      title: resolveTitle(terminosMetadata.title),
      description: resolveDescription(terminosMetadata.description),
    };
  }
  if (path === "/filtraciones") {
    const landing = getAdsLanding("filtraciones");
    return { title: landing.title, description: landing.description };
  }
  if (path.startsWith("/casos/")) {
    const slug = path.slice("/casos/".length);
    const item = getAllCases().find((c) => c.slug === slug);
    if (!item) return { title: "", description: "" };
    return {
      title: `${item.name}${TITLE_SUFFIX}`,
      description: item.metaDescription ?? item.scope ?? item.workType,
    };
  }
  const slug = path.slice(1);
  if ((LEAD_PAGE_SLUGS as readonly string[]).includes(slug) && slug !== "filtraciones") {
    const page = getServicePage(slug as Exclude<LeadPageSlug, "filtraciones">);
    return { title: page.metaTitle, description: page.metaDescription };
  }
  return { title: "", description: "" };
}

function estado(title: string, description: string): string {
  const titleOk = title.length > 0 && title.length <= 60;
  const descriptionOk = description.length >= 120 && description.length <= 155;
  if (titleOk && descriptionOk) return "OK";
  const problems: string[] = [];
  if (!titleOk) problems.push(`title ${title.length}`);
  if (!descriptionOk) problems.push(`description ${description.length}`);
  return problems.join(", ");
}

const rows: Row[] = sitemap().map((entry) => {
  const path = asPath(entry.url);
  const meta = metaForPath(path);
  return { url: path, title: meta.title, description: meta.description };
});

const failed = rows.filter((row) => estado(row.title, row.description) !== "OK");

console.log("| URL | Title (len) | Description (len) | Estado |");
console.log("| --- | --- | --- | --- |");
for (const row of rows) {
  const titleCell = `${row.title.replace(/\|/g, "\\|")} (${row.title.length})`;
  const descriptionCell = `${row.description.replace(/\|/g, "\\|")} (${row.description.length})`;
  console.log(
    `| ${row.url} | ${titleCell} | ${descriptionCell} | ${estado(row.title, row.description)} |`,
  );
}

if (failed.length > 0) {
  console.error(`\ncheck-meta: ${failed.length} URL(s) outside title ≤60 or description 120–155`);
  process.exit(1);
}

console.log(`\ncheck-meta: ${rows.length} URLs inside range`);
