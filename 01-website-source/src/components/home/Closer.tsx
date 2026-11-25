"use client";

import Image from "next/image";
import { useRef } from "react";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { DownloadAppButton } from "@/components/DownloadAppButton";
import { gsap, useGSAP } from "@/components/fx/gsap";
import { Magnet } from "@/components/fx/Magnet";

const apps = [
  "Laundry app",
  "Food delivery app",
  "Cleaning app",
  "Storage app",
  "Internship site",
  "Discount app",
  "Errands app",
  "Hostel group chat",
  "Random WhatsApp contact",
];

/** Closing pitch: the app pile gets slashed once as it comes into view, leaving Unimade and the download button. */
export function Closer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".cl-bg",
        { yPercent: -10, scale: 1.15 },
        { yPercent: 10, scale: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
      );

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ scrollTrigger: { trigger: ".cl-apps", start: "top 75%" } })
          .from(".cl-app", { y: 30, opacity: 0, stagger: 0.05, duration: 0.6, ease: "back.out(1.6)" })
          .fromTo(".cl-cut", { strokeDashoffset: 120 }, { strokeDashoffset: 0, stagger: 0.07, duration: 0.35, ease: "power2.in" }, "+=0.1")
          .to(".cl-app", { opacity: 0.3, duration: 0.4, stagger: 0.04 }, "<0.2")
          .from(".cl-logo", { scale: 0, rotate: -90, duration: 1, ease: "back.out(1.8)" }, "-=0.2")
          .from(".cl-cta > *", { y: 20, opacity: 0, stagger: 0.08, duration: 0.7, ease: "expo.out" }, "-=0.6");
      });
      mm.add("(prefers-reduced-motion: reduce)", () => gsap.set(".cl-cut", { strokeDashoffset: 0 }));
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="px-3 pb-8 pt-4 sm:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 px-6 py-20 sm:py-28">
        <div className="cl-bg absolute inset-0">
          <Image src="/doodles/banner-chaos.png" alt="" fill unoptimized className="object-cover opacity-40" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,#050506_20%,rgba(5,5,6,0.8)_55%,rgba(5,5,6,0.4)_90%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-700/25 via-transparent to-cyan-500/20" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="font-display text-5xl leading-[0.95] text-white sm:text-7xl">
            College shouldn&apos;t live in <span className="text-gradient">ten apps.</span>
          </h2>

          <ul className="cl-apps mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2.5">
            {apps.map((name, i) => (
              <li key={name} className="cl-app relative" style={{ transform: `rotate(${i % 2 ? 2 : -2}deg)` }}>
                <span className="glass block rounded-full px-4 py-2">
                  <span className="hand-label text-lg text-zinc-200 sm:text-xl">{name}</span>
                </span>
                <svg className="pointer-events-none absolute -left-[4%] top-[20%] h-[60%] w-[108%]" viewBox="0 0 104 32" preserveAspectRatio="none" fill="none" aria-hidden>
                  <path
                    className="cl-cut"
                    d={i % 2 ? "M2 22 C 30 18, 60 12, 102 8" : "M2 10 C 34 14, 66 20, 102 24"}
                    stroke={i % 3 ? "#67e8f9" : "#a855f7"}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="120"
                    strokeDashoffset="120"
                  />
                </svg>
              </li>
            ))}
          </ul>

          <div className="cl-logo mt-12 flex justify-center">
            <AnimatedLogo size={96} />
          </div>
          <div className="cl-cta mt-6 flex flex-col items-center">
            <p className="font-display text-3xl text-white sm:text-4xl">Just one. Unimade.</p>
            <p className="hand-cursive mt-2 text-2xl text-cyan-300 sm:text-3xl">less life admin. more actual college.</p>
            <Magnet className="mt-8">
              <DownloadAppButton />
            </Magnet>
          </div>
        </div>
      </div>
    </section>
  );
}
