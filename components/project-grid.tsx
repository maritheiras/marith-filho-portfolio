"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import { StackList } from "@/lib/stacks";

const extraProjectAnimationMs = 760;

export function ProjectGrid({ projects, visibleCount }: { projects: Project[]; visibleCount: number }) {
  const [expanded, setExpanded] = useState(false);
  const [animateExtra, setAnimateExtra] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const collapseTimer = useRef<number | null>(null);
  const hasHiddenProjects = projects.length > visibleCount;
  const visibleProjects = projects.slice(0, visibleCount);
  const extraProjects = projects.slice(visibleCount);
  const shouldRenderExtraProjects = expanded || isCollapsing;

  useEffect(() => {
    if (!expanded || isCollapsing) {
      setAnimateExtra(false);
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setAnimateExtra(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [expanded, isCollapsing]);

  useEffect(() => {
    return () => {
      if (collapseTimer.current !== null) {
        window.clearTimeout(collapseTimer.current);
      }
    };
  }, []);

  const toggleProjects = () => {
    if (!expanded) {
      if (collapseTimer.current !== null) {
        window.clearTimeout(collapseTimer.current);
        collapseTimer.current = null;
      }

      setIsCollapsing(false);
      setExpanded(true);
      return;
    }

    setAnimateExtra(false);
    setIsCollapsing(true);

    if (collapseTimer.current !== null) {
      window.clearTimeout(collapseTimer.current);
    }

    collapseTimer.current = window.setTimeout(() => {
      setExpanded(false);
      setIsCollapsing(false);
      collapseTimer.current = null;
    }, extraProjectAnimationMs);
  };

  return (
    <div className="project-board">
      <div className="project-grid">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className={`project-extra-wrap ${expanded ? "is-expanded" : ""} ${isCollapsing ? "is-collapsing" : ""}`}>
        {shouldRenderExtraProjects ? (
          <div className="project-grid project-extra-grid">
            {extraProjects.map((project, extraIndex) => (
              <ProjectCard
                key={project.id}
                project={project}
                className={`project-card-extra ${animateExtra ? "is-visible" : ""} ${isCollapsing ? "is-collapsing" : ""}`}
                style={{ "--extra-delay": `${Math.min(extraIndex * 0.08, 0.28)}s` } as CSSProperties}
              />
            ))}
          </div>
        ) : null}
      </div>

      {hasHiddenProjects ? (
        <div className="project-more-row">
          <button
            className="project-more-button"
            type="button"
            aria-expanded={expanded}
            onClick={toggleProjects}
          >
            {expanded ? "Ver menos projetos" : "Ver mais projetos"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

function ProjectCard({ project, className = "", style }: { project: Project; className?: string; style?: CSSProperties }) {
  return (
    <Link
      className={`project-card ${project.isLive ? "project-card-live" : ""} ${className}`}
      style={style}
      href={`/projetos/${project.id}`}
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
}
