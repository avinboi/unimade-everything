"use client";

import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { gsap, useGSAP } from "@/components/fx/gsap";
import { Magnet } from "@/components/fx/Magnet";
import { SplitReveal } from "@/components/fx/SplitReveal";
import { SpotlightCard } from "@/components/fx/SpotlightCard";
import { site } from "@/lib/site";

const paths = [
  {
    key: "student",
    label: "I'm a student",
    note: "per-order, no drama",
    copy: "Everyday services (laundry, food, cleaning, storage, errands) will be per-order. A membership for people who use Unimade a lot is coming later.",
    points: ["Pay per order", "No subscription needed", "Membership for regulars — later"],
  },
  {
    key: "partner",
    label: "I'm a partner",
    note: "hostels, campuses, providers",
    copy: "Hostels, campuses, and student-friendly providers: we'll work on a commission / partnership model — not a generic delivery marketplace.",
    points: ["Commission / partnership model", "Student-first, not a marketplace", "Built with you, not for you"],
  },
];

const promises = ["Simple pricing", "Not 17 hidden fees", "You hear first", "Student-friendly"];

export function PricingPage() {
  const root = useRef<HTMLDivElement>(null);
  const [path, setPath] = useState("student");
  const [sent, setSent] = useState(false);

  useGSAP(
    () => {
      gsap.from(".pr-card", {
        y: 80,
        rotate: (i) => (i ? 4 : -4),
        opacity: 0,
        stagger: 0.12,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ".pr-cards", start: "top 85%" },
      });
      gsap.from(".pr-promise", {
        scale: 0.6,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "back.out(2)",
        scrollTrigger: { trigger: ".pr-promises", start: "top 90%" },
      });
      gsap.to(".pr-soon", {
        backgroundPosition: "200% 0",
        duration: 6,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: root },
  );

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") || "");
    const subject = encodeURIComponent(`Unimade waitlist — ${path}`);
    const body = encodeURIComponent(`Add me to the waitlist.\nPath: ${path}\nEmail: ${email}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <div ref={root} className="px-4 pb-16 pt-40 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="relative text-center">
          <p className="hand-label text-3xl text-violet-300">no fake rate cards here</p>
          <SplitReveal as="h1" immediate by="chars" className="mt-3 font-display text-6xl leading-[0.92] text-white sm:text-8xl">
            Pricing isn&apos;t public yet.
          </SplitReveal>
          <p
            className="pr-soon mx-auto mt-6 w-fit bg-[linear-gradient(90deg,#a855f7,#67e8f9,#a855f7)] bg-[length:200%_100%] bg-clip-text font-display text-2xl text-transparent sm:text-3xl"
          >
            ✦ coming soon ✦
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            We&apos;re still shaping what students and partners pay. When it&apos;s live, it will be simple — not 17 hidden
            fees. Leave your email and we&apos;ll tell you first.
          </p>
        </div>

        <div className="pr-cards mt-20 grid gap-6 md:grid-cols-2">
          {paths.map((p, i) => (
            <SpotlightCard
              key={p.key}
              color={i ? "rgba(34,211,238,0.2)" : undefined}
              className={`pr-card p-8 sm:p-10 ${path === p.key ? "!border-violet-400/50" : ""}`}
            >
              <div className="flex items-start justify-between">
                <span className="hand-label text-2xl text-cyan-300">{p.note}</span>
                <span className="font-display text-5xl text-white/10">0{i + 1}</span>
              </div>
              <h2 className="mt-6 font-display text-4xl text-white">{p.label}</h2>
              <p className="mt-4 text-zinc-400">{p.copy}</p>
              <div className="my-8 h-px bg-gradient-to-r from-white/10 via-white/20 to-transparent" />
              <p className="font-display text-5xl text-white">
                ₹ <span className="text-gradient">soon</span>
              </p>
              <ul className="mt-6 space-y-3">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-3 text-zinc-300">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 text-[0.6rem] text-white">✓</span>
                    {pt}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => {
                  setPath(p.key);
                  document.getElementById("waitlist")?.querySelector("input")?.focus();
                }}
                className={`${i ? "btn-ghost" : "btn-primary"} mt-8 w-full`}
              >
                Join the waitlist
              </button>
            </SpotlightCard>
          ))}
        </div>

        <div className="pr-promises mt-16 flex flex-wrap justify-center gap-3">
          {promises.map((p) => (
            <span key={p} className="pr-promise chip !px-5 !py-2.5 !text-base">
              <span className="text-violet-400">✦</span> {p}
            </span>
          ))}
        </div>

        <div id="waitlist" className="mx-auto mt-24 max-w-2xl scroll-mt-32">
          <div className="border-beam rounded-[2rem] bg-[#0b0b10]/90 p-8 sm:p-10">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="sent" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
                  <p className="font-display text-4xl text-white">You&apos;re in line.</p>
                  <p className="hand-cursive mt-3 text-3xl text-cyan-300">opening your email…</p>
                </motion.div>
              ) : (
                <motion.form key="form" exit={{ opacity: 0, y: -20 }} onSubmit={onSubmit} className="flex flex-col gap-6">
                  <div>
                    <p className="font-display text-3xl text-white">Get in line.</p>
                    <p className="mt-1 text-zinc-500">We&apos;ll email you the moment pricing goes live.</p>
                  </div>
                  <div className="relative grid grid-cols-2 rounded-full border border-white/10 bg-black/40 p-1">
                    {paths.map((p) => (
                      <button
                        key={p.key}
                        type="button"
                        onClick={() => setPath(p.key)}
                        className={`relative rounded-full py-2.5 text-sm font-semibold transition-colors ${path === p.key ? "text-white" : "text-zinc-500"}`}
                      >
                        {path === p.key ? (
                          <motion.span layoutId="path-pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                        ) : null}
                        <span className="relative">{p.key === "student" ? "A student" : "A business / partner"}</span>
                      </button>
                    ))}
                  </div>
                  <label className="flex flex-col gap-2 text-sm text-zinc-400">
                    Email
                    <input name="email" type="email" required placeholder="you@college.edu" className="input" />
                  </label>
                  <Magnet strength={0.2} className="w-fit">
                    <button type="submit" className="btn-primary">
                      Notify me →
                    </button>
                  </Magnet>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
          <p className="mt-8 text-center text-sm text-zinc-500">
            Want to talk now?{" "}
            <Link href="/about#talk" className="text-violet-300 hover:text-white">
              Hit the contact form →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
