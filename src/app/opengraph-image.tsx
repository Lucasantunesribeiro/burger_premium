import { ImageResponse } from "next/og";

export const alt = "Burger Premium, hamburgueria artesanal em Botafogo (demonstração)";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// A imagem é gerada no build, fora do CSS: os tokens da marca ficam aqui, em um só lugar.
const tokens = {
  tinta: "#050f16",
  brasa: "#ff7a1f",
  claro: "#f0f3f5",
};

const TEXTO = "BURGERPREMIUMburgerpremium Hamburgueria artesanal em Botafogo. Site de demonstração.";

// Libre Franklin, a mesma fonte do site, só com os caracteres usados aqui.
// Se o download falhar, a imagem sai com a fonte padrão em vez de quebrar o build.
const carregarFonte = async (): Promise<ArrayBuffer | null> => {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@700&text=${encodeURIComponent(TEXTO)}`
      )
    ).text();
    const url = css.match(/src: url\((.+?)\) format/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch (error) {
    console.error("Falha ao carregar a fonte da imagem social:", error);
    return null;
  }
};

export default async function OpenGraphImage() {
  const fonte = await carregarFonte();
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          height: "100%",
          width: "100%",
          padding: 64,
          background: tokens.tinta,
          color: tokens.brasa,
          fontFamily: fonte ? "Libre Franklin" : "sans-serif",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: -6,
          lineHeight: 0.9,
        }}
      >
        <div style={{ fontSize: 190, display: "flex" }}>Burger</div>
        <div style={{ fontSize: 190, display: "flex" }}>Premium</div>
        <div
          style={{
            fontSize: 30,
            display: "flex",
            marginTop: 28,
            letterSpacing: 0,
            textTransform: "none",
            color: tokens.claro,
          }}
        >
          Hamburgueria artesanal em Botafogo. Site de demonstração.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonte
        ? [{ name: "Libre Franklin", data: fonte, weight: 700, style: "normal" }]
        : undefined,
    }
  );
}
