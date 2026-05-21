import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url;
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1
    },
    ...projects.map((project) => ({
      url: `${siteUrl}/projetos/${project.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: project.isLive ? 0.8 : 0.7
    }))
  ];
}
