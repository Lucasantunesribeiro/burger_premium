import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroStory } from "@/components/site/hero-story";
import { LoopVideo } from "@/components/site/loop-video";
import { StepsAccordion } from "@/components/site/steps-accordion";
import { BUSINESS_ADDRESS, BUSINESS_HOURS } from "@/lib/constants";
import {
  combos,
  faqs,
  ingredients,
  orderSteps,
} from "@/lib/content";
import { formatBRL } from "@/lib/format";
import { fotos, videoBrasas } from "@/lib/fotos";

export const metadata: Metadata = {
  title: "Burger Premium | Hamburgueria artesanal em Botafogo (DEMO)",
  alternates: { canonical: "/" },
};

const panels = [
  { foto: fotos.entardecer },
  { foto: fotos.regatas },
  { foto: null },
  { foto: fotos.arcos },
] as const;

export default function HomePage() {
  const [street, district] = BUSINESS_ADDRESS.split(" - ");

  return (
    <>
      <HeroStory />

      <section className="band intro" aria-labelledby="intro-title">
        <div className="wrap intro-grid">
          <div className="intro-head" data-reveal>
            <h2 id="intro-title" className="section-title">
              Feito em Botafogo.
            </h2>
            <p className="lead">
              Hamburgueria artesanal no Rio de Janeiro. Blend da casa, pão
              brioche e batata rústica.
            </p>
          </div>
          <dl className="notes">
            {ingredients.map((item) => (
              <div key={item.name} className="note" data-reveal>
                <dt className="note-name">{item.name}</dt>
                <dd className="note-text">{item.note}</dd>
              </div>
            ))}
          </dl>
          <div className="intro-foot" data-reveal>
            <p className="body">Horário: {BUSINESS_HOURS}.</p>
            <Link href="/cardapio" className="text-link">
              Ver o cardápio completo
            </Link>
          </div>
        </div>
      </section>

      <section className="band showcase on-dark" aria-labelledby="showcase-title">
        <div className="wrap">
          <div className="showcase-head" data-reveal>
            <h2 id="showcase-title" className="section-title">
              {street}, {district}
            </h2>
            <p className="body">
              Fotos de arquivo do bairro e do fogo. Os créditos estão no
              rodapé.
            </p>
          </div>
          <ul className="panels">
            {panels.map((panel, index) => (
              <li
                key={panel.foto?.src ?? "video"}
                className="panel"
                data-reveal
              >
                {panel.foto ? (
                  <Image
                    src={panel.foto.src}
                    alt={panel.foto.alt}
                    width={panel.foto.width}
                    height={panel.foto.height}
                    sizes="(min-width: 48rem) 45vw, 50vw"
                    className="panel-img"
                    priority={index === 0}
                  />
                ) : (
                  <LoopVideo
                    src={videoBrasas.src}
                    poster={videoBrasas.poster}
                    label={videoBrasas.label}
                  />
                )}
                <span className="panel-caption">
                  {panel.foto ? panel.foto.legenda : videoBrasas.legenda}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band combos" aria-labelledby="combos-title">
        <div className="wrap">
          <h2 id="combos-title" className="section-title" data-reveal>
            Combos da casa
          </h2>
          <ul className="posters">
            {combos.map((combo) => (
              <li key={combo.id} data-reveal>
                <Link href="/cardapio" className="poster">
                  <span className="poster-name">{combo.name}</span>
                  <span className="poster-price">{formatBRL(combo.price)}</span>
                  <span className="poster-info">
                    {combo.description} Inclui {combo.items.join(", ")}.
                    {combo.tag ? ` ${combo.tag}.` : ""}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band steps-band field" aria-labelledby="steps-title">
        <div className="wrap">
          <h2 id="steps-title" className="section-title" data-reveal>
            Como pedir
          </h2>
          <div data-reveal>
            <StepsAccordion steps={orderSteps} />
          </div>
        </div>
      </section>

      <section className="band faq" aria-labelledby="faq-title">
        <div className="wrap faq-grid">
          <h2 id="faq-title" className="section-title" data-reveal>
            Perguntas
          </h2>
          <div className="faq-list">
            {faqs.map((item) => (
              <details key={item.question} className="faq-item" data-reveal>
                <summary className="faq-q">{item.question}</summary>
                <p className="faq-a">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band" aria-labelledby="cta-title">
        <Link href="/cardapio" className="cta-link">
          <div className="wrap cta-inner">
            <h2 id="cta-title" className="cta-word name-cta">
              Pedir
            </h2>
            <p className="cta-text">Monte o pedido e envie pelo WhatsApp.</p>
          </div>
        </Link>
      </section>
    </>
  );
}
