"use client";

import { useEffect, useRef } from "react";

type LayerSpec = {
  id: string;
  src: string;
  label: string;
  start: number;
  end: number;
  bottom: string;
  width: string;
  z: number;
  widthPx: number;
  heightPx: number;
};

const LAYERS: LayerSpec[] = [
  {
    id: "bottom",
    src: "/images/hero-bun-bottom.svg",
    label: "Pão de baixo",
    start: 0,
    end: 0.3,
    bottom: "0%",
    width: "100%",
    z: 1,
    widthPx: 640,
    heightPx: 200,
  },
  {
    id: "patty",
    src: "/images/hero-patty.svg",
    label: "Carne",
    start: 0.175,
    end: 0.475,
    bottom: "20%",
    width: "90%",
    z: 2,
    widthPx: 640,
    heightPx: 170,
  },
  {
    id: "cheese",
    src: "/images/hero-cheddar.svg",
    label: "Queijo",
    start: 0.35,
    end: 0.65,
    bottom: "34%",
    width: "98%",
    z: 3,
    widthPx: 640,
    heightPx: 180,
  },
  {
    id: "lettuce",
    src: "/images/hero-lettuce.svg",
    label: "Salada",
    start: 0.525,
    end: 0.825,
    bottom: "48%",
    width: "112%",
    z: 4,
    widthPx: 640,
    heightPx: 160,
  },
  {
    id: "top",
    src: "/images/hero-bun-top.svg",
    label: "Pão de cima",
    start: 0.7,
    end: 1,
    bottom: "56%",
    width: "104%",
    z: 5,
    widthPx: 640,
    heightPx: 260,
  },
];

const FALL_END = 0.62;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

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
    sx: 1 + 0.11 * wave,
    sy: 1 - 0.16 * wave,
  };
};

export const BurgerAssembly = () => {
  const trackRef = useRef<HTMLElement>(null);
  const layerRefs = useRef<Array<HTMLImageElement | null>>([]);
  const labelRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const hintRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
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

    const measure = () => {
      start = track.offsetTop;
      const styles = getComputedStyle(track);
      distance =
        parseFloat(styles.getPropertyValue("--assembly-distance")) || 1000;
      drop = Math.round(window.innerHeight * 0.62);
      bounce = Math.max(34, Math.round(window.innerHeight * 0.05));
      track.dataset.assemblyDistance = String(Math.round(distance));
      track.dataset.assemblyStart = String(Math.round(start));
    };

    const apply = (progress: number) => {
      const layers = layerRefs.current;
      const labels = labelRefs.current;
      for (let index = 0; index < LAYERS.length; index += 1) {
        const spec = LAYERS[index];
        const node = layers[index];
        if (!node) continue;
        const span = spec.end - spec.start;
        const local = clamp((progress - spec.start) / span, 0, 1);
        const pose = poseFor(local, drop, bounce);
        node.style.transform = `translate3d(0, ${pose.y.toFixed(2)}px, 0) scale(${pose.sx.toFixed(4)}, ${pose.sy.toFixed(4)})`;
        node.style.opacity = pose.opacity.toFixed(3);

        const label = labels[index];
        if (!label) continue;
        const on = local > 0.08;
        const next = on ? "1" : "0";
        if (label.dataset.on !== next) {
          label.dataset.on = next;
          label.style.opacity = on ? "1" : "0.38";
          label.style.color = on ? "#d7ff9a" : "rgba(255,255,255,0.72)";
        }
      }

      const hint = hintRef.current;
      if (hint) hint.style.opacity = String(clamp(1 - progress / 0.12, 0, 1));

      const done = progress >= 1;
      if (done !== complete) {
        complete = done;
        track.dataset.assemblyComplete = done ? "true" : "false";
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const progress = clamp((window.scrollY - start) / distance, 0, 1);
        apply(progress);
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
      data-assembly="burger"
      data-assembly-complete="false"
      className="assembly-track relative bg-[#07080b] text-white"
      aria-label="Montagem do hambúrguer no scroll"
    >
      <div className="assembly-sticky flex h-[100vh] flex-col items-center px-4 pt-28 pb-6 sm:pt-32">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,176,74,0.16),transparent_58%)]"
          aria-hidden="true"
        />
        <h1 className="sr-only">
          Burger Premium, modelo demo. O hambúrguer monta no scroll: pão de baixo,
          carne, queijo, salada e pão de cima.
        </h1>
        <div className="burger-stack">
            <div
              className="pointer-events-none absolute bottom-[1%] left-1/2 h-8 w-[68%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse,rgba(0,0,0,0.55),transparent_70%)]"
              aria-hidden="true"
            />
            {LAYERS.map((layer, index) => (
              <div
                key={layer.id}
                className="layer-slot"
                style={{
                  bottom: layer.bottom,
                  width: layer.width,
                  zIndex: layer.z,
                }}
              >
                {/* Native img: these SVGs stay on the compositor via transform/opacity. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={(node) => {
                    layerRefs.current[index] = node;
                  }}
                  src={layer.src}
                  alt=""
                  width={layer.widthPx}
                  height={layer.heightPx}
                  draggable={false}
                  decoding="async"
                  fetchPriority="high"
                  data-layer={layer.id}
                  className="assembly-layer"
                />
              </div>
            ))}
          </div>
        <div className="relative z-20 mt-auto flex flex-col items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9cff5e]">
            Modelo / DEMO
          </p>
          <p ref={hintRef} className="assembly-hint text-sm text-white/70">
            Role para montar
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.18em] sm:text-sm">
            {LAYERS.map((layer, index) => (
              <span
                key={layer.id}
                ref={(node) => {
                  labelRefs.current[index] = node;
                }}
                data-on="0"
                style={{ color: "rgba(255,255,255,0.72)", opacity: 0.38 }}
              >
                {layer.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
