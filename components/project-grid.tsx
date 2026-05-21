"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import { StackList } from "@/lib/stacks";

const extraProjectAnimationMs = 760;

export function ProjectGrid({ projects, visibleCount }: { projects: Project[]; visibleCount: number }) {
  const [expanded, setExpanded] = useState(false);
  const [animateExtra, setAnimateExtra] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const collapseTimer = useRef<number | null>(null);
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);
  const hasHiddenProjects = projects.length > visibleCount;
  const visibleProjects = projects.slice(0, visibleCount);
  const extraProjects = projects.slice(visibleCount);
  const shouldRenderExtraProjects = expanded || isCollapsing;

  const updateMobileScrollState = useCallback(() => {
    const track = mobileTrackRef.current;

    if (!track) {
      return;
    }

    const maxScroll = track.scrollWidth - track.clientWidth;
    setCanScrollPrev(track.scrollLeft > 8);
    setCanScrollNext(track.scrollLeft < maxScroll - 8);
  }, []);

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

  useEffect(() => {
    const frame = window.requestAnimationFrame(updateMobileScrollState);
    window.addEventListener("resize", updateMobileScrollState);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateMobileScrollState);
    };
  }, [projects.length, updateMobileScrollState]);

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

  const scrollMobileProjects = (direction: "prev" | "next") => {
    const track = mobileTrackRef.current;

    if (!track) {
      return;
    }

    const cards = Array.from(track.querySelectorAll<HTMLElement>(".project-card"));

    if (cards.length === 0) {
      return;
    }

    const viewportCenter = track.scrollLeft + track.clientWidth / 2;
    const currentIndex = cards.reduce((closestIndex, card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const closestCard = cards[closestIndex];
      const closestCenter = closestCard.offsetLeft + closestCard.offsetWidth / 2;

      return Math.abs(cardCenter - viewportCenter) < Math.abs(closestCenter - viewportCenter) ? index : closestIndex;
    }, 0);
    const targetIndex = Math.max(0, Math.min(cards.length - 1, currentIndex + (direction === "next" ? 1 : -1)));
    const targetCard = cards[targetIndex];
    const targetLeft = targetCard.offsetLeft - (track.clientWidth - targetCard.offsetWidth) / 2;

    track.scrollTo({
      left: targetLeft,
      behavior: "smooth"
    });
  };

  return (
    <>
      <div className="project-board project-board-desktop">
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

      <div className="project-mobile-board">
        <div className={`project-mobile-viewport ${canScrollPrev ? "has-prev" : ""} ${canScrollNext ? "has-next" : ""}`}>
          {canScrollPrev ? (
            <button
              className="project-mobile-arrow project-mobile-arrow-prev"
              type="button"
              aria-label="Projeto anterior"
              onClick={() => scrollMobileProjects("prev")}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
          ) : null}

          <div className="project-grid project-mobile-grid" ref={mobileTrackRef} onScroll={updateMobileScrollState}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {canScrollNext ? (
            <button
              className="project-mobile-arrow project-mobile-arrow-next"
              type="button"
              aria-label="Proximo projeto"
              onClick={() => scrollMobileProjects("next")}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
    </>
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
