import Image from "next/image";
import { fotos, type Foto } from "@/lib/fotos";

type PhotoStripProps = {
  items: Foto[];
  label: string;
};

export const PhotoStrip = ({ items, label }: PhotoStripProps) => (
  <ul className="strip" aria-label={label}>
    {items.map((foto) => (
      <li key={foto.src} className="strip-item" data-reveal>
        <Image
          src={foto.src}
          alt={foto.alt}
          width={foto.width}
          height={foto.height}
          sizes="(min-width: 48rem) 25vw, 50vw"
          className="strip-img"
        />
      </li>
    ))}
  </ul>
);

export const stripDefault: Foto[] = [
  fotos.hamburguer,
  fotos.brioche,
  fotos.brasas,
  fotos.arcos,
];

export const stripAlt: Foto[] = [
  fotos.hamburguerBatata,
  fotos.brasas,
  fotos.entardecer,
  fotos.brioche,
];
