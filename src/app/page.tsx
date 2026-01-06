import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  MessageCircle,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeroCarousel } from "@/components/site/hero-carousel";
import { combos, faqs, ingredients, menuItems, testimonials } from "@/lib/content";
import { BUSINESS_WHATSAPP } from "@/lib/constants";
import { formatBRL } from "@/lib/format";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const bestSellers = menuItems.filter((item) => item.isFeatured);
const heroBurger =
  "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80";
const handsBurger =
  "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=1200&q=80";
const deliveryImage =
  "https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&w=1200&q=80";
const testimonialBackdrop =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80";
const ctaImage =
  "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80";

const heroCarouselImages = [
  {
    src: "https://images.unsplash.com/photo-1674188474160-7945b1e4d4ca?auto=format&fit=crop&w=2400&q=80",
    alt: "",
  },
  {
    src: "https://images.unsplash.com/photo-1708004581741-1fe73e7fdb43?auto=format&fit=crop&w=2400&q=80",
    alt: "",
  },
  {
    src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=2400&q=80",
    alt: "",
  },
  {
    src: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=2400&q=80",
    alt: "",
  },
];

const comboImages: Record<string, string> = {
  "combo-clube":
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
  "combo-trufa":
    "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
  "combo-verde":
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
};

const bestSellerImages: Record<string, string> = {
  "premium-house":
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
  "smoke-bbq":
    "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
  "trufa-brie":
    "https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?auto=format&fit=crop&w=900&q=80",
  "frango-crispy":
    "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=900&q=80",
  "batata-rustica":
    "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=900&q=80",
  "milkshake-baunilha":
    "https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=900&q=80",
};

