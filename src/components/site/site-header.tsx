"use client";

import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BUSINESS_NAME, BUSINESS_WHATSAPP } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/cardapio", label: "Cardapio" },
  { href: "/promocoes", label: "Promocoes" },
  { href: "/contato", label: "Contato" },
];

export const SiteHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const whatsappLink = buildWhatsAppUrl(
    BUSINESS_WHATSAPP,
    "Ola! Quero fazer um pedido."
  );

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="sticky top-0 z-40">
      <div className="h-6 bg-background/70 backdrop-blur" aria-hidden="true" />
      <header className="relative border-b border-border/60 bg-background/70 backdrop-blur">
        <div className="hidden md:flex">
          <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-3 py-5 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <span
                className="h-3 w-3 rounded-full bg-primary glow"
                aria-hidden="true"
              />
              <Link
                href="/"
                className="font-display text-4xl uppercase tracking-wide"
              >
                {BUSINESS_NAME}
              </Link>
              <span className="rounded-full border border-border/80 bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Demo
              </span>
            </div>
            <nav
              className="flex items-center gap-8 text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground lg:text-base"
              aria-label="Primaria"
            >
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Button asChild size="lg" className="gap-2 glow">
              <a href={whatsappLink} aria-label="Pedir no WhatsApp">
                <MessageCircle className="h-4 w-4" />
                Pedir agora
              </a>
            </Button>
          </div>
        </div>
        <div className="md:hidden">
          <div className="flex w-full items-center justify-between px-3 py-2.5">
            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full bg-primary glow"
                aria-hidden="true"
              />
              <Link
                href="/"
                className="font-display text-3xl uppercase tracking-wide leading-tight"
              >
                {BUSINESS_NAME}
              </Link>
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-border/60 bg-background/80 p-2 text-muted-foreground transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <div
          id="mobile-menu"
          className={`md:hidden absolute inset-x-0 top-full z-40 transition duration-200 ${
            isMenuOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          <div className="border-t border-border/60 bg-background/95 backdrop-blur">
            <nav
              className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-3 py-6 text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground"
              aria-label="Primaria"
            >
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-primary"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mx-auto w-full max-w-[1400px] px-3 pb-6">
              <Button asChild size="lg" className="w-full gap-2 glow">
                <a
                  href={whatsappLink}
                  aria-label="Pedir no WhatsApp"
                  onClick={closeMenu}
                >
                  <MessageCircle className="h-4 w-4" />
                  Pedir agora
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
