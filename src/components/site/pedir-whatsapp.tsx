import { PEDIR_WHATSAPP_URL } from "@/lib/constants";

type PedirWhatsappProps = {
  id: string;
};

/** Botão grande. O hover (branco, anel verde, cresce) fica no CSS. */
export const PedirWhatsapp = ({ id }: PedirWhatsappProps) => (
  <section id={id} className="pedir-palco" aria-labelledby={`${id}-titulo`}>
    <div className="pedir-miolo">
      <p className="pedir-kicker">Modelo / DEMO</p>
      <h2 id={`${id}-titulo`} className="pedir-titulo">
        Quer um site assim para a sua lanchonete?
      </h2>
      <a
        className="pedir-whatsapp"
        href={PEDIR_WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-cta="pedir-whatsapp"
      >
        Pedir no WhatsApp
      </a>
    </div>
  </section>
);
