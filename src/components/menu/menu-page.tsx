"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PratoFoto } from "@/components/site/prato-card";
import { addons, menuCategories, menuItems } from "@/lib/content";
import { fotoDoItem } from "@/lib/fotos";
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
  const [cart, setCart] = useState<CartItem[]>([]);
  const [bairro, setBairro] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [addedFromQuery, setAddedFromQuery] = useState(false);

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

  return (
    <div className="wrap menu-layout">
      <div className="menu-main">
        <nav className="chips" aria-label="Categorias do cardápio">
          {menuCategories.map((entry) => (
            <a key={entry.id} className="chip" href={`#${entry.id}`}>
              {entry.label}
            </a>
          ))}
        </nav>

        {menuCategories.map((entry) => (
          <section key={entry.id} id={entry.id} className="menu-cat" aria-labelledby={`titulo-${entry.id}`}>
            <h2 id={`titulo-${entry.id}`} className="titulo-medio">
              {entry.label}
            </h2>
            <p className="body">{entry.description}</p>
            <ul className="pratos pratos-menu">
              {menuItems
                .filter((item) => item.category === entry.id)
                .map((item) => {
                  const noPedido = cart.find((line) => line.id === item.id)?.quantity ?? 0;
                  return (
                    <li key={item.id} className="prato">
                      <PratoFoto foto={fotoDoItem[item.id]} sizes="(min-width: 75rem) 22vw, (min-width: 36rem) 45vw, 100vw" />
                      <div className="prato-linha">
                        <h3 className="prato-nome">{item.name}</h3>
                        <span className="prato-preco">{formatBRL(item.price)}</span>
                      </div>
                      <p className="prato-desc">{item.description}</p>
                      {item.badge ? <span className="item-badge">{item.badge}</span> : null}
                      <button type="button" className="btn btn-linha" onClick={() => addItem(item.id)}>
                        {noPedido > 0 ? `Adicionar mais (${noPedido} no pedido)` : "Adicionar"}
                        <span className="visually-hidden"> {item.name} ao pedido</span>
                      </button>
                    </li>
                  );
                })}
            </ul>
          </section>
        ))}

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

      <aside id="comanda" className="ticket" aria-labelledby="comanda-title">
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
