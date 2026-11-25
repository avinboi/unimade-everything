"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "./gsap";

/** React Bits — ScrollVelocity: an endless marquee that speeds up and flips with scroll. */
export function ScrollVelocity({
  children,
  baseSpeed = 60,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  baseSpeed?: number;
  reverse?: boolean;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = track.current;
      if (!el) return;
      let x = 0;
      let dir = reverse ? 1 : -1;
      let boost = 0;
      const st = ScrollTrigger.create({
        trigger: wrap.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          boost = Math.min(Math.abs(v) / 5, 1000);
          if (v !== 0) dir = (v > 0 ? -1 : 1) * (reverse ? -1 : 1);
        },
      });
      const tick = (_t: number, dt: number) => {
        const half = el.scrollWidth / 2;
        if (!half) return;
        boost *= 0.94;
        x += (dir * (baseSpeed + boost) * dt) / 1000;
        if (x <= -half) x += half;
        if (x > 0) x -= half;
        gsap.set(el, { x });
      };
      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
        st.kill();
      };
    },
    { scope: wrap },
  );

  return (
    <div ref={wrap} className={`overflow-hidden ${className}`}>
      <div ref={track} className="marquee-track">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
