import type { AnchorHTMLAttributes, ReactNode } from "react";

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

function mergeRel(rel?: string) {
  return Array.from(new Set([...(rel?.split(" ") ?? []), "noopener", "noreferrer"].filter(Boolean))).join(" ");
}

export function ExternalLink({ children, rel, target = "_blank", "aria-label": ariaLabel, ...props }: ExternalLinkProps) {
  return (
    <a
      {...props}
      aria-label={ariaLabel ?? "Link externo, abre em nova aba"}
      rel={mergeRel(rel)}
      target={target}
    >
      {children}
    </a>
  );
}
