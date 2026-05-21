import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <span>{siteConfig.name}</span>
      <span>Desenvolvedor de Software Full Stack</span>
      <span>{new Date().getFullYear()}</span>
    </footer>
  );
}
