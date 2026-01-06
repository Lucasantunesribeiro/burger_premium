import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { promotions } from "@/lib/content";
import { BUSINESS_WHATSAPP } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const promoHeroImage =
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1400&q=80";
const promoCardImages: Record<string, string> = {
  SEGUNDOEMDOBRO:
    "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
  FRETEGRATIS:
    "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=900&q=80",
  COMBO10:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
};

export const metadata: Metadata = {
  title: "Promocoes",
  description: "Cupons e regras DEMO da Burger Premium.",
};

export default function PromocoesPage() {
  const whatsappLink = buildWhatsAppUrl(
    BUSINESS_WHATSAPP,
    "Ola! Quero usar uma promocao do Burger Premium."
  );

  return (
    <div className="mx-auto w-full max-w-[1400px] px-3 py-16 sm:px-6 lg:px-10">
      <div className="relative overflow-hidden rounded-[32px] border border-black/10 bg-[#11131b] p-8 text-white">
        <Image
          src={promoHeroImage}
          alt="Burger premium"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-diagonal opacity-15" />
        <div className="relative z-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              Promocoes
            </p>
            <h1 className="mt-3 font-display text-4xl uppercase sm:text-5xl">
              Cupons no modo rua.
            </h1>
          </div>
          <Button asChild className="gap-2 bg-[#9cff5e] text-black">
            <a href={whatsappLink}>
              <MessageCircle className="h-4 w-4" />
              Pedir com cupom
            </a>
          </Button>
        </div>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {promotions.map((promo) => (
          <Card
            key={promo.code}
            className="group overflow-hidden border-white/10 bg-[#11131b]/80"
          >
            <div className="relative h-32 overflow-hidden">
              <Image
                src={promoCardImages[promo.code] ?? promoHeroImage}
                alt={promo.title}
                width={900}
                height={600}
                sizes="(min-width: 1024px) 30vw, 90vw"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <Badge className="absolute left-3 top-3 bg-white/90 text-black">
                {promo.code}
              </Badge>
            </div>
            <CardHeader className="pb-2">
              <CardTitle>{promo.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {promo.rules.map((rule) => (
                <p key={rule}>- {rule}</p>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="relative mt-12 overflow-hidden rounded-3xl border border-black/10 bg-[#9cff5e] p-8 text-[#0b0c10]">
        <Image
          src={promoHeroImage}
          alt="Combo em destaque"
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#9cff5e] via-[#9cff5e]/85 to-transparent" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0b0c10]/70">
            Dica do dia
          </p>
          <h2 className="mt-3 font-display text-3xl uppercase">
            Combine promo com seu combo favorito.
          </h2>
        </div>
      </div>
    </div>
  );
}
