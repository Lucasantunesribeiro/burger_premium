import Link from "next/link";
import { Clock, MapPin, PhoneCall, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BUSINESS_ADDRESS,
  BUSINESS_CITY,
  BUSINESS_NAME,
  BUSINESS_TAGLINE,
  BUSINESS_WHATSAPP,
  BUSINESS_HOURS,
  PORTFOLIO_WHATSAPP_URL,
} from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const SiteFooter = () => {
  const businessLink = buildWhatsAppUrl(
    BUSINESS_WHATSAPP,
    "Ola! Quero fazer um pedido."
  );
  const lucasLink = PORTFOLIO_WHATSAPP_URL;

  return (
    <footer className="border-t border-border/60 bg-secondary/60">
      <div className="mx-auto w-full max-w-[1400px] px-3 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="font-display text-3xl uppercase">{BUSINESS_NAME}</p>
              <p className="text-sm text-muted-foreground">{BUSINESS_TAGLINE}</p>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>
                  {BUSINESS_ADDRESS} · {BUSINESS_CITY}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>{BUSINESS_HOURS}</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-primary" />
                <a href={businessLink} className="underline-offset-4 hover:underline">
                  WhatsApp da casa
                </a>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Navegacao
            </p>
            <nav className="flex flex-col gap-3 text-sm font-medium">
              <Link href="/">Home</Link>
              <Link href="/cardapio">Cardapio</Link>
              <Link href="/promocoes">Promocoes</Link>
              <Link href="/contato">Contato</Link>
            </nav>
          </div>
          <div className="rounded-2xl border border-border/70 bg-background/80 p-6 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Portfolio
            </div>
            <p className="mt-3 text-lg font-semibold">
              Quer um igual? Fale com Lucas.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Layout premium, desempenho rapido e foco total em pedidos no WhatsApp.
            </p>
            <Button asChild className="mt-4 w-full glow">
              <a href={lucasLink}>Quero um igual</a>
            </Button>
          </div>
        </div>
        <p className="mt-10 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          DEMO Burger Premium. Marca ficticia para apresentacao.
        </p>
      </div>
    </footer>
  );
};
