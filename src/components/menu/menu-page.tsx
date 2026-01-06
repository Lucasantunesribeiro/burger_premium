"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { MessageCircle, Minus, Plus, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addons, menuCategories, menuItems, type MenuCategoryId } from "@/lib/content";
import { BUSINESS_WHATSAPP } from "@/lib/constants";
import { formatBRL } from "@/lib/format";
import { buildOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

type CartItem = {
  id: string;
  quantity: number;
  notes: string;
};

type CartLine = CartItem & {
  name: string;
  price: number;
};

const menuHeroImage =
  "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80";
const menuSideImage =
  "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=900&q=80";
const menuDrinkImage =
  "https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=900&q=80";
const menuVegImage =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80";
const menuChickenImage =
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80";
const menuDessertImage =
  "https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=900&q=80";

const categoryImages: Record<MenuCategoryId, string> = {
  burgers: menuHeroImage,
  frango: menuChickenImage,
  vegetarianos: menuVegImage,
  acompanhamentos: menuSideImage,
  bebidas: menuDrinkImage,
  sobremesas: menuDessertImage,
};

const addonsImage =
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80";

export const MenuPage = () => {
  const searchParams = useSearchParams();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [bairro, setBairro] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [addedFromQuery, setAddedFromQuery] = useState(false);

  const itemsByCategory = menuCategories.map((category) => ({
    ...category,
    items: menuItems.filter((item) => item.category === category.id),
  }));

  const addItem = useCallback((id: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id, quantity: 1, notes: "" }];
    });
  }, []);

  const decrementItem = useCallback((id: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (!existing) return prev;
      if (existing.quantity === 1) {
        return prev.filter((item) => item.id !== id);
      }
      return prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  }, []);

  const updateNotes = useCallback((id: string, value: string) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, notes: value } : item))
    );
  }, []);

  useEffect(() => {
    const addId = searchParams.get("add");
    if (!addId || addedFromQuery) return;
    const exists = menuItems.find((item) => item.id === addId);
    if (exists) {
      addItem(addId);
      setAddedFromQuery(true);
    }
  }, [searchParams, addedFromQuery, addItem, menuItems]);

  const cartLines = useMemo(() => {
    return cart
      .map((entry) => {
        const item = menuItems.find((menuItem) => menuItem.id === entry.id);
        if (!item) return null;
        return {
          ...entry,
          name: item.name,
          price: item.price,
        } as CartLine;
      })
      .filter((line): line is CartLine => Boolean(line));
  }, [cart, menuItems]);

  const total = cartLines.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const orderMessage = cartLines.length
    ? buildOrderMessage({
        items: cartLines.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price * item.quantity,
          notes: item.notes,
        })),
        total,
        bairro,
        address,
        notes,
      })
    : "";

  const checkoutLink = orderMessage
    ? buildWhatsAppUrl(BUSINESS_WHATSAPP, orderMessage)
    : "";

  const cartEmpty = cartLines.length === 0;

  const handleCheckout = () => {
    if (!checkoutLink) return;
    window.open(checkoutLink, "_blank");
  };

  return (
    <div className="pb-20">
      <section className="relative overflow-hidden bg-[#11131b]">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 bg-diagonal opacity-10" />
        <div className="mx-auto w-full max-w-[1400px] px-3 py-12 sm:px-6 lg:px-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground reveal-up">
                Cardapio
              </p>
              <h1 className="font-display text-4xl uppercase sm:text-5xl reveal-up reveal-delay-1">
                Monte seu pedido no ritmo.
              </h1>
              <div className="inline-flex rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground pulse-soft">
                Atualizado hoje
              </div>
            </div>
            <div className="relative min-h-[320px]">
              <Image
                src="/images/hero-bun.svg"
                alt="Pao brioche"
                width={220}
                height={160}
                sizes="(min-width: 1024px) 18vw, 40vw"
                className="absolute left-2 top-0 w-[180px] burger-drop-float-delay-1"
              />
              <Image
                src="/images/hero-patty.svg"
                alt="Blend da casa"
                width={220}
                height={180}
                sizes="(min-width: 1024px) 18vw, 40vw"
                className="absolute left-0 top-24 w-[190px] burger-drop-float-delay-2"
              />
              <Image
                src={menuHeroImage}
                alt="Burger da casa"
                width={900}
                height={700}
                sizes="(min-width: 1024px) 34vw, 90vw"
                className="absolute right-0 top-0 h-[260px] w-[220px] rounded-[32px] object-cover shadow-2xl burger-drop-float glow-amber"
              />
              <Image
                src={menuSideImage}
                alt="Batata rustica"
                width={900}
                height={700}
                sizes="(min-width: 1024px) 24vw, 80vw"
                className="absolute right-36 bottom-0 h-[150px] w-[170px] rounded-[28px] object-cover shadow-xl float-rotate"
              />
              <Image
                src={menuDrinkImage}
                alt="Milkshake gelado"
                width={900}
                height={700}
                sizes="(min-width: 1024px) 20vw, 70vw"
                className="absolute right-6 bottom-6 h-[150px] w-[120px] rounded-[24px] object-cover shadow-lg drift"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-[1400px] px-3 sm:px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[2.2fr_1fr]">
          <div className="space-y-6">
            <Tabs defaultValue={menuCategories[0]?.id ?? "burgers"}>
              <TabsList className="flex h-auto flex-wrap gap-2 bg-transparent p-0">
                {itemsByCategory.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="rounded-full border border-border/70 bg-background/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {itemsByCategory.map((category) => (
                <TabsContent key={category.id} value={category.id} className="mt-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    {category.items.map((item) => (
                      <Card
                        key={item.id}
                        className="group border-border/70 bg-background/80"
                      >
                        <CardHeader className="space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <CardTitle className="text-base">{item.name}</CardTitle>
                              <CardDescription className="text-xs text-muted-foreground">
                                {item.description}
                              </CardDescription>
                            </div>
                            <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-border/70">
                              <Image
                                src={categoryImages[item.category]}
                                alt={item.name}
                                fill
                                sizes="64px"
                                className="object-cover transition duration-500 group-hover:scale-110"
                              />
                            </div>
                          </div>
                          {item.badge ? (
                            <Badge variant="secondary">{item.badge}</Badge>
                          ) : null}
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                          <span className="text-base font-semibold">
                            {formatBRL(item.price)}
                          </span>
                          <Button
                            size="sm"
                            className="glow"
                            onClick={() => addItem(item.id)}
                          >
                            Adicionar
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
            <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-6">
              <Image
                src={addonsImage}
                alt="Add-ons da casa"
                width={900}
                height={600}
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="absolute inset-0 h-full w-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/80 to-transparent" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Add-ons sugeridos
                </p>
                <div className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                  {addons.map((addon) => (
                    <div key={addon.name} className="flex items-center justify-between">
                      <span>{addon.name}</span>
                      <span className="font-semibold text-foreground">
                        {formatBRL(addon.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <aside className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              <h2 className="font-display text-2xl uppercase">Seu carrinho</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Ajuste quantidades e adicione observacoes antes de finalizar.
            </p>
            <div className="mt-6 space-y-4">
              {cartEmpty ? (
                <p className="rounded-2xl border border-dashed border-border/70 bg-background/40 p-4 text-sm text-muted-foreground">
                  Seu carrinho esta vazio. Comece escolhendo um item.
                </p>
              ) : (
                cartLines.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-border/70 bg-background/60 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatBRL(item.price)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          aria-label={`Diminuir ${item.name}`}
                          onClick={() => decrementItem(item.id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          aria-label={`Aumentar ${item.name}`}
                          onClick={() => addItem(item.id)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Input
                      value={item.notes}
                      onChange={(event) => updateNotes(item.id, event.target.value)}
                      placeholder="Observacoes: ponto da carne, tirar item"
                      className="mt-3 bg-background/60"
                    />
                  </div>
                ))
              )}
            </div>
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <label
                  className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground"
                  htmlFor="bairro"
                >
                  Bairro
                </label>
                <Input
                  id="bairro"
                  value={bairro}
                  onChange={(event) => setBairro(event.target.value)}
                  placeholder="Ex: Botafogo"
                  className="bg-background/60"
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground"
                  htmlFor="endereco"
                >
                  Endereco
                </label>
                <Input
                  id="endereco"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder="Rua, numero, complemento"
                  className="bg-background/60"
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground"
                  htmlFor="observacoes"
                >
                  Observacoes gerais
                </label>
                <Textarea
                  id="observacoes"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Se quiser, descreva alergias ou instrucoes extras."
                  className="bg-background/60"
                />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="text-lg font-semibold">{formatBRL(total)}</span>
            </div>
            <Button
              size="lg"
              className="mt-4 w-full gap-2 glow"
              disabled={cartEmpty}
              onClick={handleCheckout}
            >
              <MessageCircle className="h-4 w-4" />
              Finalizar no WhatsApp
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              {cartEmpty
                ? "Adicione itens para liberar o checkout."
                : "Voce sera redirecionado para o WhatsApp com o pedido pronto."}
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
};
