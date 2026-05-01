import type { MetadataRoute } from "next";
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
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
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
  ];
}
