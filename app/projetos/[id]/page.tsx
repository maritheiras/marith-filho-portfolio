import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "@/components/ui";
import { getProject, projects } from "@/lib/projects";
import { absoluteUrl, createPageMetadata, getSiteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { StackList } from "@/lib/stacks";

type ProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const siteUrl = getSiteUrl();

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);

  if (!project) {
    return {
      title: "Projeto não encontrado"
    };
  }

  return createPageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projetos/${project.id}`,
    type: "article",
    imageAlt: project.title
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProject(id);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: absoluteUrl(`/projetos/${project.id}`),
    author: {
      "@type": "Person",
      name: "Márith Filho",
      url: siteConfig.linkedin
    },
    programmingLanguage: project.stacks,
    codeRepository: project.isPrivate ? undefined : project.repoUrl,
    sameAs: [project.liveUrl, project.repoUrl].filter(Boolean)
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: siteUrl
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projetos",
        item: absoluteUrl("/#projetos")
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: absoluteUrl(`/projetos/${project.id}`)
      }
    ]
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="section-shell project-detail-hero">
        <Link className="project-back" href="/#projetos">
          Voltar aos projetos
        </Link>
        <span className={`project-detail-status status-dot ${project.isLive ? "" : "status-muted"}`}>
          <span>{project.status}</span>
        </span>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
        <div className="project-detail-actions">
          {project.liveUrl ? (
            <ExternalLink className="button button-primary" href={project.liveUrl} aria-label={`${project.title}, abre em nova aba`}>
              Acessar projeto
            </ExternalLink>
          ) : null}
          {project.repoUrl && !project.isPrivate ? (
            <ExternalLink className="button button-secondary" href={project.repoUrl} aria-label={`Repositório ${project.title}, abre em nova aba`}>
              Ver repositório
            </ExternalLink>
          ) : null}
          {project.repoUrl && project.isPrivate ? (
            <span className="button button-secondary project-disabled-action">Repositório privado</span>
          ) : null}
        </div>
      </section>

      <section className="section-shell project-detail-grid">
        <article className="project-detail-panel">
          <span>Como foi construído</span>
          <h2>Construção do projeto</h2>
          <p>{project.build}</p>
        </article>

        <article className="project-detail-panel">
          <span>Stacks utilizadas</span>
          <h2>Tecnologias</h2>
          <StackList stacks={project.stacks} large />
        </article>

        <article className="project-detail-panel project-detail-panel-wide">
          <span>Detalhes técnicos</span>
          <h2>Pontos de destaque</h2>
          <ul>
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}
