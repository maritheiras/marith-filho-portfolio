import Link from "next/link";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { navItems, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-brand">
          <Link className="brand" href="/#inicio" aria-label="Voltar para o início">
            <span className="brand-text">{siteConfig.name}</span>
          </Link>
          <p>Sistemas, automações e produtos digitais com foco em operação real.</p>
        </div>

        <nav className="footer-nav" aria-label="Navegação do rodapé">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="footer-socials" aria-label="Contatos e redes">
          <a href={`mailto:${siteConfig.email}`} aria-label="Enviar e-mail para Márith Filho">
            <MailIcon className="line-svg" />
          </a>
          <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn de Márith Filho">
            <LinkedInIcon />
          </a>
          <a href={siteConfig.github} target="_blank" rel="noreferrer" aria-label="GitHub de Márith Filho">
            <GitHubIcon />
          </a>
        </div>
      </div>

      <div className="site-footer-bottom">
        <span>© {new Date().getFullYear()} {siteConfig.name}</span>
        <span>Desenvolvedor de Software</span>
      </div>
    </footer>
  );
}
