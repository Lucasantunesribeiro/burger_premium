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

export type Testimonial = {
  name: string;
  quote: string;
  neighborhood: string;
  rating: number;
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
    name: "Combo Clube do Fogo",
    description: "Burger 180g, cheddar cremoso, bacon e maionese da casa.",
    price: 49.9,
    items: ["Burger Clube do Fogo", "Batata rustica", "Soda artesanal"],
    tag: "Mais pedido",
  },
  {
    id: "combo-trufa",
    name: "Combo Trufa & Brie",
    description: "Blend alto, queijo brie e cogumelos na manteiga.",
    price: 54.9,
    items: ["Trufa & Brie", "Fritas canoas", "Chop gelado"],
    tag: "Premium",
  },
  {
    id: "combo-verde",
    name: "Combo Green Deluxe",
    description: "Burger veggie, pesto verde e crispy de cebola.",
    price: 46.9,
    items: ["Green Deluxe", "Batata doce", "Limonada fresh"],
    tag: "Vegetariano",
  },
];

export const ingredients: Ingredient[] = [
  { name: "Blend da casa 180g", note: "carne bovina, peito e fraldinha" },
  { name: "Pao brioche", note: "macio, tostado na manteiga" },
  { name: "Molho secreto", note: "defumado, leve toque citrico" },
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
    description: "Blend da casa, pao brioche e combinacoes autorais.",
  },
  {
    id: "frango",
    label: "Frango",
    description: "Crocrancia, molhos especiais e finalizacao na chapa.",
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
    description: "Sodas artesanais, chas gelados e shakes.",
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
    id: "crispy-jalapeno",
    name: "Crispy Jalapeno",
    description: "Queijo prato, jalapeno grelhado e cebola crispy.",
    price: 35.9,
    category: "burgers",
    ingredients: ["Blend 160g", "Queijo prato", "Jalapeno"],
  },
  {
    id: "frango-crispy",
    name: "Crocante do Chef",
    description: "Frango empanado, coleslaw e maionese de limao.",
    price: 32.9,
    category: "frango",
    ingredients: ["Frango crocante", "Coleslaw", "Maionese de limao"],
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
    description: "Burger de grao-de-bico, pesto verde e tomate assado.",
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
    name: "Batata Rustica",
    description: "Rodelas grossas com alecrim e maionese da casa.",
    price: 18.9,
    category: "acompanhamentos",
    ingredients: ["Batata rustica", "Alecrim", "Maionese"],
    isFeatured: true,
  },
  {
    id: "onion-rings",
    name: "Onion Rings",
    description: "Aneis de cebola crocantes com molho barbecue.",
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
    description: "Soda artesanal de gengibre e limao.",
    price: 12.9,
    category: "bebidas",
    ingredients: ["Gengibre", "Limao", "Agua com gas"],
  },
  {
    id: "cha-mate",
    name: "Cha Mate Gelado",
    description: "Cha mate com limao e leve adocicado.",
    price: 9.9,
    category: "bebidas",
    ingredients: ["Cha mate", "Limao", "Acucar mascavo"],
  },
  {
    id: "milkshake-baunilha",
    name: "Milkshake Baunilha",
    description: "Cremoso, com calda de caramelo salgado.",
    price: 16.9,
    category: "bebidas",
    ingredients: ["Baunilha", "Leite", "Caramelo salgado"],
    badge: "Mais vendido",
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
    id: "cheesecake-limao",
    name: "Cheesecake de Limao",
    description: "Base crocante e cobertura fresca de limao.",
    price: 17.9,
    category: "sobremesas",
    ingredients: ["Cheesecake", "Limao"],
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Marina S.",
    quote: "O defumado do Smoke BBQ e surreal. Chegou quente e perfeito.",
    neighborhood: "Copacabana",
    rating: 5,
  },
  {
    name: "Rafael L.",
    quote: "Batata rustica crocante e burger no ponto. Virou ritual de sexta.",
    neighborhood: "Botafogo",
    rating: 5,
  },
  {
    name: "Luana P.",
    quote: "O Trufa & Brie tem equilibrio perfeito. Quero provar todos.",
    neighborhood: "Ipanema",
    rating: 5,
  },
];

export const faqs: FaqItem[] = [
  {
    question: "Qual o tempo medio de entrega?",
    answer: "Em dias normais, entre 35 e 55 minutos. Finais de semana podem variar.",
  },
  {
    question: "Tem taxa de entrega?",
    answer: "Sim, varia por bairro e aparece no atendimento pelo WhatsApp.",
  },
  {
    question: "Tem retirada no balcao?",
    answer: "Sim. Informe no pedido e agilizamos o preparo para retirada.",
  },
  {
    question: "Vocês lidam com alergênicos?",
    answer: "Temos itens com lactose e gluten. Avise sobre restricoes no pedido.",
  },
];

export const promotions: Promotion[] = [
  {
    code: "SEGUNDOEMDOBRO",
    title: "Segunda em Dobro",
    description: "Comprou 1 burger, leva o segundo igual (DEMO).",
    rules: ["Valido toda segunda", "Somente burgers da linha classica"],
  },
  {
    code: "FRETEGRATIS",
    title: "Frete acima de R$ 120",
    description: "Frete gratis para pedidos acima de R$ 120 (DEMO).",
    rules: ["Ate 6 km", "Pagamento via PIX ou cartao"],
  },
  {
    code: "COMBO10",
    title: "10% em combos",
    description: "10% off em qualquer combo no cardapio (DEMO).",
    rules: ["Uso unico por cliente", "Nao cumulativo"],
  },
];
