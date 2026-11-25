"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { gsap, ScrollTrigger, useGSAP } from "@/components/fx/gsap";
import { Magnet } from "@/components/fx/Magnet";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const bar = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  const openRef = useRef(open);

  // Hide on scroll down, reveal on scroll up.
  useGSAP(() => {
    const el = bar.current;
    if (!el) return;
    gsap.from(el, { y: -80, opacity: 0, duration: 1, ease: "expo.out", delay: 0.2 });
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const down = self.direction === 1 && self.scroll() > 240;
        gsap.to(el, { yPercent: down && !openRef.current ? -160 : 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
      },
    });
  });

  useEffect(() => {
    openRef.current = open;
    const m = menu.current;
    if (!m) return;
    if (open) {
      document.documentElement.style.overflow = "hidden";
      gsap
        .timeline()
        .set(m, { display: "flex" })
        .fromTo(m, { clipPath: "circle(0% at 92% 4%)" }, { clipPath: "circle(150% at 92% 4%)", duration: 0.8, ease: "expo.inOut" })
        .fromTo(".m-link", { yPercent: 110 }, { yPercent: 0, stagger: 0.06, duration: 0.8, ease: "expo.out" }, "-=0.35")
        .fromTo(".m-foot", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.5");
    } else {
      document.documentElement.style.overflow = "";
      gsap
        .timeline()
        .to(m, { clipPath: "circle(0% at 92% 4%)", duration: 0.6, ease: "expo.inOut" })
        .set(m, { display: "none" });
    }
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <div
        ref={bar}
        className="glass pointer-events-auto mx-auto flex max-w-6xl items-center justify-between rounded-full py-2 pl-2 pr-2 shadow-[0_10px_40px_-15px_rgba(124,58,237,0.5)] sm:pl-3"
      >
        <Link href="/" className="group flex items-center gap-3" aria-label="Unimade home">
          <AnimatedLogo size={40} priority />
          <span className="relative hidden overflow-hidden font-display text-lg tracking-tight text-white sm:block">
            <span className="block transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">
              UNIMADE
            </span>
            <span className="text-gradient absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0">
              UNIMADE
            </span>
          </span>
        </Link>

        <nav className="hidden items-center md:flex" onMouseLeave={() => setHovered(null)}>
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            const lit = hovered ? hovered === link.href : active;
            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHovered(link.href)}
                className={`relative px-4 py-2 text-sm transition-colors ${lit ? "text-white" : "text-zinc-400"}`}
              >
                {lit ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.07] ring-1 ring-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="relative">{link.label}</span>
                {active ? (
                  <span className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_8px_#67e8f9]" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Magnet strength={0.25} className="hidden md:inline-block">
            <Link href="/about#talk" className="btn-primary !py-2.5 !text-sm">
              Get started
            </Link>
          </Magnet>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-[60] grid h-11 w-11 place-items-center rounded-full bg-white/[0.06] ring-1 ring-white/10 md:hidden"
          >
            <span className={`absolute h-0.5 w-5 rounded bg-white transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute h-0.5 w-5 rounded bg-white transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute h-0.5 w-5 rounded bg-white transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>
      </div>

      <div
        ref={menu}
        className="pointer-events-auto fixed inset-0 z-[55] hidden flex-col justify-between bg-[#050506] px-6 pb-10 pt-28"
        style={{ clipPath: "circle(0% at 92% 4%)" }}
      >
        <div className="grid-bg absolute inset-0 opacity-50" />
        <div className="aurora !absolute">
          <span />
          <span />
        </div>
        <nav className="relative flex flex-col gap-1">
          {links.map((link, i) => (
            <div key={link.href} className="overflow-hidden">
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className={`m-link flex items-baseline gap-4 font-display text-5xl ${isActive(pathname, link.href) ? "text-gradient" : "text-white"}`}
              >
                <span className="font-sans text-sm text-zinc-500">0{i + 1}</span>
                {link.label}
              </Link>
            </div>
          ))}
        </nav>
        <div className="m-foot relative space-y-4">
          <Link href="/about#talk" onClick={() => setOpen(false)} className="btn-primary w-full">
            Get started
          </Link>
          <div className="flex justify-between text-sm text-zinc-400">
            <a href={site.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={`mailto:${site.email}`}>Email</a>
          </div>
        </div>
      </div>
    </header>
  );
}
