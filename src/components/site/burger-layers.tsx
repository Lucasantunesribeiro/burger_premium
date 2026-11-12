import type { ReactNode, Ref } from "react";

export type CamadaId = "bottom" | "patty" | "cheese" | "salad" | "top";

export type CamadaSpec = {
  id: CamadaId;
  label: string;
  start: number;
  end: number;
  origin: string;
};

/** Ordem da queda: pão de baixo, carne, queijo, salada, pão de cima. */
export const CAMADAS: CamadaSpec[] = [
  { id: "bottom", label: "Pão de baixo", start: 0, end: 0.3, origin: "50% 97%" },
  { id: "patty", label: "Carne", start: 0.175, end: 0.475, origin: "50% 90%" },
  { id: "cheese", label: "Queijo", start: 0.35, end: 0.65, origin: "50% 96%" },
  { id: "salad", label: "Salada", start: 0.525, end: 0.825, origin: "50% 74%" },
  { id: "top", label: "Pão de cima", start: 0.7, end: 1, origin: "50% 66%" },
];

type CamadaProps = {
  camadaRef: Ref<SVGSVGElement>;
  origin: string;
  children: ReactNode;
  id: CamadaId;
};

const Camada = ({ camadaRef, origin, children, id }: CamadaProps) => (
  <svg
    ref={camadaRef}
    data-layer={id}
    viewBox="0 0 1600 860"
    className="montagem-camada"
    style={{ transformOrigin: origin }}
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const BottomBun = ({ camadaRef, origin }: Omit<CamadaProps, "children" | "id">) => (
  <Camada id="bottom" camadaRef={camadaRef} origin={origin}>
    <path fill="#f6d7a4" d="M390 690c0-34 170-58 410-58s410 24 410 58v28c0 16-160 28-410 28s-410-12-410-28z" />
    <path
      fill="#e3a44a"
      d="M385 714c-22 62 8 118 96 146 78 26 196 36 319 36s241-10 319-36c88-28 118-84 96-146-6 32-180 52-415 52s-409-20-415-52z"
    />
    <path
      d="M450 716c100 26 220 38 350 38s250-12 350-38"
      fill="none"
      stroke="#b56d28"
      strokeWidth="20"
      strokeLinecap="round"
    />
    <path fill="#f8e6c4" d="M520 678c60-14 170-22 280-22s220 8 280 22c-70 10-170 16-280 16s-210-6-280-16z" />
  </Camada>
);

export const Patty = ({ camadaRef, origin }: Omit<CamadaProps, "children" | "id">) => (
  <Camada id="patty" camadaRef={camadaRef} origin={origin}>
    <path
      fill="#3a1d13"
      d="M400 650c-24-70 36-130 400-140s450 58 424 136c-22 70-130 112-424 118s-376-46-400-114z"
    />
    <path
      fill="#623422"
      d="M450 642c-8-48 40-90 350-98s390 36 372 90c-16 48-110 78-372 82s-342-28-350-74z"
    />
    <ellipse cx="760" cy="610" rx="110" ry="22" fill="#8d5642" opacity="0.45" />
    <g fill="#24110c">
      <rect x="560" y="590" width="22" height="110" rx="11" transform="rotate(-12 571 645)" />
      <rect x="720" y="578" width="22" height="122" rx="11" transform="rotate(-12 731 639)" />
      <rect x="880" y="586" width="22" height="110" rx="11" transform="rotate(-12 891 641)" />
      <rect x="1030" y="598" width="20" height="96" rx="10" transform="rotate(-12 1040 646)" />
    </g>
  </Camada>
);

export const Cheese = ({ camadaRef, origin }: Omit<CamadaProps, "children" | "id">) => (
  <Camada id="cheese" camadaRef={camadaRef} origin={origin}>
    <path
      fill="#f6bb24"
      d="M360 628h880l-28 78-70 8c8 36-6 78-40 108-28 24-62 8-58-28l-8-80-150 10c6 46-10 92-48 118-32 22-68 4-64-30l-6-92-160 6c4 40-14 84-50 108-30 20-64 2-60-28l-4-78-28-8z"
    />
    <path fill="#ffe7a8" d="M400 644h800l-16 36H416z" />
  </Camada>
);

export const Salad = ({ camadaRef, origin }: Omit<CamadaProps, "children" | "id">) => (
  <Camada id="salad" camadaRef={camadaRef} origin={origin}>
    <ellipse cx="280" cy="575" rx="160" ry="72" fill="#3f7a2c" transform="rotate(-18 280 575)" />
    <ellipse cx="360" cy="530" rx="120" ry="54" fill="#6fbf3c" transform="rotate(-28 360 530)" />
    <ellipse cx="230" cy="620" rx="100" ry="46" fill="#8fd24e" transform="rotate(12 230 620)" />
    <ellipse cx="1320" cy="575" rx="160" ry="72" fill="#3f7a2c" transform="rotate(18 1320 575)" />
    <ellipse cx="1240" cy="530" rx="120" ry="54" fill="#6fbf3c" transform="rotate(26 1240 530)" />
    <ellipse cx="1370" cy="625" rx="96" ry="44" fill="#8fd24e" transform="rotate(-14 1370 625)" />
    <path
      fill="#5fa338"
      d="M470 610q90-70 170 0 80-70 160 0 80-64 160 0 80-64 160 0 80-58 150 8l10 48q-160 50-320 8-150 42-310 4z"
    />
    <ellipse cx="640" cy="618" rx="124" ry="48" fill="#d63a2c" />
    <ellipse cx="640" cy="612" rx="72" ry="22" fill="#f7b8b0" />
    <ellipse cx="980" cy="626" rx="116" ry="44" fill="#c22f24" />
    <ellipse cx="984" cy="620" rx="66" ry="20" fill="#f4c4bc" />
  </Camada>
);

export const TopBun = ({ camadaRef, origin }: Omit<CamadaProps, "children" | "id">) => (
  <Camada id="top" camadaRef={camadaRef} origin={origin}>
    <path
      fill="#e6ad50"
      d="M430 470c-16-170 70-340 370-368 300 28 400 198 384 368l-2 48c0 52-150 86-382 86s-370-34-370-86z"
    />
    <path
      fill="#f7d7a4"
      d="M620 250c48-100 140-140 230-146 100 12 170 70 146 164-22 74-130 98-214 64-74-30-132-36-162-82z"
    />
    <ellipse cx="800" cy="508" rx="390" ry="58" fill="#f0c56e" />
    <ellipse cx="800" cy="534" rx="348" ry="26" fill="#c47c2c" />
    <g fill="#fff8ea">
      <ellipse cx="600" cy="210" rx="26" ry="15" transform="rotate(-18 600 210)" />
      <ellipse cx="730" cy="150" rx="24" ry="14" transform="rotate(12 730 150)" />
      <ellipse cx="880" cy="168" rx="26" ry="15" transform="rotate(-8 880 168)" />
      <ellipse cx="1020" cy="230" rx="24" ry="14" transform="rotate(20 1020 230)" />
      <ellipse cx="530" cy="300" rx="22" ry="13" transform="rotate(-26 530 300)" />
      <ellipse cx="800" cy="250" rx="24" ry="14" transform="rotate(6 800 250)" />
      <ellipse cx="660" cy="320" rx="20" ry="12" transform="rotate(-12 660 320)" />
      <ellipse cx="940" cy="310" rx="22" ry="13" transform="rotate(16 940 310)" />
      <ellipse cx="760" cy="210" rx="18" ry="11" transform="rotate(18 760 210)" />
    </g>
  </Camada>
);

const graficos = {
  bottom: BottomBun,
  patty: Patty,
  cheese: Cheese,
  salad: Salad,
  top: TopBun,
} as const;

export const CamadaGrafico = ({
  id,
  camadaRef,
  origin,
}: {
  id: CamadaId;
  camadaRef: Ref<SVGSVGElement>;
  origin: string;
}) => {
  const Grafico = graficos[id];
  return <Grafico camadaRef={camadaRef} origin={origin} />;
};
