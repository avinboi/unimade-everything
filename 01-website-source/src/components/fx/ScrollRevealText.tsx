"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "./gsap";

/** React Bits — ScrollReveal: words sharpen and brighten one by one as you scroll through. */
export function ScrollRevealText({
  text,
  className = "",
  start = "top 80%",
  end = "bottom 45%",
}: {
  text: string;
  className?: string;
  start?: string;
  end?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const split = SplitText.create(el, { type: "words" });
      gsap.fromTo(
        split.words,
        { opacity: 0.12, filter: "blur(6px)", y: 8 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: { trigger: el, start, end, scrub: true },
        },
      );
      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={className}>
      {text}
    </p>
  );
}
