"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/components/fx/gsap";

/** Page transition: a gradient curtain lifts away and the new page rises in. */
export default function Template({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap
        .timeline()
        .fromTo(".pt-curtain", { y: 0, yPercent: 0 }, { yPercent: -100, duration: 0.9, ease: "expo.inOut", stagger: { each: 0.08, from: "end" } })
        .from(".pt-content", { y: 60, opacity: 0, duration: 0.9, ease: "expo.out", clearProps: "transform,opacity", onComplete: () => ScrollTrigger.refresh() }, "-=0.5");
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <div className="pointer-events-none fixed inset-0 z-[70]" aria-hidden>
        <div className="pt-curtain absolute inset-0 bg-gradient-to-br from-violet-600 to-cyan-400" style={{ transform: "translateY(-100%)" }} />
        <div className="pt-curtain absolute inset-0 bg-[#050506]" style={{ transform: "translateY(-100%)" }} />
      </div>
      <div className="pt-content">{children}</div>
    </div>
  );
}
