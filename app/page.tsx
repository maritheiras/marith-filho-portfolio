import type { Metadata } from "next";
import { ContactButton } from "@/components/contact-provider";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { HeroSocials } from "@/components/hero-socials";
import { DownloadIcon } from "@/components/icons";
import { ProjectGrid } from "@/components/project-grid";
import { StackMarquee } from "@/components/stack-marquee";
import { projects, visibleProjectCount } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.title
  },
  alternates: {
    canonical: "/"
  }
};

const experiences = [
  {
    side: "right",
    current: true,
    company: "@ AUTÔNOMO",
    status: "Atual",
    title: "Desenvolvedor de Software Full Stack",
    location: "Brasil · Remoto · Projetos próprios",
    description: "Projetos web e multiplataforma, incluindo requisitos, interface, APIs, dados e deploy.",
    badges: ["2024 — Atual", "Full stack", "Produto digital"]
  },
  {
    side: "left",
    company: "@ SERRALHERIA SANTA VERONICA",
    title: "Assistente de Implantação de Sistemas e Processos",
    location: "Brasil · Presencial · Processos operacionais",
    description: "Implantação do WVETRO em áreas operacionais, com foco em organização e adoção do sistema.",
    badges: ["2023 — 2024", "Implantação", "Sistemas"]
  },
  {
    side: "right",
    company: "@ PROGEN S.A. E ENGEFORM",
    title: "Produtividade, faturamento e dados operacionais",
    location: "Brasil · Presencial · Operações e dados",
    description: "Controle de produtividade, faturamento, prazos e dados operacionais em contratos ligados à ENEL.",
    badges: ["2017 — 2022", "Dados", "Controle operacional"]
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: "Márith Filho",
      url: siteConfig.url,
      email: siteConfig.email,
      jobTitle: "Desenvolvedor de Software Full Stack",
      alumniOf: "Instituto Federal Fluminense",
      sameAs: [siteConfig.linkedin, siteConfig.github]
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: "Márith Filho Portfolio",
      url: siteConfig.url,
      inLanguage: "pt-BR",
      author: {
        "@id": `${siteConfig.url}/#person`
      }
    },
    {
      "@type": "ItemList",
      "@id": `${siteConfig.url}/#projects`,
      name: "Projetos de software de Márith Filho",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteConfig.url}/projetos/${project.id}`,
        name: project.title,
        description: project.summary
      }))
    }
  ]
};

export default function HomePage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="hero section-shell" id="inicio">
        <div className="hero-ambient" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow hero-animate hero-animate-1">Sistemas Escaláveis</p>
          <h1 className="hero-title hero-animate hero-animate-2" aria-label="Software para Produtos Reais.">
            <span>Software para</span>
            <span>Produtos Reais.</span>
          </h1>
          <p className="hero-copy hero-animate hero-animate-3">
            Conheça meu trabalho em sistemas de informação, automação e desenvolvimento de produtos digitais.
          </p>

          <div className="hero-meta hero-animate hero-animate-4">
            <HeroSocials />
          </div>
        </div>

        <StackMarquee />
      </section>

      <section className="section-shell section-block experience-section" id="experiencia">
        <div className="section-heading">
          <h2>Experiência profissional.</h2>
          <p className="section-description">
            Trajetória conectando implantação de sistemas, dados operacionais e desenvolvimento de produtos digitais.
          </p>
        </div>

        <ExperienceTimeline experiences={experiences} />

        <div className="experience-timeline experience-timeline-static">
          {experiences.map((experience) => (
            <article
              className={`experience-card experience-card-${experience.side}${experience.current ? " is-current" : ""}`}
              key={experience.title}
            >
              <span className="experience-node" aria-hidden="true" />
              <div className="experience-card-inner">
                <div className="experience-card-top">
                  <span className="experience-company">{experience.company}</span>
                  {experience.status ? <span className="experience-status">{experience.status}</span> : null}
                </div>
                <h3>{experience.title}</h3>
                <p className="experience-location">{experience.location}</p>
                <p>{experience.description}</p>
                <div className="experience-badges" aria-label="Contexto da experiência">
                  {experience.badges.map((badge) => (
                    <span key={badge}>{badge}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell section-block" id="projetos">
        <div className="section-heading">
          <h2>Projetos reais.</h2>
          <p className="section-description">
            Soluções publicadas e repositórios que mostram produto, automação e interfaces pensadas para uso real.
          </p>
        </div>

        <ProjectGrid projects={projects} visibleCount={visibleProjectCount} />
      </section>

      <section className="section-shell section-block about-section" id="sobre">
        <div className="section-heading about-heading">
          <h2>Resumo pessoal.</h2>
          <p className="section-description">
            Uma visão breve sobre minha formação e meu foco em soluções digitais para operação, automação e produto.
          </p>
        </div>

        <div className="about-content">
          <div className="about-portrait-wrap">
            <img className="about-portrait" src="/assets/foto-perfil-seo.jpeg" alt="Foto de Márith Filho" />
          </div>

          <div className="about-details">
            <div className="about-text">
              <p>
                Me chamo <strong>Márith Eiras Scot Filho</strong>, sou Bacharel em Sistemas de Informação pelo
                Instituto Federal Fluminense e sigo aprofundando minha formação em <strong>desenvolvimento de sistemas</strong>,{" "}
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
      </section>

      <section className="section-shell contact-section" id="contato">
        <div className="section-heading">
          <h2>Vamos conversar sobre o próximo desafio?</h2>
          <p className="section-description">
            Aberto a oportunidades como Desenvolvedor de Software e <span className="text-nowrap">Engenharia de Software.</span>
          </p>
        </div>

        <div className="contact-actions">
          <ContactButton className="button button-primary">Entrar em contato</ContactButton>
        </div>
      </section>
    </main>
  );
}
