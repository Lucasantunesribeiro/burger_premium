"use client";

import { useEffect, useRef } from "react";
import { CAMADAS, CamadaGrafico } from "./burger-layers";

const FALL_END = 0.62;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Queda com peso (acelera) e um quique curto no contato. Só transform e opacity. */
const poseFor = (t: number, drop: number, bounce: number) => {
  if (t <= 0) return { y: -drop, opacity: 0, sx: 1, sy: 1 };
  if (t >= 1) return { y: 0, opacity: 1, sx: 1, sy: 1 };

  if (t < FALL_END) {
    const u = t / FALL_END;
    const eased = u * u * Math.sqrt(u);
    return {
      y: -drop * (1 - eased),
      opacity: Math.min(1, u / 0.16),
      sx: 1,
      sy: 1,
    };
  }

  const b = (t - FALL_END) / (1 - FALL_END);
  const wave = Math.sin(b * Math.PI);
  return {
    y: bounce * wave,
    opacity: 1,
    sx: 1 + 0.1 * wave,
    sy: 1 - 0.14 * wave,
  };
};

export const BurgerAssembly = () => {
  const trackRef = useRef<HTMLElement>(null);
  const layerRefs = useRef<Array<SVGSVGElement | null>>([]);
  const labelRefs = useRef<Array<HTMLLIElement | null>>([]);
  const hintRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      track.dataset.assemblyComplete = "true";
      return;
    }

    let start = 0;
    let distance = 1000;
    let drop = 640;
    let bounce = 36;
    let frame = 0;
    let complete = false;
    let pending = 0;

    const measure = () => {
      start = track.offsetTop;
      const styles = getComputedStyle(track);
      distance = parseFloat(styles.getPropertyValue("--assembly-distance")) || 1000;
      drop = Math.round(window.innerHeight * 0.62);
      bounce = Math.max(28, Math.round(window.innerHeight * 0.042));
      track.dataset.assemblyDistance = String(Math.round(distance));
      track.dataset.assemblyStart = String(Math.round(start));
    };

    const apply = (progress: number) => {
      for (let index = 0; index < CAMADAS.length; index += 1) {
        const spec = CAMADAS[index];
        const node = layerRefs.current[index];
        if (!node) continue;
        const span = spec.end - spec.start;
        const local = clamp((progress - spec.start) / span, 0, 1);
        const pose = poseFor(local, drop, bounce);
        node.style.transform = `translate3d(0, ${pose.y.toFixed(2)}px, 0) scale(${pose.sx.toFixed(4)}, ${pose.sy.toFixed(4)})`;
        node.style.opacity = pose.opacity.toFixed(3);

        const label = labelRefs.current[index];
        if (!label) continue;
        const on = local > 0.08 ? "1" : "0";
        if (label.dataset.on !== on) label.dataset.on = on;
      }

      const hint = hintRef.current;
      if (hint) hint.style.opacity = clamp(1 - progress / 0.12, 0, 1).toFixed(3);
    };

    const onScroll = () => {
      const progress = clamp((window.scrollY - start) / distance, 0, 1);
      const done = progress >= 1;
      if (done !== complete) {
        complete = done;
        track.dataset.assemblyComplete = done ? "true" : "false";
        if (done) track.dataset.assemblyCompleteY = String(Math.round(window.scrollY));
      }
      pending = progress;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        apply(pending);
      });
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    apply(clamp((window.scrollY - start) / distance, 0, 1));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={trackRef}
      id="montagem"
      className="montagem"
      data-assembly="burger"
      data-assembly-complete="false"
      aria-labelledby="montagem-titulo"
    >
      <div className="montagem-sticky">
        <h2 id="montagem-titulo" className="visually-hidden">
          Montagem do hambúrguer
        </h2>
        <p className="montagem-kicker">Modelo / DEMO</p>
        <div className="montagem-stack">
          <svg className="montagem-prato" viewBox="0 0 1600 860" aria-hidden="true">
            <ellipse cx="800" cy="812" rx="460" ry="26" fill="#000" opacity="0.35" />
            <ellipse cx="800" cy="800" rx="360" ry="16" fill="#5a3826" />
          </svg>
          {CAMADAS.map((camada, index) => (
            <CamadaGrafico
              key={camada.id}
              id={camada.id}
              origin={camada.origin}
              camadaRef={(node) => {
                layerRefs.current[index] = node;
              }}
            />
          ))}
        </div>
        <p ref={hintRef} className="montagem-dica">
          Role para montar
        </p>
        <ol className="montagem-nomes">
          {CAMADAS.map((camada, index) => (
            <li
              key={camada.id}
              ref={(node) => {
                labelRefs.current[index] = node;
              }}
              data-on="0"
            >
              {camada.label}
            </li>
          ))}
        </ol>
        <p className="visually-hidden">
          O hambúrguer monta no scroll, nesta ordem: pão de baixo, carne, queijo, salada e pão de cima.
        </p>
      </div>
    </section>
  );
};
