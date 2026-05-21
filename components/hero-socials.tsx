import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";

export function HeroSocials() {
  return (
    <div className="hero-socials" aria-label="Redes profissionais">
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
  );
}
