"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { heroStages } from "@/lib/content";
import { fotos } from "@/lib/fotos";

const stagePhotos = [fotos.hamburguer, fotos.brioche, fotos.hamburguerBatata];

/**
 * Primeira tela: o nome da casa em tamanho de fachada.
 * Com JavaScript e movimento permitido, a tela fica fixa e a rolagem troca
 * a foto e a frase em três estágios. Sem isso, mostra o estágio 1 e as
 * três frases em sequência.
 */
export const HeroStory = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      el.setAttribute("data-static", "");
      return;
    }

    el.setAttribute("data-live", "");
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      const stage = progress < 0.34 ? 1 : progress < 0.67 ? 2 : 3;
      if (el.dataset.stage !== String(stage)) {
        el.dataset.stage = String(stage);
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      el.removeAttribute("data-live");
    };
  }, []);

  return (
    <section
      ref={ref}
      className="hero-story"
      data-stage="1"
      aria-labelledby="hero-title"
    >
      <div className="hero-pin">
        <div className="wrap stage-inner">
          <div className="stage-name name-xl">
            <h1 id="hero-title" className="stage-h1">
              <span>Burger</span>
              <span>Premium</span>
            </h1>
            <div className="hero-photos">
              {stagePhotos.map((foto, index) => (
                <Image
                  key={foto.src}
                  src={foto.src}
                  alt={heroStages[index].photoAlt}
                  width={foto.width}
                  height={foto.height}
                  sizes="(min-width: 48rem) 22vw, 100vw"
                  priority={index === 0}
                  className="hero-photo"
                />
              ))}
            </div>
          </div>
          <div className="hero-copy">
            <div className="hero-lines">
              {heroStages.map((stage) => (
                <p key={stage.id} className="hero-line">
                  {stage.line}
                </p>
              ))}
            </div>
            <Link href="/cardapio" className="btn">
              Montar pedido
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
