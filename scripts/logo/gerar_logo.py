"""Gera a logo do Burger Premium: letras desenhadas por traço (nenhuma fonte envolvida).

BURGER: caixa alta condensada e pesada, cortada por uma fresta fina na altura da carne,
como uma camada do lanche. Embaixo, uma faixa vermelha com PREMIUM vazado.

Saídas:
  src/components/site/logo-paths.ts   (usado pelo componente <Logo/>)
  src/app/icon.svg                    (favicon: o B da logo sobre a faixa)
  public/logo-burger-premium.svg      (arquivo solto para uso fora do site)

Rodar: python3 scripts/logo/gerar_logo.py
"""

from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
TRACO = 17  # espessura do traço
ALTURA = 124  # altura de BURGER
RC = 11  # raio dos cantos no eixo do traço


def f(v: float) -> str:
    return f"{v:.2f}".rstrip("0").rstrip(".")


def glifo(letra: str, x0: float, s: float = TRACO, rc: float = RC, H: float = 100):
    """Devolve (traços, preenchimentos, largura) de uma letra de altura H."""
    h = s / 2
    W = {"B": 54, "U": 54, "R": 54, "G": 54, "E": 45, "P": 53, "M": 70, "I": s}[letra]
    xL, xR = x0 + h, x0 + W - h
    yT, yB = h, H - h
    m48, m50, m53 = H * 0.48, H * 0.5, H * 0.53
    tr, pr = [], []
    if letra == "B":
        xt = xR - 3
        tr += [f"M{f(xL)} 0V{f(H)}",
               f"M{f(xL)} {f(yT)}H{f(xt-rc)}A{rc} {rc} 0 0 1 {f(xt)} {f(yT+rc)}V{f(m48-rc)}A{rc} {rc} 0 0 1 {f(xt-rc)} {f(m48)}H{f(xL)}",
               f"M{f(xL)} {f(m48)}H{f(xR-rc)}A{rc} {rc} 0 0 1 {f(xR)} {f(m48+rc)}V{f(yB-rc)}A{rc} {rc} 0 0 1 {f(xR-rc)} {f(yB)}H{f(xL)}"]
    elif letra == "U":
        tr.append(f"M{f(xL)} 0V{f(yB-rc)}A{rc} {rc} 0 0 0 {f(xL+rc)} {f(yB)}H{f(xR-rc)}A{rc} {rc} 0 0 0 {f(xR)} {f(yB-rc)}V0")
    elif letra in "RP":
        meio = m50 if letra == "R" else H * 0.55
        tr += [f"M{f(xL)} 0V{f(H)}",
               f"M{f(xL)} {f(yT)}H{f(xR-rc)}A{rc} {rc} 0 0 1 {f(xR)} {f(yT+rc)}V{f(meio-rc)}A{rc} {rc} 0 0 1 {f(xR-rc)} {f(meio)}H{f(xL)}"]
        if letra == "R":
            tr.append(f"M{f(xR-rc)} {f(meio)}A{rc} {rc} 0 0 1 {f(xR)} {f(meio+rc)}V{f(H)}")
    elif letra == "G":
        tr += [f"M{f(xR)} {f(H*0.34)}V{f(yT+rc)}A{rc} {rc} 0 0 0 {f(xR-rc)} {f(yT)}H{f(xL+rc)}A{rc} {rc} 0 0 0 {f(xL)} {f(yT+rc)}"
               f"V{f(yB-rc)}A{rc} {rc} 0 0 0 {f(xL+rc)} {f(yB)}H{f(xR-rc)}A{rc} {rc} 0 0 0 {f(xR)} {f(yB-rc)}V{f(m53)}",
               f"M{f(xR+h)} {f(m53)}H{f(x0+27)}"]
    elif letra == "E":
        tr += [f"M{f(x0+W)} {f(yT)}H{f(xL)}V{f(yB)}H{f(x0+W)}", f"M{f(xL)} {f(m50)}H{f(x0+W-5)}"]
    elif letra == "M":
        xm = x0 + W / 2
        tr += [f"M{f(xL)} 0V{f(H)}", f"M{f(xR)} 0V{f(H)}"]
        pr.append(f"M{f(x0)} 0H{f(x0+s+3)}L{f(xm)} {f(H*0.44)}L{f(x0+W-s-3)} 0H{f(x0+W)}L{f(xm+10)} {f(H*0.74)}H{f(xm-10)}Z")
    elif letra == "I":
        tr.append(f"M{f(xL)} 0V{f(H)}")
    return tr, pr, W


def palavra(texto: str, espaco: float, s: float = TRACO, H: float = 100):
    x, tr, pr = 0.0, [], []
    for i, letra in enumerate(texto):
        t, p, w = glifo(letra, x, s, H=H)
        tr += t
        pr += p
        x += w + (espaco if i < len(texto) - 1 else 0)
    return " ".join(tr), " ".join(pr), x


