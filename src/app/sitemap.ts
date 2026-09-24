import type { MetadataRoute } from "next";
import { LEAD_PAGE_SLUGS } from "@/lib/data/service-pages";
import { getIntegralServices } from "@/lib/data/integral-services";
import { getAllCases } from "@/lib/data/cases";
import { CANONICAL_ORIGIN } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceEntries: MetadataRoute.Sitemap = LEAD_PAGE_SLUGS.map((slug) => ({
    url: `${CANONICAL_ORIGIN}/${slug}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));
  const integralEntries: MetadataRoute.Sitemap = getIntegralServices().map(
    (service) => ({
      url: `${CANONICAL_ORIGIN}${service.path}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }),
  );
  const caseEntries: MetadataRoute.Sitemap = getAllCases().map((c) => ({
    url: `${CANONICAL_ORIGIN}/casos/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  return [
    {
      url: CANONICAL_ORIGIN,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...serviceEntries,
    ...integralEntries,
    {
      url: `${CANONICAL_ORIGIN}/servicios`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${CANONICAL_ORIGIN}/casos`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...caseEntries,
    {
      url: `${CANONICAL_ORIGIN}/privacidad`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${CANONICAL_ORIGIN}/terminos`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
