import { DownloadIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";

export function AboutSummary() {
  return (
    <div className="about-content">
      <div className="about-portrait-wrap">
        <img className="about-portrait" src="/assets/foto-perfil-seo.jpeg" alt="Foto de Márith Filho" />
      </div>

      <div className="about-details">
        <div className="about-text">
          <p>
            Me chamo <strong>Márith Eiras Scot Filho</strong>, sou Bacharel em Sistemas de Informação pelo Instituto
            Federal Fluminense e sigo aprofundando minha formação em <strong>desenvolvimento de sistemas</strong>,
            engenharia de software e soluções digitais.
          </p>
          <p>
            Meu foco profissional está em transformar necessidades reais em produtos web, <strong>automações</strong> e
            sistemas bem estruturados, com atenção para usabilidade, organização de dados e evolução contínua.
          </p>
        </div>

        <a className="button button-secondary about-resume" href={siteConfig.resume} download={siteConfig.resumeDownloadName}>
          Baixar currículo
          <DownloadIcon className="inline-icon" />
        </a>
      </div>
    </div>
  );
}
