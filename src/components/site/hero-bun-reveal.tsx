"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type HeroBunRevealProps = {
  className?: string;
};

export const HeroBunReveal = ({ className }: HeroBunRevealProps) => {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      scene.style.setProperty("--bun-open", "0");
      scene.style.setProperty("--bun-fly", "0");
      scene.style.setProperty("--bun-drop", "0");
      return;
    }

    let rafId = 0;
    const easeIn = (value: number) => Math.pow(value, 1.7);
    const easeOut = (value: number) => 1 - Math.pow(1 - value, 2.4);
    const update = () => {
      rafId = 0;
      const rect = scene.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollDelay = 360;
      if (scrollY < scrollDelay) {
        scene.style.setProperty("--bun-open", "0");
        scene.style.setProperty("--bun-fly", "0");
        scene.style.setProperty("--bun-drop", "0");
        return;
      }
      const delayedScrollY = scrollY - scrollDelay;
      const openRange = Math.max(rect.height * 0.15, 100);
      const overshootRange = rect.height * 0.5;
      const baseRaw = Math.min(
        Math.max(delayedScrollY / openRange, 0),
        1
      );
      const overshootRaw = Math.min(
        Math.max((delayedScrollY - openRange) / overshootRange, 0),
        1
      );
      const base = easeIn(baseRaw);
      const overshoot = Math.sin(overshootRaw * Math.PI) * 0.04;
      const openProgress = Math.min(base + overshoot, 1.2);
      const settleRange = rect.height * 0.25;
      const dropRaw = Math.min(
        Math.max((delayedScrollY - openRange * 0.35) / settleRange, 0),
        1
      );
      const dropProgress = Math.min(easeOut(dropRaw) * 1.2, 1);
      const flyRange = rect.height * 0.6;
      const flyBase = Math.min(Math.max(delayedScrollY / flyRange, 0), 1);
      const flyProgress = Math.min(easeIn(flyBase) * 1.5, 1.5);
      scene.style.setProperty("--bun-open", openProgress.toFixed(3));
      scene.style.setProperty("--bun-fly", flyProgress.toFixed(3));
      scene.style.setProperty("--bun-drop", dropProgress.toFixed(3));
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      className={`bun-hero relative z-20 min-h-[520px] w-full overflow-visible sm:min-h-[600px] lg:min-h-[680px] ${className ?? ""}`}
      aria-hidden="true"
    >
      <div className="relative z-10 flex h-full items-end justify-center pb-96 sm:pb-[26rem] lg:pb-[30rem]">
        <div className="bun-stack relative h-[230px] w-[310px] translate-y-48 sm:h-[270px] sm:w-[390px] sm:translate-y-56 lg:h-[320px] lg:w-[460px] lg:translate-y-64">
          <Image
            src="/images/hero-bun-top.svg"
            alt=""
            width={640}
            height={260}
            sizes="(min-width: 1024px) 36vw, 80vw"
            className="bun-layer bun-top absolute left-0 top-0 w-full"
          />
          <Image
            src="/images/hero-lettuce.svg"
            alt=""
            width={640}
            height={160}
            sizes="(min-width: 1024px) 36vw, 80vw"
            className="bun-layer bun-lettuce absolute left-1/2 top-20 w-[96%] -translate-x-1/2"
          />
          <Image
            src="/images/hero-pickles.svg"
            alt=""
            width={640}
            height={140}
            sizes="(min-width: 1024px) 34vw, 75vw"
            className="bun-layer bun-pickles absolute left-1/2 top-24 w-[86%] -translate-x-1/2"
          />
          <Image
            src="/images/hero-tomato.svg"
            alt=""
            width={640}
            height={140}
            sizes="(min-width: 1024px) 34vw, 75vw"
            className="bun-layer bun-tomato absolute left-1/2 top-28 w-[90%] -translate-x-1/2"
          />
          <Image
            src="/images/hero-cheddar.svg"
            alt=""
            width={640}
            height={180}
            sizes="(min-width: 1024px) 34vw, 75vw"
            className="bun-layer bun-cheddar absolute left-1/2 top-36 w-[92%] -translate-x-1/2"
          />
          <Image
            src="/images/hero-bacon.svg"
            alt=""
            width={640}
            height={160}
            sizes="(min-width: 1024px) 34vw, 75vw"
            className="bun-layer bun-bacon absolute left-1/2 top-42 w-[90%] -translate-x-1/2"
          />
          <Image
            src="/images/hero-onion.svg"
            alt=""
            width={640}
            height={140}
            sizes="(min-width: 1024px) 34vw, 75vw"
            className="bun-layer bun-onion absolute left-1/2 top-48 w-[88%] -translate-x-1/2"
          />
          <Image
            src="/images/hero-patty.svg"
            alt=""
            width={640}
            height={170}
            sizes="(min-width: 1024px) 36vw, 80vw"
            className="bun-layer bun-patty absolute left-1/2 top-52 w-[92%] -translate-x-1/2"
          />
          <Image
            src="/images/hero-sauce.svg"
            alt=""
            width={320}
            height={140}
            sizes="(min-width: 1024px) 20vw, 50vw"
            className="bun-layer bun-sauce absolute left-1/2 top-60 w-[46%] -translate-x-1/2"
          />
          <Image
            src="/images/hero-bun-bottom.svg"
            alt=""
            width={640}
            height={200}
            sizes="(min-width: 1024px) 36vw, 80vw"
            className="bun-layer bun-bottom absolute left-0 bottom-0 w-full"
          />
        </div>
      </div>
    </div>
  );
};
