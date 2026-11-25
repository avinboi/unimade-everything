"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/components/fx/gsap";

/** Dot + lagging gradient ring. Grows over interactive things; shows a label for [data-cursor]. */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    document.documentElement.classList.add("has-custom-cursor");

    const dx = gsap.quickSetter(dot, "x", "px");
    const dy = gsap.quickSetter(dot, "y", "px");
    const rx = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      dx(e.clientX - 4);
      dy(e.clientY - 4);
      rx(e.clientX);
      ry(e.clientY);
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      const interactive = t.closest("a, button, input, textarea, select, label");
      if (labelled) label.textContent = labelled.dataset.cursor ?? "";
      ring.classList.toggle("has-label", Boolean(labelled));
      ring.classList.toggle("is-hover", Boolean(interactive) && !labelled);
    };

    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden>
        <span ref={labelRef} />
      </div>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}
