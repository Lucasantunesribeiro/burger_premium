import type { Metadata } from "next";
import Link from "next/link";
import { PhotoStrip, stripAlt } from "@/components/site/photo-strip";
import { BUSINESS_WHATSAPP } from "@/lib/constants";
import { promotions } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Promoções",
  description:
    "Cupons de exemplo da Burger Premium, uma demonstração de hamburgueria. Regras fictícias para o cliente confirmar.",
  alternates: { canonical: "/promocoes" },
};

export default function PromocoesPage() {
  const whatsappLink = buildWhatsAppUrl(
    BUSINESS_WHATSAPP,
    "Olá! Quero usar uma promoção do Burger Premium."
  );

  return (
    <>
      <section className="page-head" aria-labelledby="page-title">
        <div className="wrap">
          <h1 id="page-title" className="page-title name-page">
            Promoções
          </h1>
          <p className="lead page-lead">Cupons de exemplo da casa, para pedidos feitos pelo WhatsApp.</p>
        </div>
      </section>
      <PhotoStrip items={stripAlt} label="Pedido para viagem, brasas, Botafogo ao entardecer e pão brioche" />
      <section className="band promos" aria-label="Cupons">
        <div className="wrap">
          <ul className="posters">
            {promotions.map((promo) => (
              <li key={promo.code} className="promo" data-reveal>
                <h2 className="promo-title">{promo.title}</h2>
                <p className="promo-code">
                  <span className="visually-hidden">Código: </span>
                  {promo.code}
                </p>
                <div className="promo-body">
                  <p className="body">{promo.description}</p>
                  <ul className="promo-rules">
                    {promo.rules.map((rule) => (
                      <li key={rule}>{rule}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
          <div className="promo-foot" data-reveal>
            <p className="lead">Combine a promoção com o seu combo favorito.</p>
            <a href={whatsappLink} className="btn">
              Pedir com cupom
            </a>
            <Link href="/cardapio" className="text-link">
              Ver o cardápio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
