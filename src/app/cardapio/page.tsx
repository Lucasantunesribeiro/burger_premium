import type { Metadata } from "next";
import { MenuPage } from "@/components/menu/menu-page";

export const metadata: Metadata = {
  title: "Cardapio",
  description: "Cardapio completo Burger Premium com carrinho e checkout via WhatsApp.",
};

export default function CardapioPage() {
  return <MenuPage />;
}
