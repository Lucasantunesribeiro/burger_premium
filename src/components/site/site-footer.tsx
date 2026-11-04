import Link from "next/link";
import {
  BUSINESS_ADDRESS,
  BUSINESS_CITY,
  BUSINESS_HOURS,
  BUSINESS_WHATSAPP,
  LUCAS_WHATSAPP,
} from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { PhotoCredits } from "./photo-credits";

const links = [
  { href: "/cardapio", label: "Cardápio" },
  { href: "/promocoes", label: "Promoções" },
  { href: "/contato", label: "Contato" },
];

export const SiteFooter = () => (
  <footer className="site-footer">
    <div className="wrap footer-top">
      <div className="footer-invite">
        <p className="footer-lead">
          Com fome? Monte o pedido e mande pelo WhatsApp.
        </p>
        <a
          className="btn btn-escuro"
          href={buildWhatsAppUrl(BUSINESS_WHATSAPP, "Olá! Quero fazer um pedido.")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Pedir pelo WhatsApp
        </a>
      </div>
      <nav aria-label="Rodapé" className="footer-nav">
        <ul className="footer-list">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="footer-link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <address className="footer-address">
        <span>{BUSINESS_ADDRESS}</span>
        <span>{BUSINESS_CITY}</span>
        <span>{BUSINESS_HOURS}</span>
      </address>
    </div>
    <div className="wrap footer-notes">
      <p className="seal">Modelo</p>
      <p className="demo-note">
        Site de demonstração. Burger Premium é uma marca fictícia, sem relação
        com um estabelecimento real. Endereço, horário, preços, promoções e
        telefone são exemplos.
      </p>
      <p className="demo-note">
        Quer um site assim para o seu negócio?{" "}
        <a
          className="text-link"
          href={buildWhatsAppUrl(
            LUCAS_WHATSAPP,
            "Olá Lucas! Quero um site igual ao Burger Premium."
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          Fale com o Lucas
        </a>
        .
      </p>
      <PhotoCredits />
    </div>
    <div className="wrap footer-name-box">
      <div className="footer-name name-xl" aria-hidden="true">
        <span>Burger</span>
        <span>Premium</span>
      </div>
    </div>
  </footer>
);
