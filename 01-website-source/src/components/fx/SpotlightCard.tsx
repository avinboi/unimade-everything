"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";

/** React Bits — SpotlightCard: a soft glow that follows the pointer. */
export function SpotlightCard({
  children,
  className = "",
  color,
  style,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
  style?: CSSProperties;
}) {
  function onMove(e: PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <div
      onPointerMove={onMove}
      className={`spotlight-card ${className}`}
      style={{ ...(color ? ({ "--spot": color } as CSSProperties) : {}), ...style }}
    >
      {children}
    </div>
  );
}
