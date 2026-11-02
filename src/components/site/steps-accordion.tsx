"use client";

import { useState } from "react";
import type { OrderStep } from "@/lib/content";

type StepsAccordionProps = {
  steps: OrderStep[];
};

/** Etapas do pedido: uma aberta por vez, a primeira já aberta. */
export const StepsAccordion = ({ steps }: StepsAccordionProps) => {
  const [open, setOpen] = useState(0);

  return (
    <div className="steps">
      {steps.map((step, index) => {
        const isOpen = index === open;
        return (
          <div
            key={step.title}
            className="step"
            data-tint={index + 1}
            data-open={isOpen}
          >
            <h3 className="step-title">
              <button
                type="button"
                className="step-button"
                id={`etapa-${index}`}
                aria-expanded={isOpen}
                aria-controls={`etapa-painel-${index}`}
                onClick={() => setOpen(index)}
              >
                {step.title}
              </button>
            </h3>
            <div
              className="step-panel"
              id={`etapa-painel-${index}`}
              role="region"
              aria-labelledby={`etapa-${index}`}
              inert={!isOpen}
            >
              <p className="step-text">{step.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
