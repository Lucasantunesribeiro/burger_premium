import { useId } from "react";
import { BURGER_PREENCHE, BURGER_TRACOS, FAIXA, FRESTA, LOGO_H, LOGO_W, PREMIUM } from "./logo-paths";

/*
 * Logo do Burger Premium, desenhada em traço (sem fonte): BURGER condensada e pesada,
 * fatiada por uma fresta na altura da carne, e PREMIUM vazado numa faixa vermelha.
 * Cores por variável CSS: --logo-tinta (letras) e --logo-faixa (faixa).
 * O desenho vem de scripts/logo/gerar_logo.py.
 */
export const Logo = ({ className, titulo = "Burger Premium" }: { className?: string; titulo?: string | null }) => {
  const id = useId().replace(/:/g, "");
  const fresta = `fresta-${id}`;
  const vazado = `vazado-${id}`;
  return (
    <svg
      className={className}
      viewBox={`0 0 ${LOGO_W} ${LOGO_H}`}
      role={titulo ? "img" : undefined}
      aria-label={titulo ?? undefined}
      aria-hidden={titulo ? undefined : true}
      focusable="false"
    >
      <defs>
        <mask id={fresta} maskUnits="userSpaceOnUse" x={-10} y={-10} width={LOGO_W + 20} height={FAIXA.y}>
          <rect x={-10} y={-10} width={LOGO_W + 20} height={FAIXA.y} fill="#fff" />
          <rect x={-10} y={FRESTA.y} width={LOGO_W + 20} height={FRESTA.h} fill="#000" />
        </mask>
        <mask id={vazado} maskUnits="userSpaceOnUse" x={0} y={FAIXA.y} width={LOGO_W} height={FAIXA.h}>
          <rect x={0} y={FAIXA.y} width={LOGO_W} height={FAIXA.h} fill="#fff" />
          <g transform={`translate(${PREMIUM.x} ${PREMIUM.y}) scale(${PREMIUM.escala})`}>
            <path d={PREMIUM.tracos} fill="none" stroke="#000" strokeWidth={19} />
            <path d={PREMIUM.preenche} fill="#000" />
          </g>
        </mask>
      </defs>
      <g mask={`url(#${fresta})`} style={{ fill: "var(--logo-tinta, #fff8ec)", stroke: "var(--logo-tinta, #fff8ec)" }}>
        <path d={BURGER_TRACOS} fill="none" strokeWidth={17} />
        <path d={BURGER_PREENCHE} stroke="none" />
      </g>
      <rect x={0} y={FAIXA.y} width={LOGO_W} height={FAIXA.h} mask={`url(#${vazado})`} style={{ fill: "var(--logo-faixa, #d0311c)" }} />
    </svg>
  );
};