export default function Home() {
  const whatsappLink = buildWhatsAppUrl(
    BUSINESS_WHATSAPP,
    "Ola! Quero pedir pelo WhatsApp."
  );

  return (
    <div className="pb-24">
      <section className="relative min-h-[100vh] overflow-visible bg-[#07080b] text-white lg:min-h-[104vh]">
        <HeroCarousel
          images={heroCarouselImages}
          className="pointer-events-none z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/85" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,156,64,0.35),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(140,255,80,0.18),transparent_45%)]" />
        <div className="absolute inset-0 bg-diagonal opacity-10" />
        <div className="absolute -bottom-16 left-0 right-0 h-20 rounded-t-[48px] bg-[#0b0c10]" />
        <div className="relative z-10 mx-auto flex min-h-[90vh] w-full max-w-[900px] flex-col items-start gap-8 px-3 py-24 sm:px-6 lg:min-h-[96vh] lg:px-10 lg:py-32">
          <div className="relative z-20 w-full space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#9cff5e]">
              Street premium
            </p>
            <h1 className="font-display text-7xl uppercase leading-[0.85] sm:text-8xl lg:text-[110px]">
              Street premium.
              <span className="block text-[#9cff5e]">Carne no ponto.</span>
            </h1>
            <p className="text-lg text-white/75 sm:text-xl">
              Blend da casa + brioche + batata rustica.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-[#9cff5e] text-black hover:bg-[#b6ff86]"
              >
                <a href={whatsappLink} aria-label="Pedir agora no WhatsApp">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Pedir agora
                </a>
              </Button>
              <Button
                variant="outline"
                asChild
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                <Link href="/cardapio">
                  Ver cardapio
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="relative -mt-8 rounded-t-[48px] bg-[#0b0c10] pt-16">
        <div className="mx-auto w-full max-w-[1400px] px-3 sm:px-6 lg:px-10">
          <div className="grid gap-6 rounded-[32px] border border-white/10 bg-[#11131b]/80 p-8 md:grid-cols-[1fr_2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Street essentials
              </p>
              <h2 className="mt-3 font-display text-3xl uppercase">
                So o essencial.
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Carne. Pao. Molho.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {ingredients.slice(0, 4).map((ingredient) => (
                <div
                  key={ingredient.name}
                  className="rounded-2xl border border-white/10 bg-black/40 p-4"
                >
                  <p className="text-lg font-semibold uppercase">
                    {ingredient.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 w-full max-w-[1400px] px-3 sm:px-6 lg:px-10">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#11131b]">
            <Image
              src={handsBurger}
              alt="Burger nas maos"
              width={1200}
              height={800}
              sizes="(min-width: 1024px) 90vw, 100vw"
              className="h-[260px] w-full object-cover pulse-soft"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            <div className="absolute left-6 top-6 max-w-md text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                Ritual da casa
              </p>
              <h3 className="mt-2 font-display text-2xl uppercase">
                Chega quente. Sempre.
              </h3>
              <Button
                asChild
                className="mt-4 bg-white text-black hover:bg-white/90"
              >
                <Link href="/cardapio">Quero esse burger</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mt-16 bg-[#9cff5e] text-[#0b0c10]">
        <div className="absolute -top-12 left-0 right-0 h-12 rounded-b-[48px] bg-[#0b0c10]" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative mx-auto w-full max-w-[1400px] px-3 py-16 sm:px-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0b0c10]/70">
                Combos em destaque
              </p>
              <h2 className="mt-3 font-display text-4xl uppercase">
                Montados para noite longa.
              </h2>
            </div>
            <Button
              variant="outline"
              asChild
              className="border-black text-black hover:bg-black/10"
            >
              <Link href="/cardapio">Ver cardapio completo</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {combos.map((combo) => (
              <Card
                key={combo.id}
                className="group overflow-hidden border-black/20 bg-white/90"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={comboImages[combo.id] ?? heroBurger}
                    alt={combo.name}
                    width={900}
                    height={600}
                    sizes="(min-width: 1024px) 28vw, 80vw"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:-rotate-1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                  {combo.tag ? (
                    <Badge className="absolute left-3 top-3 bg-black text-white">
                      {combo.tag}
                    </Badge>
                  ) : null}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg uppercase text-[#1a120b]">
                    {combo.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <span className="text-xl font-semibold text-[#1a120b]">
                    {formatBRL(combo.price)}
                  </span>
                  <Button asChild size="sm" className="bg-black text-white">
                    <Link href="/cardapio?add=premium-house">Adicionar</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-[1400px] px-3 py-16 sm:px-6 lg:px-10">
        <div className="grid gap-8 rounded-[32px] border border-white/10 bg-[#11131b]/80 p-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              <Truck className="h-4 w-4 text-primary" />
              Delivery premium
            </div>
            <h2 className="font-display text-4xl uppercase">
              Chega quente. Sem escala.
            </h2>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline">iFood (placeholder)</Button>
              <Button variant="outline">Uber Eats (placeholder)</Button>
              <Button asChild className="gap-2 glow">
                <a href={whatsappLink}>
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp direto
                </a>
              </Button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40">
            <Image
              src={deliveryImage}
              alt="Entrega com cuidado"
              width={1200}
              height={900}
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="h-full w-full object-cover float-rotate"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 rounded-full bg-black/70 px-3 py-2 text-[10px] uppercase tracking-[0.3em] text-white">
              35-55 min
            </div>
            <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-2 text-[10px] uppercase tracking-[0.3em] text-black">
              Lacre premium
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-3 py-16 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Mais vendidos
            </p>
            <h2 className="mt-3 font-display text-4xl uppercase">
              Os queridinhos da rua.
            </h2>
          </div>
          <Button variant="outline" asChild>
            <Link href="/cardapio">Montar pedido</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bestSellers.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden border-white/10 bg-[#11131b]/80"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={bestSellerImages[item.id] ?? heroBurger}
                  alt={item.name}
                  width={900}
                  height={600}
                  sizes="(min-width: 1024px) 26vw, 80vw"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:-rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                <Badge className="absolute left-3 top-3 bg-white/90 text-black">
                  {item.badge ?? "Top"}
                </Badge>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg uppercase">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-lg font-semibold">{formatBRL(item.price)}</span>
                <Button asChild size="sm" className="gap-2 glow">
                  <Link href={`/cardapio?add=${item.id}`}>
                    <ShoppingCart className="h-4 w-4" />
                    Adicionar
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="relative mt-8 bg-[#11131b]">
        <div className="absolute inset-0 bg-diagonal opacity-10" />
        <div className="relative mx-auto w-full max-w-[1400px] px-3 py-16 sm:px-6 lg:px-10">
          <div className="grid gap-8 rounded-[32px] border border-white/10 bg-[#0e1018]/80 p-8 lg:grid-cols-[1fr_1.4fr]">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Depoimentos
              </p>
              <h2 className="font-display text-3xl uppercase">Voz de quem pede sempre.</h2>
            </div>
            <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
              <div className="grid gap-4">
                {testimonials.slice(0, 2).map((testimonial, index) => (
                  <Card
                    key={testimonial.name}
                    className="border-white/10 bg-black/40"
                  >
                    <CardHeader className="flex flex-row items-center gap-3">
                      <Image
                        src={`/images/testimonial-${index + 1}.svg`}
                        alt={`Cliente ${testimonial.name}`}
                        width={64}
                        height={64}
                        sizes="64px"
                        className="rounded-full"
                      />
                      <div>
                        <CardTitle className="text-base">{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.neighborhood}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="flex items-center gap-1 text-primary">
                      {Array.from({ length: testimonial.rating }).map((_, idx) => (
                        <Star key={idx} className="h-4 w-4 fill-current" />
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/40">
                <Image
                  src={testimonialBackdrop}
                  alt="Clientes curtindo o burger"
                  width={1200}
                  height={900}
                  sizes="(min-width: 1024px) 30vw, 80vw"
                  className="h-full w-full object-cover float-x"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-2 text-[10px] uppercase tracking-[0.3em] text-black">
                  Volta sempre
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mt-16 bg-[#f6c36c] text-[#1a120b]">
        <div className="absolute inset-0 bg-diagonal opacity-20" />
        <div className="relative mx-auto w-full max-w-[1400px] px-3 py-16 sm:px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1a120b]/70">
                FAQ
              </p>
              <h2 className="mt-3 font-display text-4xl uppercase">
                Tudo no modo rapido.
              </h2>
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.slice(0, 3).map((faq) => (
                <AccordionItem
                  key={faq.question}
                  value={faq.question}
                  className="rounded-2xl border border-black/10 bg-white/80 px-4"
                >
                  <AccordionTrigger className="text-left text-[#1a120b]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-[#1a120b]/70">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-3 py-16 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[32px] bg-[#8bff49] px-8 py-12 text-[#0b0c10] md:px-12">
          <Image
            src={ctaImage}
            alt="Burger pronto para pedido"
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#8bff49] via-[#8bff49]/85 to-transparent" />
          <div className="relative z-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em]">
                <BadgePercent className="h-4 w-4" />
                Pedido rapido
              </div>
              <h2 className="font-display text-4xl uppercase">
                Peca agora. A rua ta chamando.
              </h2>
            </div>
            <div className="flex flex-col justify-center gap-3">
              <Button asChild size="lg" className="gap-2 bg-black text-white">
                <a href={whatsappLink}>
                  <MessageCircle className="h-4 w-4" />
                  Pedir agora no WhatsApp
                </a>
              </Button>
              <Button asChild variant="secondary" size="lg" className="bg-white">
                <Link href="/promocoes">Ver promocoes</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
