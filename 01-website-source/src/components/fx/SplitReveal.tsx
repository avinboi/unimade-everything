"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, onIntroDone, prefersReduced, ScrollTrigger, SplitText, useGSAP } from "./gsap";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  by?: "chars" | "words" | "lines";
  /** play once the intro finishes instead of on scroll */
  immediate?: boolean;
  delay?: number;
  stagger?: number;
  /** class added to each split piece — needed for gradient text, since background-clip can't reach transformed children */
  pieceClass?: string;
};

/** React Bits — SplitText, rebuilt on GSAP SplitText with masked lines. */
export function SplitReveal({
  children,
  as: Tag = "div",
  className = "",
  by = "chars",
  immediate = false,
  delay = 0,
  stagger,
  pieceClass,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReduced()) {
        gsap.set(el, { autoAlpha: 1 });
        return;
      }
      let split: SplitText | null = null;
      let tween: gsap.core.Tween | null = null;
      let played = false;
      let cancelled = false;
      let offIntro = () => {};
      let trigger: ScrollTrigger | null = null;

      document.fonts.ready.then(() => {
        if (cancelled) return;
        split = SplitText.create(el, {
          type: by === "lines" ? "lines" : `lines,${by}`,
          mask: "lines",
          linesClass: "split-line",
          ...(pieceClass ? (by === "chars" ? { charsClass: pieceClass } : { wordsClass: pieceClass }) : {}),
          autoSplit: true,
          onSplit(self) {
            const targets = by === "chars" ? self.chars : by === "words" ? self.words : self.lines;
            gsap.set(el, { autoAlpha: 1 });
            tween = gsap.from(targets, {
              yPercent: 115,
              rotate: by === "chars" ? 8 : 2,
              opacity: 0,
              duration: by === "chars" ? 0.9 : 1.1,
              ease: "expo.out",
              stagger: stagger ?? (by === "chars" ? 0.025 : by === "words" ? 0.05 : 0.12),
              delay: played ? 0 : delay,
              paused: !played,
            });
            return tween;
          },
        });
        const play = () => {
          played = true;
          tween?.play();
        };
        if (immediate) offIntro = onIntroDone(play);
        else trigger = ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: play });
      });

      return () => {
        cancelled = true;
        offIntro();
        trigger?.kill();
        tween?.kill();
        split?.revert();
      };
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} style={{ visibility: "hidden" }}>
      {children}
    </Tag>
  );
}
