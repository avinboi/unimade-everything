"use client";

import { useEffect, useRef } from "react";

/** React Bits — ClickSpark: little violet/cyan sparks wherever you click. */
export function ClickSpark() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const colors = ["#a855f7", "#67e8f9", "#c084fc", "#22d3ee"];
    let sparks: { x: number; y: number; a: number; t: number; c: string }[] = [];
    let frame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      sparks = sparks.filter((s) => now - s.t < 500);
      for (const s of sparks) {
        const p = (now - s.t) / 500;
        const e = p * (2 - p);
        const d = e * 28;
        const len = 12 * (1 - e);
        ctx.strokeStyle = s.c;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(s.x + d * Math.cos(s.a), s.y + d * Math.sin(s.a));
        ctx.lineTo(s.x + (d + len) * Math.cos(s.a), s.y + (d + len) * Math.sin(s.a));
        ctx.stroke();
      }
      frame = sparks.length ? requestAnimationFrame(draw) : 0;
    };

    const click = (e: MouseEvent) => {
      const now = performance.now();
      for (let i = 0; i < 9; i++) {
        sparks.push({ x: e.clientX, y: e.clientY, a: (Math.PI * 2 * i) / 9, t: now, c: colors[i % colors.length] });
      }
      if (!frame) frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("click", click);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", click);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[95] h-full w-full" aria-hidden />;
}
