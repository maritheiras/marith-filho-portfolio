import type { Metadata } from "next";
import { ContactButton } from "@/components/contact-provider";
import { HeroSocials } from "@/components/hero-socials";
import { ProjectGrid } from "@/components/project-grid";
import { StackMarquee } from "@/components/stack-marquee";
import { projects, visibleProjectCount } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Desenvolvedor de Software Full Stack",
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
          <p className="eyebrow hero-eyebrow hero-animate hero-animate-1">Portfólio de Software</p>
          <h1 className="hero-title hero-animate hero-animate-2" aria-label="Software para produtos reais.">
            <span className="title-desktop">Software para</span>
            <span className="title-desktop">produtos reais.</span>
            <span className="title-mobile" aria-hidden="true">Software</span>
            <span className="title-mobile" aria-hidden="true">para</span>
            <span className="title-mobile" aria-hidden="true">produtos</span>
            <span className="title-mobile" aria-hidden="true">reais.</span>
          </h1>
          <p className="hero-copy hero-animate hero-animate-3">
            Eu sou Márith Filho, <strong>Bacharel em Sistemas de Informação</strong>, com vivência em implantação de sistemas,
            dados operacionais e desenvolvimento de sistemas. Atuo como <strong>Desenvolvedor Full Stack</strong>, conectando
            produto e automação para criar soluções digitais consistentes.
          </p>

          <div className="hero-meta hero-animate hero-animate-4">
            <HeroSocials />
          </div>
        </div>

        <StackMarquee />
      </section>

      <section className="section-shell section-block experience-section" id="experiencia">
        <div className="experience-heading">
          <h2>Experiência</h2>
        </div>

        <div className="experience-timeline">
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
        </div>

        <ProjectGrid projects={projects} visibleCount={visibleProjectCount} />
      </section>

      <section className="section-shell contact-section" id="contato">
        <div>
          <h2>Vamos conversar sobre o próximo desafio?</h2>
          <p>Aberto a oportunidades como Desenvolvedor de Software e Engenharia de Software.</p>
        </div>

        <div className="contact-actions">
          <ContactButton className="button button-primary">Entrar em contato</ContactButton>
        </div>
      </section>
    </main>
  );
}
