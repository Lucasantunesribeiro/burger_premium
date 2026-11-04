import creditos from "../../public/comida/creditos.json";

export type Foto = {
  src: string;
  alt: string;
  legenda: string;
};

const comida = (id: string, alt: string, legenda: string): Foto => ({
  src: `/comida/${id}.jpg`,
  alt,
  legenda,
});

export const fotos = {
  burgerMacro: comida("burger-macro", "Hambúrguer bem de perto: carne selada, cheddar derretido, tomate e alface", "Carne selada e cheddar"),
  burgerBandeja: comida("burger-bandeja", "Hambúrguer alto ao lado de batatas fritas sobre uma tábua de madeira", "Burger e batata na tábua"),
  grelhaFogo: comida("grelha-fogo", "Hambúrgueres na grelha com chamas altas por baixo", "Na grelha, sobre o fogo"),
  maosBurger: comida("maos-burger", "Duas mãos segurando um hambúrguer alto com tomate", "Com as duas mãos"),
  camadas: comida("camadas", "Corte bem de perto mostrando pão, carne, alface, tomate, cebola, ketchup e mostarda", "Camada por camada"),
  pratoFritas: comida("prato-fritas", "Hambúrguer com batatas fritas em prato sobre papel", "Burger e fritas no prato"),
  copoFritas: comida("copo-fritas", "Copo de metal cheio de batatas fritas ao lado de um hambúrguer", "Fritas no copo de metal"),
  cestaMolho: comida("cesta-molho", "Hambúrguer na tábua com cesta de fritas e potinho de molho", "Cesta de fritas e molho"),
  fritasCesta: comida("fritas-cesta", "Batatas fritas douradas em cesta com papel xadrez vermelho", "Fritas douradas"),
  fritasPrato: comida("fritas-prato", "Prato de batatas fritas visto de cima, com potinho de ketchup", "Fritas e ketchup"),
  grelhaChamas: comida("grelha-chamas", "Grelha sobre carvão em brasa, com chamas altas no escuro", "Grelha em chamas"),
  chapaPinca: comida("chapa-pinca", "Pinça virando hambúrgueres na grelha acesa", "Virando na grelha"),
  chope: comida("chope", "Copo de chope gelado com colarinho sobre o balcão", "Chope gelado"),
  refriGelo: comida("refri-gelo", "Copo de refrigerante com muito gelo e fatia de limão", "Muito gelo e limão"),
  duasMaos: comida("duas-maos", "Mãos segurando um hambúrguer com queijo derretido escorrendo", "Queijo escorrendo"),
  neonBurger: comida("neon-burger", "Letreiro de neon vermelho com a palavra burger", "Neon aceso"),
  neonCopo: comida("neon-copo", "Letreiro de neon com o desenho de um hambúrguer e de uma taça", "Burger e bebida em neon"),
  salaoBar: comida("salao-bar", "Salão de hamburgueria com mesas compridas, teto industrial e janelas ao fundo", "Mesas compridas"),
  tresBurgers: comida("tres-burgers", "Três hambúrgueres juntos sobre papel, com rodelas de tomate", "Três de uma vez"),
  doubleBacon: comida("double-bacon", "Hambúrguer duplo com bacon crocante e cheddar sobre madeira", "Duplo com bacon"),
  doubleChapa: comida("double-chapa", "Hambúrguer duplo com cheddar e pão com gergelim sobre madeira", "Duplo com cheddar"),
  entardecer: {
    src: "/fotos/botafogo-beach-and-skyline-at-dusk-rio.jpg",
    alt: "Praia de Botafogo e os prédios da orla ao entardecer",
    legenda: "Botafogo ao entardecer",
  },
  arcos: {
    src: "/fotos/brunaprado-arcos-da-lapa-bonde-rio-de.jpg",
    alt: "Bonde passando sobre os Arcos da Lapa, no Rio de Janeiro",
    legenda: "Arcos da Lapa",
  },
} satisfies Record<string, Foto>;

/** A foto de cada item do cardápio, escolhida pelo que o item leva. */
export const fotoDoItem: Record<string, Foto> = {
  "premium-house": comida("premium-house", "Hambúrguer com bacon, cheddar derretido e maionese escorrendo", "Premium House"),
  "smoke-bbq": comida("smoke-bbq", "Hambúrguer duplo com muito cheddar e anéis de cebola", "Smoke BBQ"),
  "trufa-brie": comida("trufa-brie", "Hambúrguer coberto de cogumelos salteados sobre uma tábua de madeira", "Trufa & Brie"),
  "crispy-jalapeño": comida("crispy-jalapeno", "Hambúrguer com queijo alaranjado e fatias de pimenta sobre madeira", "Crispy Jalapeño"),
  "frango-crispy": comida("crocante-chef", "Sanduíche de frango empanado com picles e alface, com fritas ao lado", "Crocante do Chef"),
  "honey-fire": comida("honey-fire", "Sanduíche de frango com queijo derretido e alface, seguro na mão", "Honey Fire"),
  "green-deluxe": comida("green-deluxe", "Sanduíche com hambúrguer empanado, sem carne bovina, e alface, servido em papel alumínio", "Green Deluxe"),
  "veg-smash": comida("veggie-smash", "Sanduíche de vegetais em camadas, com picles, cebola roxa e queijo", "Veggie Smash"),
  "batata-rustica": comida("batata-rustica", "Assadeira cheia de batatas rústicas em gomos, bem douradas", "Batata Rústica"),
  "onion-rings": comida("onion-rings", "Anéis de cebola empanados e dourados, com potinho de molho", "Onion Rings"),
  "batata-doce": comida("batata-doce", "Palitos de batata doce assados, bem alaranjados", "Batata Doce"),
  "soda-ginger": comida("soda-ginger", "Copo de soda com gelo e casca de limão", "Soda Ginger"),
  "cha-mate": comida("cha-mate", "Copo de chá gelado com rodela de limão e limões em volta", "Chá Mate Gelado"),
  "milkshake-baunilha": comida("milkshake", "Milkshake de baunilha em taça alta com calda de caramelo", "Milkshake Baunilha"),
  "brownie-quente": comida("brownie", "Dois pedaços de brownie empilhados com bolas de sorvete de creme", "Brownie Quente"),
  "cheesecake-limão": comida("cheesecake", "Fatia de cheesecake com cobertura amarela de limão", "Cheesecake de Limão"),
};

export const fotoDoCombo: Record<string, Foto> = {
  "combo-clube": comida("combo-fogo", "Hambúrguer com fritas e copo cheio, sob luz baixa", "Clube do Fogo"),
  "combo-trufa": comida("combo-trufa", "Hambúrguer de pão escuro com queijo branco derretido", "Trufa & Brie"),
  "combo-verde": comida("combo-verde", "Hambúrguer alto cercado de vegetais e fritas", "Green Deluxe"),
};

/** Autores das fotos de comida, para o crédito do rodapé. */
export const autoresComida = [...new Set((creditos as { autor: string }[]).map((c) => c.autor))].sort((a, b) =>
  a.localeCompare(b, "pt-BR")
);
