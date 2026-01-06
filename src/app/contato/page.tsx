import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircle, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BUSINESS_ADDRESS,
  BUSINESS_CITY,
  BUSINESS_HOURS,
  BUSINESS_NAME,
  BUSINESS_WHATSAPP,
  LUCAS_WHATSAPP,
} from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const contactHeroImage =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80";
const contactCardImage =
  "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Burger Premium ou peça um site igual com Lucas.",
};

export default function ContatoPage() {
  const businessLink = buildWhatsAppUrl(
    BUSINESS_WHATSAPP,
    "Ola! Quero falar com a Burger Premium."
  );
  const lucasLink = buildWhatsAppUrl(
    LUCAS_WHATSAPP,
    "Ola Lucas! Quero um site igual ao Burger Premium."
  );

  return (
    <div className="mx-auto w-full max-w-[1400px] px-3 py-16 sm:px-6 lg:px-10">
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#11131b] p-8">
        <Image
          src={contactHeroImage}
          alt="Contato Burger Premium"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-15" />
        <div className="relative z-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              Contato
            </p>
            <h1 className="mt-3 font-display text-4xl uppercase text-white sm:text-5xl">
              Vamos conversar.
            </h1>
          </div>
          <Button asChild className="gap-2 bg-[#9cff5e] text-black">
            <a href={businessLink}>
              <MessageCircle className="h-4 w-4" />
              Chamar no WhatsApp
            </a>
          </Button>
        </div>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card className="border-white/10 bg-[#11131b]/80">
          <div className="relative h-40 overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={contactCardImage}
              alt="Burger da casa"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
          <CardHeader>
            <CardTitle>Fale com a {BUSINESS_NAME}</CardTitle>
            <CardDescription>
              Endereco, horario e canais oficiais da casa.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em]">
                Endereco
              </p>
              <p>
                {BUSINESS_ADDRESS} · {BUSINESS_CITY}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em]">Horario</p>
              <p>{BUSINESS_HOURS}</p>
            </div>
            <div className="flex items-center gap-2">
              <PhoneCall className="h-4 w-4 text-primary" />
              <a href={businessLink} className="underline-offset-4 hover:underline">
                WhatsApp comercial
              </a>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden border-black/10 bg-[#9cff5e] text-[#0b0c10]">
          <Image
            src={contactCardImage}
            alt="Portfolio Burger Premium"
            fill
            sizes="(min-width: 1024px) 30vw, 90vw"
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#9cff5e] via-[#9cff5e]/80 to-transparent" />
          <CardHeader className="relative z-10">
            <CardTitle>Quero um igual</CardTitle>
            <CardDescription>
              Projeto do portfolio. Fale direto com Lucas.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 space-y-4 text-sm text-[#0b0c10]/70">
            <Button asChild className="gap-2 bg-black text-white">
              <a href={lucasLink}>
                <MessageCircle className="h-4 w-4" />
                Falar com Lucas
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
