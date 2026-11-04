import Image from "next/image";
import type { Foto } from "@/lib/fotos";

/** A foto de um prato em moldura com o alto arredondado, como a cúpula de um pão. */
export const PratoFoto = ({ foto, sizes, prioridade = false }: { foto: Foto; sizes: string; prioridade?: boolean }) => (
  <div className="prato-foto">
    <Image src={foto.src} alt={foto.alt} fill sizes={sizes} priority={prioridade} className="foto-img" />
  </div>
);
