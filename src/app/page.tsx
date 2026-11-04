import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroStory } from "@/components/site/hero-story";
import { PratoFoto } from "@/components/site/prato-card";
import { BUSINESS_HOURS } from "@/lib/constants";
import { combos, faqs, ingredients, menuItems, orderSteps } from "@/lib/content";
import { formatBRL } from "@/lib/format";
import { fotoDoCombo, fotoDoItem, fotos } from "@/lib/fotos";

export const metadata: Metadata = {
  title: "Burger Premium | Hamburgueria artesanal em Botafogo (DEMO)",
  alternates: { canonical: "/" },
};

const caminhos = [
  { href: "/cardapio", rotulo: "Ver o cardápio", foto: fotos.pratoFritas, cor: "ketchup" },
  { href: "#combos", rotulo: "Combos da casa", foto: fotos.copoFritas, cor: "carvao" },
  { href: "/promocoes", rotulo: "Promoções", foto: fotos.doubleBacon, cor: "mostarda" },
];

const daBrasa = [
  fotos.chapaPinca,
  fotoDoItem["onion-rings"],
  fotos.fritasCesta,
  fotos.duasMaos,
  fotos.chope,
  fotoDoItem["brownie-quente"],
  fotos.refriGelo,
  fotos.fritasPrato,
];

