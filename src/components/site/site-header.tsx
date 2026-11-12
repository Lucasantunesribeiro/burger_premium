"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";

const links = [
  { href: "/cardapio", label: "Cardápio" },
  { href: "/promocoes", label: "Promoções" },
  { href: "/contato", label: "Contato" },
];

/**
 * Cabeçalho sobre a foto da primeira tela; ganha fundo sólido quando a página desce.
 * Na home, enquanto o lanche se monta (html[data-cena="montando"]), só a logo aparece, centrada;
 * a navegação entra quando o lanche fecha. Ver o bloco "cabeçalho" em globals.css.
 */
export const SiteHeader = () => {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);
  const [solido, setSolido] = useState(false);

  useEffect(() => {
    const medir = () => setSolido(window.scrollY > 40);
    medir();
    window.addEventListener("scroll", medir, { passive: true });
    return () => window.removeEventListener("scroll", medir);
  }, []);

  useEffect(() => {
    setAberto(false);
  }, [pathname]);

  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") setAberto(false);
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

  return (
    <header className="site-header" data-solido={solido || aberto} data-aberto={aberto}>
      <div className="wrap site-header-row">
        <Link href="/" className="wordmark" aria-label="Burger Premium, início">
          <Logo className="logo-svg" titulo={null} />
        </Link>
        <nav aria-label="Principal" className="nav-desk">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/cardapio" className="btn btn-sm">
            Pedir agora
          </Link>
        </nav>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={aberto}
          aria-controls="menu-movel"
          onClick={() => setAberto((valor) => !valor)}
        >
          {aberto ? "Fechar" : "Menu"}
        </button>
      </div>
      {aberto ? (
        <nav id="menu-movel" className="menu-drawer" aria-label="Principal, celular">
          {links.map((link) => (
            <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
};
