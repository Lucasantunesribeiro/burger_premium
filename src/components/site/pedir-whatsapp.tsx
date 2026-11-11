import { PORTFOLIO_WHATSAPP_URL } from "@/lib/constants";

type PedirWhatsappProps = {
  id: string;
  variant?: "stage" | "end";
};

export const PedirWhatsapp = ({ id, variant = "stage" }: PedirWhatsappProps) => {
  const isStage = variant === "stage";

  return (
    <section
      id={id}
      className={
        isStage
          ? "relative flex min-h-[100vh] items-center justify-center bg-[#07080b] px-4 py-28 text-white"
          : "relative flex min-h-[78vh] items-center justify-center bg-[#07080b] px-4 py-24 text-white"
      }
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(156,255,94,0.14),transparent_62%)]"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9cff5e]">
          Modelo / DEMO
        </p>
        <h2 className="font-display text-5xl uppercase leading-[0.9] sm:text-7xl lg:text-8xl">
          Quer um site assim para a sua lanchonete?
        </h2>
        <a href={PORTFOLIO_WHATSAPP_URL} className="pedir-whatsapp">
          Pedir no WhatsApp
        </a>
        <p className="max-w-xl text-sm text-white/65 sm:text-base">
          Os preços do cardápio são fictícios deste modelo.
        </p>
      </div>
    </section>
  );
};
