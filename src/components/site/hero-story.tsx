import Image from "next/image";
import Link from "next/link";
import { fotos } from "@/lib/fotos";

const telas = [fotos.burgerMacro, fotos.burgerBandeja, fotos.grelhaFogo];

/** Primeira tela: fotos em tela cheia que se revezam, com o título embaixo à esquerda. */
export const HeroStory = () => (
  <section className="hero" aria-labelledby="hero-title">
    <div className="hero-fotos">
      {telas.map((foto, indice) => (
        <Image
          key={foto.src}
          src={foto.src}
          alt={indice === 0 ? foto.alt : ""}
          aria-hidden={indice === 0 ? undefined : true}
          fill
          priority={indice === 0}
          sizes="100vw"
          className="hero-foto"
          style={{ "--i": indice } as React.CSSProperties}
        />
      ))}
    </div>
    <div className="wrap hero-texto">
      <h1 id="hero-title" className="hero-title rise">
        Morde primeiro, fala depois
      </h1>
      <p className="hero-lead rise" style={{ "--i": 1 } as React.CSSProperties}>
        Blend de peito e fraldinha na chapa, pão brioche na manteiga e batata rústica, em Botafogo. Da chapa à sua
        porta em 35 a 55 minutos.
      </p>
      <div className="hero-acoes rise" style={{ "--i": 2 } as React.CSSProperties}>
        <Link href="/cardapio" className="btn">
          Montar meu pedido
        </Link>
        <a href="#vitrine" className="btn btn-claro">
          Ver os burgers
        </a>
      </div>
    </div>
  </section>
);
