import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";
import { StackList } from "@/lib/stacks";

type ProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url;

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

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/projetos/${project.id}`
    },
    openGraph: {
      type: "article",
      url: `${siteUrl}/projetos/${project.id}`,
      title: `${project.title} | Márith Filho`,
      description: project.summary,
      siteName: "Márith Filho Portfolio",
      images: [
        {
          url: "/assets/programming-lifestyle.png",
          width: 1200,
          height: 630,
          alt: project.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Márith Filho`,
      description: project.summary,
      images: ["/assets/programming-lifestyle.png"]
    }
  };
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
    url: `${siteUrl}/projetos/${project.id}`,
    author: {
      "@type": "Person",
      name: "Márith Filho",
      url: siteConfig.linkedin
    },
    programmingLanguage: project.stacks,
    codeRepository: project.isPrivate ? undefined : project.repoUrl,
    sameAs: [project.liveUrl, project.repoUrl].filter(Boolean)
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="section-shell project-detail-hero">
        <Link className="project-back" href="/#projetos">
          Voltar aos projetos
        </Link>
        <span className={`project-detail-status ${project.isLive ? "is-live" : ""}`}>{project.status}</span>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
        <div className="project-detail-actions">
          {project.liveUrl ? (
            <a className="button button-primary" href={project.liveUrl} target="_blank" rel="noreferrer">
              Acessar projeto
            </a>
          ) : null}
          {project.repoUrl && !project.isPrivate ? (
            <a className="button button-secondary" href={project.repoUrl} target="_blank" rel="noreferrer">
              Ver repositório
            </a>
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
