"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelector = [
  "main section:not(.hero) > .section-heading",
  ".experience-card",
  ".project-card:not([hidden])",
  ".project-more-row",
  ".about-portrait-wrap",
  ".about-details",
  ".contact-actions",
  ".project-detail-hero .project-back",
  ".project-detail-hero .project-detail-status",
  ".project-detail-hero h1",
  ".project-detail-hero p",
  ".project-detail-actions",
  ".project-detail-panel"
].join(",");

function revealDelayFor(element: HTMLElement) {
  const group = element.closest(".project-grid, .experience-timeline, .project-detail-grid");

  if (!group) {
    return "0s";
  }

  const siblings = Array.from(group.querySelectorAll<HTMLElement>(".project-card:not([hidden]), .experience-card, .project-detail-panel"));
  const index = Math.max(0, siblings.indexOf(element));

  return `${Math.min(index * 0.07, 0.35)}s`;
}

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = reducedMotion
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) {
                return;
              }

              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            });
          },
          {
            rootMargin: "0px 0px -12% 0px",
            threshold: 0.12
          }
        );

    const prepare = () => {
      document.querySelectorAll<HTMLElement>(revealSelector).forEach((element) => {
        if (element.closest(".hero") || element.hidden || element.dataset.revealReady === "true") {
          return;
        }

        element.dataset.revealReady = "true";
        element.style.setProperty("--reveal-delay", revealDelayFor(element));
        element.classList.add("scroll-reveal");

        if (reducedMotion) {
          element.classList.add("is-visible");
          return;
        }

        observer?.observe(element);
      });
    };

    prepare();

    const mutationObserver = new MutationObserver(() => {
      window.requestAnimationFrame(prepare);
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["hidden"]
    });

    return () => {
      observer?.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
