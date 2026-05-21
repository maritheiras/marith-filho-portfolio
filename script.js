const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const header = document.querySelector("[data-header]");
const contactToggles = [...document.querySelectorAll("[data-contact-toggle]")];
const contactPopover = document.querySelector("[data-contact-popover]");
const contactClose = document.querySelector("[data-contact-close]");
const copyEmail = document.querySelector("[data-copy-email]");
const year = document.querySelector("[data-year]");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const projectGrid = document.querySelector("[data-project-grid]");
const projectMore = document.querySelector("[data-project-more]");
const projectDetail = document.querySelector("[data-project-detail]");
let copyFeedbackTimer;

if (contactPopover && contactPopover.parentElement !== document.body) {
  document.body.appendChild(contactPopover);
}

if (year) {
  year.textContent = new Date().getFullYear();
}

if (header) {
  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 50);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Fechar navegação" : "Abrir navegação");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Abrir navegação");
    });
  });
}

if (contactToggles.length && contactPopover) {
  const closeContactPopover = () => {
    contactPopover.classList.remove("is-open");
    document.body.classList.remove("contact-modal-open");
    contactToggles.forEach((toggle) => toggle.setAttribute("aria-expanded", "false"));
  };

  const openContactPopover = () => {
    contactPopover.classList.add("is-open");
    document.body.classList.add("contact-modal-open");
    contactToggles.forEach((toggle) => toggle.setAttribute("aria-expanded", "true"));
  };

  contactToggles.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      if (contactPopover.classList.contains("is-open")) {
        closeContactPopover();
        return;
      }

      openContactPopover();
    });
  });

  contactClose?.addEventListener("click", closeContactPopover);

  document.addEventListener("click", (event) => {
    if (!contactPopover.classList.contains("is-open")) return;
    if (contactPopover.contains(event.target)) return;
    if (header?.contains(event.target)) return;
    closeContactPopover();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeContactPopover();
    }
  });
}

const copyToClipboard = async (text) => {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Some browsers only allow clipboard access after explicit user activation.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
};

copyEmail?.addEventListener("click", async () => {
  try {
    await copyToClipboard("marith.eiras@gmail.com");
    copyEmail.setAttribute("aria-label", "E-mail copiado");
    copyEmail.classList.add("is-copied");

    window.clearTimeout(copyFeedbackTimer);
    copyFeedbackTimer = window.setTimeout(() => {
      copyEmail.classList.remove("is-copied");
      copyEmail.setAttribute("aria-label", "Copiar e-mail");
    }, 2400);
  } catch {
    copyEmail.setAttribute("aria-label", "Não foi possível copiar o e-mail");
  }
});

const stackIcons = {
  "CSS": "https://cdn.simpleicons.org/css/ffffff",
  "Dart": "https://cdn.simpleicons.org/dart/ffffff",
  "Firebase": "https://cdn.simpleicons.org/firebase/ffffff",
  "Flutter": "https://cdn.simpleicons.org/flutter/ffffff",
  "GitHub": "https://cdn.simpleicons.org/github/ffffff",
  "HTML": "https://cdn.simpleicons.org/html5/ffffff",
  "JavaScript": "https://cdn.simpleicons.org/javascript/ffffff",
  "Markdown": "https://cdn.simpleicons.org/markdown/ffffff",
  "n8n": "https://cdn.simpleicons.org/n8n/ffffff",
  "Next.js": "https://cdn.simpleicons.org/nextdotjs/ffffff",
  "React": "https://cdn.simpleicons.org/react/ffffff",
  "SQL": "database",
  "Supabase": "https://cdn.simpleicons.org/supabase/ffffff",
  "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/ffffff",
  "TypeScript": "https://cdn.simpleicons.org/typescript/ffffff"
};

