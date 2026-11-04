import Image from "next/image";
import type { Foto } from "@/lib/fotos";

/** Faixa de fotos entre as seções das páginas internas. */
export const PhotoStrip = ({ items, label }: { items: Foto[]; label: string }) => (
  <section className="wrap band-sm" aria-label={label}>
    <ul className="strip" data-count={items.length}>
      {items.map((foto) => (
        <li key={foto.src}>
          <figure data-reveal>
            <div className="strip-frame">
              <Image src={foto.src} alt={foto.alt} fill sizes="(min-width: 48rem) 33vw, 100vw" className="foto-img" />
            </div>
            <figcaption className="legenda">{foto.legenda}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  </section>
);
