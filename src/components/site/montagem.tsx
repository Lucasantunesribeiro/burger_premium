"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dados from "./montagem-layers.json";

/** Link exato pedido para os botões "Pedir no WhatsApp" deste modelo. */
export const WHATSAPP_MODELO =
  "https://wa.me/5521976790749?text=Ol%C3%A1!%20Vi%20o%20modelo%20Burger%20Premium%20e%20quero%20um%20site%20assim%20para%20a%20minha%20lanchonete.";

type Nome = keyof typeof dados.layers;

/*
 * Camadas recortadas de uma única foto gerada (mesma luz, mesmo ângulo).
 * "dy" é quanto cada camada desce, em pixels da foto, para se encaixar na de baixo.
 * "rot"/"dx" são a pose no ar. "janela" é o trecho do scroll (0 a 1) em que ela cai.
 */
const CAMADAS: { nome: Nome; alt: string; dy: number; rot: number; dx: number; janela?: [number, number] }[] = [
  { nome: "pao-baixo", alt: "Pão brioche de baixo, tostado", dy: 0, rot: 3, dx: 0 },
  { nome: "alface", alt: "Folha de alface", dy: 148, rot: -5, dx: 26, janela: [0.06, 0.17] },
  { nome: "picles", alt: "Rodelas de picles", dy: 318, rot: 7, dx: -38, janela: [0.15, 0.26] },
  { nome: "cebola", alt: "Anéis de cebola", dy: 392, rot: -8, dx: 44, janela: [0.24, 0.35] },
  { nome: "carne-2", alt: "Carne do blend da casa", dy: 586, rot: 5, dx: -30, janela: [0.33, 0.45] },
  { nome: "carne-1", alt: "Carne do blend da casa, selada na chapa", dy: 732, rot: -4, dx: 28, janela: [0.43, 0.55] },
  { nome: "queijo", alt: "Fatia de cheddar derretendo", dy: 1030, rot: 6, dx: -40, janela: [0.53, 0.64] },
  { nome: "pao-cima", alt: "Pão brioche de cima com gergelim", dy: 1158, rot: -5, dx: 30, janela: [0.7, 0.84] },
];

const [FW, FH] = dados.frame;
const BASE = dados.layers["pao-baixo"].y + dados.layers["pao-baixo"].h; // fundo do lanche, em px da foto
const INICIO = 0.18; // a pilha já começa um pouco junta, para caber grande na tela
const DERIVA = 0.42; // fração da descida feita "flutuando", antes da queda

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

type Particula = { x: number; y: number; vx: number; vy: number; r: number; rot: number; vr: number; cor: string; vida: number; tipo: 0 | 1 };

