"use client";

import Link from "next/link";
import { useRef } from "react";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { gsap, useGSAP } from "@/components/fx/gsap";
import { Magnet } from "@/components/fx/Magnet";
import { scrollToTarget } from "@/components/SmoothScroll";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/product", label: "Product" },
      { href: "/pricing", label: "Pricing" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/about#talk", label: "Contact" },
      { href: "/about#talk", label: "Partner with us" },
    ],
  },
];

export function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".ft-letter", {
        yPercent: 100,
        stagger: 0.05,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ".ft-word", start: "top 95%" },
      });
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="relative mt-24 overflow-hidden border-t border-white/[0.06]">

      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-8 pt-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <AnimatedLogo size={48} />
            <span className="font-display text-xl text-white">UNIMADE</span>
          </Link>
          <p className="mt-4 max-w-xs text-zinc-400">{site.tagline}</p>
          <p className="hand-cursive mt-2 text-2xl text-cyan-300">less life admin. more actual college.</p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="eyebrow">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="group inline-flex items-center gap-2 text-zinc-300 transition hover:text-white">
                    <span className="h-px w-0 bg-cyan-300 transition-all duration-300 group-hover:w-4" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="eyebrow">Say hi</p>
          <ul className="mt-4 space-y-2.5 text-zinc-300">
            <li>
              <a href={site.instagram} target="_blank" rel="noreferrer" className="transition hover:text-white">Instagram ↗</a>
            </li>
            <li>
              <a href={site.linkedin} target="_blank" rel="noreferrer" className="transition hover:text-white">LinkedIn ↗</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="break-all transition hover:text-white">{site.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
        <p className="ft-word flex select-none justify-center overflow-hidden font-display text-[22vw] leading-[0.8] lg:text-[18rem]" aria-hidden>
          {"UNIMADE".split("").map((c, i) => (
            <span key={i} className="ft-letter inline-block">
              <span className="text-outline inline-block transition-[translate,color,-webkit-text-stroke-color] duration-500 hover:-translate-y-3 hover:text-violet-400 hover:[-webkit-text-stroke-color:transparent]">
                {c}
              </span>
            </span>
          ))}
        </p>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-8 text-xs text-zinc-600 sm:px-6">
        <p>© {new Date().getFullYear()} Unimade. Made for students.</p>
        <Magnet>
          <button
            type="button"
            onClick={() => scrollToTarget(0)}
            className="grid h-12 w-12 place-items-center rounded-full border border-white/10 text-lg text-white transition hover:border-violet-400 hover:bg-violet-500/10"
            aria-label="Back to top"
          >
            ↑
          </button>
        </Magnet>
      </div>
    </footer>
  );
}
