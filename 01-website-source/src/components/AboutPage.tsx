"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { ContactForm } from "@/components/ContactForm";
import { gsap, useGSAP } from "@/components/fx/gsap";
import { ScrollRevealText } from "@/components/fx/ScrollRevealText";
import { SplitReveal } from "@/components/fx/SplitReveal";
import { SpotlightCard } from "@/components/fx/SpotlightCard";
import { team } from "@/lib/site";

const intents = [
  { key: "Student", title: "I'm a student", copy: "I need help / I want to use Unimade", emoji: "/doodles/backpack.png" },
  { key: "Partner", title: "I'm a business / partner", copy: "I want to work with Unimade", emoji: "/doodles/deals.png" },
];

export function AboutPage() {
  const root = useRef<HTMLDivElement>(null);
  const [intent, setIntent] = useState("Student");

  useGSAP(
    () => {
      gsap.from(".ab-member", {
        y: 120,
        rotate: (i) => (i % 2 ? 8 : -8),
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ".ab-team", start: "top 80%" },
      });

      // Team row drifts sideways while scrolling past it.
      gsap.fromTo(
        ".ab-team-row",
        { xPercent: 6 },
        { xPercent: -6, ease: "none", scrollTrigger: { trigger: ".ab-team", start: "top bottom", end: "bottom top", scrub: true } },
      );

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ scrollTrigger: { trigger: ".ab-mission", start: "top top", end: "+=120%", pin: true, scrub: 1 } })
          .from(".ab-mission-logo", { scale: 0.3, rotate: -90, opacity: 0 })
          .from(".ab-mission-text", { scale: 1.6, opacity: 0, filter: "blur(20px)" }, "<0.2")
          .to(".ab-mission-ring", { scale: 1.8, opacity: 0, stagger: 0.1 }, "<");
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="relative overflow-hidden px-4 pb-20 pt-40 sm:px-6">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-5xl">
          <p className="hand-label text-3xl text-violet-300">the people behind the pile of laundry</p>
          <SplitReveal as="h1" immediate by="words" className="mt-3 font-display text-6xl leading-[0.92] text-white sm:text-8xl">
            We were tired of figuring it all out ourselves.
          </SplitReveal>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl space-y-10">
          <ScrollRevealText
            className="font-display text-3xl leading-tight text-white sm:text-5xl"
            text="College is supposed to be about making friends, finding your thing, discovering who you are and occasionally making questionable decisions at 2 AM."
          />
          <ScrollRevealText
            className="text-2xl leading-snug text-zinc-300 sm:text-3xl"
            text="It shouldn't be about figuring out where to get your laundry done, how to store your stuff, who can run an errand or how to find the right internship."
          />
          <p className="hand-cursive text-5xl text-gradient sm:text-6xl">So we made Unimade.</p>
        </div>
      </section>

      <section className="ab-team overflow-hidden px-4 py-28 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">the team</p>
              <SplitReveal as="h2" by="words" className="mt-3 font-display text-5xl text-white sm:text-6xl">
                Five students. One mission.
              </SplitReveal>
            </div>
            <p className="hand-label text-2xl text-cyan-300">hover us, we don&apos;t bite</p>
          </div>
        </div>
        <div className="ab-team-row mt-16 flex flex-wrap justify-center gap-5 sm:gap-8 lg:flex-nowrap">
          {team.map((person, i) => (
            <figure key={person.name} className="ab-member group w-[150px] shrink-0 sm:w-[200px]" style={{ marginTop: i % 2 ? 48 : 0 }}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-violet-600/20 to-cyan-500/10 transition duration-500 group-hover:-translate-y-3 group-hover:rotate-[-2deg] group-hover:border-violet-400/50 group-hover:shadow-[0_20px_60px_-15px_rgba(124,58,237,0.6)]">
                <Image
                  src={person.avatar}
                  alt={person.name}
                  fill
                  unoptimized
                  className="object-contain p-2 transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#050506] to-transparent" />
                <span className="absolute left-3 top-3 font-display text-xs text-white/50">0{i + 1}</span>
              </div>
              <figcaption className="mt-4 text-center">
                <p className="font-display text-lg text-white">{person.name}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="ab-mission relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-24 sm:px-6">
        {[0, 1, 2].map((r) => (
          <span
            key={r}
            className="ab-mission-ring pointer-events-none absolute aspect-square rounded-full border border-violet-400/20"
            style={{ width: `${40 + r * 20}vmin` }}
          />
        ))}
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="ab-mission-logo mb-10 flex justify-center">
            <AnimatedLogo size={110} />
          </div>
          <div className="ab-mission-text">
            <h2 className="font-display text-5xl leading-[0.95] text-white sm:text-7xl">
              We&apos;re building the <span className="text-gradient">infrastructure</span> behind student life.
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-zinc-400">
              Unimade isn&apos;t just about delivering things. We&apos;re building a student-first ecosystem where everyday
              life gets simpler, opportunities become easier to access, and students can spend less time managing life and
              more time actually living it.
            </p>
          </div>
        </div>
      </section>

      <section id="talk" className="scroll-mt-28 px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <SplitReveal as="h2" by="words" className="font-display text-6xl leading-[0.92] text-white sm:text-7xl">
            Need something? Talk to us.
          </SplitReveal>
          <p className="hand-label mt-3 text-3xl text-violet-300">pick one, then tell us everything</p>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {intents.map((it) => {
              const on = intent === it.key;
              return (
                <button key={it.key} type="button" onClick={() => setIntent(it.key)} className="text-left">
                  <SpotlightCard className={`flex items-center gap-5 p-6 transition-colors ${on ? "!border-violet-400/70 bg-violet-500/[0.08]" : ""}`}>
                    <Image src={it.emoji} alt="" width={72} height={72} unoptimized className={`h-16 w-16 transition duration-500 ${on ? "rotate-[-8deg] scale-110" : "opacity-60"}`} />
                    <div className="flex-1">
                      <h3 className="font-display text-2xl text-white">{it.title}</h3>
                      <p className="mt-1 text-zinc-400">{it.copy}</p>
                    </div>
                    <span className={`grid h-7 w-7 place-items-center rounded-full border transition ${on ? "border-transparent bg-gradient-to-br from-violet-600 to-cyan-500" : "border-white/20"}`}>
                      {on ? (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-xs text-white">
                          ✓
                        </motion.span>
                      ) : null}
                    </span>
                  </SpotlightCard>
                </button>
              );
            })}
          </div>

          <div className="border-beam mt-8 rounded-[2rem] bg-[#0b0b10]/90 p-6 sm:p-10">
            <ContactForm intent={intent} />
          </div>
          <p className="mt-6 text-sm text-zinc-500">
            Or skip the form:{" "}
            <Link href="/pricing" className="text-violet-300 hover:text-white">
              join the pricing waitlist
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
