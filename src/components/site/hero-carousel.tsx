"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type HeroCarouselImage = {
  src: string;
  alt?: string;
};

type HeroCarouselProps = {
  images: HeroCarouselImage[];
  className?: string;
  intervalMs?: number;
};

export const HeroCarousel = ({
  images,
  className,
  intervalMs = 6500,
}: HeroCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReduceMotion(mediaQuery.matches);
    handleChange();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    if (reduceMotion || images.length < 2) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, intervalMs);

    return () => window.clearInterval(intervalId);
  }, [images.length, intervalMs, reduceMotion]);

  if (images.length === 0) return null;

  return (
    <div className={`absolute inset-0 ${className ?? ""}`} aria-hidden="true">
      {images.map((image, index) => {
        const isActive = index === activeIndex;

        return (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt ?? ""}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-out ${
              isActive ? "opacity-100 scale-[1.06]" : "opacity-0 scale-[1.02]"
            }`}
          />
        );
      })}
    </div>
  );
};
