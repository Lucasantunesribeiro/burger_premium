# Burger Premium (demonstração)

Site de demonstração em português do Brasil para uma hamburgueria artesanal em Botafogo, Rio de Janeiro. É um modelo de portfólio: a marca é fictícia, sem relação com um estabelecimento real, e as páginas levam `noindex, nofollow`.

A ideia do site: o nome da casa vira a fachada. O nome gigante em preto sobre a cor da brasa, o cardápio em cartazes de uma linha por prato e um carrinho que monta a comanda e a envia pelo WhatsApp.

## Stack

- Next.js 16 (App Router) e TypeScript
- Tailwind CSS 4 (tokens e componentes em `src/app/globals.css`)
- Fontes `next/font/google`: Libre Franklin (títulos) e Source Serif 4 (texto)
- Radix UI (acordeão) e lucide-react

## Rodar local

```bash
npm install
npm run dev
```

Build de produção: `npm run build` e `npm start`.

## Onde editar

- `src/lib/constants.ts`: nome, WhatsApp, endereço, horário e `SITE_URL` (endereço público, usado em canonical e robots)
- `src/lib/content.ts`: combos, ingredientes, cardápio, perguntas e promoções
- `src/lib/fotos.ts`: fotos, textos alternativos e legendas
- `src/lib/whatsapp.ts`: link `wa.me` e texto do pedido
- `public/fotos/credits.json`: créditos de cada foto, exibidos no rodapé
- `public/fotos/hamburguer-brasa-gerado.jpg` e `entrega-hamburguer-gerado.jpg`: imagens geradas por inteligência artificial (sem crédito de terceiros); as demais fotos têm licença livre listada em `credits.json`

## Dados de exemplo (confirmar antes de usar com um cliente real)

Endereço, horário, preços, promoções, cupons, prazo de entrega e o número de WhatsApp da casa (`BUSINESS_WHATSAPP`, hoje um valor de preenchimento) são exemplos. O botão "Fale com o Lucas" usa o contato real do autor.

## Rotas

- `/` início
- `/cardapio` cardápio com carrinho e envio pelo WhatsApp (nada é guardado)
- `/promocoes`
- `/contato`

## Checklist de entrega

- [x] Início com abertura, apresentação da casa, faixa de fotos, combos, passo a passo do pedido, perguntas frequentes e chamada final para o cardápio
- [x] Cardápio com carrinho, observações e envio do pedido pelo WhatsApp
- [x] Promoções de demonstração, com cupons e regras simples
- [x] Contato com endereço, horário e o bloco "Quero um igual" (WhatsApp do Lucas)
- [x] Metadados, Open Graph, JSON-LD do tipo `Restaurant`, `robots` e canonical em `SITE_URL`
- [x] Todas as páginas com `noindex, nofollow` e o selo "Modelo" no rodapé, por ser demonstração
- [x] `next/image` para as fotos locais
- [x] README com instruções e fontes de conteúdo
- [ ] Depoimentos: não há. Saíram de propósito, porque a marca é fictícia e depoimento inventado não cabe num modelo
- [ ] Sitemap: `/sitemap.xml` existe, mas devolve uma lista vazia enquanto o site for demonstração. Ele não lista páginas, para não apontar para página que pede para não ser indexada
