import { ContactButton } from "@/components/contact-provider";
import { PricingValueCarousel } from "@/components/pricing-value-carousel";
import { absoluteUrl, createPageMetadata, getSiteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const siteUrl = getSiteUrl();

const pricingPlans = [
  {
    name: "Básico",
    label: "Site vitrine",
    price: "R$ 1.497",
    description:
      "Para negócios que precisam começar com uma presença digital limpa, responsiva e pronta para aparecer no Google.",
    bestFor: "Loja, serviço local, profissional autônomo ou primeira versão institucional.",
    items: [
      "Site vitrine com 2 a 4 páginas ou até 8 seções",
      "Layout responsivo para desktop, tablet e celular",
      "Estrutura de conteúdo, menus, CTAs e links de contato",
      "SEO técnico inicial, sitemap, robots e configuração no Google Search Console",
      "Publicação do site e orientação básica de domínio"
    ],
    note: "Direção visual simples com base nos materiais já existentes da marca."
  },
  {
    name: "Intermediário",
    label: "Site comercial",
    price: "R$ 3.497",
    description:
      "Para quem quer sair do básico com uma identidade mais consistente, melhor organização visual e mais força comercial.",
    bestFor: "Empresa que precisa parecer mais profissional e converter melhor o visitante.",
    items: [
      "Tudo do plano Básico",
      "Identidade visual base: cores, tipografia, direção visual e aplicação no site",
      "Mais profundidade na estrutura das páginas e seções estratégicas",
      "Componentes de conversão: botões, chamadas, cards, formulários e WhatsApp",
      "Melhor refinamento de copy, hierarquia visual e experiência de navegação"
    ],
    note: "É o salto ideal quando o site precisa representar melhor a marca, não apenas existir."
  },
  {
    name: "Avançado",
    label: "Site com painel",
    price: "R$ 4.497",
    description:
      "Para negócios que querem autonomia para atualizar o site, cadastrar conteúdos e manter a operação em movimento.",
    bestFor: "Catálogo, produtos, blog, artigos, páginas dinâmicas ou site que muda com frequência.",
    items: [
      "Tudo do plano Intermediário",
      "Painel de controle para editar conteúdos do site",
      "Cadastro de produtos, artigos, categorias ou conteúdos dinâmicos",
      "Estrutura preparada para crescimento, manutenção e novas páginas",
      "Treinamento rápido para você ou sua equipe atualizar o site com segurança"
    ],
    note: "Indicado para quem quer mais controle sobre o próprio conteúdo.",
    featured: true
  }
];

const valueItems = [
  {
    title: "Planejamento e estrutura",
    value: "R$ 250 a R$ 500",
    text: "Definição das páginas, seções, fluxo do usuário, prioridades e mensagens principais."
  },
  {
    title: "Design e responsividade",
    value: "R$ 700 a R$ 1.200",
    text: "Criação da experiência visual, adaptação para celular e cuidado com leitura, contraste e espaçamento."
  },
  {
    title: "Desenvolvimento do site",
    value: "R$ 800 a R$ 1.800",
    text: "Construção das páginas, componentes, navegação, formulários, links e publicação."
  },
  {
    title: "SEO e Google Search",
    value: "R$ 400 a R$ 700",
    text: "Títulos, descrições, sitemap, robots, dados estruturados e envio para o Google Search Console."
  },
  {
    title: "Identidade visual base",
    value: "R$ 700 a R$ 1.200",
    text: "Direção de marca aplicada ao site: paleta, tipografia, estilo visual e consistência de apresentação."
  },
  {
    title: "Painel de controle",
    value: "R$ 1.200 a R$ 2.000",
    text: "Estrutura para você ou sua equipe alterar produtos, artigos, páginas ou conteúdos sem depender de código."
  }
];

const upgradeReasons = [
  {
    title: "Do Básico para o Intermediário",
    text: "Para negócios que precisam ir além da vitrine e apresentar uma presença comercial mais forte, com identidade visual e mais confiança."
  },
  {
    title: "Do Intermediário para o Avançado",
    text: "Para quem quer autonomia para atualizar produtos, artigos e conteúdos sem depender de novas alterações no código."
  },
  {
    title: "Quando manter o Básico",
    text: "Faz sentido quando o objetivo é validar presença online, apresentar serviços e ter uma estrutura simples, bonita e bem indexada."
  }
];

export const metadata = createPageMetadata({
  absoluteTitle: "Criação de Sites - Preços | Márith Filho",
  description:
    "Planos para criação de sites: básico, intermediário e avançado com SEO, Google Search Console, identidade visual e painel de controle.",
  path: "/sites-precos",
  image: "/assets/sites-precos-og.png",
  imageAlt: "Criação de sites profissionais por Márith Filho",
  imageWidth: 1200,
  imageHeight: 630
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteUrl}/sites-precos#service`,
  name: "Criação de sites profissionais",
  description:
    "Criação de sites responsivos com SEO técnico, Google Search Console, identidade visual e painel de controle conforme o plano contratado.",
  provider: {
    "@type": "Person",
    name: "Márith Filho",
    url: siteUrl,
    email: siteConfig.email
  },
  areaServed: {
    "@type": "Country",
    name: "Brasil"
  },
  serviceType: "Criação de sites",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Planos para criação de sites",
    itemListElement: pricingPlans.map((plan) => ({
      "@type": "Offer",
      name: `${plan.name} - ${plan.label}`,
      price: plan.price.replace(/\D/g, ""),
      priceCurrency: "BRL",
      url: absoluteUrl("/sites-precos"),
      description: plan.description
    }))
  }
};

