import credits from "../../../public/fotos/credits.json";

type Credit = {
  title: string;
  creator: string;
  license: string;
  licenseUrl: string;
  page: string;
};

const items = credits as Credit[];

export const PhotoCredits = () => (
  <details className="credits">
    <summary className="credits-summary">Créditos das fotos e do vídeo</summary>
    <p className="credits-text">Fotos e vídeo de arquivo, sem relação com a casa. As duas imagens de hambúrguer foram geradas por inteligência artificial.</p>
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