# BURGER
b_tr, b_pr, LARG = palavra("BURGER", 8, H=ALTURA)
FRESTA = (round(ALTURA * 0.63), 5)  # y e altura da fresta que "fatia" a palavra

# PREMIUM, menor e espaçado, centrado na faixa
FAIXA_Y, FAIXA_H = ALTURA + 10, 52
ESC = 0.35
p_tr, p_pr, p_larg = palavra("PREMIUM", 0, s=19)
n = len("PREMIUM")
folga = LARG - 2 * 18 - p_larg * ESC
esp = folga / (n - 1) / ESC
p_tr, p_pr, p_larg = palavra("PREMIUM", esp, s=19)
PX = (LARG - p_larg * ESC) / 2
PY = FAIXA_Y + (FAIXA_H - 100 * ESC) / 2
ALT = FAIXA_Y + FAIXA_H

ts = f"""// Gerado por scripts/logo/gerar_logo.py. Não editar à mão.
export const LOGO_W = {f(LARG)};
export const LOGO_H = {ALT};
export const BURGER_TRACOS = "{b_tr}";
export const BURGER_PREENCHE = "{b_pr}";
export const FRESTA = {{ y: {FRESTA[0]}, h: {FRESTA[1]} }};
export const FAIXA = {{ y: {FAIXA_Y}, h: {FAIXA_H} }};
export const PREMIUM = {{ x: {f(PX)}, y: {f(PY)}, escala: {ESC}, tracos: "{p_tr}", preenche: "{p_pr}" }};
"""
(RAIZ / "src/components/site/logo-paths.ts").write_text(ts)


def svg_logo(tinta: str, faixa: str, fundo: str | None = None, pad: float = 0) -> str:
    w, h = LARG + 2 * pad, ALT + 2 * pad
    bg = f'<rect width="{f(w)}" height="{f(h)}" fill="{fundo}"/>' if fundo else ""
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {f(w)} {f(h)}" width="{f(w*2)}" height="{f(h*2)}" role="img" aria-label="Burger Premium">
  <title>Burger Premium</title>
  <defs>
    <mask id="fresta" maskUnits="userSpaceOnUse" x="-10" y="-10" width="{f(LARG+20)}" height="{ALTURA+20}">
      <rect x="-10" y="-10" width="{f(LARG+20)}" height="{ALTURA+20}" fill="#fff"/>
      <rect x="-10" y="{FRESTA[0]}" width="{f(LARG+20)}" height="{FRESTA[1]}" fill="#000"/>
    </mask>
    <mask id="vazado" maskUnits="userSpaceOnUse" x="0" y="{FAIXA_Y}" width="{f(LARG)}" height="{FAIXA_H}">
      <rect x="0" y="{FAIXA_Y}" width="{f(LARG)}" height="{FAIXA_H}" fill="#fff"/>
      <g transform="translate({f(PX)} {f(PY)}) scale({ESC})">
        <path d="{p_tr}" fill="none" stroke="#000" stroke-width="19"/>
        <path d="{p_pr}" fill="#000"/>
      </g>
    </mask>
  </defs>
  {bg}<g transform="translate({f(pad)} {f(pad)})">
    <g mask="url(#fresta)" fill="{tinta}">
      <path d="{b_tr}" fill="none" stroke="{tinta}" stroke-width="{TRACO}"/>
      <path d="{b_pr}"/>
    </g>
    <rect x="0" y="{FAIXA_Y}" width="{f(LARG)}" height="{FAIXA_H}" fill="{faixa}" mask="url(#vazado)"/>
  </g>
</svg>
"""


(RAIZ / "public/logo-burger-premium.svg").write_text(svg_logo("#fff8ec", "#d0311c"))

# Favicon: o B da logo, com a fresta, sobre a faixa vermelha.
bt, bp, bw = palavra("B", 0, H=ALTURA)
icon = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="12" fill="#0b0806"/>
  <defs>
    <mask id="f" maskUnits="userSpaceOnUse" x="-10" y="-10" width="80" height="150">
      <rect x="-10" y="-10" width="80" height="150" fill="#fff"/>
      <rect x="-10" y="{FRESTA[0]}" width="80" height="{FRESTA[1]+1}" fill="#000"/>
    </mask>
  </defs>
  <g transform="translate({f((64 - bw * 0.36) / 2)} 6) scale(0.36)" mask="url(#f)">
    <path d="{bt}" fill="none" stroke="#fff8ec" stroke-width="{TRACO+2}"/>
  </g>
  <rect x="{f((64 - bw * 0.36) / 2)}" y="54" width="{f(bw*0.36)}" height="5" fill="#d0311c"/>
</svg>
"""
(RAIZ / "src/app/icon.svg").write_text(icon)
print("ok", f(LARG), ALT, "premium esp", f(esp))
