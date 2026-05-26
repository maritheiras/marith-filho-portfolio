"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ContactButton } from "@/components/contact-provider";
import { DownloadIcon } from "@/components/icons";
import { navItems, siteConfig } from "@/lib/site";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 50);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", isOpen);

    return () => document.body.classList.remove("nav-open");
  }, [isOpen]);

  const closeNav = () => setIsOpen(false);

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`} data-header>
      <div className="site-header-inner">
        <Link className="brand" href="/#inicio" aria-label="Voltar para o início" onClick={closeNav}>
          <span className="brand-mark" aria-hidden="true">/</span>
          <span className="brand-text">Márith Filho</span>
        </Link>

        <nav className={`site-nav${isOpen ? " is-open" : ""}`} aria-label="Navegação principal" data-nav>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeNav}>
              {item.label}
            </Link>
          ))}
          <div className="mobile-nav-actions" aria-label="Ações rápidas">
            <a className="mobile-nav-resume" href={siteConfig.resume} download={siteConfig.resumeDownloadName} onClick={closeNav}>
              Currículo
              <DownloadIcon className="inline-icon" />
            </a>
            <ContactButton className="mobile-nav-contact" onClick={closeNav}>
              Fale comigo
            </ContactButton>
          </div>
        </nav>

        <div className="header-actions">
          <a className="header-link" href={siteConfig.resume} download={siteConfig.resumeDownloadName}>
            Currículo
            <DownloadIcon className="inline-icon" />
          </a>
          <ContactButton className="header-cta">Fale comigo</ContactButton>
        </div>

        <button
          className="nav-toggle"
          type="button"
          aria-label={isOpen ? "Fechar navegação" : "Abrir navegação"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
