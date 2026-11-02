"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Revela elementos [data-reveal] quando entram na tela.
 * Sem JavaScript, ou com movimento reduzido, tudo fica visível desde o início:
 * a classe `reveal-ready` só é adicionada aqui.
 */
export const RevealObserver = () => {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches || !("IntersectionObserver" in window)) return;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    root.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    targets.forEach((target) => {
      const rect = target.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        target.classList.add("is-in");
      } else {
        observer.observe(target);
      }
    });

    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, [pathname]);

  return null;
};
