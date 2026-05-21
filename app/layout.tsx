import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { ContactProvider } from "@/components/contact-provider";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: "%s | Márith Filho"
  },
  description: siteConfig.description,
  applicationName: "Márith Filho Portfolio",
  authors: [{ name: "Márith Filho", url: siteConfig.linkedin }],
  creator: "Márith Filho",
  publisher: "Márith Filho",
  keywords: [
    "Márith Filho",
    "Desenvolvedor de Software",
    "Desenvolvedor Full Stack",
    "Engenharia de Software",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Portfólio"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: "Márith Filho Portfolio",
    images: [
      {
        url: siteConfig.seoImage,
        width: 1200,
        height: 1600,
        alt: "Márith Filho"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.seoImage]
  },
  icons: {
    icon: "/favicon.svg"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <ContactProvider>
          <Header />
          {children}
          <Footer />
        </ContactProvider>
      </body>
    </html>
  );
}
