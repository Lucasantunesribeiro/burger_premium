"use client";

import { useEffect, useRef } from "react";

type LoopVideoProps = {
  src: string;
  poster: string;
  label: string;
};

/** Vídeo mudo em repetição. Fica parado no poster quando há preferência por menos movimento. */
export const LoopVideo = ({ src, poster, label }: LoopVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      video.pause();
      video.removeAttribute("autoplay");
    }
  }, []);

  return (
    <video
      ref={ref}
      className="strip-video"
      src={src}
      poster={poster}
      aria-label={label}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
};