const renderStackIcon = (stack) => {
  const icon = stackIcons[stack];

  if (icon === "database") {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <ellipse cx="12" cy="6" rx="7" ry="3"></ellipse>
        <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6"></path>
        <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"></path>
      </svg>
    `;
  }

  if (!icon) {
    return `<i class="stack-fallback" aria-hidden="true">${stack.slice(0, 1)}</i>`;
  }

  return `<img src="${icon}" alt="" loading="lazy" />`;
};

const renderStackList = (stacks) => stacks.map((stack) => `
  <span>
    ${renderStackIcon(stack)}
    ${stack}
  </span>
`).join("");

if (projectGrid && Array.isArray(window.portfolioProjects)) {
  const visibleProjects = 6;

  projectGrid.innerHTML = window.portfolioProjects.map((project, index) => `
    <a
      class="project-card ${project.isLive ? "project-card-live" : ""} ${index >= visibleProjects ? "is-hidden" : ""}"
      href="projeto.html?id=${project.id}"
      ${index >= visibleProjects ? "hidden" : ""}
    >
      <div class="project-card-header">
        <span class="status-dot ${project.isLive ? "" : "status-muted"}">${project.status}</span>
        <span class="project-type">${project.type}</span>
      </div>
      <div>
        <h3>${project.title}</h3>
        <p>${project.summary}</p>
      </div>
      <div class="project-stack-list" aria-label="Stacks usadas em ${project.title}">
        ${renderStackList(project.stacks)}
      </div>
      <span class="project-card-cta">Ver detalhes</span>
    </a>
  `).join("");

  const hiddenProjects = [...projectGrid.querySelectorAll(".project-card.is-hidden")];

  if (!hiddenProjects.length) {
    projectMore?.setAttribute("hidden", "");
  }

  projectMore?.addEventListener("click", () => {
    const isExpanded = projectMore.getAttribute("aria-expanded") === "true";

    hiddenProjects.forEach((project) => {
      project.hidden = isExpanded;
    });

    projectMore.setAttribute("aria-expanded", String(!isExpanded));
    projectMore.textContent = isExpanded ? "Ver mais projetos" : "Ver menos projetos";
  });
}

if (projectDetail && Array.isArray(window.portfolioProjects)) {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("id");
  const project = window.portfolioProjects.find((item) => item.id === projectId);

  if (!project) {
    projectDetail.innerHTML = `
      <section class="section-shell project-detail-hero">
        <a class="project-back" href="index.html#projetos">Voltar aos projetos</a>
        <h1>Projeto não encontrado.</h1>
        <p>Esse projeto não está cadastrado na vitrine do portfólio.</p>
      </section>
    `;
  } else {
    document.title = `${project.title} | Márith Filho`;

    const actions = [
      project.liveUrl
        ? `<a class="button button-primary" href="${project.liveUrl}" target="_blank" rel="noreferrer">Acessar projeto</a>`
        : "",
      project.repoUrl && !project.isPrivate
        ? `<a class="button button-secondary" href="${project.repoUrl}" target="_blank" rel="noreferrer">Ver repositório</a>`
        : "",
      project.repoUrl && project.isPrivate
        ? `<span class="button button-secondary project-disabled-action">Repositório privado</span>`
        : ""
    ].join("");

    projectDetail.innerHTML = `
      <section class="section-shell project-detail-hero">
        <a class="project-back" href="index.html#projetos">Voltar aos projetos</a>
        <span class="project-detail-status ${project.isLive ? "is-live" : ""}">${project.status}</span>
        <h1>${project.title}</h1>
        <p>${project.summary}</p>
        <div class="project-detail-actions">${actions}</div>
      </section>

      <section class="section-shell project-detail-grid">
        <article class="project-detail-panel">
          <span>Como foi construído</span>
          <h2>Construção do projeto</h2>
          <p>${project.build}</p>
        </article>

        <article class="project-detail-panel">
          <span>Stacks utilizadas</span>
          <h2>Tecnologias</h2>
          <div class="project-stack-list project-stack-list-large">
            ${renderStackList(project.stacks)}
          </div>
        </article>

        <article class="project-detail-panel project-detail-panel-wide">
          <span>Detalhes técnicos</span>
          <h2>Pontos de destaque</h2>
          <ul>
            ${project.highlights.map((highlight) => `<li>${highlight}</li>`).join("")}
          </ul>
        </article>
      </section>
    `;
  }
}
