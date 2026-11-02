export type Combo = {
  id: string;
  name: string;
  description: string;
  price: number;
  items: string[];
  tag?: string;
};

export type MenuCategoryId =
  | "burgers"
  | "frango"
  | "vegetarianos"
  | "acompanhamentos"
  | "bebidas"
  | "sobremesas";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategoryId;
  ingredients: string[];
  badge?: string;
  isFeatured?: boolean;
};

export type MenuCategory = {
  id: MenuCategoryId;
  label: string;
  description: string;
};

export type Ingredient = {
  name: string;
  note: string;
};

export type Addon = {
  name: string;
  price: number;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Promotion = {
  code: string;
  title: string;
  description: string;
  rules: string[];
};

export const combos: Combo[] = [
  {
    id: "combo-clube",
    name: "Clube do Fogo",
    description: "Burger 180g, cheddar cremoso, bacon e maionese da casa.",
    price: 49.9,
    items: ["Burger Clube do Fogo", "Batata rústica", "Soda artesanal"],
    tag: "Da casa",
  },
  {
    id: "combo-trufa",
    name: "Trufa & Brie",
    description: "Blend alto, queijo brie e cogumelos na manteiga.",
    price: 54.9,
    items: ["Trufa & Brie", "Fritas canoa", "Chope gelado"],
    tag: "Premium",
  },
  {
    id: "combo-verde",
    name: "Green Deluxe",
    description: "Burger veggie, pesto verde e crispy de cebola.",
    price: 46.9,
    items: ["Green Deluxe", "Batata doce", "Limonada fresh"],
    tag: "Vegetariano",
  },
];

export const ingredients: Ingredient[] = [
  { name: "Blend da casa 180g", note: "carne bovina, peito e fraldinha" },
  { name: "Pão brioche", note: "macio, tostado na manteiga" },
  { name: "Molho secreto", note: "defumado, leve toque cítrico" },
  { name: "Picles artesanal", note: "feito na casa toda semana" },
  { name: "Queijo cheddar", note: "cremoso, derretido na chapa" },
];

export const addons: Addon[] = [
  { name: "Bacon extra", price: 6 },
  { name: "Cheddar duplo", price: 5 },
  { name: "Ovo caipira", price: 4 },
  { name: "Cebola caramelizada", price: 4 },
  { name: "Picles premium", price: 3 },
];

export const menuCategories: MenuCategory[] = [
  {
    id: "burgers",
    label: "Burgers",
    description: "Blend da casa, pão brioche e combinações autorais.",
  },
  {
    id: "frango",
    label: "Frango",
    description: "Crocância, molhos especiais e finalização na chapa.",
  },
  {
    id: "vegetarianos",
    label: "Vegetarianos",
    description: "Vegetais grelhados e molhos frescos da casa.",
  },
  {
    id: "acompanhamentos",
    label: "Acompanhamentos",
    description: "Batatas, anéis e extras para completar o pedido.",
  },
  {
    id: "bebidas",
    label: "Bebidas",
    description: "Sodas artesanais, chás gelados e shakes.",
  },
  {
    id: "sobremesas",
    label: "Sobremesas",
    description: "Doces quentes e frios para fechar com estilo.",
  },
];

export const menuItems: MenuItem[] = [
  {
    id: "premium-house",
    name: "Premium House",
    description: "Blend 180g, cheddar cremoso, bacon crocante e maionese da casa.",
    price: 36.9,
    category: "burgers",
    ingredients: ["Blend 180g", "Cheddar", "Bacon", "Maionese da casa"],
    badge: "Assinatura",
    isFeatured: true,
  },
  {
    id: "smoke-bbq",
    name: "Smoke BBQ",
    description: "Defumado na lenha, cebola caramelizada e molho barbecue.",
    price: 39.9,
    category: "burgers",
    ingredients: ["Blend 180g", "Cheddar", "Cebola caramelizada"],
    badge: "Defumado",
    isFeatured: true,
  },
  {
    id: "trufa-brie",
    name: "Trufa & Brie",
    description: "Queijo brie, cogumelos na manteiga e toque de trufa.",
    price: 43.9,
    category: "burgers",
    ingredients: ["Blend 180g", "Brie", "Cogumelos", "Trufa"],
    badge: "Premium",
    isFeatured: true,
  },
  {
    id: "crispy-jalapeño",
    name: "Crispy Jalapeño",
    description: "Queijo prato, jalapeño grelhado e cebola crispy.",
    price: 35.9,
    category: "burgers",
    ingredients: ["Blend 160g", "Queijo prato", "Jalapeño"],
  },
  {
    id: "frango-crispy",
    name: "Crocante do Chef",
    description: "Frango empanado, coleslaw e maionese de limão.",
    price: 32.9,
    category: "frango",
    ingredients: ["Frango crocante", "Coleslaw", "Maionese de limão"],
    isFeatured: true,
  },
  {
    id: "honey-fire",
    name: "Honey Fire",
    description: "Frango grelhado, queijo coalho e mel apimentado.",
    price: 31.9,
    category: "frango",
    ingredients: ["Frango grelhado", "Queijo coalho", "Mel picante"],
  },
  {
    id: "green-deluxe",
    name: "Green Deluxe",
    description: "Burger de grão-de-bico, pesto verde e tomate assado.",
    price: 33.9,
    category: "vegetarianos",
    ingredients: ["Burger veggie", "Pesto verde", "Tomate assado"],
    badge: "Veggie",
  },
  {
    id: "veg-smash",
    name: "Veggie Smash",
    description: "Lentilha, queijo meia cura e picles artesanal.",
    price: 29.9,
    category: "vegetarianos",
    ingredients: ["Smash de lentilha", "Queijo meia cura", "Picles"],
  },
  {
    id: "batata-rustica",
    name: "Batata Rústica",
    description: "Rodelas grossas com alecrim e maionese da casa.",
    price: 18.9,
    category: "acompanhamentos",
    ingredients: ["Batata rústica", "Alecrim", "Maionese"],
    isFeatured: true,
  },
  {
    id: "onion-rings",
    name: "Onion Rings",
    description: "Anéis de cebola crocantes com molho barbecue.",
    price: 19.9,
    category: "acompanhamentos",
    ingredients: ["Cebola", "Empanado", "Barbecue"],
  },
  {
    id: "batata-doce",
    name: "Batata Doce",
    description: "Fritas sequinhas com sal de ervas.",
    price: 17.9,
    category: "acompanhamentos",
    ingredients: ["Batata doce", "Sal de ervas"],
  },
  {
    id: "soda-ginger",
    name: "Soda Ginger",
    description: "Soda artesanal de gengibre e limão.",
    price: 12.9,
    category: "bebidas",
    ingredients: ["Gengibre", "Limão", "Água com gás"],
  },
  {
    id: "cha-mate",
    name: "Chá Mate Gelado",
    description: "Chá mate com limão e leve adocicado.",
    price: 9.9,
    category: "bebidas",
    ingredients: ["Chá mate", "Limão", "Açúcar mascavo"],
  },
  {
    id: "milkshake-baunilha",
    name: "Milkshake Baunilha",
    description: "Cremoso, com calda de caramelo salgado.",
    price: 16.9,
    category: "bebidas",
    ingredients: ["Baunilha", "Leite", "Caramelo salgado"],
    isFeatured: true,
  },
  {
    id: "brownie-quente",
    name: "Brownie Quente",
    description: "Brownie de chocolate com sorvete de creme.",
    price: 18.9,
    category: "sobremesas",
    ingredients: ["Brownie", "Sorvete de creme"],
  },
  {
    id: "cheesecake-limão",
    name: "Cheesecake de Limão",
    description: "Base crocante e cobertura fresca de limão.",
    price: 17.9,
    category: "sobremesas",
    ingredients: ["Cheesecake", "Limão"],
  },
];

export const faqs: FaqItem[] = [
  {
    question: "Qual o tempo médio de entrega?",
    answer: "Em dias normais, entre 35 e 55 minutos. Finais de semana podem variar.",
  },
  {
    question: "Tem taxa de entrega?",
    answer: "Sim, varia por bairro e aparece no atendimento pelo WhatsApp.",
  },
  {
    question: "Tem retirada no balcão?",
    answer: "Sim. Informe no pedido e agilizamos o preparo para retirada.",
  },
  {
    question: "Vocês lidam com alergênicos?",
    answer: "Temos itens com lactose e glúten. Avise sobre restrições no pedido.",
  },
];

export const promotions: Promotion[] = [
  {
    code: "SEGUNDOEMDOBRO",
    title: "Segunda em Dobro",
    description: "Comprou 1 burger, leva o segundo igual (DEMO).",
    rules: ["Válido toda segunda", "Somente burgers da linha clássica"],
  },
  {
    code: "FRETEGRATIS",
    title: "Frete acima de R$ 120",
    description: "Frete grátis para pedidos acima de R$ 120 (DEMO).",
    rules: ["Até 6 km", "Pagamento via PIX ou cartão"],
  },
  {
    code: "COMBO10",
    title: "10% em combos",
    description: "10% off em qualquer combo no cardápio (DEMO).",
    rules: ["Uso único por cliente", "Não cumulativo"],
  },
];

export type HeroStage = {
  id: string;
  line: string;
  photoAlt: string;
};

export const heroStages: HeroStage[] = [
  {
    id: "brasa",
    line: "Blend de peito e fraldinha, 180 gramas, na chapa.",
    photoAlt: "Brasas acesas atrás de uma grelha com gordura",
  },
  {
    id: "pao",
    line: "Pão brioche tostado na manteiga.",
    photoAlt: "Pães brioche artesanais sobre uma bancada",
  },
  {
    id: "entrega",
    line: "Da chapa para a sua porta em 35 a 55 minutos.",
    photoAlt: "Carne assada em fogo de lenha sobre uma grelha artesanal",
  },
];

export type OrderStep = {
  title: string;
  text: string;
};

export const orderSteps: OrderStep[] = [
  {
    title: "Escolha no cardápio",
    text: "Burgers, frango, vegetarianos, acompanhamentos, bebidas e sobremesas. Toque em Adicionar.",
  },
  {
    title: "Monte a comanda",
    text: "Ajuste as quantidades e escreva observações por item, como o ponto da carne.",
  },
  {
    title: "Informe a entrega",
    text: "Bairro e endereço seguem só na mensagem, junto com o pedido.",
  },
  {
    title: "Envie pelo WhatsApp",
    text: "A mensagem sai pronta para a casa. A taxa de entrega é combinada no atendimento.",
  },
];
