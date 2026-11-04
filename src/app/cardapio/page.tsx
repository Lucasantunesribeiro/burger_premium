import type { Metadata } from "next";
import { Suspense } from "react";
import { MenuPage } from "@/components/menu/menu-page";
import { PageHead } from "@/components/site/page-head";
import { fotos } from "@/lib/fotos";

export const metadata: Metadata = {
  title: "Cardápio",
  description:
    "Cardápio completo da Burger Premium, uma demonstração de hamburgueria em Botafogo, com comanda e envio do pedido pelo WhatsApp.",
  alternates: { canonical: "/cardapio" },
};

export default function CardapioPage() {
  return (
    <>
      <PageHead foto={fotos.burgerBandeja} titulo="Cardápio" lead="Burgers, frango, vegetarianos, acompanhamentos, bebidas e sobremesas. Monte a comanda e envie pelo WhatsApp." />
      <section className="menu-band" aria-label="Pedido">
        <Suspense fallback={<p className="wrap body">Carregando o cardápio.</p>}>
          <MenuPage />
        </Suspense>
      </section>
    </>
  );
}
