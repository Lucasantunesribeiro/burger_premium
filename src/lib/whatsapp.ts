import { formatBRL } from "./format";

export type OrderLineItem = {
  name: string;
  quantity: number;
  price: number;
  notes?: string;
};

export type OrderSummary = {
  items: OrderLineItem[];
  total: number;
  bairro?: string;
  address?: string;
  notes?: string;
};

export const buildWhatsAppUrl = (phone: string, message?: string) => {
  const sanitized = phone.replace(/\D/g, "");
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${sanitized}${query}`;
};

export const buildOrderMessage = (summary: OrderSummary) => {
  const lines = [
    "Olá! Quero fazer um pedido no Burger Premium (DEMO).",
    "",
    "Itens:",
  ];

  summary.items.forEach((item) => {
    lines.push(
      `- ${item.quantity}x ${item.name} (${formatBRL(item.price)})`
    );
    if (item.notes?.trim()) {
      lines.push(`  Obs: ${item.notes.trim()}`);
    }
  });

  lines.push("", `Total: ${formatBRL(summary.total)}`);

  if (summary.bairro || summary.address) {
    lines.push("", "Entrega:");
    if (summary.bairro) {
      lines.push(`- Bairro: ${summary.bairro}`);
    }
    if (summary.address) {
      lines.push(`- Endereco: ${summary.address}`);
    }
  }

  if (summary.notes?.trim()) {
    lines.push("", `Observacoes gerais: ${summary.notes.trim()}`);
  }

  return lines.join("\n");
};
