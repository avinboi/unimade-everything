"use client";

import { useRef, useState } from "react";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { gsap, markIntroDone, prefersReduced, useGSAP } from "@/components/fx/gsap";

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      document.documentElement.style.overflow = "hidden";
      const finish = () => {
        document.documentElement.style.overflow = "";
        markIntroDone();
        setGone(true);
      };
      if (prefersReduced()) {
        finish();
        return;
      }

      const counter = { v: 0 };
      const tl = gsap.timeline({ onComplete: finish });
      tl.from(".pl-logo", { scale: 0.4, opacity: 0, rotate: -40, duration: 0.9, ease: "back.out(1.8)" })
        .from(".pl-word span", { yPercent: 120, stagger: 0.05, duration: 0.7, ease: "expo.out" }, "-=0.5")
        .to(
          counter,
          {
            v: 100,
            duration: 1.1,
            ease: "power2.inOut",
            onUpdate: () => {
              const n = root.current?.querySelector(".pl-count");
              if (n) n.textContent = String(Math.round(counter.v)).padStart(3, "0");
            },
          },
          "-=0.6",
        )
        .to(".pl-bar", { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, "<")
        .to(".pl-logo", { scale: 1.25, duration: 0.35, ease: "power2.in" })
        .to(".pl-inner", { yPercent: -30, opacity: 0, duration: 0.6, ease: "power3.in" }, "<")
        .to(".pl-panel", { yPercent: -100, duration: 0.9, ease: "expo.inOut", stagger: 0.08 }, "-=0.2");
    },
    { scope: root },
  );

  if (gone) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100]" aria-hidden>
      <div className="pl-panel absolute inset-0 bg-gradient-to-br from-violet-600 to-cyan-400" />
      <div className="pl-panel absolute inset-0 bg-[#050506]">
        <div className="grid-bg absolute inset-0 opacity-60" />
        <div className="pl-inner relative flex h-full flex-col items-center justify-center gap-6">
          <div className="pl-logo">
            <AnimatedLogo size={120} priority />
          </div>
          <p className="pl-word flex overflow-hidden font-display text-3xl tracking-[0.3em] text-white">
            {"UNIMADE".split("").map((c, i) => (
              <span key={i} className="inline-block">
                {c}
              </span>
            ))}
          </p>
          <div className="w-48">
            <div className="h-px w-full bg-white/10">
              <div className="pl-bar h-px bg-gradient-to-r from-violet-500 to-cyan-300" style={{ transform: "scaleX(0)", transformOrigin: "left" }} />
            </div>
            <div className="mt-3 flex justify-between text-[0.7rem] uppercase tracking-[0.25em] text-zinc-500">
              <span>loading college life</span>
              <span className="pl-count tabular-nums text-zinc-300">000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
