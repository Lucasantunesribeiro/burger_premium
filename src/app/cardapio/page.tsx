import type { Metadata } from "next";
import { Suspense } from "react";
import { MenuPage } from "@/components/menu/menu-page";

export const metadata: Metadata = {
  title: "Cardapio",
  description: "Cardapio completo Burger Premium com carrinho e checkout via WhatsApp.",
};

export default function CardapioPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#11131b]" />}>
      <MenuPage />
    </Suspense>
  );
}
