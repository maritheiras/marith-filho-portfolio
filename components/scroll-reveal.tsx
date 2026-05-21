"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelector = [
  "main section:not(.hero) > .section-heading",
  ".experience-card",
  ".project-card:not([hidden]):not(.project-card-extra)",
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

  const siblings = Array.from(
    group.querySelectorAll<HTMLElement>(".project-card:not([hidden]):not(.project-card-extra), .experience-card, .project-detail-panel")
  );
  const index = Math.max(0, siblings.indexOf(element));

  return `${Math.min(index * 0.07, 0.35)}s`;
}

function isInRevealZone(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  return rect.top < viewportHeight * 0.98 && rect.bottom > viewportHeight * 0.04;
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
            rootMargin: "0px 0px -4% 0px",
            threshold: 0.08
          }
        );

    const prepare = () => {
      document.querySelectorAll<HTMLElement>(revealSelector).forEach((element) => {
        if (element.closest(".hero") || element.hidden) {
          return;
        }

        if (element.dataset.revealReady === "true") {
          if (!element.classList.contains("is-visible") && (reducedMotion || isInRevealZone(element))) {
            element.classList.add("is-visible");
            observer?.unobserve(element);
          }

          return;
        }

        element.dataset.revealReady = "true";
        element.style.setProperty("--reveal-delay", revealDelayFor(element));
        element.classList.add("scroll-reveal");

        if (reducedMotion || isInRevealZone(element)) {
          element.classList.add("is-visible");
          return;
        }

        observer?.observe(element);
      });
    };

    let pendingFrame: number | null = null;
    let nestedFrame: number | null = null;

    const schedulePrepare = () => {
      if (pendingFrame !== null) {
        return;
      }

      pendingFrame = window.requestAnimationFrame(() => {
        pendingFrame = null;
        prepare();
      });
    };

    prepare();

    const queuedFrames = [
      window.requestAnimationFrame(prepare),
      window.requestAnimationFrame(() => {
        nestedFrame = window.requestAnimationFrame(prepare);
      })
    ];
    const queuedTimers = [window.setTimeout(prepare, 160), window.setTimeout(prepare, 500), window.setTimeout(prepare, 1100)];

    const mutationObserver = new MutationObserver(() => {
      window.requestAnimationFrame(prepare);
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["hidden"]
    });

    window.addEventListener("scroll", schedulePrepare, { passive: true });
    window.addEventListener("hashchange", schedulePrepare);
    window.addEventListener("resize", schedulePrepare);

    return () => {
      if (pendingFrame !== null) {
        window.cancelAnimationFrame(pendingFrame);
      }

      if (nestedFrame !== null) {
        window.cancelAnimationFrame(nestedFrame);
      }

      queuedFrames.forEach((frame) => window.cancelAnimationFrame(frame));
      queuedTimers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("scroll", schedulePrepare);
      window.removeEventListener("hashchange", schedulePrepare);
      window.removeEventListener("resize", schedulePrepare);
      observer?.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
