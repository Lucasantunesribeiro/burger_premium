# Burger Premium (DEMO)

Site DEMO em pt-BR para hamburgueria premium, focado em conversao via WhatsApp.

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS + shadcn/ui
- lucide-react

## Rodar local
```bash
npm install
npm run dev
```

## Conteudo editavel
- `src/lib/constants.ts`: WhatsApp, identidade e dados base
- `src/lib/content.ts`: combos, ingredientes, addons, depoimentos, FAQ, promocoes
- `src/lib/whatsapp.ts`: helper `wa.me` e mensagem do pedido
- `public/images`: artes locais usadas no hero e depoimentos

## Rotas
- `/` Home
- `/cardapio`
- `/promocoes`
- `/contato`

## Checklist de entrega
- [x] Home com hero, combos, delivery, mais vendidos, depoimentos, FAQ e CTA final
- [x] Cardapio com carrinho, observacoes e checkout via WhatsApp
- [x] Promocoes DEMO com cupons e regras simples
- [x] Contato com CTA "Quero um igual" (WhatsApp Lucas)
- [x] Metadata, Open Graph, JSON-LD, sitemap e robots
- [x] `next/image` com imagens locais sem CLS
- [x] README com instrucoes e fontes de conteudo
