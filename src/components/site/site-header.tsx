import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS_NAME, BUSINESS_WHATSAPP } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const SiteHeader = () => {
  const whatsappLink = buildWhatsAppUrl(
    BUSINESS_WHATSAPP,
    "Ola! Quero fazer um pedido."
  );

  return (
    <div className="sticky top-0 z-40">
      <div className="h-6 bg-background/70 backdrop-blur" aria-hidden="true" />
      <header className="border-b border-border/60 bg-background/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-3 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span
              className="h-3 w-3 rounded-full bg-primary glow"
              aria-hidden="true"
            />
            <Link
              href="/"
              className="font-display text-4xl uppercase tracking-wide sm:text-5xl"
            >
              {BUSINESS_NAME}
            </Link>
            <span className="rounded-full border border-border/80 bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Demo
            </span>
          </div>
          <nav
            className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground md:flex lg:text-base"
            aria-label="Primaria"
          >
            <Link href="/" className="transition hover:text-primary">
              Home
            </Link>
            <Link href="/cardapio" className="transition hover:text-primary">
              Cardapio
            </Link>
            <Link href="/promocoes" className="transition hover:text-primary">
              Promocoes
            </Link>
            <Link href="/contato" className="transition hover:text-primary">
              Contato
            </Link>
          </nav>
          <Button asChild size="lg" className="gap-2 glow">
            <a href={whatsappLink} aria-label="Pedir no WhatsApp">
              <MessageCircle className="h-4 w-4" />
              Pedir agora
            </a>
          </Button>
        </div>
      </header>
    </div>
  );
};
