import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Burger Premium, hamburgueria artesanal em Botafogo (demonstração)";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// A imagem roda no edge, fora do CSS: os tokens da marca ficam aqui, em um só lugar.
const tokens = {
  tinta: "#050f16",
  brasa: "#ff7a1f",
  claro: "#f0f3f5",
};

export default function OpenGraphImage() {
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
          fontFamily: "Arial, sans-serif",
          fontWeight: 900,
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
            fontWeight: 400,
            textTransform: "none",
            color: tokens.claro,
          }}
        >
          Hamburgueria artesanal em Botafogo. Site de demonstração.
        </div>
      </div>
    ),
    size
  );
}
