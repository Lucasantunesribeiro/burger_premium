export type Foto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  legenda: string;
};

export const fotos = {
  brasas: {
    src: "/fotos/a-greasy-barbecue-grill-with-the-glow.jpg",
    alt: "Brasas acesas atrás de uma grelha com gordura",
    width: 1920,
    height: 1282,
    legenda: "Brasas",
  },
  brioche: {
    src: "/fotos/handmade-brioche-and-breads-4592194284.jpg",
    alt: "Pães brioche artesanais sobre uma bancada",
    width: 1920,
    height: 1087,
    legenda: "Pão brioche",
  },
  asado: {
    src: "/fotos/argentine-wood-fired-asado-on-a-homemade.jpg",
    alt: "Carne assada em fogo de lenha sobre uma grelha artesanal",
    width: 1920,
    height: 2157,
    legenda: "Fogo de lenha",
  },
  entardecer: {
    src: "/fotos/botafogo-beach-and-skyline-at-dusk-rio.jpg",
    alt: "Praia de Botafogo e os prédios da orla ao entardecer",
    width: 1920,
    height: 1208,
    legenda: "Botafogo ao entardecer",
  },
  arcos: {
    src: "/fotos/brunaprado-arcos-da-lapa-bonde-rio-de.jpg",
    alt: "Bonde passando sobre os Arcos da Lapa, no Rio de Janeiro",
    width: 1920,
    height: 1280,
    legenda: "Arcos da Lapa",
  },
  hamburguer: {
    src: "/fotos/hamburguer-brioche-bacon.jpg",
    alt: "Hambúrguer de pão brioche com bacon, queijo, tomate, cebola roxa e molho, sobre papel numa bandeja",
    width: 1920,
    height: 1440,
    legenda: "Brioche, bacon e queijo",
  },
  hamburguerBatata: {
    src: "/fotos/hamburguer-batata-rustica.jpg",
    alt: "Hambúrguer com queijo, abacate, jalapeño e coentro ao lado de batatas fritas rústicas, numa bandeja",
    width: 1705,
    height: 1140,
    legenda: "Hambúrguer e batata rústica",
  },
} satisfies Record<string, Foto>;

export const videoBrasas = {
  src: "/fotos/grill-box-fire-240fps.webm",
  poster: "/fotos/grill-box-fire-240fps-poster.jpg",
  label: "Fogo numa grelha, em vídeo curto repetido",
  legenda: "Fogo",
};
