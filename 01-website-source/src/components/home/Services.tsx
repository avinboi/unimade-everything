"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/components/fx/gsap";
import { SplitReveal } from "@/components/fx/SplitReveal";
import { services } from "@/lib/services";

/**
 * The seven services as a big type index. Hovering a row floats that service's doodle
 * beside the cursor; on touch screens the doodle sits inline instead.
 */
export function Services() {
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      gsap.from(".sv-row", {
        yPercent: 60,
        opacity: 0,
        stagger: 0.06,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".sv-list", start: "top 85%" },
      });
      gsap.from(".sv-line", {
        scaleX: 0,
        transformOrigin: "left",
        stagger: 0.06,
        duration: 1.2,
        ease: "expo.inOut",
        scrollTrigger: { trigger: ".sv-list", start: "top 85%" },
      });

      const el = preview.current;
      if (!el || !window.matchMedia("(pointer: fine)").matches) return;
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
      const rTo = gsap.quickTo(el, "rotation", { duration: 0.8, ease: "power3.out" });
      let lastX = 0;
      const move = contextSafe!((e: PointerEvent) => {
        const r = root.current!.getBoundingClientRect();
        xTo(e.clientX - r.left);
        yTo(e.clientY - r.top);
        rTo(gsap.utils.clamp(-14, 14, (e.clientX - lastX) * 0.6));
        lastX = e.clientX;
      });
      root.current!.addEventListener("pointermove", move);
      return () => root.current?.removeEventListener("pointermove", move);
    },
    { scope: root },
  );

  return (
    <section ref={root} id="fixing" className="relative scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">what we fix</p>
            <SplitReveal as="h2" by="words" className="mt-4 font-display text-5xl leading-[0.95] text-white sm:text-7xl">
              Seven chores. One app.
            </SplitReveal>
          </div>
          <p className="hand-cursive max-w-xs text-2xl text-cyan-300 sm:text-right">pick one. we take it from there.</p>
        </div>

        <ul className="sv-list mt-14" onMouseLeave={() => setActive(null)}>
          {services.map((s, i) => (
            <li key={s.slug} className="relative overflow-hidden">
              <span className="sv-line absolute inset-x-0 top-0 h-px bg-white/10" />
              <Link
                href={s.href}
                onMouseEnter={() => setActive(i)}
                className="sv-row group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 sm:gap-8 sm:py-6"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-violet-600/20 via-violet-500/10 to-transparent transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
                <span className="relative flex items-center gap-3">
                  <span className="font-display text-sm text-zinc-600 transition-colors group-hover:text-cyan-300">0{i + 1}</span>
                  <Image src={s.doodle} alt="" width={48} height={48} unoptimized className="h-11 w-11 rounded-full object-cover sm:hidden" />
                </span>
                <span className="relative">
                  <span className="block font-display text-3xl text-white transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-3 sm:text-6xl">
                    {s.name}
                  </span>
                  <span className="mt-1 block text-sm text-zinc-500 sm:hidden">{s.tagline}</span>
                </span>
                <span className="relative flex items-center gap-6">
                  <span className="hidden max-w-[16rem] text-right text-zinc-400 transition-colors group-hover:text-zinc-200 md:block">{s.tagline}</span>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white transition duration-500 group-hover:-rotate-45 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-violet-600 group-hover:to-cyan-500">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
          <li className="h-px bg-white/10" />
        </ul>
      </div>

      {/* floating doodle that trails the cursor while a row is hovered */}
      <div ref={preview} className="pointer-events-none absolute left-0 top-0 z-10 hidden lg:block" aria-hidden>
        <div
          className="-translate-x-1/2 -translate-y-[115%] transition-[opacity,scale] duration-300 ease-out"
          style={{ opacity: active === null ? 0 : 1, scale: active === null ? "0.6" : "1" }}
        >
          <div className="relative h-44 w-44">
            {services.map((s, i) => (
              <div key={s.slug} className="absolute inset-0 transition-opacity duration-300" style={{ opacity: active === i ? 1 : 0 }}>
                <div className="doodle-frame shadow-[0_20px_60px_-10px_rgba(124,58,237,0.6)]">
                  <span className="doodle-frame-inner">
                    <Image src={s.doodle} alt="" width={200} height={200} unoptimized className="doodle-frame-art" />
                  </span>
                </div>
                <p className="hand-label absolute -bottom-7 left-1/2 w-max -translate-x-1/2 rotate-[-4deg] text-xl text-cyan-300">{s.scribble}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