export default function HomePage() {
  const destaque = menuItems.filter((item) => item.isFeatured);

  return (
    <>
      <HeroStory />

      {/* As duas mãos e o título em arco: é aqui que a fome entra. */}
      <section className="arco" aria-labelledby="arco-title">
        <h2 id="arco-title" className="visually-hidden">
          Vai precisar de guardanapo
        </h2>
        <svg className="arco-svg" viewBox="0 0 1000 250" aria-hidden="true">
          <path id="arco-linha" d="M 40 235 Q 500 -55 960 235" fill="none" />
          <text>
            <textPath href="#arco-linha" startOffset="50%" textAnchor="middle">
              Vai precisar de guardanapo
            </textPath>
          </text>
        </svg>
        <div className="arco-foto">
          <Image src={fotos.maosBurger.src} alt={fotos.maosBurger.alt} fill sizes="(min-width: 48rem) 34rem, 80vw" className="foto-img" />
        </div>
      </section>

      <section className="wrap caminhos-box" aria-labelledby="caminhos-title">
        <div className="caminhos-head">
          <h2 id="caminhos-title" className="titulo-medio">
            Feito na chapa, em Botafogo
          </h2>
          <p className="lead">Hamburgueria artesanal no Rio de Janeiro. Blend da casa, pão brioche e batata rústica.</p>
        </div>
        <ul className="caminhos">
          {caminhos.map((caminho) => (
            <li key={caminho.rotulo} data-reveal>
              <Link href={caminho.href} className="caminho">
                <Image src={caminho.foto.src} alt={caminho.foto.alt} fill sizes="(min-width: 48rem) 33vw, 100vw" className="foto-img" />
                <span className="caminho-aba" data-cor={caminho.cor}>
                  {caminho.rotulo}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="vitrine" className="wrap band" aria-labelledby="vitrine-title">
        <header className="cabeco-secao">
          <h2 id="vitrine-title" className="titulo-grande">
            Escolha pela foto
          </h2>
          <p className="lead">Toque em Adicionar e o item já entra na sua comanda.</p>
        </header>
        <ul className="pratos">
          {destaque.map((item, indice) => (
            <li key={item.id} className="prato" data-reveal>
              <PratoFoto foto={fotoDoItem[item.id]} sizes="(min-width: 60rem) 33vw, (min-width: 36rem) 50vw, 100vw" prioridade={indice < 3} />
              <div className="prato-linha">
                <h3 className="prato-nome">{item.name}</h3>
                <span className="prato-preco">{formatBRL(item.price)}</span>
              </div>
              <p className="prato-desc">{item.description}</p>
              <Link href={`/cardapio?add=${encodeURIComponent(item.id)}`} className="btn btn-linha">
                Adicionar
                <span className="visually-hidden"> {item.name} ao pedido</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="centro">
          <Link href="/cardapio" className="btn">
            Ver o cardápio completo
          </Link>
        </div>
      </section>

      <section className="camadas" aria-labelledby="camadas-title">
        <div className="camadas-foto">
          <Image src={fotos.camadas.src} alt={fotos.camadas.alt} fill sizes="(min-width: 56rem) 55vw, 100vw" className="foto-img" />
        </div>
        <div className="camadas-texto">
          <h2 id="camadas-title" className="titulo-grande">
            Camada por camada
          </h2>
          <dl className="camadas-lista">
            {ingredients.map((item) => (
              <div key={item.name} data-reveal>
                <dt>{item.name}</dt>
                <dd>{item.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="combos" className="wrap band" aria-labelledby="combos-title">
        <header className="cabeco-secao">
          <h2 id="combos-title" className="titulo-grande">
            Combos da casa
          </h2>
          <p className="lead">Burger, acompanhamento e bebida, já pensados para irem juntos.</p>
        </header>
        <ul className="combos">
          {combos.map((combo) => (
            <li key={combo.id} className="combo" data-reveal>
              <div className="combo-foto">
                <Image src={fotoDoCombo[combo.id].src} alt={fotoDoCombo[combo.id].alt} fill sizes="(min-width: 56rem) 55vw, 100vw" className="foto-img" />
                {combo.tag ? <span className="combo-selo">{combo.tag}</span> : null}
              </div>
              <div className="combo-texto">
                <h3 className="titulo-medio">{combo.name}</h3>
                <p>{combo.description}</p>
                <p className="combo-inclui">Inclui {combo.items.join(", ")}.</p>
                <p className="combo-preco">{formatBRL(combo.price)}</p>
                <Link href="/cardapio" className="btn">
                  Quero este combo
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="brasa" aria-labelledby="brasa-title">
        <div className="wrap brasa-head">
          <h2 id="brasa-title" className="titulo-grande">
            Da brasa para a mesa
          </h2>
          <p className="lead">Grelha acesa, fritas sequinhas, bebida gelada e sobremesa quente. Arraste para ver.</p>
        </div>
        <ul className="brasa-trilho" tabIndex={0} aria-label="Fotos da comida, role para os lados">
          {daBrasa.map((foto) => (
            <li key={foto.src} className="brasa-item">
              <Image src={foto.src} alt={foto.alt} fill sizes="(min-width: 48rem) 26rem, 75vw" className="foto-img" />
            </li>
          ))}
        </ul>
        <div className="wrap hero-acoes">
          <Link href="/cardapio" className="btn btn-claro">
            Pedir agora
          </Link>
          <Link href="/promocoes" className="btn btn-escuro">
            Ver promoções
          </Link>
        </div>
      </section>

      <section className="wrap band" aria-labelledby="passos-title">
        <h2 id="passos-title" className="titulo-grande">
          Como pedir
        </h2>
        <ol className="passos">
          {orderSteps.map((passo) => (
            <li key={passo.title} data-reveal>
              <h3 className="prato-nome">{passo.title}</h3>
              <p>{passo.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="fogo" aria-labelledby="fogo-title">
        <Image src={fotos.grelhaChamas.src} alt={fotos.grelhaChamas.alt} fill sizes="100vw" className="foto-img" />
        <div className="wrap fogo-texto">
          <h2 id="fogo-title" className="titulo-grande">
            Rua das Brasas, 145
          </h2>
          <p className="lead">
            Botafogo, Rio de Janeiro. {BUSINESS_HOURS}.
          </p>
        </div>
      </section>

      <section className="wrap band local" aria-label="O bairro">
        {[fotos.entardecer, fotos.arcos, fotos.salaoBar].map((foto) => (
          <figure key={foto.src} data-reveal>
            <div className="local-foto">
              <Image src={foto.src} alt={foto.alt} fill sizes="(min-width: 48rem) 33vw, 100vw" className="foto-img" />
            </div>
            <figcaption className="legenda">{foto.legenda}</figcaption>
          </figure>
        ))}
      </section>

      <section className="wrap band-sm faq-grid" aria-labelledby="faq-title">
        <h2 id="faq-title" className="titulo-grande">
          Perguntas
        </h2>
        <div className="faq-list">
          {faqs.map((item) => (
            <details key={item.question} className="faq-item">
              <summary className="faq-q">{item.question}</summary>
              <p className="faq-a">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="neon" aria-labelledby="neon-title">
        <Image src={fotos.neonBurger.src} alt={fotos.neonBurger.alt} fill sizes="100vw" className="foto-img" />
        <div className="wrap neon-texto">
          <h2 id="neon-title" className="titulo-grande">
            Ficou com fome?
          </h2>
          <Link href="/cardapio" className="btn">
            Montar meu pedido
          </Link>
        </div>
      </section>
    </>
  );
}
