import type { Metadata } from "next";
import { Suspense } from "react";
import { MenuPage } from "@/components/menu/menu-page";
import { PhotoStrip, stripDefault } from "@/components/site/photo-strip";

export const metadata: Metadata = {
  title: "Cardápio",
  description:
    "Cardápio completo da Burger Premium, uma demonstração de hamburgueria em Botafogo, com comanda e envio do pedido pelo WhatsApp.",
  alternates: { canonical: "/cardapio" },
};

export default function CardapioPage() {
  return (
    <>
      <section className="page-head" aria-labelledby="page-title">
        <div className="wrap">
          <h1 id="page-title" className="page-title name-page">
            Cardápio
          </h1>
          <p className="lead page-lead">Burgers, frango, vegetarianos, acompanhamentos e bebidas. Monte a comanda e envie pelo WhatsApp.</p>
        </div>
      </section>
      <PhotoStrip items={stripDefault} label="Hambúrguer, pão brioche, brasas e os Arcos da Lapa" />
      <section className="band menu-band" aria-label="Pedido">
        <Suspense fallback={<p className="wrap body">Carregando o cardápio.</p>}>
          <MenuPage />
        </Suspense>
      </section>
    </>
  );
}
