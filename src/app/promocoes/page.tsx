import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHead } from "@/components/site/page-head";
import { PhotoStrip } from "@/components/site/photo-strip";
import { fotos } from "@/lib/fotos";
import { BUSINESS_WHATSAPP } from "@/lib/constants";
import { promotions } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Promoções",
  description:
    "Cupons de exemplo da Burger Premium, uma demonstração de hamburgueria. Regras fictícias para o cliente confirmar.",
  alternates: { canonical: "/promocoes" },
};

const fotosDosCupons = [fotos.tresBurgers, fotos.cestaMolho, fotos.doubleChapa];

export default function PromocoesPage() {
  const whatsappLink = buildWhatsAppUrl(
    BUSINESS_WHATSAPP,
    "Olá! Quero usar uma promoção do Burger Premium."
  );

  return (
    <>
      <PageHead foto={fotos.neonCopo} titulo="Promoções" lead="Cupons de exemplo da casa, para pedidos feitos pelo WhatsApp." />
      <section className="wrap band" aria-label="Cupons">
        <ul className="cupons">
          {promotions.map((promo, indice) => (
            <li key={promo.code} className="cupom" data-reveal>
              <div className="cupom-foto">
                <Image src={fotosDosCupons[indice].src} alt={fotosDosCupons[indice].alt} fill sizes="(min-width: 56rem) 33vw, 100vw" className="foto-img" />
              </div>
              <div className="cupom-texto">
                <h2 className="titulo-medio">{promo.title}</h2>
                <p className="cupom-codigo">
                  <span className="visually-hidden">Código: </span>
                  {promo.code}
                </p>
                <p>{promo.description}</p>
                <ul className="cupom-regras">
                  {promo.rules.map((rule) => (
                    <li key={rule}>{rule}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
        <div className="centro">
          <p className="lead">Combine a promoção com o seu combo favorito.</p>
          <div className="hero-acoes">
            <a href={whatsappLink} className="btn">
              Pedir com cupom
            </a>
            <Link href="/cardapio" className="btn btn-linha">
              Ver o cardápio
            </Link>
          </div>
        </div>
      </section>
      <PhotoStrip items={[fotos.fritasCesta, fotos.chapaPinca, fotos.chope]} label="Fritas, grelha e chope" />
    </>
  );
}
