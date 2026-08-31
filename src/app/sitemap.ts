import type { MetadataRoute } from "next";
import { LEAD_PAGE_SLUGS } from "@/lib/data/service-pages";
import { getAllCases } from "@/lib/data/cases";
import { CANONICAL_ORIGIN } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const serviceEntries: MetadataRoute.Sitemap = LEAD_PAGE_SLUGS.map((slug) => ({
    url: `${CANONICAL_ORIGIN}/${slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  }));
  const caseEntries: MetadataRoute.Sitemap = getAllCases().map((c) => ({
    url: `${CANONICAL_ORIGIN}/casos/${c.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  return [
    {
      url: CANONICAL_ORIGIN,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...serviceEntries,
    {
      url: `${CANONICAL_ORIGIN}/servicios`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${CANONICAL_ORIGIN}/casos`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...caseEntries,
    {
      url: `${CANONICAL_ORIGIN}/privacidad`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${CANONICAL_ORIGIN}/terminos`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
