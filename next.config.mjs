import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"]
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },
  turbopack: {
    root: projectRoot
  }
};

export default nextConfig;
