"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { CheckIcon, CloseIcon, CopyIcon, ExternalIcon, GitHubIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";

type ContactContextValue = {
  openContact: () => void;
  closeContact: () => void;
  isOpen: boolean;
};

const ContactContext = createContext<ContactContextValue | null>(null);

export function useContactModal() {
  const context = useContext(ContactContext);

  if (!context) {
    throw new Error("useContactModal must be used inside ContactProvider");
  }

  return context;
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("contact-modal-open", isOpen);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("contact-modal-open");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const value = useMemo(
    () => ({
      openContact: () => setIsOpen(true),
      closeContact: () => setIsOpen(false),
      isOpen
    }),
    [isOpen]
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <ContactContext.Provider value={value}>
      {children}
      <div
        className={`contact-popover${isOpen ? " is-open" : ""}`}
        id="contact-popover"
        role="dialog"
        aria-label="Entre em contato"
        aria-modal="true"
      >
        <button className="contact-close" type="button" aria-label="Fechar contato" onClick={() => setIsOpen(false)}>
          <CloseIcon />
        </button>
        <h2>Entre em contato</h2>
        <p>Escolha a melhor forma de falar comigo.</p>

        <div className="contact-email-row">
          <a href={`mailto:${siteConfig.email}`} aria-label="Enviar e-mail para Márith">
            <MailIcon className="contact-icon contact-icon-red" />
            <span>{siteConfig.email}</span>
          </a>
          <button
            className={copied ? "is-copied" : ""}
            type="button"
            aria-label={copied ? "E-mail copiado" : "Copiar e-mail"}
            onClick={copyEmail}
          >
            <CopyIcon />
            <CheckIcon />
          </button>
          <a href={`mailto:${siteConfig.email}`} aria-label="Abrir e-mail">
            <ExternalIcon />
          </a>
        </div>

        <div className="contact-card-grid">
          <a className="contact-card" href={`https://wa.me/${siteConfig.phone}`} target="_blank" rel="noreferrer">
            <span className="contact-icon-chip contact-icon-whatsapp">
              <WhatsAppIcon />
            </span>
            <span>WhatsApp</span>
          </a>
          <a className="contact-card" href={siteConfig.linkedin} target="_blank" rel="noreferrer">
            <span className="contact-icon-chip contact-icon-linkedin">
              <LinkedInIcon />
            </span>
            <span>LinkedIn</span>
          </a>
          <a className="contact-card" href={siteConfig.github} target="_blank" rel="noreferrer">
            <span className="contact-icon-chip contact-icon-github">
              <GitHubIcon />
            </span>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </ContactContext.Provider>
  );
}

export function ContactButton({ className, children, onClick }: { className: string; children: ReactNode; onClick?: () => void }) {
  const { openContact, isOpen } = useContactModal();

  return (
    <button
      className={className}
      type="button"
      aria-expanded={isOpen}
      aria-controls="contact-popover"
      onClick={() => {
        onClick?.();
        openContact();
      }}
    >
      {children}
    </button>
  );
}
