"use client";

import type { CSSProperties } from "react";
import { useLayoutEffect, useRef, useState } from "react";

export type ExperienceItem = {
  side: string;
  current?: boolean;
  company: string;
  status?: string;
  title: string;
  location: string;
  description: string;
  badges: string[];
};

type ExperienceMetrics = {
  stackHeight: number;
  activeOffset: number;
  stackOffsets: number[];
};

const initialMetrics: ExperienceMetrics = {
  stackHeight: 420,
  activeOffset: 86,
  stackOffsets: []
};

export function ExperienceTimeline({ experiences }: { experiences: ExperienceItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [metrics, setMetrics] = useState<ExperienceMetrics>(initialMetrics);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useLayoutEffect(() => {
    const measureCards = () => {
      const heights = cardRefs.current.map((card) => card?.offsetHeight ?? 0);
      const activeHeight = heights[activeIndex] || heights[0] || 260;
      const stackStep = 46;
      const activeOffset = stackStep * Math.max(1, experiences.length - 1) + 18;
      const stackOffsets: number[] = [];

      experiences.forEach((_, index) => {
        stackOffsets[index] = index * stackStep;
      });

      setMetrics({
        stackHeight: activeOffset + activeHeight + 10,
        activeOffset,
        stackOffsets
      });
    };

    measureCards();
    window.addEventListener("resize", measureCards);

    return () => window.removeEventListener("resize", measureCards);
  }, [activeIndex, experiences.length]);

  return (
    <div
      className="experience-timeline experience-timeline-interactive"
      style={
        {
          "--experience-stack-height": `${metrics.stackHeight}px`
        } as CSSProperties
      }
    >
      {experiences.map((experience, index) => {
        const inactiveIndexes = experiences.map((_, itemIndex) => itemIndex).filter((itemIndex) => itemIndex !== activeIndex);
        const inactiveRank = inactiveIndexes.indexOf(index);
        const inactiveOffsetRank = Math.max(0, inactiveIndexes.length - inactiveRank - 1);
        const isActive = index === activeIndex;

        return (
          <article
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            className={`experience-card experience-card-${experience.side}${experience.current ? " is-current" : ""}${
              isActive ? " is-active" : " is-behind"
            }`}
            key={experience.title}
            style={
              {
                "--experience-y": `${isActive ? metrics.activeOffset : metrics.stackOffsets[inactiveOffsetRank] ?? 0}px`,
                "--experience-scale": isActive ? 1 : Math.max(0.94, 0.965 - inactiveRank * 0.025),
                "--experience-z": isActive ? experiences.length + 1 : experiences.length - inactiveRank
              } as CSSProperties
            }
            onClick={() => setActiveIndex(index)}
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
        );
      })}
    </div>
  );
}
