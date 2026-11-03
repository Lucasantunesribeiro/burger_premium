"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { KeyboardEvent } from "react";
import { useSearchParams } from "next/navigation";
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

export const MenuPage = () => {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>(
    menuCategories[0]?.id ?? "burgers"
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const [bairro, setBairro] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [addedFromQuery, setAddedFromQuery] = useState(false);

  const category =
    menuCategories.find((entry) => entry.id === activeCategory) ??
    menuCategories[0];
  const categoryItems = menuItems.filter((item) => item.category === category.id);

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
  }, [searchParams, addedFromQuery, addItem]);

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
  }, [cart]);

  const total = cartLines.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalUnits = cartLines.reduce((sum, item) => sum + item.quantity, 0);

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
    window.open(checkoutLink, "_blank", "noopener,noreferrer");
  };

  const handleTabKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = menuCategories.findIndex((entry) => entry.id === activeCategory);
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % menuCategories.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + menuCategories.length) % menuCategories.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = menuCategories.length - 1;
    else return;
    event.preventDefault();
    const target = menuCategories[next];
    setActiveCategory(target.id);
    document.getElementById(`aba-${target.id}`)?.focus();
  };

  return (
    <div className="wrap menu-layout">
      <div className="menu-main">
        <div
          className="chips"
          role="tablist"
          aria-label="Categorias do cardápio"
          onKeyDown={handleTabKeys}
        >
          {menuCategories.map((entry) => {
            const selected = entry.id === category.id;
            return (
              <button
                key={entry.id}
                type="button"
                role="tab"
                id={`aba-${entry.id}`}
                aria-selected={selected}
                aria-controls="painel-cardapio"
                tabIndex={selected ? 0 : -1}
                className="chip"
                onClick={() => setActiveCategory(entry.id)}
              >
                {entry.label}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id="painel-cardapio"
          aria-labelledby={`aba-${category.id}`}
          className="menu-panel"
        >
          <p className="body category-desc">{category.description}</p>
          <ul className="items">
            {categoryItems.map((item) => (
              <li key={item.id} className="item">
                <div className="item-main">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-desc">{item.description}</p>
                  {item.badge ? (
                    <span className="item-badge">{item.badge}</span>
                  ) : null}
                </div>
                <span className="item-price">{formatBRL(item.price)}</span>
                <button
                  type="button"
                  className="btn"
                  onClick={() => addItem(item.id)}
                >
                  Adicionar
                  <span className="visually-hidden"> {item.name} ao pedido</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <section className="addons" aria-labelledby="adicionais-title">
          <h2 id="adicionais-title" className="block-title">
            Adicionais sugeridos
          </h2>
          <ul className="addon-list">
            {addons.map((addon) => (
              <li key={addon.name} className="addon">
                <span>{addon.name}</span>
                <span className="addon-price">{formatBRL(addon.price)}</span>
              </li>
            ))}
          </ul>
          <p className="body">
            Escreva o adicional na observação do item, dentro da comanda.
          </p>
        </section>
      </div>

      <aside id="comanda" className="ticket on-dark" aria-labelledby="comanda-title">
        <h2 id="comanda-title" className="block-title">
          Sua comanda
        </h2>
        <p className="visually-hidden" role="status" aria-live="polite">
          {cartEmpty
            ? "Carrinho vazio."
            : `${totalUnits} ${totalUnits === 1 ? "item" : "itens"} no carrinho. Total ${formatBRL(total)}.`}
        </p>

        {cartEmpty ? (
          <p className="ticket-empty">
            Seu carrinho está vazio. Comece escolhendo um item.
          </p>
        ) : (
          <ul className="ticket-lines">
            {cartLines.map((item) => (
              <li key={item.id} className="ticket-line">
                <div className="ticket-line-top">
                  <div>
                    <p className="ticket-name">{item.name}</p>
                    <p className="ticket-unit">{formatBRL(item.price)}</p>
                  </div>
                  <div className="qty">
                    <button
                      type="button"
                      className="qty-btn"
                      aria-label={`Diminuir ${item.name}`}
                      onClick={() => decrementItem(item.id)}
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      type="button"
                      className="qty-btn"
                      aria-label={`Aumentar ${item.name}`}
                      onClick={() => addItem(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <label className="visually-hidden" htmlFor={`obs-${item.id}`}>
                  Observações de {item.name}
                </label>
                <input
                  id={`obs-${item.id}`}
                  className="field-input"
                  value={item.notes}
                  onChange={(event) => updateNotes(item.id, event.target.value)}
                  placeholder="Observações: ponto da carne, tirar item"
                />
              </li>
            ))}
          </ul>
        )}

        <div className="ticket-fields">
          <div className="field">
            <label className="field-label" htmlFor="bairro">
              Bairro
            </label>
            <input
              id="bairro"
              className="field-input"
              value={bairro}
              onChange={(event) => setBairro(event.target.value)}
              placeholder="Ex: Botafogo"
              autoComplete="address-level3"
            />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="endereco">
              Endereço
            </label>
            <input
              id="endereco"
              className="field-input"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Rua, número, complemento"
              autoComplete="street-address"
            />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="observacoes">
              Observações gerais
            </label>
            <textarea
              id="observacoes"
              className="field-input"
              rows={3}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Se quiser, descreva alergias ou instruções extras."
            />
          </div>
        </div>

        <p className="ticket-total">
          <span>Total</span>
          <span>{formatBRL(total)}</span>
        </p>
        <button
          type="button"
          className="btn btn-block"
          disabled={cartEmpty}
          onClick={handleCheckout}
        >
          Finalizar no WhatsApp
        </button>
        <p className="ticket-note">
          {cartEmpty
            ? "Adicione itens para liberar o envio."
            : "O WhatsApp abre com o pedido pronto. Você confere e envia."}
        </p>
        <p className="ticket-note">
          Seus dados: bairro, endereço e observações vão só na mensagem do
          WhatsApp para a casa. Esta demonstração não guarda nada.
        </p>
      </aside>

      {cartEmpty ? null : (
        <a href="#comanda" className="cart-bar">
          <span>
            Ver comanda, {totalUnits} {totalUnits === 1 ? "item" : "itens"}
          </span>
          <span>{formatBRL(total)}</span>
        </a>
      )}
    </div>
  );
};
