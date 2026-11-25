"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function PaperPlane() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0.08, 0.72], ["92vw", "-18vw"]);
  const y = useTransform(scrollYProgress, [0.08, 0.72], ["-12vh", "108vh"]);
  const rotate = useTransform(scrollYProgress, [0.08, 0.72], [18, -32]);
  const opacity = useTransform(scrollYProgress, [0, 0.07, 0.11, 0.66, 0.76], [0, 0, 1, 1, 0]);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[6]"
      style={{ x, y, rotate, opacity }}
    >
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
        <path
          d="M8 34 L64 10 L40 62 L34 40 L8 34 Z"
          stroke="url(#plane-stroke)"
          strokeWidth="2.2"
          strokeLinejoin="round"
          fill="rgba(5,5,6,0.35)"
        />
        <path d="M34 40 L64 10 L40 38" stroke="#67e8f9" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M34 40 L40 62" stroke="#c084fc" strokeWidth="1.7" />
        <defs>
          <linearGradient id="plane-stroke" x1="8" y1="10" x2="64" y2="62">
            <stop stopColor="#a855f7" />
            <stop offset="1" stopColor="#67e8f9" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