export default function SitePricingPage() {
  return (
    <main className="pricing-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="section-shell pricing-hero">
        <p className="eyebrow hero-eyebrow">Sites profissionais</p>
        <h1 className="section-title">Criação de sites.</h1>
        <p className="pricing-hero-copy">
          Do site vitrine ao painel de controle, com SEO técnico e presença no Google.
        </p>
      </section>

      <section className="section-shell pricing-section" aria-labelledby="pricing-plans-title">
        <div className="section-heading">
          <h2 id="pricing-plans-title">Planos de criação.</h2>
          <p className="section-description">
            Escolha o formato ideal para o momento do seu negócio, com entregas claras e foco em presença digital de verdade.
          </p>
        </div>

        <div className="pricing-grid">
          {pricingPlans.map((plan) => (
            <article className={`pricing-plan-card${plan.featured ? " pricing-plan-featured" : ""}`} key={plan.name}>
              {plan.featured ? <span className="pricing-badge">Mais estratégico</span> : null}
              <div className="pricing-plan-top">
                <span>{plan.label}</span>
                <h3>{plan.name}</h3>
                <p>{plan.description}</p>
              </div>

              <div className="pricing-price">
                <span>a partir de</span>
                <strong>
                  {plan.price}
                  {plan.name === "Intermediário" || plan.name === "Avançado" ? <PriceVarianceHint /> : null}
                </strong>
              </div>

              <div className="pricing-best-for">
                <span>Indicado para</span>
                <p>{plan.bestFor}</p>
              </div>

              <ul className="pricing-list">
                {plan.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pricing-section" aria-labelledby="pricing-value-title">
        <div className="section-heading">
          <h2 id="pricing-value-title">Composição do valor.</h2>
          <p className="section-description">
            Cada projeto reúne etapas essenciais para construir um site com estratégia, boa experiência, presença no Google e base para crescer.
          </p>
        </div>

        <PricingValueCarousel items={valueItems} />
      </section>

      <section className="section-shell pricing-section" aria-labelledby="pricing-upgrade-title">
        <div className="section-heading">
          <h2 id="pricing-upgrade-title">Por que mudar de plano?</h2>
          <p className="section-description">
            Cada plano atende um nível diferente de maturidade digital, desde a primeira presença online até a autonomia de gestão.
          </p>
        </div>

        <div className="pricing-upgrade-grid">
          {upgradeReasons.map((reason) => (
            <article className="pricing-upgrade-card" key={reason.title}>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pricing-section">
        <div className="pricing-note-panel">
          <div>
            <h2>O que não entra por padrão.</h2>
            <p>
              Domínio, hospedagem paga, tráfego pago, produção de fotos, textos longos, manutenção mensal e integrações
              complexas podem ser avaliados à parte conforme a necessidade do projeto.
            </p>
          </div>
          <div className="pricing-note-list">
            <span>Domínio e hospedagem</span>
            <span>Manutenção mensal</span>
            <span>Fotos e vídeos</span>
            <span>Integrações avançadas</span>
          </div>
        </div>
      </section>

      <section className="section-shell pricing-cta-section">
        <div className="pricing-cta-panel">
          <div>
            <h2>Encontre o plano ideal.</h2>
            <p>
              Me conte sobre o seu negócio, o objetivo do site e o que precisa estar no ar. A partir disso, indico o caminho mais adequado.
            </p>
          </div>
          <ContactButton className="button button-primary">Fale comigo</ContactButton>
        </div>
      </section>
    </main>
  );
}

function PriceVarianceHint() {
  return (
    <span
      className="price-variance-hint"
      tabIndex={0}
      aria-label="O valor pode variar conforme quantidade de páginas, seções e funções."
      data-tooltip="O valor pode variar conforme quantidade de páginas, seções e funções."
    >
      *
    </span>
  );
}
