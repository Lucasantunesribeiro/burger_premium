import type { Metadata } from "next";
import Image from "next/image";
import { PhotoStrip, stripDefault } from "@/components/site/photo-strip";
import {
  BUSINESS_ADDRESS,
  BUSINESS_CITY,
  BUSINESS_HOURS,
  BUSINESS_NAME,
  BUSINESS_WHATSAPP,
  LUCAS_WHATSAPP,
} from "@/lib/constants";
import { fotos } from "@/lib/fotos";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Endereço, horário e WhatsApp da Burger Premium, uma demonstração de hamburgueria em Botafogo.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  const businessLink = buildWhatsAppUrl(
    BUSINESS_WHATSAPP,
    "Olá! Quero falar com a Burger Premium."
  );
  const lucasLink = buildWhatsAppUrl(
    LUCAS_WHATSAPP,
    "Olá Lucas! Quero um site igual ao Burger Premium."
  );

  return (
    <>
      <section className="page-head" aria-labelledby="page-title">
        <div className="wrap">
          <h1 id="page-title" className="page-title name-page">
            Contato
          </h1>
          <p className="lead page-lead">{BUSINESS_ADDRESS}, {BUSINESS_CITY}. {BUSINESS_HOURS}.</p>
        </div>
      </section>
      <PhotoStrip items={stripDefault} label="Fotos de arquivo do fogo, do pão e do Rio" />
      <section className="band contact" aria-label="Como falar com a casa">
        <div className="wrap contact-grid">
          <div className="contact-main" data-reveal>
            <h2 className="section-title">Fale com a {BUSINESS_NAME}</h2>
            <dl className="facts">
              <div className="fact">
                <dt className="fact-label">Endereço</dt>
                <dd className="fact-text">
                  {BUSINESS_ADDRESS}, {BUSINESS_CITY}
                </dd>
              </div>
              <div className="fact">
                <dt className="fact-label">Horário</dt>
                <dd className="fact-text">{BUSINESS_HOURS}</dd>
              </div>
            </dl>
            <a href={businessLink} className="btn">
              WhatsApp comercial
            </a>
          </div>
          <figure className="contact-photo" data-reveal>
            <Image
              src={fotos.entardecer.src}
              alt={fotos.entardecer.alt}
              width={fotos.entardecer.width}
              height={fotos.entardecer.height}
              sizes="(min-width: 60rem) 45vw, 100vw"
              className="contact-img"
            />
          </figure>
        </div>
      </section>
      <section className="band mine on-dark" aria-labelledby="igual-title">
        <div className="wrap mine-grid" data-reveal>
          <h2 id="igual-title" className="section-title">
            Quero um igual
          </h2>
          <div className="mine-body">
            <p className="lead">
              Este site é um projeto de portfólio. Fale direto com o Lucas.
            </p>
            <a href={lucasLink} className="btn">
              Falar com Lucas
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
