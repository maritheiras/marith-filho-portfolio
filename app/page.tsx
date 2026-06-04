import { ContactButton } from "@/components/contact-provider";
import { AboutSummary } from "@/components/about-summary";
import { ExperienceShowcase } from "@/components/experience-showcase";
import { HeroSocials } from "@/components/hero-socials";
import { ProjectGrid } from "@/components/project-grid";
import { StackMarquee } from "@/components/stack-marquee";
import { projects, visibleProjectCount } from "@/lib/projects";
import { absoluteUrl, createPageMetadata, getSiteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata = createPageMetadata({
  absoluteTitle: siteConfig.title,
  path: "/"
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Márith Filho",
      url: siteUrl,
      email: siteConfig.email,
      jobTitle: "Desenvolvedor de Software Full Stack",
      alumniOf: "Instituto Federal Fluminense",
      sameAs: [siteConfig.linkedin, siteConfig.github]
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Márith Filho Portfolio",
      url: siteUrl,
      description: siteConfig.description,
      inLanguage: "pt-BR",
      author: {
        "@id": `${siteUrl}/#person`
      }
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#projects`,
      name: "Projetos de software de Márith Filho",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/projetos/${project.id}`),
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

        <ExperienceShowcase />
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

        <AboutSummary />
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
