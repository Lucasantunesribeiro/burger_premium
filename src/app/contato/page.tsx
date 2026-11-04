import type { Metadata } from "next";
import Image from "next/image";
import { PageHead } from "@/components/site/page-head";
import { PhotoStrip } from "@/components/site/photo-strip";
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
      <PageHead foto={fotos.entardecer} titulo="Contato" lead={`${BUSINESS_ADDRESS}, ${BUSINESS_CITY}. ${BUSINESS_HOURS}.`} />
      <section className="band contact" aria-label="Como falar com a casa">
        <div className="wrap contact-grid">
          <div className="contact-main" data-reveal>
            <h2 className="titulo-grande">Fale com a {BUSINESS_NAME}</h2>
            <dl className="facts">
              <div className="fact" data-reveal>
                <dt className="fact-label">Endereço</dt>
                <dd className="fact-text">
                  {BUSINESS_ADDRESS}, {BUSINESS_CITY}
                </dd>
              </div>
              <div className="fact" data-reveal>
                <dt className="fact-label">Horário</dt>
                <dd className="fact-text">{BUSINESS_HOURS}</dd>
              </div>
            </dl>
            <a href={businessLink} className="btn" data-reveal>
              WhatsApp comercial
            </a>
          </div>
          <figure className="contact-photo" data-reveal>
            <Image src={fotos.arcos.src} alt={fotos.arcos.alt} fill sizes="(min-width: 60rem) 45vw, 100vw" className="foto-img" />
          </figure>
        </div>
      </section>
      <PhotoStrip items={[fotos.duasMaos, fotos.salaoBar, fotos.refriGelo]} label="Comida, salão e bebida" />
      <section className="band mine" aria-labelledby="igual-title">
        <div className="wrap mine-grid" data-reveal>
          <h2 id="igual-title" className="titulo-medio">
            Quero um igual
          </h2>
          <div className="mine-body" data-reveal>
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
