"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { DoodleFrame } from "@/components/DoodleFrame";
import { gsap, ScrollTrigger, useGSAP } from "@/components/fx/gsap";
import { Magnet } from "@/components/fx/Magnet";
import { ScrollVelocity } from "@/components/fx/ScrollVelocity";
import { SplitReveal } from "@/components/fx/SplitReveal";
import { services } from "@/lib/services";

export function ProductPage() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      gsap.from(".pp-chip", { y: 20, opacity: 0, stagger: 0.05, duration: 0.8, ease: "expo.out", delay: 0.5 });

      gsap.utils.toArray<HTMLElement>(".pp-section").forEach((sec, i) => {
        ScrollTrigger.create({
          trigger: sec,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(i),
        });
        const tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: "top 75%" } });
        tl.from(sec.querySelectorAll(".pp-fade"), { y: 40, opacity: 0, stagger: 0.08, duration: 1, ease: "expo.out" }).from(
          sec.querySelectorAll(".pp-step"),
          { x: -30, opacity: 0, stagger: 0.1, duration: 0.8, ease: "expo.out" },
          "-=0.6",
        );
      });

      gsap.to(".pp-rail-fill", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: ".pp-list", start: "top 55%", end: "bottom 55%", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="relative overflow-hidden px-4 pb-16 pt-40 sm:px-6">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-6xl">
          <p className="hand-label text-3xl text-violet-300">the cheat code, unpacked</p>
          <SplitReveal as="h1" immediate by="words" className="mt-3 max-w-5xl font-display text-6xl leading-[0.92] text-white sm:text-8xl">
            Meet your new college-life cheat code.
          </SplitReveal>
          <p className="mt-6 max-w-2xl text-lg text-zinc-400">
            Everything from laundry to internships, in one student-first platform. Pick a service. We take it from there.
          </p>
          <div className="mt-10 flex flex-wrap gap-2">
            {services.map((s) => (
              <a key={s.slug} href={`#${s.slug}`} className="pp-chip chip transition-colors hover:border-violet-400/60 hover:text-white">
                <Image src={s.doodle} alt="" width={22} height={22} unoptimized className="h-5 w-5 rounded-full object-cover" />
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="border-y border-white/[0.07] py-4">
        <ScrollVelocity baseSpeed={45}>
          {services.map((s) => (
            <span key={s.slug} className="hand-label flex items-center gap-6 px-6 text-2xl text-zinc-400">
              {s.hover}
              <span className="text-violet-400">✦</span>
            </span>
          ))}
        </ScrollVelocity>
      </div>

      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          {/* sticky visual that swaps with the active service */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-square w-full">
                <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.35),transparent_70%)] blur-2xl" />
                <div className="orbit absolute inset-0 rounded-full border border-dashed border-white/10" style={{ "--orbit-speed": "60s" } as React.CSSProperties}>
                  <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_20px_#67e8f9]" />
                </div>
                {services.map((s, i) => (
                  <div
                    key={s.slug}
                    className="absolute inset-[12%] transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
                    style={{
                      opacity: active === i ? 1 : 0,
                      transform: `scale(${active === i ? 1 : 0.8}) rotate(${active === i ? 0 : i < active ? -20 : 20}deg)`,
                      filter: active === i ? "blur(0)" : "blur(8px)",
                    }}
                  >
                    <DoodleFrame src={s.doodle} alt={s.name} />
                  </div>
                ))}
                <p className="hand-label absolute -bottom-2 right-4 rotate-[-6deg] text-3xl text-cyan-300">{services[active].scribble}</p>
              </div>
              <div className="mt-10 flex items-center gap-4">
                <span className="font-display text-6xl text-white tabular-nums">0{active + 1}</span>
                <span className="text-zinc-600">/ 07</span>
                <div className="ml-2 flex gap-1.5">
                  {services.map((s, i) => (
                    <span key={s.slug} className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-gradient-to-r from-violet-500 to-cyan-300" : "w-1.5 bg-white/20"}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pp-list relative space-y-10 lg:pl-12">
            <div className="absolute bottom-0 left-0 top-0 hidden w-px bg-white/10 lg:block">
              <div className="pp-rail-fill h-full w-px bg-gradient-to-b from-violet-500 to-cyan-300" style={{ transform: "scaleY(0)", transformOrigin: "top" }} />
            </div>
            {services.map((s, i) => (
              <article key={s.slug} id={s.slug} className="pp-section scroll-mt-28 lg:min-h-[80vh] lg:py-10">
                <div className="mx-auto mb-8 w-56 lg:hidden">
                  <DoodleFrame src={s.doodle} alt={s.name} />
                </div>
                <p className="pp-fade font-display text-sm text-zinc-500">Service 0{i + 1}</p>
                <h2 className="pp-fade mt-2 font-display text-6xl text-white sm:text-7xl">{s.name}</h2>
                <p className="pp-fade mt-4 text-2xl text-gradient">{s.tagline}</p>
                <p className="pp-fade mt-4 max-w-lg text-lg text-zinc-400">{s.blurb}</p>
                <ol className="mt-10 space-y-3">
                  {s.how.map((step, j) => (
                    <li key={step} className="pp-step glass flex items-center gap-5 rounded-2xl px-5 py-4 transition-colors hover:border-violet-400/40 hover:bg-violet-500/[0.06]">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 font-display text-sm text-white">
                        0{j + 1}
                      </span>
                      <span className="text-zinc-200">{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="pp-fade mt-8 flex items-center gap-4">
                  <Magnet>
                    <Link href="/about#talk" className="btn-primary">
                      Get started →
                    </Link>
                  </Magnet>
                  <span className="hand-cursive text-2xl text-violet-300">{s.hover}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
