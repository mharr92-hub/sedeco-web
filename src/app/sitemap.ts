import type { MetadataRoute } from "next";
import { ADS_LANDING_SLUGS } from "@/lib/data/ads-landings";
import { getAllCases } from "@/lib/data/cases";
import { getAllServices } from "@/lib/data/services";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sedeco.lat";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const serviceEntries: MetadataRoute.Sitemap = getAllServices().map((s) => ({
    url: `${siteUrl}/servicios/${s.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  const caseEntries: MetadataRoute.Sitemap = getAllCases().map((c) => ({
    url: `${siteUrl}/casos/${c.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  const adsEntries: MetadataRoute.Sitemap = ADS_LANDING_SLUGS.map((slug) => ({
    url: `${siteUrl}/${slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...adsEntries,
    {
      url: `${siteUrl}/servicios`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...serviceEntries,
    {
      url: `${siteUrl}/casos`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...caseEntries,
  ];
}

