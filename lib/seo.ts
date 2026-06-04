import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

const defaultOgImage = {
  width: 1200,
  height: 1600,
  alt: "Márith Filho"
};

type PageMetadataInput = {
  title?: string;
  absoluteTitle?: string;
  description?: string;
  path?: string;
  type?: "website" | "article";
  imageAlt?: string;
};

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url;
}

export function absoluteUrl(path = "/") {
  return new URL(path, getSiteUrl()).toString();
}

export function getSeoImageUrl() {
  return absoluteUrl(siteConfig.seoImage);
}

export function createPageMetadata({
  title,
  absoluteTitle,
  description = siteConfig.description,
  path = "/",
  type = "website",
  imageAlt = defaultOgImage.alt
}: PageMetadataInput = {}): Metadata {
  const pageUrl = absoluteUrl(path);
  const metadataTitle = absoluteTitle ? { absolute: absoluteTitle } : title;
  const openGraphTitle = absoluteTitle ?? (title ? `${title} | Márith Filho` : siteConfig.title);

  return {
    title: metadataTitle,
    description,
    alternates: {
      canonical: pageUrl
    },
    openGraph: {
      type,
      locale: "pt_BR",
      url: pageUrl,
      title: openGraphTitle,
      description,
      siteName: "Márith Filho Portfolio",
      images: [
        {
          url: getSeoImageUrl(),
          width: defaultOgImage.width,
          height: defaultOgImage.height,
          alt: imageAlt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: openGraphTitle,
      description,
      images: [getSeoImageUrl()]
    },
    robots: {
      index: true,
      follow: true
    }
  };
}
