import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { ExternalLink } from "@/components/ui";
import { siteConfig } from "@/lib/site";

export function HeroSocials() {
  return (
    <div className="hero-socials" aria-label="Redes profissionais">
      <a className="hero-social-mail" href={`mailto:${siteConfig.email}`} aria-label="Enviar e-mail para Márith Filho">
        <MailIcon className="line-svg" />
      </a>
      <ExternalLink className="hero-social-linkedin" href={siteConfig.linkedin} aria-label="LinkedIn de Márith Filho, abre em nova aba">
        <LinkedInIcon />
      </ExternalLink>
      <ExternalLink className="hero-social-github" href={siteConfig.github} aria-label="GitHub de Márith Filho, abre em nova aba">
        <GitHubIcon />
      </ExternalLink>
    </div>
  );
}
