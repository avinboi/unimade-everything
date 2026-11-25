"use client";

import { useRef } from "react";
import { DoodleFrame } from "@/components/DoodleFrame";
import { gsap, useGSAP } from "@/components/fx/gsap";
import { SplitReveal } from "@/components/fx/SplitReveal";

const steps = [
  { n: "01", title: "Pick", copy: "Tell us what you need.", img: "/doodles/pick.png", note: "any of the seven" },
  { n: "02", title: "Book", copy: "Pick your time / option.", img: "/doodles/book.png", note: "two taps, max" },
  { n: "03", title: "Done", copy: "Go live your college life.", img: "/doodles/done.png", note: "we got the boring bit" },
];

/** The three-step process in one row: a dashed path draws across and each step pops in as it's reached. */
export function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ scrollTrigger: { trigger: ".pc-row", start: "top 75%" } })
          .fromTo(".pc-path", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" })
          .from(
            ".pc-step",
            { y: 50, opacity: 0, scale: 0.9, stagger: 0.4, duration: 0.8, ease: "back.out(1.7)" },
            0.1,
          )
          .from(".pc-doodle", { rotate: -30, scale: 0.6, stagger: 0.4, duration: 0.9, ease: "back.out(2)" }, 0.15);
      });
      mm.add("(prefers-reduced-motion: reduce)", () => gsap.set(".pc-path", { strokeDashoffset: 0 }));
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="eyebrow">the process</p>
          <SplitReveal as="h2" by="words" className="mt-4 font-display text-5xl leading-[0.95] text-white sm:text-6xl">
            Three steps. Zero overthinking.
          </SplitReveal>
          <p className="hand-label mt-3 text-3xl text-cyan-300">pick → book → disappear into your day</p>
        </div>

        <div className="pc-row relative mt-16">
          {/* dashed connector behind the doodles (desktop) */}
          <svg className="pointer-events-none absolute left-[16%] right-[16%] top-[4.5rem] hidden h-16 w-[68%] md:block" viewBox="0 0 600 60" preserveAspectRatio="none" fill="none" aria-hidden>
            <defs>
              <linearGradient id="pc-grad" x1="0" x2="600" y1="0" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#a855f7" />
                <stop offset="1" stopColor="#67e8f9" />
              </linearGradient>
              <mask id="pc-mask">
                <path className="pc-path" d="M0 30 C 100 -10, 200 70, 300 30 S 500 -10, 600 30" stroke="#fff" strokeWidth="4" pathLength="1" strokeDasharray="1" strokeDashoffset="1" />
              </mask>
            </defs>
            <path d="M0 30 C 100 -10, 200 70, 300 30 S 500 -10, 600 30" stroke="url(#pc-grad)" strokeWidth="2" strokeDasharray="6 8" mask="url(#pc-mask)" />
          </svg>

          <ol className="relative grid gap-12 md:grid-cols-3 md:gap-8">
            {steps.map((s) => (
              <li key={s.n} className="pc-step group text-center">
                <div className="pc-doodle relative mx-auto w-36 sm:w-40">
                  <div className="transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2 group-hover:rotate-[-6deg]">
                    <DoodleFrame src={s.img} alt="" />
                  </div>
                  <span className="absolute -right-1 -top-1 grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 font-display text-sm text-white shadow-[0_0_20px_rgba(124,58,237,0.5)]">
                    {s.n}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-4xl text-white">{s.title}</h3>
                <p className="mt-2 text-zinc-400">{s.copy}</p>
                <p className="hand-label mt-1 text-2xl text-violet-300">{s.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
