import Image from "next/image";
import type { Foto } from "@/lib/fotos";

/** Cabeça das páginas internas: foto de ponta a ponta com o título embaixo. */
export const PageHead = ({ foto, titulo, lead, pos = "center" }: { foto: Foto; titulo: string; lead: string; pos?: string }) => (
  <section className="cabeca" aria-labelledby="page-title">
    <Image src={foto.src} alt={foto.alt} fill priority sizes="100vw" className="foto-img" style={{ objectPosition: pos }} />
    <div className="wrap cabeca-texto">
      <h1 id="page-title" className="cabeca-titulo rise">
        {titulo}
      </h1>
      <p className="hero-lead rise" style={{ "--i": 1 } as React.CSSProperties}>
        {lead}
      </p>
    </div>
  </section>
);
