import type { ExperienceItem } from "@/components/experience-timeline";

export const experiences: ExperienceItem[] = [
  {
    side: "right",
    current: true,
    company: "@ AUTÔNOMO",
    status: "Atual",
    title: "Desenvolvedor de Software Full Stack",
    location: "Brasil · Remoto · Projetos próprios",
    description: "Projetos web e multiplataforma, incluindo requisitos, interface, APIs, dados e deploy.",
    badges: ["2024 — Atual", "Full stack", "Produto digital"]
  },
  {
    side: "left",
    company: "@ SERRALHERIA SANTA VERONICA",
    title: "Assistente de Implantação de Sistemas e Processos",
    location: "Brasil · Presencial · Processos operacionais",
    description: "Implantação do WVETRO em áreas operacionais, com foco em organização e adoção do sistema.",
    badges: ["2023 — 2024", "Implantação", "Sistemas"]
  },
  {
    side: "right",
    company: "@ PROGEN S.A. E ENGEFORM",
    title: "Produtividade, faturamento e dados operacionais",
    location: "Brasil · Presencial · Operações e dados",
    description: "Controle de produtividade, faturamento, prazos e dados operacionais em contratos ligados à ENEL.",
    badges: ["2017 — 2022", "Dados", "Controle operacional"]
  }
];
