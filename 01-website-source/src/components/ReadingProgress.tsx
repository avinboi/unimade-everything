"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/components/fx/gsap";

/** Thin gradient bar pinned under the nav that fills as you read. */
export function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(ref.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { trigger: "article", start: "top top", end: "bottom bottom", scrub: 0.3 },
    });
  });

  return (
    <div className="fixed inset-x-0 top-0 z-[65] h-1">
      <div
        ref={ref}
        className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-300 shadow-[0_0_12px_#a855f7]"
        style={{ transform: "scaleX(0)", transformOrigin: "left" }}
      />
    </div>
  );
}