export const Montagem = () => {
  const secao = useRef<HTMLElement>(null);

  useEffect(() => {
    const raiz = secao.current;
    if (!raiz) return;
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduzido) {
      raiz.dataset.estado = "parado";
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const palco = raiz.querySelector<HTMLElement>(".mont-palco")!;
    const quadro = raiz.querySelector<HTMLElement>(".mont-quadro")!;
    const el = (n: string) => raiz.querySelector<HTMLElement>(`[data-camada="${n}"]`)!;
    const pingo = raiz.querySelector<HTMLElement>(".mont-pingo")!;
    const vapor = raiz.querySelector<HTMLCanvasElement>(".mont-vapor")!;
    const migalhas = raiz.querySelector<HTMLCanvasElement>(".mont-migalhas")!;
    raiz.dataset.estado = "vivo";

    /* ---------- enquadramento: a "câmera" se aproxima conforme a pilha baixa ---------- */
    let pxPorFoto = 1;
    let alturaUtil = 1;
    const medir = () => {
      pxPorFoto = quadro.offsetWidth / FW;
      const baseTela = palco.clientHeight - parseFloat(getComputedStyle(raiz).getPropertyValue("--respiro-base") || "40");
      alturaUtil = baseTela - parseFloat(getComputedStyle(raiz).getPropertyValue("--respiro-topo") || "80");
    };
    medir();

    const topo = el("pao-cima");
    const enquadrar = () => {
      const yTopo = dados.layers["pao-cima"].y + (Number(gsap.getProperty(topo, "yPercent")) / 100) * dados.layers["pao-cima"].h;
      const altura = (BASE - yTopo) * pxPorFoto;
      const escala = Math.min(1, alturaUtil / altura);
      gsap.set(quadro, { scale: escala });
    };

    /* ---------- linha do tempo ligada ao scroll ---------- */
    const tl = gsap.timeline({ defaults: { ease: "none" }, paused: true, onUpdate: () => quadroAtualizar() });
    let quadroAtualizar = () => {};
    tl.set({}, {}, 1); // duração total = 1, para ler as janelas como fração do scroll

    CAMADAS.forEach((c) => {
      const alvo = el(c.nome);
      const h = dados.layers[c.nome].h;
      const yp = (c.dy / h) * 100;
      gsap.set(alvo, { y: 0, yPercent: c.janela ? yp * INICIO : 0, rotation: c.rot });
      alvo.style.setProperty("--dx", `${(c.dx / dados.layers[c.nome].w) * 100}%`);
      if (!c.janela) {
        tl.to(alvo, { rotation: 0, "--amp": 0, duration: 0.2, ease: "power2.inOut" }, 0.02);
        return;
      }
      const [a, b] = c.janela;
      // flutua devagar enquanto espera a vez
      tl.to(alvo, { yPercent: yp * DERIVA, rotation: c.rot * 0.6, duration: a, ease: "sine.inOut" }, 0);
      // cai com peso: acelera e para seco
      tl.to(alvo, { yPercent: yp, rotation: 0, duration: b - a, ease: "power3.in" }, a);
      tl.to(alvo, { "--dx": "0%", "--amp": 0, duration: b - a, ease: "power2.inOut" }, a);
      // assenta: um achatamento curto, sem quicar
      tl.to(alvo, { scaleY: 0.955, scaleX: 1.018, duration: 0.018, ease: "power2.out" }, b);
      tl.to(alvo, { scaleY: 1, scaleX: 1, duration: 0.04, ease: "power2.out" }, b + 0.018);
    });

    // queijo escorre depois de pousar
    const queijo = CAMADAS.find((c) => c.nome === "queijo")!;
    gsap.set(pingo, { y: 0, yPercent: ((queijo.dy / dados.layers.queijo.h) * 100) * INICIO, rotation: queijo.rot });
    pingo.style.setProperty("--dx", `${(queijo.dx / dados.layers.queijo.w) * 100}%`);
    const [qa, qb] = queijo.janela!;
    const ypQ = (queijo.dy / dados.layers.queijo.h) * 100;
    tl.to(pingo, { yPercent: ypQ * DERIVA, rotation: queijo.rot * 0.6, duration: qa, ease: "sine.inOut" }, 0);
    tl.to(pingo, { yPercent: ypQ, rotation: 0, duration: qb - qa, ease: "power3.in" }, qa);
    tl.to(pingo, { "--dx": "0%", "--amp": 0, duration: qb - qa, ease: "power2.inOut" }, qa);
    tl.to(pingo, { "--escorre": 1.55, duration: 0.2, ease: "power1.inOut" }, qb + 0.02);

    // textos
    tl.to(raiz.querySelector(".mont-abre"), { autoAlpha: 0, y: -24, duration: 0.08 }, 0.04);
    tl.fromTo(raiz.querySelector(".mont-fim"), { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.08, ease: "power2.out" }, 0.86);
    tl.fromTo(raiz.querySelector(".mont-sombra"), { opacity: 0.25, scaleX: 0.7 }, { opacity: 1, scaleX: 1, duration: 0.84 }, 0);
    tl.fromTo(raiz.querySelector(".mont-dica"), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.04 }, 0.02);

    /* ---------- migalhas e gergelim caem a cada pouso ---------- */
    const ctxM = migalhas.getContext("2d")!;
    const ctxV = vapor.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ajustarCanvas = () => {
      for (const c of [migalhas, vapor]) {
        c.width = Math.round(c.clientWidth * dpr);
        c.height = Math.round(c.clientHeight * dpr);
      }
    };
    ajustarCanvas();

    const parts: Particula[] = [];
    const corMigalha = ["#c98a4b", "#e3b77a", "#a8672f", "#f1d3a1"];
    const soltar = (nome: Nome, qtd: number, gergelim: boolean) => {
      const r = el(nome).getBoundingClientRect();
      const p = migalhas.getBoundingClientRect();
      for (let i = 0; i < qtd; i++) {
        const lado = Math.random() < 0.5 ? -1 : 1;
        parts.push({
          x: r.left - p.left + r.width * (0.5 + lado * (0.3 + Math.random() * 0.22)),
          y: r.top - p.top + r.height * (0.45 + Math.random() * 0.4),
          vx: lado * (20 + Math.random() * 90),
          vy: -40 - Math.random() * 120,
          r: gergelim ? 2.2 + Math.random() * 1.2 : 1 + Math.random() * 2.2,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 8,
          cor: gergelim ? "#f4e2bd" : corMigalha[(Math.random() * corMigalha.length) | 0],
          vida: 0,
          tipo: gergelim ? 1 : 0,
        });
      }
      ligar();
    };

    /* ---------- vapor: sprites macios que sobem do pão ---------- */
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = 128;
    const sg = sprite.getContext("2d")!;
    const grad = sg.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, "rgba(255,246,236,0.2)");
    grad.addColorStop(0.35, "rgba(255,242,228,0.09)");
    grad.addColorStop(0.7, "rgba(255,240,225,0.025)");
    grad.addColorStop(1, "rgba(255,240,225,0)");
    sg.fillStyle = grad;
    sg.fillRect(0, 0, 128, 128);
    type Fumo = { x: number; y: number; vx: number; vy: number; s: number; vida: number; max: number; fase: number };
    const fumos: Fumo[] = [];
    let forcaVapor = 0;

    let rodando = false;
    let ultimo = 0;
    let visivel = true;
    const passo = (t: number) => {
      const dt = Math.min(0.05, (t - ultimo) / 1000 || 0.016);
      ultimo = t;
      // migalhas
      ctxM.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctxM.clearRect(0, 0, migalhas.width, migalhas.height);
      const hM = migalhas.clientHeight;
      for (let i = parts.length - 1; i >= 0; i--) {
        const q = parts[i];
        q.vy += 980 * dt;
        q.x += q.vx * dt;
        q.y += q.vy * dt;
        q.rot += q.vr * dt;
        q.vida += dt;
        if (q.y > hM + 20) {
          parts.splice(i, 1);
          continue;
        }
        ctxM.save();
        ctxM.translate(q.x, q.y);
        ctxM.rotate(q.rot);
        ctxM.fillStyle = q.cor;
        ctxM.beginPath();
        if (q.tipo === 1) ctxM.ellipse(0, 0, q.r * 1.7, q.r, 0, 0, Math.PI * 2);
        else ctxM.rect(-q.r, -q.r * 0.7, q.r * 2, q.r * 1.4);
        ctxM.fill();
        ctxM.restore();
      }
      // vapor
      const wV = vapor.clientWidth;
      const hV = vapor.clientHeight;
      ctxV.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctxV.clearRect(0, 0, wV, hV);
      if (forcaVapor > 0.01 && fumos.length < 90 && Math.random() < 0.9 * forcaVapor) {
        fumos.push({
          x: wV * (0.28 + Math.random() * 0.44),
          y: hV * (0.93 + Math.random() * 0.06),
          vx: (Math.random() - 0.5) * 0.02 * wV,
          vy: -wV * (0.07 + Math.random() * 0.07),
          s: wV * (0.06 + Math.random() * 0.05),
          vida: 0,
          max: 1.7 + Math.random() * 1.1,
          fase: Math.random() * 6.28,
        });
      }
      for (let i = fumos.length - 1; i >= 0; i--) {
        const f = fumos[i];
        f.vida += dt;
        if (f.vida > f.max) {
          fumos.splice(i, 1);
          continue;
        }
        const k = f.vida / f.max;
        f.x += (f.vx + Math.sin(f.fase + f.vida * 1.3) * 0.04 * wV * k) * dt;
        f.y += f.vy * dt;
        const s = f.s * (0.8 + k * 1.6);
        const borda = Math.min(1, Math.max(0, (f.y - s * 0.7) / (hV * 0.35)));
        const a = Math.sin(Math.PI * k) * 1.0 * forcaVapor * borda;
        ctxV.globalAlpha = a;
        ctxV.drawImage(sprite, f.x - s * 0.5, f.y - s * 0.7, s, s * 1.4);
      }
      ctxV.globalAlpha = 1;
      if (visivel && (parts.length || fumos.length || forcaVapor > 0.01)) requestAnimationFrame(passo);
      else rodando = false;
    };
    const ligar = () => {
      if (rodando || !visivel) return;
      rodando = true;
      ultimo = performance.now();
      requestAnimationFrame(passo);
    };

    /* ---------- ScrollTrigger com scrub ---------- */
    const pousos = CAMADAS.filter((c) => c.janela).map((c) => ({ nome: c.nome, em: c.janela![1], feito: false }));
    let anterior = 0;
    const st = ScrollTrigger.create({
      trigger: raiz,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.7,
      animation: tl,
    });
    quadroAtualizar = () => {
      const p = tl.progress();
      enquadrar();
      if (p > anterior) {
        for (const pouso of pousos) {
          if (!pouso.feito && p >= pouso.em) {
            pouso.feito = true;
            soltar(pouso.nome, pouso.nome === "pao-cima" ? 26 : 12, pouso.nome === "pao-cima");
          }
        }
      } else {
        for (const pouso of pousos) if (p < pouso.em - 0.02) pouso.feito = false;
      }
      anterior = p;
      forcaVapor = gsap.utils.clamp(0, 1, (p - 0.8) / 0.1);
      raiz.dataset.estado = p > 0.97 ? "pronto" : "vivo";
      if (forcaVapor > 0.01) ligar();
    };
    enquadrar();

    const io = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting;
      if (visivel) ligar();
    });
    io.observe(palco);

    // gergelim solto em queda lenta enquanto tudo flutua, para o ar não parecer parado
    const garoa = window.setInterval(() => {
      if (visivel && tl.progress() < 0.05) soltar("pao-cima", 1, true);
    }, 700);

    const aoRedimensionar = () => {
      medir();
      ajustarCanvas();
      enquadrar();
    };
    window.addEventListener("resize", aoRedimensionar);
    const imgs = Array.from(raiz.querySelectorAll("img"));
    Promise.all(imgs.map((i) => (i.complete ? Promise.resolve() : i.decode().catch(() => undefined)))).then(() => {
      medir();
      ScrollTrigger.refresh();
    });

    return () => {
      window.removeEventListener("resize", aoRedimensionar);
      window.clearInterval(garoa);
      io.disconnect();
      st.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={secao} className="mont" aria-labelledby="hero-title" data-estado="estatico">
      <div className="mont-palco">
        <div className="mont-luz" aria-hidden="true" />
        <p className="mont-tipo mont-tipo-a" aria-hidden="true">
          180g
        </p>
        <p className="mont-tipo mont-tipo-b" aria-hidden="true">
          NA CHAPA
        </p>

        <div className="mont-sombra" aria-hidden="true" />
        <canvas className="mont-migalhas" aria-hidden="true" />

        <div className="mont-quadro" style={{ aspectRatio: `${FW} / ${FH}`, transformOrigin: `50% ${pct(BASE, FH)}` }}>
          {CAMADAS.map((c, i) => {
            const d = dados.layers[c.nome];
            return (
              <div
                key={c.nome}
                className="mont-camada"
                data-camada={c.nome}
                style={
                  {
                    left: pct(d.x, FW),
                    top: pct(d.y, FH),
                    width: pct(d.w, FW),
                    zIndex: i + 1,
                    "--asm": `${(c.dy / d.h) * 100}%`,
                    "--ini": `${c.janela ? (c.dy / d.h) * 100 * INICIO : 0}%`,
                    "--rot": `${c.rot}deg`,
                    "--dx": `${(c.dx / d.w) * 100}%`,
                    "--flut": `${-(i % 4) * 0.9}s`,
                  } as React.CSSProperties
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/montagem/${c.nome}.webp`} alt={c.alt} width={d.w} height={d.h} decoding="async" fetchPriority={i > 5 ? "high" : "auto"} />
              </div>
            );
          })}
          {/* metade de baixo do cheddar, esticada quando derrete */}
          <div
            className="mont-camada mont-pingo"
            aria-hidden="true"
            style={
              {
                left: pct(dados.layers.queijo.x, FW),
                top: pct(dados.layers.queijo.y, FH),
                width: pct(dados.layers.queijo.w, FW),
                zIndex: 7,
                "--asm": `${(1030 / dados.layers.queijo.h) * 100}%`,
                "--ini": `${(1030 / dados.layers.queijo.h) * 100 * INICIO}%`,
                "--rot": "6deg",
                "--dx": `${(-40 / dados.layers.queijo.w) * 100}%`,
                "--flut": "-1.8s",
              } as React.CSSProperties
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/montagem/queijo.webp" alt="" width={dados.layers.queijo.w} height={dados.layers.queijo.h} decoding="async" />
          </div>
          <canvas className="mont-vapor" aria-hidden="true" style={{ left: "16%", width: "68%", top: pct(dados.layers["pao-cima"].y + 1158 - 700, FH), height: pct(760, FH) }} />
        </div>

        <div className="wrap mont-texto">
          <div className="mont-abre">
            <h1 id="hero-title" className="mont-h1">
              Hambúrguer artesanal na chapa, em Botafogo
            </h1>
            <p className="mont-lead">Blend de peito e fraldinha, 180 gramas, na chapa. Pão brioche tostado na manteiga.</p>
          </div>
          <div className="mont-fim">
            <p className="mont-fim-titulo">Montado. Agora é com você.</p>
            <div className="mont-acoes">
              <a className="btn-zap" href={WHATSAPP_MODELO} target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
                  <path
                    fill="currentColor"
                    d="M16.04 3C8.86 3 3.03 8.82 3.03 16c0 2.3.6 4.53 1.74 6.5L3 29l6.68-1.75A12.93 12.93 0 0 0 16.04 29C23.2 29 29 23.18 29 16S23.2 3 16.04 3Zm0 23.64c-1.95 0-3.86-.52-5.53-1.52l-.4-.24-3.96 1.04 1.06-3.86-.26-.4A10.6 10.6 0 0 1 5.4 16c0-5.87 4.77-10.64 10.64-10.64 5.86 0 10.62 4.77 10.62 10.64 0 5.87-4.76 10.64-10.62 10.64Zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.3-.1-.5-.16-.72.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.15-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66 0 1.57 1.14 3.09 1.3 3.3.16.21 2.25 3.43 5.44 4.81.76.33 1.35.52 1.81.67.76.24 1.46.2 2 .12.61-.09 1.89-.77 2.15-1.52.27-.74.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37Z"
                  />
                </svg>
                Pedir no WhatsApp
              </a>
              <a className="mont-link" href="#vitrine">
                Ver o cardápio
              </a>
            </div>
          </div>
        </div>

        <p className="mont-dica" aria-hidden="true">
          Role para montar
        </p>
      </div>
    </section>
  );
};
