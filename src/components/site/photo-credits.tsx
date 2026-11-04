import credits from "../../../public/fotos/credits.json";
import { autoresComida } from "@/lib/fotos";

type Credit = {
  file: string;
  title: string;
  creator: string;
  license: string;
  licenseUrl: string;
  page: string;
};

/** Só o que aparece no site: Botafogo e Arcos da Lapa. */
const USADOS = ["botafogo-beach", "brunaprado-arcos"];
const items = (credits as Credit[]).filter((credit) => USADOS.some((nome) => credit.file.includes(nome)));

export const PhotoCredits = () => (
  <details className="credits">
    <summary className="credits-summary">Créditos das fotos</summary>
    <p className="credits-text">
      Fotos de comida e salão: {autoresComida.join(", ")}, via{" "}
      <a href="https://unsplash.com" rel="noopener noreferrer" className="credits-link">
        Unsplash
      </a>
      . Imagens ilustrativas.
    </p>
    <ul className="credits-list">
      {items.map((credit) => (
        <li key={credit.page} className="credits-text">
          “{credit.title}” por {credit.creator}.{" "}
          <a href={credit.licenseUrl} rel="noopener noreferrer" className="credits-link">
            {credit.license}
          </a>
          ,{" "}
          <a href={credit.page} rel="noopener noreferrer" className="credits-link">
            Wikimedia Commons
          </a>
          .
        </li>
      ))}
    </ul>
  </details>
);
