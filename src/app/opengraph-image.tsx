import { ImageResponse } from "next/og";
import { BUSINESS_NAME, BUSINESS_TAGLINE } from "@/lib/constants";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #ffb347 0%, #ff5d2e 100%)",
          color: "#1a120b",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            padding: 72,
            borderRadius: 48,
            background: "rgba(11, 12, 16, 0.9)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
            maxWidth: 900,
          }}
        >
          <div style={{ fontSize: 72, textTransform: "uppercase", color: "#fef3e4" }}>
            {BUSINESS_NAME}
          </div>
          <div style={{ fontSize: 30, color: "#fef3e4" }}>{BUSINESS_TAGLINE}</div>
          <div style={{ fontSize: 24, color: "#9cff5e" }}>
            Peca pelo WhatsApp
          </div>
        </div>
      </div>
    ),
    size
  );
}
