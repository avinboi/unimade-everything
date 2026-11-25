"use client";

import Image from "next/image";
import { useRef } from "react";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { DownloadAppButton } from "@/components/DownloadAppButton";
import { gsap, onIntroDone, useGSAP } from "@/components/fx/gsap";
import { Magnet } from "@/components/fx/Magnet";
import { RotatingText } from "@/components/fx/RotatingText";
import { SplitReveal } from "@/components/fx/SplitReveal";
import { WavyUnderline } from "@/components/Scribbles";
import { addRobotFlower } from "@/components/home/robotFlower";
import { SplineScene } from "@/components/SplineScene";

const SPLINE_SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

const stickers = [
  { src: "/doodles/laundry.png", cls: "left-[2%] top-[14%] w-24 rotate-[-10deg]", depth: 30 },
  { src: "/doodles/tiffin.png", cls: "right-[4%] top-[8%] w-20 rotate-[12deg]", depth: -40 },
  { src: "/doodles/deals.png", cls: "right-[0%] bottom-[18%] w-24 rotate-[-6deg]", depth: 50 },
  { src: "/doodles/backpack.png", cls: "left-[6%] bottom-[10%] w-20 rotate-[8deg]", depth: -25 },
];

const pillars = [
  ["Student-first", "Designed around actual student problems.", "no corporate vibes"],
  ["One place", "Multiple everyday services without the chaos.", "one tab. that's it."],
  ["Campus-ready", "Built around university & hostel life.", "pg / hostel coded"],
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      gsap.set([".hero-fade", ".hero-sticker", ".hero-stage"], { autoAlpha: 0 });
      const intro = contextSafe!(() => {
        gsap
          .timeline({ delay: 0.15 })
          .fromTo(".hero-fade", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08, duration: 1, ease: "expo.out" }, 0.35)
          .fromTo(".hero-stage", { scale: 0.85, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.4, ease: "expo.out" }, 0.2)
          .fromTo(
            ".hero-sticker",
            { scale: 0, autoAlpha: 0, rotate: -30 },
            { scale: 1, autoAlpha: 1, rotate: 0, stagger: 0.1, duration: 1, ease: "back.out(2)" },
            0.6,
          )
          .fromTo(".hero-wave path", { strokeDashoffset: 260 }, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, 0.9);
      });
      const offIntro = onIntroDone(intro);

      // Scroll away: copy drifts up, stage sinks and blurs.
      gsap.to(".hero-copy", {
        yPercent: -18,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-stage-wrap", {
        yPercent: 20,
        scale: 0.92,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });

      // Doodles drift with the pointer at different depths.
      if (window.matchMedia("(pointer: fine)").matches) {
        const items = gsap.utils.toArray<HTMLElement>(".hero-parallax");
        const setters = items.map((el) => ({
          x: gsap.quickTo(el, "x", { duration: 1, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 1, ease: "power3.out" }),
          d: Number(el.dataset.depth || 20),
        }));
        const move = (e: PointerEvent) => {
          const nx = e.clientX / innerWidth - 0.5;
          const ny = e.clientY / innerHeight - 0.5;
          setters.forEach((s) => {
            s.x(nx * s.d);
            s.y(ny * s.d);
          });
        };
        window.addEventListener("pointermove", move);
        return () => {
          offIntro();
          window.removeEventListener("pointermove", move);
        };
      }
      return offIntro;
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pb-16 pt-32 sm:px-6 lg:pt-28">
      <div className="grid-bg pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hero-copy relative z-10 text-center lg:text-left">
          <div className="hero-fade mb-6 inline-flex">
            <span className="chip">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
              </span>
              <span className="shiny-text">everything college life forgot to come with</span>
            </span>
          </div>

          <SplitReveal as="h1" immediate by="chars" delay={0.1} className="font-display text-[3.4rem] leading-[0.92] text-white sm:text-7xl xl:text-[6.5rem]">
            College life.
          </SplitReveal>
          <div className="relative inline-block">
            <SplitReveal as="p" immediate by="words" delay={0.4} pieceClass="text-gradient pr-[0.04em]" className="font-display text-[3.4rem] leading-[0.95] sm:text-7xl xl:text-[6.5rem]">
              Made easier.
            </SplitReveal>
            <WavyUnderline className="hero-wave absolute -bottom-3 left-0 w-full [&_path]:[stroke-dasharray:260] [&_path]:[stroke-dashoffset:260]" />
          </div>

          <p className="hero-fade mx-auto mt-8 max-w-lg text-lg text-zinc-300 sm:text-xl lg:mx-0">
            Your{" "}
            <RotatingText
              words={["laundry", "food", "cleaning", "storage", "errands", "internships", "student deals"]}
              className="rounded-lg bg-gradient-to-r from-violet-600/80 to-cyan-500/80 px-2 font-display text-white"
            />{" "}
            — sorted. One student-first app for the boring bits of college.
          </p>

          <div className="hero-fade mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Magnet>
              <DownloadAppButton />
            </Magnet>
            <Magnet strength={0.2}>
              <a href="#fixing" className="btn-ghost">
                See what we do
                <span className="inline-block animate-bounce">↓</span>
              </a>
            </Magnet>
          </div>
          <p className="hero-fade hand-cursive mt-4 text-2xl text-cyan-300">for hostel kids, mostly</p>

          <div className="mt-12 grid gap-6 text-left sm:grid-cols-3">
            {pillars.map(([title, copy, note]) => (
              <div key={title} className="hero-fade border-l border-white/10 pl-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-white">{title}</p>
                <p className="mt-1 text-sm text-zinc-400">{copy}</p>
                <p className="hand-cursive mt-1 text-xl text-violet-300">{note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-stage-wrap relative mx-auto aspect-square w-full max-w-[560px]">
          <div className="hero-stage absolute inset-0">
            {/* orbit rings */}
            <div className="absolute inset-[6%] rounded-full border border-white/[0.07]" />
            <div className="absolute inset-[18%] rounded-full border border-dashed border-violet-400/20" />
            <div className="absolute inset-[22%] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.35),transparent_65%)] blur-2xl" />
            <div className="orbit absolute inset-[6%]" style={{ "--orbit-speed": "24s" } as React.CSSProperties}>
              <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_20px_#67e8f9]" />
            </div>
            <div className="orbit absolute inset-[18%]" style={{ "--orbit-speed": "16s", animationDirection: "reverse" } as React.CSSProperties}>
              <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-violet-400 shadow-[0_0_16px_#a855f7]" />
            </div>

            {/* logo shows instantly; the 3D scene layers over it on desktop once loaded */}
            <div className="absolute inset-0 grid place-items-center">
              <AnimatedLogo size={180} className="lg:opacity-40" />
            </div>
            <SplineScene scene={SPLINE_SCENE} onReady={addRobotFlower} className="absolute inset-[-12%] hidden [mask-image:linear-gradient(to_bottom,#000_70%,transparent_96%)] lg:block" />
          </div>

          {stickers.map((s) => (
            <div key={s.src} data-depth={s.depth} className={`hero-parallax pointer-events-none absolute ${s.cls}`}>
              <Image src={s.src} alt="" width={120} height={120} unoptimized className="hero-sticker h-auto w-full drop-shadow-[0_10px_30px_rgba(124,58,237,0.45)]" />
            </div>
          ))}

          <p className="hero-fade hand-cursive absolute -bottom-2 right-6 hidden rotate-[-4deg] text-2xl text-violet-300 lg:block">
            psst — it follows your cursor ↖
          </p>
        </div>
      </div>

      <div className="hero-fade absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-zinc-500 sm:flex">
        scroll
        <span className="relative h-10 w-px overflow-hidden bg-white/10">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-gradient-to-b from-violet-400 to-cyan-300" />
        </span>
      </div>
    </section>
  );
}
