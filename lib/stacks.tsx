import type { ReactNode } from "react";

const simpleIconMap: Record<string, string> = {
  CSS: "https://cdn.simpleicons.org/css/ffffff",
  Dart: "https://cdn.simpleicons.org/dart/ffffff",
  Firebase: "https://cdn.simpleicons.org/firebase/ffffff",
  Flutter: "https://cdn.simpleicons.org/flutter/ffffff",
  Git: "https://cdn.simpleicons.org/git/ffffff",
  GitHub: "https://cdn.simpleicons.org/github/ffffff",
  HTML: "https://cdn.simpleicons.org/html5/ffffff",
  JavaScript: "https://cdn.simpleicons.org/javascript/ffffff",
  "n8n": "https://cdn.simpleicons.org/n8n/ffffff",
  "Next.js": "https://cdn.simpleicons.org/nextdotjs/ffffff",
  "Node.js": "https://cdn.simpleicons.org/nodedotjs/ffffff",
  React: "https://cdn.simpleicons.org/react/ffffff",
  Supabase: "https://cdn.simpleicons.org/supabase/ffffff",
  "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/ffffff",
  Tailwind: "https://cdn.simpleicons.org/tailwindcss/ffffff",
  TypeScript: "https://cdn.simpleicons.org/typescript/ffffff",
  MySQL: "https://cdn.simpleicons.org/mysql/ffffff"
};

export const marqueeStacks = [
  "HTML",
  "CSS",
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind",
  "Flutter",
  "Dart",
  "SQL",
  "MySQL",
  "Firebase",
  "Supabase",
  "n8n",
  "Git"
];

function DatabaseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </svg>
  );
}

export function StackIcon({ stack }: { stack: string }): ReactNode {
  if (stack === "SQL") {
    return <DatabaseIcon />;
  }

  const src = simpleIconMap[stack];

  if (!src) {
    return (
      <i className="stack-fallback" aria-hidden="true">
        {stack.slice(0, 1)}
      </i>
    );
  }

  return <img src={src} alt="" loading="lazy" />;
}

export function StackList({ stacks, large = false }: { stacks: string[]; large?: boolean }) {
  return (
    <div className={`project-stack-list${large ? " project-stack-list-large" : ""}`}>
      {stacks.map((stack) => (
        <span key={stack}>
          <StackIcon stack={stack} />
          {stack}
        </span>
      ))}
    </div>
  );
}
