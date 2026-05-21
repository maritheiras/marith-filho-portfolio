"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/lib/projects";
import { StackList } from "@/lib/stacks";

export function ProjectGrid({ projects, visibleCount }: { projects: Project[]; visibleCount: number }) {
  const [expanded, setExpanded] = useState(false);
  const hasHiddenProjects = projects.length > visibleCount;

  return (
    <div className="project-board">
      <div className="project-grid">
        {projects.map((project, index) => {
          const isHidden = !expanded && index >= visibleCount;

          return (
            <Link
              key={project.id}
              className={`project-card ${project.isLive ? "project-card-live" : ""} ${isHidden ? "is-hidden" : ""}`}
              href={`/projetos/${project.id}`}
              hidden={isHidden}
            >
              <div className="project-card-header">
                <span className={`status-dot ${project.isLive ? "" : "status-muted"}`}>{project.status}</span>
                <span className="project-type">{project.type}</span>
              </div>
              <div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </div>
              <StackList stacks={project.stacks} />
              <span className="project-card-cta">Ver detalhes</span>
            </Link>
          );
        })}
      </div>

      {hasHiddenProjects ? (
        <div className="project-more-row">
          <button
            className="project-more-button"
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((current) => !current)}
          >
            {expanded ? "Ver menos projetos" : "Ver mais projetos"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
